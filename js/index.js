require('./script');
require('./dom_man');
const BookManager = {
  bookArray: [],
  counter: 0,
  index: 0,

  Book: (title, author, year, pages, status) => {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.status = status;
  },
  addBook: (title, author, year, pages, status) => {
    const newBook = new this.Book(title, author, year, pages, status);
    this.bookArray.push(newBook);
  },
  deleteBook: (book) => {
    let idx = this.bookArray.indexOf(book);
    if (idx > -1) {
      this.bookArray.splice(idx, 1);
      this.counter--;
    }
  }
};