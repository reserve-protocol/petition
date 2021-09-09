var petitionLink = "https://reserve.org/petition/"

function shareEmail() {
    window.location.href = "mailto:?subject=Ask the United Nations to recognize the access to a stable currency as a human right.&body="+petitionLink;
}

$('#copylink').tooltip({trigger: 'click'})

$('#copylink').click(function(){
    navigator.clipboard.writeText(petitionLink);

    setTimeout(function () {
		$('#copylink').tooltip('hide')
	}, 500);
})

/* FIREBASE */

const config = {
	apiKey: 'AIzaSyAP0TrzOfImB7upXH-LHh_4VcL3BwJeH1Y',
	authDomain: 'petition-project-defac.firebaseapp.com',
	projectId: 'petition-project-defac',
};

const app = firebase.initializeApp(config);
const db = app.firestore();

// Reference messages collection
const messagesRef = db.collection('messages');
const countRef = db.collection('count');

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Attach an asynchronous callback to read the data at our posts reference

// Submit form
function submitForm(e) {
	e.preventDefault();

	//Get value
	const name = getInputVal('name');
    const surname = getInputVal('name');
	const email = getInputVal('email');
    const country = getInputVal('country');
    const city = getInputVal('city');
	const shareEmail = isChecked('share-email');

	// Save message
	saveMessage(name, surname, email, country, city, shareEmail);
}

// Function to get form value
function getInputVal(id) {
	return document.getElementById(id).value;
}

function isChecked(id){
    return document.getElementById(id).checked;
}

// Save message to firebase
function saveMessage(name, surname, email, country, city, shareEmail) {

    $('#sign-btn').prop('disabled', true);

    console.table(name, surname, email, country, city, shareEmail);

	/*messagesRef.add({
		name: name,
		surname: surname,
		email: email,
		country: country,
		city: city,
        shareEmail: shareEmail
	});

	countRef.doc('count').update({
		count: firebase.firestore.FieldValue.increment(1),
	});*/

    setTimeout(function () {
		window.location.href = 'thank_you.html';
	}, 1500);
}