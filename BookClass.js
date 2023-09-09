export class Book {
  constructor(title, author, numberOfPages, isRead) {
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.isRead = isRead;
  }

  get title() {
    return this._title;
  }

  set title(title) {
    this._title = title;
  }

  get author() {
    return this._author;
  }

  set author(author) {
    this._author = author;
  }

  get numberOfPages() {
    return this._numberOfPages;
  }

  set numberOfPages(numberOfPages) {
    this._numberOfPages = numberOfPages;
  }

  get isRead() {
    return this._isRead;
  }

  set isRead(isRead) {
    this._isRead = isRead;
  }
}

class User {
  constructor() {
    // invokes the setter
    this.name = "";
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}
