<?php
header('Content-Type: application/json;charset=utf-8');
require("../ReportDao.php");
$dao = new ReportDao();

    if(isset($_GET["action"])){
        $action_get = $_GET["action"];
        if($action_get == "read"){
            $report = $dao->read($_GET["title"]);
            echo json_encode($report);
        }
    }
    
?>