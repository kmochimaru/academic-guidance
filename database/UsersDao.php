<?php

require __DIR__ ."/db_connection.php";

class UsersDao{
    protected $db;

    function __construct(){
        $this->db = DB();
    }

    function __destruct(){
        $this->db = null;
    }

    public function create($name, $surname, $email, $education_plan, $program, $gender, $password, $level){
        $result = 0;
        try{
            $query = $this->db->prepare("INSERT INTO users(name, surname, email, education_plan, program, gender, password, level) VALUES (:name, :surname, :email, :education_plan, :program, :gender, :password, :level)");
            $query->bindParam("name", $name, PDO::PARAM_STR);
            $query->bindParam("surname", $surname, PDO::PARAM_STR);
            $query->bindParam("email", $email, PDO::PARAM_STR);
            $query->bindParam("education_plan", $education_plan, PDO::PARAM_STR);
            $query->bindParam("program", $program, PDO::PARAM_STR);
            $query->bindParam("gender", $gender, PDO::PARAM_STR);
            $query->bindParam("password", $password, PDO::PARAM_STR);
            $query->bindParam("level", $level, PDO::PARAM_STR);
            $result = $query->execute();
         // return $this->db->lastInsertId();
        }catch(PDOException $e){
            echo "Exception create :  ".$e->getMessage();
        }
        return $result;
    }

    public function read(){
        $query = $this->db->prepare("SELECT * FROM users");
        $query->execute();
        $data = array();
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        return $data;
    }

    public function update($name, $surname, $email, $education_plan, $program, $gender, $password, $level){
        $result = 0;
        try{
            $query = $this->db->prepare("UPDATE users SET name = :name, surname = :surname, education_plan = :education_plan, program = :program, gender = :gender, password = :password, level = :level WHERE email = :email");
            $query->bindParam("name", $name, PDO::PARAM_STR);
            $query->bindParam("surname", $surname, PDO::PARAM_STR);
            $query->bindParam("email", $email, PDO::PARAM_STR);
            $query->bindParam("education_plan", $education_plan, PDO::PARAM_STR);
            $query->bindParam("program", $program, PDO::PARAM_STR);
            $query->bindParam("gender", $gender, PDO::PARAM_STR);
            $query->bindParam("password", $password, PDO::PARAM_STR);
            $query->bindParam("level", $level, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception update :  ".$e->getMessage();
        }
        return $result;
    }

    public function delete($email){
        $result = 0;
        try{
            $query = $this->db->prepare("DELETE FROM users WHERE email = :email");
            $query->bindParam("email", $email, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception delete :  ".$e->getMessage();
        }
        return $result;
    }

    public function detail($email){
        $query = $this->db->prepare("SELECT * FROM users WHERE email = :email");
        $query->bindParam("email", $email, PDO::PARAM_STR);
        $query->execute();
        return json_encode($query->fetch(PDO::FETCH_ASSOC));
    }

    public function login($user, $pass){
        $query = $this->db->prepare("SELECT * FROM users WHERE email = :user AND password = :pass");
        $query->bindParam("user", $user, PDO::PARAM_STR);
        $query->bindParam("pass", md5($pass), PDO::PARAM_STR);
        $query->execute();
        return json_encode($query->fetch(PDO::FETCH_ASSOC));
    }

    public function readEducation(){
        $query = $this->db->prepare("SELECT DISTINCT education_plan FROM users");
        $query->execute();
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        return $data;
    }

    public function countEducation($education_plan){
        $query = $this->db->prepare("SELECT COUNT(education_plan) AS count FROM academic_guidance.users WHERE education_plan = :education_plan AND level <> 'ผู้ดูแลระบบ'");
        $query->bindParam("education_plan", $education_plan, PDO::PARAM_STR);
        $query->execute();
        $count = $query->fetch(PDO::FETCH_COLUMN);
        return $count;
    }
}

?>