<?
function checkSessionExpiration() {
    session_start();

    // Check if the session has expired
    if (isset($_SESSION['last_activity']) && (time() - $_SESSION['last_activity'] > ini_get('session.gc_maxlifetime'))) {
        // Session has expired, call your function here
        include_once("Login/handler_logout.php");
        // compute the token
        $user_id = $_SESSION['user_id'];
        $token = hash("sha256", $secret_key.$user_id);
        echo json_encode(logout($token, true));
        exit();
        // Alternatively, you can perform a redirect or any other desired action.
    }

    // Update the session's timestamp for the current activity
    $_SESSION['last_activity'] = time();
}

// Call the function to check for session expiration on every page load
checkSessionExpiration();
?>