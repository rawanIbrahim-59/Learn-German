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

// ============ CHAT ============

function sendChat() {
  const input = document.getElementById('chat-input');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addChatMessage('user', text);
  setTimeout(() => handleChatResponse(text), 300);
}

function addChatMessage(role, html) {
  const container = document.getElementById('chat-messages');
  const msg = document.createElement('div');
  msg.className = `chat-msg ${role}`;
  const sender = role === 'user' ? 'You' : 'Tutor';
  msg.innerHTML = `<span class="msg-sender">${sender}</span><span class="msg-text">${html}</span>`;
  container.appendChild(msg);
  container.scrollTop = container.scrollHeight;
}

function handleChatResponse(input) {
  const lower = input.toLowerCase().trim();
  let reply = '';

  // Greetings
  if (/^(hi|hello|hey|hallo|moin|grüß gott|servus)\b/.test(lower)) {
    reply = 'Hallo! 👋 I\'m your German tutor. Ask me about any word, like "What does <b>danke</b> mean?" or "How do you say <b>thank you</b> in German?"';
  } else if (/^(bye|tschüss|goodbye|farewell|auf wiedersehen)\b/.test(lower)) {
    reply = 'Tschüss! 👋 Keep practicing and you\'ll learn German in no time!';
  } else if (/^(thanks|thank you|danke)\b/.test(lower)) {
    reply = 'Bitte! 😊 Happy to help!';
  } else if (/^(help|what can you do|commands)\b/.test(lower)) {
    reply = 'Here\'s what I can do:<br>• <b>"What does [word] mean?"</b> — translate German→English<br>• <b>"How do you say [word] in German?"</b> — translate English→German<br>• <b>"Show me all [category]"</b> — list words in a category<br>• <b>"What\'s in the [category] category?"</b> — same thing<br>• Categories: greetings, numbers, colors, food, places, verbs, phrases';
  } else {
    reply = searchVocabulary(input);
  }

  addChatMessage('bot', reply);
}

function searchVocabulary(input) {
  const lower = input.toLowerCase().trim();

  // Check for "show me all X" or "what's in the X category"
  const catMatch = lower.match(/(?:show me all|what'?s? in the|list|words in)\s+(\w+)/);
  if (catMatch) {
    const catName = catMatch[1];
    const cat = findCategoryKey(catName);
    if (cat) {
      const words = vocabulary[cat];
      return formatCategoryList(cat, words);
    }
  }

  // Check for "what does X mean?" or "meaning of X" or "translate X"
  const deQuery = lower.match(/(?:what does|meaning of|translate|define)\s+["“]?([a-zA-ZäöüßÄÖÜ\s-]+)["”]?/);
  if (deQuery) {
    const word = deQuery[1].trim();
    const result = findGermanWord(word);
    if (result) return formatWordResult(result);
  }

  // Check for "how do you say X in German?" or "X in German"
  const enQuery = lower.match(/(?:how do you say|what is|say)\s+["“]?([a-zA-Z\s-]+)["”]?\s+(?:in German|auf Deutsch)/);
  if (enQuery) {
    const word = enQuery[1].trim();
    const result = findEnglishWord(word);
    if (result) return formatWordResult(result);
  }

  // Just a single word - try to find it
  const singleWord = lower.replace(/[^a-zA-ZäöüßÄÖÜ\s-]/g, '').trim();
  if (singleWord && singleWord.split(/\s+/).length <= 4) {
    // Try German first
    const deResult = findGermanWord(singleWord);
    if (deResult) return formatWordResult(deResult);
    // Try English
    const enResult = findEnglishWord(singleWord);
    if (enResult) return formatWordResult(enResult);
  }

  return 'Sorry, I couldn\'t find that word. Try:<br>• <b>"What does Hallo mean?"</b><br>• <b>"How do you say water in German?"</b><br>• <b>"Show me all colors"</b><br>• Type <b>"help"</b> for all commands.';
}

function findCategoryKey(name) {
  const catMap = {
    greeting: 'greetings', greetings: 'greetings', greet: 'greetings',
    number: 'numbers', numbers: 'numbers', num: 'numbers',
    color: 'colors', colors: 'colors', farbe: 'colors', farben: 'colors',
    food: 'food', foods: 'food', 'food & drink': 'food', essen: 'food', drink: 'food', drinks: 'food',
    place: 'places', places: 'places', ort: 'places', orte: 'places',
    verb: 'verbs', verbs: 'verbs', verben: 'verbs',
    phrase: 'phrases', phrases: 'phrases', 'common phrases': 'phrases', phrasen: 'phrases',
    all: 'all'
  };
  return catMap[name] || null;
}

function findGermanWord(query) {
  const q = query.toLowerCase().trim();
  for (const cat in vocabulary) {
    for (const w of vocabulary[cat]) {
      if (w.de.toLowerCase() === q || w.de.toLowerCase().replace(/\.{3,}/g, '').trim() === q) {
        return { ...w, category: cat };
      }
    }
  }
  // Partial match
  for (const cat in vocabulary) {
    for (const w of vocabulary[cat]) {
      if (w.de.toLowerCase().includes(q)) {
        return { ...w, category: cat };
      }
    }
  }
  return null;
}

function findEnglishWord(query) {
  const q = query.toLowerCase().trim();
  for (const cat in vocabulary) {
    for (const w of vocabulary[cat]) {
      const en = w.en.toLowerCase();
      if (en === q || en.startsWith(q) || en.includes(q)) {
        return { ...w, category: cat };
      }
    }
  }
  return null;
}

function formatWordResult(word) {
  const catDisplay = word.category.charAt(0).toUpperCase() + word.category.slice(1);
  const de = word.de;
  const en = word.en;
  return `<b>${de}</b> <span class="speak-inline" onclick="speakText('${de.replace(/'/g, "\\'")}')" title="Listen">🔊</span><br>→ ${en}<br><small style="color:#888;">Category: ${catDisplay}</small>`;
}

function speakText(text) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = 0.85;
  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find(v => v.lang.startsWith('de'));
  if (germanVoice) utterance.voice = germanVoice;
  window.speechSynthesis.speak(utterance);
}

function formatCategoryList(cat, words) {
  let html = `<b>${cat.charAt(0).toUpperCase() + cat.slice(1)}</b> (${words.length} words):<br>`;
  words.forEach((w, i) => {
    html += `${i + 1}. <b>${w.de}</b> <span class="speak-inline" onclick="speakText('${w.de.replace(/'/g, "\\'")}')" title="Listen">🔊</span> — ${w.en}<br>`;
  });
  return html;
}

// Enter to send
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') sendChat();
  });
});

// ============ SPEECH RECOGNITION (RECORDING) ============

let isRecording = false;
let recognition = null;

function startRecording() {
  if (isRecording) return;
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    showSpeakResult('Speech recognition not supported in this browser. Try Chrome or Edge.', 'error');
    return;
  }

  if (recognition) recognition.abort();

  recognition = new SpeechRecognition();
  recognition.lang = 'de-DE';
  recognition.continuous = false;
  recognition.interimResults = false;

  showSpeakResult('🎤 Listening... Speak the German word', 'listening');
  document.getElementById('record-btn').classList.add('recording');
  isRecording = true;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim().toLowerCase();
    const target = currentCards.length > 0 ? currentCards[currentIndex].de.toLowerCase() : '';
    evaluatePronunciation(transcript, target);
    stopRecording();
  };

  recognition.onerror = (event) => {
    if (event.error === 'no-speech') {
      showSpeakResult('No speech detected. Try again.', 'error');
    } else if (event.error === 'not-allowed') {
      showSpeakResult('Microphone access denied. Please allow microphone access.', 'error');
    } else {
      showSpeakResult(`Error: ${event.error}. Try again.`, 'error');
    }
    stopRecording();
  };

  recognition.onend = () => {
    if (isRecording) {
      showSpeakResult('Didn\'t catch that. Try again.', 'error');
      stopRecording();
    }
  };

  try {
    recognition.start();
  } catch (e) {
    showSpeakResult('Failed to start recording. Try again.', 'error');
    stopRecording();
  }
}

function stopRecording() {
  isRecording = false;
  document.getElementById('record-btn').classList.remove('recording');
  if (recognition) {
    try { recognition.abort(); } catch (e) {}
  }
}

function evaluatePronunciation(spoken, target) {
  if (!target) {
    showSpeakResult('No word to compare. Select a flashcard first.', 'error');
    return;
  }

  const spokenClean = spoken.replace(/[^a-zA-ZäöüßÄÖÜ\s-]/g, '').trim();
  const targetClean = target.replace(/[^a-zA-ZäöüßÄÖÜ\s-]/g, '').trim();

  if (spokenClean === targetClean) {
    showSpeakResult(`✅ Perfect! You said: <span class="word-compare">${spokenClean}</span>`, 'success');
    markSeen(currentCategory, currentCards[currentIndex].de);
    return;
  }

  const similarity = stringSimilarity(spokenClean, targetClean);

  const targetWords = targetClean.split(/\s+/);
  const spokenWords = spokenClean.split(/\s+/);
  let anyMatch = false;
  targetWords.forEach(tw => {
    spokenWords.forEach(sw => {
      if (sw === tw || stringSimilarity(sw, tw) > 0.7) anyMatch = true;
    });
  });

  if (similarity > 0.7 || anyMatch) {
    showSpeakResult(`🟡 Close! You said "<span class="word-compare">${spokenClean}</span>" — target: <span class="word-compare">${targetClean}</span>`, 'partial');
  } else {
    showSpeakResult(`❌ You said "<span class="word-compare">${spokenClean}</span>" — expected: <span class="word-compare">${targetClean}</span>`, 'error');
  }
}

function stringSimilarity(a, b) {
  const longer = a.length >= b.length ? a : b;
  const shorter = a.length < b.length ? a : b;
  if (longer.length === 0) return 1.0;
  const edits = levenshtein(a, b);
  return 1 - edits / longer.length;
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function showSpeakResult(msg, type) {
  const el = document.getElementById('speak-result');
  el.innerHTML = msg;
  el.className = `speak-result ${type}`;
  el.classList.remove('hidden');
}

// ============ GERMAN ERROR CORRECTION ============

const germanArticles = { der: 'masculine', die: 'feminine', das: 'neuter', den: 'masculine-acc', dem: 'masculine-dat', des: 'masculine-gen' };

const articleNounMap = {
  wasser: 'das', kaffee: 'der', tee: 'der', bier: 'das', wein: 'der',
  brot: 'das', milch: 'die', käse: 'der', apfel: 'der', banane: 'die',
  reis: 'der', fisch: 'der', fleisch: 'das', kuchen: 'der',
  bahnhof: 'der', flughafen: 'der', krankenhaus: 'das', schule: 'die',
  universität: 'die', kirche: 'die', museum: 'das', park: 'der',
  restaurant: 'das', hotel: 'das', supermarkt: 'der', apotheke: 'die',
  mann: 'der', frau: 'die', kind: 'das', haus: 'das', buch: 'das',
  hund: 'der', katze: 'die', auto: 'das', tisch: 'der', stuhl: 'der',
  tür: 'die', fenster: 'das', name: 'der', tag: 'der', nacht: 'die',
  morgen: 'der', abend: 'der', woche: 'die', monat: 'der', jahr: 'das',
  stadt: 'die', land: 'das', straße: 'die', platz: 'der', garten: 'der',
  wasser: 'das', himmel: 'der', erde: 'die', sonne: 'die', mond: 'der',
  liebe: 'die', zeit: 'die', arbeit: 'die', geld: 'das', glück: 'das',
  leben: 'das', tod: 'der', problem: 'das', frage: 'die', antwort: 'die'
};

function correctGerman(text) {
  const corrections = [];
  let corrected = text;

  // 1. Check noun capitalization (nouns should be capitalized in German)
  const nounSuffixes = ['ung', 'heit', 'keit', 'ion', 'tum', 'schaft', 'nis', 'ling', 'chen', 'lein', 'tät', 'ur', 'ik', 'e', 'er', 'el', 'en'];
  const words = text.split(/\s+/);
  words.forEach((word, i) => {
    const clean = word.replace(/[^a-zA-ZäöüßÄÖÜ]/g, '');
    if (clean.length < 2) return;
    // Check if it's a known German noun (starts lowercase but should be uppercase)
    const lower = clean.toLowerCase();
    if (clean[0] === clean[0].toLowerCase() && lower !== clean) return; // mixed case, skip
    if (clean[0] === clean[0].toLowerCase()) {
      // Check common noun patterns
      const isLikelyNoun = nounSuffixes.some(suf => lower.endsWith(suf))
        || articleNounMap[lower]
        || (lower.endsWith('en') && vocabulary.verbs && !vocabulary.verbs.some(v => v.de.toLowerCase().replace(/\.{3,}/, '').trim() === lower));
      // Also check if it's in our vocabulary as a German word (nouns)
      let inVocab = false;
      for (const cat in vocabulary) {
        for (const w of vocabulary[cat]) {
          if (w.de.toLowerCase().replace(/\.{3,}/, '').trim() === lower) {
            inVocab = true;
            break;
          }
        }
        if (inVocab) break;
      }
      if (isLikelyNoun || inVocab) {
        const capped = clean.charAt(0).toUpperCase() + clean.slice(1);
        if (word !== capped) {
          corrections.push(`Capitalize noun "${clean}" → "${capped}"`);
          corrected = corrected.replace(word, capped);
        }
      }
    }
  });

  // 2. Check article-noun agreement
  const articlePattern = /\b(der|die|das|den|dem|des|ein|eine|einen|einem|eines)\s+([a-zA-ZäöüßÄÖÜ]+)\b/gi;
  let match;
  while ((match = articlePattern.exec(corrected)) !== null) {
    const article = match[1].toLowerCase();
    const noun = match[2].toLowerCase();
    const expectedArticle = articleNounMap[noun];
    if (expectedArticle && article !== expectedArticle) {
      corrections.push(`Article for "${noun}" should be "${expectedArticle}" not "${article}"`);
    }
  }

  // 3. Common spelling mistakes (ss vs ß)
  const ssPatterns = [
    ['dass', 'daß'], ['muss', 'muß'], ['weiss', 'weiß'], ['gross', 'groß'],
    ['strasse', 'straße'], ['gruss', 'gruß'], ['fuss', 'fuß'], ['schloss', 'schloß'],
    ['heissen', 'heißen'], ['grüssen', 'grüßen'], ['stresse', 'straße'],
    ['bisschen', 'bißchen'], ['class', 'claß']
  ];
  ssPatterns.forEach(([wrong, right]) => {
    const re = new RegExp('\\b' + wrong + '\\b', 'gi');
    if (re.test(corrected)) {
      corrections.push(`Spelling: "${wrong}" → "${right}"`);
      corrected = corrected.replace(re, right);
    }
  });

  return { corrected, corrections };
}

function isProbablyGerman(text) {
  const germanChars = /[äöüßÄÖÜ]/;
  if (germanChars.test(text)) return true;
  const words = text.toLowerCase().split(/\s+/);
  const germanWords = new Set(['der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen',
    'und', 'oder', 'aber', 'mit', 'von', 'zu', 'auf', 'in', 'aus', 'bei', 'nach', 'für',
    'ich', 'du', 'er', 'sie', 'es', 'wir', 'ihr', 'sie', 'mich', 'dich',
    'ist', 'bin', 'bist', 'sind', 'seid', 'war', 'waren',
    'hat', 'hast', 'haben', 'habe', 'hatte',
    'nicht', 'kein', 'keine', 'nein', 'ja', 'doch',
    'hallo', 'tschüss', 'danke', 'bitte', 'guten', 'gute', 'gut',
    'wie', 'was', 'wo', 'wer', 'wann', 'warum', 'wieviel',
    'mein', 'meine', 'dein', 'deine', 'sein', 'seine', 'ihr', 'ihre',
    'der', 'die', 'das', 'den', 'dem', 'des', 'ein', 'eine', 'einen']);
  const germanStopCount = words.filter(w => germanWords.has(w)).length;
  return germanStopCount >= 1;
}

// Integrate correction into chat
const originalHandleChatResponse = handleChatResponse;
handleChatResponse = function(input) {
  const lower = input.toLowerCase().trim();

  // Check for explicit correction request
  if (/^(correct|check|fix|grammar|korrigieren)\s*:\s*/.test(lower) ||
      /^(correct|check|fix|grammar|korrigieren)\s+/.test(lower)) {
    const text = input.replace(/^(correct|check|fix|grammar|korrigieren)\s*:\s*/i, '').trim();
    const result = correctGerman(text);
    let reply = '';
    if (result.corrections.length > 0) {
      reply = `✏️ Corrections for: "${text}"<br>`;
      result.corrections.forEach(c => { reply += `• ${c}<br>`; });
      reply += `<br>✅ Corrected: <b>${result.corrected}</b>`;
    } else {
      reply = `✅ Looks good! No errors found in: <b>${text}</b>`;
    }
    addChatMessage('bot', reply);
    return;
  }

  // Auto-detect German text and offer correction
  if (isProbablyGerman(input) && input.split(/\s+/).length >= 2) {
    const result = correctGerman(input);
    if (result.corrections.length > 0) {
      let reply = `✏️ I noticed some issues:<br>`;
      result.corrections.forEach(c => { reply += `• ${c}<br>`; });
      reply += `<br>✅ Corrected: <b>${result.corrected}</b>`;
      addChatMessage('bot', reply);
      return;
    }
  }

  // Fall through to original handler
  originalHandleChatResponse(input);
};

// ============ SPEECH ============

function speak(elementId) {
  const text = document.getElementById(elementId).textContent.replace('🔊', '').trim();
  if (!text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'de-DE';
  utterance.rate = 0.85;
  utterance.pitch = 1;
  const voices = window.speechSynthesis.getVoices();
  const germanVoice = voices.find(v => v.lang.startsWith('de'));
  if (germanVoice) utterance.voice = germanVoice;
  window.speechSynthesis.speak(utterance);
}

// Init
loadCategory('greetings');
