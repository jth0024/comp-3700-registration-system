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
***************************************/

Class StudentAccount extends Account {

	private $holds;
	private $registrationStatus;

	public function __construct(array $params) {
		$this->username = $params['username'];
		$this->name = $params['name'];
		$this->password = $params['password'];
		$this->permission = STUDENT_PERMISSION;
		$this->holds = $params['holds'];
		$this->registrationStatus = $params['registrationStatus'];
	}

	public function getHolds() {
		return $this->holds;
	}

	public function setHolds($hold) {
		$this->holds = $hold;
	}

	public function getRegistrationStatus() {
		return $this->registrationStatus;
	}

	public function setRegistrationStatus($status) {
		$this->registrationStatus = $status;
	}

	public function toArray() {
		return array('username' => $this->username, 'name' => $this->name, 
			'permission' => $this->permission, 'holds' => $this->holds, 
			'password' => $this->password, 'registrationStatus' => $this->registrationStatus);
	}

	public function toJSON() {
		return json_encode(array('username' => $this->username, 'name' => $this->name, 
			'permission' => $this->permission, 'holds' => $this->holds, 
			'registrationStatus' => $this->registrationStatus));
	}

}
?>