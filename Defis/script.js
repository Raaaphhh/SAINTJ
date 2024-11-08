import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, get, update } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

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

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

// Vérifier si l'utilisateur est connecté et initialiser la page
onAuthStateChanged(auth, (user) => {
    if (user) {
        setupChallengeListeners(user);
        loadCheckedChallenges();
        displayUserScore(user);
        setupToggleChallenges(); // Permet d'afficher/masquer les sections de défis
    } else {
        alert("Veuillez vous connecter pour accéder aux défis.");
        window.location.href = 'index.html';
    }
});

// Ajouter des écouteurs aux cases à cocher des défis
function setupChallengeListeners(user) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            handleDefiChecked(user, checkbox);
        });
    });
}

// Gérer la mise à jour du score lorsqu'un défi est coché/décoché
function handleDefiChecked(user, checkbox) {
    const points = parseInt(checkbox.getAttribute('data-points'));
    const isChecked = checkbox.checked;

    // Récupérer la référence de l'utilisateur dans la base de données
    const userRef = ref(database, 'users/' + user.uid);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            let currentScore = snapshot.val().score || 0;

            // Mise à jour du score en fonction de l'état de la case à cocher
            currentScore = isChecked ? currentScore + points : currentScore - points;

            // Mettre à jour le score dans la base de données Firebase
            update(userRef, {
                score: currentScore
            }).then(() => {
                console.log("Score mis à jour avec succès.");
                displayUserScore(user); // Mettre à jour l'affichage du score
            }).catch((error) => {
                console.error("Erreur lors de la mise à jour du score :", error.message);
            });

            // Sauvegarder l'état du défi dans le localStorage
            localStorage.setItem(checkbox.id, isChecked);
        }
    }).catch((error) => {
        console.error("Erreur lors de la récupération des données de l'utilisateur :", error.message);
    });
}

// Charger l'état des défis à partir du localStorage
function loadCheckedChallenges() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const isChecked = localStorage.getItem(checkbox.id) === 'true';
        checkbox.checked = isChecked;
    });
}

// Afficher le score de l'utilisateur connecté
function displayUserScore(user) {
    const userRef = ref(database, 'users/' + user.uid);
    get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
            const userData = snapshot.val();
            const scoreDisplay = document.getElementById('scoreDisplay');
            if (scoreDisplay) {
                scoreDisplay.textContent = `Votre score : ${userData.score}`;
            }
        } else {
            console.log("Aucune donnée trouvée pour l'utilisateur.");
        }
    }).catch((error) => {
        console.error("Erreur lors de la récupération du score :", error.message);
    });
}

// Afficher/masquer les défis dans chaque catégorie
function setupToggleChallenges() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            const challenges = document.getElementById(category);
            if (challenges.style.display === "none" || challenges.style.display === "") {
                challenges.style.display = "block"; // Affiche la section des défis
            } else {
                challenges.style.display = "none"; // Masque la section des défis
            }
        });
    });

    // Initialement, masquer toutes les sections de défis
    const sections = document.querySelectorAll('.challenges');
    sections.forEach(section => {
        section.style.display = 'none';
    });
}
