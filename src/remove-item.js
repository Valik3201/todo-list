import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getItems } from "./generate-items";

/**
 * Removes a todo item from the "todo-items" collection in Firestore.
 * @param {string} itemId - The ID of the todo item to be removed.
 * @returns {Promise<void>} - A promise that resolves after removing the todo item.
 */
export async function removeTodoItem(itemId) {
  // Get reference to the "todo-items" collection
  const todoCollection = collection(db, "todo-items");

  try {
    // Get the document snapshot for the specified todo item
    const todoDoc = await getDoc(doc(todoCollection, itemId));

    // Check if the document exists
    if (todoDoc.exists()) {
      // Delete the todo item document
      await deleteDoc(todoDoc.ref);
      console.log("Todo item removed: ", itemId);

      // Refresh the list of items after removing the todo item
      getItems();
    } else {
      console.log("Todo item not found: ", itemId);
    }
  } catch (error) {
    // Handle errors during the process of removing the todo item
    console.error("Error removing todo item: ", error);
  }
}
