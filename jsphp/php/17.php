<?php
$check = 'fileToUpload';
if (isset($_FILES[$check])){
	$sizePrefix = strtolower(substr(ini_get('upload_max_filesize'),1));
	$val = (int)ini_get('upload_max_filesize');
	switch ($sizePrefix){
	    case 'g':
            $val *= 1024;
        case 'm':
            $val *= 1024;
        case 'k':
            $val *= 1024;
	}
	echo "Max file size: ", $val, "<br>";
	$type1 = ($_FILES[$check]['type']);
	if ($_FILES[$check]['size'] > $val){
		echo 'file too large';
	}
	else if (substr($type1,0,strpos($type1,'/')) != 'image'){
		echo 'file was not an image, file type: ' . substr($type1,0,strpos($type1,'/'));
	}
	else{
		$fileaddress = $_FILES["fileToUpload"]["tmp_name"];
		$data = getimagesize($fileaddress);
		$type2 = $data['mime'];
		echo 'file size ok';
		echo '<br>';
		echo var_dump($data);
		echo '<br>';
		move_uploaded_file($fileaddress, ('uploads.' . substr($type2,strpos($type2,'/')+1)));
		echo var_dump($_FILES[$check]);
	}
}
else{
	echo "no";
}
?>