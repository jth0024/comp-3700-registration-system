<?php 
require_once('config.php');
require_once('DbHelper.php');
require_once('Course.php');

Class ServerController {

	protected $db;

	public function __construct() {
		$params = array('host' => HOST, 'username' => USERNAME, 'password' => PASSWORD, 'db' => DATABASE);
		$this->db = new DbHelper($params);
	}

	public function login(array $params) {
		$curAccount = $this->db->getAccount($params['username']);
		//if(sha1($params['pwd']) == $curAccount['pwd']) {
		if($params['pwd'] == $curAccount->getPassword()) {
			return $curAccount->toJSON();
		}
		else return null;
	}

	public function listCourses() {
		$courseList = $this->db-getCourses();
		return $courseList;
	}

	public function createAccount(array $params) {
		
	}

}

?>