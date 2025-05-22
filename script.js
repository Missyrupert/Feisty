// Sparkling background effect
(function makeSparkles() {
  const sparkleLayer = document.getElementById('bg-sparkle');
  if (!sparkleLayer) {
    console.error("Element with ID 'bg-sparkle' not found.");
    return;
  }
  for (let i = 0; i < 60; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.top = Math.random() * 100 + 'vh';
    s.style.animationDelay = (Math.random() * 2.4) + 's';
    s.style.animationDuration = (1.8 + Math.random()) + 's';
    sparkleLayer.appendChild(s);
  }
})();

const story = [
  { // 0: Starting scene
    text: `
    <b>Welcome to Shadows of Midkemia!</b><br>
    <br>
    You stand at a dusty crossroads, the wind whispering ancient tales. A weathered signpost points in two directions. Where will your adventure begin?
    `,
    choices: [
      { text: "Venture into the Whispering Woods", next: 1 },
      { text: "Seek answers at the old Sage's tower", next: 2 }
    ]
  },
  { // 1: Whispering Woods
    text: `
    The Whispering Woods are dim and ancient, sunlight struggling to pierce the thick canopy. Strange sounds echo around you. You feel a prickle of unease.
    `,
    choices: [
      { text: "Press deeper into the woods", next: 3 }, // Changed to go to scene 3 (our end scene for now)
      { text: "Turn back to the crossroads", next: 0 }
    ]
  },
  { // 2: Sage's Tower
    text: `
    The Sage's tower looms before you, crumbling but still majestic. The door is slightly ajar. You hear the faint sound of pages turning.
    `,
    choices: [
      { text: "Enter the tower", next: 3 }, // Changed to go to scene 3
      { text: "Decide it's too risky and return to the crossroads", next: 0 }
    ]
  },
  // Note: Your original end scene was index 21. I've made it index 3 here for simplicity with fewer scenes.
  // You can expand this later.
  { // 3: End scene (was 21)
    text: `
    <b>Your journey in Midkemia comes to a close... for now.</b><br>
    <br>
    Refresh the page to play again.<br>
    <br>
    <i>“A single choice can shape worlds. Farewell, adventurer.”</i>
    `,
    choices: []
  }
  // Example of a scene with a consolation prize:
  // { // 4: Consolation scene example
  //   text: "You tripped on a loose stone and twisted your ankle. How unfortunate!",
  //   consolation: true // This will trigger the "Claim Your Consolation Prize" button
  // }
];

// DOM helpers
// function $(id) { return document.getElementById(id); } // Already have this via direct getElementById

// Rendering logic
function render(sceneIdx) {
  const root = document.getElementById('game-root');
  if (!root) {
    console.error("Element with ID 'game-root' not found. Cannot render game.");
    return;
  }
  root.innerHTML = ''; // Clear previous scene
  const box = document.createElement('div');
  box.className = 'game-box';

  // Ensure sceneIdx is valid
  if (sceneIdx < 0 || sceneIdx >= story.length || !story[sceneIdx]) {
    console.error("Error: Invalid scene index or scene not defined:", sceneIdx);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'story-text';
    errorDiv.innerHTML = `<b>Error:</b> Story scene ${sceneIdx} is not defined. Please check your story data or ensure all scenes are numbered correctly starting from 0. Current last scene index is ${story.length - 1}.`;
    box.appendChild(errorDiv);
    root.appendChild(box);
    return;
  }

  const scene = story[sceneIdx];

  const storyDiv = document.createElement('div');
  storyDiv.className = 'story-text';
  storyDiv.innerHTML = scene.text;
  box.appendChild(storyDiv);

  if (scene.consolation) {
    // Show "Claim Your Consolation Prize" button
    const prizeBtn = document.createElement('button');
    prizeBtn.className = 'consolation-btn';
    prizeBtn.innerHTML = 'Claim Your Consolation Prize';
    prizeBtn.onclick = () => showLoser();
    box.appendChild(prizeBtn);
    root.appendChild(box);
    return;
  }

  if (!scene.choices || scene.choices.length === 0) {
    // No choices, just display the text (e.g., end scene)
    root.appendChild(box);
    return;
  }

  scene.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = choice.text;
    btn.onclick = () => {
      if (choice.next !== undefined) {
        render(choice.next);
      } else if (choice.fail !== undefined) { // Assuming 'fail' property leads to a specific scene
        render(choice.fail);
      } else {
        console.warn("Choice has no 'next' or 'fail' property defined, and is not an end scene:", choice, "Current scene:", sceneIdx);
        // Potentially render the current scene again or an error message if this is unexpected
      }
    };
    box.appendChild(btn);
  });

  root.appendChild(box);
}

function showLoser() {
  // Animate custom "game over" screen, then restart
  const loserDiv = document.createElement('div');
  loserDiv.className = 'loser-flash';
  loserDiv.textContent = "Never mind doll, we still love you ya daft old bint";
  document.body.appendChild(loserDiv);
  setTimeout(() => {
    if (loserDiv.parentNode) {
        loserDiv.remove();
    }
    render(0); // Restart the game from the beginning
  }, 2300);
}

// Start game
// Ensure the DOM is fully loaded before trying to access elements, especially for game-root.
// However, since script.js is at the end of body, game-root should exist.
// The sparkle effect IIFE runs immediately.
// The render(0) call will run as soon as this script is parsed.

if (document.getElementById('game-root')) {
    render(0);
} else {
    // This might be too late if the script is deferred or async in a way that game-root isn't ready
    // But given index.html, it should be fine.
    console.error("Game root not found at initial load time for render(0).");
    // Could add a DOMContentLoaded listener here as a fallback if needed,
    // but for script at end of body, it's usually not.
    // document.addEventListener('DOMContentLoaded', () => render(0));
}