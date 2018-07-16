<?php

define("HOST", "localhost");
define("USER", "root");
define("PASSWORD", "1234");
define("DATABASE", "academic_guidance");
define("CHARSET", "utf8");

// define("HOST", "localhost");
// define("USER", "chiangr1_root");
// define("PASSWORD", "k1234567");
// define("DATABASE", "chiangr1_academic");
// define("CHARSET", "utf8");

function DB(){
    static $instance;
    if ($instance === null) {
        $opt = array(
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => FALSE,
        );
        try{
            $dns = "mysql:host=" .HOST. ";dbname=" .DATABASE. ";charset=" .CHARSET;
        }catch (Exception $e) {
            die('Error : ' . $e->getMessage());
        }
        
        $instance = new PDO($dns, USER, PASSWORD, $opt);
    }
    return $instance;
}

?>