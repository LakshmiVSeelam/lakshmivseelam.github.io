function isMobile() {
    return window.innerWidth <= 768;
}
// Function to handle scroll events
function onScroll() {
    // Get the scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    if(scrollTop > 0){
        $('.logo').removeClass('home-styling')
        $('.logo-side-bar').removeClass('home-spacing')
        $('#navbar-scrollspy').show()
    } else {
        $('.logo').addClass('home-styling')
        $('.logo-side-bar').addClass('home-spacing')
        $('#navbar-scrollspy').hide()
    }
}



$(document).ready(function(){
    $('body').scrollspy({ target: '#navbar-scrollspy' });
    $('.mobile-menu-bars').on('click', function () {
        $('#navbarNav').toggleClass('show');
    });
    if (!isMobile()) {
        
        onScroll()
        $('#navbar-scrollspy').hide()
        $('body').removeClass('overflow-hidden')
        
        // Attach the onScroll function to the window's scroll event
        window.addEventListener('scroll', onScroll);
    }
    $('#loader').hide();
})





