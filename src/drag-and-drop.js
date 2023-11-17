import dragula from "dragula";

const todoItemsContainer = document.querySelector(".todo-items");

const drake = dragula([todoItemsContainer]);

drake.on("drop", (el, target, source, sibling) => {
  const newOrder = Array.from(todoItemsContainer.children).map(
    (item) => item.id
  );

  updateTaskOrder(newOrder);
});

function updateTaskOrder(newOrder) {
  console.log("New task order:", newOrder);
}
