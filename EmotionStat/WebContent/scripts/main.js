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

var pieData = [
				{
					value: 100,
					color:"#F7464A",
					highlight: "#FF5A5E",
					label: "Red"
				},
				{
					value: 100,
					color: "#46BFBD",
					highlight: "#5AD3D1",
					label: "Green"
				}];

function Person(id){
	var person_data;
	
	post('static/fetchperson.php', function(data){
		person_data = JSON.parse(data)[0];
	}, {id:id,length:1});
	
	this.id = person_data["id"];
	this.username = person_data["username"];
	
	this.feed = person_data["feed"];
	
	this.friendlist = person_data["friendlist"].replace(/\[|\]|(?: ,)?null(?:,)?/g,"").split(",");

	var profile_json = person_data["profile"].replace(/\"/g,"\\\"").replace("\[","{\"").replace("\]","\"}").replace(/: /g,"\": \"").replace(/, (.+?:)/g,"\", \"$1");
	this.profile = JSON.parse(profile_json);
	
	this.firstName = decodeURI(escape(this.profile.firstName));
	this.lastName = decodeURI(escape(this.profile.lastName));
	this.birthday = decodeURI(escape(this.profile.birthday));
	this.pictureURL = this.profile.pictureURL;
	this.relationship = decodeURI(escape(this.profile.relationship));
	this.gender = decodeURI(escape(this.profile.gender));
	this.location = this.profile.location.split("|")[0];
	this.url = this.profile.url;
	this.id = this.profile.id;
}


function updateMyProfile(){
	var myprofile = new Person(0);
	$("#mydata > #myimg").html("<a href='"+myprofile.url+"'><img class=\"img-responsive img-circle\" src=\""+myprofile.pictureURL+"\"></a>");	
	$("#mydata > #myname").html("<h4>"+myprofile.firstName+" "+myprofile.lastName+"</h4>");
	$("#mydata > #myusername").html("<h5>"+myprofile.username+"</h5>");
	$("#mydata > #myid").html("<h5>"+myprofile.id+"</h5>");
	$("#mydata > #mybirth").html("<h5>"+myprofile.birthday+"</h5>");
	$("#mydata > #mygender").html("<h5>"+myprofile.gender+"</h5>");
	$("#mydata > #mylocation").html("<h5>"+myprofile.location+"</h5>");
	$("#mydata > #myfriendcount").html("<h5><b>"+myprofile.friendlist.length+"</b> friends</h5>");

	// Fill pie:
	var ctx = document.getElementById("mycanvas_area").getContext("2d");
	window.myPie = new Chart(ctx).Pie(pieData);
}

var friends_added = 0;
function addFriend(id, addgraph){
	var person = new Person(id);
	
	$("#myfriends > .panel-body").append(
			"<div class='row'>" +
				"<div class=\"left_col col-md-2\">" +
					"<p class='enumerator'>#"+(friends_added+1)+"</p>"+
					"<div id='friend_data_"+friends_added+"'>"+
					"<div id='img_"+friends_added+"'></div>"+
					"<br>"+
					"<div id='name_"+friends_added+"' class='text-center'></div>"+
					"<div id='username_"+friends_added+"' class='text-center'></div>"+
					"<div id='id_"+friends_added+"' class='text-center'></div>"+
					"<div id='birth_"+friends_added+"' class='text-center'></div>"+
					"<div id='gender_"+friends_added+"' class='text-center'></div>"+
					"<div id='location_"+friends_added+"' class='text-center'></div>"+
					"<div id='friendcount_"+friends_added+"' class='text-center'></div>"+
					"</div>" +
				"</div>" +
				"<div class='col-md-offset-1 col-md-9'>" +
					"<center>" +
						"<h4>"+person.firstName+"'s status</h4>" +
						"<div id='canvas_"+friends_added+"'>" +
							"<canvas id='canvasarea_"+friends_added+"' width=\"300\" height=\"300\"/>" +
						"</div>" +
					"</center><hr>" +
				"</div>"+
			"</div>");

	$("#friend_data_"+friends_added+"> #img_"+friends_added).html("<a href='"+person.url+"'><img class=\"img-responsive img-circle\" src=\""+person.pictureURL+"\"></a>");	
	$("#friend_data_"+friends_added+"> #name_"+friends_added).html("<h4>"+person.firstName+" "+person.lastName+"</h4>");
	$("#friend_data_"+friends_added+"> #username_"+friends_added).html("<h5>"+person.username+"</h5>");
	$("#friend_data_"+friends_added+"> #id_"+friends_added).html("<h5>"+person.id+"</h5>");
	if(person.birthday!="null")
		$("#friend_data_"+friends_added+"> #birth_"+friends_added).html("<h5>"+person.birthday+"</h5>");
	if(person.gender!="null")
		$("#friend_data_"+friends_added+"> #gender_"+friends_added).html("<h5>"+person.gender+"</h5>");
	$("#friend_data_"+friends_added+"> #location_"+friends_added).html("<h5>"+person.location+"</h5>");
	$("#friend_data_"+friends_added+"> #friendcount_"+friends_added).html("<h5><b>"+person.friendlist.length+"</b> friend(s)</h5>");
	
	$("#friend_data_"+friends_added).append("<hr>");
	
	if(addgraph){
		var ctx = document.getElementById("canvasarea_"+friends_added).getContext("2d");
		window.myPie = new Chart(ctx).Pie(pieData);
	}
	
	friends_added++;
}

var init_friend_count = 5;
var init_friend_start = 40;

$(function(){
	$("html, body").animate({ scrollTop: 0 }, "fast");
	
	updateMyProfile();
	
	$(".myfriends_tab").click(function(){
		// Fill pie:
		$("html, body").animate({ scrollTop: 0 }, "fast");
		
		setTimeout(function(){
			for(var i=0;i<init_friend_count;i++){
				var ctx = document.getElementById("canvasarea_"+i).getContext("2d");
				window.myPie = new Chart(ctx).Pie(pieData);
			}
		},1000);

	});
	
	$(window).scroll(function(e) {
		var scrollH =  $(window).scrollTop()+471;
		var wellH = $(".well").height();
		
		if(scrollH >= wellH && wellH!=816) {
			e.stopPropagation();
			
			var end_tmp = init_friend_start+friends_added+init_friend_count;
			
			for(var i=init_friend_start+friends_added; i<end_tmp; i++)
				addFriend(i, true);
		
		}
	});
	
	for(var i=init_friend_start;i<init_friend_start+init_friend_count;i++)
		addFriend(i,false);
});