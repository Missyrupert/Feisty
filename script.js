// Simple Feist-inspired choose-your-own-adventure game
const story = [
  {
    text: "You stand at the edge of Crydee’s forest. A strange shimmer glows in the trees. Do you investigate or return to the keep?",
    choices: [
      { text: "Investigate the shimmer", next: 1 },
      { text: "Return to the keep", next: "lose" }
    ]
  },
  {
    text: "A magician appears, robed in midnight blue. 'The Rift opens. Will you step through, or flee?'",
    choices: [
      { text: "Step through the Rift", next: 2 },
      { text: "Flee", next: "lose" }
    ]
  },
  {
    text: "You arrive in Kelewan’s arena, surrounded by Tsurani soldiers. 'Will you fight or parley?'",
    choices: [
      { text: "Fight", next: "lose" },
      { text: "Parley", next: 3 }
    ]
  },
  {
    text: "Your wisdom earns you an audience with the Warlord. The adventure continues... (You win! For now.)",
    choices: [
      { text: "Restart", next: 0 }
    ]
  }
];

// DOM helpers
function $(id) { return document.getElementById(id); }

function render(sceneIdx) {
  const root = document.getElementById('game-root');
  root.innerHTML = '';
  const box = document.createElement('div');
  box.className = 'game-box';

  const scene = story[sceneIdx];
  const para = document.createElement('p');
  para.textContent = scene.text;
  box.appendChild(para);

  scene.choices.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = choice.text;
    btn.onclick = () => {
      if (choice.next === 'lose') {
        showLoser();
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
