// 1. Create a Firebase project at https://console.firebase.google.com/
// 2. Register a Web App and paste its configuration below.
// 3. Enable Authentication > Email/Password and create a Firestore database.
// Leave the placeholder values unchanged to run the local preview mode.
export const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
export const firebaseReady = !Object.values(firebaseConfig).some(v => String(v).startsWith("YOUR_"));
