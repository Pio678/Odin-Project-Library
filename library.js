let myLibrary = [];

const libraryContainer = document.querySelector(".library-container");
const addBookBtn = document.querySelector(".add-book-button");
const popup = document.querySelector("#popup");
const overlay = document.querySelector("#overlay");
const closePopupBtn = document.querySelector(".close-button");
const newBookForm = document.querySelector("#new-book-form");
const deleteBookButtons = document.querySelectorAll(".delete-book-button");
const page = document.querySelector("body");

//event delegation
libraryContainer.addEventListener("click", (event) => {
  //index is the index of clicked element in myLibrary array

  if (event.target.className === "delete-book-button") {
    let index = event.target.parentElement.getAttribute("data-index");
    deleteBookByIndex(index);
    console.log(index);
  } else if (event.target.className === "is-read-checkbox") {
    let index =
      event.target.parentElement.parentElement.getAttribute("data-index");
    myLibrary[index].isRead = !myLibrary[index].isRead;

    let isReadText = event.target.parentElement.firstChild;
    if (myLibrary[index].isRead === true) {
      isReadText.innerText = "read";
    } else {
      isReadText.innerText = "not read";
    }
    saveLibrary();
  }
});

window.addEventListener("load", LoadFromLocalStorage);

addBookBtn.addEventListener("click", openAddBookPopup);

closePopupBtn.addEventListener("click", closeAddBookPopup);

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault;
  const formData = new FormData(newBookForm);
  addBookFromForm(formData);
});

function LoadFromLocalStorage() {
  let myLibraryJSON = localStorage.getItem("myLibrary");

  let localStorageLibrary = JSON.parse(myLibraryJSON);

  if (localStorageLibrary !== null) {
    myLibrary = localStorageLibrary;
  }
  displayLibrary();
}

function saveLibrary() {
  let myLibraryJSON = JSON.stringify(myLibrary);
  localStorage.setItem("myLibrary", myLibraryJSON);
}

function deleteBookByIndex(index) {
  myLibrary.splice(index, 1);

  saveLibrary();
  clearLibraryDisplay();
  displayLibrary();
}

function addBookFromForm(formData) {
  let author = formData.get("author");
  let title = formData.get("title");
  let numberOfPages = formData.get("number-of-pages");

  let isRead;
  if (formData.get("is-read") === "on") {
    isRead = true;
  } else {
    isRead = false;
  }

  let newBook = new Book(title, author, numberOfPages, isRead);
  console.log(newBook);
  addBookToLibrary(newBook);

  clearLibraryDisplay();
  displayLibrary();
}

function openAddBookPopup() {
  popup.classList.add("active");
  overlay.classList.add("active");
}

function closeAddBookPopup() {
  popup.classList.remove("active");
  overlay.classList.remove("active");
}

//Book object contructor
function Book(title, author, numberOfPages, isRead) {
  this.title = title;
  this.author = author;
  this.numberOfPages = numberOfPages;
  this.isRead = isRead;
}

function addBookToLibrary(newBook) {
  myLibrary.push(newBook);

  saveLibrary();
}

//clears all books from html
function clearLibraryDisplay() {
  const libraryDisplay = document.querySelectorAll(".book-container");
  for (book of libraryDisplay) {
    libraryContainer.removeChild(book);
  }
}

//displays all books in Html
function displayLibrary() {
  for (let i = 0; i < myLibrary.length; i++) {
    displayBook(myLibrary[i], i);
  }
}

function displayBook(newBook, index) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  bookContainer.setAttribute("data-index", index);

  const bookTitle = document.createElement("p");
  bookTitle.classList.add("book-title");
  bookTitle.innerText = newBook.title;

  const author = document.createElement("p");
  author.classList.add("author");
  author.innerText = "By: " + newBook.author;

  const numberOfPages = document.createElement("p");
  numberOfPages.classList.add("number-of-pages");
  numberOfPages.innerText = newBook.numberOfPages + " pages";

  const isReadContainer = document.createElement("div");
  isReadContainer.classList.add("is-read-container");

  const isReadText = document.createElement("p");

  const isReadCheckbox = document.createElement("input");
  isReadCheckbox.classList.add("is-read-checkbox");
  isReadCheckbox.setAttribute("type", "checkbox");

  if (newBook.isRead === true) {
    isReadCheckbox.checked = true;
    isReadText.innerText = "read";
  } else {
    isReadText.innerText = " not read";
  }

  const deleteBookBtn = document.createElement("button");
  deleteBookBtn.classList.add("delete-book-button");
  deleteBookBtn.innerText = "Delete";

  bookContainer.appendChild(bookTitle);
  bookContainer.appendChild(author);
  bookContainer.appendChild(numberOfPages);
  bookContainer.appendChild(isReadContainer);
  isReadContainer.appendChild(isReadText);
  isReadContainer.appendChild(isReadCheckbox);
  bookContainer.appendChild(deleteBookBtn);

  libraryContainer.appendChild(bookContainer);
}

//function deletes all books from local storage
function deleteAllBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    myLibrary.pop();
  }
  clearLibraryDisplay();

  let myLibraryJSON = JSON.stringify(myLibrary);

  localStorage.setItem("myLibrary", myLibraryJSON);
}

displayLibrary();
