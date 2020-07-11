<!DOCTYPE html>
<html>
<body>
<?php
date_default_timezone_set("America/Toronto");
echo "<p>Today is " . date("Y/m/d") . "</p>";
echo "<p>Today is " . date("Y.m.d") . "</p>";
echo "<p>Today is " . date("Y-m-d") . "</p>";
echo "<p>Today is " . date("l") . "</p>";
echo "<p>The time is " . date("h : i : s a") . " in 12 hour format</p>";
echo "<p>The time is " . date("H : i : s a") . " in 24 hour format</p>";
$d = mktime(11, 	14,		54,		8,		12,		2014);
//			hour	minute	second	month	day		year
echo '<p>Set time is ' . date('H:i:s d/m/y',$d) . "</p>";
$d=strtotime("10:30pm April 15 2016");
echo "<p>Created date is " . date("Y-m-d h:i:sa", $d) . "</p>";
$d=strtotime("next Sunday");
echo "<p>Created date is " . date("Y-m-d h:i:sa", $d) . "</p>";

?>
</body>
</html>
