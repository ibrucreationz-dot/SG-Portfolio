// 1. Always register the plugin first (Best Practice)
gsap.registerPlugin(ScrollTrigger);

// --- Home Section Animation ---
// Smooth zoom and drop with a modern bounce (back.out)
gsap.from("#home h1", {
  duration: 1.5,
  y: -50,
  opacity: 0,
  scale: 0.8,
  ease: "back.out(1.5)" 
});

// --- About Section Animation ---
// Using a Timeline to sequence the H2 and P tags smoothly
const aboutTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#about",
    start: "top 80%", // Starts when the top of #about hits 80% of the screen height
    toggleActions: "play none none reverse" // Reverses the animation when scrolling back up
  }
});

aboutTl.from("#about h2", {
  duration: 1,
  x: -100,
  opacity: 0,
  rotationX: 45, // Adds a slight 3D flip effect to match the new CSS
  ease: "power3.out"
})
.from("#about p", {
  duration: 1,
  x: 100,
  opacity: 0,
  ease: "power3.out"
}, "-=0.6"); // Starts this animation slightly before the h2 finishes

// --- Projects Section Animation ---
// 3D pop-up reveal for the glassmorphism cards
gsap.from(".card", {
  scrollTrigger: {
    trigger: "#projects",
    start: "top 75%",
    toggleActions: "play none none reverse"
  },
  duration: 1,
  y: 80,
  opacity: 0,
  rotationY: 15, // Gives the cards a 3D twist as they appear
  scale: 0.9,
  stagger: 0.2, // Pops them in one by one beautifully
  ease: "back.out(1.7)"
});

// --- Contact Section Animation ---
// Fluid, elastic zoom-in effect
gsap.from("#contact h2", {
  scrollTrigger: {
    trigger: "#contact",
    start: "top 85%",
    toggleActions: "play none none reverse"
  },
  duration: 1.5,
  scale: 0.3,
  y: 50,
  opacity: 0,
  ease: "elastic.out(1, 0.5)" // Creates a very satisfying, jiggly pop-in
});