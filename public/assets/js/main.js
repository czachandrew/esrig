(function (window) {

  'use strict';

  $.exists = function (selector) {
    return ($(selector).length > 0);
  }

  // For Mobile Menu
  $(window).on('resize', onsize, function(e) {
    e.stopPropagation();
    onsize();
  });

  // Page Load
  setTimeout(function () {
       $('body').css('opacity', '1');
  }, 300);

  // All Funtions
  DisableHoverScroll();
  MobileMenu();
  StickyHeader();
  StickyElement();
  Parallax();
  CustomersList();
  MagnificPopup();
  BackToTop();
  initMap();
  Testimonial();
  Subscribe();    

})(window);

  /*------------------
  Disable Hover When Scroll
  -------------------*/
    function DisableHoverScroll() {
      var body = document.body,timer;
      window.addEventListener('scroll', function() {
        clearTimeout(timer);
        if(!body.classList.contains('disable-hover')) {
          body.classList.add('disable-hover')
        }
        timer = setTimeout(function(){
          body.classList.remove('disable-hover')
        },80);
      }, false);
    }
  /*------------------
  Mobile menu
  -------------------*/
    function MobileMenu() {
      var submenu = $('.sub-menu').parent('li');
      $('.nav-trigger').on('click', function(){
        $(this).parent().toggleClass('nav-open');
        $('.menu').toggleClass('menu-open');
        $('body').toggleClass('scroll-off');
        $('.menu').find('.sub-menu').parent('li').toggleClass('dropdown');
      });
      $(submenu).on('click', function(){
        var w_width = $(window).width();
        if(w_width <= 800) {
          $(submenu).not($(this)).find('.sub-menu').slideUp(300);
          $(this).find('.sub-menu').slideToggle(300);
        }
      });
    }
    var onsize = function() {
      var w_width = $(window).width();
      if(w_width >= 800) {
        $('.sub-menu').css({'display' : 'block'});
        $('body').removeClass('scroll-off');
        $('.nav-trigger').parent().removeClass('nav-open');
        $('.menu').removeClass('menu-open');
        $('.dropdown').next('ul').slideUp();
      } else {
        $('.sub-menu').css({'display' : 'none'});
      }

    };
  /*------------------
  Sticky header
  -------------------*/
    function StickyHeader() {
      if ($.exists('.auto-hide-header')) {

        $(window).scroll(function() {    
          var scroll = $(window).scrollTop();
          if (scroll <= 250) {
              $(".auto-hide-header").addClass("navbar-transparent");
          }
          else{
              $(".auto-hide-header").removeClass("navbar-transparent");
          }
        });
        var mainHeader = $('.auto-hide-header'),
        belowNavHeroContent = $('.sub-nav-hero'),
        headerHeight = mainHeader.height();
        var scrolling = false,
        previousTop = 0,
        currentTop = 0,
        scrollDelta = 10,
        scrollOffset = 150;
        $(window).on('scroll', function(){
        if( !scrolling ) {
          scrolling = true;
          (!window.requestAnimationFrame)
          ? setTimeout(autoHideHeader, 250)
          : requestAnimationFrame(autoHideHeader);
        }
        });
        $(window).on('resize', function(){
          headerHeight = mainHeader.height();
        });
        function autoHideHeader() {
          var currentTop = $(window).scrollTop();
          ( belowNavHeroContent.length > 0 ) 
          ? checkStickyNavigation(currentTop) : checkSimpleNavigation(currentTop);
          previousTop = currentTop;
          scrolling = false;
        }
        function checkSimpleNavigation(currentTop) {
        if (previousTop - currentTop > scrollDelta) {
          mainHeader.removeClass('is-hidden');
        } else if( currentTop - previousTop > scrollDelta && currentTop > scrollOffset) {
          mainHeader.addClass('is-hidden');
        }
        }
      }
    }
  /*------------------
  Sticky element
  -------------------*/
    function StickyElement() {
      if ($.exists('#sticky')) {
        $(document).on( 'scroll', function(){
          $('#sticky').stick_in_parent({offset_top: 100, parent: '.portfolio-inner'});
        });   
      }
    }
  /*------------------
  Parallax
  -------------------*/
    function Parallax() {
      $('.parallax-slider').jarallax({
         speed: 0.4,
         noIos: false,
         onScroll: function(calculations) {
          var transform = calculations.afterTop * 0.5,
              transformsvg = 300 - (calculations.afterTop * 0.5),
              transformsvg_pages = 300 - (calculations.afterTop * 0.7),
              opacity = Math.min(1, calculations.visiblePercent.toFixed(2));

          $('.ms-hero-copy').css({
              '-webkit-transform' : 'translate3d(0, '+ transform +'px, 0)',
              '-moz-transform'    : 'translate3d(0, '+ transform +'px, 0)',
              '-ms-transform'     : 'translate3d(0, '+ transform +'px, 0)',
              '-o-transform'      : 'translate3d(0, '+ transform +'px, 0)',
              'transform'         : 'translate3d(0, '+ transform +'px, 0)',
              'opacity'           : opacity
          });

          $('.ellipse-border').height(transformsvg);
          $('.page-heading .ellipse-border').height(transformsvg_pages);
        }
      });
    }
  /*------------------
  Testimonial
  -------------------*/
    function Testimonial() {
      $('.testimonial-slider').slick({
        slidesToShow: 1,
        autoplaySpeed: 6000,
        autoplay: true,
        dots: false,
        arrows: false,
      });

      $('.controls-navigate .prev').on('click', function(){
        $('.testimonial-slider').slick('slickPrev');
      });

      $('.controls-navigate .next').on('click', function(){
        $('.testimonial-slider').slick('slickNext');
      });
    }
  /*------------------
  Customers List
  -------------------*/
    function CustomersList() {
      $('.customers-list').slick({
        slidesToShow: 5,
        slidesPerRow: 1,
        autoplay: true,
        arrows: false,
        infinite: true,
        slidesToScroll: 1,
         responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
            }

        }]
      });
    }
  /*------------------
  MagnificPopup
  -------------------*/
    function MagnificPopup() {
      $('.grid-item').magnificPopup({
        delegate: '.image-link', // the selector for gallery item
          type: 'image',
          gallery: {
            enabled:true
          },
          callbacks: {
            open: function() {
              $('body').css('padding-right', 0);
            }
        }
      });
    }
  /*------------------
  Back To Top
  -------------------*/
    function BackToTop() {
      var offset = 300,
          offset_opacity = 1200,
          scroll_top_duration = 1000,
          $back_to_top = $('.back-top');
      $(window).scroll(function() {
          ($(this).scrollTop() > offset) ? $back_to_top.addClass('back-top-is-visible'): $back_to_top.removeClass('back-top-is-visible back-top-fade-out');
          if ($(this).scrollTop() > offset_opacity) {
              $back_to_top.addClass('back-top-fade-out');
          }
      });
      $back_to_top.on('click', function(event) {
          event.preventDefault();
          $('body,html').animate({
              scrollTop: 0,
          }, scroll_top_duration);
      });
    }
  /*------------------
  Google map
  -------------------*/
      function initMap() {
        if ($.exists('#map')) {
          $('#map').gmap3({
              address: "105 Townline Road, Vernon Hills, IL 60061",
              zoom: 6,
              scrollwheel: false,
              mapTypeId : google.maps.MapTypeId.ROADMAP,
              styles: [{
                featureType: "",
                elementType: "",
                stylers: [{
                    saturation: -80
                },{
                    lightness: 30
                },{
                    hue: "#4E4691"
                },{
                    visibility: "simplified"
                }]
            }],

            }).marker(function (map) {
              return {
                position: [50.8620722, 4.352047],
                icon: 'assets/images/ic_location.svg',
              };
            });
        }
      }
  /*------------------
  Subscrive form
  -------------------*/
    function Subscribe() {
      if ($.exists('#ajaxChimp')) {
          $('#ajaxChimp').find('form').ajaxChimp({
            callback: mailchimpCallback
          });
          function mailchimpCallback(resp) {
            if (resp.result === 'error') {
              $('.subscribe-content .form-group input').addClass('error');
            function BorderCallback() {
                $('.subscribe-content .form-group input').removeClass('error');
              }
              setTimeout(BorderCallback, 300)
            }
            if (resp.result === 'success') {
              $('#mc-embedded-subscribe').val('subscribed');
            }
          }
        }
      }
  /*------------------
  Validate form
  -------------------*/
    if ($.exists('#contact-form')) {
        $('.form-control').focus(function() {
          $(this).prev('.control-label').addClass('active');
        });
        $('.form-control').focusout(function() {
          $(this).prev('.control-label').removeClass('active');
        });
        $("#validForm").validate({
            ignore: ":hidden",
            rules:{
                name:{
                    required: true,
                    minlength: 2,
                    maxlength: 65,
                },
                    email:{
                    required: true,
                    email: true,
                },
                    message:{
                    required: true,
                    minlength: 16,
                },
            },
            messages:{
                name:{
                    required: "<span>Please enter your name</span>",
                    minlength: "<span>Your name must consist of at least 2 characters</span>",
                    maxlength: "<span>The maximum number of characters - 16</span>",
                },
                email:{
                    required: "<span>Please enter your email</span>",
                    email: "<span>Please enter a valid email address.</span>",
                },
                message:{
                    required: "<span>Please write me message</span>",
                    minlength: "<span>Your message must consist of at least 16 characters</span>",
                    maxlength: "<span>The maximum number of characters - 100 </span>",
                },
            },
            submitHandler: function (form) {
            $.ajax({
                type: "POST",
                url: "/",
                data: $(form).serialize(),
                beforeSend: function() {
                    $('.submit .btn').addClass('sanding').attr("disabled", true);
                    $('.submit .btn').val('SENDING...');
                },
                success: function (data) {
                  //console.log(data);
                    if (data == "Email sent!");
                    $('input, textarea').val('');
                    $('.submit .btn').val('EMAIL SENT!');
                     $('.form-group').blur(); 
                    setTimeout(function(){
                        $('.submit .btn').val('Contact Us');
                        $('.submit .btn').removeClass('sanding').attr("disabled", false);
                    }, 1400);
                }
            });
            return false;
            }
        });
    }