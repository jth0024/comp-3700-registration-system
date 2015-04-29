<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('ServerController.php');

$data = json_decode($_REQUEST['message'], true);

$data = array('request_type' => 'log_in', 'username' => 'student5', 'password' => 'password');

//$data = array('request_type' => 'create_account', 'username' => 'student5', 'password' => 'password', 'permission' => 'student', 'name' => 'Sample Student', 'holds' => 'false', 'registrationStatus' => 'Junior');

//$data = array('request_type' => 'create_account', 'username' => 'admin10', 'password' => 'password', 'permission' => 'admin', 'name' => 'Sample Admin');

//$data = array('request_type' => 'get_all_accounts');

//$data = array('request_type' => 'update_account', 'username' => 'student5', 'password' => 'password', 'permission' => 'instructor', 'name' => 'Test');

//$data = array('request_type' => 'create_course', 'name' => 'Comp3100', 'instructor' => 'instructor10', 'capacity' => '30', 'roster' => array(), 'day' => 'MWF', 'startTime' => '9:00:00');

//$data = array('request_type' => 'remove_course', 'courseID' => '2');

//$data = array('request_type' => 'add_student_to_course', 'courseID' => '4', 'username' => "student5");

//$data = array('request_type' => 'remove_student_from_course', 'courseID' => '4', 'username' => "student5");

//$data = array('request_type' => 'add_instructor_to_course', 'courseID' => '4', 'username' => "instructor10");

//$data = array('request_type' => 'get_schedule', 'username' => 'student10');

//$data = array('request_type' => 'delete_account', 'username' => 'instructor10');

//$data = array('request_type' => 'get_all_courses');

if(!$data['request_type']) {
	echo json_encode(array('error' => array('msg' => 'No Request Type - ' . print_r($data))));
	exit;
}

$server_controller = new ServerController();

switch($data['request_type']) {
	case "log_in":
		echo $server_controller->login($data['username'], $data['password']);
	break;
	case "create_account":
		unset($data['request_type']);
		echo $server_controller->createAccount($data);
	break;
	case "delete_account":
		echo $server_controller->deleteAccount($data['username']);
	break;
	case "get_all_accounts":
		echo $server_controller->getAllAccounts();
	break;
	case "update_account":
		unset($data['request_type']);
		echo $server_controller->updateAccount($data);
	break;
	case "create_course":
		unset($data['request_type']);
		echo $server_controller->createCourse($data);
	break;
	case "remove_course":
		unset($data['request_type']);
		echo $server_controller->deleteCourse($data['courseID']);
	break;
	case "add_student_to_course":
		echo $server_controller->addStudentToCourse($data['username'], $data['courseID']);
	break;
	case "remove_student_from_course":
		echo $server_controller->removeStudentFromCourse($data['username'], $data['courseID']);
	break;
	case "add_instructor_to_course":
		echo $server_controller->addInstructorToCourse($data['username'], $data['courseID']);
	break;
	case "remove_instructor_from_course":
		echo $server_controller->removeInstructorFromCourse($data['courseID']);
	break;
	case "get_schedule":
		echo $server_controller->getSchedule($data['username']);
	break;
	case "get_all_courses":
		echo $server_controller->getAllCourses();
	break;
	default: 
		echo json_encode(array('error' => array('msg' => 'Incorrect or Unfound Request Type - ' . $data['request_type'])));
	break;
}
exit;
?>