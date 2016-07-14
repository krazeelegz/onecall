jQuery(function($) {"use strict";

	var animEndEventNames = {
		'WebkitAnimation' : 'webkitAnimationEnd',
		'OAnimation' : 'oAnimationEnd',
		'msAnimation' : 'MSAnimationEnd',
		'animation' : 'animationend'
	}, animEndEventName = animEndEventNames[ Modernizr.prefixed('animation')], isMobile = navigator.userAgent.match(/(iPhone|iPod|Android|BlackBerry|iPad|IEMobile|Opera Mini)/)

	var Site = {

		initialized : false,
		styles : [{
			"featureType" : "water",
			"elementType" : "geometry",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 17
			}]
		}, {
			"featureType" : "landscape",
			"elementType" : "geometry",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 20
			}]
		}, {
			"featureType" : "road.highway",
			"elementType" : "geometry.fill",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 17
			}]
		}, {
			"featureType" : "road.highway",
			"elementType" : "geometry.stroke",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 29
			}, {
				"weight" : 0.2
			}]
		}, {
			"featureType" : "road.arterial",
			"elementType" : "geometry",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 18
			}]
		}, {
			"featureType" : "road.local",
			"elementType" : "geometry",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 16
			}]
		}, {
			"featureType" : "poi",
			"elementType" : "geometry",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 21
			}]
		}, {
			"elementType" : "labels.text.stroke",
			"stylers" : [{
				"visibility" : "on"
			}, {
				"color" : "#000000"
			}, {
				"lightness" : 16
			}]
		}, {
			"elementType" : "labels.text.fill",
			"stylers" : [{
				"saturation" : 36
			}, {
				"color" : "#bf8e51"
			}, {
				"lightness" : 40
			}]
		}, {
			"elementType" : "labels.icon",
			"stylers" : [{
				"visibility" : "off"
			}]
		}, {
			"featureType" : "transit",
			"elementType" : "geometry",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 19
			}]
		}, {
			"featureType" : "administrative",
			"elementType" : "geometry.fill",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 20
			}]
		}, {
			"featureType" : "administrative",
			"elementType" : "geometry.stroke",
			"stylers" : [{
				"color" : "#000000"
			}, {
				"lightness" : 17
			}, {
				"weight" : 1.2
			}]
		}],
		initialize : function() {

			if (this.initialized)
				return;
			this.initialized = true;

			this.build();
			this.events();
			this.validation();
			this.inputAnimation();
			this.headerStyle();
			if ($('.btn-bordered.animate').length) {
				this.btnAnim();
			}

		},

		build : function() {

			//team carousel
			if ($('#partners-carousel').length) {
				var carousel = $("#partners-carousel");
				carousel.owlCarousel({
					itemsCustom : [[0, 1], [768, 2], [1000, 3], [1170, 4]],
					pagination : true,
					paginationNumbers : false,
					navigation : false,
					rewindNav : false,
					responsiveRefreshRate : 40,
					afterAction : function() {
						$('#partners-carousel').find('.owl-controls span').html('&#9670;')
					}
				});
				
			}

			//banner slider
			if ($('#main-banner').length) {
				var mainBanner = $('#main-banner'), headerHeight = $('#header').height();

				var fullHeight = function() {
					mainBanner.height($(window).height()).css({
						marginTop : 0
					});
					if ($('#banner-slider').hasClass('slider-with-bg')) {
						$('#banner-slider.slider-with-bg').find('.slides>li').each(function() {
							var dataSrc = $(this).attr('data-src')
							$(this).find('.table-cell').height($(window).height())
						})
					}
				}
				var minHeight = function() {
					mainBanner.height($(window).height() - headerHeight).css({
						marginTop : 0
					});
					if ($('#banner-slider').hasClass('slider-with-bg')) {
						$('#banner-slider.slider-with-bg').find('.slides>li').each(function() {
							var dataSrc = $(this).attr('data-src')
							$(this).find('.table-cell').height($(window).height() - headerHeight)
						})
					}
				}
				var topMargin = function() {
					mainBanner.height($(window).height() - headerHeight).css({
						marginTop : headerHeight
					});
					if ($('#banner-slider').hasClass('slider-with-bg')) {
						$('#banner-slider.slider-with-bg').find('.slides>li').each(function() {
							var dataSrc = $(this).attr('data-src')
							$(this).find('.table-cell').height($(window).height() - headerHeight)
						})
					}
				}
				var bannerHeight = function() {
					var navPosition = $('#header').attr('data-position')
					if ($(window).height() > 372 && navPosition == "bottom") {
						minHeight();
					} else if ($(window).height() > 372 && navPosition == "top") {
						topMargin();

					} else {
						fullHeight();
					}
				}
				bannerHeight();
				$(window).resize(function() {
					bannerHeight();
				})

				$('#banner-slider').flexslider({
					animation : "fade",
					controlNav : false,
					init : function() {
						$('.main-banner > .rect-icon-box').click(function() {
							if ($(this).hasClass('next-slide')) {
								$('.main-banner .flex-next ').trigger('click');

							} else if ($(this).hasClass('prev-slide')) {
								$('.main-banner .flex-prev ').trigger('click');
							}
						})
						if ($('#banner-slider').hasClass('slider-with-bg')) {
							$('#banner-slider.slider-with-bg').find('.slides>li').each(function() {
								var dataSrc = $(this).attr('data-src')
								$(this).css({
									backgroundImage : 'url(' + dataSrc + ')'
								})
							})
						}
					}
				});
				
			}

			//circular progressbar
			if ($(".circle-progress").length) {
				$(".circle-progress").circliful();
				$(document).on('click', '.swatches a', function() {
					var color = $(this).attr('data-color-hex')
					
					$('.circle-progress').each(function() {
						$(this).html(' ')

						$(this).circliful({
							foregroundColor : color
						});
					})
				})
			}

			//pricing carousel
			if ($('#pricing-carousel').length) {
				var pricing = $("#pricing-carousel");

				pricing.owlCarousel({
					itemsCustom : [[0, 1], [768, 2], [1000, 3]],
					pagination : false,
					responsiveRefreshRate : 40,
				});

				// Custom Navigation Events
				$("#btn-right").click(function() {
					pricing.trigger('owl.next');
				})
				$("#btn-left").click(function() {
					pricing.trigger('owl.prev');
				})
			}

		},

		events : function() {

			//search form
			var searchForm = function() {
				var $navForm = $('.navbar-form .form-group')
				$('.navbar-form .btn').click(function(e) {
					e.preventDefault()
					if ($(this).hasClass('open')) {
						$(this).removeClass('open')
						$navForm.animate({
							width : '0px'
						}, 500)
					} else {
						$(this).addClass('open')
						$navForm.animate({
							width : '222px'
						}, 500)
					}

				})
			}
			searchForm();

			//Animation functions
			var sideBorder = function() {
				$('.side-border').each(function() {
					if ($(window).scrollTop() > ($(this).offset().top - $(window).height() / 1.15)) {
						$(this).addClass('animate')
					}
				})
			}
			var titleLine = function() {
				$('.title-line').each(function() {
					if ($(window).scrollTop() > ($(this).offset().top - $(window).height() / 1.15)) {
						$(this).addClass('animate')
					}
				})
			}
			var doubleBorder = function() {
				$('.double-border').each(function() {
					if ($(window).scrollTop() > ($(this).offset().top - $(window).height() / 2)) {
						$(this).addClass('animate')
					}
				})
			}
			var animSection = function() {
				$('.anim-section').each(function() {
					if ($(window).scrollTop() > ($(this).offset().top - $(window).height() / 1.15)) {
						$(this).addClass('animate')
					}
				})
				$('.pointed-quote').each(function() {
					if ($(window).scrollTop() > ($(this).offset().top - $(window).height() / 1.15)) {
						$(this).addClass('animate')
					}
				})
			}
			var aboutCreating = function() {
				if ($('.about-creating').length > 0 && $(window).scrollTop() > ($('.about-creating').offset().top - $(window).height() / 1.15)) {
					$('.about-creating-list').slideDown(2000);
				}
			}
			var drawDivider = function() {
				$('.h-line').each(function() {
					if ($(window).scrollTop() > ($(this).offset().top - $(window).height() / 1.15)) {
						$(this).addClass('animate')

						if ($(this).hasClass('top')) {
							$('.team-wrap').addClass('animate')
						} else {
							$('.circle-wrap').addClass('animate')
						}
					}
				})
			}
			var zigZapDivider = function() {
				$('.zig-zag-divider').each(function() {
					if ($(window).scrollTop() > $(this).offset().top - $(window).height() && $(window).scrollTop() <= $(this).offset().top) {
						var left = parseInt((($(this).offset().top - $(window).scrollTop()) * 100) / $(window).height())
						$(this).find('.zig-zag').css({
							'margin-left' : (left - 100) + "%"
						})
					}
				})
			}
			var triangleParallax = function() {
				$('.triangle-shape').each(function() {
					if ($(window).scrollTop() > $(this).offset().top - $(window).height() + 100 && $(window).scrollTop() + 100 <= $(this).offset().top) {
						var top = parseInt((($(this).offset().top - $(window).scrollTop()) * 100) / $(window).height())
						$(this).css({
							'top' : (80 - top) + "%"
						})
					}
				})
			}
			var triLayout = function() {
				$('.l-down').each(function() {
					$('.l-down, .l-down-up').css({
						'border-left-width' : parseInt($('#wrapper').width())
					})
				})
			}
			if ($('.l-down').length) {
				$(window).load(function() {
					triLayout()
				})
				$(window).resize(function() {
					triLayout()
				})

				$(document).on('click', '#layout .layout-column', function() {
					setInterval(function() {
						triLayout()
					}, 400)

				})
			}

			// goto next section
			if ($('.scroll-to').length) {
				$('.scroll-to').click(function(e) {
					e.preventDefault()
					var id = $(this).attr('href');
					scrollTo(id);
				})
			}
			//countdown

			if ($('#countdown').length) {
				var austDay = new Date();
				austDay = new Date(2016, 6, 6);
				$('#countdown').countdown({
					until : austDay
				});
			}

			// goto to sections on navigation link
			$('.navbar-nav >li> a').click(function(e) {
				if ($('#main-banner').length) {
					$('.navbar-nav >li> a').parent('li').removeClass('active')
					$(this).parent('li').addClass('active')
					var id = $(this).attr('href');
					scrollTo(id);
				}
			})
			var scrollTo = function(id) {
				var top = $(id).offset().top
				$('html, body').animate({
					scrollTop : parseInt(top - 30)
				}, 700)
			}
			// navigation link hightlight on scroll

			var navHighlight = function() {
				var i = 0, j = 0, ids = [], offsetId = [], hHeight = $('#header .navbar').outerHeight(), scrollTop = $(window).scrollTop(), $navbarLinks = $('.navbar-nav >li'), navLength = $navbarLinks.length;
				$navbarLinks.each(function() {
					if (!$(this).find('a').attr('data-link')) {
						ids[i] = $(this).find('a').attr('href');
						offsetId[i] = $(ids[i]).offset().top - hHeight
					} else {
						ids[i] = $(this).find('a').attr('data-link');
						offsetId[i] = $(ids[i]).offset().top - hHeight
					}

					i++;
				})
				//nav active
				$navbarLinks.removeClass('active');
				for ( j = 0; j < navLength; j++) {
					if (j < navLength - 1) {
						if (scrollTop >= offsetId[j] && scrollTop < offsetId[j + 1]) {
							$('.navbar-nav >li> a[data-link="' + ids[j] + '"]').parent('li').addClass('active');
							$('.navbar-nav >li> a[href="' + ids[j] + '"]').parent('li').addClass('active');
						}
					} else {
						if (scrollTop >= offsetId[navLength - 1]) {
							$('.navbar-nav >li> a[data-link="' + ids[navLength - 1] + '"]').parent('li').addClass('active');
							$('.navbar-nav >li> a[href="' + ids[navLength - 1] + '"]').parent('li').addClass('active');
						}
					}
				}
			}
			//big ambition bg parallax
			var parallax = function(id, val, oVal) {
				if ($(window).scrollTop() > id.offset().top - $(window).height() && $(window).scrollTop() < id.offset().top) {
					var px = parseInt($(window).scrollTop() - (id.offset().top - $(window).height()))
					px /= val
					px = oVal - px
					id.css({
						'background-position' : 'center ' + px + 'px'
					})
				}
			}
			//Events OnScroll
			if ($('#main-banner').length) {
				navHighlight();
			}
			$(window).scroll(function() {
				if ($('#main-banner').length) {
					navHighlight();
				}
			})
			if (!isMobile) {

				if ($('.anim-section').length) {
					$('.anim-section').removeClass('animate')
					animSection()
				}
				if ($('.title-line').length) {
					$('.title-line').removeClass('animate')
					titleLine()
				}
				if ($('.triangle-shape').length) {
					triangleParallax()
				}
				if ($('.zig-zag-divider').length) {
					zigZapDivider()
				}

				if ($('.about-creating').length) {
					$('.about-creating-list').hide()
					aboutCreating()
				}
				if ($('.double-border').length) {
					$('.double-border').removeClass('animate')
					doubleBorder()
				}

				if ($('.side-border').length) {
					$('.side-border').removeClass('animate')
					sideBorder()
					$(window).load(function() {
						setTimeout(function() {
							sideBorder()
						}, 800)
					})
				}

				if ($('.h-line').length) {
					$('.h-line').removeClass('animate')
					$('.team-wrap').removeClass('animate')
					$('.circle-wrap').removeClass('animate')
					drawDivider()
				}

				if ($('#big-ambition').length) {
					$(window).scroll(function() {
						var $id = $('#big-ambition');
						parallax($id, 2.5, 300)
					})
				}
				if ($('.about-creating').length) {
					$(window).scroll(function() {
						var $id = $('.about-creating');
						parallax($id, 3, 400)
					})
				}

				if ($('.l-down-up').length) {
					$(window).scroll(function() {
						if ($(window).width() >= 768) {
							$('.l-down-up').each(function() {
								var $id = $(this);
								var lineWidth = parseInt($('#wrapper').width()) - 100
								if ($(window).scrollTop() > $id.offset().top - $(window).height() && $(window).scrollTop() < $id.offset().top) {
									var px = parseInt($(window).scrollTop() - ($id.offset().top - $(window).height()))
									px = px * 100 / $(window).height()
									px = lineWidth + px
									// console.log(px)
									$id.css('border-left-width', px)
								} else {
									$id.css('border-left-width', parseInt($('#wrapper').width()))
								}

							})
						}
					})
				}

				$(window).scroll(function() {

					if ($('.anim-section').length) {
						animSection()
					}
					if ($('.triangle-shape').length) {
						triangleParallax()
					}
					if ($('.zig-zag-divider').length) {
						zigZapDivider()
					}
					if ($('.about-creating').length) {
						aboutCreating()
					}
					if ($('.side-border').length) {
						sideBorder()
					}
					if ($('.title-line').length) {
						titleLine()
					}
					if ($('.double-border').length) {
						doubleBorder()
					}
					if ($('.h-line').length) {
						drawDivider()
					}

				})
			}
			// responsive calendar
			if ($(".responsive-calendar").length) {
				$(".responsive-calendar").responsiveCalendar({
					time : '2014-08',
					events : {
						"2014-08-19" : {
							"url" : "#"
						}
					}
				});
			}
			//Form on Focus
			if ($('.form-control').length) {
				$('.form-control').focus(function() {
					$('.form-group').find('label').removeClass('focus')
					$(this).parent('.form-group').find('label').addClass('focus')
				})
				$('.form-control').blur(function() {
					$('.form-group').find('label').removeClass('focus')
				})
			}

			// our partner section animation
			if ($('.partners-logo a').length) {
				$('.partners-logo a').hover(function() {
					$('.partners-logo a').removeClass('right-to-left')
					$(this).removeClass('foldit')
					$(this).addClass('right-to-left');
				}, function() {
					$('.partners-logo a').removeClass('foldit')
					$(this).removeClass('right-to-left')
					$(this).addClass('foldit');
				})
			}

			//accordion sections
			if ($('#accordion').length) {
				$(document).on('click', '.panel-title>a', function(e) {
					$('#accordion').find('.panel-title>a').removeClass('active')
					$(this).addClass('active').on(animEndEventName, function() {
						$(this).removeClass('active')
					})
				})
			}

			//Custom Map
			if ($('#map').length) {
				var map = new GMaps({
					div : '#map',
					lat : 37.748203,
					lng : -122.449690,
					disableDefaultUI : true,
					zoom : 17,
					draggable : false,
					scrollwheel : false
				});
				map.drawOverlay({
					lat : map.getCenter().lat(),
					lng : map.getCenter().lng(),
					content : '<a href="#" class="rect-icon-box bg-theme fa-map-marker"></a>',
					verticalAlign : 'top',
					horizontalAlign : 'center'
				});
				map.setOptions({
					styles : Site.styles
				});
				
			}

			//add more team members
			if ($('#team-members').length) {
				var i = 0, team = [];
				var members = $('#team-members >.col-xs-12.col-sm-6.col-md-3').each(function() {
					team[i] = $(this).html()
					i++;
				})

				$('#add-more').click(function(e) {
					e.preventDefault()
					var i = 0;
					for (var i = 0; i < team.length; i++) {
						$('#team-members').append($('<div />').addClass('col-xs-12 col-sm-6 col-md-3').append(team[i]).hide().fadeIn(500))

					}
				})
			}

			//image in lightbox
			if ($('.ico-zoom').length) {
				$('.ico-zoom').fancybox({
					padding : 0,
					closeClick : true,
					openEffect : 'fade',
					openSpeed : 300,
					helpers : {
						media : {},
						buttons : {},
						title : {
							type : 'inside'
						},
						overlay : {
							css : {
								'background' : 'rgba(0,0,0,0.85)'
							}
						}
					}
				});
			}

		},

		//button animation
		btnAnim : function() {
			var speed = 250, easing = mina.easeinout;
			[].slice.call(document.querySelectorAll('.btn-bordered.animate')).forEach(function(el) {
				var s = Snap(el.querySelector('svg.right')), path = s.select('path'), pathConfig = {
					from : path.attr('d'),
					to : 'M 0 7 L12 7 L24 7 L36 7 L48 7 L60 7 L72 7 L84 7 L96 7'
				};
				var s1 = Snap(el.querySelector('svg.left')), path1 = s1.select('path'), pathConfig1 = {
					from : path1.attr('d'),
					to : 'M 48 7 L36 7 L24 7 L12 7 L0 7 L-12 7 L-24 7 L-36 7 L-48 7'
				};
				el.addEventListener('mouseenter', function() {
					path.animate({
						'path' : pathConfig.to
					}, speed, easing);
				});
				el.addEventListener('mouseleave', function() {
					path.animate({
						'path' : pathConfig.from
					}, speed, easing);
				});
				el.addEventListener('mouseenter', function() {
					path1.animate({
						'path' : pathConfig1.to
					}, speed, easing);
				});
				el.addEventListener('mouseleave', function() {
					path1.animate({
						'path' : pathConfig1.from
					}, speed, easing);
				});

			});
		},

		//form validation
		validateForm : function() {
			$('#submit').click(function() {
				var email = $('#email').val();
				if (email == '') {
					$('#email').parents('.form-group').addClass('error')
					return false;
				}
				if (IsEmail(email) == false) {
					$('#email').parents('.form-group').addClass('error')
					return false;
				}
			});
			function IsEmail(email) {
				var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
				if (!regex.test(email)) {
					return false;
				} else {
					$('#email').parents('.form-group').removeClass('error')
				}
			}

		},

		inputAnimation : function() {
			// Input Animation
			$(".label-text").each(function() {
				var sop = '<span class="ch">';
				var scl = '</span>';
				$(this).html(sop + $(this).html().split("").join(scl + sop) + scl);
				$(".ch:contains(' ')").html("&nbsp;")
			})
			var d;
			//animation time
			$(".form-group input, .form-group textarea").focus(function() {
				// var tm = $(this).outerHeight() / 2.1 * -1.1 + "px";
				var tm = '-30px'
				$(this).prev('.label-text').addClass("focussed").children().stop(true).each(function(i) {
					d = i * 50;
					//delay
					$(this).delay(d).animate({
						top : tm
					}, 200, 'easeOutBack');
				})
			})
			$(".form-group input, .form-group textarea").blur(function() {
				//animate the label down if content of the input is empty
				if ($(this).val() == "") {
					$(this).prev('.label-text').removeClass("focussed").children().stop(true).each(function(i) {
						d = i * 50;
						$(this).delay(d).animate({
							top : 0
						}, 500, 'easeInOutBack');
					})
				}
			})
		},
		validation : function() {
			var bool;

			$('#name,#site,#email,#msg').blur(function() {
				validateForm2(this);
			});

			$('#submit').click(function() {
				var i = 0;
				var x = $('#name').val();
				if (x == null || x == "" || x == "Name") {

					$('#name').closest('.form-group').addClass('error')
					bool = false;

				} else {
					i++;
					$('#name').closest('.form-group').removeClass('error');
					name_val = $('#name').val();

				}

				var x = $('#site').val();
				if (x == null || x == "" || x == "Name") {
					$('#site').closest('.form-group').addClass('error')
					bool = false;

				} else {
					i++;
					$('#site').closest('.form-group').removeClass('error');
					comp_val = $('#site').val();

				}

				var x = $('#email').val();
				var atpos = x.indexOf("@");
				var dotpos = x.lastIndexOf(".");
				if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length || x == 'Email') {
					$('#email').closest('.form-group').addClass('error')
					bool = false;
				} else {

					i++;
					$('#email').closest('.form-group').removeClass('error');
					email_val = $('#email').val();

				}
				var x = $('#msg').val();
				if (x == null || x == "" || x == "Message") {
					$('#msg').closest('.msg-box').addClass('error')
					bool = false;
				} else {
					i++;
					$('#msg').closest('.msg-box').removeClass('error');
					msg_val = $('#msg').val();

				}

				if (i == 4) {

					bool = true;
				}

				if (!bool) {

					return false;
				} else {
					$.post('mail.php', {
						name : name_val,
						email : email_val,
						company : comp_val,
						msg : msg_val,
					}, function(data) {

						if (data == 1) {

							setTimeout(function() {

								$('#name').val('');
								$('#email').val('');
								$('#site').val('');
								$('#msg').val('');
								$('#name,#site,#email,#msg').next().removeClass("focussed");
								$('.ch').css('top', 0)

								$('#success').fadeIn(500);
								$('#success').append('<div role="alert" class="alert alert-success"><strong>Thanks</strong> for using our template. Your message has been sent.</div>')
								setTimeout(function() {
									$('#success').find('div').remove();

								}, 2500)

							}, 500);
						}
					})
					//

				}

			});

			function validateForm2(abc) {

				if ($(abc).val() != "") {
					$(abc).parent().removeClass('error');

				} else {
					$(abc).parent().addClass('error');

				}
				//email
				if ($(abc).attr('id') == 'email') {
					if (($(abc).val() != "" || $(abc).val() != null) && ($(abc).val().match(emailRegex))) {
						$(abc).parent().removeClass('error');

					} else {
						$(abc).parent().addClass('error');
					}
				}

			}

			var name_val = ''
			var email_val = '';

			var msg_val = '';
			var comp_val = '';
			var emailRegex = /^[a-zA-Z0-9._]+[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
			var numericExpression = /^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/;
		},
		headerStyle : function() {
			// Fixed Header JS
			var initScroll = $(window).scrollTop();
			var headerHeight = $('#header').height()
			var navPosition = $('#header').attr('data-position'), sticky = $('#header').attr('data-sticky');

			var fixedNav = function() {

				var $HeaderNav = $('#header').find('.navbar'), currentScroll = $(window).scrollTop()
				function inteligent() {
					if (currentScroll > initScroll) {
						$HeaderNav.removeClass('down')
						$HeaderNav.addClass('up')
						if (currentScroll == $(document).height() - $(window).height()) {
							$HeaderNav.removeClass('up')
							$HeaderNav.addClass('down')
						}
						initScroll = currentScroll
					} else {
						$HeaderNav.removeClass('up')
						$HeaderNav.addClass('down')
						initScroll = currentScroll
					}
				}

				if (navPosition == "top") {
					$HeaderNav.addClass('navbar-fixed-top')
					if (sticky == "yes") {
						inteligent()
					} else {
						$HeaderNav.removeClass('up')
						$HeaderNav.addClass('Down')
					}
				} else {
					if (sticky == "yes") {
						if (currentScroll > $('#header').offset().top + $('#header').height()) {
							$HeaderNav.addClass('navbar-fixed-top')
							$('#header').css("padding-top", headerHeight)
							inteligent()
						} else {
							$HeaderNav.removeClass('navbar-fixed-top up down')
							$('#header').css("padding-top", "0")
						}
					} else {
						if (currentScroll > $('#header').offset().top) {
							$('#header').css("padding-top", headerHeight)
							$HeaderNav.addClass('navbar-fixed-top')
						} else {
							$HeaderNav.removeClass('navbar-fixed-top up down')
							$('#header').css("padding-top", "0")
						}
					}
				}
			}
			fixedNav()
			$(window).scroll(function() {
				fixedNav()
			})
		}
	};

	Site.initialize();

})