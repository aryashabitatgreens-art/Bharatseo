<?php
require_once __DIR__ . '/config.php';

// Redirect to login.php on registration tab
header("Location: login.php?tab=register");
exit();
?>
