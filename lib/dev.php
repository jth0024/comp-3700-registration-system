<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('ServerController.php');

$data = json_decode($_REQUEST['requ'], true);

//$data = array('request_type' => 'list_courses');

//$data = array('request_type' => 'log_in', 'username' => 'student10', 'password' => 'password');


if(!$data['request_type']) {
	echo json_encode(array('error' => 'No Request Type - ' . print_r($data)));
	exit;
}

$server_controller = new ServerController();

switch($data['request_type']) {
	case "list_courses":
		// Returns JSON {id: name, id: name ..}
		echo $server_controller->listCourses();
	break;
	case "create_user":
		$params = array('username' => $data['username'], 'name' => $data['name'], 'pwd' => $data['pwd'], 'permission' => $data['permission']);
		$server_controller->createAccount($params);
	break;
	case "log_in":
		$params = array('username' => $data['username'], 'pwd' => $data['password']);
		echo $server_controller->login($params);
	break;
	default: 
		echo json_encode(array('error' => 'Incorrect or Unfound Request Type - ' . $data['request_type']));
	break;
}
exit;
?>