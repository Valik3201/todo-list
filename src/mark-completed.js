import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { getItems } from "./generate-items";

export async function markCompleted(id) {
  const itemRef = doc(db, "todo-items", id);

  try {
    const docSnap = await getDoc(itemRef);

    if (docSnap.exists()) {
      const currentStatus = docSnap.data().status;

      await updateDoc(itemRef, {
        status: currentStatus === "active" ? "completed" : "active",
      });

      await getItems();
    }
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
