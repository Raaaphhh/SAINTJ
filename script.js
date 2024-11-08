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

// Fonction pour inscrire un nouvel utilisateur
// Fonction pour inscrire un nouvel utilisateur et rediriger
// Fonction pour inscrire un nouvel utilisateur et rediriger
// Fonction pour inscrire un nouvel utilisateur et enregistrer les informations sans redirection
window.register = function() {
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        console.log("Inscription réussie :", user);

        // Enregistrer l'utilisateur dans la base de données avec un score initial de 0
        return set(ref(database, 'users/' + user.uid), {
            username: email,
            score: 0
        });
    })
    .then(() => {
        console.log("Utilisateur ajouté à la base de données avec score initial.");
        alert("Compte créé avec succès ! Veuillez maintenant vous connecter pour accéder au classement.");
    })
    .catch((error) => {
        console.error("Erreur lors de l'inscription ou de l'ajout en BDD :", error.message);
    });
}




// Fonction pour connecter un utilisateur existant
// Fonction pour connecter un utilisateur existant et rediriger vers la page de classement
window.login = function() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        console.log("Connexion réussie :", userCredential.user);
        // Redirection vers la page de classement après connexion réussie
        window.location.href = 'Pagemenu/pagemenu.html';
    })
    .catch((error) => {
        console.error("Erreur de connexion :", error.message);
        alert("Échec de la connexion. Veuillez vérifier vos identifiants.");
    });
}

