import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, get, query, orderByChild, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Fonction pour récupérer et afficher les scores
function displayScores() {
    const scoresRef = query(ref(database, 'users'), orderByChild('score'));
    get(scoresRef).then((snapshot) => {
        if (snapshot.exists()) {
            const scoresContainer = document.getElementById('scoresContainer');
            scoresContainer.innerHTML = '';

            const scores = [];
            snapshot.forEach((childSnapshot) => {
                const userData = childSnapshot.val();
                scores.push({ username: userData.username, score: userData.score });
            });

            scores.sort((a, b) => b.score - a.score);
            scores.forEach((user, index) => {
                const scoreElement = document.createElement('div');
                scoreElement.textContent = `${index + 1}. ${user.username}: ${user.score}`;
                scoresContainer.appendChild(scoreElement);
            });
        } else {
            console.log("Aucun score trouvé.");
        }
    }).catch((error) => {
        console.error("Erreur lors de la récupération des scores :", error.message);
    });
}

// Vérifier si l'utilisateur est authentifié
onAuthStateChanged(auth, (user) => {
    if (user) {
        displayScores();
    } else {
        alert("Veuillez vous connecter pour accéder au classement.");
        window.location.href = 'index.html';
    }
});


// Affiche seulement le score du joeur connecté
// Affiche seulement le score du joeur connecté
// Affiche seulement le score du joeur connecté
// Affiche seulement le score du joeur connecté

function displayUserScore() {
    // Vérifier si l'utilisateur est authentifié
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // Utilisateur connecté, récupérer son score
            const userRef = ref(database, 'users/' + user.uid);
            get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    const userData = snapshot.val();
                    const scoreDisplay = document.getElementById('scoreDisplay');
                    scoreDisplay.textContent = `Votre score : ${userData.score}`;
                } else {
                    console.log("Aucune donnée trouvée pour l'utilisateur.");
                }
            }).catch((error) => {
                console.error("Erreur lors de la récupération du score :", error.message);
            });
        } else {
            // Redirection si l'utilisateur n'est pas connecté
            alert("Veuillez vous connecter pour accéder à votre score.");
            window.location.href = 'index.html';
        }
    });
}

// Appeler la fonction pour afficher le score de l'utilisateur
window.onload = displayUserScore;



