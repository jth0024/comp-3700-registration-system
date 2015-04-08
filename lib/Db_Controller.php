<?php 
/***************************************
*
* The Db_Controller handles database operations.
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

Class Db_Controller {
  	
  	// Variable holding the connection to the database
  	protected	$_con=null;

  	//Constructor, takes in connection parameters
	public function __construct(array $params) {
		$this->_con = mysqli_connect($params['host'],$params['username'],$params['password']) or die('Connection error');
	}

	// Useful for building, should be removed later
	public function getConnection() {
		return $this->_con;
	}

	// Clean insertion method - this helps us with sanitizing input
	public function insert($table,$data) {
	  $query="INSERT INTO `".$table."`  (%s)  VALUES  (%s)";
	  $fields=array();
	  $values=array();
	  foreach ($data as $key=>$val)
	  {
		$fields[]="`".$key."`";
		$values[]="'".mysqli_real_escape_string($this->_con,$val)."'";
	  }
	  $query=sprintf($query, implode( ",", $fields) ,  implode( ",", $values ) );
	  return 	$this->execute($query) ;
	}

	// Another quick clean method, this one for updating
	public function update($table,$data,$where) {
		$query="UPDATE  `".$table."`  SET   %s  ";
		$fields=array();
		foreach ($data as $key=>$val)
		{
		$fields[]="`".$key."`="."'".mysqli_real_escape_string($this->_con,$val)."'";
		}
		$where="  WHERE  ".$where;
		$query=sprintf( $query, implode( ",", $fields)).$where;
		return 	$this->execute($query) ;
	}

	// Risky to keep public but useful
	public function  delete($table,$where) {
		$query="DELETE  FROM  `".$table."`   ";
		$where="  WHERE  ".$where;
		$query=$query.$where;
		return 	$this->execute($query) ;
	}

	// Getter
	public function get($table,$where) {	
		$query="SELECT * FROM `".$table."`   WHERE 1 ";
		foreach($where as $field=>$val):
		$query.=" AND `".$field."`='".mysqli_real_escape_string($this->_con,$val)."' ";
		endforeach;
		$query.=" LIMIT 0,1";
		$result=$this->execute($query) ;
		$row=mysqli_fetch_assoc($result);
		return $row;
	}

	// Tidy yo shit up
	public function __destruct() {
		mysqli_close($this->_con);
	}

}

?>