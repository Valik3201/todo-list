import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";
import { markCompleted } from "./mark-completed";
import { removeTodoItem } from "./remove-item";

export async function getCurrentMaxOrder() {
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

export async function getItems() {
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

document.querySelectorAll(".items-statuses").forEach((element) => {
  element.addEventListener("click", (event) => {
    if (event.target.classList.contains("status-option")) {
      document.querySelectorAll(".status-option").forEach((option) => {
        option.classList.remove("active");
      });

      event.target.classList.add("active");

      const selectedStatus = event.target.innerText.toLowerCase();
      currentFilter = selectedStatus;
      getItems();
    }
  });
});

function generateItems(items) {
  let todoItems = [];
  let activeItemCount = 0;

  items.forEach((item) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", "flex", "flex-ai-c");

    let crossContainer = document.createElement("div");
    crossContainer.classList.add("cross-container");
    let crossIcon = document.createElement("img");
    crossIcon.src = "./assets/icon-cross.svg";
    crossIcon.alt = "Icon cross";
    crossContainer.appendChild(crossIcon);

    // Add an event listener to handle cross icon click
    crossIcon.addEventListener("click", function () {
      removeTodoItem(item.id);
    });

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

    todoItem.appendChild(crossContainer);
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

getItems();
