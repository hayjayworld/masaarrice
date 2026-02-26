/* ===== TYPING ANIMATION ===== */

const text = "MASAAR RICE";
let i = 0;
function typeWriter(){
  if(i < text.length){
    document.getElementById("typing").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, 120);
  }
}
typeWriter();

/* ===== PRELOADER EXIT ===== */

window.addEventListener("load", () => {
  setTimeout(()=>{
    document.getElementById("preloader").classList.add("fade-out");
  }, 3500);
});

/* ===== SCROLL REVEAL ===== */

const reveals = document.querySelectorAll(".reveal");
const heroContent = document.querySelector(".hero-content");
const heroImage = document.querySelector(".hero-image");
const testimonials = document.querySelectorAll(".testimonial");

function revealOnScroll(){
  reveals.forEach(el=>{
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){
      el.classList.add("active");
    }
  });

  testimonials.forEach((el,index)=>{
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    if(elementTop < windowHeight - 100){
      setTimeout(()=> el.classList.add("active"), index*200);
    }
  });
}

window.addEventListener("scroll", revealOnScroll);

setTimeout(()=>{
  heroContent.classList.add("active");
  heroImage.classList.add("active");
}, 3800);

// ----- INTERSECTION OBSERVER (for section reveal + active menu) -----
      const sections = document.querySelectorAll('section');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            const id = entry.target.getAttribute('id');
            // Update both desktop and mobile menu items
            document.querySelectorAll('.nav-item').forEach(item => {
              item.classList.remove('active');
              if (item.getAttribute('href') === '#' + id) {
                item.classList.add('active');
              }
            });
          }
        });
      }, { threshold: 0.2 });
      sections.forEach(section => observer.observe(section));

 // ----- NAVBAR SCROLL EFFECT -----
      const nav = document.getElementById('navbar');
      window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 20);
        if (window.scrollY < 200) {
          document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === '#home') item.classList.add('active');
          });
        }
      });

      // ----- HAMBURGER MENU TOGGLE (professional mobile UX) -----
      const hamburger = document.getElementById('hamburgerBtn');
      const mobileMenu = document.getElementById('mobileMenu');
      const overlay = document.getElementById('overlay');

      function openMenu() {
        hamburger.classList.add('active');
        mobileMenu.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent background scroll
      }
      function closeMenu() {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }

      hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        if (mobileMenu.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });

      overlay.addEventListener('click', closeMenu);

      // Close menu when a nav link is clicked (mobile)
      document.querySelectorAll('.mobile-menu .nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetEl = document.getElementById(targetId);
          if (targetEl) {
            targetEl.scrollIntoView({ behavior: 'smooth' });
            closeMenu();
          }
        });
      });

      // Also close on escape key
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
          closeMenu();
        }
      });

      // Handle desktop nav clicks (smooth scroll)
      document.querySelectorAll('.nav-links .nav-item').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        });
      });
