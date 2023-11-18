import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getCurrentMaxOrder } from "./generate-items";
import { getItems } from "./generate-items";

export const addItem = async function (event) {
  event.preventDefault();
  const text = document.getElementById("todo-input").value;

  if (text) {
    const todoCollection = collection(db, "todo-items");

    try {
      const maxOrder = await getCurrentMaxOrder();

      const docRef = await addDoc(todoCollection, {
        text: text,
        status: "active",
        createdAt: new Date().toISOString(),
        order: maxOrder + 1,
      });
      console.log("Document written with ID: ", docRef.id);
      document.getElementById("todo-input").value = "";

      await getItems();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }
};

document.getElementById("todo-form").addEventListener("submit", addItem);
document.querySelector(".check-mark").addEventListener("click", addItem);
