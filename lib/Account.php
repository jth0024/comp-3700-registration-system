<?php 
require_once('config.php');
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
*
***************************************/

Class Account {

	protected $username;
	protected $name;
	protected $pwd; //Should be stored with sha1 hash.
	protected $permissions;

	public function __construct(array $params) {
		$this->username = $params['username'];
		$this->name = $params['name'];
		$this->pwd = $params['pwd'];
		$this->permissions = NO_PERMISSIONS;
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

	public function getPermissions() {
		return $this->permissions;
	}

	public function setPermissions($newPermissions) {
		$this->permissons = $newPermissions;
	}

	public function getPwd() {
		return $this->pwd;
	}

	public function setPwd($newPwd) {
		$this->pwd = sha1($params($newPwd));
	}

	public function __destruct() {

	}
}
?>