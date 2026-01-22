const firebaseConfig = {
  apiKey: "AIzaSyCROQ2FkwAIv1gyd-vQ0TDJEft6aP8mXyQ",
  databaseURL: "https://vaultapp-9810d-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "vaultapp-9810d",
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

let appState = { me: { name: "", phone: "" }, partner: "", encKey: "", currentRoom: null };
