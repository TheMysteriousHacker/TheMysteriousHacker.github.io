<?php
setcookie("user2","john doe2", time() + (86400 * 30), "/");
foreach ($_COOKIE as $key=>$value){
	echo $value;
};
echo "<br>", var_dump($_COOKIE);
?>
<!DOCTYPE html>
<html>
<body>

</body>
</html>
