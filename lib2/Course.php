<?php 
/***************************************
*
* The Course represents a course.
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

	protected $name; // string
	protected $roster; // Array of student objects
	protected $instructor; // instructor object
	protected $capacity; // int
	protected $numEnrolled; // int
	protected $id; // int/string

	public function __construct(array $params) {
		$this->name = $params['name'];
		$this->roster = $params['roster'];
		$this->instructor = $params['instructor'];
		$this->capacity = $params['capacity'];
		$this->numEnrolled = $params['numEnrolled'];
		$this->ID = $params['id'];
		print_r($this->roster);
	}

	public function addStudent($student) {
		$this->roster[] = $student;
	}

	public function removeStudent($student) {
		$i = 0;
		foreach ($this->roster as $stu) {
			if($stu->getUsername() == $student->getUsername()) unset($roster[$i]);
			$i++;
		}
	}

	public function getRoster() {
		return $this->roster;
	}

	public function setInstructor($newInstructor) {
		$this->instructor = $newInstructor;
	}

	public function getInstructor() {
		return $this->instructor;
	}

	public function removeInstructor() {
		$this->instructor = null;
	}

	public function setName($newName) {
		$this->name = $newName;
	}

	public function getName() {
		return $this->name;
	}

	public function setID($newID) {
		$this->ID = $newID;
	}

	public function getID() {
		return $this->ID;
	}

	public function toArray() {
		$tempRoster = array();
		foreach($this->roster as $student) $tempRoster[] = $student->getUsername();
		$stringRoster = implode(",", $tempRoster);
		echo $stringRoster;
		return array('id' => $this->ID, 'name' => $this->name,  
			'roster' => $stringRoster, 'instructor' => $this->instructor->getUsername(), 'capacity' => $this->capacity,
			'numEnrolled' => $this->numEnrolled);
	}

}