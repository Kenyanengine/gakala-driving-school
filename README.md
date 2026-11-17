# Gakala Driving School LLP website

A responsive driving-school website and student/admin portal starter, designed for GitHub Pages with Firebase Authentication + Cloud Firestore.

## School contact details
- Phone / WhatsApp: 0742675701 (+254742675701)
- Email: gakaladrivingschoolltd@gmail.com
- Logo: `assets/gakala-logo.png`

## What's included
- Public homepage, course information, about and contact sections
- Student registration/sign-in, course applications and lesson requests
- Student view of application, booking, payment and attendance records
- Admin dashboard for student/application/booking overview and recording payments and attendance
- Firestore security rules (admin access uses a Firebase custom claim)
- Local preview mode when Firebase settings are not yet configured

## Important before using real student data
GitHub Pages is static hosting. It does not provide a secure database or server-side authentication. The included local preview mode stores test data in this browser only and is NOT suitable for real student records. Connect Firebase and publish the Firestore rules before accepting real registrations. Do not publish private service-account keys in this repository.

## Step 1 — Put the files on GitHub
1. Sign in to GitHub and create a new **public** repository named `gakala-driving-school`.
2. On the repository page choose **Add file → Upload files**.
3. Upload all files and folders from this project (keep `index.html`, `styles.css`, `app.js`, `firebase-config.js`, and `firestore.rules` in the repository root).
4. Click **Commit changes**.

## Step 2 — Turn on GitHub Pages
1. Open repository **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/ (root)`, then Save.
4. Wait a minute or two. GitHub will show your public website URL in the Pages section.

## Step 3 — Connect Firebase
1. Open https://console.firebase.google.com/ and create a project for Gakala Driving School LLP.
2. Add a Web App in Project Overview and copy its web configuration.
3. In the repository, open `firebase-config.js` and replace each `YOUR_...` placeholder with the matching Firebase value. These web-app config values are intended for client apps; database access must be protected by the rules below.
4. In Firebase Authentication → Sign-in method, enable **Email/Password**.
5. In Firestore Database, create a database.
6. Open Firestore **Rules**, paste the contents of `firestore.rules`, and Publish.
7. Commit the updated `firebase-config.js` to GitHub. The website will then use Firebase instead of local preview mode.

## Step 4 — Give the school administrator access
Admin access is controlled by a Firebase Authentication custom claim named `admin`. Never let a user make themselves an admin from the website.

On a trusted computer, use the Firebase Admin SDK and a private service-account key (keep it OUT of this GitHub repository):

```bash
npm install firebase-admin
```

Create a local file `set-admin.mjs` (do not upload it) with:

```js
import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from './service-account.json' with { type: 'json' };

initializeApp({ credential: cert(serviceAccount) });
const email = 'gakaladrivingschoolltd@gmail.com';
const user = await getAuth().getUserByEmail(email);
await getAuth().setCustomUserClaims(user.uid, { admin: true });
console.log(`Admin access enabled for ${email}. Sign out and sign back in on the website.`);
```

Download the service-account JSON from Firebase Project Settings → Service accounts. Store it securely on your own computer only. Replace `YOUR_ADMIN_EMAIL`, run `node set-admin.mjs`, then sign out and sign back in on the site. Do not share the service-account file.

## Before public launch
- School phone, email, WhatsApp link and generated logo are already added. Confirm that the WhatsApp number is registered on WhatsApp.
- Confirm the official phone number, email, physical address, course categories, fees, operating hours and school policies.
- Add a privacy notice and obtain consent before collecting personal information.
- Have the school administrator test registrations, applications, lesson requests, payment recording and attendance.
- Payments are currently recorded manually by an administrator. This project does not initiate or verify M-PESA payments automatically.
- The website does not connect to NTSA or issue driving licences. Do not advertise those capabilities unless an approved integration exists.

## Local preview
For a local preview, serve the folder over HTTP (ES modules do not work reliably from a `file://` URL). For example, with Python installed:

```bash
python -m http.server 8000
```

Then open http://localhost:8000. With untouched Firebase placeholders, the site runs in browser-only preview mode. Do not use preview mode for real data.
