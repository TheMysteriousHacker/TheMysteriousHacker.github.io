<?php
foreach($_COOKIE as $key => $value){
	setcookie('brown-mode', "", time() - 3600,'/');
	echo $key;
}
?>