// ----------------------------------------------------------------Navbar On Scroll-------------------------------------------------------------------

var nav = document.querySelector('nav'); // Identify target
window.addEventListener('scroll', function (event) { // To listen for event
    event.preventDefault();

    if (window.scrollY <= 150) {
        nb.style.padding = '30px 0';
        nav.style.backgroundColor = 'transparent';
    } else {
        nav.style.backgroundColor = '#fff';
        nav.style.boxShadow = '0 0 4px grey';
        nav.style.height = '80px';
        nav.style.padding = '0'
    }
});



var nav = document.querySelector('nav'); // Identify target
window.addEventListener('scroll', function (event) { // To listen for event
    event.preventDefault();

    if (window.scrollY == 0) {
        nav.style.boxShadow = 'none';
        nav.style.height = '100px';
        nav.style.backgroundColor = 'transparent';
    }
});

// ----------------------------------------------------------------Move To Top-------------------------------------------------------------------

mybutton = document.getElementById("myBtn");

window.onscroll = function () {
    scrollFunction()
};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        mybutton.style.display = "block";

    } else {
        mybutton.style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    $('html,body').animate({ scrollTop: 0 }, 'slow');
}

// ----------------------------------------------------------------Tooltip-------------------------------------------------------------------

var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})
