<?php 
require_once('config.php');
require_once('Db_Controller.php');
require_once('AdministratorAccount.php');
require_once('StudentAccount.php');
require_once('TeacherAccount.php');
/***************************************
*
* The AccountManager handles account 
* interactions with the database.
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

Class AccountManager {

	protected $db;
	protected $dp_params;

	public function __construct() {
		$params = array('host' => HOST, 'username' => USERNAME, 'password' => PASSWORD, 'db' => DATABASE);
		$this->db = new Db_Controller($params);
	}

	public function getAccount($id) {
		$accountArray = $this->db->get(ACCOUNTS_TABLE, array('username' => $id))[0];
		$params = array('username' => $accountArray['username'], 'pwd' => $accountArray['pwd'], 'name' => $accountArray['name'], 'permissions' => $accountArray['permissions']);
		switch($accountArray['permissions']) {
			case ADMINISTRATOR_PERMISSIONS:
				$account = new AdministratorAccount($params);
			break;
			case STUDENT_PERMISSIONS:
				$account = new StudentAccount($params);
			break;
			case TEACHER_PERMISSIONS:
				$account = new TeacherAccount($params);
			break;
			case NO_PERMISSIONS:
				$account = new Account($params);
			break;
		}
		return $account;
	}

	// This feels like cheating the system.
	public function getAccountData($id) {
		return $db->get(ACCOUNTS_TABLE, array('id', $id));
	}

	public function newAccount(array $params) {
			print_r($params);
		switch($params['permission']) {
			case NO_PERMISSIONS: 
			break;
			case STUDENT_PERMISSIONS: 
				$newAccount = new StudentAccount($params);
			break;
			case TEACHER_PERMISSIONS: 
				$newAccount = new TeacherAccount($params);
			break;
			case ADMINISTRATOR_PERMISSIONS: 
				$newAccount = new AdministratorAccount($params);
			break;
		}
		//store in database
	}

	public function __destruct() {

	}
}?>