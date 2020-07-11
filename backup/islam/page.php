<?php
	$dir = $_GET['ref'];
	$chpt = $_GET['chpt'];
	$url = dirname($_SERVER['SCRIPT_FILENAME']). $dir . "/chpt" . $chpt;
	if (is_dir($url)){
		if ($dh = opendir($url)){
			$fileList = array();
		    while (($file = readdir($dh)) !== false){
		    	if (strpos($file,".html") !== false){
		    		if ($file == "0.html"){
		    			echo ("introExists");
		    		}
		    		$fileList[] = $file;
		    	}
		    }
		    echo json_encode($fileList);
		    closedir($dh);
	    }
    }
    else{
    	echo "no";
    }
?>