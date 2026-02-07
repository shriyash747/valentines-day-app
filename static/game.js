const SECRET = "Pillu";
const PASSWORD_HINT = "Hint: my nickname for you when we were small 💌, Starts with 16th alphabet 😋 ";

// Romantic messages for each quiz question
const romanticMessages = [
    "1️⃣ I still remember the 1st time we met when we entered the relationship. I was really excited to meet you.",
    "2️⃣ I have enjoyed each day with you and will enjoy many. No matter what happens. I can't live without you.",
    "3️⃣ Sorry I disturb you a lot, butttt that's my fav timepass :p",
    "4️⃣ I feel happy when you are happy and I want to always see you happy.",
    "5️⃣ I am so proud of you that you can't believe, the things you have achieved in Germany as well as in India are just commendable",
    "6️⃣ I will always be by your side, care for you, make you feel safe, disturb you hahaha, uplift you. Love you a lot Niki ❤️",
    "7️⃣ I love your sense of fashion, even though you always end up with more socks than you need! 🧦😄❤️",
    "8️⃣ Those drives together were so fun, and you always kept me on my toes! 😂💕",
    "9️⃣ I miss those hungry late-night runs to grab a quick bite together. Those were the best moments! 🌵❤️"
];

// Quiz questions with **correct answer index**
const questions = [
    { q:"Where did we meet? 💕", options:["Library","Class","Park","Café"], correct:1 },
    { q:"Which park did we go to when we first met in Pune? 🌳", options:["Shivaji Park","Sarasbaug","Koregaon Park","Pashan Lake"], correct:1 },
    { q:"Where did we first eat in Pune? 🍴", options:["Pizza Hut","Domino's","KFC","McDonald's"], correct:2 },
    { q:"Which dress I used to like most? 👗", options:["Red","Blue","Brown/Black","Green"], correct:2 },
    { q:"What is my favorite dish? 😋", options:["Pizza","Pasta","Salad","Chinese"], correct:3 },
    { q:"Best trip with me? ✈️", options:["Swiss","Malta","Austria","France","Everywhere you take me ❤️"], correct:4 },
    { q:"What do I like most about you? 😘", options:["Cheeks","Lips","Hand","Tongue out 😜"], correct:3 },
    { q:"What is this you like to buy most and I like to remove most? ", options:["Socks","Shoes","Jeans","Shirts"], correct:0, isTyping:true, answerText:"Socks", hint:"It starts with S... you love them!" },
    { q:"Something you use to do when I use to drive? ", isTyping:true, answerText:"Pinch", hint:"which your mother use to do to you when you were small and when you use to ask others for food." },
    { q:"What was our fav go to place when we use to be hungry? ", isTyping:true, answerText:"Mcd", hint:"place where a person wears red hair." }
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

    // Check if this is a typing question
    if(q.isTyping){
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = "Type your answer here...";
        input.style.width = "80%";
        input.style.padding = "10px";
        input.style.fontSize = "16px";
        input.style.borderRadius = "8px";
        input.style.border = "2px solid #ff4d6d";
        input.style.textAlign = "center";
        input.id = "typingInput";
        optionsDiv.appendChild(input);
        
        const submitBtn = document.createElement("button");
        submitBtn.innerText = "Submit ➡️";
        submitBtn.style.marginTop = "10px";
        submitBtn.onclick = ()=>{
            const answer = input.value.trim();
            checkTypedAnswer(answer, q.answerText);
        };
        optionsDiv.appendChild(submitBtn);
        
        // Allow Enter key to submit
        input.addEventListener("keypress", (e)=>{
            if(e.key === "Enter"){
                const answer = input.value.trim();
                checkTypedAnswer(answer, q.answerText);
            }
        });
        setTimeout(()=>input.focus(), 100);
    } else {
        // Multiple choice
        q.options.forEach((opt, idx)=>{
            const btn = document.createElement("button");
            btn.innerText = opt;
            btn.onclick = ()=> checkAnswer(idx);
            optionsDiv.appendChild(btn);
        });
    }

    // Show romantic message
    const msgDiv = document.getElementById("romanticMessage");
    msgDiv.innerText = romanticMessages[messagesShown] || "";
}

// Check typed answer
function checkTypedAnswer(userAnswer, correctAnswer){
    const msgDiv = document.getElementById("romanticMessage");
    const q = questions[currentQ];
    if(userAnswer.toLowerCase() === correctAnswer.toLowerCase()){
        // Correct
        messagesShown++;
        currentQ++;
        if(currentQ < questions.length){
            showQuestion();
        } else {
            showFinalSurprise();
        }
    } else {
        // Wrong - give hint if available
        if(q.hint){
            msgDiv.innerText = "Oops 😅! Hint: " + q.hint;
        } else {
            msgDiv.innerText = "Oops 😅, try again! I know you can do it 💖";
        }
    }
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
        <p style="color:#ff4d6d; margin-bottom:10px;">But first, let’s head to the cozy cafe nearby — a sweet coffee and laugh will make our day even better ☕️🍰</p>
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
            <button onclick="chooseGift('Douglus, Berkinstocks')">Douglus, Berkinstocks</button>
            <button onclick="chooseGift('Electric Toothbrush')">Electric Toothbrush</button>
        </div>
        <p id="giftMessage" style="color:#ff4d6d; margin-top:10px;">Choose wisely and enjoy your gift! 🎁</p>
    `;
    // Stop floating hearts and remove any existing ones
    if(_heartInterval){
        clearInterval(_heartInterval);
        _heartInterval = null;
    }
    document.querySelectorAll('.heart').forEach(h=>h.remove());
    launchCanvasConfetti({duration:4500, particleCount:160});
    startBackgroundGradientAnimation();
}

// --- FINAL PAGE MESSAGES ---
function chooseDress(store){
    const msg = document.getElementById("dressMessage");
    if(store === "H&M") msg.innerText = "Let’s buy a cute dress for the cutie from H&M 💖";
    if(store === "C&A") msg.innerText = "C&A has some lovely outfits for my sweetheart 😍";
    if(store === "Primark") msg.innerText = "Yay! A fun Primark shopping for the cutest girl 💕";
    _selectedDress = store;
    _checkFinalChoices();
}

function chooseDinner(type){
    const msg = document.getElementById("dinnerMessage");
    if(type === "German") msg.innerText = "Yummy! We will enjoy a German feast together 🍽️❤️";
    if(type === "Asian") msg.innerText = "Amazing! Some Asian delights for my love 😋";
    if(type === "Indian") msg.innerText = "Spicy & delicious Indian dinner coming up for my darling 🌶️💖";
    _selectedDinner = type;
    _checkFinalChoices();
}

function chooseGift(gift){
    const msg = document.getElementById("giftMessage");
    if(gift === "Zweibrücken/Mitzingen") msg.innerText = "Adventure time! We will go to Zweibrücken/Mitzingen together 🎁💖";
    else if(gift === "Douglus, Berkinstocks") msg.innerText = "Sweet choice! We'll treat you to Douglus and comfy Berkinstocks for happy days 🎁💖";
    else if(gift === "Electric Toothbrush") msg.innerText = "Perfect! You'll have a sparkling smile 😁💖";
    _selectedGift = gift;
    _checkFinalChoices();
}

// Track final choices and open a new full-page Valentine message when all are selected
let _selectedDress = null;
let _selectedDinner = null;
let _selectedGift = null;
let _valentineOpened = false;

function _checkFinalChoices(){
        if(_valentineOpened) return;
        if(_selectedDress && _selectedDinner && _selectedGift){
                // Show a button to view the final message instead of opening automatically
                const existing = document.getElementById('viewLetterBtn');
                if(!existing){
                    const btn = document.createElement('button');
                    btn.id = 'viewLetterBtn';
                    btn.innerText = '💌 Open My Letter ❤️';
                    btn.style.marginTop = '20px';
                    btn.style.fontSize = '18px';
                    btn.onclick = ()=>{
                        _valentineOpened = true;
                        openValentinePage();
                    };
                    document.getElementById('game').appendChild(btn);
                }
        }
}

function openValentinePage(){
        // Render the Valentine message in the same tab (replace document)
        const html = `<!doctype html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width,initial-scale=1">
            <title>To My Beloved</title>
            <style>
                html,body{height:100%;margin:0}
                body{display:flex;align-items:center;justify-content:center;padding:20px;background:linear-gradient(120deg,#ff9a9e,#ff4d6d);font-family:Arial,Helvetica,sans-serif;color:#fff}
                .card{background:rgba(255,255,255,0.06);padding:28px;border-radius:18px;max-width:900px;text-align:center;box-shadow:0 10px 30px rgba(0,0,0,0.2)}
                h1{font-size:44px;margin:0 0 12px}
                p.lead{font-size:20px;margin:8px 0}
                .choices{margin-top:18px;font-weight:700}
                .small{font-size:14px;opacity:0.9}
            </style>
        </head>
        <body>
            <div class="card">
                <h1>To My Dearest Wife ❤️</h1>
                <p class="lead">Every day with you is a story I want to write forever.</p>
                <p class="lead">You are my comfort, my joy, and my greatest adventure.</p>
                <p class="choices">Tonight: Dress — ${escapeHtml(_selectedDress)}, Dinner — ${escapeHtml(_selectedDinner)}, Gift — ${escapeHtml(_selectedGift)}</p>
                <p class="small">May our laughter be loud, our hugs be long, and our love grow deeper every day. Happy Valentine’s Day.</p>
            </div>
            <script>
                (function(){
                    const emojis=['💖','✨','🌟','💘'];
                    const c=document.createElement('canvas');document.body.appendChild(c);c.width=innerWidth;c.height=innerHeight;c.style.position='fixed';c.style.left=0;c.style.top=0;c.style.pointerEvents='none';const ctx=c.getContext('2d');const parts=[];for(let i=0;i<120;i++){parts.push({x:Math.random()*c.width,y:Math.random()*-c.height*0.5,vx:(Math.random()-0.5)*4,vy:Math.random()*3+1,size:14+Math.random()*24,emoji:emojis[Math.floor(Math.random()*emojis.length)],rot:Math.random()*360,spin:(Math.random()-0.5)*0.2})}
                    let start=null;function draw(t){if(!start)start=t;const e=t-start;ctx.clearRect(0,0,c.width,c.height);parts.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=0.03;p.rot+=p.spin;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.rot*Math.PI/180);ctx.font=p.size+'px serif';ctx.textAlign='center';ctx.fillText(p.emoji,0,0);ctx.restore()});if(e<4200)requestAnimationFrame(draw);}requestAnimationFrame(draw);
                })();
            </script>
        </body>
        </html>`;
        document.documentElement.innerHTML = html;
}

function escapeHtml(s){
        return String(s).replace(/[&<>"']/g, function(c){
                return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"}[c];
        });
}

// --- HEARTS ---
let _heartInterval = null;
function createHeart(){
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerText = "❤️";
    heart.style.left = Math.random()*100+"vw";
    heart.style.fontSize = (20+Math.random()*20)+"px";
    document.body.appendChild(heart);
    setTimeout(()=>heart.remove(),6000);
}
_heartInterval = setInterval(createHeart,600);

// --- CANVAS CONFETTI ---
function launchCanvasConfetti({duration=4000, particleCount=120} = {}){
    const emojis = ["💖","💘","💝","💞","✨","🌟","🎉"];
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.left = 0;
    canvas.style.top = 0;
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    const particles = [];
    for(let i=0;i<particleCount;i++){
        particles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*-canvas.height*0.2,
            vx: (Math.random()-0.5)*6,
            vy: Math.random()*4+2,
            size: 16 + Math.random()*24,
            rot: Math.random()*360,
            spin: (Math.random()-0.5)*0.2,
            emoji: emojis[Math.floor(Math.random()*emojis.length)]
        });
    }

    let start = null;
    function draw(ts){
        if(!start) start = ts;
        const elapsed = ts - start;
        ctx.clearRect(0,0,canvas.width,canvas.height);
        particles.forEach(p=>{
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // gravity
            p.rot += p.spin*10;
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot*Math.PI/180);
            ctx.font = `${p.size}px serif`;
            ctx.textAlign = 'center';
            ctx.fillText(p.emoji, 0, 0);
            ctx.restore();
        });
        if(elapsed < duration){
            requestAnimationFrame(draw);
        } else {
            canvas.remove();
        }
    }
    requestAnimationFrame(draw);
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
