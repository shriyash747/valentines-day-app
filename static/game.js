const SECRET = "Pillu";
const PASSWORD_HINT = "Hint: my nickname for you when we were small 💌";

// Romantic messages for each quiz question
const romanticMessages = [
    "1️⃣ I still remember the 1st time we met when we entered the relationship. I was really excited to meet you.",
    "2️⃣ I have enjoyed each day with you and will enjoy many. No matter what happens. I can't live without you.",
    "3️⃣ Sorry I disturb you a lot, butttt that's my fav timepass :p",
    "4️⃣ I feel happy when you are happy and I want to always see you happy.",
    "5️⃣ I am so proud of you that you can't believe, the things you have achieved in Germany as well as in India are just commendable",
    "6️⃣ I will always be by your side, care for you, make you feel safe, disturb you hahaha, uplift you. Love you a lot Niki ❤️"
];

// Quiz questions with **correct answer index**
const questions = [
    { q:"Where did we meet? 💕", options:["Library","Class","Park","Café"], correct:1 },
    { q:"Which park did we go to when we first met in Pune? 🌳", options:["Shivaji Park","Sarasbaug","Koregaon Park","Pashan Lake"], correct:1 },
    { q:"Where did we first eat in Pune? 🍴", options:["Pizza Hut","Domino's","KFC","McDonald's"], correct:2 },
    { q:"Which dress I used to like most? 👗", options:["Red","Blue","Brown/Black","Green"], correct:2 },
    { q:"What is my favorite dish? 😋", options:["Pizza","Biryani","Pasta","Salad"], correct:1 },
    { q:"Best trip with me? ✈️", options:["Swiss","Malta","Austria","France","Everywhere you take me ❤️"], correct:4 },
    { q:"What do I like most about you? 😘", options:["Cheeks","Lips","Hand","Tongue out 😜"], correct:3 }
];

let currentQ = 0;
let messagesShown = 0;

// --- PASSWORD UNLOCK ---
function unlock(){
    const val = document.getElementById("password").value;
    if(val === SECRET){
        document.getElementById("welcome").style.display = "none";
        playMusic();
        document.getElementById("hint").style.display = "block";
    } else {
        document.getElementById("error").innerText = PASSWORD_HINT;
    }
}

function playMusic(){
    const music = document.getElementById("bgMusic");
    music.volume = 0.4;
    music.play().catch(()=>{});
}

// --- START QUIZ ---
function startQuiz(){
    document.getElementById("hint").style.display = "none";
    const gameDiv = document.getElementById("game");
    gameDiv.style.display = "block";
    gameDiv.innerHTML = `
        <p style="font-size:18px; color:#ff4d6d; margin-bottom:20px;">💖 Let's start a small game 💖</p>
        <h2 id="question"></h2>
        <div id="options"></div>
        <p id="romanticMessage" style="margin-top:20px; min-height:80px; color:#ff4d6d;"></p>
    `;
    showQuestion();
}

// --- SHOW QUIZ QUESTION ---
function showQuestion(){
    const q = questions[currentQ];
    document.getElementById("question").innerText = q.q;
    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((opt, idx)=>{
        const btn = document.createElement("button");
        btn.innerText = opt;
        btn.onclick = ()=> checkAnswer(idx);
        optionsDiv.appendChild(btn);
    });

    // Show romantic message
    const msgDiv = document.getElementById("romanticMessage");
    msgDiv.innerText = romanticMessages[messagesShown] || "";
}

// --- CHECK QUIZ ANSWER ---
function checkAnswer(selectedIdx){
    const correctIdx = questions[currentQ].correct;
    const msgDiv = document.getElementById("romanticMessage");

    if(selectedIdx === correctIdx){
        // Correct → move to next question
        messagesShown++;
        currentQ++;
        if(currentQ < questions.length){
            showQuestion();
        } else {
            showFinalSurprise();
        }
    } else {
        // Wrong → cute retry message
        msgDiv.innerText = "Oops 😅, try again! I know you can do it 💖";
    }
}

// --- FINAL PAGE STATIC ---
function showFinalSurprise(){
    const game = document.getElementById("game");
    game.innerHTML = `
        <h2 style="font-size:28px; color:#ff2f59;">YOU WON MY HEART 💘</h2>
        <p style="color:#ff4d6d; margin-bottom:20px;">Now choose your dress, dinner, and gift 🎁</p>

        <h3>👗 Dress</h3>
        <div id="dressOptions">
            <button onclick="chooseDress('H&M')">H&M</button>
            <button onclick="chooseDress('C&A')">C&A</button>
            <button onclick="chooseDress('Primark')">Primark</button>
        </div>
        <p id="dressMessage" style="color:#ff4d6d; margin-top:10px;"></p>

        <h3>🍽️ Dinner</h3>
        <div id="dinnerOptions">
            <button onclick="chooseDinner('German')">German</button>
            <button onclick="chooseDinner('Asian')">Asian</button>
            <button onclick="chooseDinner('Indian')">Indian</button>
        </div>
        <p id="dinnerMessage" style="color:#ff4d6d; margin-top:10px;"></p>

        <h3>🎁 Gift you want</h3>
        <div id="giftOptions">
            <button onclick="chooseGift('Zweibrücken/Mitzingen')">Zweibrücken/Mitzingen</button>
            <button onclick="chooseGift('Electric Toothbrush')">Electric Toothbrush</button>
        </div>
        <p id="giftMessage" style="color:#ff4d6d; margin-top:10px;"></p>
    `;
    launchConfetti();
    startBackgroundGradientAnimation();
}

// --- FINAL PAGE MESSAGES ---
function chooseDress(store){
    const msg = document.getElementById("dressMessage");
    if(store === "H&M") msg.innerText = "Let’s buy a cute dress for the cutie from H&M 💖";
    if(store === "C&A") msg.innerText = "C&A has some lovely outfits for my sweetheart 😍";
    if(store === "Primark") msg.innerText = "Yay! A fun Primark shopping for the cutest girl 💕";
}

function chooseDinner(type){
    const msg = document.getElementById("dinnerMessage");
    if(type === "German") msg.innerText = "Yummy! We will enjoy a German feast together 🍽️❤️";
    if(type === "Asian") msg.innerText = "Amazing! Some Asian delights for my love 😋";
    if(type === "Indian") msg.innerText = "Spicy & delicious Indian dinner coming up for my darling 🌶️💖";
}

function chooseGift(gift){
    const msg = document.getElementById("giftMessage");
    if(gift === "Zweibrücken/Mitzingen") msg.innerText = "Adventure time! We will go to Zweibrücken/Mitzingen together 🎁💖";
    if(gift === "Electric Toothbrush") msg.innerText = "Perfect! You’ll have a sparkling smile 😁💖";
}

// --- HEARTS ---
function createHeart(){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "❤️";
    heart.style.left = Math.random()*100+"vw";
    heart.style.fontSize = (20+Math.random()*20)+"px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),6000);
}
setInterval(createHeart,600);

// --- CONFETTI ---
function launchConfetti(){
    for(let i=0;i<100;i++){
        const conf = document.createElement("div");
        conf.innerText = "💖";
        conf.style.position = "fixed";
        conf.style.left = Math.random()*100+"vw";
        conf.style.top = "-10px";
        conf.style.fontSize = "20px";
        conf.style.animation = "fall 3s linear";
        document.body.appendChild(conf);
        setTimeout(()=>conf.remove(),3000);
    }
}

// --- BACKGROUND GRADIENT ---
function startBackgroundGradientAnimation(){
    let angle = 0;
    setInterval(()=>{
        document.body.style.background = `linear-gradient(${angle}deg, #ff4d6d, #ff9a9e, #ffb6c1, #ff6fa1)`;
        angle+=1;
        if(angle>=360) angle=0;
    },100);
}
