var friendList = [];
var happy_color = "#46BF9D";
var happy_hover_color = "#4DD1AC";
var sad_color = "#F7464A";
var sad_hover_color = "#FF5A5E";
var ajaxcall = false;
var friends_added = 0;
var init_friend_count = 5; // How many per fetch
var init_friend_start = 40; // Friend list offset

var dict = {"en": {"good": [ "crush", "strength", "simple(?:fied)?", "millionaire", "hello", "care(?:ing)?", "cute", "married", "rich", "fine", "happiness", "respects?", "award", "best", "interesting", "r.?i.?p.?", "solved", "fixed", "pass(?:ed)?", "thanks", "sexy","epic", "excited", "like", "faith", "content", "lool", "loool","lol", "absolutely", "adorable", "accepted", "acclaimed", "accomplish", "accomplishment", "achievement", "action", "active", "admire", "adventure", "affirmative", "affluent", "agree", "agreeable", "amazing", "angelic", "appealing", "approve", "aptitude", "attractive", "awesome", "beaming", "beautiful", "believe", "beneficial", "bliss", "bountiful", "bounty", "brave", "bravo", "brilliant", "bubbly", "calm", "celebrated", "certain", "champ", "champion", "charming", "cheery", "choice", "classic", "classical", "clean", "commend", "composed", "congratulation", "constant", "cool", "courageous", "creative", "cute", "dazzling", "delight", "delightful", "distinguished", "divine", "earnest", "easy", "ecstatic", "effective", "effervescent", "efficient", "effortless", "electrifying", "elegant", "enchanting", "encouraging", "endorsed", "energetic", "energized", "engaging", "enthusiastic", "essential", "esteemed", "ethical", "excellent", "exciting", "exquisite", "fabulous", "fair", "familiar", "famous", "fantastic", "favorable", "fetching", "fine", "fitting", "flourishing", "fortunate", "free", "fresh", "friendly", "fun", "funny", "generous", "genius", "genuine", "giving", "glamorous", "glowing", "good", "gorgeous", "graceful", "great", "green", "grin", "growing", "handsome", "happy(?:ness)?", "harmonious", "healing", "healthy", "hearty", "heavenly", "honest", "honorable", "honored", "hug", "idea", "ideal", "imaginative", "imagine", "impressive", "independent", "innovate", "innovative", "instant", "instantaneous", "instinctive", "intuitive", "intellectual", "intelligent", "inventive", "jovial", "joy", "jubilant", "keen", "kind", "knowing", "knowledgeable", "laugh", "legendary", "light", "learned", "lively", "lovely", "lucid", "lucky", "luminous", "marvelous", "masterful", "meaningful", "merit", "meritorious", "miraculous", "motivating", "moving", "natural", "nice", "novel", "now", "nurturing", "nutritious", "okay", "one", "one-hundred percent", "open", "optimistic", "paradise", "perfect", "phenomenal", "pleasurable", "plentiful", "pleasant", "poised", "polished", "popular", "positive", "powerful", "prepared", "pretty", "principled", "productive", "progress", "prominent", "protected", "proud", "quality", "quick", "quiet", "ready", "reassuring", "refined", "refreshing", "rejoice", "reliable", "remarkable", "resounding", "respected", "restored", "reward", "rewarding", "right", "robust", "safe", "satisfactory", "secure", "seemly", "simple", "skilled", "skillful", "smile", "soulful", "sparkling", "special", "spirited", "spiritual", "stirring", "stupendous", "stunning", "success", "successful", "sunny", "super", "superb", "supporting", "surprising", "terrific", "thorough", "thrilling", "thriving", "tops", "tranquil", "transforming", "transformative", "trusting", "truthful", "unreal", "unwavering", "up", "upbeat", "upright", "upstanding", "valued", "vibrant", "victorious", "victory", "vigorous", "virtuous", "vital", "vivacious", "wealthy", "welcome", "well", "whole", "wholesome", "willing", "wonderful", "wondrous", "worthy", "wow", "yes", "yummy", "zeal", "zealous" ],
				   "bad" : [ "thie(?:ve|f)","pressure", "bullshit", "anxi(?:aty|ous)", "gosh", "stop", "racist","hate", "dea(?:th|d)", "urine", "rude", "drugs?", "loans?", "terrorist(?:s)?","fail(?:ure)?","bad", "sorry", "drown", "inconvenient", "ridicul(?:ous|ed)","lies?", "offensive", "suck", "alcoholic", "amateur", "analphabet", "anarchist", "ape", "arse", "arselicker", "ass", "ass master", "ass-kisser", "ass-nugget", "ass-wipe", "asshole", "baby", "backwoodsman", "balls", "bandit", "barbar", "bastard", "bastard", "beavis", "beginner", "biest", "bitch", "blubber gut", "bogeyman", "booby", "boozer", "bozo", "brain-fart", "brainless", "brainy", "brontosaurus", "brownie", "bugger", "bugger", "silly", "bulloks", "bum", "bum-fucker", "butt", "buttfucker", "butthead", "callboy", "callgirl", "camel", "cannibal", "cave man", "chaavanist", "chaot", "chauvi", "cheater", "chicken", "children fucker", "clit", "clown", "cock", "cock master", "cock up", "cockboy", "cockfucker", "cockroach", "coky", "con merchant", "con-man", "country bumpkin", "cow", "creep", "creep", "cretin", "criminal", "cunt", "cunt sucker", "daywalker", "deathlord", "derr brain", "desperado", "devil", "dickhead", "dinosaur", "disguesting packet", "diz brain", "do-do", "dog", "dog", "dirty", "dogshit", "donkey", "drakula", "dreamer", "drinker", "drunkard", "dufus", "dulles", "dumbo", "dummy", "dumpy", "egoist", "eunuch", "exhibitionist", "fake", "fanny", "farmer", "fart", "fart", "shitty", "fatso", "fellow", "fibber", "fish", "fixer", "flake", "flash harry", "freak", "frog", "fuck", "fuck face", "fuck head", "fuck noggin", "fucker", "gangster", "ghost", "goose", "gorilla", "grouch", "grumpy", "h", "head", "fat", "hell dog", "hillbilly", "hippie", "homo", "homosexual", "hooligan", "horse fucker", "idiot(?:ic)?", "ignoramus", "jack-ass", "jerk", "joker", "junkey", "killer", "lard face", "latchkey child", "learner", "liar", "looser", "lucky", "lumpy", "luzifer", "macho", "macker", "man", "old", "minx", "missing link", "monkey", "monster", "motherfucker", "mucky pub", "mutant", "neanderthal", "nerfhearder", "nobody", "nurd", "nuts", "numb", "oddball", "oger", "oil dick", "old fart", "orang-uthan", "original", "outlaw", "pack", "pain in the ass", "pavian", "pencil dick", "pervert", "pig", "piggy-wiggy", "pirate", "pornofreak", "prick", "prolet", "queer", "querulant", "rat", "rat-fink", "reject", "retard", "riff-raff", "ripper", "roboter", "rowdy", "rufian", "sack", "sadist", "saprophyt", "satan", "scarab", "schfincter", "shark", "shit eater", "shithead", "simulant", "skunk", "skuz bag", "slave", "sleeze", "sleeze bag", "slimer", "slimy bastard", "small pricked", "snail", "snake", "snob", "snot", "son of a bitch", "square", "stinker", "stripper", "stunk", "swindler", "swine", "teletubby", "thief", "toilett cleaner", "tussi", "typ", "vampir", "vandale", "varmit", "wallflower", "wanker", "wanker", "bloody", "weeze bag", "whore", "wierdo", "wino", "witch", "womanizer", "woody allen", "worm", "xena", "xenophebe", "xenophobe", "xxx watcher", "yak", "yeti", "zit face" ]},
			"pt": {"good": [ "util", "fa", "espetacular", "bem dispost(?:a|o)", "gir(?:a|o)", "força", "simples", "tass", "bacano", "yo", "tudo bem", "tdb", "fofo(?:inho)?", "rico", "milionario", "ador(?:o|ei|ava|amos)", "melhor", "casei", "casad(?:o|a)(?:s)?", "casamento", "doce", "doçura", "adopta", "gostes", "amigos?", "terrorista(?:s)?", "lindissim(?:o|a)(?:s)?","amovos","amar","rir", "momento", "amizade", "apoiar(?:em)?","apaixonad(?:o|a)","charme", "lool", "loool", "eheh", "hehe", "kkk","divertid(?:o|a)","ahah", "curta", "princesa", "principe", "gostam?","gost(?:ei|avamos|ou)","familia", "beijinhos?", "bjs", "obrigado", "lind(?:a|o)(?:s)?", "saudades", "ola", "parabens", "feliz", "contente", "amor(?:es)?", "lol", "adoravel", "absolutamente" ],
				   "bad" : [ "ladrao", "fugi", "besta", "racis(?:ta|mo)s?","odeio", "odio", "crlh", "caralinho", "fodx", "fodaçe", "foda-se", "fds", "fdx", "fodasse", "cabresto", "cabra", "puta", "crlh", "caralho", "merda", "problema", "piora", "contra", "bruto", "violencia", "abusou?", "nao gost(?:ei|o|a)?", "morr(?:o|e|eu)","grave","descontentamento","cansad(?:o|a)" ]}}

function resolve_mood(feed){
	var mood = 0.5; // default mood
	
	var langs = Object.keys(dict);
	
	for(var lang = 0; lang<langs.length; lang++)
		for(var cat in dict[langs[lang]]){
			var words = dict[langs[lang]][cat];
			for(var word = 0; word < words.length;word++){
				var w = words[word];
				
				
			}
		}
	
	console.log(feed);
	
	return mood;
}

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
	this.mood = resolve_mood(this.feed); // How ya feelin' ?
	this.dict = {"good":[{}], "bad": [{}]}; // Dictionary which will hold which words and how many times those words were said
	
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
	$("#mydata > .person-details > #myusername").html("<h5>"+myprofile.username+"</h5>");
	$("#mydata > .person-details > #myid").html("<h5>"+myprofile.id+"</h5>");
	$("#mydata > .person-details > #mybirth").html("<h5>"+myprofile.birthday+"</h5>");
	$("#mydata > .person-details > #mygender").html("<h5>"+myprofile.gender+"</h5>");
	$("#mydata > .person-details > #mylocation").html("<h5>"+myprofile.location+"</h5>");
	$("#mydata > .person-details > #myfriendcount").html("<h5><b>"+myprofile.friendlist.length+"</b> friends</h5>");

	// Fill pie:
	var canvases = ["mycanvas_area","mycanvas_dict"];
	var pies = [[
    				{
    					value: (1-myprofile.mood)*100,
    					color: sad_color,
    					highlight: sad_hover_color,
    					label: "Sad"
    				},
    				{
    					value: myprofile.mood*100,
    					color: happy_color,
    					highlight: happy_hover_color,
    					label: "Happy"
    				}],[
           				{
        					value: (1-myprofile.mood)*100,
        					color: sad_color,
        					highlight: sad_hover_color,
        					label: "Sad"
        				},
        				{
        					value: myprofile.mood*100,
        					color: happy_color,
        					highlight: happy_hover_color,
        					label: "Happy"
        				}]];
	
	for(var i=0;i<canvases.length;i++)
		window.myPie = new Chart(document.getElementById(canvases[i]).getContext("2d")).Pie(pies[i]);
}

function addFriend(id, addgraph){
	var person = new Person(id);
	friendList.push(person);
	
	$("#myfriends > .panel-body").append(
			"<div class='row'>" +
				"<div class=\"left_col col-md-2\">" +
					"<p class='enumerator'>#"+(friends_added+1)+"</p>"+
					"<div id='friend_data_"+friends_added+"'>"+
					"<div id='img_"+friends_added+"'></div>"+
					"<br>"+
					"<div id='name_"+friends_added+"' class='text-center'></div>"+
					"<div class='person-details'><div id='username_"+friends_added+"'></div>"+
					"<div id='id_"+friends_added+"'></div>"+
					"<div id='birth_"+friends_added+"'></div>"+
					"<div id='gender_"+friends_added+"'></div>"+
					"<div id='location_"+friends_added+"'></div>"+
					"<div id='friendcount_"+friends_added+"'></div>"+
					"</div></div>" +
				"</div>" +
				"<div class='col-md-offset-1 col-md-9'>" +
					"<center>" +
						"<h4>"+person.firstName+"'s mood</h4>" +
						"<div id='canvas_"+friends_added+"'>" +
							"<canvas id='canvasarea_"+friends_added+"' width=\"300\" height=\"260\"/>" +
							"<canvas id='canvasareadict_"+friends_added+"' width=\"300\" height=\"260\"/>" +
						"</div>" +
					"</center><hr>" +
				"</div>"+
			"</div>");

	$("#friend_data_"+friends_added+"> #img_"+friends_added).html("<a href='"+person.url+"'><img class=\"img-responsive img-circle\" src=\""+person.pictureURL+"\"></a>");	
	$("#friend_data_"+friends_added+"> #name_"+friends_added).html("<h4>"+person.firstName+" "+person.lastName+"</h4></b>");
	$("#friend_data_"+friends_added+"> .person-details > #username_"+friends_added).html("<h5>"+person.username+"</h5>");
	$("#friend_data_"+friends_added+"> .person-details > #id_"+friends_added).html("<h5>"+person.id+"</h5>");
	if(person.birthday!="null")
		$("#friend_data_"+friends_added+"> .person-details >  #birth_"+friends_added).html("<h5>"+person.birthday+"</h5>");
	if(person.gender!="null")
		$("#friend_data_"+friends_added+"> .person-details > #gender_"+friends_added).html("<h5>"+person.gender+"</h5>");
	$("#friend_data_"+friends_added+"> .person-details > #location_"+friends_added).html("<h5>"+person.location+"</h5>");
	$("#friend_data_"+friends_added+"> .person-details > #friendcount_"+friends_added).html("<h5><b>"+person.friendlist.length+"</b> friend(s)</h5>");
	
	$("#friend_data_"+friends_added).append("<hr>");
	
	if(addgraph){
		// Fill pie:
		var canvases = ["canvasarea_"+friends_added,"canvasareadict_"+friends_added];
		var pies = [[
        				{
        					value: (1-person.mood)*100,
        					color: sad_color,
        					highlight: sad_hover_color,
        					label: "Sad"
        				},
        				{
        					value: person.mood*100,
        					color: happy_color,
        					highlight: happy_hover_color,
        					label: "Happy"
        				}],[
            				{
            					value: (1-person.mood)*100,
            					color: sad_color,
            					highlight: sad_hover_color,
            					label: "Sad"
            				},
            				{
            					value: person.mood*100,
            					color: happy_color,
            					highlight: happy_hover_color,
            					label: "Happy"
            				}]];
		
		for(var i=0;i<canvases.length;i++)
			window.myPie = new Chart(document.getElementById(canvases[i]).getContext("2d")).Pie(pies[i]);	
	}
	
	friends_added++;
}

function circleFriendsTabClickHandle(){
	$(".myfriends_tab").click(function(){
		// Fill pie:
		$("html, body").animate({ scrollTop: 0 }, "fast");
		
		setTimeout(function(){
			
			for(var i=0;i<init_friend_count;i++){
				var canvases = ["canvasarea_"+i,"canvasareadict_"+i];
				var dat = [[
               				{
            					value: (1-friendList[i].mood)*100,
            					color: sad_color,
            					highlight: sad_hover_color,
            					label: "Sad"
            				},
            				{
            					value: friendList[i].mood*100,
            					color: happy_color,
            					highlight: happy_hover_color,
            					label: "Happy"
            				}],[ // This next will come from the dictionary inside the person's object
                   				{
                					value: (0.9)*100,
                					color: sad_color,
                					highlight: sad_hover_color,
                					label: "Sad"
                				},
                				{
                					value: 0.1*100,
                					color: happy_color,
                					highlight: happy_hover_color,
                					label: "Happy"
                				}]];
				
				for(var j=0;j<canvases.length;j++)
					window.myPie = new Chart(document.getElementById(canvases[j]).getContext("2d")).Pie(dat[j]);
			}
		},1000);

	});
}

$(function(){
	$("html, body").animate({ scrollTop: 0 }, "fast");
	
	updateMyProfile();
	
	circleFriendsTabClickHandle();
	
	$(window).scroll(function(e) {
		var scrollH =  $(window).scrollTop()+471;
		var wellH = $(".well").height();
		
		if(scrollH >= wellH && wellH!=816 && !ajaxcall) {
			ajaxcall = true;
			e.stopPropagation();
			
			var end_tmp = init_friend_start+friends_added+init_friend_count;
			
			for(var i=init_friend_start+friends_added; i<end_tmp; i++)
				addFriend(i, true);
			ajaxcall = false;
		}
	});
	
	for(var i=init_friend_start;i<init_friend_start+init_friend_count;i++)
		addFriend(i,false);
});