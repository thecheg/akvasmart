'use strict';

//=include ../../node_modules/jquery/dist/jquery.js
//=include ../../node_modules/device.js/dist/device.umd.js
//=include ../../node_modules/swiper/swiper-bundle.js
//=include ../modules/fancybox/fancybox.js

//=include ../modules/cheg.accordions/functions.js
//=include ../modules/cheg.collapse/functions.js
//=include ../modules/cheg.scrollbar/functions.js
//=include ../modules/cheg.scrolllock/functions.js
//=include ../modules/cheg.menu/functions.js
//=include ../modules/cheg.checkwebp/functions.js
//=include ../modules/cheg.waypoint/functions.js

let winWidth,
	winHeight,
	scrollOffset = 60,
	popupOpened = false,
	popupOpenedPos = 0,
	scrollPos = 0,
	animDuration = 200,
	pageLoaded = false,
	deviceIs = device.device;

deviceIs.addClasses(document.documentElement);

(function () {
	if ('ontouchstart' in document.documentElement) {
		$('html').addClass('touch');
	} else {
		$('html').addClass('no-touch');
	}
	
	$.fancybox.defaults.backFocus = false;

	winWidth = $('.app').outerWidth();
	winHeight = $(window).height();
	scrollPos = $(window).scrollTop();

	// Main init
	init();

	//popup('request');

	// Click on burger
	$(document).on('click', '.menu-toggle', function () {
		if (!menuOpened) {
			menuOpen();
		} else {
			menuClose();
		}
	});

	$('body').simpleWaypoint({
		position: 1,
		onDown: function() {
			$('body').addClass('body--scrolled');
			$('.header').addClass('header--scrolled');
		},
		onUp: function() {
			$('body').removeClass('body--scrolled');
			$('.header').removeClass('header--scrolled');
		}
	});

	$(document).on('click','.menu__link--dd',function() {
		$(this).closest('.menu__item')
			.toggleClass('active')
			.find('.menu__sublist').slideToggle(300);
	});



	if (deviceIs.desktop) {
		
	} else {

	}

	$(window).on('resize', function () {
		winHeight = $(window).height();
		winWidth = $('.app').outerWidth();
		scrollPos = $(window).scrollTop();

		scrollbarWidth();
		vhFix();
		units();

		if (menuOpened) {
			menuClose();
		}
	});
	$(window).on('scroll', function () {
		scrollPos = $(window).scrollTop();
	});

	$(window).trigger('resize').trigger('scroll');

	// Scroll to element
	$(document).on('click', 'a[href*="#"]', function (e) {
		e.preventDefault();
		var target = $(this).attr('href');
		if ($(target).length) {
			var targetPos = $(target).offset().top - scrollOffset;
			$('html, body').animate({
				scrollTop: targetPos
			}, 500);
		}
	});
})(jQuery);

$(window).on('load', function () {
	setTimeout(function () {
		$('body').addClass('body--page-loaded');
		pageLoaded = true;
		$(window).trigger('scroll');
	}, 300);
});

/*! Units */
function units() {
	document.documentElement.style.setProperty('--winWidth', winWidth + 'px');

	let inW = $('.inner').first().width();
	document.documentElement.style.setProperty('--inW', inW + 'px');

	if (window.matchMedia('(max-width:800px)').matches) {
		$('body').addClass('body--mob');
	} else {
		$('body').removeClass('body--mob')
	}
}

/*! vh fix */
function vhFix() {
	$('body').append('<div class="vh-fix" style="position:fixed;width:1px;left:-9999px;top:0;bottom:0;pointer-events:none;opacity:0;visibility:hidden;" />');

	var vh = $('.vh-fix').height() * 0.01;
	document.documentElement.style.setProperty('--vh', vh + 'px');

	$('.vh-fix').remove();
}

/*! Intro slider */
function introInit(block) {
	let slider = block.find('.intro__slider'),
		sliderS;

	sliderS = new Swiper(slider.get(0), {
		slidesPerView: 'auto',
		loopedSlides: 99,
		loop: false,
		speed: 500,
		spaceBetween: 32,
		grabCursor: true,
		init: true,
		navigation: {
			nextEl: block.find('.intro-nav__item--next').get(0),
			prevEl: block.find('.intro-nav__item--prev').get(0)
		},
		breakpoints: {
			1: {
				spaceBetween: 14,
			},
			601: {
				spaceBetween: 24,
			},
			1201: {
				spaceBetween: 32,
			}
		}
	});

	block.data('init', true);
}

/*! Reviews slider */
function reviewsInit(block) {
	let slider = block.find('.reviews__slider'),
		sliderS;

	sliderS = new Swiper(slider.get(0), {
		slidesPerView: 2,
		loopedSlides: 99,
		loop: true,
		speed: 500,
		spaceBetween: 30,
		grabCursor: true,
		init: true,
		navigation: {
			nextEl: block.find('.slider-nav__item--next').get(0),
			prevEl: block.find('.slider-nav__item--prev').get(0)
		},
		breakpoints: {
			1: {
				spaceBetween: 20,
				slidesPerView: 1,
			},
			801: {
				spaceBetween: 20,
				slidesPerView: 2,
			},
			1201: {
				spaceBetween: 30,
				slidesPerView: 2,
			}
		}
	});

	block.data('init', true);
}

/*! About slider */
function aboutInit(block) {
	let slider = block.find('.about__slider'),
		sliderS;

	sliderS = new Swiper(slider.get(0), {
		slidesPerView: 1,
		loopedSlides: 99,
		loop: true,
		speed: 500,
		spaceBetween: 30,
		grabCursor: true,
		init: true,
		navigation: {
			nextEl: block.find('.about-nav__item--next').get(0),
			prevEl: block.find('.about-nav__item--prev').get(0)
		},
		autoplay: {
			delay:5000,
			disableOnInteraction: false,
			pauseOnMouseEnter: true
		}
	});

	block.data('init', true);
}

/*! Projects */
function projectsInit(block) {
	let items = block.find('.projects-item'),
		btns = block.find('.projects-tabs__btn');

	projectsInd();

	btns.on('click',function() {
		if (!$(this).hasClass('active')) {
			let cat = $(this).attr('data-cat');

			btns.removeClass('active');
			items.removeClass('active');

			$(this).addClass('active');

			items.each(function() {
				let cats = $(this).attr('data-cat');

				if (cats.includes(cat)) {
					$(this).addClass('active');
				}
			});
		}
		projectsInd();
	});

	function projectsInd() {
		block.find('.projects-item.active').each(function(i) {
			let id = (i+1);

			if (id < 10) {
				id = '0'+id;
			}

			$(this).attr('data-id',id);
		});
	}

	block.data('init', true);
}

/*! Project slider */
function projectInit(block) {
	let slider = block.find('.project__slider'),
		sliderS;

	sliderS = new Swiper(slider.get(0), {
		slidesPerView: 3,
		loopedSlides: 99,
		loop: true,
		speed: 500,
		spaceBetween: 24,
		grabCursor: true,
		init: true,
		navigation: {
			nextEl: block.find('.slider-nav__item--next').get(0),
			prevEl: block.find('.slider-nav__item--prev').get(0)
		},
		breakpoints: {
			1: {
				slidesPerView: 1,
				spaceBetween: 20,
			},
			501: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			801: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1201: {
				slidesPerView: 3,
				spaceBetween: 24,
			}
		}
	});

	block.data('init', true);
}

/*! Init */
function init() {

	// Accordions
	$('.ui-accordion').each(function () {
		if ($(this).data('init') !== true) {
			accordionInit($(this));
		}
	});

	// Collapsable blocks
	$('.ui-collapse').each(function () {
		if ($(this).data('init') !== true) {
			collapseInit($(this));
		}
	});

	// Intro slider
	$('.intro').each(function () {
		if ($(this).data('init') !== true) {
			introInit($(this));
		}
	});

	// Reviews slider
	$('.reviews').each(function () {
		if ($(this).data('init') !== true) {
			reviewsInit($(this));
		}
	});

	// About slider
	$('.about').each(function () {
		if ($(this).data('init') !== true) {
			aboutInit($(this));
		}
	});

	// Projects
	$('.projects').each(function () {
		if ($(this).data('init') !== true) {
			projectsInit($(this));
		}
	});

	// Project slider
	$('.project').each(function () {
		if ($(this).data('init') !== true) {
			projectInit($(this));
		}
	});
}