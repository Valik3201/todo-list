import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { getItems } from "./generate-items";

document
  .getElementById("clear-completed")
  .addEventListener("click", clearCompletedItems);

export async function clearCompletedItems() {
  const todoCollection = collection(db, "todo-items");

  try {
    const querySnapshot = await getDocs(
      query(todoCollection, where("status", "==", "completed"))
    );

    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });

    getItems();
  } catch (error) {
    console.error("Error clearing completed items: ", error);
  }
}
