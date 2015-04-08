<?php 
include('config.php');
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

	protected $id;
	protected $pwd; //Should be stored with sha1 hash.
	protected $permissions;

	public function __construct(array $params) {
		$id = $params['id'];
		$pwd = sha1($params['pwd']); //Whenever receiving password, encrypt it.
		$permissions = NO_PERMISSIONS;
	}

	public function getId() {
		return $id;
	}

	public function setId($newId) {
		$id = $newId;
	}

	public function getPwd() {
		return $pwd;
	}

	public function setPwd($newPwd) {
		$pwd = sha1($params($newPwd));
	}

	public function __destruct() {

	}
}
?>