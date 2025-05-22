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
  // (all your story scenes and choices go here—see above)
  // 0 - 20: (same as above, truncated for space)
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
];

// DOM helpers
function $(id) { return document.getElementById(id); }

// Rendering logic
function render(sceneIdx) {
  const root = document.getElementById('game-root');
  root.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'game-box';

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
      } else if (choice.fail !== undefined) {
        render(choice.fail);
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
    render(0);
  }, 2300);
}

// Start game
render(0);
