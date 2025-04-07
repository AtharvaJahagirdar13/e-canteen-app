# E-Canteen App

E-Canteen App is a mobile application built using **React Native** with **JSX** and **Expo**. It leverages **Firebase** for secure user authentication, providing a seamless experience for users to browse and order from a canteen.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

- **User Authentication:** Secure sign-up, login, and password reset powered by Firebase.
- **User-friendly Interface:** Intuitive design built with React Native and JSX.
- **Rapid Development:** Utilizes Expo for streamlined app development and testing.
- **Real-Time Updates:** Firebase integration ensures data is updated in real time.

---

## Tech Stack

- **React Native & JSX:** For building dynamic and responsive mobile interfaces.
- **Expo:** Simplifies the development workflow and testing process.
- **Firebase:** Provides robust and secure user authentication services.

---

## Screenshots

Here are some screenshots of the app in action:

![Home Screen](./screenshots/home.png)
![Login Screen](./screenshots/login.png)
<!-- Add additional screenshots as needed -->

---

## Getting Started

### Prerequisites

- **Node.js** (v12 or higher recommended)
- **npm** or **yarn**
- **Expo CLI**

> **Install Expo CLI globally:**
>
> ```bash
> npm install -g expo-cli
> ```

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AtharvaJahagirdar13/ecanteen-app.git
   cd ecanteen-app


2. **Install dependencies:**
   ```bash
   npm install
   ```
   or, if you prefer yarn:
   ```bash
   yarn install
   ```

3. **Configure Firebase:**
   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable the Authentication service (choose Email/Password or any other method you need).
   - Copy your Firebase configuration details and create a `firebaseConfig.js` file in your project:
     ```javascript
     // firebaseConfig.js
     import firebase from 'firebase/app';
     import 'firebase/auth';

     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };

     if (!firebase.apps.length) {
       firebase.initializeApp(firebaseConfig);
     }

     export { firebase };
     ```

4. **Start the Expo server:**
   ```bash
   expo start
   ```

## Folder Structure

```
ecanteen-app/
├── app/
│   ├── AdminPanel.jsx
│   ├── CartScreen.jsx
│   ├── CartScreen.js
│   ├── Favorites.jsx
│   ├── FavoritesContext.jsx
│   ├── FavoritesScreen.jsx
│   ├── favorites.js
│   ├── index.jsx
│   ├── menu.js
│   ├── MenuScreen.jsx
│   ├── orders.js
│   ├── orders.jsx
│   ├── orderTrackingScreen.jsx
│   ├── profile.jsx
│   ├── search.jsx
│   ├── student.jsx
│   ├── styles.jsx
│   └── app-example/
├── assets/
│   ├── fonts/
│   └── images/
│       ├── adaptive-icon.png
│       ├── cheese-dosa.jpg
│       ├── coffee.jpg
│       ├── favicon.png
│       ├── gobi-manchurian.jpg
│       ├── hakka-noodles.jpg
│       ├── header.jpg
│       └── hot-chocolate.jpg
├── firebaseConfig.js
└── App.js
```

## Contributing

Contributions are welcome! Feel free to fork the repository and submit a pull request with your improvements or fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

For any questions or support, please contact [your.email@example.com](mailto:your.email@example.com).
```
