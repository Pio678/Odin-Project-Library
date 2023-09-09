export class Library {
  constructor() {
    //catalog is a list of all books in library
    this.bookCatalog = [];
  }

  addBookToLibrary(newBook) {
    this.bookCatalog.push(newBook);

    this.saveLibrary();
  }

  deleteBookByIndex(index) {
    this.bookCatalog.splice(index, 1);

    this.saveLibrary();
  }

  saveLibrary() {
    let myLibraryJSON = JSON.stringify(this.bookCatalog);
    localStorage.setItem("myLibrary", myLibraryJSON);
  }

  LoadFromLocalStorage() {
    let myLibraryJSON = localStorage.getItem("myLibrary");

    let localStorageLibrary = JSON.parse(myLibraryJSON);

    if (localStorageLibrary !== null && localStorageLibrary !== undefined) {
      this.bookCatalog = localStorageLibrary;
    } else {
      this.bookCatalog = [];
    }
  }

  deleteAllBooks() {
    for (let i = 0; i < this.bookCatalog.length; i++) {
      this.bookCatalog.pop();
    }

    //clearLibraryDisplay();

    saveLibrary();
  }

  get bookCatalog() {
    return this._bookCatalog;
  }

  set bookCatalog(newCatalog) {
    this._bookCatalog = newCatalog;
  }
}
