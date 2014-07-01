//Globals in this file
var currentIdea = null;

function getCurrentIdea(userId){
	//Get current idea
	alert(userId);
	Alloy.Globals.Cloud.Objects.query({
	    classname: 'ideas',
	    limit: 1,
	    per_page: 10,
	    where: {
	        user_id: {$ne:userId}
	    }
	}, function (e) {
	    if (e.success) {
	        currentIdea = e.ideas[0];
	        
	        alert('id: ' + currentIdea.id + '\n' +
	            'pitch: ' + currentIdea.pitch + '\n' +
	            'created_at: ' + currentIdea.created_at);
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});	
}



function match (e) {
  Titanium.API.info("Match");
  alert(currentIdea);
  /*var votes = JSON.stringify(currentIdea.votedBy);
  alert (votes);
  var other = JSON.parse(votes);
  alert(other);*/
 //var votes = String(currentIdea.votedBy).split(',').push("10"); //Regresa 2
 var votes =  JSON.stringify(currentIdea.votedBy);
 votes = votes.substring(1, votes.length-1);
 votes = votes + "," +"\"10\"";
 votes = "["+votes+"]";
 votes = JSON.parse(votes);
 alert(votes);
  var dict = {
  	classname: 'ideas',
    id: currentIdea.id,
    fields: {
        votedBy: votes,
        points: {$inc: 1}
    },
    acl_name:'ideasACL',
    user_id:currentIdea.user.id //creator updates
  };
  Alloy.Globals.Cloud.Objects.update(dict, function (e) {
    if (e.success) {
        var idea = e.ideas[0];
        alert('Success:\n' +
            'id: ' + idea.id + '\n' +
            'votedBy: ' + idea.votedBy + '\n' +
            'points: ' + idea.points + '\n');
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
  
}

function noMatch (e) {
  Titanium.API.info("No Match");
}
function showMenu(e){
    //Displays log message on console
    Titanium.API.info("Quit terms");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function done(e){
    //Displays log message on console
    Titanium.API.info("Quit terms");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function showNewIdea(e){
    //Displays log message on console
    Titanium.API.info("show new idea");
    var newIdea = Alloy.createController('newIdea').getView();
    newIdea.open();
}

if (Ti.UI.Android){
  $.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}

//Get current User id
if(Alloy.Globals.Facebook.loggedIn)
{
	var currentUser = Alloy.Globals.FbUser;
	getCurrentIdea(currentUser);
}
else{
	Alloy.Globals.Cloud.Users.showMe(function (e) {
    if (e.success) 
    {
         var currentUser = e.users[0].id;
         getCurrentIdea(currentUser);
         
    } 
    else
    {
    	alert("Algo estuvo mal, no pudimos obtener ideas");
    }
 	});
}



