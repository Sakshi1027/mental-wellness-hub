# Student Mental Wellness Hub

A modern, mobile-friendly web and mobile app for student mental health support, mood tracking, journaling, venting, and resources.

---

## 🌟 Features
- **Daily Mood Check-In** with mood icons and trend chart
- **Motivational Blog** with inspirational articles
- **Anonymous Venting Wall** (with optional image upload)
- **Helpline Resources** (clickable phone, email, WhatsApp)
- **Personal Journal** (auto-saved, mood-tagged, timeline view)
- **Responsive, animated UI** for web and mobile
- **Firebase Firestore** for real-time data storage

---

## 🛠️ Tech Stack
- **Frontend:** React, CSS (mobile-first, animated)
- **Charts:** Chart.js
- **Database:** Firebase Firestore
- **Mobile App:** Capacitor (Android/iOS)

---

## 🚀 Getting Started (Web)

1. **Clone the repo:**
   ```sh
   git clone 
   cd mental-wellness-hub <https://github.com/Sakshi1027/mental-wellness-hub>
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Set up Firebase:**
   - Go to [Firebase Console](https://console.firebase.google.com/), create a project.
   - Add a web app, copy your config.
   - Paste your config into `src/firebase.js`.
   - Enable Firestore in test mode (for dev).
4. **Start the app:**
   ```sh
   npm start
   ```
   - Visit [http://localhost:3000](http://localhost:3000)

---

## 🔥 Firebase Setup
- **Firestore:** Used for mood check-ins and vent wall posts.
- **Rules (for dev):**
  ```js
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read, write: if request.time < timestamp.date(2025, 7, 2);
      }
    }
  }
  ```
- **For production:**
  - Use stricter rules (e.g., require auth for writes).
  - See [Firestore Security Docs](https://firebase.google.com/docs/firestore/security/get-started)

---

## 📱 Build as a Mobile App (Android/iOS)

### 1. **Build your React app:**
```sh
npm run build
```

### 2. **Add Capacitor:**
```sh
npm install @capacitor/core @capacitor/cli
npx cap init
```
- App name: Student Mental Wellness Hub
- App ID: com.yourname.wellnesshub

### 3. **Add Android/iOS platform:**
```sh
npx cap add android
# (on Mac for iOS: npx cap add ios)
```

### 4. **Check capacitor.config.ts/json:**
- Make sure it has: `webDir: 'build'`

### 5. **Copy your build:**
```sh
npx cap copy
```

### 6. **Open in Android Studio/Xcode:**
```sh
npx cap open android
# (on Mac: npx cap open ios)
```

### 7. **Build and run on device/emulator!**
- In Android Studio, click the green Run ▶️ button.
- For iOS, use Xcode.

### 8. **For future changes:**
- After editing React code:
  ```sh
  npm run build
  npx cap copy
  # Then rebuild in Android Studio/Xcode
  ```

---

## 🛡️ Firebase Security (Production)
- Update Firestore rules before going live!
- Example (only authenticated users can write):
  ```js
  service cloud.firestore {
    match /databases/{database}/documents {
      match /{document=**} {
        allow read: if true;
        allow write: if request.auth != null;
      }
    }
  }
  ```
- [Firebase Auth Docs](https://firebase.google.com/docs/auth)

---

## 🐞 Troubleshooting
- **Capacitor copy error:**
  - Make sure `webDir: 'build'` in your config.
  - Run all commands from the project root (not inside `android`).
- **Android Studio issues:**
  - Let Gradle sync, install missing SDKs if prompted.
  - Make sure your device/emulator is running and unlocked.
- **Firebase errors:**
  - Double-check your config in `src/firebase.js`.
  - Check Firestore rules and project permissions.

---

## 💡 Customization & Extensions
- Add authentication (Firebase Auth)
- Add push notifications (Capacitor plugins)
- Add more features (calendar, reminders, etc.)

---

