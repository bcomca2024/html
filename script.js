// Carousel functionality
let carouselIndex = 0;
const carouselImgs = [
  './assets/college2.jpg',
  './assets/college2.jpg',
  './assets/college3.jpg',
  
];

const carouselImgElem = document.getElementById('carousel-img');
const dots = document.querySelectorAll('.dot');

function showCarousel(idx) {
  if (carouselImgElem && dots.length > 0) {
    carouselImgElem.src = carouselImgs[idx];
    dots.forEach((dot, i) => dot.classList.toggle('active', i === idx));
  }
}

function nextCarousel() {
  carouselIndex = (carouselIndex + 1) % carouselImgs.length;
  showCarousel(carouselIndex);
}

// Carousel dot click handlers
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    carouselIndex = i;
    showCarousel(carouselIndex);
  });
});

// Auto-advance carousel
const carouselInterval = setInterval(nextCarousel, 4500);

// Pause carousel on hover
if (carouselImgElem) {
  carouselImgElem.addEventListener('mouseenter', () => {
    clearInterval(carouselInterval);
  });
  
  carouselImgElem.addEventListener('mouseleave', () => {
    setInterval(nextCarousel, 6500);
  });
}

// Vertical marquee notifications
const notifications = [
  "🎓 Admissions for 2025-26 are now open",
  "📅 Exam Timetable has been published",
  "🎉 17th Convocation ceremony announced",
  "💻 National Webinar on AI & Data Science",
  "🏠 Hostel fee payment due date extended",
  "📚 New library books collection added",
  "🔬 Research symposium registration open"
];

const notifList = document.querySelector('.notification-list');
let notifIdx = 0;
let marqueeOffset = 0;

function updateMarquee() {
  if (notifList) {
    const itemHeight = 35; // Height of each notification item
    const containerHeight = 80; // Height of marquee container
    
    // Create seamless scrolling effect
    marqueeOffset -= 0.5;
    
    // Reset when we've scrolled past all items
    if (Math.abs(marqueeOffset) >= notifications.length * itemHeight) {
      marqueeOffset = containerHeight;
    }
    
    // Render notifications with smooth scrolling
    notifList.innerHTML = notifications.map((txt, idx) => {
      const position = (idx * itemHeight) + marqueeOffset;
      const isVisible = position > -itemHeight && position < containerHeight + itemHeight;
      
      return `<li style="transform: translateY(${position}px); opacity: ${isVisible ? 1 : 0};" 
                  class="${idx === Math.floor(Math.abs(marqueeOffset) / itemHeight) % notifications.length ? 'notif-anim' : ''}">${txt}</li>`;
    }).join('');
  }
}

// Smooth marquee animation
setInterval(updateMarquee, 50);

// Tab functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContent = document.getElementById('tab-content');

const tabsContentData = [
  {
    title: 'Departments',
    content: `
      <div class="tabs-table">
        <div>
          <h4><i class="fas fa-book"></i> Faculty of Arts</h4>
          <ul>
            <li>Department of Tamil Literature</li>
            <li>Department of English</li>
            <li>Department of History</li>
            <li>Department of Economics</li>
            
          </ul>
        </div>
        <div>
          <h4><i class="fas fa-atom"></i> Faculty of Science</h4>
          <ul>
            <li>Department of Mathematics</li>
            <li>Department of Physics</li>
            <li>Department of Chemistry</li>
            <li>Department of Computer Science</li>
      
          </ul>
        </div>
        <div>
          <h4><i class="fas fa-chart-line"></i> Faculty of Management</h4>
          <ul>
            <li>Department of Management Studies</li>
            <li>Department of Commerce</li>
        
          </ul>
        </div>
     
    `
  },
  {
    title: 'Colleges',
    content: `
      
    `
  },
  {
    title: 'Directorates',
    content: `
      <div class="tabs-table">
        <div>
          <h4><i class="fas fa-sitemap"></i> Academic Directorates</h4>
          <ul>
            <li>Directorate of Distance Education</li>
            <li>Directorate of Academic Affairs</li>
            <li>Directorate of Research</li>
            <li>Directorate of Students Affairs</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    title: 'Centres',
    content: `
      <div class="tabs-table">
        <div>
          <h4><i class="fas fa-cogs"></i> Research Centres</h4>
          <ul>
            <li>Central Marain Boiology Facility</li>
          
            <li>Centre for Environmental Studies</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    title: 'Facilities',
    content: `
      <div class="tabs-table">
        <div>
          <h4><i class="fas fa-building"></i> Campus Facilities</h4>
          <ul>
            <li>Central Library</li>
            <li>Sports Complex</li>
            <li>Health Centre</li>
            <li>Hostels</li>
            <li>Cafeteria</li>
          </ul>
        </div>
        <div>
          <h4><i class="fas fa-wifi"></i> IT Services</h4>
          <ul>
            <li>Wi-Fi Campus</li>
            <li>Computer Labs</li>
            <li>Digital Classrooms</li>
         
          </ul>
        </div>
      </div>
    `
  }
];

// Tab switching functionality
function switchTab(index) {
  tabBtns.forEach((btn, i) => btn.classList.toggle('active', i === index));
  if (tabContent) {
    tabContent.innerHTML = tabsContentData[index].content;
    
    // Add fade effect
    tabContent.style.opacity = '0';
    setTimeout(() => {
      tabContent.style.opacity = '1';
    }, 100);
  }
}

tabBtns.forEach((btn, idx) => {
  btn.addEventListener('click', () => switchTab(idx));
});

// Initialize first tab
if (tabContent) {
  switchTab(0);
}

// Modal functionality
const modal = document.querySelector('.modal-overlay');
const popupLink = document.querySelector('.popup-link');
const closeModal = document.querySelector('.close-modal');

if (popupLink && modal) {
  popupLink.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scroll
  });
}

if (closeModal && modal) {
  closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scroll
  });
}

// Close modal on background click
if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  });
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.style.display === 'flex') {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe sections for scroll animations
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Add scroll-to-top functionality
const scrollToTop = document.createElement('button');
scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTop.className = 'scroll-to-top';
scrollToTop.style.cssText = `
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #1567c3;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 999;
`;

document.body.appendChild(scrollToTop);

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 300) {
    scrollToTop.style.opacity = '1';
  } else {
    scrollToTop.style.opacity = '0';
  }
});

scrollToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Console welcome message
console.log('%c🎓 SETHUPATHY GOVERMENT ARTS COLLEGE ', 'color: #1567c3; font-size: 24px; font-weight: bold;');
console.log('%cDeveloped with ❤️ for IT Wings 2024 ', 'color: #666; font-size: 14px;');
