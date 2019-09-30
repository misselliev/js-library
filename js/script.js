let bookArray = [];
let counter = 0;
let index = 0;

function Book(title, author, pages, status = "Unread") {
  index++;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  counter++;
}

Book.prototype.updateStatus = () => {
  this.status = "Read";
};

const addBook = (title, author, pages, status) => {
  const newBook = new Book(title, author, pages, status);
  bookArray.push(newBook);
};

const deleteBook = book => {
  let idx = bookArray.indexOf(book);
  if (idx > -1) {
    bookArray.splice(idx, 1);
    counter--;
  }
};

addBook("TDD basics", "Dulce Woof", "365");
addBook("TDD", "Dulce Woof", "385");
addBook("JS basics", "Dulce Woof", "425");

// DOM manipulation
const bookTable = document.querySelector("#books-table");
for (let i = 0; i < bookArray.length; i++) {
  let row = document.createElement("tr");
  bookTable.appendChild(row);
  let cell = document.createElement("td");
  row.appendChild(cell);
  cell.innerHTML += bookArray[i].title;
  let cell_author = document.createElement("td");
  row.appendChild(cell_author);
  cell_author.innerHTML += bookArray[i].author;
  let cell_pages = document.createElement("td");
  row.appendChild(cell_pages);
  cell_pages.innerHTML += bookArray[i].pages;
  let cell_status = document.createElement("td");
  row.appendChild(cell_status);
  cell_status.innerHTML += bookArray[i].status;
  let cell_button = document.createElement("td");
  row.appendChild(cell_button);
  let delete_icon = document.createElement('i');
  cell_button.appendChild(delete_icon);
  delete_icon.className = 'alternate trash icon';
}