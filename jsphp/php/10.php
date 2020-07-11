<!DOCTYPE html>
<html>
<body>
<?php
class Example1 {
	public $name;
	function get_name() {
	    return $this->name;
	}
}
class Example2 {
	protected $name;
	function set_name($input) {
	    $this->name = $input;
	}
	function get_name() {
	    return $this->name;
	}
	protected function some_func() {
		echo 'This function is protected';
	}
}

$apple = new Example1();
$apple->name = 'Apple';
echo $apple->get_name();
echo '<br>';
$banana = new Example2();
$banana->set_name('Banana');
echo $banana->get_name();

class ForInherit extends Example2 {
	const SOME_MSG = "This is a constant variable";
	const SOME_MSG_AGAIN = "This is another constant variable";
	function outputMsg() {
		$this -> some_func();
		echo "</br>";
		echo self::SOME_MSG_AGAIN;
	}
}

$strawberry = new ForInherit();
echo $strawberry->set_name("strawberry");
echo '<br>';
echo $strawberry->get_name();
echo '<br>';
echo $strawberry::SOME_MSG;
echo '<br>';
echo $strawberry->outputMsg();
?>
</body>
</html>
