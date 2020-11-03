const firebaseConfig = {
  apiKey: "AIzaSyCcACVfcvnEkLXPuhJAqOPsu9nZGCdiNM0",
  authDomain: "ebundle-dev.firebaseapp.com",
  databaseURL: "https://ebundle-dev.firebaseio.com",
  projectId: "ebundle-dev",
  storageBucket: "ebundle-dev.appspot.com",
  messagingSenderId: "296531095713",
  appId: "1:296531095713:web:5d9ce135564c7f0e7f40e0"
};
firebase.initializeApp(firebaseConfig);

const link = document.getElementById("loginLink");
let button = document.getElementById("loginLink");
let dialog = document.getElementsByClassName("dialog")[0];
let closeBtn = document.getElementsByClassName("close")[0];

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    link.setAttribute("href", "/dashboard");
    link.classList.toggle("animate");
    link.innerHTML = user.displayName;
    button = null;
    dialog = null;
    closeBtn = null;
  } else {
    console.log("signed out");
  }
});

function toggleShowDialog() {
  dialog.classList.toggle("show-dialog");
}
button.addEventListener("click", toggleShowDialog);
closeBtn.addEventListener("click", toggleShowDialog);
dialog.addEventListener("click", function(e) {
  if (e.target === this) {
    toggleShowDialog();
  }
});

const form = document.getElementById("signinForm");
form.addEventListener("submit", e => {
  e.preventDefault();
  firebase
    .auth()
    .signInWithEmailAndPassword(
      form.elements["email"].value,
      form.elements["password"].value
    )
    .then(result => window.location.replace("/dashboard"))
    .catch(function(error) {
      console.log(error.code);
      console.log(error.message);
    });
});