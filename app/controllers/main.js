//Globals in this file
var currentIdea = null;
var currentUser = null;

/*Get an Idea from ACS, where the user has not already voted and that it has not created.
 * global currentIdea contains the result
 */
function getCurrentIdea(userId){
	//alert(userId);
	Alloy.Globals.Cloud.Objects.query({
	    classname: 'ideas',
	    limit: 1,
	    per_page: 10,
	    where: {
	        votedBy: {$nin:[userId]}
	        //user: {$ne: userId}
	        //where: {$and: [{votedBy: {$nin:[userId]}}, {user: {$ne: userId}}]}
	    }
	}, function (e) {
	    if (e.success) {
	    	if(e.ideas[0] != null)
	    	{
	    		currentIdea = e.ideas[0];
	        	$.pitch.text = currentIdea.pitch;
	        	$.match.title = String(currentIdea.matches);
	        	$.noMatch.title = String(currentIdea.noMatches);
	    	}
	        	
	        else
	        {
	        	//Lo mas seguro es que despleguemos una ventana totalmente diferente, pero por ahora reseteamos los valores
	        	$.pitch.text = "No hay ideas";
	        	$.match.title = "0";
	        	$.noMatch.title= "0";
	        	
	        }
	        	
	        	
	        
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});	
}

/*Gets the most recent data of an idea, based on its id
 * global currentIdea contains the result
 */
function findIdea(ideaId){
	Alloy.Globals.Cloud.Objects.query({
	    classname: 'ideas',
	    limit: 1,
	    per_page: 10,
	    where: {
	        id: ideaId
	    }
	}, function (e) {
	    if (e.success) {
	        currentIdea = e.ideas[0];
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
	});	
}


/*Updates the fields votedBy and points(+1) of the currentIdea, and stores the idea in the currentUser profile 
 * 
 *Desgraciadamente hasta ahora no hay un push atomico para alterar la base de datos,
 * se corre el riesgo de perder votos cuando dos usuarios accesen a la misma idea y la alteren casi simultaneamente,
 * cosa que sucederá hasta que se escale mucho la aplicación
 */

function match (e) {
  Titanium.API.info("Match");
  if(currentIdea != null)//If we have an idea
  {
  	 findIdea(currentIdea.id); //para cargar los votos más recientes
 //var votes = String(currentIdea.votedBy).split(',').push("10"); //Regresa 2
 var votes =  JSON.stringify(currentIdea.votedBy);
 votes = votes.substring(1, votes.length-1);
 votes = votes + "," +"\""+currentUser+"\"";
 votes = "["+votes+"]";
 votes = JSON.parse(votes);
 //alert(votes);
  var dict = {
  	classname: 'ideas',
    id: currentIdea.id,
    fields: {
        votedBy: votes,
        matches: {$inc: 1}
    },
    acl_name:'ideasACL',
    user_id:currentIdea.user.id //creator updates
  };
  Alloy.Globals.Cloud.Objects.update(dict, function (e) {
    if (e.success) {
        getCurrentIdea(currentUser); //loads another idea
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
	});
  }
  else
  {
  	alert("Necesitas ideas para votar");
  }
}

/*Updates the fields votedBy and points (-1) of the currentIdea
 * 
 *Desgraciadamente hasta ahora no hay un push atomico para alterar la base de datos,
 * se corre el riesgo de perder votos cuando dos usuarios accesen a la misma idea y la alteren casi simultaneamente,
 * cosa que sucederá hasta que se escale mucho la aplicación
 */
function noMatch (e) {
  Titanium.API.info("No Match");
  if(currentIdea != null)//If we have an idea
  {
  	 findIdea(currentIdea.id); //para cargar los votos más recientes
	 //var votes = String(currentIdea.votedBy).split(',').push("10"); //Regresa 2
	 var votes =  JSON.stringify(currentIdea.votedBy);
	 votes = votes.substring(1, votes.length-1);
	 votes = votes + "," +"\""+currentUser+"\"";
	 votes = "["+votes+"]";
	 votes = JSON.parse(votes);
	 //alert(votes);
	  var dict = {
	  	classname: 'ideas',
	    id: currentIdea.id,
	    fields: {
	        votedBy: votes,
	        noMatches: {$inc: 1}
	    },
	    acl_name:'ideasACL',
	    user_id:currentIdea.user.id //creator updates
	  };
	  Alloy.Globals.Cloud.Objects.update(dict, function (e) {
	    if (e.success) {
	        getCurrentIdea(currentUser); //loads another idea
	    } else {
	        alert('Error:\n' +
	            ((e.error && e.message) || JSON.stringify(e)));
	    }
		});
  }
  else
  {
  	alert("Necesitas ideas para votar");
  }
}

function showMenu(e){
    //Displays log message on console
    Titanium.API.info("Quit terms");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function done(e){
    //Displays log message on console
    Titanium.API.info("Quit terms");
    var newUser = Alloy.createController('newUser').getView();
    newUser.open();
};

function showNewIdea(e){
    //Displays log message on console
    Titanium.API.info("show new idea");
    var newIdea = Alloy.createController('newIdea').getView();
    newIdea.open();
}

if (Ti.UI.Android){
  $.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}

//Get current User id
if(Alloy.Globals.Facebook.loggedIn)
{
	currentUser = Alloy.Globals.FbUser;
	getCurrentIdea(currentUser);
}
else{
	Alloy.Globals.Cloud.Users.showMe(function (e) {
    if (e.success) 
    {
         currentUser = e.users[0].id;
         getCurrentIdea(currentUser);
         
    } 
    else
    {
    	alert("Algo estuvo mal, no pudimos obtener ideas");
    }
 	});
}



