<html>
	<head>
	<title>Emotion Stat viewer</title>
	
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
	<link rel="stylesheet" href="styles/indexstyle.css">
	<link href='http://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
	<link rel="icon" type="image/ico" href="img/favicon.ico">
	
	</head>
	
	<body>
		
		<nav class="navbar navbar-default">
			<div class="container">
				<div class="navbar-header">
					<a class="navbar-brand" href="index.php"><span class='glyphicon glyphicon-th-large'></span> Emotion Stat viewer</a>
				</div>
				
				<div class="collapse navbar-collapse">
					<ul id='navbar_list' class="nav navbar-nav">
						<li class="active"><a data-toggle="tab" href="#myprofile">My profile</a></li>
						<li class='myfriends_tab'><a data-toggle="tab" href="#myfriends">My Circle of Friends</a></li>
					</ul>
				</div>
			</div>
		</nav>
		
		<div class="container">
			<div class="well">
				<ul class="nav nav-tabs">
					<li class="active"><a data-toggle="tab" href="#myprofile">My profile</a></li>
					<li class='myfriends_tab'><a data-toggle="tab" href="#myfriends">My Circle of Friends</a></li>
				</ul>
				
				<div class='tab-content'>
					<div id='myprofile' class="panel panel-primary tab-pane fade in active">
						
						<div class="panel-body">
							<div class="row">
								<div class="left_col col-md-2">
									<div id='mydata'>
										<div id='myimg'></div>
										<br>
										<div id='myname' class='text-center'></div>
										
										<div class='person-details'>
											<div id='myusername'></div>
											<div id='myid'></div>
											
											<div id='mybirth'></div>
											<div id='mygender'></div>
											<div id='mylocation'></div>
											<div id='myfriendcount'></div>
										</div>
									</div>
								</div>
								<div class="col-md-offset-1 col-md-9">
									<center>
									<h4>My mood</h4>
									<div id='mycanvas'>
										<canvas id='mycanvas_area' width="300" height="260"/></canvas>
										<canvas id='mycanvas_dict' width="300" height="260"/></canvas>
									</div>
									</center>
								</div>
							</div>
						</div>
					</div> <!-- END MYPROFILE -->
					
					<div id='myfriends' class="panel panel-primary tab-pane fade">
						
						<div class="panel-body">
							
						</div>
					</div> <!-- END MYFRIENDS -->
				</div>
			</div>
		</div>
		
		<footer class="footer">
			<div class="container">
				<p class="text-muted">Copyright &copy; Emotion Stat</p>
			</div>
		</footer>
	</body>
	
	<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js"></script>
	<script src="scripts/Chart.min.js"></script>
	<script src="scripts/main.js"></script>

</html>