//Globals in this file
var currentIdea = null;
var currentUser = null;
var newComment = Ti.UI.createView({
					center : {x: Ti.UI.SIZE/2, y: Ti.UI.SIZE},
				    backgroundColor: 'white',
				    width:'80%', height: 100,
				    top: 0, left: 0
				  });

function createComment(commentText, author) {
  var comment = Ti.UI.createView({
    backgroundColor: 'white',
    borderColor: '#bbb',
    borderWidth: 1,
    width:'100%', height: 70,
    top: 0, left: 0
  });
  var textLabel = Ti.UI.createLabel({
    text: commentText,
    color: 'black',
    top: 10, left: '10%',
    width: '80%', height: 30
  });
  var authorLabel = Ti.UI.createLabel({
    text: author,
    color: 'blue',
    bottom:0 , right: '10%',
    width: '80%', height: 30
  });
  comment.add(textLabel);
  comment.add(authorLabel);
  return comment;
}



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
	    		fillData();
	    	}
	        	
	        else
	        {
	        	//Lo mas seguro es que despleguemos una ventana totalmente diferente, pero por ahora reseteamos los valores
	        	$.pitch.text = "No hay ideas";
	        	$.matchCount.text = "0";
	        	$.noMatchCount.text = "0";	
	        }
	        	
	    } 
	    else 
	    {
	    	
	        alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
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
	        fillData();
	    } else {
	        alert('Error:\n' +((e.error && e.message) || JSON.stringify(e)));
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
  	 if(currentIdea.user.id == Alloy.Globals.getUserId()) //If currentUser had created the idea
  	 {
  	 	alert("Tú creaste la idea, no puedes votar");
  	 }
  	 else
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
  	if(currentIdea.user.id == Alloy.Globals.getUserId()) //If currentUser had created the idea
  	 {
  	 	alert("Tú creaste la idea, no puedes votar");
  	 }
  	 else
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
  	 
  }
  else
  {
  	alert("Necesitas ideas para votar");
  }
}

function showProfile(e){
    //Displays log message on console
    Titanium.API.info("show profile");
    Alloy.Globals.userToShow = currentIdea.user.id;
    Alloy.createController('userProfile').getView().open();
    

};

//fills Data once currentIdea (ideaToShow) is defined
function fillData(e){
	$.pitch.text = currentIdea.pitch;
	$.matchCount.text = String(currentIdea.matches);
	$.noMatchCount.text = String(currentIdea.noMatches);
	//find authors' data
	if(currentIdea.user.first_name)
	{
		$.userName.text = currentIdea.user.first_name +" "+ currentIdea.user.last_name;
	}
	else
	{
		$.userName.text = "Sin nombre";
	}
	//Returns all the comments of the specified ideaId
	Alloy.Globals.Cloud.Objects.query({
	    classname: 'comments',
	    where: {
	        ideaId: currentIdea.id
	    },
	    order: "make,created_at"
	}, function (e) {
	    if (e.success) {
	    	//alert("Comentarios encontrados");
	    	$.commentCount.text=e.comments.length;
	    	for(var i = 0; i < e.comments.length; i++){
	    	var author = e.comments[i].user.first_name +" "+ e.comments[i].user.last_name;
			var commentView = createComment(e.comments[i].text, author);
			$.content.add(commentView);
			}
			var commentArea = Titanium.UI.createTextArea({
			id: 'comment',
		    borderStyle : Titanium.UI.INPUT_BORDERSTYLE_BEZEL,
		    hintText : 'Nuevo comentario...',
		    color: 'black',
		    textAlign: 'left',
		    returnKeyType: Ti.UI.RETURNKEY_DONE,
		    width : '80%', height : 100
			});
			
			commentArea.addEventListener('return',function(e)
			{
				var textComment = commentArea.value;
				var userId = Alloy.Globals.getUserId();
				var dict = {
		    	classname: 'comments',
			   	   fields: {text: textComment, 
			   	   			ideaId: currentIdea.id,
			   	   		},
			   	   acl_name: 'commentsACL',
			   	   user_id: userId
			   	   };
			   //alert("Hecho");
			   Alloy.Globals.Cloud.Objects.create(dict, function (e) {
				    if (e.success)
				    {
					  	
					  	Alloy.Globals.ideaToShow = currentIdea.id; //Show this idea again
				    	Alloy.createController('main').getView().open();
				    	
				    	//$.content.removeAllChildren();
				    	//findIdea(currentIdea.id); //update view
				   		
				    } else {
						//Posible funcion para guardar en base de datos
				        alert('Error:\n' +
				            ((e.error && e.message) || JSON.stringify(e)));
				    }
				});
	   
			});
			newComment.add(commentArea);
			$.content.add(newComment);
		    } else {
		        alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
		});	
}


function showMenu(e){
    //Displays log message on console
    Titanium.API.info("Menu");
    Alloy.createController('menu').getView().open();
    /*var newUser = Alloy.createController('newUser').getView();
    newUser.open();*/
};

function comment(e){
    //Displays log message on console
    Titanium.API.info("comment");
    //commentArea.focus();
    $.content.scrollTo(newComment.getCenter().x, newComment.getCenter().y);
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
currentUser = Alloy.Globals.getUserId();
if(Alloy.Globals.ideaToShow != null)
{
	findIdea(Alloy.Globals.ideaToShow);
	Alloy.Globals.ideaToShow = null;
}
else
{
	getCurrentIdea(currentUser);
}
