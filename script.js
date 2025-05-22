// Sparkling background effect
(function makeSparkles() {
  const sparkleLayer = document.getElementById('bg-sparkle');
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
      { text: "Press deeper into the woods", next: 21 }, // Leads to the end for now
      { text: "Turn back to the crossroads", next: 0 }
    ]
  },
  { // 2: Sage's Tower
    text: `
    The Sage's tower looms before you, crumbling but still majestic. The door is slightly ajar. You hear the faint sound of pages turning.
    `,
    choices: [
      { text: "Enter the tower", next: 21 }, // Leads to the end for now
      { text: "Decide it's too risky and return to the crossroads", next: 0 }
    ]
  },
  // ... (scenes 3 through 20 would go here if you expand the story)
  { // 21: End scene
    text: `
    <b>Your journey in Midkemia comes to a close... for now.</b><br>
    <br>
    Refresh the page to play again.<br>
    <br>
    <i>“A single choice can shape worlds. Farewell, adventurer.”</i>
    `,
    choices: []
  }
  // You can add more scenes here if you want the story to be longer.
  // For example, a scene with a consolation prize:
  // { // 22: Consolation scene example
  //   text: "You tripped and fell. Unlucky!",
  //   consolation: true // This will trigger the "Claim Your Consolation Prize" button
  // }
];

// DOM helpers
function $(id) { return document.getElementById(id); }

// Rendering logic
function render(sceneIdx) {
  const root = document.getElementById('game-root');
  root.innerHTML = ''; // Clear previous scene
  const box = document.createElement('div');
  box.className = 'game-box';

  // Ensure sceneIdx is valid
  if (sceneIdx < 0 || sceneIdx >= story.length || !story[sceneIdx]) {
    console.error("Error: Invalid scene index or scene not defined:", sceneIdx);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'story-text';
    errorDiv.innerHTML = `<b>Error:</b> Story scene ${sceneIdx} is not defined. Please check your story data.`;
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
        console.warn("Choice has no 'next' or 'fail' property:", choice);
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
    loserDiv.remove();
    render(0); // Restart the game from the beginning
  }, 2300);
}

// Start game
render(0);