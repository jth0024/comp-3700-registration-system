<?php 
include('Db_Controller.php');
include('Course.php');
/***************************************
*
* The CourseManager handles course 
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

Class CourseManager {

	protected $db;

	public function __construct(array $params) {
		$db = new Db_Controller('host', 'username', 'password');
	}

	public function __destruct() {
		
	}
}?>