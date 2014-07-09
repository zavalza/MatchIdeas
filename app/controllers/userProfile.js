var currentUser = null; //stores the complete user object

function createIdea(id, pitch) {
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
  idea.addEventListener('click',function(e)
	{
		//alert('idea ' + id );
		Alloy.Globals.ideaToShow = id;
		Alloy.createController('main').getView().open();
		
	});
  return idea;
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
//alert(userId);
Alloy.Globals.Cloud.Users.show({
    user_id: userId
}, function (e) {
    if (e.success) {
        currentUser = e.users[0];
        //alert(currentUser);
        if(typeof currentUser.external_accounts[0] != 'undefined')//if user is fb user, get the fb data
        {
        	//alert(JSON.stringify(currentUser.external_accounts));
        	//alert(JSON.stringify(currentUser.external_accounts[0].external_id));
        	Alloy.Globals.Facebook.requestWithGraphPath(currentUser.external_accounts[0].external_id, {}, 'GET', function(e) {
			    if (e.success) {
			    	//alert(e.result);
			    	var fbUser =  JSON.parse(e.result);
			    	//alert(fbUser);
			        $.name.text = fbUser.first_name+ " "+fbUser.last_name;
			        var emailButton = Titanium.UI.createButton({
					   title: 'Email',
					   top: 10,
					   width: 100,
					   height: 50
					});
					/*emailButton.addEventListener('click',function(e)
					{
						 var emailDialog = Ti.UI.createEmailDialog();
						emailDialog.subject = "Contacto de MatchIdeas";
						emailDialog.toRecipients = [fbUser.email];
						emailDialog.messageBody = 'Mensaje...';
						emailDialog.open();
					});
					$.networks.add(emailButton);*/
			        var fbButton = Titanium.UI.createButton({
					   title: 'Facebook',
					   top: 10,
					   right: 20,
					   width: 100,
					   height: 50
					});
					fbButton.addEventListener('click',function(e)
					{
						var webview = Titanium.UI.createWebView({url:fbUser.link});
					    var window = Titanium.UI.createWindow();
					    window.add(webview);
					    window.open({modal:true});
					});
					$.networks.add(fbButton);
			    } else if (e.error) {
			        alert(e.error);
			    } else {
			        alert('Unknown response');
			    }
			});
        }
        else
        {
			//alert(currentUser);
	        $.name.text = currentUser.first_name +" "+currentUser.last_name;
	        /*var emailButton = Titanium.UI.createButton({
					   title: 'Email',
					   top: 10,
					   left: 20,
					   width: 100,
					   height: 50
					});
					emailButton.addEventListener('click',function(e)
					{
						 var emailDialog = Ti.UI.createEmailDialog();
						emailDialog.subject = "Contacto de MatchIdeas";
						emailDialog.toRecipients = [currentUser.email];
						emailDialog.messageBody = '';
						emailDialog.open();
					});
					$.networks.add(emailButton);*/
	        
        }
        
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
				var ideasView = createIdea(e.ideas[i].id, e.ideas[i].pitch);
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


