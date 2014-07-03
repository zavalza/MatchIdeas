


function showMenu(e){
    //Displays log message on console
    Titanium.API.info("Quit terms");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function closeNewIdea(e){
    //Displays log message on console
    Titanium.API.info("close new idea");
    var  main= Alloy.createController('main').getView();
    main.open();
};


function done(e){
    //Displays log message on console
    Titanium.API.info("Quit terms");
    var userId = Alloy.Globals.getUserId();
    var dict = {
		    	classname: 'ideas',
		   	   fields: {pitch: $.pitch.value,
		   	   			matches: 0,
		   	   			noMatches: 0,
		   	   			comments:[],
		   	   			votedBy: [userId]},
		   	   acl_name: 'ideasACL',
		   	   user_id: userId
		   	   };
	if($.shareFb.value)
		    {
		    	alert("Idea compartida en Fb");
		    }
    Alloy.Globals.Cloud.Objects.create(dict, function (e) {
	    if (e.success) {
		    var main = Alloy.createController('main').getView();
		    main.open();
	    } else {
			//Posible funcion para guardar en base de datos
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
};
if (Ti.UI.Android){
  $.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}
