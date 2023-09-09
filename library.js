import { Book } from "./BookClass.js";

import { Library } from "./LibraryClass.js";

let myLibrary = new Library();

const libraryContainer = document.querySelector(".library-container");
const addBookBtn = document.querySelector(".add-book-button");
const popup = document.querySelector("#popup");
const overlay = document.querySelector("#overlay");
const closePopupBtn = document.querySelector(".close-button");
const newBookForm = document.querySelector("#new-book-form");
const deleteBookButtons = document.querySelectorAll(".delete-book-button");

//event delegation
libraryContainer.addEventListener("click", (event) => {
  //index is the index of clicked element in myLibrary array

  console.log("clicked");

  if (event.target.className === "delete-book-button") {
    let index = event.target.parentElement.getAttribute("data-index");
    myLibrary.deleteBookByIndex(index);
    myLibrary.saveLibrary();
    displayLibrary();
  } else if (event.target.className === "is-read-checkbox") {
    let index =
      event.target.parentElement.parentElement.getAttribute("data-index");
    myLibrary._bookCatalog[index].isRead =
      !myLibrary._bookCatalog[index].isRead;

    let isReadText = event.target.parentElement.firstChild;
    if (myLibrary._bookCatalog[index].isRead === true) {
      isReadText.innerText = "read";
    } else {
      isReadText.innerText = "not read";
    }
    myLibrary.saveLibrary();
    displayLibrary();
  }
});

window.addEventListener("load", () => {
  myLibrary.LoadFromLocalStorage();
  displayLibrary();
});

addBookBtn.addEventListener("click", openAddBookPopup);

closePopupBtn.addEventListener("click", closeAddBookPopup);

newBookForm.addEventListener("submit", (e) => {
  e.preventDefault;
  const formData = new FormData(newBookForm);
  addBookFromForm(formData);
});

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
  myLibrary.addBookToLibrary(newBook);

  libraryContainer.innerHTML = "";
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

//displays all books in Html
function displayLibrary() {
  libraryContainer.innerHTML = "";
  console.log("display Library");
  console.log(myLibrary._bookCatalog);

  let i = 0;

  myLibrary._bookCatalog.forEach((book) => {
    displayBook(book, i++);
  });
}

function displayBook(newBook, index) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");
  bookContainer.setAttribute("data-index", index);

  const bookTitle = document.createElement("p");
  bookTitle.classList.add("book-title");
  bookTitle.innerText = newBook._title;

  const author = document.createElement("p");
  author.classList.add("author");
  author.innerText = "By: " + newBook._author;

  const numberOfPages = document.createElement("p");
  numberOfPages.classList.add("number-of-pages");
  numberOfPages.innerText = newBook._numberOfPages + " pages";

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

//let book = new Book("lotr", "tolkien", 904, true);

// //myLibrary.LoadFromLocalStorage();
// displayLibrary();
