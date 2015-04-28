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
		if($this->db->getAccount($username)->getPermission() == STUDENT_PERMISSION) {
			$schedule = $this->db->getSchedule($username);
			$courseList = $schedule->getCourseList();
			foreach ($courseList as $course) {
				$course->removeStudent($username);
				$this->db->updateCourse($course);
			}
			$this->db->deleteSchedule($username);
		} else if($this->db->getAccount($username)->getPermission() == INSTRUCTOR_PERMISSION) {
			$schedule = $this->db->getSchedule($username);
			$courseList = $schedule->getCourseList();
			foreach ($courseList as $course) {
				$temp = new Account(array('username'=>"TBA"));
				$course->setInstructor($temp);
				$this->db->updateCourse($course);
			}
			$this->db->deleteSchedule($username);
		}
		$this->db->deleteAccount($username);
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
		$day = $params['day'];
		$startTime = $params['startTime'];
		$numEnrolled = 0;
		$roster = array();
		foreach($params['roster'] as $student) $roster[] = $this->db->getAccount($student);
		$course = new Course(array('instructor' => $instructor, 'name' => $name, 'day' => $day, 'startTime' => $startTime, 'capacity' => $capacity, 'numEnrolled' => $numEnrolled, 'roster' => $roster));
		$this->db->insertCourse($course);
		$courses = $this->db->getAllCourses();
		$courseID = "";
		foreach($courses as $course) {
			if($course['name'] == $name && $course['instructor'] == $instructor->getUsername() && $course['day'] == $day && $course['time'] == $time)
				$courseID = $course['id'];
		}
		$schedule = $this->db->getSchedule($instructor->getUsername());
		$schedule->addToCourseList($this->db->getCourse($courseID));
		$this->db->updateSchedule($schedule);
	}

	public function deleteCourse($courseID) {
		$course = $this->db->getCourse($courseID);

		$instructorid = $course->getInstructor()->getUsername();
		$schedule = $this->db->getSchedule($instructorid);
		$schedule->removeFromCourseList($courseID);
		$this->db->updateSchedule($schedule);

		$roster = $course->getRoster();
		foreach ($roster as $student) {
			$schedule = $this->db->getSchedule($student->getUsername());
			$schedule->removeFromCourseList($courseID);
			$this->db->updateSchedule($schedule);
		}

		$this->db->deleteCourse($courseID);
	}

	public function addStudentToCourse($username, $courseID) {
		$schedule = $this->db->getSchedule($username);
		$course = $this->db->getCourse($courseID);
		$course->addStudent($this->db->getAccount($username));
		$schedule->addToCourseList($course);
		$this->db->updateCourse($course);
		$this->db->updateSchedule($schedule);
	}

	public function removeStudentFromCourse($username, $courseID) {
		$course = $this->db->getCourse($courseID);
		$course->removeStudent($username);
	}

	public function addInstructorToCourse($username, $courseID) {
		$instructor = $this->db->getAccount($username);
		$course = $this->db->getCourse($courseID);
		$course->setInstructor($instructor);
		$instructorSchedule = $this->db->getSchedule($instructor->getUsername());
		$instructorSchedule->addToCourseList($course);
		$this->db->updateCourse($course);
		$this->db->updateSchedule($instructorSchedule);

	}

	public function removeInstructorFromCourse($courseID) {
		$course = $this->db->getCourse($courseID);
		$instructor = $course->getInstructor();
		$account = new Account(array('username'=>'TBA'));
		$course->setInstructor($account);
		$instructorSchedule = $this->db->getSchedule($instructor->getUsername());
		$instructorSchedule->removeFromCourseList($courseID);
		$this->db->updateCourse($course);
		$this->db->updateSchedule($instructorSchedule);
	}

	public function getSchedule($username) {
		return json_encode($this->db->getSchedule($username)->toArray(), true);
	}

	public function getAllCourses() {
		return json_encode($this->db->getAllCourses(), true);
	}

}