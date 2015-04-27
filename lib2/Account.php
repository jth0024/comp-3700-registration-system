<?php

require_once('config.inc.php');

/***************************************
*
* The Account represents users of the systems.
* 
* @package Fighting Tiger Registration System
* @author Sam Bartlett - sasbartlett.com
* @copyright (c) 2015
* @version 0.1 04/07/2015
* @since 04/07/2015
* @license MIT License http://www.opensource.org/licenses/mit-license.php
* 
***************************************/

Class Account {

	protected $username;
	protected $name;
	protected $password;
	protected $permission;

	public function __construct(array $params) {
		$this->username = $params['username'];
		$this->name = $params['name'];
		$this->pwd = $params['password'];
		$this->permission = NO_PERMISSION;
	}

	public function getUsername() {
		return $this->username;
	}

	public function setUsername($newId) {
		$this->username = $newId;
	}

	public function getName() {
		return $this->name;
	}

	public function setName($newName) {
		$this->name = $newName;
	}

	public function getPermission() {
		return $this->permission;
	}

	public function setPermission($newPermission) {
		$this->permisson = $newPermission;
	}

	public function getPassword() {
		return $this->password;
	}

	public function setPassword($newPwd) {
		$this->password = sha1($params($newPwd));
	}


	public function toArray() {
		return array('username' => $this->username, 'name' => $this->name,  
			'password' => $this->password, 'permission' => $this->permission);
	}

	public function toJSON() {
		return json_encode(array('username' => $this->username, 'name' => $this->name, 'permission' => $this->permission));
	}


}