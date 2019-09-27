let collection = [];
let counter = 0;
let index = 0;

function Book(title, author, pages, status) {
  index++;
  this.title = title
  this.author = author
  this.pages = pages
  this.status = status
  counter++
}

const addBook = (title, author, pages, status) => {
  const newBook = new Book(title, author, pages, status);
  collection.push(newBook);
}

const deleteBook = (book) => {
  let idx = collection.indexOf(book)
  if (idx > -1) {
    collection.splice(idx, 1);
    counter--;
  }
}
