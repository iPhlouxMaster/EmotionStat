function post(url, callback, data_to_send){
	$.ajax({
		type: 'POST',
		url: url,
		data: data_to_send,
		async: false,
		success: function(data){ callback(data); },
		error: function(error){ callback(error); }
	});
}

function Person(id){
	var person_data;
	
	post('static/fetchperson.php', function(data){
		person_data = JSON.parse(data)[0];
	}, {id:id,length:1});
	
	this.id = person_data["id"];
	this.username = person_data["username"];
	
	this.feed = person_data["feed"];
	
	this.friendlist = person_data["friendlist"].replace(/\[|\]|(?: ,)?null(?:,)?/g,"").split(",");

	this.profile = JSON.parse(person_data["profile"].replace("\[","{\"").replace("\]","\"}").replace(/: /g,"\": \"").replace(/, /g,"\", \""));
	this.firstName = this.profile.firstName;
	this.lastName = this.profile.lastName;
	this.birthday = this.profile.birthday;
	this.pictureURL = this.profile.pictureURL;
	this.relationship = this.profile.relationship;
	this.gender = this.profile.gender;
	this.location = this.profile.location.split("|")[0];
	this.url = this.profile.url;
	this.id = this.profile.id;
}

function updateMyProfile(){
	var myprofile = new Person(0);
	console.log(myprofile.pictureURL);
	$("#mydata > #myimg").html("<a href='"+myprofile.url+"'><img class=\"img-responsive img-circle\" src=\""+myprofile.pictureURL+"\"></a>");	
	$("#mydata > #myname").html("<h4>"+myprofile.firstName+" "+myprofile.lastName+"</h4>");
	$("#mydata > #myusername").html("<h5>"+myprofile.username+"</h5>");
	$("#mydata > #myid").html("<h5>"+myprofile.id+"</h5>");
	$("#mydata > #mybirth").html("<h5>"+myprofile.birthday+"</h5>");
	$("#mydata > #mygender").html("<h5>"+myprofile.gender+"</h5>");
	$("#mydata > #mylocation").html("<h5>"+myprofile.location+"</h5>");
	$("#mydata > #myfriendcount").html("<h5><b>"+myprofile.friendlist.length+"</b> friends</h5>");
}

$(function(){
	updateMyProfile();
});