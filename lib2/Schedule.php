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
	private $numCourses;
	private $maxNumCourses;

	public function __construct(array $params) {
		$this->username = $params['username'];
		$this->courseList = $params['courseList'];
		$this->numCourses = $params['numCourses'];
		$this->maxNumCourses = $params['maxNumCourses'];
	}

	public function getUsername() {
		return $this->username;
	}

	public function setUsername($newName) {
		$this->username = $newName;
	}

	public function getNumCourses() {
		return $this->numCourses;
	}

	public function setNumCourses($newNumCourses) {
		$this->numCourses = $newNumCourses;
	}

	public function getMaxNumCourses() {
		return $this->maxNumCourses;
	}

	public function setMaxNumCourses($newNumCourses) {
		$this->maxNumCourses = $newNumCourses;
	}

	public function getCourseList() {
		return $this->courseList;
	}

	public function addToCourseList($course) {
		$this->courseList[] = $course;
		$this->numCourses = intval($this->numCourses) + 1;
	}

	public function removeFromCourseList($deleteCourse) {
		$i = 0;
		print_r($this->toArray());
		foreach($this->courseList as $course) {
			if($course->getID() == $deleteCourse) {
				unset($this->courseList[$i]);
			}
			$i++;
		}
		$this->numCourses = intval($this->numCourses) - 1;
	}

	public function toArray() {
		$courseListTemp = array();
		foreach ($this->courseList as $course) {
			$courseListTemp[] = $course->getID();
		}
		return array('username' => $this->username, 'courseList' => implode(",", $courseListTemp), 
			'numCourses' => $this->numCourses, 'maxNumCourses' => $this->maxNumCourses);
	}

}