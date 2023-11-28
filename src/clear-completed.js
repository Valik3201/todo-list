import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { getItems } from "./generate-items";

/**
 * Clears completed items from the "todo-items" collection in Firestore.
 * @returns {Promise<void>} - A promise that resolves after completed items are cleared.
 */
export async function clearCompletedItems() {
  const todoCollection = collection(db, "todo-items");

  try {
    // Query for completed items
    const querySnapshot = await getDocs(
      query(todoCollection, where("status", "==", "completed"))
    );

    // Iterate through the completed items and delete them
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    // Refresh the list of items after clearing completed items
    getItems();
  } catch (error) {
    // Handle errors during the process of clearing completed items
    console.error("Error clearing completed items: ", error);
  }
}

// Add a click event listener to the "clear-completed" element
document
  .getElementById("clear-completed")
  .addEventListener("click", clearCompletedItems);
