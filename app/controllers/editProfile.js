var currentUser = null; //stores the complete object user

function showMenu(e){
    //Displays log message on console
    Titanium.API.info("Quit terms");
    //Alloy.createController('editProfile').getView();
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function showNewIdea(e){
    //Displays log message on console
    Titanium.API.info("show new idea");
    var newIdea = Alloy.createController('newIdea').getView();
    newIdea.open();
}


function passReset(){
	Alloy.Globals.Cloud.Users.requestResetPassword({
    email: 'paulz_91@hotmail.com'
	}, function (e) {
	    if (e.success) {
	        alert('Success: Reset Request Sent');
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}

var userId = Alloy.Globals.getUserId();
Alloy.Globals.Cloud.Users.show({
    user_id: userId
}, function (e) {
    if (e.success) {
        currentUser = e.users[0];
        alert(currentUser);
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

