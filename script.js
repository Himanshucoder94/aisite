// Load learned responses from localStorage
let learnedResponses = JSON.parse(localStorage.getItem("learnedResponses") || "{}");

// Handle mic button (speech recognition)
const micBtn = document.getElementById("micBtn");
micBtn.addEventListener("click", () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const speechResult = event.results[0][0].transcript;
    document.getElementById("userInput").value = speechResult;
    generate(); // Automatically generate after voice input
  };

  recognition.onerror = (event) => {
    alert("Error with speech recognition: " + event.error);
  };

  recognition.start();
});

// Generate response
function generate() {
  const input = document.getElementById("userInput").value.trim();
  const output = document.getElementById("output");

  if (!input) return;

  const lowerInput = input.toLowerCase();

  let reply;

  if (learnedResponses[lowerInput]) {
    reply = learnedResponses[lowerInput];
  } else {
    const responses = [
      "AI will do your laundry before it steals your job.",
      "The robots aren't coming... they're already here.",
      "In the future, your toaster might write poetry.",
      "AI: Artificial? Maybe. Awesome? Definitely.",
      `You said: "${input}" — that's deep, bro.`
    ];
    reply = responses[Math.floor(Math.random() * responses.length)];
  }

  output.textContent = reply;
  output.classList.remove("hidden");

  // Clear input field (optional)
  document.getElementById("userInput").value = "";
}

// Teach AI new response
function teachAI() {
  const inputKey = document.getElementById("teachInput").value.trim().toLowerCase();
  const replyValue = document.getElementById("teachReply").value.trim();

  if (!inputKey || !replyValue) {
    alert("Both fields are required!");
    return;
  }

  learnedResponses[inputKey] = replyValue;
  localStorage.setItem("learnedResponses", JSON.stringify(learnedResponses));

  alert("AI has learned a new reply!");

  // Clear input fields
  document.getElementById("teachInput").value = "";
  document.getElementById("teachReply").value = "";
}
