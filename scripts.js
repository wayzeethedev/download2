document.addEventListener("DOMContentLoaded", async function () {
    document.getElementById("homeLink").addEventListener("click", () => showContent("home"));
    document.getElementById("gamesLink").addEventListener("click", () => showContent("game"));
    document.getElementById("moviesLink").addEventListener("click", () => showContent("movies"));
    document.getElementById("chatLink").addEventListener("click", () => showContent("chat"));
    document.getElementById("proxiesLink").addEventListener("click", () => showContent("proxies"));
    document.getElementById("settingsLink").addEventListener("click", () => showContent("settings"));

    const movieDropdown = document.getElementById('movieDropdown');
    const moviesSection = document.getElementById('movies-section');
    let movieData = [];

    try {
        const response = await fetch('https://downloadbe.pages.dev/data.json');
        movieData = await response.json();
        localStorage.setItem("movieData", JSON.stringify(movieData));

        movieData.forEach((item, index) => {
            if (item.type === 'video') {
                const option = document.createElement('a');
                option.textContent = item.title;
                option.href = "#";
                option.onclick = function() { selectMovie(index); };
                moviesSection.appendChild(option);
            }
        });
    } catch (error) {
        console.error("Failed to load movie data:", error);
    }
});

function toggleMovieDropdown() {
    const movieDropdown = document.getElementById("movieDropdown");
    movieDropdown.classList.toggle("show");

    document.addEventListener("click", function(event) {
        if (!event.target.closest(".dropdown")) {
            movieDropdown.classList.remove("show");
        }
    }, { once: true });
}

function filterMovieFunction() {
    const input = document.getElementById("movieInput");
    const filter = input.value.toUpperCase();
    const div = document.getElementById("movieDropdown");
    const links = div.getElementsByTagName("a");

    for (let i = 0; i < links.length; i++) {
        const txtValue = links[i].textContent || links[i].innerText;
        links[i].style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
    }
}

function selectMovie(index) {
    const movieData = JSON.parse(localStorage.getItem("movieData"));
    const selectedMovie = movieData[index];

    // Update the dropdown button text
    const dropbtn = document.querySelector('#movieDropdownContainer .dropbtn');
    dropbtn.innerHTML = `${selectedMovie.title} <span class="arrow">▼</span>`;

    // Get the video element
    const video = document.querySelector(".movies video");

    // Pause and reset the video
    video.pause();
    video.currentTime = 0;

    // Check if the video source is an .m3u8 file
    if (selectedMovie.src.endsWith('.m3u8')) {
        // Use hls.js for HLS playback
        if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(selectedMovie.src);
            hls.attachMedia(video);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.play();
            });
        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            // Native HLS support (e.g., Safari)
            video.src = selectedMovie.src;
            video.addEventListener('loadedmetadata', function () {
                video.play();
            });
        }
    } else {
        // Regular video file (e.g., .mp4)
        video.src = selectedMovie.src;
        video.load();
        video.play();
    }

    // Hide the dropdown
    document.getElementById("movieDropdown").classList.remove("show");
}

    function showMovieContent(id) {
        document.querySelectorAll('.content').forEach(section => {
            section.classList.remove('active');
            // Pause any playing video or game when switching tabs
            const video = section.querySelector('video');
            if (video) video.pause();
            const iframe = section.querySelector('iframe');
            if (iframe) iframe.src = iframe.src; // Reload iframe to stop it
        });

        const selectedContent = document.getElementById(id);
        selectedContent.classList.add('active');

        const movieDropdown = document.getElementById("movieDropdownContainer");
        if (id === "movies") {
            movieDropdown.style.display = "block";
        } else {
            movieDropdown.style.display = "none";
        }
    }

    document.addEventListener("DOMContentLoaded", async function () {
        document.getElementById("homeLink").addEventListener("click", () => showContent("home"));
        document.getElementById("gamesLink").addEventListener("click", () => showContent("game"));
        document.getElementById("moviesLink").addEventListener("click", () => showContent("movies"));
        document.getElementById("chatLink").addEventListener("click", () => showContent("chat"));
        document.getElementById("proxiesLink").addEventListener("click", () => showContent("proxies"));
        document.getElementById("settingsLink").addEventListener("click", () => showContent("settings"));

        const dropdown = document.getElementById('myDropdown');
        const gamesSection = document.getElementById('games-section');
        const gameDropdownContainer = document.getElementById("gameDropdownContainer");
        const iframe = document.querySelector(".game iframe");
        let contentData = [];

        try {
            const response = await fetch('https://downloadbe.pages.dev/data.json');
            contentData = await response.json();
            localStorage.setItem("contentData", JSON.stringify(contentData));

            contentData.forEach((item, index) => {
                if (item.type === 'game') {
                    const option = document.createElement('a');
                    option.textContent = item.title;
                    option.href = "#";
                    option.onclick = function() { selectGame(index); };
                    gamesSection.appendChild(option);
                }
            });
        } catch (error) {
            console.error("Failed to load content data:", error);
        }
    });

    function toggleDropdown() {
        const dropdown = document.getElementById("myDropdown");
        dropdown.classList.toggle("show");

        document.addEventListener("click", function(event) {
            if (!event.target.closest(".dropdown")) {
                dropdown.classList.remove("show");
            }
        }, { once: true });
    }

    function filterFunction() {
        const input = document.getElementById("myInput");
        const filter = input.value.toUpperCase();
        const div = document.getElementById("myDropdown");
        const links = div.getElementsByTagName("a");

        for (let i = 0; i < links.length; i++) {
            const txtValue = links[i].textContent || links[i].innerText;
            links[i].style.display = txtValue.toUpperCase().includes(filter) ? "" : "none";
        }
    }

    function selectGame(index) {
    const contentData = JSON.parse(localStorage.getItem("contentData"));
    const selectedGame = contentData[index];
    
    // Update the dropdown button text
    const dropbtn = document.querySelector('.dropbtn');
    dropbtn.innerHTML = `${selectedGame.title} <span class="arrow">▼</span>`;
    
    // Get the iframe and set the new source
    const iframe = document.querySelector(".game iframe");
    
    // Stop the previous game by clearing the iframe source and reload it
    iframe.src = ""; 
    iframe.src = selectedGame.src;  // Set the new game source
    document.getElementById("myDropdown").classList.remove("show");
}

    function showContent(id) {
        document.querySelectorAll('.content').forEach(section => {
            section.classList.remove('active');
            
            // Pause any playing video or game when switching tabs
            const video = section.querySelector('video');
            if (video) {
                video.pause(); // Pause the video
                video.currentTime = 0; // Reset video to the beginning
            }
            
            const iframe = section.querySelector('iframe');
            if (iframe) {
                iframe.src = ""; // Reset the iframe to stop the game
            }
        });

        const selectedContent = document.getElementById(id);
        selectedContent.classList.add('active');

        const gameDropdown = document.getElementById("gameDropdownContainer");
        if (id === "game") {
            gameDropdown.style.display = "block";
        } else {
            gameDropdown.style.display = "none";
        }

        const movieDropdown = document.getElementById("movieDropdownContainer");
        if (id === "movies") {
            movieDropdown.style.display = "block";
        } else {
            movieDropdown.style.display = "none";
        }
    }

    showContent("home");

    document.addEventListener("DOMContentLoaded", function () {
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const sendButton = document.getElementById("send-button");
const usernameInput = document.getElementById("username-input");
const saveUsernameButton = document.getElementById("save-username");

const messageAPI = "https://script.googleusercontent.com/macros/echo?user_content_key=pq8P7pvnjwBfAMxSI3JIbUmJAmqX1dlozV_2nmOrvANNtgdh9bumPQfVX8kJaQiQwMRfxLf2_ORU49Qs4hYr6JWV7AvyTcaqm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnL3FRTmSWfSP4P8uX2Vtp7M4DQsXppUU-PTOqXkii2aq8JAbeqVeR23_obyBTexk4P0JqIXcZPavyHXxClcsYmzm0kiGcw336tz9Jw9Md8uu&lib=Mvd39J1ELECwgTHjcxhcuZ2SxyEenzQhL";
const postMessageAPI = "https://script.google.com/macros/s/AKfycbyTuZ1hZs6AKpa8fieCUFrMnHMbdMHe_tlgLDR2jkRWJ-ILVJ6ulU_IGBREU72WgmP-Gg/exec";

// Retrieve username from localStorage or use a default
let username = localStorage.getItem("chatUsername") || "User";

// Set the username input field to the saved username
usernameInput.value = username;

// Save username to localStorage
saveUsernameButton.addEventListener("click", function () {
    const newUsername = usernameInput.value.trim();

    if (newUsername.toLowerCase() === "owner") {
        // Prompt for password
        const password = prompt("Enter the password to set your username as 'Owner':");
        if (password === "200814") {
            username = "Owner";
            localStorage.setItem("chatUsername", username);
            alert("Username saved: Owner");
        } else {
            // Revert to "User" if the password is incorrect or not entered
            username = "User";
            localStorage.setItem("chatUsername", username);
            usernameInput.value = "User"; // Update the input field
            alert("Incorrect password. Username reverted to 'User'.");
        }
    } else if (newUsername) {
        username = newUsername;
        localStorage.setItem("chatUsername", username);
        alert("Username saved: " + username);
    } else {
        alert("Please enter a valid username.");
    }
});

// Track whether a message is currently being sent
let isSending = false;

// Helper function to format the timestamp
function formatTimestamp(timestamp) {
    const now = new Date();
    const messageDate = new Date(timestamp);

    // Check if the message was sent today
    if (
        messageDate.getDate() === now.getDate() &&
        messageDate.getMonth() === now.getMonth() &&
        messageDate.getFullYear() === now.getFullYear()
    ) {
        return `Today at ${messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }

    // Check if the message was sent yesterday
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    if (
        messageDate.getDate() === yesterday.getDate() &&
        messageDate.getMonth() === yesterday.getMonth() &&
        messageDate.getFullYear() === yesterday.getFullYear()
    ) {
        return `Yesterday at ${messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    }

    // For older messages, display the full date
    return `${messageDate.toLocaleDateString()} at ${messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
}

// Fetch messages from the API
async function fetchMessages() {
    try {
        const response = await fetch(messageAPI);
        const messages = await response.json();
        const wasScrolledToBottom = isScrolledToBottom(); // Check if the user is scrolled to the bottom

        chatMessages.innerHTML = ""; // Clear existing messages
        messages.forEach(msg => {
            if (msg.user && msg.message) {
                const messageDiv = document.createElement("div");
                messageDiv.classList.add("message");
                messageDiv.classList.add(msg.user === username ? "sent" : "received");

                // Add username
                const usernameDiv = document.createElement("div");
                usernameDiv.classList.add("username");
                usernameDiv.textContent = msg.user;
                messageDiv.appendChild(usernameDiv);

                // Add message text
                const textDiv = document.createElement("div");
                textDiv.textContent = msg.message;
                messageDiv.appendChild(textDiv);

                // Add timestamp
                const timestampDiv = document.createElement("div");
                timestampDiv.classList.add("timestamp");

                // Format the timestamp
                const formattedTime = formatTimestamp(msg.time);
                timestampDiv.textContent = formattedTime;

                messageDiv.appendChild(timestampDiv);
                chatMessages.appendChild(messageDiv);
            }
        });

        // Only auto-scroll if the user was already scrolled to the bottom
        if (wasScrolledToBottom) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    } catch (error) {
        console.error("Error fetching messages:", error);
    }
}

// Function to check if the user is scrolled to the bottom
function isScrolledToBottom() {
    const { scrollTop, scrollHeight, clientHeight } = chatMessages;
    return Math.abs(scrollTop + clientHeight - scrollHeight) < 10; // Allow a small margin of error
}

// Send message to the API
async function sendMessage() {
    if (isSending) return; // Prevent sending multiple messages at once

    const message = chatInput.value.trim();
    if (!message) return;

    // Disable input and button while sending
    isSending = true;
    chatInput.disabled = true;
    sendButton.disabled = true;

    try {
        await fetch(postMessageAPI + "?" + new URLSearchParams({ user: username, message: message }), { method: "POST" });
        chatInput.value = ""; // Clear input field
        await fetchMessages(); // Refresh messages after sending
    } catch (error) {
        console.error("Error sending message:", error);
    } finally {
        // Re-enable input and button after sending
        isSending = false;
        chatInput.disabled = false;
        sendButton.disabled = false;
    }
}

// Send message on button click
sendButton.addEventListener("click", sendMessage);

// Send message on pressing Enter
chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// Fetch messages on page load
fetchMessages();

// Check for new messages every 0.1 seconds
setInterval(fetchMessages, 100);
});

    document.addEventListener("DOMContentLoaded", function () {
const adBanner = document.getElementById("ad-banner");
const defaultImage = document.getElementById("default-ad-image");
const defaultAdLink = document.getElementById("default-ad-link");

// Fetch the JSON file containing the default images
async function fetchDefaultImages() {
    try {
        const response = await fetch("https://downloadbe.pages.dev/ads.json"); // Path to your JSON file
        const defaultImages = await response.json();
        return defaultImages;
    } catch (error) {
        console.error("Failed to fetch default images:", error);
        return [];
    }
}

// Function to pick a random default image
function pickRandomDefaultImage(defaultImages) {
    if (defaultImages.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * defaultImages.length);
    return defaultImages[randomIndex];
}

// Function to display the default image
function displayDefaultImage(defaultAd) {
    if (defaultAd) {
        defaultImage.src = defaultAd.imgSrc; // Set the image source
        defaultAdLink.href = defaultAd.clickSrc; // Set the click destination
        defaultAdLink.style.display = "block"; // Show the default image and link
    }
}

// Function to check if the ad script loaded successfully
function checkAdScript() {
    const adImage = adBanner.querySelector("img:not(#default-ad-image)"); // Get the dynamically loaded ad image
    if (!adImage || (adImage.complete && adImage.naturalWidth === 0)) {
        // If no ad image is found or it failed to load, fetch and display a random default image
        fetchDefaultImages().then(defaultImages => {
            const randomDefaultAd = pickRandomDefaultImage(defaultImages);
            displayDefaultImage(randomDefaultAd);
        });
    }
}

// Check for the ad image once (no periodic checks)
setTimeout(checkAdScript, 1000); // Check after 1 second (adjust delay as needed)
});

    document.addEventListener("DOMContentLoaded", async function () {
const proxySelect = document.getElementById("proxy-select");
const generateButton = document.getElementById("generate-proxy");

// Fetch proxies from the JSON file
async function fetchProxies() {
    try {
        const response = await fetch("https://downloadbe.pages.dev/prox135.json");
        const proxies = await response.json();
        return proxies;
    } catch (error) {
        console.error("Failed to fetch proxies:", error);
        return {};
    }
}

// Populate the proxy dropdown with types
async function populateProxyDropdown() {
    const proxies = await fetchProxies();
    if (Object.keys(proxies).length > 0) {
        for (const [type, urls] of Object.entries(proxies)) {
            const option = document.createElement("option");
            option.value = type;
            option.textContent = type;
            proxySelect.appendChild(option);
        }
    } else {
        const option = document.createElement("option");
        option.textContent = "No proxy types available";
        proxySelect.appendChild(option);
    }
}

// Ensure the URL starts with https://
function ensureHttps(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`;
    }
    return url;
}

// Generate proxy link
generateButton.addEventListener("click", async function () {
    const selectedType = proxySelect.value;
    if (selectedType) {
        const proxies = await fetchProxies();
        const urls = proxies[selectedType];
        if (urls && urls.length > 0) {
            const randomUrl = urls[Math.floor(Math.random() * urls.length)];
            const fullUrl = ensureHttps(randomUrl); // Ensure the URL starts with https://
            window.open(fullUrl, "_blank");
        } else {
            alert("No proxies available for the selected type.");
        }
    } else {
        alert("Please select a proxy type first.");
    }
});

// Populate the dropdown on page load
populateProxyDropdown();
});

    // Track time only when the tab is active
    document.addEventListener("DOMContentLoaded", function () {
        const timeTrackedElement = document.getElementById("time-tracked");
        const exportButton = document.getElementById("export-time");
        const importButton = document.getElementById("import-time");
        const importFileInput = document.getElementById("import-file");

        let totalTime = parseInt(localStorage.getItem("totalTime")) || 0;
        let isTabActive = true;

        // Function to format time
        function formatTime(seconds) {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const secs = seconds % 60;
            return `${hours} hours, ${minutes} minutes, ${secs} seconds`;
        }

        // Update the displayed time
        function updateTimeDisplay() {
            timeTrackedElement.textContent = formatTime(totalTime);
        }

        // Start tracking time only when the tab is active
        setInterval(function () {
            if (isTabActive) {
                totalTime++;
                localStorage.setItem("totalTime", totalTime);
                updateTimeDisplay();
            }
        }, 1000);

        // Handle tab visibility change
        document.addEventListener("visibilitychange", function () {
            isTabActive = !document.hidden;
        });

        // Rest of your time tracking code remains unchanged
    });

    // Request Features Popup
    document.addEventListener("DOMContentLoaded", function () {
        const requestLink = document.getElementById("requestLink");
        const requestModal = document.getElementById("requestModal");
        const closeModal = document.getElementById("closeModal");

        // Open the modal
        requestLink.addEventListener("click", function (e) {
            e.preventDefault();
            requestModal.style.display = "flex";
        });

        // Close the modal
        closeModal.addEventListener("click", function () {
            requestModal.style.display = "none";
        });

        // Close the modal when clicking outside of it
        window.addEventListener("click", function (e) {
            if (e.target === requestModal) {
                requestModal.style.display = "none";
            }
        });
    });
