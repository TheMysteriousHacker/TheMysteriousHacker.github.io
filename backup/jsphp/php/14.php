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

//Create query
$page = $_GET['page'];
$result = $conn->query("select firstname, age from mydb.MyGuests where age < 25 order by age limit 5 offset " .$page. ";");
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo "Name: " . $row["firstname"]. "<br>";
        echo "Age: " .$row["age"]. "<br>";
        echo var_dump($row). "<br><br>";
    }
} else {
    echo "0 results";
}

$conn->close();
?>
<button onclick="window.location.replace('sql.php')">go back</button>
</body>
</html>
