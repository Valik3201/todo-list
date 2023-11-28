import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getCurrentMaxOrder } from "./generate-items";
import { getItems } from "./generate-items";

/**
 * Adds a new item to the "todo-items" collection in Firestore.
 * @param {Event} event - The form submission event.
 * @returns {Promise<void>} - A promise that resolves after the item is added.
 */
export const addItem = async function (event) {
  event.preventDefault();
  const text = document.getElementById("todo-input").value;

  if (text) {
    // Get reference to the "todo-items" collection
    const todoCollection = collection(db, "todo-items");

    try {
      // Get the current maximum order value
      const maxOrder = await getCurrentMaxOrder();

      // Add a new document to the collection
      const docRef = await addDoc(todoCollection, {
        text: text,
        status: "active",
        createdAt: new Date().toISOString(),
        order: maxOrder + 1,
      });

      // Log the ID of the newly added document
      console.log("Document written with ID: ", docRef.id);

      // Clear the input field after adding the document
      document.getElementById("todo-input").value = "";

      // Refresh the list of items
      await getItems();
    } catch (error) {
      // Handle errors during the document addition
      console.error("Error adding document: ", error);
    }
  }
};

// Add a submit event listener to the "todo-form" element
document.getElementById("todo-form").addEventListener("submit", addItem);

// Add a click event listener to the ".check-mark" element
document.querySelector(".check-mark").addEventListener("click", addItem);
