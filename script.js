// Player object to store stats and inventory
let player = {
  gold: 20, // Starting gold
  inventory: [],
  flags: {} // For story progression, e.g., metJimmy: true
};

function resetPlayer() {
  player.gold = 20;
  player.inventory = [];
  player.flags = {};
}

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
    id: 0,
    text: `
    <b>The road dust of the King's Highway settles around you.</b><br>
    <br>
    You stand at a crossroads near the bustling city of Krondor. The air hums with untold possibilities. You have a small pouch with some coin. To the north, the shadowy expanse of the Dimwood. To the east, a lesser-travelled path winds towards the coast and whispers of Sorcerer's Isle. Or perhaps the city itself calls to you?
    `,
    choices: [
      { text: "Brave the ominous Dimwood", next: 1 },
      { text: "Seek the coastal path to Sorcerer's Isle", next: 2 },
      { text: "Try your luck in the city of Krondor", next: 7 }
    ]
  },
  { // 1: Dimwood Forest - Entrance
    id: 1,
    text: `
    The ancient trees of the Dimwood loom, their branches intertwined like skeletal fingers. Strange rustlings echo from the deeper shadows. You recall tales of goblins, Nighthawks, and worse.
    `,
    choices: [
      { text: "Press deeper, following a faint game trail", next: 4 },
      { text: "Stick to the edge, looking for a clearer route", next: 5 },
      { text: "This feels too dangerous. Return to the crossroads", next: 0 }
    ]
  },
  { // 2: Coastal Path - Towards Sorcerer's Isle
    id: 2,
    text: `
    The coastal path is rugged, the salt spray invigorating. In the distance, you can just make out the mist-shrouded silhouette of what might be Sorcerer's Isle. You spot a small, weathered shrine to a sea god.
    `,
    choices: [
      { text: "Offer a small prayer and 5 gold for safe passage", next: 6, requires: { goldAtLeast: 5 }, onSelect: [{ type: "loseGold", amount: 5 }] },
      { text: "Search the shrine for anything of value", next: 10 }, // Leads to consolation
      { text: "Continue without offering to the shrine", next: 6 },
      { text: "The Isle seems too far. Head back.", next: 0 }
    ]
  },
  { // 3: Generic Success / Good Outcome
    id: 3,
    text: `
    <b>Fortune smiles upon you!</b><br>
    <br>
    Through cunning, bravery, or sheer luck, you've navigated the immediate perils and perhaps even gained a small boon. The path ahead seems clearer, for now.
    <br><br>
    Your journey continues... (but for this expanded demo, it might lead to another choice or an end).
    `,
    choices: [
        { text: "Continue your journey with renewed confidence", next: 13}, // Links to main end for now
        { text: "Rest and count your blessings (and gold)", next: 13}
    ]
  },
  { // 4: Dimwood - Deeper In, Strange Lights
    id: 4,
    text: `
    The game trail leads you deeper. Eerie, phosphorescent fungi cast a faint glow on the path. Ahead, you see flickering lights, like will-o'-the-wisps dancing. You find a discarded, slightly rusty Dagger.
    `,
    onEnter: [{ type: "addItem", item: "Rusty Dagger" }],
    choices: [
      { text: "Investigate the lights cautiously", next: 8 },
      { text: "Avoid the lights and try to find another way", next: 5 }
    ]
  },
  { // 5: Dimwood - Treacherous Path, Growl
    id: 5,
    text: `
    You try to find a clearer route, but the undergrowth is thick and thorny. Suddenly, a low, guttural growl echoes from nearby bushes. You can't see what made it.
    `,
    choices: [
      { text: "Draw your weapon (if you have one) and prepare!", next: 9 },
      { text: "Attempt to sneak away very quietly", next: 14 } // Specific success: snuck away
    ]
  },
  { // 6: Coastal Path - Hermit's Cave
    id: 6,
    text: `
    Continuing along the coast, you stumble upon a hidden cave. An old hermit, weathered as the cliffs, sits by a small fire. He eyes you warily. "Few travel this way. What do you seek, wanderer?"
    `,
    choices: [
      { text: "Ask for wisdom about Sorcerer's Isle", next: 15 }, // Specific success - gained info
      { text: "Offer him 3 gold for some food", next: 16, requires: { goldAtLeast: 3 }, onSelect: [{ type: "loseGold", amount: 3 }, { type: "addItem", item: "Dried Fish" }] },
      { text: "He looks shifty. Best to leave.", next: 2 }
    ]
  },
  { // 7: Krondor - The Mockingbird Tavern
    id: 7,
    text: `
    You enter Krondor and find your way to "The Mockingbird's Fancy," a notorious tavern frequented by the city's less savory elements, but also a place of many rumours. The air is thick with smoke and harsh laughter. A shifty-looking fellow named 'Locklear's Cousin' eyes your coin purse.
    `,
    choices: [
      { text: "Order an ale (2 gold) and listen for gossip", next: 12, requires: { goldAtLeast: 2 }, onSelect: [{ type: "loseGold", amount: 2 }] },
      { text: "Confront 'Locklear's Cousin'", next: 11 }, // Leads to consolation
      { text: "Ask if anyone knows a 'Jimmy the Hand'", next: 17},
      { text: "This place is too rough. Leave immediately.", next: 0 }
    ]
  },
  { // 8: Dimwood - Will-o'-the-Wisps lead to a Moredhel Trap
    id: 8,
    text: `
    The lights dance alluringly, leading you into a small clearing. Suddenly, the ground gives way! You've stumbled into a cleverly concealed pit trap, likely set by Moredhel. You're bruised. If you have a rope, you might get out easier.
    `,
    choices: [
        { text: "Try to climb out (difficult)", next: 10 }, // Consolation - stuck for a bit
        { text: "Use Rope to climb out", next: 14, requires: { hasItem: "Rope" }, onSelect: [{type: "removeItem", item: "Rope"}] }
    ]
  },
  { // 9: Dimwood - Goblin Ambush!
    id: 9,
    text: `
    As you ready yourself, three scraggly goblins armed with crude spears burst from the bushes! They look hungry.
    `,
    choices: [
      { text: "Fight them off with your Rusty Dagger!", next: 18, requires: { hasItem: "Rusty Dagger" } },
      { text: "Fight them with your bare hands!", next: 10 }, // Higher chance of consolation
      { text: "Try to intimidate them with a war cry", next: 19 }
    ]
  },
  { // 10: Consolation Scene (FAILURE/BAD LUCK)
    id: 10,
    text: `
    <b>Well, that didn't quite go as planned, did it?</b><br>
    <br>
    Whether through misfortune, a poor choice, or just the cruel whims of Midkemian fate, your adventure has hit a snag.
    <br>Perhaps you were outmatched, outwitted, or just plain unlucky.
    `,
    consolation: true // This will trigger the "Claim Your Consolation Prize" button
  },
  { // 11: Krondor - Tavern Confrontation Gone Wrong
    id: 11,
    text: `
    You confront 'Locklear's Cousin'. "Problem, friend?" he snarls, and two of his burly companions rise from a nearby table. Things escalate quickly, and you're unceremoniously thrown out of the tavern, 10 gold lighter and with a throbbing headache.
    `,
    onEnter: [{ type: "loseGold", amount: 10 }], // Lose gold even if it goes negative
    consolation: true
  },
  { // 12: Krondor - Tavern Gossip & Opportunity
    id: 12,
    text: `
    You nurse your ale and overhear a hushed conversation about a 'package' that needs discreet delivery to the palace quarter. Risky, but they mention 50 gold for the trouble. A man named Arutha is apparently expecting it.
    `,
    choices: [
        { text: "Offer to deliver the package (requires discretion)", next: 20 },
        { text: "Too risky. Look for other opportunities.", next: 7},
        { text: "Try to pickpocket the gossiping merchant (dangerous!)", next: 21 }
    ]
  },
  { // 13: Main End Scene (VICTORY/CONCLUSION)
    id: 13,
    text: `
    <b>Your journey in Midkemia comes to a close... for now.</b><br>
    <br>
    You've faced dangers, made choices, and perhaps even found a measure of success. The lands of Feist are vast, and many adventures still await.
    <br><br>
    Refresh the page to play again.<br>
    <br>
    <i>“A single choice can shape worlds. Farewell, adventurer.”</i>
    `,
    choices: []
  },
  { // 14: Dimwood - Sneaked Away / Escaped Pit
    id: 14,
    text: `
    With careful steps and bated breath, you manage to evade the immediate danger. The Dimwood remains perilous, but you live to see another path. You find 5 gold dropped by a previous unfortunate soul.
    `,
    onEnter: [{ type: "gainGold", amount: 5 }],
    choices: [
        { text: "Continue cautiously through the Dimwood", next: 1},
        { text: "Perhaps the Dimwood is not for you. Return to crossroads.", next: 0}
    ]
  },
  { // 15: Hermit's Wisdom
    id: 15,
    text: `
    The hermit nods slowly. "Sorcerer's Isle... a place of potent magic and great danger. Few who seek it return, and those who do are often changed. If you must go, seek a boatman in LaMut, but beware the 'Eyes of the Serpent'." He hands you a small, intricately carved Wooden Charm. "May Lims-Kragma guide your path."
    `,
    onEnter: [{ type: "addItem", item: "Wooden Charm" }, {type: "setFlag", flag: "metHermit"}],
    choices: [
        { text: "Thank the hermit and leave", next: 2 },
        { text: "Ask if he has a map (he scoffs)", next: 6 }
    ]
  },
  { // 16: Hermit's Provisions
    id: 16,
    text: `
    The hermit grunts and hands you a piece of tough, dried fish. "Better than starving," he mutters. It's not much, but it's something.
    `,
    choices: [
        { text: "Thank him and continue your journey", next: 2 }
    ]
  },
  { // 17: Krondor - Asking for Jimmy the Hand
    id: 17,
    text: `
    You ask about Jimmy the Hand. A few patrons chuckle. 'Locklear's Cousin' smirks. "Jimmy? He's everywhere and nowhere, friend. If he wants to find you, he will. Best not to go looking unless you have business with the Mockers."
    `,
    onEnter: [{type: "setFlag", flag: "askedForJimmy"}],
    choices: [
        { text: "Perhaps another drink then...", next: 12, requires: { goldAtLeast: 2 }, onSelect: [{ type: "loseGold", amount: 2 }] },
        { text: "Decide this is a dead end and leave", next: 0 }
    ]
  },
  { // 18: Dimwood - Goblin Victory!
    id: 18,
    text: `
    Your weapon, though rusty, is enough to dispatch the poorly armed goblins! They were carrying a few trinkets. You find a sturdy Rope and 7 gold pieces.
    `,
    onEnter: [{ type: "addItem", item: "Rope" }, { type: "gainGold", amount: 7 }],
    choices: [
        { text: "Press on, emboldened by your victory!", next: 4 },
        { text: "That was too close. Exit the Dimwood.", next: 0 }
    ]
  },
  { // 19: Dimwood - Goblin Intimidation
    id: 19,
    text: `
    You let out what you hope is a fearsome war cry. The goblins pause, exchange confused glances, then one throws a rock that narrowly misses your head. They don't seem impressed, but they also don't advance immediately.
    `,
    choices: [
        { text: "Use the distraction to back away slowly", next: 14 },
        { text: "Realize it didn't work and prepare to fight (bare-handed)", next: 10 }
    ]
  },
  { // 20: Krondor - The Package Delivery
    id: 20,
    text: `
    You accept the task. The package is small and surprisingly heavy. You're given directions to a grand house in the palace quarter. "No questions, just deliver it to the man who answers to 'Arutha conDoin'. And be discreet."
    `,
    onEnter: [{ type: "addItem", item: "Mysterious Package" }],
    choices: [
        { text: "Head to the palace quarter immediately", next: 22 },
        { text: "Actually, this feels too dangerous. Try to return the package.", next: 11 } // They won't be happy
    ]
  },
  { // 21: Krondor - Failed Pickpocket
    id: 21,
    text: `
    You attempt to lift the merchant's purse, but his hand shoots out like a striking snake, grabbing your wrist. "Thief!" he bellows. The tavern erupts, and you're lucky to escape with only a few bruises and the loss of 5 gold as 'compensation'.
    `,
    onEnter: [{ type: "loseGold", amount: 5 }],
    consolation: true
  },
  { // 22: Krondor - Delivering to Arutha
    id: 22,
    text: `
    You arrive at an impressive townhouse. A stern-faced man in princely livery answers. When you mention Arutha, he leads you to a study where a thoughtful man with keen eyes appraises you. "The package?" he asks.
    `,
    requires: { hasItem: "Mysterious Package" }, // Should always have it to reach here
    choices: [
        { text: "Hand over the Mysterious Package", next: 23, onSelect: [{ type: "removeItem", item: "Mysterious Package"}, { type: "gainGold", amount: 50 }, {type: "setFlag", flag: "metArutha"}] },
        { text: "Suddenly get cold feet and try to leave", next: 11 } // Very bad idea
    ]
  },
  { // 23: Krondor - Reward from Arutha
    id: 23,
    text: `
    Arutha inspects the package, nods, and hands you a heavy purse. "Your discretion is appreciated. Krondor has need of resourceful individuals. Perhaps our paths will cross again." He also gives you a Royal Pass, allowing easier movement in the city.
    `,
    onEnter: [{type: "addItem", item: "Royal Pass"}], // Gold already given in choice onSelect
    choices: [
        { text: "Thank Prince Arutha and depart", next: 13 }, // Path to a good end
        { text: "Ask if there are other tasks (if met Jimmy)", next: 24, requires: { flagSet: "metArutha", flagSetAlso: "askedForJimmy" } },
        { text: "Boast about your skills", next: 13 }
    ]
  },
  { // 24: Krondor - Further tasks (Advanced)
    id: 24,
    text: `
    Arutha considers you. "Indeed. There are always shadows that need tending in a city like Krondor. Speak with my man, Gardan, at the palace gate. Mention my name and that 'Jimmy sometimes has busy hands'."
    `,
    choices: [
        { text: "This sounds like a true adventure! (Leads to End for now)", next: 13 }
    ]
  }
];

// --- HELPER FUNCTIONS for STATS & ITEMS ---
function processEffects(effects) {
  if (!effects) return;
  effects.forEach(effect => {
    switch (effect.type) {
      case "gainGold":
        player.gold += effect.amount;
        break;
      case "loseGold":
        player.gold -= effect.amount;
        if (player.gold < 0) player.gold = 0; // Prevent negative gold
        break;
      case "addItem":
        if (!player.inventory.includes(effect.item)) {
          player.inventory.push(effect.item);
        }
        break;
      case "removeItem":
        player.inventory = player.inventory.filter(i => i !== effect.item);
        break;
      case "setFlag":
        player.flags[effect.flag] = true;
        break;
      case "clearFlag":
        player.flags[effect.flag] = false;
        break;
    }
  });
}

function checkRequirements(requirements) {
  if (!requirements) return true; // No requirements, choice is available

  if (requirements.goldAtLeast !== undefined && player.gold < requirements.goldAtLeast) {
    return false;
  }
  if (requirements.hasItem !== undefined && !player.inventory.includes(requirements.hasItem)) {
    return false;
  }
  if (requirements.flagSet !== undefined && !player.flags[requirements.flagSet]) {
    return false;
  }
  if (requirements.flagSetAlso !== undefined && !player.flags[requirements.flagSetAlso]) { // For combined flag checks
    return false;
  }
  // Add more requirement types here (e.g., health, specific stats)
  return true;
}


// --- RENDERING LOGIC ---
function render(sceneIdx) {
  const root = document.getElementById('game-root');
  if (!root) {
    console.error("Element with ID 'game-root' not found. Cannot render game.");
    return;
  }
  root.innerHTML = ''; // Clear previous scene
  const box = document.createElement('div');
  box.className = 'game-box';

  const scene = story.find(s => s.id === sceneIdx);

  if (!scene) {
    console.error("Error: Scene with ID not found:", sceneIdx);
    const errorDiv = document.createElement('div');
    errorDiv.className = 'story-text';
    errorDiv.innerHTML = `<b>Error:</b> Story scene ${sceneIdx} is not defined. Please check your story data.`;
    box.appendChild(errorDiv);
    root.appendChild(box);
    return;
  }

  // Process onEnter effects for the scene
  if (scene.onEnter) {
    processEffects(scene.onEnter);
  }

  // Display Player Stats & Inventory
  const statsDiv = document.createElement('div');
  statsDiv.className = 'player-stats';
  statsDiv.innerHTML = `
    <p>Gold: ${player.gold}</p>
    <p>Inventory: ${player.inventory.length > 0 ? player.inventory.join(', ') : 'Empty'}</p>
  `;
  box.appendChild(statsDiv);


  const storyDiv = document.createElement('div');
  storyDiv.className = 'story-text';
  storyDiv.innerHTML = scene.text;
  box.appendChild(storyDiv);

  if (scene.consolation) {
    const prizeBtn = document.createElement('button');
    prizeBtn.className = 'consolation-btn';
    prizeBtn.innerHTML = 'Claim Your Consolation Prize';
    prizeBtn.onclick = () => showLoser();
    box.appendChild(prizeBtn);
    root.appendChild(box);
    return;
  }

  if (!scene.choices || scene.choices.length === 0) {
    root.appendChild(box);
    return;
  }

  scene.choices.forEach(choice => {
    const isChoiceAvailable = checkRequirements(choice.requires);

    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = choice.text;

    if (!isChoiceAvailable) {
      btn.disabled = true;
      btn.classList.add('disabled-choice'); // Add a class for styling disabled choices
      let reason = "";
      if (choice.requires.goldAtLeast && player.gold < choice.requires.goldAtLeast) reason += ` (Needs ${choice.requires.goldAtLeast} Gold)`;
      if (choice.requires.hasItem && !player.inventory.includes(choice.requires.hasItem)) reason += ` (Needs ${choice.requires.hasItem})`;
      if (choice.requires.flagSet && !player.flags[choice.requires.flagSet]) reason += ` (Condition not met)`;
      btn.innerHTML += reason;
    }

    btn.onclick = () => {
      if (!isChoiceAvailable) return; // Should not happen if button is disabled, but good check

      // Process onSelect effects for the choice
      if (choice.onSelect) {
        processEffects(choice.onSelect);
      }

      if (choice.next !== undefined) {
        render(choice.next);
      } else if (choice.fail !== undefined) { // Note: 'fail' isn't heavily used in this version, favoring 'consolation'
        render(choice.fail);
      } else {
         console.warn("Choice has no 'next' or 'fail' property defined:", choice, "Current scene:", sceneIdx);
      }
    };
    box.appendChild(btn);
  });

  root.appendChild(box);
}

function showLoser() {
  const loserDiv = document.createElement('div');
  loserDiv.className = 'loser-flash';
  loserDiv.textContent = "Never mind doll, we still love you ya daft old bint";
  document.body.appendChild(loserDiv);

  setTimeout(() => {
    if (loserDiv.parentNode) {
        loserDiv.remove();
    }
    resetPlayer(); // Reset player stats for a new game
    render(0);
  }, 2300);
}

// Start game
if (document.getElementById('game-root')) {
    resetPlayer(); // Ensure player is reset at the very start or on full page load
    render(0);
} else {
    console.error("Game root not found at initial load time for render(0).");
}