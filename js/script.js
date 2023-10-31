import {
  collection,
  getDocs,
  addDoc,
  Timestamp,
  db,
  firebaseApp,
} from "./firebase.js";

window.addItem = async function (event) {
  event.preventDefault();
  const text = document.getElementById("todo-input").value;

  if (text) {
    const todoCollection = collection(db, "todo-items");

    try {
      const docRef = await addDoc(todoCollection, {
        text: text,
        status: "active",
      });
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("todo-input").value = "";
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};
