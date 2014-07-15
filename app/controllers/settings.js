var currentUser = null; //stores the complete object user

function saveContactData(e){
	if(typeof currentUser.contactData == 'undefined') //Si no hemos generado los campos , vamos a generar contactData
        {
        	if(typeof currentUser.external_accounts[0] != 'undefined')//if user is fb user, get the fb data
	        {
				
			}
			else
			{
				
			}
        }
        else //solo actualizamos
        {
        	alert(currentUser.contactData);
        }
       Alloy.createController('main').getView().open();
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


var userId = Alloy.Globals.UserId;
//alert(userId);
Alloy.Globals.Cloud.Users.show({
    user_id: userId
}, function (e) {
    if (e.success) {
        currentUser = e.users[0];
        //alert(currentUser);
        //Mostramos los datos
        if(typeof currentUser.contactData == 'undefined') //Si no hemos generado los campos, ahora es el único caso
        {
        	if(typeof currentUser.external_accounts[0] != 'undefined')//if user is fb user, get the fb data
	        {
				Alloy.Globals.Facebook.requestWithGraphPath(currentUser.external_accounts[0].external_id, {}, 'GET', function(e) {
			    if (e.success) 
			    {
			    	//alert(e.result);
			    	var fbUser =  JSON.parse(e.result);
			    	//alert(fbUser);
			        $.nameToShow.hintText = fbUser.first_name+ " "+fbUser.last_name;
			     	$.emailOfContact.hintText = fbUser.email;
			    } else if (e.error) {
			        alert(e.error);
			    } else {
			        alert('Unknown response');
			    }
			    });
			}
			else
			{
				//Este caso no debería de ocurrir, pues vamos a guardar los campos cuando se cree un nuevo usuario
				$.nameToShow.hintText = currentUser.first_name + " "+ currentUser.last_name; //
			    $.emailOfContact.hintText = " ";
			}
        }
        else //solo actualizamos
        {
        	alert(currentUser.contactData);
        }
        
	}else
	{
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});

