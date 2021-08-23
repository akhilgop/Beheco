// ----------------------------------------------------------------nbbar On Scroll-------------------------------------------------------------------

var nav = document.querySelector('nb'); // Identify target
window.addEventListener('scroll', function (event) { // To listen for event
    event.preventDefault();

    if (window.scrollY <= 150) {
        nb.style.padding = '30px 0';
        nb.style.backgroundColor = 'transparent';
    } else {
        nb.style.backgroundColor = '#fff';
        nb.style.boxShadow = '0px 1px 6px rgba(0, 0, 0, 0.1)';
        nb.style.height = '80px';
        nb.style.padding = '0'
    }
});



var nav = document.querySelector('nb'); // Identify target
window.addEventListener('scroll', function (event) { // To listen for event
    event.preventDefault();

    if (window.scrollY == 0) {
        nb.style.boxShadow = 'none';
        nb.style.height = '100px';
        nb.style.backgroundColor = 'transparent';
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
