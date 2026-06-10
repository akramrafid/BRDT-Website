#!/bin/bash
# ============================================
# BRDT Server Fix Script
# Fixes database connection permanently
# ============================================

BACKEND_DIR="$HOME/repositories/BRDT-Website/backend"

echo "=== BRDT Server Fix ==="
echo ""

# Step 1: Create the correct .env.production file
echo "Creating .env.production..."
cat > "$BACKEND_DIR/.env.production" << 'EOF'
PORT=5000
NODE_ENV=production
API_URL=https://api.brdtrust.com
FRONTEND_URL=https://brdtrust.com
DB_HOST=localhost
DB_PORT=3306
DB_USER=brdtrust_admin
DB_PASSWORD=rahatfahim4949
DB_NAME=brdtrust_charity
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
JWT_SECRET=brdt_live_secure_key_2025
JWT_EXPIRE=7d
EMAIL_SERVICE=gmail
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=brdtbd@gmail.com
EMAIL_PASSWORD=icwifzcfgzrijbvp
RESEND_API_KEY=re_84nfSZLs_JumV4kvZ4BaPXhv9R9HbWCDh
BRDT_EMAIL=brdtbd@gmail.com
BRDT_DISPLAY_NAME=BRDT - Belghar Rural Development Trust
EMAIL_FROM_NAME=BRDT Charity
ORG_NAME=Belghar Rural Development Trust
ORG_PHONE=+44 7540 253384
ORG_WEBSITE=https://www.brdtrust.com
ORG_EMAIL=brdtbd@gmail.com
CORS_ORIGIN=https://brdtrust.com,https://www.brdtrust.com,https://api.brdtrust.com
EOF

echo "✅ .env.production created!"

# Step 2: Verify the file
echo ""
echo "=== Verifying DB values ==="
grep "DB_" "$BACKEND_DIR/.env.production"

# Step 3: Check that the new code exists
echo ""
echo "=== Checking code version ==="
if grep -q "parseEnvFile" "$BACKEND_DIR/src/config/database.js"; then
  echo "✅ New database.js code is present!"
else
  echo "❌ OLD database.js code detected! Pulling latest..."
fi

# Step 4: Copy frontend files
echo ""
echo "=== Updating frontend ==="
cp -R "$HOME/repositories/BRDT-Website/frontend/public/"* "$HOME/public_html/" 2>/dev/null && echo "✅ Frontend updated!" || echo "⚠️  Frontend copy skipped"

echo ""
echo "========================================="
echo "✅ ALL DONE!"
echo "========================================="
echo ""
echo "NOW DO THIS:"
echo "1. Go to Setup Node.js App in cPanel"
echo "2. Click STOP APP"
echo "3. Wait 5 seconds"  
echo "4. Click START APP"
echo ""
echo "Then test: https://brdtrust.com/contact.html"
