$('.form').find('input, textarea').on('keyup blur focus', function (e) {

  var $this = $(this),
      label = $this.prev('label');

	  if (e.type === 'keyup') {
			if ($this.val() === '') {
          label.removeClass('active highlight');
        } else {
          label.addClass('active highlight');
        }
    } else if (e.type === 'blur') {
    	if( $this.val() === '' ) {
    		label.removeClass('active highlight');
			} else {
		    label.removeClass('highlight');
			}
    } else if (e.type === 'focus') {

      if( $this.val() === '' ) {
    		label.removeClass('highlight');
			}
      else if( $this.val() !== '' ) {
		    label.addClass('highlight');
			}
    }

});

$('.tab a').on('click', function (e) {

  e.preventDefault();

  $(this).parent().addClass('active');
  $(this).parent().siblings().removeClass('active');

  target = $(this).attr('href');

  $('.tab-content > div').not(target).hide();

  $(target).fadeIn(600);

});



// FIREBASE //

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDYvwah2eivbaO1-r7DwA-kZm8JOOmEEoU",
    authDomain: "foryouforall-9aa0c.firebaseapp.com",
    databaseURL: "https://foryouforall-9aa0c.firebaseio.com",
    projectId: "foryouforall-9aa0c",
    storageBucket: "",
    messagingSenderId: "630270856945"
  };
  firebase.initializeApp(config);
  var dbRef = firebase.database().ref().child('object');
  var dbUser = firebase.database().ref().child('user');
  var user = firebase.auth().currentUser;
  const $email = $('#email');
  const $login_email = $('#login_email');
  const $password = $('#password');
  const $login_password = $('#login_password');
  const $joinUs = $('#joinus');
  const $btnLogin = $('#btnlogin');
  const $firstName = $('#fname');
  const $lastName = $('#lname');
  const $displayName = $('#displayname');
  //const $btnSignIn = $('#btnSignIn');
  //const $btnSignUp = $('#btnSignUp');
  //const $btnSignOut = $('#btnSignOut');
  //const $signInfo = $('#sign-info');


  // SignUp
  $joinUs.click(function(e){
    const email = $email.val();
    const lname = $lastName.val();
    const fname = $firstName.val();
    const pass = $password.val();
    const auth = firebase.auth();
    // signUp
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
      //$signInfo.html(e.message);
    });
    promise.then(function(user){
      console.log('SignUp user is'+user.email);
      const dbUserid = dbUser.child(user.uid);
      dbUserid.set({
        email:email,
        userFirstName: fname,
        userLastName: lname
      });
    });
  });

  // SignIn
  $btnLogin.click(function(e){
    const email = $login_email.val();
    const pass = $login_password.val();
    const auth = firebase.auth();
    // signIn
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(e){
      console.log(e.message);
      //$signInfo.html(e.message);
    });
  });

  // Listening Login User
  firebase.auth().onAuthStateChanged(function(user){
    if(user) {
      console.log(user);
      $displayName.html(user.email +" is login...");
      //const dbUserid = dbUser.child(user.uid);
      loadData(user);

      user.providerData.forEach(function(profile) {
        console.log("  Sign-in provider: "+profile.providerId);
        console.log("  Provider-specific UID: "+profile.uid);
        console.log("  Name: "+profile.userLastName);
        console.log("  Email: "+profile.email);
      });
    } else {
      console.log("not logged in");
    }
  });
  //load data to firebase
  function loadData(currentUser){
    var userId = firebase.auth().currentUser.uid;
    var dbUserInfo = firebase.database().ref().child('/user/' + userId);
    dbUserInfo.on("value", function(snapshot){
      var username = snapshot.val().userLastName;
      typeName = username;
      if (typeName != "") {
        $('typeName').html(typeName);
      }
      $('#profile-name').html(username);
      $('#profile-email').html(snapshot.val().email);
    });
  }
