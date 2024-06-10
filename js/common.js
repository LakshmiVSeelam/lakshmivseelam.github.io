// Function to handle scroll events
function onScroll() {
    // Get the scroll position
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    console.log('top', scrollTop)
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
    $('#navbar-scrollspy').hide()
    onScroll()
    $('body').removeClass('overflow-hidden')
    $('#loader').hide();
})

// Attach the onScroll function to the window's scroll event
window.addEventListener('scroll', onScroll);