var currentUser = null; //stores the complete object user

function createIdea(pitch) {
  var idea = Ti.UI.createView({
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: 1,
    width:'100%', height: 70,
    top: 0, left: 0
  });
  var textLabel = Ti.UI.createLabel({
    text: pitch,
    top: 10, left: '10%',
    width: '80%', height: 60
  });
  idea.add(textLabel);
  return idea;
}


function showMenu(e){
    //Displays log message on console
    Titanium.API.info("menu");
     Alloy.createController('menu').getView().open();
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

var userId = Alloy.Globals.userToShow;
Alloy.Globals.Cloud.Users.show({
    user_id: userId
}, function (e) {
    if (e.success) {
        currentUser = e.users[0];
        //alert(currentUser);
        //Returns all the ideas of the specified userId
		Alloy.Globals.Cloud.Objects.query({
		    classname: 'ideas',
		    where: {
		        user_id: currentUser.id
		    },
		    order: "make,created_at"
		 }, function (e) {
		    if (e.success) {
		    	//alert("ideas encontradas");
		    	//alert(e.ideas.length);
		    	for(var i = 0; i < e.ideas.length; i++){
				var ideasView = createIdea(e.ideas[i].pitch);
				$.content.add(ideasView);
				}
			 } else {
			        alert('Error:\n' +
			            ((e.error && e.message) || JSON.stringify(e)));
			    }
			});	
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

if(userId == Alloy.Globals.getUserId()) //If user to show is the logged user
{
	//user can edit
	var row = Ti.UI.createView({
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: 1,
    width:'100%', height: 70,
    top: 0, left: 0
  	});
  
	var editButton = Titanium.UI.createButton({
	   title: 'Editar',
	   top: 10,
	   width: 100,
	   height: 50
	});
	editButton.addEventListener('click',function(e)
	{
	   Alloy.createController('editProfile').getView().open();
	});
	
	row.add(editButton);
	$.content.add(row);
}


