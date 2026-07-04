  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-analytics.js";
  import { getFirestore } from "https://www.gstatic.com/firebasejs/12.15.0/firebase-firestore.js"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBlI4lHyZCgigLmGYc6-mE-Imv0-iXNB-c",
    authDomain: "warasrest.firebaseapp.com",
    projectId: "warasrest",
    storageBucket: "warasrest.firebasestorage.app",
    messagingSenderId: "889604782255",
    appId: "1:889604782255:web:98152bc9756fd29f15fc5a",
    measurementId: "G-X59CM8STZL"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  export const db = getFirestore(app);
