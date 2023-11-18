import { collection, getDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import { getItems } from "./generate-items";

export async function removeTodoItem(itemId) {
  const todoCollection = collection(db, "todo-items");

  try {
    const todoDoc = await getDoc(doc(todoCollection, itemId));

    if (todoDoc.exists()) {
      await deleteDoc(todoDoc.ref);
      console.log("Todo item removed: ", itemId);

      getItems();
    } else {
      console.log("Todo item not found: ", itemId);
    }
  } catch (error) {
    console.error("Error removing todo item: ", error);
  }
}
