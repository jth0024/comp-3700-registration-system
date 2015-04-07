<?php 

Class Db_Controller {
  	
  	// Variable holding the connection to the database
  	protected	$_con=null;

  	//Constructor, takes in connection parameters
	public function __construct(array $params) {
		$this->_con = mysqli_connect($params['host'],$params['username'],$params['password']) or die('Connection error');
	}

}

?>