document.addEventListener('DOMContentLoaded', () => {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const siennaBirthdayMonth = 6; // July is month 6 (0-indexed)
    const siennaBirthdayDay = 3;
    const siennaBirthYear = 2006;

    function calculateAge(birthDate) {
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function updateCountdown() {
        const now = new Date();
        let nextBirthdayYear = now.getFullYear();

        // Check if this year's birthday has passed
        if (now.getMonth() > siennaBirthdayMonth || (now.getMonth() === siennaBirthdayMonth && now.getDate() > siennaBirthdayDay)) {
            nextBirthdayYear++;
        }

        const nextBirthday = new Date(nextBirthdayYear, siennaBirthdayMonth, siennaBirthdayDay);
        const totalSeconds = (nextBirthday - now) / 1000;

        const days = Math.floor(totalSeconds / 3600 / 24);
        const hours = Math.floor(totalSeconds / 3600) % 24;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const seconds = Math.floor(totalSeconds) % 60;

        daysEl.innerText = days;
        hoursEl.innerText = formatTime(hours);
        minutesEl.innerText = formatTime(minutes);
        secondsEl.innerText = formatTime(seconds);

        // Update age if it's her birthday
        if (now.getMonth() === siennaBirthdayMonth && now.getDate() === siennaBirthdayDay) {
            const siennaBirthDate = new Date(siennaBirthYear, siennaBirthdayMonth, siennaBirthdayDay);
            const age = calculateAge(siennaBirthDate);
            const headerTitle = document.querySelector('header h1');
            if (headerTitle) {
                 // Ensure the base message is there before appending age
                if (!headerTitle.textContent.includes("Happy Birthday, Sienna!")) {
                    headerTitle.textContent = "Happy Birthday, Sienna!";
                }
                // Prevent duplicate age display
                if (!headerTitle.textContent.includes(`She is ${age} today!`)) {
                     headerTitle.textContent += ` She is ${age} today!`;
                }
            }
        } else {
            // Reset header if it's not her birthday
            const headerTitle = document.querySelector('header h1');
            if (headerTitle && headerTitle.textContent.includes("She is")) {
                headerTitle.textContent = "Happy Birthday, Sienna!";
            }
        }
    }

    function formatTime(time) {
        return time < 10 ? `0${time}` : time;
    }

    // Initial call
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);

    // Set initial age in header if not birthday
    const siennaBirthDate = new Date(siennaBirthYear, siennaBirthdayMonth, siennaBirthdayDay);
    const currentAge = calculateAge(siennaBirthDate);
    const headerTitle = document.querySelector('header h1');
    if (headerTitle && !(new Date().getMonth() === siennaBirthdayMonth && new Date().getDate() === siennaBirthdayDay)) {
        // Append age if it's not her birthday today, and it's not already there.
        // This part might be redundant if we only want to show age ON the birthday.
        // For now, let's keep the main message simpler and only add age on the actual day.
        // So, removing the 'else' part of adding age to the header for non-birthday days.
    }

    // Slideshow Logic
    let slideIndex = 1;
    showSlides(slideIndex);

    // Next/previous controls (making them globally accessible for HTML onclick)
    window.plusSlides = function(n) {
        showSlides(slideIndex += n);
    }

    // Thumbnail image controls (making them globally accessible for HTML onclick)
    window.currentSlide = function(n) {
        showSlides(slideIndex = n);
    }

    function showSlides(n) {
        let i;
        let slides = document.getElementsByClassName("slide");
        let dots = document.getElementsByClassName("dot");

        if (slides.length === 0) return; // Exit if no slides are present

        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}

        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex-1].style.display = "block";
        if (dots.length > 0 && dots[slideIndex-1]) { // Check if dots exist and the specific dot exists
            dots[slideIndex-1].className += " active";
        }
    }
    // Optional: Auto-cycle slides
    // setInterval(() => { plusSlides(1); }, 7000); // Change image every 7 seconds

    // Interactive Image Modal Logic
    // Interactive Image Modal Logic (Dudu)
    const duduModal = document.getElementById("interactiveModal");
    const imgDudu = document.getElementById("interactiveDudu");
    const modalMessageText = document.getElementById("modalMessageText");
    const duduModalCloseButton = document.querySelector(".dudu-modal-close"); // More specific selector

    if (imgDudu && duduModal && modalMessageText && duduModalCloseButton) {
        imgDudu.onclick = function() {
            modalMessageText.innerHTML = "Psst! Bubu & Dudu have a secret message for Sienna: You're the most pawsome girlfriend in the world! Hope your birthday is as sweet as you are! 💕";
            duduModal.style.display = "block";
        }
        duduModalCloseButton.onclick = function() {
            duduModal.style.display = "none";
        }
    } else {
        console.error("Modal elements not found for Dudu interactive image!");
    }

    // Love Note Modal Logic
    const loveNoteModal = document.getElementById("loveNoteModal");
    const revealLoveNoteBtn = document.getElementById("revealLoveNoteBtn");
    const loveNoteModalCloseButton = document.querySelector(".love-note-modal-close"); // More specific selector

    if (revealLoveNoteBtn && loveNoteModal && loveNoteModalCloseButton) {
        revealLoveNoteBtn.onclick = function() {
            loveNoteModal.style.display = "block";
        }
        loveNoteModalCloseButton.onclick = function() {
            loveNoteModal.style.display = "none";
        }
    } else {
        console.error("Modal elements not found for Love Note!");
    }

    // General window click for closing modals - needs to handle multiple modals
    window.onclick = function(event) {
        if (event.target == duduModal) {
            duduModal.style.display = "none";
        }
        if (event.target == loveNoteModal) {
            loveNoteModal.style.display = "none";
        }
    }

    // Scroll-based background color change
    const sections = [
        { id: 'countdown-section', color: '#FFFACD' }, // LemonChiffon
        { id: 'gallery-section', color: '#F0FFF0' },   // Honeydew
        { id: 'messages-section', color: '#FFF0F5' },  // LavenderBlush
        { id: 'favorite-things-section', color: '#E6E6FA' }, // Lavender
        { id: 'memories-slideshow-section', color: '#F0F8FF' }, // AliceBlue
        { id: 'love-note-reveal-section', color: '#FFE4E1' }, // MistyRose
        { id: 'music-section', color: '#FAFAD2' }       // LightGoldenrodYellow
    ];

    const defaultBackgroundColor = '#FFF8DC'; // Original body background

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null, // relative to document viewport
            rootMargin: '0px',
            threshold: 0.5 // 50% of the section is visible
        };

        const body = document.body;

        sections.forEach(sectionInfo => {
            const targetSection = document.getElementById(sectionInfo.id);
            if (targetSection) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            body.style.backgroundColor = sectionInfo.color;
                        }
                    });
                }, observerOptions);
                observer.observe(targetSection);
            }
        });

        // Optional: Revert to default if no specific section is "dominant"
        // This is more complex; for now, the last intersected section's color will persist.
        // A more robust solution might involve tracking the "most visible" section or
        // reverting to default when scrolling to top/header or footer.

        // Simple revert to default when near the top (e.g. header is visible)
        const header = document.querySelector('header');
        if (header) {
            const headerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        body.style.backgroundColor = defaultBackgroundColor;
                    }
                });
            }, { threshold: 0.75 }); // When header is mostly visible
            headerObserver.observe(header);
        }

    } else {
        console.log("Intersection Observer not supported, background won't change on scroll.");
    }

    // Scroll-reveal animations
    if ('IntersectionObserver' in window) {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');

        const revealObserverOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // At least 10% of the element is visible
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    // Optional: unobserve after revealing to prevent re-triggering and save resources
                    // observer.unobserve(entry.target);
                }
                // Optional: remove 'revealed' class if element scrolls out of view to re-animate
                // else {
                //    entry.target.classList.remove('revealed');
                // }
            });
        }, revealObserverOptions);

        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers: just make them visible
        document.querySelectorAll('.reveal-on-scroll').forEach(el => {
            el.classList.add('revealed');
        });
        console.log("Intersection Observer not supported, scroll reveal animations won't be as smooth.");
    }

    // Mouse-Tracking Sparkle Effect
    const NUM_SPARKLES = 5; // Number of sparkles in the trail
    const sparkles = [];
    let sparkleIndex = 0;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let lastMoveTime = 0;

    for (let i = 0; i < NUM_SPARKLES; i++) {
        let sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        document.body.appendChild(sparkle);
        sparkles.push(sparkle);
    }

    document.addEventListener('mousemove', function(e) {
        const currentTime = Date.now();
        // Only update if mouse has moved significantly or enough time has passed
        // This helps to prevent too many updates and makes the trail effect more apparent
        const distanceMoved = Math.sqrt(Math.pow(e.pageX - lastMouseX, 2) + Math.pow(e.pageY - lastMouseY, 2));

        if (distanceMoved > 2 || (currentTime - lastMoveTime > 30)) { // Adjust sensitivity
            lastMouseX = e.pageX;
            lastMouseY = e.pageY;
            lastMoveTime = currentTime;

            const currentSparkle = sparkles[sparkleIndex];

            currentSparkle.style.left = e.pageX + 'px';
            currentSparkle.style.top = e.pageY + 'px';
            currentSparkle.style.opacity = '1';
            currentSparkle.style.transform = 'scale(1) translate(-50%, -50%)'; // Center on cursor & scale up

            // Trigger fade out after a short delay
            setTimeout(() => {
                currentSparkle.style.opacity = '0';
                currentSparkle.style.transform = 'scale(0.5) translate(-50%, -50%)'; // Shrink
            }, 200); // Sparkle visible duration

            sparkleIndex = (sparkleIndex + 1) % NUM_SPARKLES; // Cycle through sparkles
        }
    });

    // Optional: Hide sparkles if mouse leaves window (might be desired)
    document.addEventListener('mouseleave', function() {
        sparkles.forEach(s => {
            s.style.opacity = '0';
            s.style.transform = 'scale(0.5) translate(-50%, -50%)';
        });
    });

    // Subtle 3D Tilt Effect on Header H1
    const headerH1 = document.querySelector('header h1');
    if (headerH1) {
        document.addEventListener('mousemove', function(e) {
            const { clientWidth, clientHeight } = document.documentElement;
            const xRelativeToCenter = (e.clientX - clientWidth / 2) / (clientWidth / 2); // -1 to 1
            const yRelativeToCenter = (e.clientY - clientHeight / 2) / (clientHeight / 2); // -1 to 1

            const maxRotation = 5; // Max rotation in degrees
            const rotateY = xRelativeToCenter * maxRotation;
            const rotateX = -yRelativeToCenter * maxRotation; // Invert Y for natural feel

            // Apply a subtle perspective and translateZ to enhance the 3D effect
            headerH1.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
    }
});
