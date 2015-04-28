<?php
require_once('AdministratorAccount.php');
require_once('StudentAccount.php');
require_once('InstructorAccount.php');
require_once('Course.php');
require_once('Schedule.php');



/***************************************
*
* The DatabaseManager handles database operations.
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

Class DatabaseManager {
  	
  	// Variable holding the connection to the database
  	protected	$_con=null;
  	protected   $_recordset=null;

  	//Constructor, takes in connection parameters
	public function __construct(array $params) {
		$this->_con = mysqli_connect($params['host'],$params['username'],$params['password'],$params['db']) or die('Connection error');
	}

	/////////////////////////// PUBLIC METHODS ///////////////////////////

	public function getAccount($id) {
		$accountArray = $this->get(ACCOUNTS_TABLE, array('username' => $id));
		$params = array('username' => $accountArray['username'], 'password' => $accountArray['password'], 'name' => $accountArray['name'], 'permission' => $accountArray['permission']);
		switch($accountArray['permission']) {
			case ADMINISTRATOR_PERMISSION:
				$account = new AdministratorAccount($params);
			break;
			case STUDENT_PERMISSION:
				$account = new StudentAccount($params);
			break;
			case TEACHER_PERMISSION:
				$account = new TeacherAccount($params);
			break;
			case NO_PERMISSION:
				$account = new Account($params);
			break;
		}
		return $account;
	}

	public function updateAccount($account) {
		$temp = $account->toArray();
		return $this->update(ACCOUNTS_TABLE, $temp,  "username = '" . $temp['username'] . "'");
	}

		//get the schedule w/ account id
		//loop through schedule and remove the student from the courses
		//remove the schedule for the student
		//Remove the account

	public function deleteAccount($accountID) {
		return $this->delete(ACCOUNTS_TABLE, "username = '" . $accountID . "'");
	}

	public function getAllAccounts() {
		return $this->get(ACCOUNTS_TABLE, array());
	}

	public function insertAccount($account) {
		return $this->insert(ACCOUNTS_TABLE, $account->toArray());
	}

	public function getCourse($courseID) {
		$courseArray = $this->get(COURSES_TABLE, array('id' => $courseID));
		$stringRoster = $courseArray['courseList'];
		$rosterTemp = explode(",", $stringRoster);
		$roster = array();
		foreach($rosterTemp as $studentID) $roster[] = $this->getAccount($studentID);
		$instructor = $this->getAccount($courseArray['instructor']);
		$params = array('id' => $courseArray['id'], 'name' => $courseArray['name'], 'day' => $courseArray['day'], 'startTime' => $courseArray['startTime'], 'capacity' => $courseArray['capacity'], 'numEnrolled' => $courseArray['numEnrolled'], 'instructor' => $instructor, 'roster' => $roster);
		return new Course($params);

	}

	public function updateCourse($course) {
		$temp = $course->toArray();
		return $this->update(COURSES_TABLE, $temp, array('id' => $temp['id']));
	}

	public function deleteCourse($courseID) {
		return $this->delete(COURSES_TABLE, "id = '" . $courseID . "'");
	}

	public function getAllCourses() {
		return $this->get(COURSES_TABLE, array());
	}

	public function insertCourse($course) {
		return $this->insert(COURSES_TABLE, $course->toArray());
	}

	public function insertSchedule($schedule) {
		return $this->insert(SCHEDULE_TABLE, $schedule->toArray());
	}

	public function deleteSchedule($username) {
		return $this->delete(SCHEDULE_TABLE, "username = '" . $username . "'");
	}

	public function getSchedule($username) {
		$params = $this->get(SCHEDULE_TABLE, array('username' => $username));
		$stringCourseList = explode(",", $params['classList']);
		$courseList = array();
		foreach($stringCourseList as $id) $courseList[] = $this->getCourse($id);
		$params = array('username' => $username, 'courseList' => $courseList);
		$schedule = new Schedule($params);
		return $schedule;
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
			die(json_encode(array('error' => array('msg' => mysqli_error($this->_con))), true));
		}
	}
  

	// Tidy yo shit up
	public function __destruct() {
		mysqli_close($this->_con);
	}

}