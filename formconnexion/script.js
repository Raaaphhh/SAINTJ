// Importation des modules Firebase nécessaires (sans doublon)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyA0gD-QPPB3vj7xvLWEXiHddA3HM57IQHc",
    authDomain: "saintj-e30b5.firebaseapp.com",
    databaseURL: "https://saintj-e30b5-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "saintj-e30b5",
    storageBucket: "saintj-e30b5.appspot.com",
    messagingSenderId: "773919277980",
    appId: "1:773919277980:web:b478275e152b5e08037e59"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Fonction utilitaire pour afficher des messages dans la console
const logMessage = (message, error = null) => {
    if (error) {
        console.error(message, error.message);
    } else {
        console.log(message);
    }
};

// Fonction pour connecter un utilisateur existant
// Fonction pour connecter un utilisateur existant et rediriger vers la page de classement
window.login = function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    console.log("Email saisi :", email);
    console.log("Mot de passe saisi :", password);

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log("Connexion réussie :", userCredential.user);
        window.location.href = '../Pagemenu/pagemenu.html';
    })
    .catch((error) => {
        console.error("Erreur de connexion :", error.message);
        alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
    });
};
