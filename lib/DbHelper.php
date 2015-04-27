<?php
require_once('AdministratorAccount.php');
require_once('StudentAccount.php');
require_once('TeacherAccount.php');

/***************************************
*
* The Db_Controller handles database operations.
* 
* @package Fighting Tiger Registration System
* @author Sam Bartlett - sasbartlett.com
* @copyright (c) 2015
* @version 0.1 04/07/2015
* @since 04/07/2015
* @license MIT License http://www.opensource.org/licenses/mit-license.php
* 
*
***************************************/

Class DbHelper {
  	
  	// Variable holding the connection to the database
  	protected	$_con=null;
  	protected   $_recordset=null;

  	//Constructor, takes in connection parameters
	public function __construct(array $params) {
		$this->_con = mysqli_connect($params['host'],$params['username'],$params['password'],$params['db']) or die('Connection error');
	}






	///// PUBLIC METHODS /////






	public function getAccount($id) {
		$accountArray = $this->get(ACCOUNTS_TABLE, array('username' => $id));
		$params = array('username' => $accountArray['username'], 'pwd' => $accountArray['pwd'], 'name' => $accountArray['name'], 'permission' => $accountArray['permission']);
		switch($accountArray['permission']) {
			case ADMINISTRATOR_PERMISSIONS:
				$account = new AdministratorAccount($params);
			break;
			case STUDENT_PERMISSIONS:
				$account = new StudentAccount($params);
			break;
			case TEACHER_PERMISSIONS:
				$account = new TeacherAccount($params);
			break;
			case NO_PERMISSIONS:
				$account = new Account($params);
			break;
		}
		return $account;
	}

	public function getCourses() {
		$courseList = array();
		$courses = $this->get(COURSES_TABLE, array());
		foreach ($courses as $course) {
			$course['roster'] = explode($course['roster'], ',');
			$tempCourse = new Course($course);
			$courseList[] = $tempCourse->toJSON();
		}
		return $courseList;
	}










	/////////////////////////// PRIVATE METHODS ///////////////////////////










	// Useful for building, should be removed later
	private function getConnection() {
		return $this->_con;
	}

	// Clean insertion method - this helps us with sanitizing input
	private function insert($table,$data) {
	  $query="INSERT INTO `".$table."`  (%s)  VALUES  (%s)";
	  $fields=array();
	  $values=array();
	  foreach ($data as $key=>$val)
	  {
		$fields[]="`".$key."`";
		$values[]="'".mysqli_real_escape_string($this->_con,$val)."'";
	  }
	  $query=sprintf($query, implode( ",", $fields) ,  implode( ",", $values ) );
	  return 	$this->execute($query) ;
	}

	// Another quick clean method, this one for updating
	private function update($table,$data,$where) {
		$query="UPDATE  `".$table."`  SET   %s  ";
		$fields=array();
		foreach ($data as $key=>$val)
		{
		$fields[]="`".$key."`="."'".mysqli_real_escape_string($this->_con,$val)."'";
		}
		$where="  WHERE  ".$where;
		$query=sprintf( $query, implode( ",", $fields)).$where;
		return 	$this->execute($query) ;
	}

	// Risky to keep private but useful
	private function  delete($table,$where) {
		$query="DELETE  FROM  `".$table."`   ";
		$where="  WHERE  ".$where;
		$query=$query.$where;
		return 	$this->execute($query) ;
	}

	// Getter
	private function get($table,$where) {
		$query="SELECT * FROM `".$table ."`  WHERE 1";
		if(count($where) > 0) { 
			foreach($where as $field=>$val):
			$query.=" AND `".$field."`='".mysqli_real_escape_string($this->_con,$val)."' ";
			endforeach;
			$query.=" LIMIT 0,1";
		}
		$result=$this->execute($query) ;
		$return = array();
		while ($row = mysqli_fetch_assoc($result)) {
			$return[] = $row;
		}
		if(count($where) == 1) $return = $return[0];
		return $return;
	}
  
	// Doer
	private function execute($query) {
		if ($this->_recordset = mysqli_query($this->_con,$query)) {
			return $this->_recordset;
		} else {
			die("Error in executing query... :: ".$query." <br/>".mysqli_error($this->_con));
		}
	}
  

	// Tidy yo shit up
	public function __destruct() {
		mysqli_close($this->_con);
	}

}

?>