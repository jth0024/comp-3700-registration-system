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

	protected $name;
	protected $roster;
	protected $instructor;
	protected $capacity;
	protected $ID;

	public function __construct(array $params) {
		$this->name = $params['name'];
		$this->roster = $params['roster'];
		$this->instructor = $params['instructor'];
		$this->capacity = $params['capacity'];
		$this->ID = $params['ID'];
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
		return array('id' => $this->ID, 'name' => $this->name,  
			'roster' => $this->roster, 'permission' => $this->permission);
	}

}