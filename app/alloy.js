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


Alloy.Globals.Facebook = require('facebook');
Alloy.Globals.Cloud = require('ti.cloud');
//Store the ids of currentUser according to used login function
Alloy.Globals.FbUser = null;
Alloy.Globals.NormalUser = null;
//Stores the id of the profile to show
Alloy.Globals.userToShow = null;
//Stores the id of the idea to show
Alloy.Globals.ideaToShow = null;

Alloy.Globals.getUserId = function(){
	if(Alloy.Globals.Facebook.loggedIn)
	{
		//alert("Face");
		return Alloy.Globals.FbUser;
	}
	else
	{
		Alloy.Globals.Cloud.Users.showMe(function (e) {
		    if (e.success) 
		    {//User is logged with email
		    	//alert("Email");
		    	Alloy.Globals.NormalUser = e.users[0].id;
		    } 
		    else
		    {
		    	alert("No hay usuario con sesión");
		    }
		});
		return Alloy.Globals.NormalUser;
	}
};



//If User is loggedIn
if(Ti.App.Properties.hasProperty("storedSession"))
{
	alert("Hay una sesión guardada");
	alert(Ti.App.Properties.getString('storedSession'));
	Alloy.Globals.Cloud.sessionId = Ti.App.Properties.getString('storedSession');
	Alloy.createController('main').getView().open();
}

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
		var user = e.users[0];
		Alloy.Globals.FbUser = user.id;
		
	    
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
     Alloy.createController('index').getView().open();
    /*if (e.success) {
       
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
        //Alloy.createController('index').getView().open();
      }*/
});

