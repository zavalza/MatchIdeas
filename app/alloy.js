// The contents of this file will be executed before any of
// your view controllers are ever executed, including the index.
// You have access to all functionality on the `Alloy` namespace.
//
// This is a great place to do any initialization for your app
// or create any global variables/functions that you'd like to
// make available throughout your app. You can easily make things
// accessible globally by attaching them to the `Alloy.Globals`
// object. For example:
//
// Alloy.Globals.someGlobalFunction = function(){};

//Modules
Alloy.Globals.Facebook = require('facebook');
Alloy.Globals.Cloud = require('ti.cloud');

//Globar vars
Alloy.Globals.UserId = null;
Alloy.Globals.Scrollable = null;
Alloy.Globals.Menu = null;
Alloy.Globals.Ideas = null;
Alloy.Globals.NewIdea = null;
//Stores the id of the profile to show
Alloy.Globals.userToShow = null;
//Stores the id of the idea to show
Alloy.Globals.ideaToShow = null;
Alloy.Globals.Cloud.sessionId = Ti.App.Properties.getString('storedSession');

Alloy.Globals.Cloud.Users.showMe(function (e) {
if (e.success)
{//User is logged
//alert("Email");
Alloy.Globals.UserId = e.users[0].id;
Alloy.createController('main').getView().open();
}
else
{
//alert("No hay usuario con sesión");
	Alloy.createController('index').getView().open();
}
});



/*if(Ti.App.Properties.hasProperty("storedSession"))
{
	alert("Hay una sesión guardada");
	alert(Ti.App.Properties.getString('storedSession'));	
}*/




var fb  = Alloy.Globals.Facebook;
fb.appid = 305737346271076;
fb.permissions = ['public_profile']; // Permissions your app needs
fb.forceDialogAuth = false; //Uses the native app of Facebook if aviable
fb.addEventListener('login', function(e) {
    if (e.success) 
    {
        Alloy.Globals.Cloud.SocialIntegrations.externalAccountLogin({
		type: 'facebook',
		token: fb.accessToken
		}, function (e) {
		if (e.success) {
		Alloy.Globals.UserId = e.users[0].id;
		var sessionId = Alloy.Globals.Cloud.sessionId;
    	alert(sessionId);
    	Ti.App.Properties.setString('storedSession', sessionId);
		
		var main = Alloy.createController('main').getView();
        main.open();
		} 
		else 
		{
		alert('Error:\n' +
		((e.error && e.message) || JSON.stringify(e)));
		}
		});
    } 
    else if (e.error) 
    {
        alert(e.error);
    } 
    else if (e.cancelled) 
    {
        alert("Cancelado");
    }
});
fb.addEventListener('logout', function(e) {
    //alert('Logged out');
    fb.logout();
    Alloy.Globals.Cloud.Users.logout(function (e) {
		    if (e.success) {
		    	Titanium.App.Properties.removeProperty("storedSession");
		    	alert("se ha removido la sesión");
		        Alloy.createController('index').getView().open();
		    } else {
		        alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
     
    /*if (e.success) {
       
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
        //Alloy.createController('index').getView().open();
      }*/
});

