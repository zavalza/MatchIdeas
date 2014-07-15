function saveIdea(e){
    var userId = Alloy.Globals.UserId;
    var pitchText = $.pitch.value;
    var hashtags =  pitchText.match(/#\S+/g);
    for (var i=0; i < hashtags.length; i++)
    {
    	hashtags[i] = hashtags[i].slice(1); //delete the # character
    }
    var dict = {
		    	classname: 'ideas',
		   	   fields: {pitch: pitchText,
		   	   			matches: 0,
		   	   			noMatches: 0,
		   	   			votedBy: [userId]},
		   	   acl_name: 'ideasACL',
		   	   tags: hashtags,
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
