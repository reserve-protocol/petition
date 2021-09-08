const config = {
  apiKey: "AIzaSyAP0TrzOfImB7upXH-LHh_4VcL3BwJeH1Y",
  authDomain: "petition-project-defac.firebaseapp.com",
  projectId: "petition-project-defac",
  storageBucket: "petition-project-defac.appspot.com",
  messagingSenderId: "553652768003",
  appId: "1:553652768003:web:a4e701895065dba3ebed36",
  databaseURL: "https://petition-project-defac-default-rtdb.firebaseio.com",
  measurementId: "G-YRKTVC6WVF"
};

firebase.initializeApp(config);

// Reference messages collection
var messagesRef = firebase.database().ref('messages');
var countRef = firebase.database().ref('count');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Attach an asynchronous callback to read the data at our posts reference
countRef.on('value', (snapshot) => {
  document.querySelector('.count').innerHTML = snapshot.val();
}, (errorObject) => {
  console.log('The read failed: ' + errorObject.name);
}); 

document.querySelector('.count').innerHTML = (current_value || 0)
// Submit form
function submitForm(e){
  e.preventDefault();

  //Get value
  var name = getInputVal('name');
  var company = getInputVal('company');
  var email = getInputVal('email');
  var phone = getInputVal('phone');
  var message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);


  // Show alert
  document.querySelector('.alert').style.display = 'block';
  // // Hide alert after 3 seconds
  setTimeout(function(){
    document.querySelector('.alert').style.display = 'none';
  },3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get form value
function getInputVal(id){
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message
  });

  countRef.transaction(function (current_value) {
    return (current_value || 0) + 1;
  });

}

