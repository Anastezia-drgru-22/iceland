$(document).ready(function () {
    // WOW.js
    new WOW({
        animateClass: 'animate__animated'
    }).init();

    // Прокрутка по якорям
    $(".scrollto a, .travel-video").on("click", function () {
        let href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(href).offset().top
        }, 1000);
        return false;
    });

    $("#travel-order-btn").click(function () {
        $('html, body').animate({
            scrollTop: $(".order-travel").offset().top
        }, 1000);
    });

    // programm-tour-sliders
    const slider = $('.programm-tour-sliders');
    slider.slick({
        arrows: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        dots: false,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    });

    function updateArrows() {
        if (slider.slick('slickCurrentSlide') === 0) {
            $('.prev').addClass('disabled');
        } else {
            $('.prev').removeClass('disabled');
        }

        if (slider.slick('slickCurrentSlide') === slider.slick('getSlick').slideCount - 1) {
            $('.next').addClass('disabled');
        } else {
            $('.next').removeClass('disabled');
        }
    }

    updateArrows();
    slider.on('afterChange', updateArrows);

    // reviews-sliders
    const $reviewsSlider = $('.reviews-sliders');
    $reviewsSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.reviews-arrows .prev'),
        nextArrow: $('.reviews-arrows .next'),
        fade: true,
        adaptiveHeight: true,
        dots: false,
        infinite: false,
    });

    function updateReviewsArrows() {
        const currentSlide = $reviewsSlider.slick('slickCurrentSlide');
        const totalSlides = $reviewsSlider.slick('getSlick').slideCount - 1;

        if (currentSlide === 0) {
            $('.reviews-arrows .prev').addClass('disabled');
        } else {
            $('.reviews-arrows .prev').removeClass('disabled');
        }

        if (currentSlide === totalSlides) {
            $('.reviews-arrows .next').addClass('disabled');
        } else {
            $('.reviews-arrows .next').removeClass('disabled');
        }
    }

    updateReviewsArrows();
    $reviewsSlider.on('afterChange', updateReviewsArrows);

    // fotogallery-sliders
    $('.fotogallery-sliders').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: $('.fotogallery-arrows .prev'),
        nextArrow: $('.fotogallery-arrows .next'),
        fade: true,
        adaptiveHeight: true,
        dots: true,
        infinite: true,
    });

    // Burger menu
    $('#burger').on('click', function () {
        $('#menu').toggleClass('open');
    });

    $('#menu *').on('click', function () {
        $('#menu').removeClass('open');
    });
});


$(window).on('load', function () {

    // Video play
    document.getElementById('play-button').addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.iceland-video').style.backgroundImage = 'none';
        this.style.opacity = '0';
        setTimeout(() => {
            this.style.display = 'none';
            document.getElementById('video-container').style.display = 'block';
        }, 300);
    });

    // Popup
    $('.mfp-image').magnificPopup({
        type: 'image',
        gallery: { enabled: false },
        closeOnContentClick: true,
        closeBtnInside: true,
        mainClass: 'mfp-with-zoom',
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out',
            opener: function (openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });

    // InputMask
    $("#inputPhone").inputmask({ "mask": "+375 (99) 999-99-99" });

    // Form validation
    $('#submit').click(function (event) {
        event.preventDefault();

        let group = $('input[name="option"]:checked');
        let name = $('#name');
        let phone = $('#inputPhone');
        let hasError = false;

        $('#name, #inputPhone, #radio-group label span').css('border', '1px solid white');
        $('.error-input').removeClass('show');

        if (group.length === 0) {
            $('.error-input-radio').addClass('show');
            $('#radio-group label span').css('border', '2px solid red');
            hasError = true;
        }

        if (!name.val()) {
            name.css('border', '2px solid red');
            name.closest('label').next('.error-input').addClass('show');
            hasError = true;
        }

        const phoneDigits = phone.val().replace(/[^\d]/g, '');
        if (!phone.val() || phoneDigits.length < 10) {
            phone.css('border', '2px solid red');
            phone.closest('label').next('.error-input').addClass('show');
            hasError = true;
        }

        if (!hasError) {
            $('.for-loader').css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.ru/checkout",
                data: {
                    group: group.val(),
                    name: name.val(),
                    phone: phone.val()
                }
            }).done(function (msg) {
                $('.for-loader').hide();
                if (msg.success === 1) {
                    $('form').hide();
                    $('.order-success').fadeIn().css('display', 'flex');
                } else {
                    alert("Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ");
                }
            });
        }
    });

});

