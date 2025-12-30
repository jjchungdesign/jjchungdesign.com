var fadeIn = new TimelineMax();

const controller = new ScrollMagic.Controller();

//Intro Fading in
fadeIn.set({},{},0.5)
    .from('header, footer', 1, { opacity:0, ease:"sine.out" })
    .from('main', 1, { opacity:0, ease:"sine.out" });

const scene = new ScrollMagic.Scene()

    .addTo(controller);


// Fade out transition
$(".project-list").click(function() {
    $link = $(this).attr("href");
    $("body").fadeOut(500);
    setTimeout(function(){
        window.location.replace($link);
    },500);
    return false;
});

$(".back").click(function() {
    $link = $(this).attr("href");
    $("body").fadeOut(500);
    setTimeout(function(){
        window.location.replace($link);
    },500);
    return false;
});