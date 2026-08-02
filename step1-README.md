# Step 1: Registration Page → API → MySQL (Complete Beginner Guide)

Goal of this step ONLY: a React form that saves a user into your MySQL database through a
Spring Boot API. No login, no security, no OTP yet — we add those next, one at a time.

---

## PART A — One-time software setup (skip anything you already have)

### A1. Check Java (you already have this ✅)
```
java --version
```
You showed `java 17.0.12` — that's perfect, Spring Boot 3.x needs Java 17+.

### A2. Install Node.js (for React)
1. Go to https://nodejs.org and download the **LTS** version for Windows.
2. Run the installer, keep clicking Next with defaults.
3. Verify in a new Command Prompt / PowerShell:
   ```
   node --version
   npm --version
   ```

### A3. Install Maven (to build the Spring Boot project)
- If you install Spring Boot via **Spring Initializr in VS Code** (see Part B), Maven isn't
  strictly required separately — the project comes with `mvnw.cmd` (Maven Wrapper) which
  downloads Maven for you automatically. So you can skip a manual Maven install.

### A4. VS Code Extensions to install
Open VS Code → click the Extensions icon (left sidebar, looks like 4 squares) → search and install:

| Extension | Why |
|---|---|
| **Extension Pack for Java** (by Microsoft) | Java language support, debugging |
| **Spring Boot Extension Pack** (by VMware/Pivotal) | Run/debug Spring Boot, application.properties autocomplete |
| **ES7+ React/Redux/React-Native snippets** | React shortcuts (optional but helpful) |

### A5. MySQL — confirm it's running
Since you already installed MySQL on Windows:
1. Open **MySQL Workbench** (or Command Prompt) and confirm you can connect with your root
   username/password.
2. Note down your **MySQL root password** — you'll need it in `application.properties`.
3. You do **NOT** need to manually create the database or table — our backend does that
   automatically on first run (explained in Part C).

### A6. Postman
Download from https://www.postman.com/downloads — we'll use this to test the API directly,
*before* connecting the React frontend. This way, if something breaks, you know immediately
whether it's a backend problem or a frontend problem.

---

## PART B — Open the projects in VS Code

1. Extract the zip I gave you. You'll have two folders:
   ```
   step1-backend/     <- Spring Boot project
   step1-frontend/    <- React project
   ```
2. Open **two separate VS Code windows** — one for each folder (`File → Open Folder`).
   Keeping them separate avoids confusion between `npm` commands and Java commands.

---

## PART C — Run the backend first

### C1. Set your MySQL password
Open `step1-backend/src/main/resources/application.properties` and change this line:
```properties
spring.datasource.password=CHANGE_ME_TO_YOUR_MYSQL_ROOT_PASSWORD
```
to your actual MySQL root password.

### C2. Understand what happens on startup (read this once, it matters)
- `spring.datasource.url=...createDatabaseIfNotExist=true` → Spring Boot creates the
  `vehicle_rental_db` database in MySQL automatically if it doesn't exist.
- `spring.jpa.hibernate.ddl-auto=update` → Hibernate looks at your `User.java` entity class
  and automatically creates a `users` table with matching columns. You never write `CREATE TABLE`.

### C3. Run it
**Easiest method (recommended):** with the Java + Spring Boot extensions from A4 installed,
open `BackendApplication.java` in VS Code. You'll see a small ▶️ "Run" link appear right above
the `main` method — click it. VS Code's Java extension handles the Maven build for you, no
separate Maven install needed. First run takes 1–3 minutes while it downloads dependencies.

**Alternative (if you prefer the terminal):** you'll need Maven installed separately for this.
Check with `mvn -version`. If you have it, run this from the `step1-backend` folder:
```
mvn spring-boot:run
```
If `mvn` isn't recognized, install it from https://maven.apache.org/download.cgi, add its
`bin` folder to your Windows PATH, restart your terminal, and try again — or just use the
▶️ Run button method above instead, which avoids this entirely.

### C4. Confirm it's working
You should see in the terminal:
```
=======================================
  Backend started -> http://localhost:8080
=======================================
```
And in MySQL Workbench, refresh your schemas — you should now see a `vehicle_rental_db`
database with an empty `users` table inside it.

### C5. Test the API with Postman (do this before touching React)
- Method: `POST`
- URL: `http://localhost:8080/api/users/register`
- Body → raw → JSON:
  ```json
  {
    "fullName": "Om Sharma",
    "email": "om@example.com",
    "phone": "9876543210",
    "password": "test123"
  }
  ```
- Click **Send**. You should get back:
  ```json
  {
    "success": true,
    "message": "Registered successfully!",
    "data": { "id": 1, "fullName": "Om Sharma", "email": "om@example.com", ... }
  }
  ```
- Go check MySQL Workbench → `vehicle_rental_db` → `users` table → you'll see the row.
- Try sending the exact same request again — you should get an error this time
  (`"Email is already registered."`) because of the uniqueness check. This confirms
  validation is working.

**If this step doesn't work, stop and fix it here** — don't move to the frontend until
Postman can successfully register a user and you can see it in MySQL.

---

## PART D — Run the frontend

### D1. Install dependencies
In VS Code (frontend folder open), open a terminal and run:
```
npm install
```
This reads `package.json` and downloads React, axios, etc. into a `node_modules` folder.
Takes 1–2 minutes.

### D2. Start the React dev server
```
npm start
```
This automatically opens `http://localhost:3000` in your browser, showing the Registration form.

### D3. Test it end-to-end
1. Fill in the form with a **new** email (not the one you already used in Postman).
2. Click **Register**.
3. You should see a green success message on screen.
4. Check MySQL Workbench again — a second row should now appear in `users`.
5. Try submitting again with the same email — you should see a red error message
   (`"Email is already registered."`) rendered directly from the backend's response.

---

## How the pieces connect (so you understand the flow, not just copy-paste it)

```
[Register.jsx form]
      │  user clicks "Register"
      ▼
axios.post("http://localhost:8080/api/users/register", form)
      │  (this is an HTTP POST request carrying JSON)
      ▼
[UserController.register()]   <- @PostMapping("/register")
      │  @Valid checks fullName/email/phone/password rules
      ▼
[UserService.register()]      <- business logic: check duplicates, build User object
      │
      ▼
[UserRepository.save(user)]   <- Spring Data JPA translates this to SQL INSERT
      │
      ▼
[MySQL: users table]          <- row is physically saved on disk
      │
      ▼
response flows back up through Service -> Controller -> React
      │
      ▼
[Register.jsx] shows the green success message
```

---

## Common errors & fixes

| Error | Fix |
|---|---|
| `Access denied for user 'root'@'localhost'` | Wrong password in `application.properties` — double check it |
| `Communications link failure` | MySQL isn't running — start it via Windows Services or MySQL Workbench |
| React shows "Could not reach the server" | Backend isn't running, or it's not on port 8080 — check the backend terminal |
| Browser console shows a CORS error | Make sure `@CrossOrigin(origins = "http://localhost:3000")` is on `UserController` (it already is in this project) — and make sure React really is running on port 3000 |
| `Port 8080 already in use` | Another process (maybe an old backend run) is using it — stop it, or change `server.port` in `application.properties` |

---

## What's next

Once registration → MySQL is working end-to-end for you, tell me and we'll add, one at a time:
1. **Password encryption** (BCrypt) — never store plain text passwords.
2. **Login API** + JWT token.
3. **OTP email verification** on registration.
4. **Complete Profile** step after first login.
5. Then the vehicle search/booking features we scoped earlier.

We'll build each one, test it in Postman, then wire it into React — same pattern as this step.
