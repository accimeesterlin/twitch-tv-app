// Initialize Firebase
  var config = {
    apiKey: "AIzaSyANdgJlHSYjgnSAeWOkGqfVkOBtemYbncw",
    authDomain: "semistackapp.firebaseapp.com",
    databaseURL: "https://semistackapp.firebaseio.com",
    projectId: "semistackapp",
    storageBucket: "semistackapp.appspot.com",
    messagingSenderId: "782966338001"
  };
  firebase.initializeApp(config);

// Grabbing Firebase Services
var auth = firebase.auth(),
	database = firebase.database();


// Sending the User to the sign up html 
$("#signup").on('click', function () {
	location.href = "signup.html";
});


// Sending the User to the sign in html 
$("#signin").on('click', function () {
	location.href = "signin.html";

});


// Sign the user up
$("#signUserUp").on('click', function (event) {

	event.preventDefault();


	// Grabbing the input values
	var firstname = $("#first_name").val().trim(),
		lastname = $("#last_name").val().trim(),
		password = $("#password").val().trim(),
		email = $("#email").val().trim();



	// Firebase methods to sign the user up
	auth.createUserWithEmailAndPassword(email, password) // promise
		.then(function (newUser) {

			var user = {
				firstname:firstname,
				lastname:lastname,
				password:password,
				email:email,
				id:newUser.uid
			};	


			var ref = database.ref('users/' + newUser.uid); // refering to our database

				ref.set(user); // save the data into the database

			location.href = "dashboard.html"; // dashboard for logged in users

		}) 
		// Dealing with errors
		.catch(function (err) {
			console.log(err);
			console.log("Noooo, something went wrong");
		}); 


	// Clearing the input values
	$("#first_name").val("");
	$("#last_name").val("");
	$("#password").val("");
	$("#email").val("");

});



$('#signinDash').on('click', function (event) {

	event.preventDefault();

	var password = $("#passwordSign").val().trim(),
		email = $("#emailSign").val().trim();

	console.log(password, email);	

	auth.signInWithEmailAndPassword(email, password)	
		.then(function (user) {
			console.log(user);

			location.href = "dashboard.html";
		})
		.catch(function (err) {
			console.log(err);
		});

});

// Sign the logged in user out
$("#signout").on('click', function () {

	auth.signOut() // firebase method to sign otu
		.then(function () {

			location.href = 'signin.html'; // redirect the user to the sign in page
			
		})
		// Dealing with errors
		.catch(function (err) {
			console.log(err);
		})

});

// Dashboard section
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
   
   	// Refering the Firebase Section
    var refLanguage = database.ref("users/" + user.uid + "/languages"),
    	ref = database.ref("users/" + user.uid),
    	allUsers = database.ref("users");


    // Get the current logged in user info
    ref.on('value', function (user) {

    	var currentUser = user.val(); // info

    	$("#fullname").html("Welcome back, dear " +  currentUser.firstname + " " + currentUser.lastname);
    	$("#email").html(currentUser.email);

    });

    // Adding languages to the Database
    $("#addLanguage").on('click', function (event) {
    	
    	event.preventDefault(); // preventing the browser from refreshing

    	var language = $("#language").val().trim();

    	var userLanguage = {

    		language:language
    	}

    	refLanguage.set(userLanguage); // firebase reference

    });


    // Getting the languages values
    refLanguage.on("value", function (languages) {

    	var currentUserLanguage = languages.val();

    	// Output to the DOM
    	$("#language").val(currentUserLanguage.language);
    	$("#display").html(currentUserLanguage.language);
    });



    // Display all users
    allUsers.on('value', function (all) {
    	var allCurrentUser = all.val();

    	console.log(allCurrentUser);

    	var displayAllUsers = [];


    	// Looping through users ID
    	for(var user in allCurrentUser){
    		displayAllUsers.push("User: " + allCurrentUser[user].firstname + ", ");
    		
    	}

    	// Looping through all users
    	for(var i = 0; i < displayAllUsers.length; i++){
    		var li = $("<li>");
    			li.html(displayAllUsers[i]);

    		$("#users").append(li);	// appending them to the ul tag in the HTML
    	}
    });

  } else {

   	console.log("No user found!!!");

  }
});


// Note: 
// The way, we are displaying all the users, is not recommended for security reasons























