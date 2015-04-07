<?php 
/***************************************
*
* The Course represents a course. It is a 
* fairly small class relying on the CourseManager
* to handle it.
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

Class Course {

	protected $roster[];
	protected $instructor;

	public function __construct(array $params) {

	}

	public function add_student($student) {
		$roster[] = $student;
	}

	public function remove_student($student) {
		foreach ($roster as $key => $value) {
			if($value == $student) unset($roster[$key]);
		}
	}

	public function get_roster() {
		return $roster;
	}

	public function set_instructor($newInstructor) {
		$instructor = $newInstructor;
	}

	public function get_instructor() {
		return $instructor;
	}
}