<?php 
include('AccountManager.php');
include('CourseManager.php');
include('Session.php');
/***************************************
*
* The SessionController handles session 
* interactions with the program.
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

Class SessionController {

	protected $course_manager;
	protected $account_manager;
	protected $session;

	public function __construct(array $params) {
		$course_manager = new CourseManager();
		$account_manager = new AccountManager();
		$session = new Session();
	}

	public function checkAccount(array $params) {
		$curAccount = $account_manager->getAccount($params['id']);
		if(sha1($params['pwd']) == $curAccount['pwd']) {
			return true;
			// set up the $session with account details like
			// permissions etc.
		}
		else return false;
			// uh.. log out?
	}

	public function listCourses() {
		$courses = $course_manager->getCourses();
		return ajax($courses);
	}

	public function addCourse(array $params) {
		$course_manager->addCourse($params);
	}

	private function ajax(array $input) {
		return json_encode($input);
	}

	public function __destruct() {

	}
} ?>