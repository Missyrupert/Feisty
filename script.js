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
  { // 0: Starting scene - Crossroads near Krondor
    text: `
    <b>The road dust of the King's Highway settles around you.</b><br>
    <br>
    You stand at a crossroads near the bustling city of Krondor. The air hums with untold possibilities. To the north, the shadowy expanse of the Dimwood. To the east, a lesser-travelled path winds towards the coast and whispers of Sorcerer's Isle. Or perhaps the city itself calls to you?
    `,
    choices: [
      { text: "Brave the ominous Dimwood", next: 1 },
      { text: "Seek the coastal path to Sorcerer's Isle", next: 2 },
      { text: "Try your luck in the city of Krondor", next: 7 }
    ]
  },
  { // 1: Dimwood Forest - Entrance
    text: `
    The ancient trees of the Dimwood loom, their branches intertwined like skeletal fingers, blocking out much of the sun. Strange rustlings echo from the deeper shadows. You recall tales of goblins, Nighthawks, and worse.
    `,
    choices: [
      { text: "Press deeper, following a faint game trail", next: 4 },
      { text: "Stick to the edge, looking for a clearer route", next: 5 },
      { text: "This feels too dangerous. Return to the crossroads", next: 0 }
    ]
  },
  { // 2: Coastal Path - Towards Sorcerer's Isle
    text: `
    The coastal path is rugged, the salt spray invigorating. In the distance, you can just make out the mist-shrouded silhouette of what might be Sorcerer's Isle. You spot a small, weathered shrine to a sea god.
    `,
    choices: [
      { text: "Offer a small prayer and continue", next: 6 },
      { text: "Search the shrine for anything of value", next: 10 }, // Leads to consolation
      { text: "The Isle seems too far. Head back.", next: 0 }
    ]
  },
  { // 3: Generic Success / Good Outcome
    text: `
    <b>Fortune smiles upon you!</b><br>
    <br>
    Through cunning, bravery, or sheer luck, you've navigated the immediate perils and perhaps even gained a small boon. The path ahead seems clearer, for now.
    <br><br>
    <i>This is a placeholder for a more specific success. You can link various good outcomes here or create more unique success scenes.</i>
    <br><br>
    Your journey continues... (but for this demo, it ends here).
    `,
    choices: [
        { text: "Reflect on your success and play again?", next: 13} // Links to main end
    ]
  },
  { // 4: Dimwood - Deeper In, Strange Lights
    text: `
    The game trail leads you deeper. Eerie, phosphorescent fungi cast a faint glow on the path. Ahead, you see flickering lights, like will-o'-the-wisps dancing.
    `,
    choices: [
      { text: "Investigate the lights cautiously", next: 8 },
      { text: "Avoid the lights and try to find another way", next: 5 }
    ]
  },
  { // 5: Dimwood - Treacherous Path, Growl
    text: `
    You try to find a clearer route, but the undergrowth is thick and thorny. Suddenly, a low, guttural growl echoes from nearby bushes. You can't see what made it.
    `,
    choices: [
      { text: "Draw your weapon and prepare for a fight!", next: 9 },
      { text: "Attempt to sneak away very quietly", next: 3 } // Success - snuck away
    ]
  },
  { // 6: Coastal Path - Hermit's Cave
    text: `
    Continuing along the coast, you stumble upon a hidden cave. An old hermit, weathered as the cliffs, sits by a small fire. He eyes you warily. "Few travel this way. What do you seek, wanderer?"
    `,
    choices: [
      { text: "Ask for wisdom about Sorcerer's Isle", next: 3 }, // Success - gained info
      { text: "Ask if he has any spare provisions", next: 10 }, // Consolation - he offers moldy bread
      { text: "He looks shifty. Best to leave.", next: 2 }
    ]
  },
  { // 7: Krondor - The Mockingbird Tavern
    text: `
    You enter Krondor and find your way to "The Mockingbird's Fancy," a notorious tavern frequented by the city's less savory elements, but also a place of many rumours. The air is thick with smoke and harsh laughter. A shifty-looking fellow eyes your coin purse.
    `,
    choices: [
      { text: "Order an ale and try to listen for useful gossip", next: 12 },
      { text: "Confront the fellow eyeing your purse", next: 11 }, // Leads to consolation
      { text: "This place is too rough. Leave immediately.", next: 0 }
    ]
  },
  { // 8: Dimwood - Will-o'-the-Wisps lead to a Moredhel Trap
    text: `
    The lights dance alluringly, leading you into a small clearing. Suddenly, the ground gives way! You've stumbled into a cleverly concealed pit trap, likely set by Moredhel (Dark Elves). You're bruised but not seriously injured.
    `,
    choices: [
        { text: "Curse your luck and try to climb out", next: 10 } // Consolation - stuck for a bit
    ]
  },
  { // 9: Dimwood - Goblin Ambush!
    text: `
    As you ready yourself, three scraggly goblins armed with crude spears burst from the bushes! They look hungry.
    `,
    choices: [
      { text: "Fight them off!", next: 3 }, // Success - defeated goblins
      { text: "Try to intimidate them with a war cry", next: 10 } // Consolation - they just laugh
    ]
  },
  { // 10: Consolation Scene (FAILURE/BAD LUCK)
    text: `
    <b>Well, that didn't quite go as planned, did it?</b><br>
    <br>
    Perhaps you zigged when you should have zagged. Or maybe fate just has a twisted sense of humour today. Don't worry, it happens to the best of adventurers.
    `,
    consolation: true // This will trigger the "Claim Your Consolation Prize" button and the special message
  },
  { // 11: Krondor - Tavern Confrontation Gone Wrong
    text: `
    You confront the man. "Problem, friend?" he snarls, and two of his burly companions rise from a nearby table. Things escalate quickly, and you're unceremoniously thrown out of the tavern, lighter of coin and heavier of bruises.
    `,
    consolation: true // This will trigger the "Claim Your Consolation Prize" button
  },
  { // 12: Krondor - Tavern Gossip
    text: `
    You nurse your ale and overhear a hushed conversation about a 'Valheru artifact' supposedly lost in the sewers beneath the palace. Could be nonsense, or the score of a lifetime...
    `,
    choices: [
        { text: "A Valheru artifact? Too dangerous! Ignore it.", next: 0},
        { text: "This sounds like a grand adventure! (Leads to success for now)", next: 3}
    ]
  },
  { // 13: Main End Scene (was 21 in original, then 3 in my first fix)
    text: `
    <b>Your journey in Midkemia comes to a close... for now.</b><br>
    <br>
    Refresh the page to play again.<br>
    <br>
    <i>“A single choice can shape worlds. Farewell, adventurer.”</i>
    `,
    choices: []
  }
];

// DOM helpers
// function $(id) { return document.getElementById(id); } // Not strictly needed

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
    console.error("Error: Invalid scene index or scene not defined:", sceneIdx, "Max index is:", story.length -1);
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
  loserDiv.textContent = "Never mind doll, we still love you ya daft old bint"; // Your requested message!
  document.body.appendChild(loserDiv);
  setTimeout(() => {
    if (loserDiv.parentNode) { // Check if still in DOM before removing
        loserDiv.remove();
    }
    render(0); // Restart the game from the beginning
  }, 2300);
}

// Start game
if (document.getElementById('game-root')) {
    render(0);
} else {
    console.error("Game root not found at initial load time for render(0).");
    // Fallback if script loaded before DOM, though unlikely with script at end of body
    // document.addEventListener('DOMContentLoaded', () => render(0));
}