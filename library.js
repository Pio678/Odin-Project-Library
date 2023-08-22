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
  if (event.target.className === "delete-book-button") {
    let index = event.target.getAttribute("data-index");
    deleteBookByIndex(index);
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
  myLibrary = JSON.parse(myLibraryJSON);
  displayLibrary();
}

function deleteBookByIndex(index) {
  myLibrary.splice(index, 1);

  let myLibraryJSON = JSON.stringify(myLibrary);
  localStorage.setItem("myLibrary", myLibraryJSON);
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

  let myLibraryJSON = JSON.stringify(myLibrary);

  localStorage.setItem("myLibrary", myLibraryJSON);
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

  const bookTitle = document.createElement("p");
  bookTitle.classList.add("book-title");
  bookTitle.innerText = newBook.title;

  const author = document.createElement("p");
  author.classList.add("author");
  author.innerText = "By: " + newBook.author;

  const numberOfPages = document.createElement("p");
  numberOfPages.classList.add("number-of-pages");
  numberOfPages.innerText = newBook.numberOfPages + " pages";

  const isBookRead = document.createElement("p");
  isBookRead.classList.add("is-book-read");

  if (newBook.isRead === true) {
    isBookRead.innerText = "you have read this book";
  } else {
    isBookRead.innerText = "you have NOT read this book";
  }

  const deleteBookBtn = document.createElement("button");
  deleteBookBtn.classList.add("delete-book-button");
  deleteBookBtn.innerText = "delete";
  deleteBookBtn.setAttribute("data-index", index);

  bookContainer.appendChild(bookTitle);
  bookContainer.appendChild(author);
  bookContainer.appendChild(numberOfPages);
  bookContainer.appendChild(isBookRead);
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
