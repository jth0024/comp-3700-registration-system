<?php

$data = json_decode($_REQUEST, true);

if(!$data['request_type']) {
	echo json_encode(array('error' => 'No Request Type'));
	exit;
}

switch($data) {
	case "":
		
	break;
	default: 
	echo json_encode(array('error' => 'Incorrect / Unfound Test Type'));
	break;
}
exit;
?>