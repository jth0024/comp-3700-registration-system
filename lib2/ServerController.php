<?php 
require_once('config.inc.php');
require_once('DatabaseManager.php');
require_once('Course.php');
require_once('StudentAccount.php');
require_once('InstructorAccount.php');
require_once('AdministratorAccount.php');
require_once('Schedule.php');

Class ServerController {

	protected $db;

	public function __construct() {
		$params = array('host' => HOST, 'username' => USERNAME, 'password' => PASSWORD, 'db' => DATABASE);
		$this->db = new DatabaseManager($params);
	}

	public function login($username, $password) {
		$curAccount = $this->db->getAccount($username);
		if($password == $curAccount->getPassword()) {
			return $curAccount->toJSON();
		}
		else return json_encode(array('error' => array('msg' => 'Invalid Credentials')), true);
	}

	public function createAccount($params) {
		switch($params['permission']) {
			case STUDENT_PERMISSION:
				$account = new StudentAccount($params);
				$this->db->insertAccount($account);
				$params = array('username' => $account->getUsername(), 'courseList' => array(), 'numCourses' => '0', 'maxNumCourses' => '6');
				$schedule = new Schedule($params);
				$this->db->insertSchedule($schedule);
			break;
			case INSTRUCTOR_PERMISSION:
				$account = new InstructorAccount($params);
				$this->db->insertAccount($account);
				$params = array('username' => $account->getUsername(), 'courseList' => array(), 'numCourses' => 0, 'maxNumCourses' => 6);
				$schedule = new Schedule($params);
				$this->db->insertSchedule($schedule);
			break;
			case ADMINISTRATOR_PERMISSION:
				$account = new AdministratorAccount($params);
				$this->db->insertAccount($account);
			break;
			default:
				return json_encode(array('error' => array('msg' => 'Invalid Permission - ' . $params['permission'])), true);
			break;
		}
	}

	public function deleteAccount($username) {
		$this->db->deleteAccount($username);
		//TODO: Delete Schedule
		//TODO: Delete Account from courses
		//TODO: Something with teacher's courses..?
	}

	public function getAllAccounts() {
		return json_encode($this->db->getAllAccounts(), true);
	}

	public function updateAccount($params) {
		switch($params['permission']) {
			case STUDENT_PERMISSION:
				$account = new StudentAccount($params);
				$this->db->updateAccount($account);
			break;
			case INSTRUCTOR_PERMISSION:
				$account = new InstructorAccount($params);
				$this->db->updateAccount($account);
			break;
			case ADMINISTRATOR_PERMISSION:
				$account = new AdministratorAccount($params);
				$this->db->updateAccount($account);
			break;
			default:
				return json_encode(array('error' => array('msg' => 'Invalid Permission - ' . $params['permission'])), true);
			break;
		}
	}

	public function createCourse($params) {
		$instructor = $this->db->getAccount($params['instructor']);
		$name = $params['name'];
		$capacity = $params['capacity'];
		$numEnrolled = 0;
		$roster = array();
		foreach($params['roster'] as $student) $roster[] = $this->db->getAccount($student);
		$course = new Course(array('instructor' => $instructor, 'name' => $name, 'capacity' => $capacity, 'numEnrolled' => $numEnrolled, 'roster' => $roster));
		$this->db->insertCourse($course);
	}

	public function removeCourse($courseID) {
		// TODO: GET ARRAY OF STUDENTS IN COURSE AND REMOVE COURSE FROM THEIR SCHEDULES.
		$this->db->deleteCourse($courseID);
	}

	public function addStudentToCourse($username, $courseID) {
		//$course = $this->db->getCourse($courseID);
		//$course->addStudent($this->db->getAccount($username));
		//$this->db->updateCourse($course);
		$schedule = $this->db->getSchedule($username);
		echo $schedule->getUsername();
	}

	public function removeStudentFromCourse($username, $courseID) {
		
	}

	public function addInstructorToCourse($username, $courseID) {

	}

	public function removeInstructorFromCourse($courseID) {
		
	}

	public function getSchedule($username) {
		return $this->db->getSchedule($username);
	}

}