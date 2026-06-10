// cPanel/LiteSpeed CommonJS wrapper for ES Modules
// lsnode.js does not support require() on ES modules directly.
// This file dynamically imports the ES module server.js to fix the ERR_REQUIRE_ESM crash.

async function startApp() {
    try {
        const module = await import('./server.js');
        // If lsnode expects an exported app object, we can expose it if needed
        module.default;
    } catch (error) {
        console.error("Failed to load ES module server.js:", error);
    }
}

startApp();
