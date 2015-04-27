<<<<<<< Updated upstream
<?php 
require_once('AccountManager.php');
require_once('CourseManager.php');
require_once('Session.php');
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

	public function __construct() {
		$this->course_manager = new CourseManager();
		$this->account_manager = new AccountManager();
		//$session = new Session();
	}

	public function login(array $params) {
		$curAccount = $this->account_manager->getAccount($params['username']);
		//if(sha1($params['pwd']) == $curAccount['pwd']) {
		if($params['pwd'] == $curAccount->getPassword()) {
			$result = array('username' => $curAccount->getUsername(), 'name' => $curAccount->getName(), 'permission' => $curAccount->getPermissions());
			return $this->prep($result);
		}
		else return json_encode(array('error' => array('msg' => 'Invalid Credentials'), true));
	}

	public function listCourses() {
		$courses = $this->course_manager->getCourses();
		return $this->prep($courses);
	}

	public function addCourse(array $params) {
		$course_manager->addCourse($params);
	}

	private function prep(array $input) {
		return json_encode($input);
	}

	public function __destruct() {

	}
>>>>>>> origin/master
=======
<?php 
require_once('AccountManager.php');
require_once('CourseManager.php');
require_once('Session.php');
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

	public function __construct() {
		$this->course_manager = new CourseManager();
		$this->account_manager = new AccountManager();
		//$session = new Session();
	}

	public function createAccount(array $params) {
		$account = $this->account_manager->newAccount($params);
	}

	public function login(array $params) {
		$curAccount = $this->account_manager->getAccount($params['username']);
		//if(sha1($params['pwd']) == $curAccount['pwd']) {
		if($params['pwd'] == $curAccount->getPassword()) {
			$result = array('username' => $curAccount->getUsername(), 'name' => $curAccount->getName(), 'permission' => $curAccount->getPermissions());
			return $this->prep($result);
		}
		else return null;
	}

	public function listCourses() {
		$courses = $this->course_manager->getCourses();
		return $this->prep($courses);
	}

	public function addCourse(array $params) {
		$course_manager->addCourse($params);
	}

	private function prep(array $input) {
		return json_encode($input);
	}

	public function __destruct() {

	}
>>>>>>> Stashed changes
} ?>