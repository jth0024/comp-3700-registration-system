<?php

/***************************************
*
* Schedule contains a userID and an array of course objects.
* 
* @package Fighting Tiger Registration System
* @author Sam Bartlett - sasbartlett.com
* @copyright (c) 2015
* @version 0.1 04/07/2015
* @since 04/07/2015
* @license MIT License http://www.opensource.org/licenses/mit-license.php
* 
***************************************/

Class Schedule {

	private $username;
	private $courseList;

	public function __construct(array $params) {
		$this->username = $params['username'];
		$this->courseList = $params['courseList'];
	}

	public function getUsername() {
		return $this->username;
	}

	public function setUsername($newName) {
		$this->username = $newName;
	}

	public function getCourseList() {
		return $this->courseList;
	}

	public function addToCourseList($course) {
		$this->courseList[] = $course;
	}

	public function removeFromCourseList($removeCourse) {
		$i = 0;
		foreach($this->courseList as $course) {
			if($course->getID() == $removeCourse->getID()) {
				unset($this->courseList[$i]);
			}
			$i++;
		}
	}

}