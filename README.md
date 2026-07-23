# FitLife Gym Management System

A beginner-friendly Gym Management System built with plain HTML, CSS, and JavaScript.

## Features

- Responsive layouts for desktop, tablet, mobile, and small phones
- Interactive navigation with active-page highlighting
- Signup and login demonstration using `localStorage`
- BMI calculator with saved results and healthy-weight guidance
- Macro calculator with saved calorie, protein, carbohydrate, and fat targets
- Separate vegetarian and non-vegetarian meal-plan examples
- Beginner, intermediate, and advanced weekly workout programs
- Persistent day-by-day workout completion
- Attendance tracking with search, date filtering, deletion, duplicate prevention, and CSV export
- Membership plans, trainer availability, FAQs, and contact form
- Accessible toast notifications, focus states, reduced-motion support, and responsive forms
- Local optimized WebP images and SVG favicon

## Run the project

No installation or build step is required.

From the project folder, run:

```bash
python3 -m http.server 4173
```

Then visit:

```text
http://localhost:4173
```

## Validate the project

Run the included no-dependency check:

```bash
node tests/validate-project.js
```

The script checks required files, page metadata, local links and assets, favicon usage, navigation consistency, CSS braces, and JavaScript syntax.

## Main files

```text
index.html          Home page
membership.html     Membership plans and FAQs
trainers.html       Trainer profiles and availability
workouts.html       Weekly workout programs
meal-plans.html     Meal plans and macro calculator
bmi.html            BMI calculator
attendance.html     Attendance management
contact.html        Local demo contact form
login.html          Login demonstration
signup.html         Signup demonstration
style.css           Shared responsive styles
script.js           Shared interactions and local storage
assets/             Local images and favicon
tests/              Project validation script
```

## Browser storage

The project uses `localStorage` for demonstration purposes:

- `gymUser` — demo account
- `gymLoggedIn` — demo login state
- `attendance` — attendance records
- `completedWorkoutDays` — completed workout days
- `latestBmiResult` — last BMI calculation
- `latestMacroResult` — last macro calculation
- `challengeDays` — seven-day challenge progress
- `selectedPlan` — selected membership
- `contactMessages` — locally saved demo contact messages

## Important limitations

- Authentication is for learning only. Passwords are stored in the browser and must not be used for a real service.
- Pages are intentionally not protected behind login.
- Contact messages are stored only in the current browser and are not emailed.
- BMI, calories, macros, workouts, and meal plans are educational estimates—not medical advice.
- Users with health conditions, injuries, pregnancy, food allergies, medication considerations, or eating-disorder concerns should consult a qualified professional.

## Future backend upgrade

A production version would normally add a server, database, password hashing, secure sessions, real contact delivery, and server-side authorization.
