<?php

require_once('SessionController.php');

$data = json_decode($_REQUEST, true);

//$data = array('request_type' => 'log_in', 'username' => 'sab0037', 'password' => 'samplepassword');

if(!$data['request_type']) {
	echo json_encode(array('error' => 'No Request Type'));
	exit;
}

$session_controller = new SessionController();

switch($data['request_type']) {
	case "list_courses":
	//	echo $session_controller->listCourses();
	break;
	case "log_in":
		$params = array('username' => $data['username'], 'pwd' => $data['password']);
		echo $session_controller->checkAccount($params);
	break;
	default: 
		echo json_encode(array('error' => 'Incorrect or Unfound Request Type - ' . $data['request_type']));
	break;
}
exit;
?>