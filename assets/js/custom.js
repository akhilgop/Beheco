// ----------------------------------------------------------------navbar On Scroll-------------------------------------------------------------------

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
// ----------------------------------------------------Search Results Sidebar-----------------------------------------------------//
$(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
        $(this).toggleClass("active");
    });
});
// ----------------------------------------------------Image Uploader-----------------------------------------------------//
function CustomUpload(element) {
    let ref = this;
    this.imageFileArray = [];
    this.element = $(element);
    this.element.on('change', async function (e) {
        let arrayImage = e.target.files;
        let start = ref.imageFileArray.length;
        let validExt = ['image/jpg', 'image/jpeg', 'image/png'];
        $.each(arrayImage, (index, item) => {
            if ($.inArray(item.type, validExt) != -1) {
                item.index = start + index;
                ref.imageFileArray.push(item);
                let fr = new FileReader();
                let imageItem = '';
                fr.onload = function (event) {
                    imageItem += `
<div class="custom-file-preview-item"
style="background: url('${event.target.result}')">
<span data-key="${item.index}" class="custom-file-preview-del"><i
class="fa fa-times"></i></span>
</div>
`;
                    $('.custom-file-preview').append(imageItem);
                }
                fr.readAsDataURL(item);
            } else {
                alert('This is not an image');
            }
            //Array images
            console.log(ref.imageFileArray);
        });
    });
    this.element.parent().on('click', '.custom-file-preview-del', function (e) {
        e.preventDefault();
        let del = $(this);
        let id = del.data('key');
        let index = ref.imageFileArray.findIndex(item => {
            return item.index == id;
        });
        ref.imageFileArray.splice(index, 1);
        del.parent().remove();
        //Array after deleted
        console.log(ref.imageFileArray);
    });
}
const upload = new CustomUpload('#fileImage');

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

// ----------------------------------------------------------Star Rating--------------------------------------------------------//
var $star_rating = $('.star-rating .fa-star');

var SetRatingStar = function () {
    return $star_rating.each(function () {
        if (parseInt($star_rating.siblings('input.rating-value').val()) >= parseInt($(this).data('rating'))) {
            return $(this).removeClass('far').addClass('fas');
        } else {
            return $(this).removeClass('fas').addClass('far');
        }
    });
};

$star_rating.on('click', function () {
    $star_rating.siblings('input.rating-value').val($(this).data('rating'));
    return SetRatingStar();
});

SetRatingStar();
$(document).ready(function () {

});

// ----------------------------------------------------Custom File Upload-----------------------------------------------------//
$(document).ready(function () {
    var $group = $('.input-group');
    var $file = $group.find('input[type="file"]')
    var $browse = $group.find('[data-action="browse"]');
    var $fileDisplay = $group.find('[data-action="display"]');
    var $reset = $group.find('[data-action="reset"]');


    var resetHandler = function (e) {
        if ($file.length === 0) {
            return;
        }

        $file[0].value = '';
        if (!/safari/i.test(navigator.userAgent)) {
            $file[0].type = '';
            $file[0].type = 'file';
        }
        $file.trigger('change');
    };

    var browseHandler = function (e) {
        //If you select file A and before submitting you edit file A and reselect it it will not get the latest version, that is why we  might need to reset.
        //resetHandler(e);
        $file.trigger('click');

    };

    $browse.on('click', function (e) {
        if (event.which != 1) {
            return;
        }
        browseHandler();
    });
    $fileDisplay.on('click', function (e) {
        if (event.which != 1) {
            return;
        }
        browseHandler();
    });
    $reset.on('click', function (e) {
        if (event.which != 1) {
            return;
        }

        resetHandler();
    });

    $file.on('change', function (e) {
        var files = [];
        if (typeof e.currentTarget.files) {
            for (var i = 0; i < e.currentTarget.files.length; i++) {
                files.push(e.currentTarget.files[i].name.split('\\/').pop())
            }
        } else {
            files.push($(e.currentTarget).val().split('\\/').pop())
        }
        $fileDisplay.val(files.join('; '))
    })
});

// -------------------------------------------------------Gallery-------------------------------------------------------//
$(document).ready(function () {
    lightGallery(document.getElementById('lightgallery'));
    lightGallery(document.getElementById('lightgallery1'))
});


// ----------------------------------------------------Vertical Tab Accordion-----------------------------------------------------//
(function () {
    $('.js-vertical-tab-content').hide();

    $('.js-vertical-tab-content:first').show();

    /* if in tab mode */
    $('.js-vertical-tab').click(function (event) {
        var activeTab;
        event.preventDefault();
        $('.js-vertical-tab-content').hide();
        activeTab = $(this).attr('rel');
        $('#' + activeTab).show();
        $('.js-vertical-tab').removeClass('is-active');
        $(this).addClass('is-active');
        $('.js-vertical-tab-accordion-heading').removeClass('is-active');
        $('.js-vertical-tab-accordion-heading[rel^=\'' + activeTab + '\']').addClass('is-active');
    });

    /* if in accordion mode */
    $('.js-vertical-tab-accordion-heading').click(function (event) {
        var accordion_activeTab;
        event.preventDefault();
        $('.js-vertical-tab-content').hide();
        accordion_activeTab = $(this).attr('rel');
        $('#' + accordion_activeTab).show();
        $('.js-vertical-tab-accordion-heading').removeClass('is-active');
        $(this).addClass('is-active');
        $('.js-vertical-tab').removeClass('is-active');
        $('.js-vertical-tab[rel^=\'' + accordion_activeTab + '\']').addClass('is-active');
    });

}).call(this);
//---------------------------------------------------------------------Animate on Scroll------------------------------------------------------------------
function animateFrom(elem, direction) {
    'use strict';
    direction = direction || 1;
    var x = 0,
        y = direction * 100;
    elem.style.transform = "translate(" + x + "px, " + y + "px)";
    elem.style.opacity = "0";
    gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
        duration: 1.25,
        x: 0,
        y: 0,
        autoAlpha: 1,
        ease: "expo",
        overwrite: "auto"
    });
}

function hide(elem) {
    gsap.set(elem, { autoAlpha: 0 });
}

document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
            trigger: elem,
            onEnter: function () { animateFrom(elem) },
            onEnterBack: function () { animateFrom(elem, -1) },
            onLeave: function () { hide(elem) } // assure that the element is hidden when scrolled into view
        });
    });
});
// ----------------------------------------------------------------Datepicker-----------------------------------------------------------
$(function () {
    $("#datepicker").datepicker({
        autoclose: true,
        todayHighlight: true
    });
});

// ----------------------------------------------------------------Nested Dropdown-------------------------------------------------------------
(function ($bs) {
    const CLASS_NAME = 'has-child-dropdown-show';
    $bs.Dropdown.prototype.toggle = function (_orginal) {
        return function () {
            document.querySelectorAll('.' + CLASS_NAME).forEach(function (e) {
                e.classList.remove(CLASS_NAME);
            });
            let dd = this._element.closest('.dropdown').parentNode.closest('.dropdown');
            for (; dd && dd !== document; dd = dd.parentNode.closest('.dropdown')) {
                dd.classList.add(CLASS_NAME);
            }
            return _orginal.call(this);
        }
    }($bs.Dropdown.prototype.toggle);

    document.querySelectorAll('.dropdown').forEach(function (dd) {
        dd.addEventListener('hide.bs.dropdown', function (e) {
            if (this.classList.contains(CLASS_NAME)) {
                this.classList.remove(CLASS_NAME);
                e.preventDefault();
            }
            e.stopPropagation(); // do not need pop in multi level mode
        });
    });

    // for hover
    document.querySelectorAll('.dropdown-hover, .dropdown-hover-all .dropdown').forEach(function (dd) {
        dd.addEventListener('mouseenter', function (e) {
            let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
            if (!toggle.classList.contains('show')) {
                $bs.Dropdown.getOrCreateInstance(toggle).toggle();
                dd.classList.add(CLASS_NAME);
                $bs.Dropdown.clearMenus();
            }
        });
        dd.addEventListener('mouseleave', function (e) {
            let toggle = e.target.querySelector(':scope>[data-bs-toggle="dropdown"]');
            if (toggle.classList.contains('show')) {
                $bs.Dropdown.getOrCreateInstance(toggle).toggle();
            }
        });
    });
})(bootstrap);

// ----------------------------------------------------------------Toast-------------------------------------------------------------

