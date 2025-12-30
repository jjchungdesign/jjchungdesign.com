// Ensure GSAP and ScrollTrigger plugin are included
gsap.registerPlugin(ScrollTrigger);

// Create the fade-out effect on scroll with precise control over when it starts and ends
gsap.to(".desc-container", {
// gsap.to(".content-container", {
  opacity: 0, // Fade out to 0 opacity
  scrollTrigger: {
    trigger: ".content-container", // Element to trigger the animation on
    start: "top 0%", // Fade out when the top of the element reaches 80% of the viewport height
    end: "top 35%", // Continue fading out until the top of the element reaches xx% of the viewport height
    scrub: true, // Smoothly animate the change as you scroll
    // markers: true, // Optional: shows the start and end markers for debugging
  },
});
