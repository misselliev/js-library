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
  return newBook;
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
function renderLibrary() {
  const bookTable = document.querySelector("#books-table");
  let row;

  for (let i = 0; i < bookArray.length; i++) {
    row = document.createElement("tr");
    bookTable.appendChild(row);
    Object.keys(bookArray[i]).forEach(item => {
      if (item === "index") return;
      let cell = document.createElement("td");
      row.appendChild(cell);
      cell.innerHTML += bookArray[i][item];
    });
    addDeleteButton(bookArray[i]['index'], row);
  }
}

function addDeleteButton(book, row) {
  let cell = document.createElement("td");
  let button = document.createElement("button");
  let trash_icon = document.createElement("i");
  
  row.appendChild(cell);

  cell.appendChild(button);
  button.setAttribute("id", book['index']);
  button.className = "delete";
  button.innerHTML = "Delete ";
  
  trash_icon.className = "alternate trash icon";
  button.appendChild(trash_icon);
}

function displayBook(book) {
  const bookTable = document.querySelector("#books-table");
  let row = document.createElement("tr");
  bookTable.appendChild(row);
  
  Object.keys(book).forEach(item => {
    if (item === "index") return;
    let cell = document.createElement("td");
    row.appendChild(cell);
    cell.innerHTML += book[item];
  });

  addDeleteButton(book['index'], row)
}

// Adding delete to buttons
const bookButtons = document.querySelectorAll("#books-table .delete");
const listItem = document.querySelectorAll("#books-table");
Array.from(bookButtons).forEach(function (item) {
  item.addEventListener("click", e => {
    const a = e.target.parentElement;
    const b = a.parentElement;
    b.parentNode.removeChild(b);
    deleteBook(parseInt(item.id));
  });
});

// Adding a book form
function renderForm() {
  const addButton = document.querySelector(".addBook");
  addButton.addEventListener("click", e => {
    const form = document.getElementById("add-book-form");
    const bookNameVal = form["book-name"].value;
    const bookAuthorVal = form["author-name"].value;
    const bookPagesVal = form["book-pages"].value;
    const bookStatus = form["book-status"].checked ? 'Read' : 'Unread';
    const res = checkInputs(form);

    if (res) {
      const book = addBook(bookNameVal, bookAuthorVal, bookPagesVal, bookStatus);
      displayBook(book);
      document.getElementById("add-book-form").reset();
    }
  });
}

function checkInputs(form) {
  if (form['book-name'].value == '' || form['author-name'].value == '' || form['book-pages'].value == '') {
    alert("Fill in all the fields");
    return false;
  }
  return true;
}
renderLibrary();
renderForm();
