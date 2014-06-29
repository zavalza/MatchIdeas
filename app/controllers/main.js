//Globals in this file
var currentUser = null;
var currentIdea = null;

function match (e) {
  Titanium.API.info("Match");
  alert('53af6e839444600821028619');
  Alloy.Globals.Cloud.Objects.update({
    classname: 'ideas',
    id: currentIdea.id,
    fields: {
        votedBy: {$push: currentUser},
        points: {$inc: 1}
    },
    user_id:'53af6e839444600821028619' //master updates
	}, function (e) {
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
	currentUser = Alloy.Globals.FbUser;
}
else{
	Alloy.Globals.Cloud.Users.showMe(function (e) {
    if (e.success) 
    {
         var user = e.users[0];
         currentUser = user.id;
    } 
    else
    {
    	alert("Algo estuvo mal, no pudimos obtener ideas");
    }
 	});
}

//Get current idea
Alloy.Globals.Cloud.Objects.query({
    classname: 'ideas',
    limit: 1,
    per_page: 10,
    where: {
        user_id: {$ne:currentUser}
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

