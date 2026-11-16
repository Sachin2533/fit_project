# FitLife Gym

FitLife Gym is a small, beginner-friendly website that demonstrates what a gym website and member dashboard might look like. You can browse membership options, trainer profiles, workout plans, meal ideas, and use simple fitness tracking tools.

This project is made with **HTML, CSS, and plain JavaScript**. It is a front-end demonstration: there is no server, database, payment system, or real gym account service. Information you enter is saved in your own browser, on the device where you are using the site.

## Open the website

You do not need to install anything or build the project. You do need to serve the files from a small local web server (instead of opening an HTML file directly), so all pages and local assets load consistently.

1. Open a terminal in the project folder.
2. Start Python's built-in web server:

   ```bash
   python3 -m http.server 4173
   ```

3. Open <http://localhost:4173> in your browser.
4. To stop the server, return to the terminal and press **Ctrl+C**.

If Python is not installed, use any static file server that serves this folder. No package manager or third-party library is required.

## What you can do

- **Home:** Explore the site, see the example gym highlights, and record progress in a seven-day activity challenge.
- **Membership:** Compare three example plans, save a plan choice, and open common questions.
- **Trainers:** Read sample trainer profiles and show or hide their listed availability.
- **Workouts:** Switch between beginner, intermediate, and advanced weekly plans. Expand exercise instructions and mark workout days complete or incomplete.
- **Meal Plans:** View example meal ideas for fat loss, muscle gain, or weight gain. Switch between vegetarian and non-vegetarian examples. Enter details in the macro calculator to get estimated calorie, protein, carbohydrate, and fat targets.
- **BMI:** Enter height and weight to calculate an estimated BMI, category, and example healthy-weight range.
- **Attendance:** Add a member name and visit date, search or filter the records, delete one or all records, and download the records as a CSV spreadsheet.
- **Contact:** Fill in the demo contact form. The message is saved in the current browser; it is not sent to the gym.
- **Sign up and login:** Create and use a demonstration account in this browser. The navigation shows a greeting while it is logged in, and clicking the greeting offers logout.

## How the website works

### Pages and shared files

Each `.html` file is a separate page. The links in the navigation move between those files. Every page loads `style.css` for its layout, colors, typography, and mobile styling, and loads `script.js` for interactive behavior. The script checks which controls exist on the current page before attaching the relevant behavior. Images and the site icon are stored locally in `assets/`.

There is no compilation step: the browser reads the HTML, applies the CSS, and runs the JavaScript directly.

### Saving information

The browser feature called `localStorage` keeps small pieces of text data between visits. FitLife uses it so demo details and progress remain after a page refresh. It is private to the current browser profile and website address: it is not shared with other users or devices, and clearing site data in the browser removes it.

The following entries are used:

| Browser storage name | What it remembers |
| --- | --- |
| `gymUser` | The one demo account's name, email, and password |
| `gymLoggedIn` | Whether that demo account is currently logged in |
| `selectedPlan` | The last membership choice, shown during sign up |
| `attendance` | Attendance names and dates |
| `completedWorkoutDays` | Workout plan days marked complete |
| `challengeDays` | Number of completed days in the home-page challenge |
| `latestBmiResult` | The most recent BMI inputs and result |
| `latestMacroResult` | The most recent macro calculator inputs and result |
| `contactMessages` | Contact form submissions made in this browser |

To start over, clear this site's stored data in your browser settings. This also clears the demo account and all saved progress.

### Calculators and controls

- **BMI:** The page converts the entered height from centimetres to metres and calculates `weight in kilograms ÷ height in metres squared`. The result is grouped into a basic category and saved so it can be shown again on reload. The reset button clears the saved result.
- **Macro calculator:** The page estimates resting energy from age, height, weight, and the selected sex, then adjusts it for activity and the selected goal. It uses a simple protein target based on weight and assigns example portions of calories to fat and carbohydrates. The result is rounded and saved in the browser. This is a rough educational estimate, not a personalised nutrition plan.
- **Attendance:** Each entry is a name and date. The same name cannot be added twice for the same date (capital letters do not affect this check). Search and date filters only change what is displayed; deleting and clearing remove saved entries. CSV export downloads the saved records.
- **Workout and challenge progress:** Completing a workout toggles that day on or off. The home-page challenge counts button presses up to seven; it is a simple counter and does not verify workouts.
- **Small interactions:** The shared script also handles the mobile navigation, active-page highlight, password visibility, pop-up status messages, scrolling effects, membership questions, trainer availability, and switching between workout or meal-plan tabs.

## Project files

| File or folder | Purpose |
| --- | --- |
| `index.html` | Home page and seven-day challenge |
| `membership.html` | Example membership plans and questions |
| `trainers.html` | Trainer profiles and availability controls |
| `workouts.html` | Weekly workout plans and completion tracking |
| `meal-plans.html` | Example menus and macro calculator |
| `bmi.html` | BMI calculator |
| `attendance.html` | Attendance list, filters, and CSV export |
| `contact.html` | Contact details and demo message form |
| `signup.html`, `login.html` | Demo account creation and login |
| `style.css` | Styles shared across all pages |
| `script.js` | Shared interactions, calculations, and browser storage |
| `assets/` | Local photos, illustrations, and favicon |
| `tests/validate-project.js` | Optional, no-dependency structural and syntax check |
| `tests/manual-checklist.md` | Suggested steps for manually checking site behavior |

## Optional project check

To run the included structural check, use:

```bash
node tests/validate-project.js
```

It checks that expected pages and local links/assets exist, that pages include key navigation and metadata, that the CSS braces are balanced, and that the JavaScript does not contain a browser `alert()` call. It does not open a browser or prove that every interaction works. `tests/manual-checklist.md` contains suggested hands-on checks.

## Important: demonstration only

- The sign-up form saves the password in plain text in browser storage. Do not enter a real or reused password. The login is not secure authentication, and pages are not protected by it.
- Attendance and contact messages are stored only in this browser. Contact messages are not emailed or sent to anyone.
- Membership prices and trainer details are sample website content. Choosing a plan does not create a paid membership or process payment.
- BMI and nutrition results, workout schedules, and meal examples are general educational content, not medical advice. Consult a qualified professional for guidance suited to your health, injuries, medication, pregnancy, allergies, or dietary needs.

A real service would need a secure server and database, properly protected accounts, access controls, and real payment and message-delivery services.
