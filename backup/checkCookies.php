<?php
$mode = $_REQUEST['mode'];
if(isset($_COOKIE["brown-mode"])){        
    if($mode == "checkMode"){
        if($_COOKIE["brown-mode"] == "yes"){
            echo "brownyes";
        }
    }
    else{
        setcookie("brown-mode",$mode);
    }
}
else{
    setcookie("brown-mode","no");
}
?>