<?php
header('Content-Type: application/json;charset=utf-8');
require("../UsersDao.php");
$dao = new UsersDao();

    if(isset($_GET["action"])){
        $action_get = $_GET["action"];
        if($action_get == "read"){
            $users = $dao->read();
            echo json_encode($users);
        }
    }
    
?>