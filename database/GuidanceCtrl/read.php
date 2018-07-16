<?php
header('Content-Type: application/json;charset=utf-8');
require("../GuidanceDao.php");
$dao = new GuidanceDao();

    if(isset($_GET["action"])){
        $action_get = $_GET["action"];
        if($action_get == "read"){
            $guidance = $dao->read($_GET["type"]);
            echo json_encode($guidance);
        }
    }
    
?>