import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  doc,
  query,
  where,
  deleteDoc,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";
import "./drag-and-drop";

const addItem = async function (event) {
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

async function getCurrentMaxOrder() {
  const todoCollection = collection(db, "todo-items");
  const orderedQuery = query(
    todoCollection,
    orderBy("order", "desc"),
    limit(1)
  );
  const querySnapshot = await getDocs(orderedQuery);

  if (querySnapshot.size > 0) {
    const maxOrderTask = querySnapshot.docs[0].data();
    return maxOrderTask.order;
  } else {
    return 0;
  }
}

let currentFilter = "all";

async function getItems() {
  const todoCollection = collection(db, "todo-items");
  let querySnapshot;

  if (currentFilter === "all") {
    const orderedQuery = query(todoCollection, orderBy("createdAt", "desc"));
    querySnapshot = await getDocs(orderedQuery);
  } else {
    const filteredQuery = query(
      todoCollection,
      where("status", "==", currentFilter)
    );
    querySnapshot = await getDocs(filteredQuery);
  }

  let items = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    if ("createdAt" in data) {
      items.push({
        id: doc.id,
        ...data,
      });
    }
  });

  generateItems(items);
}

document.querySelector(".items-statuses").addEventListener("click", (event) => {
  const selectedStatus = event.target.innerText.toLowerCase();
  currentFilter = selectedStatus;
  getItems();
});

function generateItems(items) {
  let todoItems = [];
  let activeItemCount = 0;

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
    } else {
      activeItemCount++;
    }

    todoItem.appendChild(checkContainer);
    todoItem.appendChild(todoText);
    todoItems.push(todoItem);
  });

  document.querySelector(".todo-items").replaceChildren(...todoItems);

  updateItemsLeftText(activeItemCount);
}

function updateItemsLeftText(count) {
  const itemsLeftBlock = document.querySelector(".items-left");
  itemsLeftBlock.innerText = `${count} item${count !== 1 ? "s" : ""} left`;
}

async function markCompleted(id) {
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

document
  .getElementById("clear-completed")
  .addEventListener("click", clearCompletedItems);

async function clearCompletedItems() {
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

getItems();
