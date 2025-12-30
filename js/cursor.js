if (window.innerWidth <= 600) {
  // Your mobile code goes here
} else {
  // Your desktop code goes here

  gsap.set(".cursor-text", { xPercent: -50, yPercent: -50 });

  // Circular Text
  const circleType = new CircleType(document.getElementById("rotated")).dir(-1);

  // Hover Selector
  const hoverables = document.querySelectorAll('a, #hoverable');

  const ball = document.querySelector(".cursor-text");
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  const speed = 1;

  const xSet = gsap.quickSetter(ball, "x", "px");
  const ySet = gsap.quickSetter(ball, "y", "px");

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  // Listeners
  hoverables.forEach((hoverable) => {
    hoverable.addEventListener('mouseenter', onMouseHover);
    hoverable.addEventListener('mouseleave', onMouseHoverOut);
  });

  gsap.ticker.add(() => {
    const dt = 1 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });

  // Hover animations
  function onMouseHover() {
    gsap.to(ball, { scale: 1.5, duration: 0.2 });
  }

  function onMouseHoverOut() {
    gsap.to(ball, { scale: 1, duration: 0.2 });
  }

  // Spin Cursor
  gsap.to('.cursor-text', {
    rotation: 360,
    duration: 15,
    ease: 'none',
    repeat: -1
  });
}
