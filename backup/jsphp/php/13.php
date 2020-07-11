<!DOCTYPE html>
<html>
<body>
<?php
$servername = "localhost";
$username = "root";
$password = "@Pk013222";
$conn = new mysqli($servername, $username, $password);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

//Create Database
if($conn->query("create database mydb")===true){
	echo "Database created successfully";
}
else{
	echo $conn->error;
};
echo "<br/>";

//Create Table
$conn->query("drop table mydb.MyGuests;");
$tbcreate = "CREATE TABLE mydb.MyGuests (id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,firstname VARCHAR(30) NOT NULL,lastname VARCHAR(30) NOT NULL,email VARCHAR(100),age TINYINT(3),reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);";
if ($conn->query($tbcreate) === TRUE) {
    echo "Table MyGuests created successfully";
} else {
    echo $conn->error;
}
echo "<br/>";

//alter
$alter = "ALTER TABLE mydb.MyGuests AUTO_INCREMENT = 100;";
if ($conn->query($alter) === TRUE) {
    echo "Table altered successfully";
} else {
    echo $conn->error;
}
echo "<br/>";

//InsertData
$dataToInsert = "insert into mydb.MyGuests(firstname,lastname,age,email)".
					"VALUES ('John','Kennedy',40,'john@gmail.com'),".
							"('Bob','Man',20,'bob@gmail.com')";

if ($conn->query($dataToInsert) === TRUE) {
    echo "Data inserted successfully";
} else {
    echo $conn->error;
}
//BoundParameters
$stmt = $conn->prepare("insert into mydb.MyGuests(firstname,lastname,age,email) VALUES (?,?,?,?);");
$stmt->bind_param('ssis',$fn,$sn,$age,$email);

$fn = 'Jill';
$sn = 'Kenndy';
$age = 100;
$email = 'bla@hotmail.com';
$stmt->execute();

$fn = 'little';
$sn = 'boy';
$age = 1;
$email = 'kid@hotmail.com';
$stmt->execute();

$fn = 'xc';
$sn = 'boxcvxcvy';
$age = 13;
$email = 'kid@xcvxcvhotmail.com';
$stmt->execute();

$fn = 'xc';
$sn = 'boxcvxcvy';
$age = 13;
$email = 'kid@xcvxcvhotmail.com';
$stmt->execute();

$fn = 'xc';
$sn = 'boxcvxcvy';
$age = 13;
$email = 'kid@xcvxcvhotmail.com';
$stmt->execute();

$fn = 'xc';
$sn = 'boxcvxcvy';
$age = 13;
$email = 'kid@xcvxcvhotmail.com';
$stmt->execute();

$fn = 'xc';
$sn = 'boxcvxcvy';
$age = 13;
$email = 'kid@xcvxcvhotmail.com';
$stmt->execute();

$fn = 'tyhtyh';
$sn = 'tyhth';
$age = 14;
$email = 'kid@hotmail.com';
$stmt->execute();

$fn = 'awd';
$sn = 'dv';
$age = 18;
$email = 'kisdfd@hotmail.com';
$stmt->execute();

$fn = 'efw';
$sn = 'sdfsdf';
$age = 12;
$email = 'kid@hotmail.com';
$stmt->execute();

$fn = 'sdfsdf';
$sn = 'bocxvcxy';
$age = 15;
$email = 'kid@hotmail.com';
$stmt->execute();


$stmt->close();
$conn->close();
?>
</body>
</html>
