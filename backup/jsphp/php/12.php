<!DOCTYPE html>
<html>
<body>
<?php
trait tellInfo {
	public function msg1(){
		echo "The item is: " . $this->name;
	}
}

class fruit{
	public $name;
	public $color;
	public const SOME_TEXT = "Hello, how are you?";
	public static $staticProp = "SomeFruit";
	public function __construct($inputN,$inputC){
		$this->name = $inputN;
		$this->color = $inputC;
	}
	public static function tellsomething(){
		echo "this is some message";
	}
	use tellInfo;
}

class detail extends fruit{
	function tellmsg(){
		echo parent::SOME_TEXT;
	}
}

$apple = new fruit("apple","red");
echo $apple->msg1();
echo "<br/>";
echo fruit::tellsomething();
echo "<br/>";
$banana = new detail("banana","yellow");
$banana->tellmsg();
echo "<br/>";
echo fruit::$staticProp;
?>
</body>
</html>
