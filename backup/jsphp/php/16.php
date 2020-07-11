<?php
session_start();
$_SESSION['colour'] = 'green';
echo var_dump($_SESSION);
session_unset();
echo var_dump($_SESSION);
?>