<?php 
require_once('Account.php');

/***************************************
*
* TeacherAccount extends account and represents
* a student user.
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

Class TeacherAccount extends Account {

	protected $schedule;

	public function __construct(array $params) {
		$this->username = $params['username'];
		$this->name = $params['name'];
		$this->pwd = $params['pwd'];
		$this->permission = TEACHER_PERMISSIONS;
	}

}
?>