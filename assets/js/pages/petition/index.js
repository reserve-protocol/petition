var petitionLink = "https://reserve.org/petition/"

function shareEmail() {
    window.location.href = "mailto:?subject=Ask the United Nations to recognize the access to a stable currency as a human right.&body=" + petitionLink;
}

$('#copylink').tooltip({ trigger: 'click' })

$('#copylink').click(function () {
    navigator.clipboard.writeText(petitionLink);

    setTimeout(function () {
        $('#copylink').tooltip('hide')
    }, 500);
})

$('input').on('input change focusout', function () {
    let a = $('#name').val();
    let b = $('#surname').val();
    let c = $('#email').val();
    let d = $('#country').val();
    let e = $('#city').val();

    if (a && b && c) {
        $('.input-group').addClass('strong');
    } else {
        $('.input-group').removeClass('strong');
    }

    if (d) {
        $('#country').addClass('strong');
    } else {
        $('#country').removeClass('strong');
    }

    if (e) {
        $('#city').addClass('strong');
    } else {
        $('#city').removeClass('strong');
    }

})

$(window).on('scroll resize', function () {
    let a = $('#fixed-sign-btn').offset().top;
    let b = $('#sign-btn').offset().top;

    if (a >= b) {
        $('#fixed-sign').addClass('hide');
    } else {
        $('#fixed-sign').removeClass('hide');
    }
});

$('#fixed-sign-btn').click(function(){
    $('#sign-btn').click();
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
countRef.doc("count")
    .onSnapshot((doc) => {
        try {
            //Count only alternative method signatures
            document.querySelector('#signers').innerHTML = doc.data()?.count || 0;
        } catch (error) {
           console.log(error)
        }
        try {
            // Alt method + change.org + gopetition signatures
            document.querySelector('#total_signers').innerHTML = (doc.data()?.count + doc.data()?.change_org_count + doc.data()?.gopetition_count) || 0;
        } catch (error) {
           console.log(error)
        }
    });

// Listen for form submit
document.getElementById('contactForm').addEventListener('submit', submitForm);

// Attach an asynchronous callback to read the data at our posts reference

// Submit form
function submitForm(e) {
    e.preventDefault();

    let name = $('#name').val();
    let surname = $('#surname').val();
    let email = $('#email').val();
    let country = $('#country').val();
    let city = $('#city').val();
    $('#sign-btn').prop('disabled', true);

    messagesRef.add(
        { name, surname, email, country, city }
    );

    countRef.doc('count').update({
        count: firebase.firestore.FieldValue.increment(1),
    });

    setTimeout(function () {
        window.location.href = 'thanks/';
    }, 1500);

}

// Function to get form value
function getInputVal(id) {
    return document.getElementById(id).value;
}

function isChecked(id) {
    return document.getElementById(id).checked;
}
