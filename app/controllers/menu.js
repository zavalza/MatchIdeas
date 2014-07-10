
function showProfile(e){
    //Displays log message on console
    Titanium.API.info("show profile");
    Alloy.Globals.userToShow = Alloy.Globals.getUserId();
    Alloy.createController('userProfile').getView().open();
    
};

function showSettings(e){
    //Displays log message on console
    Titanium.API.info("show settings");
    Alloy.createController('settings').getView().open();
};

function showIdeas(e){
    //Displays log message on console
    Titanium.API.info("show ideas");
    Alloy.createController('main').getView().open();
};


if (Ti.UI.Android){
  $.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}

var fb = Alloy.Globals.Facebook;
/*fb.appid = 305737346271076;
fb.permissions = ['public_profile']; // Permissions your app needs
fb.forceDialogAuth = false; //Uses the native app of Facebook if aviable*/
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


if(fb.loggedIn)
{
	$.content.add(fb.createLoginButton({
    top : 10,
    style : fb.BUTTON_STYLE_WIDE
	}));
	//fb.logout();
}
else
{
	var button = Titanium.UI.createButton({
	   title: 'Salir',
	   top: 10,
	   width: 100,
	   height: 50
	});
	button.addEventListener('click',function(e)
	{
		
		//Alloy.createController('index').getView().open();
	   Alloy.Globals.Cloud.Users.logout(function (e) {
		    if (e.success) {
		    	//Titanium.App.Properties.removeProperty("sessionId");
		        Alloy.createController('index').getView().open();
		    } else {
		        alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});
	});
	
	$.content.add(button);
	
}
