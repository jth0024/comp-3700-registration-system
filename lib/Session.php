<?php 
/***************************************
*
* The Session stores data about the user
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

Class Session {

	protected $userID;
	protected $pwd;
	protected $permissions;

	public function __construct(array $params) {
		$userID = $params['id'];
		$pwd = $params['pwd'];
		$permissions = $params['permissions'];
	}

} ?>