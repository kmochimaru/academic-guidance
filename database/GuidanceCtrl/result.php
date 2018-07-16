<?php
header('Content-Type: application/json;charset=utf-8');
require("../GuidanceDao.php");
$dao = new GuidanceDao();

    if(isset($_GET["action"])){
        $action_get = $_GET["action"];
        if($action_get == "result"){
            $guidance = $dao->result($_GET["type"], $_GET["title"]);
            echo json_encode($guidance);
        }
    }
    
?>