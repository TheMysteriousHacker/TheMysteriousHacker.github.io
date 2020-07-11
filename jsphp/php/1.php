<?php 
$a = 1;
$b = 2.2;
$c = 5;
$d = 3;
$e = 7;
define("largeNum",[99e400,500]);
function mytest($a){
	global $b, $c;
	static $f = 10;
	$g = 10;
	$f++;
	$g++;
	echo "a has $a, b has $b and c has $c</br>";
	$GLOBALS['d'] += $GLOBALS['e'];
	echo "$f</br>";
	echo "$g</br>";
	echo "</br>", var_dump(largeNum);
}
mytest($a);
echo var_dump($d);
echo "<h1>variable a has num $a</h1>";
mytest($a);
echo "d is now " . "$d";

$text1 = "Hello World";
print "<h1>$text1</h1>";
print "<h1>" . $text1 . "</h1>";

$subject = array("maths","physics","economics");
echo var_dump($subject) . "</br>";

class car{
	function __construct(){
		$this->model = "VW";
		$this->dummy = null;
	}
	function get_model(){
		return $this->model;
	}
}
$newCar = new car();
echo "</br>" . $newCar->get_model();
echo "</br>" . $newCar->dummy;
echo "</br>" . strlen($text1);
echo "</br>" . str_word_count($text1);
echo "</br>" . strrev($text1);
echo "</br>" . strpos($text1, "p");
echo "</br>" . strpos($text1, "o", 6);
echo "</br>" . str_replace("l", "j", $text1);
echo "</br>" . is_int($a);
echo "</br>" . is_float($b);

$h = "1";
if($a == 1){
	echo "</br> same num";
}
if($a == $h){
	echo "</br> same num and type";
}
echo "</br>" . ($a <=> $b);
$i = true;
$j = null;
echo "</br>", $i?"i was true":"i was false";
echo "</br>", $j??"j was null";
echo "</br>";

$k = 5;
switch($k){
	case 5:
		echo "k is 5";
		break;
	default:
		echo "k is unknown";
}

function adding(int $fN, int $sN = 50):float{
	return ($fN + $sN);
}
echo "</br>", var_dump(adding($a));
?>