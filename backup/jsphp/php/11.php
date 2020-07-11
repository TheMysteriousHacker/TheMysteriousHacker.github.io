<!DOCTYPE html>
<html>
<body>
<?php
$age = array("Peter"=>35, "Ben"=>37, "Joe"=>43);
echo json_encode($age);
echo "<br/>";
$cars = array("Volvo", "BMW", "Toyota");
echo json_encode($cars);
echo "<br/>";
$jsonobj = '{"Peter":35,"Ben":37,"Joe":43}';
echo "<br/>";
class Foo{
	public $name = "awdadw";
	public $second;
};
$obj = new Foo();
$obj2 = new Foo();
var_dump($obj);

$objjson = json_decode($jsonobj);
$arrayjson = json_decode($jsonobj, true);
echo "<br/>";
echo "<br/>";
var_dump($objjson);
echo "<br/>";
var_dump($objjson->Peter);
echo "<br/>";
echo "<br/>";
foreach($objjson as $key => $value) {
  echo $key . " => " . $value . "<br>";
}
echo "<br/>";
echo "<br/>";
var_dump($arrayjson);
echo "<br/>";
var_dump($arrayjson["Peter"]);

?>
</body>
</html>
