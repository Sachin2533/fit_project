/* MOBILE MENU */
var menuButton = document.getElementById("menuBtn");
var navigation = document.querySelector(".nav-links");
var navbar = document.querySelector(".navbar");

if (menuButton && navigation) {
  menuButton.setAttribute("aria-label", "Open navigation menu");
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", function () {
    navigation.classList.toggle("active");

    if (navigation.classList.contains("active")) {
      menuButton.textContent = "×";
      menuButton.setAttribute("aria-label", "Close navigation menu");
      menuButton.setAttribute("aria-expanded", "true");
    } else {
      closeMobileMenu();
    }
  });

  document.addEventListener("click", function (event) {
    if (!navbar.contains(event.target)) {
      closeMobileMenu();
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeMobileMenu();
    }
  });
}

function closeMobileMenu() {
  if (menuButton && navigation) {
    navigation.classList.remove("active");
    menuButton.textContent = "☰";
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.setAttribute("aria-expanded", "false");
  }
}

/* SHARED TOAST NOTIFICATIONS */
function showToast(message, type) {
  var toastContainer = document.getElementById("toastContainer");

  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "toast-container";
    toastContainer.setAttribute("aria-live", "polite");
    document.body.appendChild(toastContainer);
  }

  var toast = document.createElement("div");
  toast.className = "toast " + (type || "success");
  toast.setAttribute("role", "status");
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(function () {
    toast.classList.add("toast-hide");
    setTimeout(function () {
      toast.remove();
    }, 250);
  }, 3000);
}

/* SHARED FOOTER */
function buildFooter() {
  var footer = document.querySelector(".footer");

  if (!footer) {
    footer = document.createElement("footer");
    footer.className = "footer";
    document.body.insertBefore(footer, document.querySelector("script"));
  }

  footer.innerHTML =
    '<div class="footer-grid">' +
      '<div><a class="footer-logo" href="index.html">FitLife Gym</a><p>Simple tools, useful guidance, and motivating plans for a healthier routine.</p></div>' +
      '<div><h3>Explore</h3><a href="membership.html">Membership</a><a href="trainers.html">Trainers</a><a href="workouts.html">Workouts</a><a href="meal-plans.html">Meal Plans</a></div>' +
      '<div><h3>Tools</h3><a href="bmi.html">BMI Calculator</a><a href="attendance.html">Attendance</a><a href="contact.html">Contact Us</a></div>' +
      '<div><h3>Visit</h3><p>Mon–Sat: 6 AM–10 PM<br>Sunday: 7 AM–2 PM<br>Dharamshala, India</p></div>' +
    '</div>' +
    '<div class="footer-bottom">© 2026 FitLife Gym • Beginner HTML, CSS & JavaScript project</div>';
}

buildFooter();

/* NAVBAR SHADOW WHILE SCROLLING */
if (navbar) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  });
}

/* ACTIVE NAVIGATION LINK */
var currentPage = window.location.pathname.split("/").pop();
var navLinks = document.querySelectorAll(".nav-links a");

if (currentPage === "") {
  currentPage = "index.html";
}

for (var i = 0; i < navLinks.length; i++) {
  if (navLinks[i].getAttribute("href") === currentPage) {
    navLinks[i].classList.add("active");
  }

  navLinks[i].addEventListener("click", function () {
    closeMobileMenu();
  });
}

/* SHOW THE LOGGED-IN MEMBER */
var savedNavbarUser = JSON.parse(localStorage.getItem("gymUser"));
var isLoggedIn = localStorage.getItem("gymLoggedIn");
var accountLink = document.querySelector('.nav-links a[href="login.html"]');

if (savedNavbarUser && isLoggedIn === "true" && accountLink) {
  var firstName = savedNavbarUser.name.split(" ")[0];
  accountLink.textContent = "Hi, " + firstName + " 👋";
  accountLink.classList.add("account-link");

  accountLink.addEventListener("click", function (event) {
    event.preventDefault();
    var shouldLogout = confirm("Would you like to log out?");

    if (shouldLogout) {
      localStorage.removeItem("gymLoggedIn");
      window.location.href = "login.html";
    }
  });
}

/* SHOW OR HIDE PASSWORD */
var passwordButton = document.querySelector(".toggle-password");

if (passwordButton) {
  passwordButton.addEventListener("click", function () {
    var passwordInput = passwordButton.previousElementSibling;

    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordButton.textContent = "Hide";
    } else {
      passwordInput.type = "password";
      passwordButton.textContent = "Show";
    }
  });
}

/* SIGN UP */
var signupForm = document.getElementById("signupForm");

if (signupForm) {
  signupForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("signupName").value.trim();
    var email = document.getElementById("signupEmail").value.trim();
    var password = document.getElementById("signupPassword").value.trim();
    var user = {
      name: name,
      email: email,
      password: password
    };

    localStorage.setItem("gymUser", JSON.stringify(user));
    showToast("Account created successfully. You can now log in.", "success");
    setTimeout(function () {
      window.location.href = "login.html";
    }, 900);
  });
}

/* LOGIN */
var loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var email = document.getElementById("loginEmail").value.trim();
    var password = document.getElementById("loginPassword").value.trim();
    var savedUser = JSON.parse(localStorage.getItem("gymUser"));

    if (!savedUser) {
      showToast("Please create an account first.", "error");
    } else if (savedUser.email === email && savedUser.password === password) {
      localStorage.setItem("gymLoggedIn", "true");
      showToast("Welcome back, " + savedUser.name + "!", "success");
      setTimeout(function () {
        window.location.href = "index.html";
      }, 900);
    } else {
      showToast("The email or password is incorrect.", "error");
    }
  });
}

/* BMI CALCULATOR */
var bmiForm = document.getElementById("bmiForm");

if (bmiForm) {
  bmiForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var height = Number(document.getElementById("height").value);
    var weight = Number(document.getElementById("weight").value);

    if (height < 50 || height > 250 || weight < 10 || weight > 400) {
      showToast("Please check your height and weight.", "error");
      return;
    }

    var heightInMeters = height / 100;
    var bmi = weight / (heightInMeters * heightInMeters);
    var category = "Obese";
    var message = "Consider speaking with a healthcare professional for personal guidance.";
    var pointerPosition = "75%";

    if (bmi < 18.5) {
      category = "Underweight";
      message = "A balanced diet and professional advice may help you reach a healthy range.";
      pointerPosition = "0";
    } else if (bmi < 25) {
      category = "Healthy";
      message = "Great! Keep supporting your health with regular activity and balanced meals.";
      pointerPosition = "25%";
    } else if (bmi < 30) {
      category = "Overweight";
      message = "Small, consistent changes in movement and nutrition can make a difference.";
      pointerPosition = "50%";
    }

    var minimumWeight = 18.5 * heightInMeters * heightInMeters;
    var maximumWeight = 24.9 * heightInMeters * heightInMeters;

    document.getElementById("emptyBmiState").style.display = "none";
    document.getElementById("filledBmiState").classList.add("show");
    document.getElementById("bmiNumber").textContent = bmi.toFixed(1);
    document.getElementById("bmiCategory").textContent = category;
    document.getElementById("bmiMessage").textContent = message;
    document.getElementById("meterPointer").style.marginLeft = pointerPosition;
    document.getElementById("healthyWeight").textContent =
      minimumWeight.toFixed(1) + " – " + maximumWeight.toFixed(1) + " kg";

    var savedBmiResult = {
      height: height,
      weight: weight,
      bmi: bmi.toFixed(1),
      category: category,
      message: message,
      pointer: pointerPosition,
      healthyWeight: minimumWeight.toFixed(1) + " – " + maximumWeight.toFixed(1) + " kg"
    };
    localStorage.setItem("latestBmiResult", JSON.stringify(savedBmiResult));
    showToast("BMI result calculated and saved.", "success");
  });
}

var bmiResetButton = document.getElementById("bmiReset");

if (bmiResetButton) {
  bmiResetButton.addEventListener("click", function () {
    bmiForm.reset();
    localStorage.removeItem("latestBmiResult");
    document.getElementById("emptyBmiState").style.display = "flex";
    document.getElementById("filledBmiState").classList.remove("show");
    document.getElementById("height").focus();
  });
}

var latestBmiResult = JSON.parse(localStorage.getItem("latestBmiResult"));

if (bmiForm && latestBmiResult) {
  document.getElementById("height").value = latestBmiResult.height;
  document.getElementById("weight").value = latestBmiResult.weight;
  document.getElementById("emptyBmiState").style.display = "none";
  document.getElementById("filledBmiState").classList.add("show");
  document.getElementById("bmiNumber").textContent = latestBmiResult.bmi;
  document.getElementById("bmiCategory").textContent = latestBmiResult.category;
  document.getElementById("bmiMessage").textContent = latestBmiResult.message;
  document.getElementById("meterPointer").style.marginLeft = latestBmiResult.pointer;
  document.getElementById("healthyWeight").textContent = latestBmiResult.healthyWeight;
}

/* ATTENDANCE */
var attendanceButton = document.getElementById("markAttendance");
var attendanceList = document.getElementById("attendanceList");

function showAttendance() {
  if (!attendanceList) {
    return;
  }

  var records = JSON.parse(localStorage.getItem("attendance")) || [];
  var emptyAttendance = document.getElementById("emptyAttendance");
  var searchInput = document.getElementById("attendanceSearch");
  var filterDateInput = document.getElementById("attendanceFilterDate");
  var searchText = searchInput ? searchInput.value.trim().toLowerCase() : "";
  var filterDate = filterDateInput ? filterDateInput.value : "";
  var visibleRecords = 0;
  attendanceList.innerHTML = "";

  for (var i = 0; i < records.length; i++) {
    var matchesName = records[i].name.toLowerCase().indexOf(searchText) !== -1;
    var matchesDate = filterDate === "" || records[i].date === filterDate;

    if (!matchesName || !matchesDate) {
      continue;
    }

    var listItem = document.createElement("li");
    var recordText = document.createElement("div");
    var memberName = document.createElement("strong");
    var visitDate = document.createElement("small");
    var deleteButton = document.createElement("button");
    memberName.textContent = records[i].name;
    visitDate.textContent = records[i].date;
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-record";
    deleteButton.setAttribute("data-index", i);
    deleteButton.setAttribute("aria-label", "Delete attendance for " + records[i].name);
    recordText.appendChild(memberName);
    recordText.appendChild(document.createElement("br"));
    recordText.appendChild(visitDate);
    listItem.appendChild(recordText);
    listItem.appendChild(deleteButton);
    attendanceList.appendChild(listItem);
    visibleRecords = visibleRecords + 1;
  }

  if (emptyAttendance) {
    if (visibleRecords === 0) {
      emptyAttendance.style.display = "block";
      emptyAttendance.querySelector("p").textContent =
        records.length === 0 ? "No attendance records yet." : "No records match your filters.";
    } else {
      emptyAttendance.style.display = "none";
    }
  }

  var deleteButtons = document.querySelectorAll(".delete-record");
  for (var deleteIndex = 0; deleteIndex < deleteButtons.length; deleteIndex++) {
    deleteButtons[deleteIndex].addEventListener("click", function () {
      var recordIndex = Number(this.getAttribute("data-index"));
      var savedRecords = JSON.parse(localStorage.getItem("attendance")) || [];
      savedRecords.splice(recordIndex, 1);
      localStorage.setItem("attendance", JSON.stringify(savedRecords));
      showToast("Attendance record deleted.", "info");
      showAttendance();
    });
  }

  updateAttendanceStats(records);
}

function updateAttendanceStats(records) {
  var totalVisits = document.getElementById("totalVisits");
  var thisMonthVisits = document.getElementById("thisMonthVisits");
  var uniqueMembers = document.getElementById("uniqueMembers");

  if (!totalVisits || !thisMonthVisits || !uniqueMembers) {
    return;
  }

  var currentMonth = new Date().getMonth();
  var currentYear = new Date().getFullYear();
  var monthlyTotal = 0;
  var memberNames = [];

  for (var i = 0; i < records.length; i++) {
    var recordDate = new Date(records[i].date);

    if (recordDate.getMonth() === currentMonth && recordDate.getFullYear() === currentYear) {
      monthlyTotal = monthlyTotal + 1;
    }

    if (memberNames.indexOf(records[i].name.toLowerCase()) === -1) {
      memberNames.push(records[i].name.toLowerCase());
    }
  }

  totalVisits.textContent = records.length;
  thisMonthVisits.textContent = monthlyTotal;
  uniqueMembers.textContent = memberNames.length;
}

if (attendanceButton) {
  attendanceButton.addEventListener("click", function () {
    var nameInput = document.getElementById("memberName");
    var dateInput = document.getElementById("attendanceDate");
    var name = nameInput.value.trim();

    if (name === "") {
      showToast("Please enter the member name.", "error");
      return;
    }

    var selectedDate = dateInput.value || new Date().toISOString().split("T")[0];

    var records = JSON.parse(localStorage.getItem("attendance")) || [];
    var duplicateFound = false;

    for (var i = 0; i < records.length; i++) {
      if (records[i].name.toLowerCase() === name.toLowerCase() && records[i].date === selectedDate) {
        duplicateFound = true;
      }
    }

    if (duplicateFound) {
      showToast("This member is already marked present for that date.", "error");
      return;
    }

    records.push({ name: name, date: selectedDate });
    localStorage.setItem("attendance", JSON.stringify(records));

    nameInput.value = "";
    dateInput.value = "";
    showToast("Attendance marked successfully.", "success");
    showAttendance();
  });
}

showAttendance();

var attendanceSearch = document.getElementById("attendanceSearch");
var attendanceFilterDate = document.getElementById("attendanceFilterDate");

if (attendanceSearch) {
  attendanceSearch.addEventListener("input", showAttendance);
}

if (attendanceFilterDate) {
  attendanceFilterDate.addEventListener("change", showAttendance);
}

var clearAttendanceButton = document.getElementById("clearAttendance");

if (clearAttendanceButton) {
  clearAttendanceButton.addEventListener("click", function () {
    var shouldClear = confirm("Remove all attendance records?");

    if (shouldClear) {
      localStorage.removeItem("attendance");
      showAttendance();
    }
  });
}

var exportAttendanceButton = document.getElementById("exportAttendance");

if (exportAttendanceButton) {
  exportAttendanceButton.addEventListener("click", function () {
    var records = JSON.parse(localStorage.getItem("attendance")) || [];

    if (records.length === 0) {
      showToast("There are no attendance records to export.", "error");
      return;
    }

    var csvText = "Member Name,Date\n";
    for (var i = 0; i < records.length; i++) {
      var safeName = records[i].name.replace(/"/g, '""');
      csvText = csvText + '"' + safeName + '",' + records[i].date + "\n";
    }

    var csvFile = new Blob([csvText], { type: "text/csv" });
    var downloadLink = document.createElement("a");
    downloadLink.href = URL.createObjectURL(csvFile);
    downloadLink.download = "fitlife-attendance.csv";
    downloadLink.click();
    URL.revokeObjectURL(downloadLink.href);
    showToast("Attendance CSV downloaded.", "success");
  });
}

/* CONTACT FORM */
var contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    var message = {
      name: document.getElementById("contactName").value.trim(),
      email: document.getElementById("contactEmail").value.trim(),
      topic: document.getElementById("contactTopic").value,
      message: document.getElementById("contactMessage").value.trim(),
      sentAt: new Date().toLocaleString()
    };

    messages.push(message);
    localStorage.setItem("contactMessages", JSON.stringify(messages));
    showToast("Thank you! Your message has been saved.", "success");
    contactForm.reset();
    document.getElementById("lastContactMessage").textContent =
      "Last message saved: " + message.sentAt;
  });
}

/* FADE-IN ANIMATION */
var fadeItems = document.querySelectorAll(".fade-in");

function showItems() {
  for (var i = 0; i < fadeItems.length; i++) {
    var itemTop = fadeItems[i].getBoundingClientRect().top;

    if (itemTop < window.innerHeight - 50) {
      fadeItems[i].classList.add("visible");
    }
  }
}

window.addEventListener("scroll", showItems);
showItems();

/* ANIMATED HOME PAGE NUMBERS */
var counters = document.querySelectorAll(".counter");

for (var counterIndex = 0; counterIndex < counters.length; counterIndex++) {
  startCounter(counters[counterIndex]);
}

function startCounter(counter) {
  var target = Number(counter.getAttribute("data-target"));
  var current = 0;
  var step = Math.ceil(target / 50);

  var timer = setInterval(function () {
    current = current + step;

    if (current >= target) {
      current = target;
      clearInterval(timer);
    }

    counter.textContent = current + "+";
  }, 30);
}

/* SEVEN DAY FITNESS CHALLENGE */
var challengeButton = document.getElementById("challengeButton");
var challengeProgress = document.getElementById("challengeProgress");
var challengeText = document.getElementById("challengeText");
var completedDays = Number(localStorage.getItem("challengeDays")) || 0;

function updateChallenge() {
  if (!challengeProgress || !challengeText) {
    return;
  }

  var progressWidth = (completedDays / 7) * 100;
  challengeProgress.style.width = progressWidth + "%";
  challengeText.textContent = completedDays + " of 7 days completed";

  if (completedDays === 7 && challengeButton) {
    challengeButton.textContent = "Challenge Complete! 🎉";
    challengeButton.disabled = true;
  }
}

if (challengeButton) {
  challengeButton.addEventListener("click", function () {
    if (completedDays < 7) {
      completedDays = completedDays + 1;
      localStorage.setItem("challengeDays", completedDays);
      updateChallenge();
    }
  });
}

updateChallenge();

/* BACK TO TOP BUTTON */
var backToTopButton = document.getElementById("backToTop");

if (backToTopButton) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* MEMBERSHIP PLAN SELECTION */
var planButtons = document.querySelectorAll(".plan-button");

for (var planIndex = 0; planIndex < planButtons.length; planIndex++) {
  planButtons[planIndex].addEventListener("click", function () {
    var planName = this.getAttribute("data-plan");
    localStorage.setItem("selectedPlan", planName);
  });
}

var selectedPlanMessage = document.getElementById("selectedPlanMessage");
var selectedPlan = localStorage.getItem("selectedPlan");

if (selectedPlanMessage && selectedPlan) {
  selectedPlanMessage.textContent = "You selected the " + selectedPlan + ".";
  selectedPlanMessage.classList.add("show");
}

/* WORKOUT INSTRUCTIONS */
var workoutButtons = document.querySelectorAll(".workout-toggle");

for (var workoutIndex = 0; workoutIndex < workoutButtons.length; workoutIndex++) {
  workoutButtons[workoutIndex].addEventListener("click", function () {
    var details = this.nextElementSibling;
    details.classList.toggle("show");

    if (details.classList.contains("show")) {
      this.textContent = "Hide Instructions";
    } else {
      this.textContent = "View Instructions";
    }
  });
}

/* MEMBERSHIP QUESTIONS */
var faqButtons = document.querySelectorAll(".faq-question");

for (var faqIndex = 0; faqIndex < faqButtons.length; faqIndex++) {
  faqButtons[faqIndex].addEventListener("click", function () {
    var answer = this.nextElementSibling;
    var symbol = this.querySelector("span");
    answer.classList.toggle("show");

    if (answer.classList.contains("show")) {
      symbol.textContent = "−";
    } else {
      symbol.textContent = "+";
    }
  });
}

/* TRAINER AVAILABILITY */
var trainerButtons = document.querySelectorAll(".trainer-button");

for (var trainerIndex = 0; trainerIndex < trainerButtons.length; trainerIndex++) {
  trainerButtons[trainerIndex].addEventListener("click", function () {
    var availability = this.nextElementSibling;
    availability.classList.toggle("show");

    if (availability.classList.contains("show")) {
      this.textContent = "Hide Availability";
    } else {
      this.textContent = "View Availability";
    }
  });
}

/* COMPLETED WORKOUTS */
var completeButtons = document.querySelectorAll(".workout-complete");
var completedWorkoutCount = document.getElementById("completedWorkoutCount");
var completedWorkoutDays = JSON.parse(localStorage.getItem("completedWorkoutDays")) || [];

if (completedWorkoutCount) {
  completedWorkoutCount.textContent = completedWorkoutDays.length;
}

function getWorkoutKey(button) {
  var plan = button.closest(".weekly-plan");
  var day = button.closest(".training-day").querySelector("span");
  return plan.id + "-" + day.textContent;
}

for (var completeIndex = 0; completeIndex < completeButtons.length; completeIndex++) {
  var savedWorkoutKey = getWorkoutKey(completeButtons[completeIndex]);

  if (completedWorkoutDays.indexOf(savedWorkoutKey) !== -1) {
    completeButtons[completeIndex].classList.add("completed");
    completeButtons[completeIndex].textContent = "✓ Workout Completed";
  }

  completeButtons[completeIndex].addEventListener("click", function () {
    var workoutKey = getWorkoutKey(this);
    var savedIndex = completedWorkoutDays.indexOf(workoutKey);

    if (savedIndex === -1) {
      completedWorkoutDays.push(workoutKey);
      this.classList.add("completed");
      this.textContent = "✓ Workout Completed";
      showToast("Workout marked as complete.", "success");
    } else {
      completedWorkoutDays.splice(savedIndex, 1);
      this.classList.remove("completed");
      this.textContent = "✓ Mark as Complete";
      showToast("Workout returned to incomplete.", "info");
    }

    localStorage.setItem("completedWorkoutDays", JSON.stringify(completedWorkoutDays));
    completedWorkoutCount.textContent = completedWorkoutDays.length;
  });
}

/* WORKOUT LEVEL TABS */
var levelTabs = document.querySelectorAll(".level-tab");
var weeklyPlans = document.querySelectorAll(".weekly-plan");

for (var levelIndex = 0; levelIndex < levelTabs.length; levelIndex++) {
  levelTabs[levelIndex].addEventListener("click", function () {
    var selectedPlan = this.getAttribute("data-plan");

    for (var i = 0; i < levelTabs.length; i++) {
      levelTabs[i].classList.remove("active");
      weeklyPlans[i].classList.remove("show");
    }

    this.classList.add("active");
    document.getElementById(selectedPlan).classList.add("show");
  });
}

/* MACRO CALCULATOR */
var macroForm = document.getElementById("macroForm");

if (macroForm) {
  macroForm.addEventListener("submit", function (event) {
    event.preventDefault();

    var sex = document.getElementById("macroSex").value;
    var age = Number(document.getElementById("macroAge").value);
    var height = Number(document.getElementById("macroHeight").value);
    var weight = Number(document.getElementById("macroWeight").value);
    var activity = Number(document.getElementById("macroActivity").value);
    var goal = document.getElementById("macroGoal").value;

    if (!sex || !activity || !goal) {
      showToast("Please complete every field.", "error");
      return;
    }

    var restingCalories = 10 * weight + 6.25 * height - 5 * age;

    if (sex === "male") {
      restingCalories = restingCalories + 5;
    } else {
      restingCalories = restingCalories - 161;
    }

    var calories = restingCalories * activity;
    var suggestion = "This estimate supports weight maintenance. Review your progress after a few weeks.";

    if (goal === "fatloss") {
      calories = calories - 300;
      suggestion = "Use a modest calorie deficit, keep protein consistent, and aim for gradual progress.";
    } else if (goal === "musclegain") {
      calories = calories + 300;
      suggestion = "Use a modest calorie surplus, strength train consistently, and prioritise recovery.";
    }

    var minimumCalories = 1200;
    if (sex === "male") {
      minimumCalories = 1500;
    }

    if (calories < minimumCalories) {
      calories = minimumCalories;
      suggestion = suggestion + " The estimate was limited to a conservative minimum; seek individual advice.";
    }

    var protein = weight * 1.6;
    var fat = (calories * 0.25) / 9;
    var carbCalories = calories - protein * 4 - fat * 9;
    var carbs = carbCalories / 4;

    document.getElementById("macroEmpty").style.display = "none";
    document.getElementById("macroFilled").classList.add("show");
    document.getElementById("calorieTarget").textContent = Math.round(calories);
    document.getElementById("proteinTarget").textContent = Math.round(protein) + "g";
    document.getElementById("carbTarget").textContent = Math.round(carbs) + "g";
    document.getElementById("fatTarget").textContent = Math.round(fat) + "g";
    document.getElementById("macroSuggestion").textContent = suggestion;

    var savedMacroResult = {
      sex: sex,
      age: age,
      height: height,
      weight: weight,
      activity: activity,
      goal: goal,
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fat: Math.round(fat),
      suggestion: suggestion
    };
    localStorage.setItem("latestMacroResult", JSON.stringify(savedMacroResult));
    showToast("Macro targets calculated and saved.", "success");
  });
}

var macroResetButton = document.getElementById("macroReset");

if (macroResetButton) {
  macroResetButton.addEventListener("click", function () {
    macroForm.reset();
    localStorage.removeItem("latestMacroResult");
    document.getElementById("macroEmpty").style.display = "flex";
    document.getElementById("macroFilled").classList.remove("show");
    document.getElementById("macroSex").focus();
  });
}

var latestMacroResult = JSON.parse(localStorage.getItem("latestMacroResult"));

if (macroForm && latestMacroResult) {
  document.getElementById("macroSex").value = latestMacroResult.sex;
  document.getElementById("macroAge").value = latestMacroResult.age;
  document.getElementById("macroHeight").value = latestMacroResult.height;
  document.getElementById("macroWeight").value = latestMacroResult.weight;
  document.getElementById("macroActivity").value = latestMacroResult.activity;
  document.getElementById("macroGoal").value = latestMacroResult.goal;
  document.getElementById("macroEmpty").style.display = "none";
  document.getElementById("macroFilled").classList.add("show");
  document.getElementById("calorieTarget").textContent = latestMacroResult.calories;
  document.getElementById("proteinTarget").textContent = latestMacroResult.protein + "g";
  document.getElementById("carbTarget").textContent = latestMacroResult.carbs + "g";
  document.getElementById("fatTarget").textContent = latestMacroResult.fat + "g";
  document.getElementById("macroSuggestion").textContent = latestMacroResult.suggestion;
}

/* MEAL PLAN TABS */
var mealTabs = document.querySelectorAll(".meal-tab");
var mealPanels = document.querySelectorAll(".meal-plan-panel");

for (var mealTabIndex = 0; mealTabIndex < mealTabs.length; mealTabIndex++) {
  mealTabs[mealTabIndex].addEventListener("click", function () {
    var selectedMeal = this.getAttribute("data-meal");

    for (var i = 0; i < mealTabs.length; i++) {
      mealTabs[i].classList.remove("active");
      mealPanels[i].classList.remove("show");
    }

    this.classList.add("active");
    document.getElementById(selectedMeal).classList.add("show");
  });
}

/* VEGETARIAN AND NON-VEGETARIAN SWITCH */
var dietTabs = document.querySelectorAll(".diet-tab");

for (var dietIndex = 0; dietIndex < dietTabs.length; dietIndex++) {
  dietTabs[dietIndex].addEventListener("click", function () {
    var selectedDiet = this.getAttribute("data-diet");
    var vegetarianLists = document.querySelectorAll(".veg-list");
    var nonVegetarianLists = document.querySelectorAll(".nonveg-list");

    for (var i = 0; i < dietTabs.length; i++) {
      dietTabs[i].classList.remove("active");
    }

    for (var vegIndex = 0; vegIndex < vegetarianLists.length; vegIndex++) {
      vegetarianLists[vegIndex].style.display = "none";
      nonVegetarianLists[vegIndex].style.display = "none";
    }

    var selectedLists = document.querySelectorAll("." + selectedDiet);
    for (var listIndex = 0; listIndex < selectedLists.length; listIndex++) {
      selectedLists[listIndex].style.display = "grid";
    }

    this.classList.add("active");
  });
}
