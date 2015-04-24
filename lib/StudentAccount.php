<?php 
require_once('Account.php');

/***************************************
*
* StudentAccount extends account and represents
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

Class StudentAccount extends Account {

	protected $schedule;

	public function __construct(array $params) {
		$this->username = $params['username'];
		$this->name = $params['name'];
		$this->pwd = $params['pwd'];
		$this->permissions = STUDENT_PERMISSIONS;
	}
}
?>