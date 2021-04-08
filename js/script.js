/* ==================================
           Preloader (loading.io)
======================================*/
$(window).on('load', function () { //make sure that whole site is loaded
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
});
/* ==================================
           Team
======================================*/
$(function(){
    $("#team-members").owlCarousel({
        items: 2,
        autoplay: true,
        smartSpeed: 300,
        loop: true,
        autoplayHoverPause: true,
        nav: true,
        dots: false,
        navText: ['<i class="fa fa-angle-left"></i>' , '<i class="fa fa-angle-right"></i>']
    });
  });