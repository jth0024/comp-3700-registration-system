<?php 
include('config.php');
include('Db_Controller.php');
include('AdministratorAccount.php');
include('StudentAccount.php');
include('TeacherAccount.php');
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

	public function __construct(array $params) {
		$db = new Db_Controller(HOST, USERNAME, PASSWORD);
	}

	public function getAccount($id) {
		$accountArray = $db->get(ACCOUNTS_TABLE, array('id', $id));
		// Switch statement based on the types of accounts
		// Need to determine how to track this in the database (permissions?)
	}

	// This feels like cheating the system.
	public function getAccountData($id) {
		return $db->get(ACCOUNTS_TABLE, array('id', $id));
	}

	public function newAccount(array $params) {
		switch($params['permissions']) {
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