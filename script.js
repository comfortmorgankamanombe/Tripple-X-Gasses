// ========== MOBILE MENU TOGGLE ==========
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const mainNav = document.querySelector('.main-nav');
const dropdowns = document.querySelectorAll('.dropdown');

menuToggle.addEventListener('click', () => {
  mainNav.classList.add('active');
  document.body.style.overflow = 'hidden';
});

closeMenu.addEventListener('click', () => {
  mainNav.classList.remove('active');
  document.body.style.overflow = '';
});

// Close menu when clicking on a link
document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('active');
    document.body.style.overflow = '';
  });
});

// Mobile dropdown functionality
dropdowns.forEach(dropdown => {
  const link = dropdown.querySelector('a');
  
  link.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
      e.preventDefault();
      const menu = dropdown.querySelector('.dropdown-menu');
      menu.classList.toggle('show');
    }
  });
});

// ========== HERO SLIDER ==========
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slide-dots');
let currentSlide = 0;

// Create dots for each slide
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

// Auto slide change
let slideInterval = setInterval(nextSlide, 5000);

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  
  currentSlide = n;
  
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
  
  // Reset the auto slide interval
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
}

// Navigation controls
document.querySelector('.next-slide').addEventListener('click', nextSlide);
document.querySelector('.prev-slide').addEventListener('click', prevSlide);

// Pause on hover
const heroSlider = document.querySelector('.hero-slider');
heroSlider.addEventListener('mouseenter', () => clearInterval(slideInterval));
heroSlider.addEventListener('mouseleave', () => {
  clearInterval(slideInterval);
  slideInterval = setInterval(nextSlide, 5000);
});

// ========== STATS COUNTER ==========
const statNumbers = document.querySelectorAll('.stat-number');
const statsSection = document.querySelector('.stats-banner');
let statsAnimated = false;

function animateStats() {
  if (statsAnimated) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(stat => {
          const target = +stat.getAttribute('data-count');
          const duration = 2000;
          const start = 0;
          const increment = target / (duration / 16);
          
          let current = start;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              clearInterval(timer);
              current = target;
            }
            stat.textContent = Math.floor(current);
          }, 16);
        });
        
        statsAnimated = true;
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  observer.observe(statsSection);
}

// Initialize stats animation when page loads
window.addEventListener('load', animateStats);

// ========== TESTIMONIALS SLIDER ==========
const testimonials = document.querySelectorAll('.testimonial');
let currentTestimonial = 0;

function showTestimonial(n) {
  testimonials.forEach(testimonial => testimonial.classList.remove('active'));
  currentTestimonial = (n + testimonials.length) % testimonials.length;
  testimonials[currentTestimonial].classList.add('active');
}

// Auto testimonial change
let testimonialInterval = setInterval(() => {
  showTestimonial(currentTestimonial + 1);
}, 6000);

// ========== PORTFOLIO FILTER ==========
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    
    // Filter items
    const filter = button.getAttribute('data-filter');
    
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.classList.contains(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ========== CHATBOT FUNCTIONALITY ==========
const chatbotToggle = document.querySelector('.chatbot-toggle');
const closeChatbot = document.querySelector('.close-chatbot');
const chatbotContainer = document.querySelector('.chatbot-container');
const sendButton = document.getElementById('sendMessage');
const chatbotInput = document.getElementById('chatbotInput');
const quickOptions = document.querySelectorAll('.quick-option');

// Toggle chatbot
chatbotToggle.addEventListener('click', () => {
  chatbotContainer.classList.toggle('active');
});

closeChatbot.addEventListener('click', () => {
  chatbotContainer.classList.remove('active');
});

// Quick options
quickOptions.forEach(option => {
  option.addEventListener('click', () => {
    const optionType = option.getAttribute('data-option');
    let response = '';
    
    switch(optionType) {
      case 'pricing':
        response = "Our pricing varies based on the service. For installations, we charge between $50-$200 depending on complexity. Repairs typically range from $30-$100. Would you like a detailed quote?";
        break;
      case 'appointment':
        response = "I can help you book an appointment. Please provide your preferred date and time, and I'll check availability. Our working hours are Monday-Friday 8AM-5PM.";
        break;
      case 'emergency':
        response = "For emergencies, please call our 24/7 emergency line immediately at +263 716 118 120. Our team will respond within 30 minutes.";
        break;
      case 'human':
        response = "I'll connect you with a customer service representative. Please hold for a moment... (Note: This is a demo. In a real implementation, this would trigger a live chat request.)";
        break;
    }
    
    addBotMessage(response);
  });
});

// Send message
function sendMessage() {
  const message = chatbotInput.value.trim();
  if (message) {
    addUserMessage(message);
    chatbotInput.value = '';
    
    // Simple bot response (in a real app, this would connect to a backend)
    setTimeout(() => {
      const responses = [
        "I understand you're asking about: " + message + ". Can you provide more details?",
        "Thank you for your message. Our team will get back to you shortly.",
        "I can help with service inquiries, pricing, and appointments. What specifically do you need?",
        "For immediate assistance, please call our support line at +263 716 118 120."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addBotMessage(randomResponse);
    }, 1000);
  }
}

sendButton.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});

function addUserMessage(text) {
  const messagesContainer = document.querySelector('.chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', 'user-message');
  
  messageDiv.innerHTML = `
    <div class="message-content">${text}</div>
    <div class="message-time">${getCurrentTime()}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addBotMessage(text) {
  const messagesContainer = document.querySelector('.chatbot-messages');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', 'bot-message');
  
  messageDiv.innerHTML = `
    <div class="message-content">${text}</div>
    <div class="message-time">${getCurrentTime()}</div>
  `;
  
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getCurrentTime() {
  const now = new Date();
  return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ========== FORM VALIDATION ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const service = document.getElementById('service').value;
    const message = document.getElementById('message').value.trim();
    
    if (!name || !email || !phone || !service || !message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // In a real implementation, you would send this data to your server
    alert('Thank you for your message! We will contact you shortly.');
    contactForm.reset();
  });
}

// ========== FLOATING BUTTONS ==========
const floatingButtons = document.querySelector('.floating-buttons');
let buttonsVisible = false;

chatbotToggle.addEventListener('click', () => {
  if (!buttonsVisible) {
    floatingButtons.style.transform = 'translateY(0)';
    floatingButtons.style.opacity = '1';
    buttonsVisible = true;
  } else {
    floatingButtons.style.transform = 'translateY(80px)';
    floatingButtons.style.opacity = '0';
    buttonsVisible = false;
  }
});

// Hide buttons when clicking outside
document.addEventListener('click', (e) => {
  if (!chatbotToggle.contains(e.target) && !chatbotContainer.contains(e.target)) {
    floatingButtons.style.transform = 'translateY(80px)';
    floatingButtons.style.opacity = '0';
    buttonsVisible = false;
  }
});

// ========== SCROLL REVEAL ANIMATIONS ==========
function animateOnScroll() {
  const elements = document.querySelectorAll('.service-card, .feature-card, .portfolio-item, .team-member, .advantage-card');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;
    
    if (elementPosition < screenPosition) {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }
  });
}

// Set initial state for animated elements
document.querySelectorAll('.service-card, .feature-card, .portfolio-item, .team-member, .advantage-card').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// ========== VIDEO HERO ==========
const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  // Ensure video plays on mobile
  heroVideo.muted = true;
  heroVideo.play().catch(e => console.log('Video autoplay prevented:', e));
}

// ========== SMOOTH SCROLLING ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// ========== LAZY LOADING IMAGES ==========
document.addEventListener('DOMContentLoaded', function() {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute('src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });
  
  lazyImages.forEach(img => imageObserver.observe(img));
});

// ========== CURRENT YEAR IN FOOTER ==========
document.querySelector('.footer-bottom p').innerHTML = `&copy; ${new Date().getFullYear()} Trippl Gases. All Rights Reserved.`;