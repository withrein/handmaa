//turn pages when click next or prev button
const pageTurnBtn = document.querySelectorAll('.nextprev-btn');

pageTurnBtn.forEach((el, index) => {
    el.onclick = () => {
        const pageTurnId = el.getAttribute('data-page');
        const pageTurn = document.getElementById(pageTurnId);

        if (pageTurn.classList.contains('turn')) {
            pageTurn.classList.remove('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 - index;
            }, 500);
        }
        else {
            pageTurn.classList.add('turn');
            setTimeout(() => {
                pageTurn.style.zIndex = 20 + index;
            }, 500);
        }

        // Add page turn sound effect
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2073/2073-preview.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio play failed:', e));

        // Add subtle particle effect on page turn
        createParticles(el);
    }
});

// Function to create particles
function createParticles(element) {
    const particles = 10;
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.width = '5px';
        particle.style.height = '5px';
        particle.style.background = '#00abf0';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.zIndex = '9999';
        particle.style.opacity = '0.8';
        document.body.appendChild(particle);
        
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 3;
        const distance = 30 + Math.random() * 50;
        const size = 3 + Math.random() * 3;
        
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Animate the particle
        let opacity = 0.8;
        let posX = centerX;
        let posY = centerY;
        
        const animate = () => {
            if (opacity <= 0) {
                document.body.removeChild(particle);
                return;
            }
            
            posX += Math.cos(angle) * speed;
            posY += Math.sin(angle) * speed;
            opacity -= 0.02;
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            particle.style.opacity = opacity;
            
            if (Math.abs(posX - centerX) < distance && Math.abs(posY - centerY) < distance) {
                requestAnimationFrame(animate);
            } else {
                document.body.removeChild(particle);
            }
        };
        
        requestAnimationFrame(animate);
    }
}

//contact me button when click
const pages = document.querySelectorAll('.book-page.page-right');
const contactMeBtn = document.querySelector('.btn.contact-me');

contactMeBtn.onclick = () => {
    pages.forEach((page, index) => {
        setTimeout(() => {
            page.classList.add('turn');

            setTimeout(() => {
                page.style.zIndex = 20 + index;
            }, 500)
        }, (index + 1) * 200 + 100)
    });
    
    // Add ripple effect on button click
    createRippleEffect(contactMeBtn);
}

// Function to create ripple effect on buttons
function createRippleEffect(button) {
    const ripple = document.createElement('span');
    button.appendChild(ripple);
    
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${0}px`;
    ripple.style.top = `${0}px`;
    
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    ripple.style.animation = 'ripple 0.8s linear';
    ripple.style.pointerEvents = 'none';
    
    setTimeout(() => {
        ripple.remove();
    }, 800);
}

// Add ripple animation to stylesheet
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes glow {
        0%, 100% {
            box-shadow: 0 0 5px rgba(0, 171, 240, 0.5);
        }
        50% {
            box-shadow: 0 0 15px rgba(0, 171, 240, 0.8), 0 0 30px rgba(0, 171, 240, 0.4);
        }
    }
    
    .services-content i, .skills-content .content span i {
        animation: glow 3s infinite;
    }
`;
document.head.appendChild(style);

let totalPages = pages.length;
let pageNumber = 0;

function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
        pageNumber = totalPages - 1;
    }
}

//back profile button when click
const backProfileBtn = document.querySelector('.back-profile');

backProfileBtn.onclick = () => {
    pages.forEach((_, index) => {
        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].classList.remove('turn');

            setTimeout(() => {
                reverseIndex();
                pages[pageNumber].style.zIndex = 10 + index;

            }, 500)

        }, (index + 1) * 200 + 100)
    });
    
    // Add ripple effect on button click
    createRippleEffect(backProfileBtn);
}

//opening animation
const coverRight = document.querySelector('.cover.cover-right');
const pageLeft = document.querySelector('.book-page.page-left');

//opening animation (cover right animation)
setTimeout(() => {
    coverRight.classList.add('turn');
}, 2100)

setTimeout(() => {
    coverRight.style.zIndex = -1;
}, 2800)

//opening animation (page left or profile page animation)
setTimeout(() => {
    pageLeft.style.zIndex = 20;
}, 3200)

//opening animation (all page right animation)
pages.forEach((_, index) => {
    setTimeout(() => {
        reverseIndex();
        pages[pageNumber].classList.remove('turn');

        setTimeout(() => {
            reverseIndex();
            pages[pageNumber].style.zIndex = 10 + index;

        }, 500)

    }, (index + 1) * 200 + 2100)
});

// Add hover effects to buttons
const allButtons = document.querySelectorAll('.btn');
allButtons.forEach(btn => {
    btn.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
    });
    
    btn.addEventListener('mouseout', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
    });
});

// cv downloads
const downloadCVBtn = document.getElementById('downloadCVBtn');
const hiddenDownloadLink = document.getElementById('hiddenDownloadLink');

if (downloadCVBtn && hiddenDownloadLink) {
    downloadCVBtn.addEventListener('click', function(e) {
        e.preventDefault();
        hiddenDownloadLink.click();
        
        createRippleEffect(downloadCVBtn);
        
        showDownloadAnimation();
    });
}

function showDownloadAnimation() {
    const downloadIcon = document.createElement('div');
    downloadIcon.innerHTML = '<i class="bx bx-download"></i>';
    downloadIcon.style.position = 'fixed';
    downloadIcon.style.top = '50%';
    downloadIcon.style.left = '50%';
    downloadIcon.style.transform = 'translate(-50%, -50%)';
    downloadIcon.style.fontSize = '3rem';
    downloadIcon.style.color = '#00abf0';
    downloadIcon.style.zIndex = '9999';
    downloadIcon.style.opacity = '0';
    downloadIcon.style.transition = 'all 0.5s ease';
    
    document.body.appendChild(downloadIcon);
    
    setTimeout(() => {
        downloadIcon.style.opacity = '1';
        downloadIcon.style.transform = 'translate(-50%, -50%) scale(1.5)';
    }, 100);
    
    setTimeout(() => {
        downloadIcon.style.opacity = '0';
        downloadIcon.style.transform = 'translate(-50%, -50%) scale(0.5)';
    }, 800);
    
    setTimeout(() => {
        document.body.removeChild(downloadIcon);
    }, 1300);
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.className = 'form-message loading';
        formMessage.textContent = 'Sending message...';
        
        // Add loading animation
        const loadingDots = document.createElement('span');
        loadingDots.className = 'loading-dots';
        formMessage.appendChild(loadingDots);
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let errors = [];
        if (!name) errors.push('Name is required');
        if (!email) errors.push('Email is required');
        else if (!/^\S+@\S+\.\S+$/.test(email)) errors.push('Invalid email format');
        if (!message) errors.push('Message is required');
        if (errors.length > 0) {
            formMessage.className = 'form-message error';
            formMessage.textContent = errors.join(', ');
            return;
        }
        
        // Simulate sending delay for better UX
        setTimeout(() => {
            // Save to localStorage
            let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push({ name, email, message, date: new Date().toISOString() });
            localStorage.setItem('contacts', JSON.stringify(contacts));
            
            formMessage.className = 'form-message success';
            formMessage.innerHTML = '<i class="bx bx-check-circle"></i> Your message has been sent successfully!';
            contactForm.reset();
            
            // Show success animation
            const submitBtn = contactForm.querySelector('.btn');
            submitBtn.innerHTML = '<i class="bx bx-check"></i> Sent!';
            submitBtn.style.backgroundColor = '#00c851';
            
            setTimeout(() => {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.style.backgroundColor = '';
            }, 2000);
        }, 1500);
    });
}

// Add loading dots animation
const loadingDotsStyle = document.createElement('style');
loadingDotsStyle.textContent = `
    .loading-dots::after {
        content: '...';
        animation: dots 1.5s infinite;
        display: inline-block;
        width: 20px;
        text-align: left;
    }
    
    @keyframes dots {
        0%, 20% { content: '.'; }
        40% { content: '..'; }
        60%, 100% { content: '...'; }
    }
`;
document.head.appendChild(loadingDotsStyle);

// Add parallax effect to profile image
const profileImg = document.querySelector('.profile-page img');
if (profileImg) {
    document.addEventListener('mousemove', function(e) {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
        profileImg.style.transform = `translateY(-10px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });
    
    document.addEventListener('mouseleave', function() {
        profileImg.style.transform = 'translateY(-10px) rotateY(0deg) rotateX(0deg)';
    });
}

// Initialize on document load
document.addEventListener('DOMContentLoaded', function() {
    // Add subtle animation to services icons
    const serviceIcons = document.querySelectorAll('.services-content i');
    serviceIcons.forEach(icon => {
        setInterval(() => {
            icon.style.transform = 'scale(1.1)';
            setTimeout(() => {
                icon.style.transform = 'scale(1)';
            }, 1000);
        }, 3000);
    });
    
    // Add hover effect to social media icons
    const socialIcons = document.querySelectorAll('.social-media a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.transform = 'translateY(-5px) rotate(5deg)';
        });
        
        icon.addEventListener('mouseout', function() {
            this.style.transform = '';
        });
    });
});