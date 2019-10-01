let bookArray = [];
let counter = 0;
let index = 0;

function Book(title, author, pages, status = "Unread") {
  this.index = index++;
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
  let temp;
  for (let i = 0; i < bookArray.length; i++) {
    if (book == bookArray[i].index) {
      temp = bookArray[i];
      break;
    }
  }
  let idx = bookArray.indexOf(temp);
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
  let button_icon = document.createElement("button");
  cell_button.appendChild(button_icon);
  let delete_icon = document.createElement("i");
  button_icon.setAttribute("id", bookArray[i].index);
  button_icon.className = "delete";
  button_icon.innerHTML = "Delete";
  button_icon.appendChild(delete_icon);
  delete_icon.className = "alternate trash icon";
}

// Adding delete to buttons
const bookButtons = document.querySelectorAll("#books-table .delete");
const listItem = document.querySelectorAll("#books-table");
Array.from(bookButtons).forEach(function(item) {
  item.addEventListener("click", e => {
    const a = e.target.parentElement;
    const b = a.parentElement;
    b.parentNode.removeChild(b);
    deleteBook(parseInt(item.id));
  });
});
