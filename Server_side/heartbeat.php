<?php
session_start(); // Start the session if it's not already started

// Update the session's timestamp to extend its lifetime
$_SESSION['last_activity'] = time();
