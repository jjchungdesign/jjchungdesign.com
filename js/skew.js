// Function to apply skew effect to an element with independent control over X and Y skew
function applySkewEffect(elementId, skewOptions) {
  // Default options for skewing X and Y
  let defaultOptions = {
      xMaxSkew: 80,  // Maximum skew for X-axis (degrees) to make it stronger
      yMaxSkew: 15,  // Maximum skew for Y-axis (degrees)
      xVelocityFactor: 100,  // Sensitivity for X-axis skew
      yVelocityFactor: 500   // Sensitivity for Y-axis skew
  };

  // Merge user-provided options with default options
  let options = Object.assign({}, defaultOptions, skewOptions);

  // Initialize proxies for X and Y skew
  let proxyX = { skew: 0 },
      proxyY = { skew: 0 },
      skewXSetter = gsap.quickSetter(`#${elementId}`, "skewX", "deg"),  // Fast setter for skewX
      skewYSetter = gsap.quickSetter(`#${elementId}`, "skewY", "deg");  // Fast setter for skewY

  // ScrollTrigger for updating skew based on scroll velocity
  ScrollTrigger.create({
      onUpdate: (self) => {
          // Apply skewX if calculated skewX exceeds proxyX value
          if (elementId.includes('skewX')) {
              let skewX = gsap.utils.clamp(-options.xMaxSkew, options.xMaxSkew)(self.getVelocity() / options.xVelocityFactor);
              if (Math.abs(skewX) > Math.abs(proxyX.skew)) {
                  proxyX.skew = skewX;
                  gsap.to(proxyX, {
                      skew: 0,  // Reset skew after effect
                      duration: 0.8,  // Smooth transition
                      ease: "power3",
                      overwrite: true,
                      onUpdate: () => skewXSetter(proxyX.skew)  // Apply skewX to element
                  });
              }
          }

          // Apply skewY if calculated skewY exceeds proxyY value
          if (elementId.includes('skewY')) {
              let skewY = gsap.utils.clamp(-options.yMaxSkew, options.yMaxSkew)(self.getVelocity() / options.yVelocityFactor);
              if (Math.abs(skewY) > Math.abs(proxyY.skew)) {
                  proxyY.skew = skewY;
                  gsap.to(proxyY, {
                      skew: 0,  // Reset skew after effect
                      duration: 0.8,  // Smooth transition
                      ease: "power3",
                      overwrite: true,
                      onUpdate: () => skewYSetter(proxyY.skew)  // Apply skewY to element
                  });
              }
          }
      }
  });

  // Set initial properties for the element
  gsap.set(`#${elementId}`, { transformOrigin: "left center", force3D: true });
}

// Example usage for skewing elements along X and Y axes with different settings

// Skew effect for element with ID "skewXElement"
applySkewEffect('skewXElement', {
  xMaxSkew: 75,  // Dramatic X-axis skew with a max of 75° (stronger)
  xVelocityFactor: 100  // More responsive X-axis skew
});

// Skew effect for element with ID "skewYElement"
applySkewEffect('skewYElement', {
  yMaxSkew: 60,  // Dramatic Y-axis skew with a max of 60°
  yVelocityFactor: 300   // More responsive Y-axis skew
});
