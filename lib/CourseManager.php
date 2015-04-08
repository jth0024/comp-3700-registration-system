<?php 
include('config.php');
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
		$db = new Db_Controller(HOST, USERNAME, PASSWORD);
	}

	public function getCourses() {
		$courses = $db->get(COURSES_TABLE, '*');
		return $courses;
	}

	public function addCourse(array $params) {
		$newCourse = new Course($params);
		$db->insert(COURSES_TABLE, array('name': $newCourse->getName(), 'instructor': $newCourse->getInstructor(), 
			'students': $newCourse->getStudents()));
	}

	public function __destruct() {
		
	}
}?>