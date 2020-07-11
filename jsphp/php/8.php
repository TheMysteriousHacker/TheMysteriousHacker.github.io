<!DOCTYPE html>
<html>
<body>
<?php
echo readFile("test.txt");
echo '<br/>';
echo '<br/>';
$myfile = fopen("test.txt", "r") or die("Unable to open file!");
echo fread($myfile,filesize("test.txt"));
fclose($myfile);
echo '<br/>';
echo '<br/>';
$myfile = fopen("test.txt", "r") or die("Unable to open file!");
while(!feof($myfile)) {
  echo fgets($myfile) . "<br>";
}
fclose($myfile);
echo '<br/>';
$myfile = fopen("test.txt", "r") or die("Unable to open file!");
echo fgetc($myfile);
echo fgetc($myfile);
echo fgetc($myfile);
echo fgetc($myfile);
echo fgetc($myfile);
fseek($myfile,10);
echo fgetc($myfile);
echo fgetc($myfile);
echo fgetc($myfile);
fclose($myfile);

$myfile = fopen("testfile.txt", "w");
fwrite($myfile,"hello, how are you?\nThis is new edited line.");
fclose($myfile);
?>
</body>
</html>
