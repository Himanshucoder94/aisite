function generate() {
  const input = document.getElementById("userInput").value.trim();
  const output = document.getElementById("output");

  if (!input) return;

  // For now: generate random/funny response
  const responses = [
    "AI will do your laundry before it steals your job.",
    "The robots aren't coming... they're already here.",
    "In the future, your toaster might write poetry.",
    "AI: Artificial? Maybe. Awesome? Definitely.",
    `You said: "${input}" — that's deep, bro.`
  ];

  const reply = responses[Math.floor(Math.random() * responses.length)];

  output.textContent = reply;
  output.classList.remove("hidden");
}
