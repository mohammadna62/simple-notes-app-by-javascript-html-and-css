const createButton = document.querySelector(".create-button");
const modalScreen = document.querySelector(".modal-screen");
const colorBox = document.querySelectorAll(".color-box");
const closeXBtn = document.querySelector(".close-x-btn");
const closeElm = document.querySelector(".close");
const continueElm = document.querySelector(".continue");
const notesContainer = document.querySelector(".notes-container");
const editorElm = document.querySelector("#editor");

createButton.addEventListener("click", showModal);
closeXBtn.addEventListener("click", closeModal);
closeElm.addEventListener("click", closeModal);
continueElm.addEventListener("click", closeModalAndCreate);
document.body.addEventListener("keydown", closeModalWithEscape);
let dataColor;
colorBox.forEach(function (item) {
  item.addEventListener("click", function (event) {
    dataColor = event.target.dataset.color;
    const colorBox = document.querySelector(".selected");
    colorBox.classList.remove("selected");
    item.classList.add("selected");
  });
});

//<----------------------functions--------------------->

function showModal() {
  modalScreen.classList.remove("hidden");
}
function closeModal() {
  modalScreen.classList.add("hidden");
}
function closeModalAndCreate() {
  const note = editorElm.value;
  const parentArticleElem = document.createElement("article");
  parentArticleElem.classList.add("note");
  parentArticleElem.style.backgroundColor = dataColor;

  const noteContentElem = document.createElement("p");
  noteContentElem.classList.add("note-content");
  noteContentElem.innerHTML = note;

  const trashParentDiv = document.createElement("div");
  const noteTrashElem = document.createElement("i");
  noteTrashElem.className = "fa-solid fa-trash delete";
  noteTrashElem.addEventListener("click", function (event) {
    event.target.parentElement.parentElement.remove();
  });
  trashParentDiv.append(noteTrashElem);
  parentArticleElem.append(noteContentElem);
  parentArticleElem.append(trashParentDiv);

  notesContainer.append(parentArticleElem);
  editorElm.value = "";
  closeModal();
}
function closeModalWithEscape(event) {
  if (event.key === "Escape") {
    modalScreen.classList.add("hidden");
  }
}
