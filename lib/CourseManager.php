<?php 
require_once('config.php');
require_once('Db_Controller.php');
require_once('Course.php');
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

	public function __construct() {
		$params = array('host' => HOST, 'username' => USERNAME, 'password' => PASSWORD, 'db' => DATABASE);
		$this->db = new Db_Controller($params);
	}

	public function getCourses() {
		$courses = $this->db->get(COURSES_TABLE, array());
		$courseList = array();
		foreach($courses as $course) {
			$courseList[$course['dbID']] = $course['name'];
		}
		return $courseList;
	}

	public function addCourse(array $params) {
		$newCourse = new Course($params);
		$this->db->insert(COURSES_TABLE, array('name' => $newCourse->getName(), 'instructor' => $newCourse->getInstructor(), 'students' => $newCourse->getStudents()));
	}

	public function __destruct() {
		
	}
}?>