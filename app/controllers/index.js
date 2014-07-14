
function tryLogin(e){
    //Displays log message on console
    Titanium.API.info("Trying login...");
    var cloud = Alloy.Globals.Cloud;
    cloud.Users.login({
    login: $.email.value,
    password: $.password.value
}, function (e) {
    if (e.success) {
    	Alloy.Globals.NormalUser = e.users[0].id;
    	var sessionId = Alloy.Globals.Cloud.sessionId;
    	alert(sessionId);
    	Ti.App.Properties.setString('storedSession', sessionId);
        var main = Alloy.createController('main').getView();
        main.open();
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
};
function newUserForm(e){
    //Displays log message on console
    Titanium.API.info("Show new user form");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function terms(e){
    //Displays log message on console
    Titanium.API.info("Show terms");
    var terms = Alloy.createController('terms').getView();
    terms.open();
};


var fb  = Alloy.Globals.Facebook;

$.fbLogin.add(fb.createLoginButton({
    style : fb.BUTTON_STYLE_WIDE
}));


//Check if user is logged in
Alloy.Globals.Cloud.Users.showMe(function (e) {
    if (e.success) 
    {//User is logged with email
        var main = Alloy.createController('main').getView();
        main.open();
    } 
    else
    { 
		 if(fb.loggedIn)
		{
			//user is logged with facebook
			var main = Alloy.createController('main').getView();
		        main.open();
		}
		else
		{
			//we require log in
			//fb.authorize();
			$.index.open();
		}
    }
});