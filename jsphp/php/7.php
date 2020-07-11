<!DOCTYPE html>
<html>
<body>
<?php
echo 'info from 6.php:<br/><br/>';
?>
<?php include '6.php';
echo '<p>The date next Sunday is ' . date("Y-m-d h:i:sa", $d) . '</p>';
?>
</body>
</html>
