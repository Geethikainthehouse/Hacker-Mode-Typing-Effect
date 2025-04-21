const terminal = document.getElementById("terminal");
const typewriterSound = document.getElementById("typewriter-sound");
const introScreen = document.getElementById("intro-screen");

let isTyping = false; // Initially, typing is paused
let typingInProgress = false;
let audioIsPlaying = false;

const fragments = [
  "Initializing", "firewall", "protocol", "SYS32", "auth-bypass", "mainframe",
  "packet=0x1F3A", "||", "exec=trojan.run()", "[ENCRYPTED]",
  "uploading://payload", "vector.injection{00013}",
  "terminal://admin_control_panel", "STATUS: OVERRIDE",
  " attempt_logged", "proxy.chain=active",
  "data.dump(to: /usb/)", "loopback.ping()", "ssh.connect@192.168.0.1",
  ">>> EXECUTE: void_hack();", "!! buffer_overflow", "if(flagged){ reroute }"
];

function generateLine() {
  let line = "";
  const wordCount = Math.floor(Math.random() * 15 + 10); // 10 to 25 fragments
  for (let i = 0; i < wordCount; i++) {
    line += fragments[Math.floor(Math.random() * fragments.length)] + " ";
  }
  return line.trim();
}

function typeLine(line, i = 0) {
  if (!isTyping) {
    typingInProgress = false;
    return;
  }

  typingInProgress = true;

  if (i < line.length) {
    terminal.innerHTML += line.charAt(i);

    // Play sound if allowed
    if (typewriterSound.paused) {
      typewriterSound.play().catch(() => {});
    }

    setTimeout(() => typeLine(line, i + 1), 60); // Adjust typing speed here
  } else {
    terminal.innerHTML += "\n";
    setTimeout(() => typeLine(generateLine()), 200); // Wait before next line
  }
}

// Start typing immediately once space is pressed
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    event.preventDefault(); // prevent page scroll

    if (isTyping) {
      // If typing is in progress, pause it
      isTyping = false;
      typingInProgress = false;

      // Pause audio
      typewriterSound.pause();
      audioIsPlaying = false;
    } else {
      // If typing is paused, resume it
      isTyping = true;
      introScreen.style.display = "none"; // Hide intro screen
      document.body.style.backgroundColor = "#000"; // Change background color
      terminal.style.display = "block"; // Show terminal interface
      typeLine(generateLine()); // Start generating and typing text

      // Start audio if it's not already playing
      if (!audioIsPlaying) {
        typewriterSound.play().catch(() => {});
        audioIsPlaying = true;
      }
    }
  }
});