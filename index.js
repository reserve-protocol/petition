const config = {
  apiKey: "AIzaSyAP0TrzOfImB7upXH-LHh_4VcL3BwJeH1Y",
  authDomain: "petition-project-defac.firebaseapp.com",
  projectId: "petition-project-defac",
};

const app = firebase.initializeApp(config);
const db = app.firestore();

// Reference messages collection
const messagesRef = db.collection("messages");
const countRef = db.collection("count");

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Attach an asynchronous callback to read the data at our posts reference

countRef.doc("count")
  .onSnapshot((doc) => {
    console.log("Current data: ", doc.data().count);
    document.querySelector('.count').innerHTML = doc.data()?.count || 0;
  });


// Submit form
function submitForm(e) {
  e.preventDefault();

  //Get value
  const name = getInputVal('name');
  const company = getInputVal('company');
  const email = getInputVal('email');
  const phone = getInputVal('phone');
  const message = getInputVal('message');

  // Save message
  saveMessage(name, company, email, phone, message);


  // Show alert
  document.querySelector('.alert').style.display = 'block';
  // // Hide alert after 3 seconds
  setTimeout(function () {
    document.querySelector('.alert').style.display = 'none';
  }, 3000);

  // Clear form
  document.getElementById('contactForm').reset();
}

// Function to get form value
function getInputVal(id) {
  return document.getElementById(id).value;
}

// Save message to firebase
function saveMessage(name, company, email, phone, message) {
  messagesRef.add({
    name: name,
    company: company,
    email: email,
    phone: phone,
    message: message
  });

  countRef.doc("count").update({
    count: firebase.firestore.FieldValue.increment(1)
  });

}