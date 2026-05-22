const vocabulary = {
  greetings: [
    { de: "Hallo", en: "Hello" },
    { de: "Guten Morgen", en: "Good morning" },
    { de: "Guten Abend", en: "Good evening" },
    { de: "Gute Nacht", en: "Good night" },
    { de: "Tschüss", en: "Goodbye" },
    { de: "Auf Wiedersehen", en: "Goodbye (formal)" },
    { de: "Wie geht's?", en: "How are you?" },
    { de: "Mir geht's gut", en: "I'm fine" },
    { de: "Danke", en: "Thank you" },
    { de: "Bitte", en: "Please / You're welcome" },
    { de: "Entschuldigung", en: "Excuse me / Sorry" },
    { de: "Ja", en: "Yes" },
    { de: "Nein", en: "No" },
    { de: "Willkommen", en: "Welcome" }
  ],
  numbers: [
    { de: "null", en: "zero" },
    { de: "eins", en: "one" },
    { de: "zwei", en: "two" },
    { de: "drei", en: "three" },
    { de: "vier", en: "four" },
    { de: "fünf", en: "five" },
    { de: "sechs", en: "six" },
    { de: "sieben", en: "seven" },
    { de: "acht", en: "eight" },
    { de: "neun", en: "nine" },
    { de: "zehn", en: "ten" },
    { de: "zwanzig", en: "twenty" },
    { de: "dreißig", en: "thirty" },
    { de: "hundert", en: "hundred" }
  ],
  colors: [
    { de: "rot", en: "red" },
    { de: "blau", en: "blue" },
    { de: "grün", en: "green" },
    { de: "gelb", en: "yellow" },
    { de: "schwarz", en: "black" },
    { de: "weiß", en: "white" },
    { de: "orange", en: "orange" },
    { de: "lila", en: "purple" },
    { de: "braun", en: "brown" },
    { de: "grau", en: "gray" },
    { de: "pink", en: "pink" },
    { de: "gold", en: "gold" }
  ],
  food: [
    { de: "das Wasser", en: "water" },
    { de: "der Kaffee", en: "coffee" },
    { de: "der Tee", en: "tea" },
    { de: "das Bier", en: "beer" },
    { de: "der Wein", en: "wine" },
    { de: "das Brot", en: "bread" },
    { de: "die Milch", en: "milk" },
    { de: "der Käse", en: "cheese" },
    { de: "der Apfel", en: "apple" },
    { de: "die Banane", en: "banana" },
    { de: "der Reis", en: "rice" },
    { de: "der Fisch", en: "fish" },
    { de: "das Fleisch", en: "meat" },
    { de: "der Kuchen", en: "cake" }
  ],
  places: [
    { de: "der Bahnhof", en: "train station" },
    { de: "der Flughafen", en: "airport" },
    { de: "das Krankenhaus", en: "hospital" },
    { de: "die Schule", en: "school" },
    { de: "die Universität", en: "university" },
    { de: "die Kirche", en: "church" },
    { de: "das Museum", en: "museum" },
    { de: "der Park", en: "park" },
    { de: "das Restaurant", en: "restaurant" },
    { de: "das Hotel", en: "hotel" },
    { de: "der Supermarkt", en: "supermarket" },
    { de: "die Apotheke", en: "pharmacy" }
  ],
  verbs: [
    { de: "sein", en: "to be" },
    { de: "haben", en: "to have" },
    { de: "werden", en: "to become" },
    { de: "können", en: "can / to be able" },
    { de: "müssen", en: "must / to have to" },
    { de: "sagen", en: "to say" },
    { de: "machen", en: "to make / do" },
    { de: "gehen", en: "to go" },
    { de: "kommen", en: "to come" },
    { de: "sehen", en: "to see" },
    { de: "essen", en: "to eat" },
    { de: "trinken", en: "to drink" },
    { de: "lesen", en: "to read" },
    { de: "schreiben", en: "to write" }
  ],
  phrases: [
    { de: "Ich heiße...", en: "My name is..." },
    { de: "Ich komme aus...", en: "I come from..." },
    { de: "Ich wohne in...", en: "I live in..." },
    { de: "Ich lerne Deutsch", en: "I'm learning German" },
    { de: "Sprechen Sie Englisch?", en: "Do you speak English?" },
    { de: "Ich verstehe nicht", en: "I don't understand" },
    { de: "Kannst du mir helfen?", en: "Can you help me?" },
    { de: "Wie viel kostet das?", en: "How much does that cost?" },
    { de: "Wo ist die Toilette?", en: "Where is the toilet?" },
    { de: "Prost!", en: "Cheers!" },
    { de: "Alles Gute!", en: "All the best!" },
    { de: "Es tut mir leid", en: "I'm sorry" },
    { de: "Kein Problem", en: "No problem" },
    { de: "Bis bald", en: "See you soon" }
  ]
};

let currentCategory = 'greetings';
let currentCards = [];
let currentIndex = 0;
let isFlipped = false;

// Quiz state
let quizQuestions = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

// Progress
let progress = loadProgress();

function loadProgress() {
  const saved = localStorage.getItem('germanProgress');
  if (saved) return JSON.parse(saved);
  const p = {};
  for (const cat in vocabulary) {
    p[cat] = {};
  }
  return p;
}

function saveProgress() {
  localStorage.setItem('germanProgress', JSON.stringify(progress));
}

// ============ FLASHCARDS ============

function getCategoryWords(cat) {
  return vocabulary[cat] || [];
}

function loadCategory(cat) {
  currentCategory = cat;
  currentCards = [...getCategoryWords(cat)];
  currentIndex = 0;
  isFlipped = false;
  document.getElementById('flashcard').classList.remove('flipped');
  updateCard();
}

function updateCard() {
  if (currentCards.length === 0) return;
  const card = currentCards[currentIndex];
  document.getElementById('card-front-word').textContent = card.de;
  document.getElementById('card-back-word').textContent = card.en;
  document.getElementById('card-index').textContent = currentIndex + 1;
  document.getElementById('card-total').textContent = currentCards.length;
}

function flipCard() {
  if (currentCards.length === 0) return;
  document.getElementById('flashcard').classList.toggle('flipped');
  isFlipped = !isFlipped;
  markSeen(currentCategory, currentCards[currentIndex].de);
}

function nextCard() {
  if (currentCards.length === 0) return;
  currentIndex = (currentIndex + 1) % currentCards.length;
  document.getElementById('flashcard').classList.remove('flipped');
  isFlipped = false;
  updateCard();
}

function prevCard() {
  if (currentCards.length === 0) return;
  currentIndex = (currentIndex - 1 + currentCards.length) % currentCards.length;
  document.getElementById('flashcard').classList.remove('flipped');
  isFlipped = false;
  updateCard();
}

function shuffleCards() {
  if (currentCards.length === 0) return;
  for (let i = currentCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [currentCards[i], currentCards[j]] = [currentCards[j], currentCards[i]];
  }
  currentIndex = 0;
  document.getElementById('flashcard').classList.remove('flipped');
  isFlipped = false;
  updateCard();
}

function markSeen(cat, word) {
  if (!progress[cat]) progress[cat] = {};
  progress[cat][word] = true;
  saveProgress();
}

// ============ QUIZ ============

function getQuizPool(cat) {
  if (cat === 'all') {
    const pool = [];
    for (const c in vocabulary) {
      pool.push(...vocabulary[c].map(w => ({ ...w, category: c })));
    }
    return pool;
  }
  return vocabulary[cat].map(w => ({ ...w, category: cat }));
}

function startQuiz() {
  const cat = document.getElementById('quiz-category-select').value;
  const pool = getQuizPool(cat);
  if (pool.length < 4) {
    document.getElementById('quiz-question').textContent = 'Not enough words in this category. Select another.';
    return;
  }

  quizQuestions = [];
  quizIndex = 0;
  quizScore = 0;
  quizAnswered = false;
  document.getElementById('quiz-score').textContent = '0';

  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const questionCount = Math.min(10, shuffled.length);
  for (let i = 0; i < questionCount; i++) {
    const correct = shuffled[i];
    const options = [correct.en];
    const wrongPool = pool.filter(w => w.en !== correct.en);
    while (options.length < 4 && wrongPool.length > 0) {
      const idx = Math.floor(Math.random() * wrongPool.length);
      const pick = wrongPool.splice(idx, 1)[0];
      if (!options.includes(pick.en)) options.push(pick.en);
    }
    for (let j = options.length - 1; j > 0; j--) {
      const k = Math.floor(Math.random() * (j + 1));
      [options[j], options[k]] = [options[k], options[j]];
    }
    quizQuestions.push({ word: correct.de, answer: correct.en, options });
  }

  document.getElementById('quiz-total').textContent = quizQuestions.length;
  document.getElementById('quiz-next-btn').classList.add('hidden');
  showQuizQuestion();
}

function showQuizQuestion() {
  if (quizIndex >= quizQuestions.length) {
    finishQuiz();
    return;
  }

  const q = quizQuestions[quizIndex];
  document.getElementById('quiz-question').textContent = `What does "${q.word}" mean?`;
  document.getElementById('quiz-count').textContent = quizIndex + 1;
  document.getElementById('quiz-result').textContent = '';
  document.getElementById('quiz-result').className = 'quiz-result';
  document.getElementById('quiz-next-btn').classList.add('hidden');
  quizAnswered = false;

  const container = document.getElementById('quiz-options');
  container.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option';
    btn.textContent = opt;
    btn.onclick = () => answerQuiz(opt);
    container.appendChild(btn);
  });
}

function answerQuiz(selected) {
  if (quizAnswered) return;
  quizAnswered = true;

  const q = quizQuestions[quizIndex];
  const options = document.querySelectorAll('.quiz-option');

  options.forEach(btn => {
    btn.classList.add('disabled');
    if (btn.textContent === q.answer) btn.classList.add('correct');
    if (btn.textContent === selected && selected !== q.answer) btn.classList.add('wrong');
  });

  const resultEl = document.getElementById('quiz-result');
  if (selected === q.answer) {
    quizScore++;
    document.getElementById('quiz-score').textContent = quizScore;
    resultEl.textContent = '✓ Correct!';
    resultEl.className = 'quiz-result correct-text';
  } else {
    resultEl.textContent = `✗ Wrong! The answer was: ${q.answer}`;
    resultEl.className = 'quiz-result wrong-text';
  }

  markSeen(q.category || document.getElementById('quiz-category-select').value, q.word);

  document.getElementById('quiz-next-btn').classList.remove('hidden');
}

function nextQuizQuestion() {
  quizIndex++;
  if (quizIndex >= quizQuestions.length) {
    finishQuiz();
  } else {
    showQuizQuestion();
  }
}

function finishQuiz() {
  document.getElementById('quiz-question').textContent = `Quiz Complete! You scored ${quizScore} / ${quizQuestions.length}!`;
  document.getElementById('quiz-options').innerHTML = '';
  document.getElementById('quiz-result').textContent = '';
  document.getElementById('quiz-next-btn').classList.add('hidden');
  document.getElementById('quiz-count').textContent = quizQuestions.length;

  showConfetti(quizScore, quizQuestions.length);
}

function showConfetti(score, total) {
  const pct = score / total;
  if (pct < 0.5) return;
  const container = document.getElementById('quiz-area');
  for (let i = 0; i < 30; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = `
      position: fixed;
      top: -10px;
      left: ${Math.random() * 100}vw;
      width: 8px;
      height: 8px;
      background: hsl(${Math.random() * 360}, 80%, 60%);
      border-radius: 50%;
      pointer-events: none;
      animation: confettiFall ${1.5 + Math.random() * 2}s linear forwards;
      z-index: 999;
    `;
    document.body.appendChild(dot);
    setTimeout(() => dot.remove(), 4000);
  }
}

const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
  @keyframes confettiFall {
    to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
  }
`;
document.head.appendChild(confettiStyle);

// ============ PROGRESS ============

function renderProgress() {
  let totalSeen = 0;
  let totalWords = 0;

  const statsContainer = document.getElementById('progress-stats');
  const barsContainer = document.getElementById('progress-bars');

  let statsHTML = '';
  let barsHTML = '';

  for (const cat in vocabulary) {
    const words = vocabulary[cat];
    totalWords += words.length;
    let seenCount = 0;
    if (progress[cat]) {
      words.forEach(w => {
        if (progress[cat][w.de]) seenCount++;
      });
    }
    totalSeen += seenCount;
    const pct = Math.round((seenCount / words.length) * 100);

    barsHTML += `
      <div class="progress-category">
        <span class="cat-name">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
          <span class="progress-bar-text">${seenCount}/${words.length}</span>
        </div>
      </div>
    `;
  }

  const overallPct = totalWords ? Math.round((totalSeen / totalWords) * 100) : 0;

  statsHTML = `
    <div class="stat-card">
      <div class="stat-number">${totalSeen}</div>
      <div class="stat-label">Words Seen</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">${totalWords}</div>
      <div class="stat-label">Total Words</div>
    </div>
    <div class="stat-card">
      <div class="stat-number">${overallPct}%</div>
      <div class="stat-label">Progress</div>
    </div>
  `;

  statsContainer.innerHTML = statsHTML;
  barsContainer.innerHTML = barsHTML;
}

function resetProgress() {
  if (confirm('Are you sure you want to reset all progress?')) {
    progress = {};
    for (const cat in vocabulary) {
      progress[cat] = {};
    }
    saveProgress();
    renderProgress();
  }
}

// ============ NAVIGATION ============

document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active-view'));
    document.getElementById(btn.dataset.view + '-view').classList.add('active-view');

    if (btn.dataset.view === 'progress') renderProgress();
  });
});

document.getElementById('category-select').addEventListener('change', (e) => {
  loadCategory(e.target.value);
});

// Init
loadCategory('greetings');
