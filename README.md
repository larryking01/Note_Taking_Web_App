# Notopia – A Smart Note-Taking Web App

**Notopia** is a modern and responsive note-taking application built with Angular and Firebase. It allows users to securely create, view, edit, archive, and search notes in real-time. With customizable themes and font options, it provides a user-friendly writing experience across devices.

---

## 🚀 Setup & Run Instructions

### 1. **Clone the Repository**
git clone https://github.com/larryking01/Note_Taking_Web_App
cd Note_Taking_Web_App


# 2. Install dependencies
npm install --legacy-peer-deps. 
The "--legacy-peer-deps" prevents the app from crashing due to strict minor version compatibility checks


# 3. Configure Environment Variables
Create a .env file in the root of the project and add your Firebase credentials:

* env
NG_APP_FIREBASE_API_KEY=your-api-key
NG_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
NG_APP_FIREBASE_PROJECT_ID=your-project-id
NG_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NG_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NG_APP_FIREBASE_APP_ID=your-app-id


# 4. Start the App
npm run start


# 5. Build for Production
ng build



# Key Features
🔐 Authentication – Sign up and login with Firebase Email & Password

📝 Note CRUD – Create, edit, delete, and archive notes

📁 Subcollections per User – Each user's notes are scoped to their Firebase account

🔍 Search Functionality – Filter notes by title, tag, or content

♻️ Real-Time Updates – Notes update instantly without refreshing

🌙 Dark & Light Mode – Toggle themes to suit your preference

🖋️ Font Selector – Choose between serif, sans-serif, and monospace fonts

🧠 Keyboard Accessibility – Fully navigable with keyboard




# Technologies Used
* Angular 20 – Frontend framework

* Firebase – Authentication and Firestore for backend

* RxJS – Reactive programming

* SCSS – Responsive and modern styling

* @ngx-env/builder – Environment variable management

* Vercel – Hosting and deployment


🧩 Component Overview

    Component	                                    Description
* SignUpComponent / SignInComponent	        Handles user registration and login
* NavbarComponent	                        Top nav bar with user info and theme/font controls
* SidebarComponent	                        Responsive sidebar with navigation links
* DisplayNotesComponent	                    Displays all notes with search and archive options
* EditNoteComponent	                        Edits and updates a selected note
* NoteCardComponent	                        Individual note card with metadata and actions
* ToastComponent	                        Reusable toast for success notifications
* ErrorComponent                            Reusable toast for error notifications




🎁 Bonus Features (Implemented)
* Persistent theme and font preferences via localStorage
* Persistent notes in firebase database
* Sign Up / Login
* Protected Routes using CanActivate guard
