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

    }
})

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
    })
}

//create reverse index function
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
    })
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
})

// cv downlaods
const downloadCVBtn = document.getElementById('downloadCVBtn');
const hiddenDownloadLink = document.getElementById('hiddenDownloadLink');

if (downloadCVBtn && hiddenDownloadLink) {
    downloadCVBtn.addEventListener('click', function(e) {
        e.preventDefault();
        hiddenDownloadLink.click();
    });
}

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        formMessage.className = 'form-message loading';
        formMessage.textContent = 'Sending message...';
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
        // Save to localStorage
        let contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
        contacts.push({ name, email, message, date: new Date().toISOString() });
        localStorage.setItem('contacts', JSON.stringify(contacts));
        formMessage.className = 'form-message success';
        formMessage.textContent = 'Your message has been sent successfully!';
        contactForm.reset();
    });
}