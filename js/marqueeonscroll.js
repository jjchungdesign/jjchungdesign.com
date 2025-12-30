const init = () => {
  // Select all the section wrappers
  const marquees = document.querySelectorAll('[wb-data="sectiontitle"]');
  
  // Iterate through each marquee
  marquees.forEach(marquee => {
    const marqueeContent = marquee.querySelector('.sectiontitle-container');
    if (!marqueeContent) return;

    // Clone the marquee content for continuous scrolling
    const marqueeContentClone = marqueeContent.cloneNode(true);
    marquee.append(marqueeContentClone);

    let tween;

    const playMarquee = () => {
      let progress = tween ? tween.progress() : 0;
      tween && tween.progress(0).kill();

      // Get the width of the content and gap
      const width = marqueeContent.offsetWidth; // Get the width directly
      const gap = parseInt(getComputedStyle(marqueeContent).getPropertyValue('column-gap'), 10);
      const distanceToTranslate = -(gap + width); // Calculate the distance to move

      // Speed control (set the duration here)
      const speed = 10; // Adjust this value to control the speed (smaller = faster)

      // Set up GSAP timeline with ScrollTrigger
      tween = gsap.timeline({
        scrollTrigger: {
          trigger: marquee, // Use the current marquee as the trigger
          start: "top bottom", // Trigger when the section is in view
          scrub: 1, // Smoothly scrubs the animation
          ease: "none",
          // markers: true, // Uncomment for debugging
        },
      });

      // Animate the marquee's children (original and cloned content)
      tween.to(marquee.querySelectorAll('.sectiontitle-container'), { x: distanceToTranslate, duration: speed });

      tween.progress(progress);
    };

    playMarquee();

    // Refresh the animation when ScrollTrigger is initialized
    ScrollTrigger.addEventListener("refreshInit", playMarquee);
  });
};

document.addEventListener("DOMContentLoaded", init);
