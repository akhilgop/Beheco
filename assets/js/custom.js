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
// ----------------------------------------------------Search Results Banner-----------------------------------------------------//
$(document).ready(function () {
    $("#sidebarCollapse").on("click", function () {
        $("#sidebar").toggleClass("active");
        $(this).toggleClass("active");
    });
});

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

// ----------------------------------------------------Gallery-----------------------------------------------------//

// Gallery image hover
$(".img-wrapper").hover(
    function () {
        $(this).find(".img-overlay").animate({ opacity: 1 }, 600);
    }, function () {
        $(this).find(".img-overlay").animate({ opacity: 0 }, 600);
    }
);

// Lightbox
var $overlay = $('<div id="overlay"></div>');
var $image = $("<img>");
var $prevButton = $('<div id="prevButton"><i class="fa fa-chevron-left"></i></div>');
var $nextButton = $('<div id="nextButton"><i class="fa fa-chevron-right"></i></div>');
var $exitButton = $('<div id="exitButton"><i class="fa fa-times"></i></div>');

// Add overlay
$overlay.append($image).prepend($prevButton).append($nextButton).append($exitButton);
$("#gallery").append($overlay);

// Hide overlay on default
$overlay.hide();

// When an image is clicked
$(".img-overlay").click(function (event) {
    // Prevents default behavior
    event.preventDefault();
    // Adds href attribute to variable
    var imageLocation = $(this).prev().attr("href");
    // Add the image src to $image
    $image.attr("src", imageLocation);
    // Fade in the overlay
    $overlay.fadeIn("slow");
});

// When the overlay is clicked
$overlay.click(function () {
    // Fade out the overlay
    $(this).fadeOut("slow");
});

// When next button is clicked
$nextButton.click(function (event) {
    // Hide the current image
    $("#overlay img").hide();
    // Overlay image location
    var $currentImgSrc = $("#overlay img").attr("src");
    // Image with matching location of the overlay image
    var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
    // Finds the next image
    var $nextImg = $($currentImg.closest(".image").next().find("img"));
    // All of the images in the gallery
    var $images = $("#image-gallery img");
    // If there is a next image
    if ($nextImg.length > 0) {
        // Fade in the next image
        $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
    } else {
        // Otherwise fade in the first image
        $("#overlay img").attr("src", $($images[0]).attr("src")).fadeIn(800);
    }
    // Prevents overlay from being hidden
    event.stopPropagation();
});

// When previous button is clicked
$prevButton.click(function (event) {
    // Hide the current image
    $("#overlay img").hide();
    // Overlay image location
    var $currentImgSrc = $("#overlay img").attr("src");
    // Image with matching location of the overlay image
    var $currentImg = $('#image-gallery img[src="' + $currentImgSrc + '"]');
    // Finds the next image
    var $nextImg = $($currentImg.closest(".image").prev().find("img"));
    // Fade in the next image
    $("#overlay img").attr("src", $nextImg.attr("src")).fadeIn(800);
    // Prevents overlay from being hidden
    event.stopPropagation();
});

// When the exit button is clicked
$exitButton.click(function () {
    // Fade out the overlay
    $("#overlay").fadeOut("slow");
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

  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQSxDQUFBLENBQUUsMEJBQUYsQ0FBNkIsQ0FBQyxJQUE5QixDQUFBOztFQUNBLENBQUEsQ0FBRSxnQ0FBRixDQUFtQyxDQUFDLElBQXBDLENBQUEsRUFEQTs7O0VBS0EsQ0FBQSxDQUFFLGtCQUFGLENBQXFCLENBQUMsS0FBdEIsQ0FBNEIsUUFBQSxDQUFDLEtBQUQsQ0FBQTtBQUM1QixRQUFBO0lBQUUsS0FBSyxDQUFDLGNBQU4sQ0FBQTtJQUNBLENBQUEsQ0FBRSwwQkFBRixDQUE2QixDQUFDLElBQTlCLENBQUE7SUFDQSxTQUFBLEdBQVksQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLElBQVIsQ0FBYSxLQUFiO0lBQ1osQ0FBQSxDQUFFLEdBQUEsR0FBTSxTQUFSLENBQWtCLENBQUMsSUFBbkIsQ0FBQTtJQUNBLENBQUEsQ0FBRSxrQkFBRixDQUFxQixDQUFDLFdBQXRCLENBQWtDLFdBQWxDO0lBQ0EsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFFBQVIsQ0FBaUIsV0FBakI7SUFDQSxDQUFBLENBQUUsb0NBQUYsQ0FBdUMsQ0FBQyxXQUF4QyxDQUFvRCxXQUFwRDtJQUNBLENBQUEsQ0FBRSw0Q0FBQSxHQUErQyxTQUEvQyxHQUEyRCxLQUE3RCxDQUFtRSxDQUFDLFFBQXBFLENBQTZFLFdBQTdFO0VBUjBCLENBQTVCLEVBTEE7OztFQWtCQSxDQUFBLENBQUUsb0NBQUYsQ0FBdUMsQ0FBQyxLQUF4QyxDQUE4QyxRQUFBLENBQUMsS0FBRCxDQUFBO0FBQzlDLFFBQUE7SUFBRSxLQUFLLENBQUMsY0FBTixDQUFBO0lBQ0EsQ0FBQSxDQUFFLDBCQUFGLENBQTZCLENBQUMsSUFBOUIsQ0FBQTtJQUNBLG1CQUFBLEdBQXNCLENBQUEsQ0FBRSxJQUFGLENBQU8sQ0FBQyxJQUFSLENBQWEsS0FBYjtJQUN0QixDQUFBLENBQUUsR0FBQSxHQUFNLG1CQUFSLENBQTRCLENBQUMsSUFBN0IsQ0FBQTtJQUNBLENBQUEsQ0FBRSxvQ0FBRixDQUF1QyxDQUFDLFdBQXhDLENBQW9ELFdBQXBEO0lBQ0EsQ0FBQSxDQUFFLElBQUYsQ0FBTyxDQUFDLFFBQVIsQ0FBaUIsV0FBakI7SUFDQSxDQUFBLENBQUUsa0JBQUYsQ0FBcUIsQ0FBQyxXQUF0QixDQUFrQyxXQUFsQztJQUNBLENBQUEsQ0FBRSwwQkFBQSxHQUE2QixtQkFBN0IsR0FBbUQsS0FBckQsQ0FBMkQsQ0FBQyxRQUE1RCxDQUFxRSxXQUFyRTtFQVI0QyxDQUE5QztBQWxCQSIsInNvdXJjZXNDb250ZW50IjpbIiQoJy5qcy12ZXJ0aWNhbC10YWItY29udGVudCcpLmhpZGUoKVxuJCgnLmpzLXZlcnRpY2FsLXRhYi1jb250ZW50OmZpcnN0Jykuc2hvdygpXG5cbiMjIyBpZiBpbiB0YWIgbW9kZSAjIyNcblxuJCgnLmpzLXZlcnRpY2FsLXRhYicpLmNsaWNrIChldmVudCkgLT5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAkKCcuanMtdmVydGljYWwtdGFiLWNvbnRlbnQnKS5oaWRlKClcbiAgYWN0aXZlVGFiID0gJCh0aGlzKS5hdHRyKCdyZWwnKVxuICAkKCcjJyArIGFjdGl2ZVRhYikuc2hvdygpXG4gICQoJy5qcy12ZXJ0aWNhbC10YWInKS5yZW1vdmVDbGFzcyAnaXMtYWN0aXZlJ1xuICAkKHRoaXMpLmFkZENsYXNzICdpcy1hY3RpdmUnXG4gICQoJy5qcy12ZXJ0aWNhbC10YWItYWNjb3JkaW9uLWhlYWRpbmcnKS5yZW1vdmVDbGFzcyAnaXMtYWN0aXZlJ1xuICAkKCcuanMtdmVydGljYWwtdGFiLWFjY29yZGlvbi1oZWFkaW5nW3JlbF49XFwnJyArIGFjdGl2ZVRhYiArICdcXCddJykuYWRkQ2xhc3MgJ2lzLWFjdGl2ZSdcbiAgcmV0dXJuXG5cbiMjIyBpZiBpbiBhY2NvcmRpb24gbW9kZSAjIyNcblxuJCgnLmpzLXZlcnRpY2FsLXRhYi1hY2NvcmRpb24taGVhZGluZycpLmNsaWNrIChldmVudCkgLT5cbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAkKCcuanMtdmVydGljYWwtdGFiLWNvbnRlbnQnKS5oaWRlKClcbiAgYWNjb3JkaW9uX2FjdGl2ZVRhYiA9ICQodGhpcykuYXR0cigncmVsJylcbiAgJCgnIycgKyBhY2NvcmRpb25fYWN0aXZlVGFiKS5zaG93KClcbiAgJCgnLmpzLXZlcnRpY2FsLXRhYi1hY2NvcmRpb24taGVhZGluZycpLnJlbW92ZUNsYXNzICdpcy1hY3RpdmUnXG4gICQodGhpcykuYWRkQ2xhc3MgJ2lzLWFjdGl2ZSdcbiAgJCgnLmpzLXZlcnRpY2FsLXRhYicpLnJlbW92ZUNsYXNzICdpcy1hY3RpdmUnXG4gICQoJy5qcy12ZXJ0aWNhbC10YWJbcmVsXj1cXCcnICsgYWNjb3JkaW9uX2FjdGl2ZVRhYiArICdcXCddJykuYWRkQ2xhc3MgJ2lzLWFjdGl2ZSdcbiAgcmV0dXJuXG4iXX0=
  //# sourceURL=coffeescript