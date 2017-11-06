$(".navbar.navbar-custom.navbar-inverse.navbar-static-top ul li a[href^='#']").on('click', function(e) {

   // prevent default anchor click behavior
   e.preventDefault();

   // store hash
   var hash = this.hash;

   // animate
   $('html, body').animate({
       scrollTop: $(this.hash).offset().top -50
     }, 800, function(){

       // when done, add hash to url
       // (default click behaviour)
       window.location.hash = hash;
     });

});
