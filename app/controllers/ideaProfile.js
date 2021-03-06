//Globals in this file
var currentIdea = null;
var newComment = Ti.UI.createView({
					center : {x: 0, y: 10000}, //solucion momentanea es mandarlo a un y muy grande para que siempre baje
				    backgroundColor: 'white',
				    width:'100%', height: Ti.UI.SIZE,
				    top: 10, left: 0
				  });
var scrollView = Ti.UI.createScrollView({
		  contentHeight: 'auto',
		  layout : 'vertical',
		  showVerticalScrollIndicator: true,
		  top:30,
		  bottom:70,
		});	
		
function newRow(){
	var row = Titanium.UI.createView({
		   backgroundColor:'white',
		   width:'100%',
		   height:Ti.UI.SIZE,
		   top:0,
		   left:0
		});
	return row;
}


function showMenu(e){
    //Displays log message on console
    Titanium.API.info("Menu");
    Alloy.createController('menu').getView().open();
    /*var newUser = Alloy.createController('newUser').getView();
    newUser.open();*/
};

function showNewIdea(e){
    //Displays log message on console
    Titanium.API.info("show new idea");
    var newIdea = Alloy.createController('newIdea').getView();
    newIdea.open();
}

/*
//creates the format for each word to show
function formatText(text){
	var words = text.split(" ");
	var newText = "";
	for (var i=0; i < words.length; i++)
	{
		switch(words[i][0]){
			case '#':
						newText = newText +words[i].toUpperCase();
						break;
			default:
						newText = newText + words[i];
						 break;
		}
		newText=newText+" ";
	}
	alert(newText);
	return newText;
}
*/

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
	    	if(currentIdea != null) //if we just actualized data
    		{
    			currentIdea = e.ideas[0];
    		}
    		else
    		{
    			currentIdea = e.ideas[0];
    			fillData();
    		}
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

function match () {
  Titanium.API.info("Match");
  if(currentIdea != null)//If we have an idea
  {
  	 if(currentIdea.user.id == Alloy.Globals.UserId ) //If currentUser had created the idea
  	 {
  	 	alert("Tú creaste la idea, no puedes votar");
  	 }
  	 else
  	 {
  	 	 findIdea(currentIdea.id); //para cargar los votos más recientes
		 //var votes = String(currentIdea.votedBy).split(',').push("10"); //Regresa 2
		 var votes =  JSON.stringify(currentIdea.votedBy);
		 votes = votes.substring(1, votes.length-1);
		 votes = votes + "," +"\""+Alloy.Globals.UserId+"\"";
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
				/*scrollView.removeAllChildren();
		        getCurrentIdea(Alloy.Globals.UserId); //loads another idea*/
		         Alloy.createController('main').getView().open(); //reloads window
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
function noMatch () {
  Titanium.API.info("No Match");
  if(currentIdea != null)//If we have an idea
  {
  	if(currentIdea.user.id == Alloy.Globals.UserId) //If currentUser had created the idea
  	 {
  	 	alert("Tú creaste la idea, no puedes votar");
  	 }
  	 else
  	 {
  	 	findIdea(currentIdea.id); //para cargar los votos más recientes
		 //var votes = String(currentIdea.votedBy).split(',').push("10"); //Regresa 2
		 var votes =  JSON.stringify(currentIdea.votedBy);
		 votes = votes.substring(1, votes.length-1);
		 votes = votes + "," +"\""+Alloy.Globals.UserId+"\"";
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
		    	
				/*scrollView.removeAllChildren();
		        getCurrentIdea(Alloy.Globals.UserId); //loads another idea (fast)*/
		        Alloy.createController('main').getView().open(); //reloads window (slow)
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
	if (currentIdea != null)
	{
		var imageRow = newRow();
		var profilePic = Ti.UI.createImageView({
  			image:'/images/profilePic.png',
  			top:10,
  			width:120,
  			height:120
		});
		profilePic.addEventListener('click', function(e){
			showProfile();
		});
		imageRow.add(profilePic);
		scrollView.add(imageRow);
		
		var nameRow = newRow();
		var nameLabel = Ti.UI.createLabel({
			text: currentIdea.user.first_name +" "+ currentIdea.user.last_name,
			font: {
				     fontFamily: 'SourceSansPro-Regular'
				 },
			color: "#cc0a98" //pink match
		});
		nameRow.add(nameLabel);
		scrollView.add(nameRow);
		
		var pitchRow = newRow();
		var pitchTitle = Ti.UI.createLabel({
			text: 'IDEA',
			font: {
				     fontFamily: 'SourceSansPro-Regular'
				 },
			color: "#cbc01f", //gold match
			top:5  
		});
		pitchRow.add(pitchTitle);
		var text = "\""+" "+currentIdea.pitch+" "+"\"";
		var beginPos = 0;
		var nextTagPos = 0;
		var labels = [];
		var label;
		while(nextTagPos != -1)
		{	
			nextTagPos = text.indexOf('#');
			if(nextTagPos != -1)
			{
				label = text.slice(0,nextTagPos);
				labels.push(label);
				//alert(label);
				text = text.replace(label, "");
				//label with hashtag
				label = text.slice(0, text.indexOf(' '));
				labels.push(label);
				//alert(label);
				text = text.replace(label, "");
			}
		}
		label = text.slice(0, text.length);
		labels.push(label);
		//alert(label);
		
		var  winWidth = Titanium.Platform.displayCaps.platformWidth;
		var  oneSpace = 7/winWidth*100; //7 px of font, width in px for android
		var rowNumber = 0;
		var writtenChars = 0;
		var usedSpace = 15; //Initial identation (center effect)
		for (var i=0; i < labels.length; i++)
		{
			if (usedSpace + labels[i].length*oneSpace > 85)
			{
			rowNumber+=1;
			usedSpace = 15;
			writtenChars = 0;
			}
			usedSpace = oneSpace*writtenChars+oneSpace;
			
			switch(labels[i][0]){
				case '#':
							var wordLabel = Ti.UI.createLabel({
							color:"#04cbca", //aqua
							font: {
							     fontFamily: 'SourceSansPro-Regular'
							 },
							text: labels[i],
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
							top: 30+rowNumber*30,
							left:String(usedSpace)+'%',
							});
							wordLabel.addEventListener('click', function(e){
								Alloy.Globals.tagsToSearch.push(this.text.slice(1)); //delete '#'
								 Alloy.createController('searchResults').getView();
							});
							break;
				default:
							var wordLabel = Ti.UI.createLabel({
							color:'black',
							font: {
							     fontFamily: 'SourceSansPro-Regular'
							 },
							text: labels[i],
							textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
							top: 30+rowNumber*30,
							left:String(usedSpace)+'%',
							});
							 break;
			}
			writtenChars += labels[i].length+1;
			pitchRow.add(wordLabel);
		}
			
		scrollView.add(pitchRow);	
		
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
	    	if(e.comments.length > 0) //if there are comments
	    	{
	    		var commentsRow = newRow();
	    		var commentsTitle = Ti.UI.createLabel({
				font: {
				     fontFamily: 'SourceSansPro-Regular'
				 },
				color: "#cbc01f", //gold match
				text: 'COMENTARIOS'
				});
				commentsRow.add(commentsTitle);
				scrollView.add(commentsRow);
				
	    		for(var i = 0; i < e.comments.length; i++){
			    	var authorName = e.comments[i].user.first_name +" "+ e.comments[i].user.last_name;
			    	var authorId = e.comments[i].user.id;
			    	var comment = Ti.UI.createView({
					    backgroundColor: 'white',
					    width:'100%', height: Ti.UI.SIZE,
					    top: 0
					 });
					var textLabel = Ti.UI.createLabel({
					    text: e.comments[i].text,
					    color: 'black',
					    top: 10, left:5
					 });
					var authorLabel = Ti.UI.createLabel({
					    text: authorName,
					    color: 'blue',
					    bottom:0 , right: 5,
					  });
					authorLabel.addEventListener('click',function(e)
						{
						   Titanium.API.info("show user profile");
						   Alloy.Globals.userToShow = authorId;
						   Alloy.createController('userProfile').getView().open();
					});
	  				comment.add(textLabel);
	  				comment.add(authorLabel);
					scrollView.add(comment);
				}
	    	}
	    	
			var commentArea = Titanium.UI.createTextArea({
			id: 'comment',
			borderColor: "#04cbca",
   			borderWidth: 2,
		    hintText : 'Nuevo comentario...',
		    color: 'black',
		    textAlign: 'left',
		    returnKeyType: Ti.UI.RETURNKEY_DONE,
		    width : '80%', height : Ti.UI.SIZE
			});
			
			commentArea.addEventListener('return',function(e)
			{
				var textComment = commentArea.value;
				var userId = Alloy.Globals.UserId;
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
					  	
					  	//Alloy.Globals.ideaToShow = currentIdea.id; //Show this idea again
				    	//Alloy.createController('main').getView().open();
				    	newComment.blur();
				    	newComment = Ti.UI.createView({
						center : {x: 0, y: 10000}, //solucion momentanea es mandarlo a un y muy grande para que siempre baje
					    backgroundColor: 'white',
					    width:'100%', height: Ti.UI.SIZE,
					    top: 10, left: 0
					  });
				    	scrollView.removeAllChildren();
				    	fillData();
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
			scrollView.add(newComment);
			$.win.add(scrollView); //Si no se puede traer los comentarios no desplegará nada, verificar sincronia
			
			var matchActions = Titanium.UI.createView({
			   backgroundColor:'white',
			   width:'100%',
			   height:'70',
			   bottom:0,
			});
	
			var matchButton = Titanium.UI.createButton({
			   backgroundImage: '/images/like.png',
			   bottom: 20,
			   width: 50,
			   height: 50,
			   backgroundColor:"#04cbca",
			   left:"25%"
			});
			matchButton.addEventListener('click',function(e)
			{
			   match();
			});
			var matchLabel = Ti.UI.createLabel({
			text:String(currentIdea.matches),
			font: {
				     fontFamily: 'SourceSansPro-Regular'
				 },
			color: "#04cbca",//aqua match
			bottom:0,
			left:"25%",
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
			
			});
			matchActions.add(matchButton);
			matchActions.add(matchLabel);
			
			
			var commentButton = Titanium.UI.createButton({
			   backgroundImage: '/images/comment.png',
			   bottom: 20,
			   width: 50,
			   height: 50,
			   backgroundColor:"#cbc01f",
			});
			commentButton.addEventListener('click',function(e)
			{
			     Titanium.API.info("comment");
   				scrollView.scrollTo(newComment.getCenter().x, newComment.getCenter().y);
			});
			var commentLabel = Ti.UI.createLabel({
			text:e.comments.length,
			font: {
				     fontFamily: 'SourceSansPro-Regular'
				 },
			color: "#cbc01f",//gold match
			bottom:0,
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
			
			});
			matchActions.add(commentButton);
			matchActions.add(commentLabel);
			
			var noMatchButton = Titanium.UI.createButton({
			   backgroundImage: '/images/dislike.png',
			   bottom: 20,
			   width: 50,
			   height: 50,
			   backgroundColor:"#cc0a98",
			   right:"25%"
			});
			noMatchButton.addEventListener('click',function(e)
			{
			   noMatch();
			});
			var noMatchLabel = Ti.UI.createLabel({
			text:String(currentIdea.noMatches),
			font: {
				     fontFamily: 'SourceSansPro-Regular'
				 },
			color: "#cc0a98", //pink match
			bottom:0,
			right:"25%",
			textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER
			
			});
			matchActions.add(noMatchButton);
			matchActions.add(noMatchLabel);
			$.win.add(matchActions);
			
		    } else {
		        alert('Error:\n' +
		            ((e.error && e.message) || JSON.stringify(e)));
		    }
			});	
	}
			
}




if (Ti.UI.Android){
  $.win.windowSoftInputMode = Ti.UI.Android.SOFT_INPUT_ADJUST_PAN;
}


if(Alloy.Globals.ideaToShow != null)
{
	findIdea(Alloy.Globals.ideaToShow);
	Alloy.Globals.ideaToShow = null;
}
else
{
		getCurrentIdea(Alloy.Globals.UserId);
}

