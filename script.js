// Mobile menu toggle
const menuBtn = document.getElementById('menuBtn');
const navLinks = document.querySelector('.nav-links');
if (menuBtn) menuBtn.addEventListener('click', () => navLinks.classList.toggle('active'));

// Signup & Login (localStorage)
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');

if (signupForm){
  signupForm.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const password = document.getElementById('signupPassword').value.trim();
    if (!name || !email || !password){ alert('Please fill all fields'); return; }
    const user = { name, email, password };
    localStorage.setItem('gymUser', JSON.stringify(user));
    alert('Signup successful. Please login.');
    window.location.href = 'login.html';
  });
}

if (loginForm){
  loginForm.addEventListener('submit', function(e){
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    const user = JSON.parse(localStorage.getItem('gymUser'));
    if (!user){ alert('No user found. Please signup.'); return; }
    if (user.email === email && user.password === password){
      alert('Login successful');
      window.location.href = 'index.html';
    } else {
      alert('Email or password incorrect');
    }
  });
}

// Attendance - store names with dates
const markBtn = document.getElementById('markAttendance');
const attendanceList = document.getElementById('attendanceList');
if (markBtn){
  markBtn.addEventListener('click', function(){
    const nameInput = document.getElementById('memberName');
    const name = nameInput.value.trim();
    if (!name){ alert('Enter member name'); return; }
    const records = JSON.parse(localStorage.getItem('attendance')) || [];
    const today = new Date().toLocaleDateString();
    records.push({ name, date: today });
    localStorage.setItem('attendance', JSON.stringify(records));
    alert('Attendance marked for ' + name);
    nameInput.value = '';
    renderAttendance();
  });
}

function renderAttendance(){
  if (!attendanceList) return;
  attendanceList.innerHTML = '';
  const records = JSON.parse(localStorage.getItem('attendance')) || [];
  records.forEach(r => {
    const li = document.createElement('li');
    li.textContent = r.date + ' — ' + r.name;
    attendanceList.appendChild(li);
  });
}
renderAttendance();

// BMI Calculator
const bmiForm = document.getElementById('bmiForm');
const bmiResult = document.getElementById('bmiResult');
if (bmiForm){
  bmiForm.addEventListener('submit', function(e){
    e.preventDefault();
    const h = parseFloat(document.getElementById('height').value);
    const w = parseFloat(document.getElementById('weight').value);
    if (!h || !w){ alert('Enter valid numbers'); return; }
    const bmi = (w / ((h/100)*(h/100))).toFixed(2);
    let status = '';
    if (bmi < 18.5) status = 'Underweight';
    else if (bmi < 24.9) status = 'Normal';
    else if (bmi < 29.9) status = 'Overweight';
    else status = 'Obese';
    bmiResult.innerHTML = 'Your BMI: <strong>' + bmi + '</strong> (' + status + ')';
  });
}

// Fitness Tips on Home Page
const tipsContainer = document.getElementById('fitnessTips');
if (tipsContainer){
  const tips = [
    "💪 Consistency is Key: Regular workouts are more effective than intense sporadic sessions",
    "🥗 Nutrition Matters: Fuel your body with balanced meals to maximize results",
    "😴 Rest & Recovery: Proper sleep and recovery prevent injuries and improve performance",
    "🏃 Mix Cardio & Strength: Balance cardio and strength exercises for optimal fitness",
    "💧 Hydration: Drink enough water before, during, and after workouts"
  ];
  tips.forEach(t => {
    const p = document.createElement('p');
    p.textContent = t;
    tipsContainer.appendChild(p);
  });
}

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.fade-in');
function showOnScroll(){
  fadeEls.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight * 0.85) el.classList.add('visible');
  });
}
window.addEventListener('scroll', showOnScroll);
showOnScroll();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Trainer card hover effect
document.querySelectorAll('.trainer-card').forEach(card => {
  card.addEventListener('mouseenter', () => card.classList.add('hovered'));
  card.addEventListener('mouseleave', () => card.classList.remove('hovered'));
});
