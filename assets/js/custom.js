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

// ----------------------------------------------------------------Ad Slider-------------------------------------------------------------------
{
    const sliders = document.querySelectorAll(".slider");
    // interval between switching images
    // can't be less than your animation duration in css!
    const interval = 2800;
    // if you don't want to first animation last longer than other animations  
    // set animDuration (in miliseconds) to your value of animation duration in css
    const animDuration = 600;

    for (let i = 0; i < sliders.length; ++i) {
        const slider = sliders[i];
        const dots = slider.querySelector(".dots");
        const sliderImgs = slider.querySelectorAll(".img");

        let currImg = 0;
        let prevImg = sliderImgs.length - 1;
        let intrvl;
        let timeout;

        // Creates dots and add listeners to them
        for (let i = 0; i < sliderImgs.length; ++i) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            dots.appendChild(dot);
            dot.addEventListener("click", dotClick.bind(null, i), false);
        }

        const allDots = dots.querySelectorAll(".dot");
        allDots[0].classList.add("active-dot");

        sliderImgs[0].style.left = "0";
        timeout = setTimeout(() => {
            animateSlider();
            sliderImgs[0].style.left = "";
            intrvl = setInterval(animateSlider, interval);
        }, interval - animDuration);

        /**
         * Animates images
         * @param {number} [nextImg] - index of next image to show
         * @param {boolean} [right = false] - animate to right
         */
        function animateSlider(nextImg, right) {
            if (!nextImg)
                nextImg = currImg + 1 < sliderImgs.length ? currImg + 2 : 1;

            --nextImg;
            sliderImgs[prevImg].style.animationName = "";

            if (!right) {
                sliderImgs[nextImg].style.animationName = "leftNext";
                sliderImgs[currImg].style.animationName = "leftCurr";
            }
            else {
                sliderImgs[nextImg].style.animationName = "rightNext";
                sliderImgs[currImg].style.animationName = "rightCurr";
            }

            prevImg = currImg;
            currImg = nextImg;

            currDot = allDots[currImg];
            currDot.classList.add("active-dot");
            prevDot = allDots[prevImg];
            prevDot.classList.remove("active-dot");
        }

        /**
         * Decides if animate to left or right and highlights clicked dot
         * @param {number} num - index of clicked dot
         */
        function dotClick(num) {
            if (num == currImg)
                return false;

            clearTimeout(timeout);
            clearInterval(intrvl);

            if (num > currImg)
                animateSlider(num + 1);
            else
                animateSlider(num + 1, true);

            intrvl = setInterval(animateSlider, interval);
        }
    }
}
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


// ----------------------------------------------------Image Cropper-----------------------------------------------------//
const $upload = $('#upload'),
    $crop = $('#crop'),
    $result = $('#result'),
    $croppie = $('#croppie');

var cr,
    cr_img = '',
    img_w = 200,
    img_h = 200,
    isCrop = 0;

$(function () {
    if (window.File && window.FileList && window.FileReader)
        fileInit();
    else
        alert('Error');
});

//********* file select/drop *********
var fileselect = document.getElementById("fileselect"),
    filedrag = document.getElementById("filedrag");

function fileInit() {
    // file select
    fileselect.addEventListener("change", FileSelectHandler, false);
    // is XHR2 available?
    var xhr = new XMLHttpRequest();
    // file drop
    if (xhr.upload) {
        filedrag.addEventListener("dragover", FileDragHover, false);
        filedrag.addEventListener("dragleave", FileDragHover, false);
        filedrag.addEventListener("drop", FileSelectHandler, false);
    }
}

// file selection
function FileSelectHandler(e) {
    // cancel event and hover styling
    FileDragHover(e);
    // fetch FileList object
    var files = e.target.files || e.dataTransfer.files;
    if (files[0] && files[0].type.match('image.*')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $upload.hide();
            if (cr_img == '') {
                cr_img = e.target.result;
                cropInit();
            }
            else {
                cr_img = e.target.result;
                bindCropImg();
            }
            $crop.fadeIn(300);
        }
        reader.readAsDataURL(files[0]);
    }
}

// file drag hover
function FileDragHover(e) {
    e.stopPropagation();
    e.preventDefault();
    filedrag.className = (e.type == "dragover" ? "hover" : "");
}

//********* crop *********
function cropInit() {
    cr = $croppie.croppie({
        viewport: {
            width: img_w,
            height: img_h
        },
        boundary: {
            width: img_w,
            height: img_h
        },
        mouseWheelZoom: false,
        enableOrientation: true
    });

    $(".cr-slider-wrap").append('<button id="cr-rotate" onClick="cropRotate(-90);">↻ Rotate</button>');

    bindCropImg();
}

function bindCropImg() {
    cr.croppie('bind', {
        url: cr_img
    });
}

function cropRotate(deg) {
    cr.croppie('rotate', parseInt(deg));
}

function cropCancel() {
    if ($upload.is(':hidden')) {
        $upload.fadeIn(300).siblings().hide();
        fileselect.value = "";
        isCrop = 0;
    }
}

function cropResult() {
    if (!isCrop) {
        isCrop = 1;
        cr.croppie('result', {
            type: 'canvas', // canvas(base64)|html
            size: { width: img_w, height: img_h }, //'viewport'|'original'|{width:500, height:500}
            format: 'jpeg', //'jpeg'|'png'|'webp'
            quality: 1 //0~1
        }).then(function (resp) {
            $crop.hide();
            $result.find('img').attr('src', resp);
            $result.fadeIn(300);
        });
    }
}

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
    // 'use strict';
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
