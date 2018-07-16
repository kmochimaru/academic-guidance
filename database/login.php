<?php
error_reporting(error_reporting() & ~E_NOTICE);
header('Content-Type: application/json;charset=utf-8');
require("UsersDao.php");
$dao = new UsersDao();
    $obj = json_decode(file_get_contents("php://input"));
    if(isset($obj)){
        if($obj->action == "login"){
            $user = $obj->user;
            $pass = $obj->pass;
            echo $dao->login($user, $pass);
        }
    }  
    
?>