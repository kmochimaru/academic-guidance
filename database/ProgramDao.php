<?php

require __DIR__ ."/db_connection.php";

class ProgramDao{
    protected $db;

    function __construct(){
        $this->db = DB();
    }

    function __destruct(){
        $this->db = null;
    }

    public function create(
        $program_id, $program_name, $program_year, $education_level,
        $program_fullName_th, $program_fullName_eng, $degree_fullName_th, $degree_fullName_eng,
        $degree_acronym_th, $degree_acronym_eng, $concerned, $branch_name,
        $branch_name_th, $branch_name_eng, $branch_group, $branch_year,
        $branch_type, $program_inter, $semester, $program_group,
        $credit, $eng_test, $knowledge_processing, $qualification_exam,
        $graduation, $date_program, $date_first_confirm, $date_ohec,
        $date_pcru, $date_pc, $date_update, $philosophy,
        $target, $expenses, $property, $faculty_id, $url
    ){
        $result = 0;
        try{
            $query = $this->db->prepare("INSERT INTO program(
                                                                program_id, program_name, program_year, education_level,
                                                                program_fullName_th, program_fullName_eng, degree_fullName_th, degree_fullName_eng,
                                                                degree_acronym_th, degree_acronym_eng, concerned, branch_name,
                                                                branch_name_th, branch_name_eng, branch_group, branch_year,
                                                                branch_type, program_inter, semester, program_group,
                                                                credit, eng_test, knowledge_processing, qualification_exam,
                                                                graduation, date_program, date_first_confirm, date_ohec,
                                                                date_pcru, date_pc, date_update, philosophy,
                                                                target, expenses, property, faculty_id, url
                                                            ) 
                                                            VALUES 
                                                            (
                                                                :program_id, :program_name, :program_year, :education_level,
                                                                :program_fullName_th, :program_fullName_eng, :degree_fullName_th, :degree_fullName_eng,
                                                                :degree_acronym_th, :degree_acronym_eng, :concerned, :branch_name,
                                                                :branch_name_th, :branch_name_eng, :branch_group, :branch_year,
                                                                :branch_type, :program_inter, :semester, :program_group,
                                                                :credit, :eng_test, :knowledge_processing, :qualification_exam,
                                                                :graduation, :date_program, :date_first_confirm, :date_ohec,
                                                                :date_pcru, :date_pc, :date_update, :philosophy,
                                                                :target, :expenses, :property, :faculty_id, :url
                                                            )"
                                                            );
            $query->bindParam("program_id", $program_id, PDO::PARAM_STR);                           //col 1-4
            $query->bindParam("program_name", $program_name, PDO::PARAM_STR);
            $query->bindParam("program_year", $program_year, PDO::PARAM_STR);
            $query->bindParam("education_level", $education_level, PDO::PARAM_STR);
            $query->bindParam("program_fullName_th", $program_fullName_th, PDO::PARAM_STR);         //col 5-8
            $query->bindParam("program_fullName_eng", $program_fullName_eng, PDO::PARAM_STR);
            $query->bindParam("degree_fullName_th", $degree_fullName_th, PDO::PARAM_STR);
            $query->bindParam("degree_fullName_eng", $degree_fullName_eng, PDO::PARAM_STR);
            $query->bindParam("degree_acronym_th", $degree_acronym_th, PDO::PARAM_STR);             //col 9-12
            $query->bindParam("degree_acronym_eng", $degree_acronym_eng, PDO::PARAM_STR);
            $query->bindParam("concerned", $concerned, PDO::PARAM_STR);
            $query->bindParam("branch_name", $branch_name, PDO::PARAM_STR);
            $query->bindParam("branch_name_th", $branch_name_th, PDO::PARAM_STR);                   //col 13-16
            $query->bindParam("branch_name_eng", $branch_name_eng, PDO::PARAM_STR);
            $query->bindParam("branch_group", $branch_group, PDO::PARAM_STR);
            $query->bindParam("branch_year", $branch_year, PDO::PARAM_STR);
            $query->bindParam("branch_type", $branch_type, PDO::PARAM_STR);                        //col 17-20
            $query->bindParam("program_inter", $program_inter, PDO::PARAM_STR);
            $query->bindParam("semester", $semester, PDO::PARAM_STR);
            $query->bindParam("program_group", $program_group, PDO::PARAM_STR);
            $query->bindParam("credit", $credit, PDO::PARAM_STR);                                   //col 20-24  
            $query->bindParam("eng_test", $eng_test, PDO::PARAM_STR);                             
            $query->bindParam("knowledge_processing", $knowledge_processing, PDO::PARAM_STR);
            $query->bindParam("qualification_exam", $qualification_exam, PDO::PARAM_STR);
            $query->bindParam("graduation", $graduation, PDO::PARAM_STR);                           //col 24-28  
            $query->bindParam("date_program", $date_program, PDO::PARAM_STR);                             
            $query->bindParam("date_first_confirm", $date_first_confirm, PDO::PARAM_STR);
            $query->bindParam("date_ohec", $date_ohec, PDO::PARAM_STR);
            $query->bindParam("date_pcru", $date_pcru, PDO::PARAM_STR);                             //col 28-32  
            $query->bindParam("date_pc", $date_pc, PDO::PARAM_STR);                             
            $query->bindParam("date_update", $date_update, PDO::PARAM_STR);
            $query->bindParam("philosophy", $philosophy, PDO::PARAM_STR);
            $query->bindParam("target", $target, PDO::PARAM_STR);                                   //col 32-36 
            $query->bindParam("expenses", $expenses, PDO::PARAM_STR);                             
            $query->bindParam("property", $property, PDO::PARAM_STR);
            $query->bindParam("faculty_id", $faculty_id, PDO::PARAM_STR);
            $query->bindParam("url", $url, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception create :  ".$e->getMessage();
        }
        return $result;
    }

    public function read(){
        $query = $this->db->prepare("SELECT * FROM program");
        $query->execute();
        $data = array();
        while($row = $query->fetch(PDO::FETCH_ASSOC)){
            $data[] = $row;
        }
        return $data;
    }

    public function update(
        $id,$program_id, $program_name, $program_year, $education_level,
        $program_fullName_th, $program_fullName_eng, $degree_fullName_th, $degree_fullName_eng,
        $degree_acronym_th, $degree_acronym_eng, $concerned, $branch_name,
        $branch_name_th, $branch_name_eng, $branch_group, $branch_year,
        $branch_type, $program_inter, $semester, $program_group,
        $credit, $eng_test, $knowledge_processing, $qualification_exam,
        $graduation, $date_program, $date_first_confirm, $date_ohec,
        $date_pcru, $date_pc, $date_update, $philosophy,
        $target, $expenses, $property, $faculty_id, $url
    ){
        $result = 0;
        try{
            $query = $this->db->prepare("UPDATE program SET 
            program_id = :program_id, program_name = :program_name, program_year = :program_year, education_level = :education_level, 
            program_fullName_th = :program_fullName_th, program_fullName_eng = :program_fullName_eng, degree_fullName_th = :degree_fullName_th, degree_fullName_eng = :degree_fullName_eng,
            degree_acronym_th = :degree_acronym_th, degree_acronym_eng = :degree_acronym_eng, concerned = :concerned, branch_name = :branch_name,
            branch_name_th = :branch_name_th, branch_name_eng = :branch_name_eng, branch_group = :branch_group, branch_year = :branch_year,
            branch_type = :branch_type, program_inter = :program_inter, semester = :semester, program_group = :program_group,
            credit = :credit, eng_test = :eng_test, knowledge_processing = :knowledge_processing, qualification_exam = :qualification_exam,
            graduation = :graduation, date_program = :date_program, date_first_confirm = :date_first_confirm, date_ohec = :date_ohec,
            date_pcru = :date_pcru, date_pc = :date_pc, date_update = :date_update, philosophy = :philosophy,
            target = :target, expenses = :expenses, property = :property, faculty_id = :faculty_id, url = :url
            WHERE id = :id");
            $query->bindParam("id", $id, PDO::PARAM_INT);  
            $query->bindParam("program_id", $program_id, PDO::PARAM_STR);                           //col 1-4
            $query->bindParam("program_name", $program_name, PDO::PARAM_STR);
            $query->bindParam("program_year", $program_year, PDO::PARAM_STR);
            $query->bindParam("education_level", $education_level, PDO::PARAM_STR);
            $query->bindParam("program_fullName_th", $program_fullName_th, PDO::PARAM_STR);         //col 5-8
            $query->bindParam("program_fullName_eng", $program_fullName_eng, PDO::PARAM_STR);
            $query->bindParam("degree_fullName_th", $degree_fullName_th, PDO::PARAM_STR);
            $query->bindParam("degree_fullName_eng", $degree_fullName_eng, PDO::PARAM_STR);
            $query->bindParam("degree_acronym_th", $degree_acronym_th, PDO::PARAM_STR);             //col 9-12
            $query->bindParam("degree_acronym_eng", $degree_acronym_eng, PDO::PARAM_STR);
            $query->bindParam("concerned", $concerned, PDO::PARAM_STR);
            $query->bindParam("branch_name", $branch_name, PDO::PARAM_STR);
            $query->bindParam("branch_name_th", $branch_name_th, PDO::PARAM_STR);                   //col 13-16
            $query->bindParam("branch_name_eng", $branch_name_eng, PDO::PARAM_STR);
            $query->bindParam("branch_group", $branch_group, PDO::PARAM_STR);
            $query->bindParam("branch_year", $branch_year, PDO::PARAM_STR);
            $query->bindParam("branch_type", $branch_type, PDO::PARAM_STR);                        //col 17-20
            $query->bindParam("program_inter", $program_inter, PDO::PARAM_STR);
            $query->bindParam("semester", $semester, PDO::PARAM_STR);
            $query->bindParam("program_group", $program_group, PDO::PARAM_STR);
            $query->bindParam("credit", $credit, PDO::PARAM_STR);                                   //col 20-24  
            $query->bindParam("eng_test", $eng_test, PDO::PARAM_STR);                             
            $query->bindParam("knowledge_processing", $knowledge_processing, PDO::PARAM_STR);
            $query->bindParam("qualification_exam", $qualification_exam, PDO::PARAM_STR);
            $query->bindParam("graduation", $graduation, PDO::PARAM_STR);                           //col 24-28  
            $query->bindParam("date_program", $date_program, PDO::PARAM_STR);                             
            $query->bindParam("date_first_confirm", $date_first_confirm, PDO::PARAM_STR);
            $query->bindParam("date_ohec", $date_ohec, PDO::PARAM_STR);
            $query->bindParam("date_pcru", $date_pcru, PDO::PARAM_STR);                             //col 28-32  
            $query->bindParam("date_pc", $date_pc, PDO::PARAM_STR);                             
            $query->bindParam("date_update", $date_update, PDO::PARAM_STR);
            $query->bindParam("philosophy", $philosophy, PDO::PARAM_STR);
            $query->bindParam("target", $target, PDO::PARAM_STR);                                   //col 32-36 
            $query->bindParam("expenses", $expenses, PDO::PARAM_STR);                             
            $query->bindParam("property", $property, PDO::PARAM_STR);
            $query->bindParam("faculty_id", $faculty_id, PDO::PARAM_STR);
            $query->bindParam("url", $url, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception update :  ".$e->getMessage();
        }
        return $result;
    }

    public function delete($program_id){
        $result = 0;
        try{
            $query = $this->db->prepare("DELETE FROM program WHERE program_id = :program_id");
            $query->bindParam("program_id", $program_id, PDO::PARAM_STR);
            $result = $query->execute();
        }catch(PDOException $e){
            echo "Exception delete :  ".$e->getMessage();
        }
        return $result;
    }

    public function detail($program_id){
        try{
            $query = $this->db->prepare("SELECT * FROM academic_guidance.program INNER JOIN academic_guidance.faculty f ON academic_guidance.program.faculty_id = f.faculty_id WHERE program_id = :program_id");
            $query->bindParam("program_id", $program_id, PDO::PARAM_STR);
            $query->execute();
        }catch(PDOException $e){
            echo "Exception detail :  ".$e->getMessage();
        }
        return json_encode($query->fetch(PDO::FETCH_ASSOC));
    }
}

?>