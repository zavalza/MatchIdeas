function saveIdea(e){
    var userId = Alloy.Globals.UserId;
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
	/*if($.shareFb.value)
		    {
		    	alert("Idea compartida en Fb");
		    }*/
    Alloy.Globals.Cloud.Objects.create(dict, function (e) {
	    if (e.success) {
	    	Alloy.Globals.Scrollable.scrollToView(Alloy.Globals.Ideas);
		    //var main = Alloy.createController('main').getView();
		    //main.open();
	    } else {
			//Posible funcion para guardar en base de datos
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});
}
if (Ti.UI.Android){
  $.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}
