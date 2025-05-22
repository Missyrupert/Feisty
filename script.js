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

// Story nodes with consequence scenes
const story = [
  {
    text: `
    <b>Dawn at Crydee</b><br><br>
    The sea mist clings to the wild cliffs beneath Crydee Castle, and the cry of gulls echoes through the dawn.
    You, a young squire named Tomas, are awakened not by the castle bell, but by the uneasy silence that settles after the wind dies.
    Something is different today—the air hums with energy, and a strange flicker dances at the forest’s edge.<br><br>
    You slip from your cot, heart pounding, and step outside into the half-light, where your adventure begins.
    `,
    choices: [
      { text: "Investigate the flicker in the forest.", next: 1 },
      { text: "Go to the keep and report the strangeness.", fail: 10 }
    ]
  },
  {
    text: `
    <b>The Whispering Grove</b><br><br>
    You press into the ancient woods. Sunbeams dapple the moss, and every shadow feels alive.
    A voice, old as stone, whispers in your mind: <i>“The rift is stirring. Choose your allies well.”</i><br><br>
    Suddenly, two paths open: one, choked with thorns but leading toward a silver glow; the other, clear but winding deeper into darkness.
    `,
    choices: [
      { text: "Take the thorny, silver-lit path.", next: 2 },
      { text: "Take the easy, dark path.", fail: 11 }
    ]
  },
  {
    text: `
    <b>Encounter with the Magician</b><br><br>
    Thorns tear at your tunic as you force through to a small clearing.
    There, Pug the magician stands, staring into a swirling portal of light and shadow.<br>
    He turns, eyes haunted. <i>“The Tsurani invade again. Will you help me close the rift, or seek safety in Crydee?”</i>
    `,
    choices: [
      { text: "Stay and help Pug.", next: 3 },
      { text: "Flee back to Crydee.", fail: 12 }
    ]
  },
  {
    text: `
    <b>The Rift Opens</b><br><br>
    Together, you and Pug recite words that taste of thunder.
    The portal convulses, and you’re sucked through, tumbling into alien sky and red sands: Kelewan.<br><br>
    You land beside Pug in a silent plaza. Tsurani soldiers close in, blades drawn.
    `,
    choices: [
      { text: "Stand and fight.", fail: 13 },
      { text: "Attempt to parley.", next: 4 }
    ]
  },
  {
    text: `
    <b>Audience with the Warlord</b><br><br>
    Your attempt to parley surprises the Tsurani. Instead of attacking, they take you to the Warlord’s chamber.
    The Warlord’s gaze is unreadable as he considers your fate.<br><br>
    He offers a test: <i>“Prove your wisdom. What is the greatest strength—steel, magic, or trust?”</i>
    `,
    choices: [
      { text: "Steel.", fail: 14 },
      { text: "Magic.", fail: 15 },
      { text: "Trust.", next: 5 }
    ]
  },
  {
    text: `
    <b>The Arena of Shadows</b><br><br>
    Impressed, the Warlord orders a demonstration of your courage. You are led to the arena,
    where a fearsome beast—half lizard, half shadow—emerges. The crowd roars.<br>
    A single sword lies in the sand; in the shadows, you spot a loose grate.
    `,
    choices: [
      { text: "Grab the sword and face the beast head-on.", fail: 16 },
      { text: "Try to escape through the grate.", next: 6 }
    ]
  },
  {
    text: `
    <b>Escape and Revelation</b><br><br>
    You slip through the grate into dark tunnels. Pug appears beside you, a ghostly flicker in the gloom.<br>
    <i>“You have chosen cunning over brute force. But now, the rift’s source must be found, or Midkemia will fall.”</i><br><br>
    You emerge into an underground temple, where a riddle is etched above a locked door:<br>
    <i>“What walks on four legs in the morning, two at noon, and three at dusk?”</i>
    `,
    choices: [
      { text: "A man.", next: 7 },
      { text: "A dog.", fail: 17 },
      { text: "A shadow.", fail: 18 }
    ]
  },
  {
    text: `
    <b>Sanctum of the Rift</b><br><br>
    The door groans open, revealing a crystal altar pulsing with wild energy.<br>
    Pug tells you: <i>“Destroy the crystal and risk destroying both worlds. Channel its power, and you may close the rift.”</i>
    <br>
    You sense the weight of your decision.
    `,
    choices: [
      { text: "Destroy the crystal.", fail: 19 },
      { text: "Channel the crystal’s power.", next: 8 }
    ]
  },
  {
    text: `
    <b>The Choice of Sacrifice</b><br><br>
    Channeling the crystal’s power, visions flash before your eyes: friends in peril, worlds on fire, the threads of fate converging on your outstretched hands.<br>
    <i>“All magic has a price,”</i> Pug warns. <i>“Will you pay it yourself, or let another suffer?”</i>
    `,
    choices: [
      { text: "Accept the sacrifice yourself.", next: 9 },
      { text: "Let Pug bear the cost.", fail: 20 }
    ]
  },
  {
    text: `
    <b>Homecoming</b><br><br>
    Pain wracks your body, but the rift shrinks, then seals.<br>
    Light bursts around you; you awaken in Crydee’s keep, changed forever.<br>
    Pug sits beside your bed, smiling gently. <i>“You have shaped the fate of worlds. But all journeys begin anew. Are you ready?”</i>
    `,
    choices: [
      { text: "Yes, begin again.", next: 0 },
      { text: "No, end your journey.", next: 21 }
    ]
  },
  // Consequence scenes
  { // 10
    text: `<b>Consequences</b><br><br>
    You turn away from the unknown, but by the time the alarm is raised, it is too late.
    Shadows have already slipped past the keep. The world shifts toward darkness, unchallenged.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 11
    text: `<b>Consequences</b><br><br>
    You step onto the easy path, lulled by its calm. The forest darkens and, too late, you realise—this is the hunting ground of the Nighthawks.
    Shadows close in. Your journey is lost, and so is Midkemia's last hope.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 12
    text: `<b>Consequences</b><br><br>
    You flee back to Crydee, but the rift’s power spreads unchecked.
    Darkness and confusion reign, and your name is lost to history.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 13
    text: `<b>Consequences</b><br><br>
    You raise your blade, but the Tsurani are many. You fight bravely, but are quickly overcome.
    As the world narrows to shadow, your sacrifice is soon forgotten.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 14
    text: `<b>Consequences</b><br><br>
    You name steel as the greatest strength. The Warlord frowns, disappointed.
    You are cast out as a brute, unworthy of trust or magic.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 15
    text: `<b>Consequences</b><br><br>
    You choose magic, but the Warlord laughs.
    “Magic without trust is chaos.” You are led away in silence, your fate sealed.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 16
    text: `<b>Consequences</b><br><br>
    You grab the sword, facing the beast head-on. Your bravery is noted, but the creature is too strong.
    The arena roars as you fall. Some stories are short-lived.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 17
    text: `<b>Consequences</b><br><br>
    “A dog,” you answer. The door does not budge.
    The temple grows cold, and you are lost beneath the earth.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 18
    text: `<b>Consequences</b><br><br>
    “A shadow,” you answer. The door vanishes, replaced by utter darkness.
    In Kelewan’s depths, you vanish as well.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 19
    text: `<b>Consequences</b><br><br>
    You strike the crystal. The room fills with blinding light and roaring energy. Both worlds tremble and begin to fall apart.
    No one survives to tell your tale.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  { // 20
    text: `<b>Consequences</b><br><br>
    You let Pug bear the cost. He staggers, drained, and though the rift closes, he is lost to the darkness. 
    You return home, but at a cost too great to bear.<br><br>
    <em>Your tale ends here.</em>`,
    consolation: true
  },
  // 21: End scene
  {
    text: `
    <b>Your journey in Midkemia comes
