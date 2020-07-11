<?php
$cars = array("Volvo", "BMW", "Toyota");
$cars[1] = "honda";
echo "I like " . $cars[0] . ", " . $cars[1] . " and " . $cars[2] . ".";
echo "</br>", count($cars);

$age = array("Peter" => "20", "John" => "10", "ali" => "40");
$age["Jack"] = "14";
echo "</br>", var_dump($age);

foreach($age as $name => $num){
	echo "</br>", $name . ": " . $num;
}
krsort($age);
echo "<br/>", var_dump($age);
asort($age);
echo "<br/>", var_dump($age);
rsort($cars);
echo "<br/>I like " . $cars[0] . ", " . $cars[1] . " and " . $cars[2] . ".";

?>