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

// ...

/**
 * Retrieves the current maximum order value from the "todo-items" collection in Firestore.
 * @returns {Promise<number>} - A promise that resolves with the current maximum order value.
 */
export async function getCurrentMaxOrder() {
  // Reference to the "todo-items" collection
  const todoCollection = collection(db, "todo-items");

  // Query to retrieve the maximum order value
  const orderedQuery = query(
    todoCollection,
    orderBy("order", "desc"),
    limit(1)
  );
  const querySnapshot = await getDocs(orderedQuery);

  // Check if there are any items in the collection
  if (querySnapshot.size > 0) {
    const maxOrderTask = querySnapshot.docs[0].data();
    return maxOrderTask.order;
  } else {
    // Return 0 if the collection is empty
    return 0;
  }
}

/**
 * Global variable to store the current filter for todo items.
 * @type {string}
 */
let currentFilter = "all";

/**
 * Retrieves and displays todo items based on the current filter.
 * @returns {Promise<void>} - A promise that resolves after updating and displaying todo items.
 */
export async function getItems() {
  // Reference to the "todo-items" collection
  const todoCollection = collection(db, "todo-items");
  let querySnapshot;

  // Determine the appropriate query based on the current filter
  if (currentFilter === "all") {
    // Query all items, ordered by creation date in descending order
    const orderedQuery = query(todoCollection, orderBy("createdAt", "desc"));
    querySnapshot = await getDocs(orderedQuery);
  } else {
    // Query items with a specific status
    const filteredQuery = query(
      todoCollection,
      where("status", "==", currentFilter)
    );
    querySnapshot = await getDocs(filteredQuery);
  }

  // Process the retrieved items and update the UI
  let items = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    // Check if the item has a "createdAt" property (to filter out invalid data)
    if ("createdAt" in data) {
      items.push({
        id: doc.id,
        ...data,
      });
    }
  });

  generateItems(items);
}

// Add click event listeners to filter options
document.querySelectorAll(".items-statuses").forEach((element) => {
  element.addEventListener("click", (event) => {
    if (event.target.classList.contains("status-option")) {
      // Remove "active" class from all status options
      document.querySelectorAll(".status-option").forEach((option) => {
        option.classList.remove("active");
      });

      // Add "active" class to the clicked status option
      event.target.classList.add("active");

      // Update the current filter and refresh the todo items
      const selectedStatus = event.target.innerText.toLowerCase();
      currentFilter = selectedStatus;
      getItems();
    }
  });
});

/**
 * Generates and displays todo items in the UI.
 * @param {Array} items - An array of todo items to be displayed.
 */
function generateItems(items) {
  // Arrays to store generated todo item elements and count of active items
  let todoItems = [];
  let activeItemCount = 0;

  // Iterate through each item and create corresponding DOM elements
  items.forEach((item) => {
    let todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", "flex", "flex-ai-c");

    // Create elements for the cross icon and handle its click event
    let crossContainer = document.createElement("div");
    crossContainer.classList.add("cross-container");
    let crossIcon = document.createElement("img");
    crossIcon.src = "./assets/icon-cross.svg";
    crossIcon.alt = "Icon cross";
    crossContainer.appendChild(crossIcon);
    crossIcon.addEventListener("click", function () {
      removeTodoItem(item.id);
    });

    // Create elements for the checkmark and handle its click event
    let checkContainer = document.createElement("div");
    checkContainer.classList.add("check");
    let checkMark = document.createElement("div");
    checkMark.classList.add("check-mark");
    checkMark.innerHTML = '<img src="./assets/icon-check.svg">';
    checkMark.addEventListener("click", function () {
      markCompleted(item.id);
    });
    checkContainer.appendChild(checkMark);

    // Create element for the todo text
    let todoText = document.createElement("div");
    todoText.classList.add("todo-text");
    todoText.innerText = item.text;

    // Check if the item is completed to apply appropriate styles
    if (item.status == "completed") {
      checkMark.classList.add("checked");
      todoText.classList.add("checked");
    } else {
      // Increment active item count
      activeItemCount++;
    }

    // Append created elements to the todoItem container
    todoItem.appendChild(crossContainer);
    todoItem.appendChild(checkContainer);
    todoItem.appendChild(todoText);
    todoItems.push(todoItem);
  });

  // Replace the contents of the todo-items container with the generated items
  document.querySelector(".todo-items").replaceChildren(...todoItems);

  // Update the text displaying the number of items left
  updateItemsLeftText(activeItemCount);
}

/**
 * Updates the text displaying the number of items left.
 * @param {number} count - The number of active items left.
 */
function updateItemsLeftText(count) {
  const itemsLeftBlock = document.querySelector(".items-left");
  itemsLeftBlock.innerText = `${count} item${count !== 1 ? "s" : ""} left`;
}

// Initial call to getItems to load the initial todo list
getItems();
