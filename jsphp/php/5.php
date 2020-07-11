<!DOCTYPE html>
<html>
<body>
<?php
// collect value of input field
$name = $_REQUEST['fname'];
$email = $_POST['email'];
if (empty($name)) {
    echo "Name is empty";
} else {
    echo 'input: ' . $name;
    echo '<br/>Email: ' . $email;
}
echo '<br/>' . $_SERVER['PHP_SELF'];
$a[] = "Eve";
$a[] = "Evita";
$a[] = "Sunniva";
$a[] = "Tove";
$a[] = "Unni";
$a[] = "Violet";
$a[] = "Liza";
$a[] = "Elizabeth";
$a[] = "Ellen";
$a[] = "Wenche";
$a[] = "Vicky";
echo '<br/>' . var_dump($a);
?>
</body>
</html>
