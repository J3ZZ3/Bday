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
});
