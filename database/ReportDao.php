<?php

require __DIR__ ."/db_connection.php";

class ReportDao{
    protected $db;

    function __construct(){
        $this->db = DB();
    }

    function __destruct(){
        $this->db = null;
    }

    public function create($title, $result, $email){
        $result_create = 0;
        try{
            $query = $this->db->prepare("INSERT INTO report_test(title, result, email) VALUES (:title, :result, :email)");
            $query->bindParam("title", $title, PDO::PARAM_STR);
            $query->bindParam("result", $result, PDO::PARAM_STR);
            $query->bindParam("email", $email, PDO::PARAM_STR);
            $result_create = $query->execute();
        }catch(PDOException $e){
            echo "Exception create :  ".$e->getMessage();
        }
        return $result_create;
    }

    public function read($title){
        $query = $this->db->prepare("SELECT * FROM report_test WHERE title = :title");
        $query->bindParam("title", $title, PDO::PARAM_STR);
        $query->execute();
        $data = array();
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        return $data;
    }

    public function update($id, $title, $result, $email){
        $result = 0;
        try{
            $query = $this->db->prepare("UPDATE report_test SET title = :title, result = :result, email = :email WHERE id = :id");
            $query->bindParam("id", $id, PDO::PARAM_INT);
            $query->bindParam("title", $title, PDO::PARAM_STR);
            $query->bindParam("result", $result, PDO::PARAM_STR);
            $query->bindParam("email", $email, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception update :  ".$e->getMessage();
        }
        return $result;
    }

    public function delete($email, $title){
        $result = 0;
        try{
            if($title == "test1") $query = $this->db->prepare("DELETE FROM report_test WHERE email = :email AND title = 'test1'");
            else           $query = $this->db->prepare("DELETE FROM report_test WHERE email = :email AND title = 'test2'");
            $query->bindParam("email", $email, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception delete :  ".$e->getMessage();
        }
        return $result;
    }

    public function detail($email){
        $query = $this->db->prepare("SELECT * FROM report_test WHERE email = :email");
        $query->bindParam("email", $email, PDO::PARAM_STR);
        $query->execute();
        return json_encode($query->fetch(PDO::FETCH_ASSOC));
    }
}

?>