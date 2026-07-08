<?php
header('Content-Type: text/plain');

$repo_dir = '/home/brdtrust/repositories/BRDT-Website';
$admin_js_path = $repo_dir . '/backend/src/api/admin.js';

echo "=== SERVER DEPLOYMENT DEBUG ===\n\n";

echo "1. Checking directory existence:\n";
if (is_dir($repo_dir)) {
    echo "✅ Repo directory exists: $repo_dir\n";
} else {
    echo "❌ Repo directory does NOT exist: $repo_dir\n";
}

echo "\n2. Checking admin.js existence:\n";
if (file_exists($admin_js_path)) {
    echo "✅ admin.js exists: $admin_js_path\n";
    $content = file_get_contents($admin_js_path);
    
    echo "\n3. Checking routes in admin.js:\n";
    $has_donation = strpos($content, '/donations/:id/status') !== false;
    $has_volunteer = strpos($content, '/volunteers/:id/status') !== false;
    $has_contact = strpos($content, '/contacts/:id/status') !== false;
    
    echo "- /donations/:id/status: " . ($has_donation ? "✅ FOUND" : "❌ NOT FOUND") . "\n";
    echo "- /volunteers/:id/status: " . ($has_volunteer ? "✅ FOUND" : "❌ NOT FOUND") . "\n";
    echo "- /contacts/:id/status: " . ($has_contact ? "✅ FOUND" : "❌ NOT FOUND") . "\n";
    
    echo "\n4. File size of admin.js:\n";
    echo filesize($admin_js_path) . " bytes\n";
} else {
    echo "❌ admin.js does NOT exist: $admin_js_path\n";
}

echo "\n5. Trying to check git status:\n";
if (function_exists('shell_exec')) {
    $status = shell_exec("cd " . escapeshellarg($repo_dir) . " && git status 2>&1");
    echo "Git Status:\n$status\n";
    
    $log = shell_exec("cd " . escapeshellarg($repo_dir) . " && git log -n 1 --oneline 2>&1");
    echo "Git Last Commit:\n$log\n";
} else {
    echo "⚠️ shell_exec is disabled on this server.\n";
}
