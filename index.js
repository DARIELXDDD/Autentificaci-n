import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC6d8xi5iNrY94yOxU-2y4ZPPTgXp_aahI",
  authDomain: "login-clase6b.firebaseapp.com",
  projectId: "login-clase6b",
  storageBucket: "login-clase6b.appspot.com",
  messagingSenderId: "713598699363",
  appId: "1:713598699363:web:03e57f6e0393dfdb0db556"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let emailR = document.querySelector("#emailR");
let passR = document.querySelector("#passR");
let buttonR = document.querySelector("#buttonR");
let emailL = document.querySelector("#emailL");
let passL = document.querySelector("#passL");
let buttonL = document.querySelector("#buttonL");
let buttonO = document.querySelector('#buttonO');
let successMessage = document.querySelector("#successMessage");
let errorMessage = document.querySelector("#errorMessage");

function showMessage(element, message) {
  element.textContent = message;
  element.style.display = 'block';
  setTimeout(() => element.style.display = 'none', 5000);
}

buttonR.addEventListener("click", () => {
  createUserWithEmailAndPassword(auth, emailR.value, passR.value)
    .then((userCredential) => {
      const user = userCredential.user;
      showMessage(successMessage, "Registro exitoso");
    })
    .catch((error) => {
      let errorMessageText;
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessageText = "Este correo ya está en uso.";
          break;
        case 'auth/invalid-email':
          errorMessageText = "Correo electrónico inválido.";
          break;
        case 'auth/weak-password':
          errorMessageText = "La contraseña debe tener al menos 6 caracteres.";
          break;
        default:
          errorMessageText = error.message;
      }
      showMessage(errorMessage, errorMessageText);
    });
});

buttonL.addEventListener('click', () => {
  signInWithEmailAndPassword(auth, emailL.value, passL.value)
  .then((userCredential) => {
    const user = userCredential.user;
    showMessage(successMessage, "Inicio de sesión exitoso");
  })
  .catch((error) => {
    let errorMessageText;
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessageText = "Usuario no encontrado.";
        break;
      case 'auth/wrong-password':
        errorMessageText = "Contraseña incorrecta.";
        break;
      case 'auth/invalid-email':
        errorMessageText = "Correo electrónico inválido.";
        break;
      default:
        errorMessageText = error.message;
    }
    showMessage(errorMessage, errorMessageText);
  });
});

buttonO.addEventListener('click', () => {
  signOut(auth).then(() => {
    showMessage(successMessage, "Sesión cerrada");
  }).catch((error) => {
    showMessage(errorMessage, error.message);
  });
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Usuario conectado: ", user.email);
  } else {
    console.log("Desconectado");
  }
});
