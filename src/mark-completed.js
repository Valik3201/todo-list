import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { getItems } from "./generate-items";

/**
 * Marks a todo item as completed or active in the "todo-items" collection in Firestore.
 * @param {string} id - The ID of the todo item to be marked.
 * @returns {Promise<void>} - A promise that resolves after updating the item's status.
 */
export async function markCompleted(id) {
  // Get a reference to the specified todo item
  const itemRef = doc(db, "todo-items", id);

  try {
    // Get the document snapshot for the specified item
    const docSnap = await getDoc(itemRef);

    // Check if the document exists
    if (docSnap.exists()) {
      // Get the current status of the todo item
      const currentStatus = docSnap.data().status;

      // Update the status of the todo item based on its current status
      await updateDoc(itemRef, {
        status: currentStatus === "active" ? "completed" : "active",
      });

      // Refresh the list of items after updating the status
      await getItems();
    }
  } catch (error) {
    // Handle errors during the process of updating the document
    console.error("Error updating document: ", error);
  }
}
