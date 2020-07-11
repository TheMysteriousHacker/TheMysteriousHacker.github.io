<!DOCTYPE html>
<html>
<body>
<?php
class Fruit {
	public $name;
	public $color;
	function __construct($name, $color) {
    	$this->name = $name;
    	$this->color = $color;
	}
	function __destruct() {
	    echo "<br>This message is from destruct() of fruit " . $this->name;
	}
	function get_name() {
	    return $this->name;
	}
}
$apple = new Fruit("Apple","red");
$banana = new Fruit("Banana","yellow");
echo $apple->get_name();
echo "<br>";
echo $banana->get_name();
echo "<br/>";
echo var_dump($banana instanceof Fruit);
?>
</body>
</html>
