
// Toggle chatbox visibility
function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = chatbox.style.display === 'none' || chatbox.style.display === '' ? 'block' : 'none';
}

// Function to send message with suggestions
function sendMessageWithSuggestion(suggestedMessage) {
    document.getElementById('user-input').value = suggestedMessage;
    sendMessage();
}

// Function to fetch AI response from the API
async function fetchAIResponse(userInput) {
    const API_KEY = "AIzaSyC_3yjzd9wBVexkQiHyvFun_ELaAaXhKH0";  // Use your actual API key
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const payload = { contents: [{ parts: [{ text: userInput }] }] };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();
        return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    } catch (error) {
        console.error("Error fetching AI response:", error);
        return "Error fetching response";
    }
}

// Function to send message
async function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (!userInput.trim()) return;

    const chatBox = document.getElementById('chatbox-content');

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput;
    chatBox.appendChild(userMessage);
    document.getElementById('user-input').value = '';

    // Add bot "thinking..." message
    const botMessageContainer = document.createElement('div');
    botMessageContainer.className = 'bot-message-container';
    const botMessage = document.createElement('div');
    botMessage.className = 'bot-message';
    botMessage.textContent = 'Thinking...';
    botMessageContainer.appendChild(botMessage);
    chatBox.appendChild(botMessageContainer);
    chatBox.scrollTop = chatBox.scrollHeight;

    // Get AI response
    const response = await fetchAIResponse(userInput);
    
    // Apply the response
    botMessage.innerHTML = response;

    chatBox.scrollTop = chatBox.scrollHeight;
}

// Event listener for Send button
document.getElementById('send-message').addEventListener('click', sendMessage);

// Event listener for Enter key to send message
document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

// Slider Images Array
const sliderImgs = ["img1.png", "img2.png", "img3.png", "img4.png", "img5.png", "img6.png"];
let sliderImage = document.querySelector('.background-image');
let sliderGrids = [...document.querySelectorAll('.grid-item')];

let currentImage = 0;

// Automatically change the slider image every 5 seconds
setInterval(changeSliderImage, 5000);

// Function to change the slider image
const changeSliderImage = () => {
    sliderGrids.forEach((gridItem, index) => {
        setTimeout(() => {
            gridItem.classList.remove('hide');

            setTimeout(() => {
                if (index === sliderGrids.length - 1) {
                    // Cycle through the images
                    currentImage = (currentImage >= sliderImgs.length - 1) ? 0 : currentImage + 1;

                    // Update the background image source
                    sliderImage.src = `img/${sliderImgs[currentImage]}`;

                    // Hide grid items after changing the image
                    sliderGrids.forEach((item, i) => {
                        setTimeout(() => {
                            item.classList.add('hide');
                        }, i * 100);
                    });
                }
            }, 100);

        }, index * 100);
    });
};

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    // Add a background to the navbar when scrolled down
    if (window.scrollY >= 188) {
        navbar.classList.add('bg');
    } else {
        navbar.classList.remove('bg');
    }
});

// Toggle chatbox visibility on icon click
function toggleChat() {
    const chatbox = document.getElementById('chatbox');
    // Toggle the display of the chatbox
    chatbox.style.display = chatbox.style.display === 'none' || chatbox.style.display === '' ? 'block' : 'none';
}
