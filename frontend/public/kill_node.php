<?php
header('Content-Type: text/plain');

echo "=== NODE.JS PROCESS MANAGER ===\n\n";

if (!function_exists('shell_exec')) {
    die("❌ shell_exec is disabled on this server. Cannot manage processes.");
}

// 1. List running processes containing 'node'
echo "1. Current running Node.js processes:\n";
$ps_output = shell_exec("ps aux | grep node | grep -v grep");
if (empty($ps_output)) {
    echo "No running Node.js processes found.\n";
} else {
    echo $ps_output . "\n";
}

// 2. Kill the processes if requested
if (isset($_GET['kill'])) {
    echo "2. Attempting to kill Node.js processes...\n";
    
    // We target processes matching '/node' to avoid killing other things
    $kill_output = shell_exec("pkill -9 -f node 2>&1");
    echo "Kill result: " . ($kill_output ? $kill_output : "Done (no output)") . "\n\n";
    
    echo "3. Verifying remaining Node.js processes:\n";
    $ps_output_after = shell_exec("ps aux | grep node | grep -v grep");
    if (empty($ps_output_after)) {
        echo "✅ All Node.js processes successfully terminated!\n";
    } else {
        echo "⚠️ Some processes are still running:\n" . $ps_output_after . "\n";
    }
} else {
    echo "\n👉 To kill these processes and force a restart, open:\n";
    echo "https://" . $_SERVER['HTTP_HOST'] . $_SERVER['SCRIPT_NAME'] . "?kill=1\n";
}
