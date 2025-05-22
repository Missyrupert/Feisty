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
  {
    // SCENE 1
    text: `
    <b>Dawn at Crydee</b><br><br>
    The sea mist clings to the wild cliffs beneath Crydee Castle, and the cry of gulls echoes through the dawn. 
    You, a young squire named Tomas, are awakened not by the castle bell, but by the uneasy silence that settles after the wind dies. 
    Something is different today—the air hums with energy, and a strange flicker dances at the forest’s edge.
    <br><br>
    You slip from your cot, heart pounding, and step outside into the half-light, where your adventure begins.
    `,
    choices: [
      { text: "Investigate the flicker in the forest.", next: 1 },
      { text: "Go to the keep and report the strangeness.", next: "lose" }
    ]
  },
  {
    // SCENE 2
    text: `
    <b>The Whispering Grove</b><br><br>
    You press into the ancient woods. Sunbeams dapple the moss, and every shadow feels alive. 
    A voice, old as stone, whispers in your mind: <i>“The rift is stirring. Choose your allies well.”</i>
    <br><br>
    Suddenly, two paths open: one, choked with thorns but leading toward a silver glow; the other, clear but winding deeper into darkness.
    `,
    choices: [
      { text: "Take the thorny, silver-lit path.", next: 2 },
      { text: "Take the easy, dark path.", next: "lose" }
    ]
  },
  {
    // SCENE 3
    text: `
    <b>Encounter with the Magician</b><br><br>
    Thorns tear at your tunic as you force through to a small clearing. 
    There, Pug the magician stands, staring into a swirling portal of light and shadow.
    <br>
    He turns, eyes haunted. <i>“The Tsurani invade again. Will you help me close the rift, or seek safety in Crydee?”</i>
    `,
    choices: [
      { text: "Stay and help Pug.", next: 3 },
      { text: "Flee back to Crydee.", next: "lose" }
    ]
  },
  {
    // SCENE 4
    text: `
    <b>The Rift Opens</b><br><br>
    Together, you and Pug recite words that taste of thunder. 
    The portal convulses, and you’re sucked through, tumbling into alien sky and red sands: Kelewan.
    <br><br>
    You land beside Pug in a silent plaza. Tsurani soldiers close in, blades drawn.
    `,
    choices: [
      { text: "Stand and fight.", next: "lose" },
      { text: "Attempt to parley.", next: 4 }
    ]
  },
  {
    // SCENE 5
    text: `
    <b>Audience with the Warlord</b><br><br>
    Your attempt to parley surprises the Tsurani. Instead of attacking, they take you to the Warlord’s chamber. 
    The Warlord’s gaze is unreadable as he considers your fate.
    <br><br>
    He offers a test: <i>“Prove your wisdom. What is the greatest strength—steel, magic, or trust?”</i>
    `,
    choices: [
      { text: "Steel.", next: "lose" },
      { text: "Magic.", next: "lose" },
      { text: "Trust.", next: 5 }
    ]
  },
  {
    // SCENE 6
    text: `
    <b>The Arena of Shadows</b><br><br>
    Impressed, the Warlord orders a demonstration of your courage. You are led to the arena, 
    where a fearsome beast—half lizard, half shadow—emerges. The crowd roars.
    <br>
    A single sword lies in the sand; in the shadows, you spot a loose grate.
    `,
    choices: [
      { text: "Grab the sword and face the beast head-on.", next: "lose" },
      { text: "Try to escape through the grate.", next: 6 }
    ]
  },
  {
    // SCENE 7
    text: `
    <b>Escape and Revelation</b><br><br>
    You slip through the grate into dark tunnels. Pug appears beside you, a ghostly flicker in the gloom.
    <br>
    <i>“You have chosen cunning over brute force. But now, the rift’s source must be found, or Midkemia will fall.”</i>
    <br><br>
    You emerge into an underground temple, where a riddle is etched above a locked door:
    <br>
    <i>“What walks on four legs in the morning, two at noon, and three at dusk?”</i>
    `,
    choices: [
      { text: "A man.", next: 7 },
      { text: "A dog.", next: "lose" },
      { text: "A shadow.", next: "lose" }
    ]
  },
  {
    // SCENE 8
    text: `
    <b>Sanctum of the Rift</b><br><br>
    The door groans open, revealing a crystal altar pulsing with wild energy.
    <br>
    Pug tells you: <i>“Destroy the crystal and risk destroying both worlds. Channel its power, and you may close the rift.”</i>
    <br>
    You sense the weight of your decision.
    `,
    choices: [
      { text: "Destroy the crystal.", next: "lose" },
      { text: "Channel the crystal’s power.", next: 8 }
    ]
  },
  {
    // SCENE 9
    text: `
    <b>The Choice of Sacrifice</b><br><br>
    Channeling the crystal’s power, visions flash before your eyes: friends in peril, worlds on fire, the threads of fate converging on your outstretched hands.
    <br>
    <i>“All magic has a price,”</i> Pug warns. <i>“Will you pay it yourself, or let another suffer?”</i>
    `,
    choices: [
      { text: "Accept the sacrifice yourself.", next: 9 },
      { text: "Let Pug bear the cost.", next: "lose" }
    ]
  },
  {
    // SCENE 10 (Victory)
    text: `
    <b>Homecoming</b><br><br>
    Pain wracks your body, but the rift shrinks, then seals.
    <br>
    Light bursts around you; you awaken in Crydee’s keep, changed forever.
    <br>
    Pug sits beside your bed, smiling gently. <i>“You have shaped the fate of worlds. But all journeys begin anew. Are you ready?”</i>
    `,
    choices: [
      { text: "Yes, begin again.", next: 0 },
      { text: "No, end your journey.", next: "end" }
    ]
  },
  {
    // END SCENE
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

// Rendering logic
function $(id) { return document.getElementById(id); }

function render(sceneIdx) {
  const root = document.getElementById('game-root');
  root.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'game-box';

  const storyDiv = document.createElement('div');
  storyDiv.className = 'story-text';
  storyDiv.innerHTML = story[sceneIdx].text;
  box.appendChild(storyDiv);

  if (story[sceneIdx].choices.length === 0) {
    // End screen, no choices
    root.appendChild(box);
    return;
  }

  story[sceneIdx].choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.innerHTML = choice.text;
    btn.onclick = () => {
      if (choice.next === 'lose') {
        showLoser();
      } else if (choice.next === 'end') {
        render(10); // The "end" scene
      } else {
        render(choice.next);
      }
    };
    box.appendChild(btn);
  });

  root.appendChild(box);
}

function showLoser() {
  // Animate loser screen, then restart
  const loserDiv = document.createElement('div');
  loserDiv.className = 'loser-flash';
  loserDiv.textContent = "You're a loser";
  document.body.appendChild(loserDiv);
  setTimeout(() => {
    loserDiv.remove();
    render(0);
  }, 1700);
}

// Start game
render(0);
