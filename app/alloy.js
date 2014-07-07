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
		    } 
		    else
		    {
		    	alert("No hay usuario con sesión");
		    }
		});
		return Alloy.Globals.NormalUser;
	}
};
