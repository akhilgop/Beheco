// ----------------------------------------------------------------nbbar On Scroll-------------------------------------------------------------------

var nb = document.querySelector('.nb'); // Identify target
window.addEventListener('scroll', function (event) { // To listen for event
    event.preventDefault();

    if (window.scrollY <= 150) {
        nb.style.backgroundColor = 'white';
        nb.style.boxShadow = '0px 1px 6px rgba(0, 0, 0, 0.1)';
    } else {
        nb.style.backgroundColor = '#fff';
        nb.style.boxShadow = '0px 1px 6px rgba(0, 0, 0, 0.1)';
        nb.style.padding = '0'
    }
});



var nb = document.querySelector('.nb'); // Identify target
window.addEventListener('scroll', function (event) { // To listen for event
    event.preventDefault();

    if (window.scrollY == 0) {
        nb.style.boxShadow = 'none';
        nb.style.backgroundColor = 'white';
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
// ----------------------------------------------------------------Video Slider-------------------------------------------------------------------
// work in progress - needs some refactoring and will drop JQuery i promise :)
var instance = $(".slider-wrapper");
$.each(instance, function (key, value) {

    var arrows = $(instance[key]).find(".arrow"),
        prevArrow = arrows.filter('.arrow-prev'),
        nextArrow = arrows.filter('.arrow-next'),
        box = $(instance[key]).find(".hs"),
        x = 0,
        mx = 0,
        maxScrollWidth = box[0].scrollWidth - (box[0].clientWidth / 2) - (box.width() / 2);

    $(arrows).on('click', function () {

        if ($(this).hasClass("arrow-next")) {
            x = ((box.width() / 2)) + box.scrollLeft() - 10;
            box.animate({
                scrollLeft: x,
            })
        } else {
            x = ((box.width() / 2)) - box.scrollLeft() - 10;
            box.animate({
                scrollLeft: -x,
            })
        }

    });

    $(box).on({
        mousemove: function (e) {
            var mx2 = e.pageX - this.offsetLeft;
            if (mx) this.scrollLeft = this.sx + mx - mx2;
        },
        mousedown: function (e) {
            this.sx = this.scrollLeft;
            mx = e.pageX - this.offsetLeft;
        },
        scroll: function () {
            toggleArrows();
        }
    });

    $(document).on("mouseup", function () {
        mx = 0;
    });

    function toggleArrows() {
        if (box.scrollLeft() > maxScrollWidth - 10) {
            // disable next button when right end has reached 
            nextArrow.addClass('disabled');
        } else if (box.scrollLeft() < 10) {
            // disable prev button when left end has reached 
            prevArrow.addClass('disabled')
        } else {
            // both are enabled
            nextArrow.removeClass('disabled');
            prevArrow.removeClass('disabled');
        }
    }

});