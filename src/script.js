// import {
//   collection,
//   getDocs,
//   addDoc,
//   Timestamp,
//   db,
//   firebaseApp,
// } from "firebase/firestore";

import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db } from "./firebase";

const addItem = async function (event) {
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

document.getElementById("todo-form").addEventListener("submit", addItem);

async function getItems() {
  const querySnapshot = await getDocs(collection(db, "todo-items"));

  let items = [];
  querySnapshot.forEach((doc) => {
    items.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  generateItems(items);
}

function generateItems(items) {
  let todoItems = [];
  items.forEach((item) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", "flex", "flex-ai-c");
    let checkContainer = document.createElement("div");
    checkContainer.classList.add("check");
    let checkMark = document.createElement("div");
    checkMark.classList.add("check-mark");
    checkMark.innerHTML = '<img src="./assets/icon-check.svg">';
    checkMark.addEventListener("click", function () {
      markCompleted(item.id);
    });
    checkContainer.appendChild(checkMark);

    let todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = item.text;

    if (item.status == "completed") {
      checkMark.classList.add("checked");
      todoText.classList.add("checked");
    }
    todoItem.appendChild(checkContainer);
    todoItem.appendChild(todoText);
    todoItems.push(todoItem);
  });
  document.querySelector(".todo-items").replaceChildren(...todoItems);
}

async function markCompleted(id) {
  const itemRef = doc(db, "todo-items", id);

  try {
    const docSnap = await getDocs(itemRef);

    if (docSnap.exists()) {
      const currentStatus = docSnap.data().status;

      await updateDoc(itemRef, {
        status: currentStatus === "active" ? "completed" : "active",
      });
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}

getItems();
