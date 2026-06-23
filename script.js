document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SMOOTH SCROLL FOR NAVBAR ---
    document.querySelectorAll('.navbar a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
        });
    });

    // --- 2. HAMBURGER MENU TOGGLE ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");

    hamburger.addEventListener("click", () => {
      navLinks.classList.toggle("active");   // menu slide in/out
      hamburger.classList.toggle("open");    // icon ☰ → ✖ animation
    });

    // --- 2B. AUTO-CLOSE MENU WHEN LINK CLICKED ---
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburger.classList.remove("open");
      });
    });

    // --- 3. PUZZLE HOVER EFFECT & 3D TILT ---
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const glowColor = card.getAttribute('data-color');
        if (glowColor) {
            card.style.setProperty('--glow-color', glowColor);
        }

        const puzzleBox = card.querySelector('.puzzle-box');
        const imageUrl = card.getAttribute('data-image');
        const pieces = [];

        for (let i = 0; i < 9; i++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            piece.style.backgroundImage = `url(${imageUrl})`;
            const row = Math.floor(i / 3); 
            const col = i % 3;             
            piece.style.backgroundPosition = `${col * 50}% ${row * 50}%`;
            puzzleBox.appendChild(piece);
            
            pieces.push({
                element: piece,
                scatterX: (Math.random() - 0.5) * 50, 
                scatterY: (Math.random() - 0.5) * 50,
                scatterRot: (Math.random() - 0.5) * 20 
            });
        }

        card.addEventListener('mouseenter', () => {
            pieces.forEach(p => {
                p.element.style.transform = `translate(${p.scatterX}px, ${p.scatterY}px) rotate(${p.scatterRot}deg) scale(0.85)`;
                p.element.style.borderRadius = "8px"; 
                p.element.style.boxShadow = "0px 10px 20px rgba(0,0,0,0.5)"; 
            });
        });

        card.addEventListener('mouseleave', () => {
            pieces.forEach(p => {
                p.element.style.transform = `translate(0px, 0px) rotate(0deg) scale(1)`;
                p.element.style.borderRadius = "0px";
                p.element.style.boxShadow = "0px 0px 0px rgba(0,0,0,0)";
            });
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)`;
        });

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
    });

    // --- 4. FORM SUBMISSION ANIMATION ---
    const contactForm = document.querySelector('.contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.textContent;
            btn.textContent = "Message Sent! ✓";
            btn.style.background = "linear-gradient(45deg, #00b09b, #96c93d)";
            btn.style.color = "#ffffff";
            contactForm.reset();
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = ""; 
                btn.style.color = "";
            }, 3000);
        });
    }

    // --- 5. SCROLL ANIMATIONS (GSAP) ---
    gsap.registerPlugin(ScrollTrigger);

    // Navbar reveal
    gsap.from(".navbar", { y: -100, duration: 1, ease: "power4.out" });

    // Other sections
    gsap.from("#about h2", { scrollTrigger: { trigger: "#about", start: "top 80%" }, y: 50, opacity: 0, duration: 1 });
    gsap.from(".card", { scrollTrigger: { trigger: "#projects", start: "top 80%" }, y: 100, opacity: 0, duration: 1, stagger: 0.2 });
    gsap.from(".contact-wrapper > div, .contact-wrapper > form", { scrollTrigger: { trigger: "#contact", start: "top 80%" }, y: 50, opacity: 0, duration: 1, stagger: 0.3 });
});
