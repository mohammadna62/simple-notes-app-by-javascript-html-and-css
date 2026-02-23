const createButton = document.querySelector(".create-button");
const modalScreen = document.querySelector(".modal-screen");
const colorBox = document.querySelectorAll(".color-box");
const closeXBtn = document.querySelector(".close-x-btn");
const closeElm = document.querySelector(".close");
const continueElm = document.querySelector(".continue");
const notesContainer = document.querySelector(".notes-container");
const editorElm = document.querySelector("#editor");
const searchInput = document.querySelector(".search-input");
const searchBtn = document.querySelector(".search-btn");

notesContainer.addEventListener('click', removeNote)
createButton.addEventListener("click", showModal);
closeXBtn.addEventListener("click", closeModal);
closeElm.addEventListener("click", closeModal);
continueElm.addEventListener("click", closeModalAndCreate);
document.body.addEventListener("keydown", closeModalWithEscape);
searchBtn.addEventListener("click", searchInNotes);
searchBtn.addEventListener("blur", function () {
  searchInput.value = "";
  searchInNotes();
});

//<----------------------functions--------------------->
//<--------Search from Notes function------>
function searchInNotes() {
  const searchValue = searchInput.value;
  const notes = document.querySelectorAll(".note");

  notes.forEach(function (note) {
    const noteContentElem = note.querySelector(".note-content");
    if (noteContentElem.innerHTML.includes(searchValue)) {
      note.style.display = "flex";
    } else {
      note.style.display = "none";
    }
  });
}
let dataColor;
colorBox.forEach(function (item) {
  item.addEventListener("click", function (event) {
    dataColor = event.target.dataset.color;
    const colorBox = document.querySelector(".selected");
    colorBox.classList.remove("selected");
    item.classList.add("selected");
  });
});

//<--------Show Modal function------>

function showModal() {
  modalScreen.classList.remove("hidden");
}
//<-------Close Modal function------>
function closeModal() {
  modalScreen.classList.add("hidden");
}
//<-------------Create Note functions---------->
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
  //! after Refactor ,Used the closeModalWithEscape function "Event Delegation" Method
  // noteTrashElem.addEventListener("click", function (event) {
  //   event.target.parentElement.parentElement.remove();
  // });
  trashParentDiv.append(noteTrashElem);
  parentArticleElem.append(noteContentElem);
  parentArticleElem.append(trashParentDiv);

  notesContainer.append(parentArticleElem);
  editorElm.value = "";
  closeModal();
}
function removeNote (event){
  if(event.target.className.includes("fa-trash delete")){
    event.target.parentElement.parentElement.remove()
  }
}
//<-----Close Modal with Escape key On Keyboard function------>
function closeModalWithEscape(event) {
  if (event.key === "Escape") {
    modalScreen.classList.add("hidden");
  }
}
