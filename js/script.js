
// FUNCTIONALITY

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

Book.prototype.updateStatus = button => {
  this.status = "Read";
  button.className += "active";
};

const addBook = (title, author, pages, status) => {
  const newBook = new Book(title, author, pages, status);
  bookArray.push(newBook);
  return newBook;
  // remember to update this in db
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


function checkInputs(form) {
  if (
    form["book-name"].value == "" ||
    form["author-name"].value == "" ||
    form["book-pages"].value == ""
  ) {
    alert("Fill in all the fields");
    return false;
  }
  return true;
}


// HTML
// DOM manipulation
const bookTable = document.querySelector("#books-table");

function renderLibrary() {
  let row;
  for (let i = 0; i < bookArray.length; i++) {
    row = document.createElement("tr");
    bookTable.appendChild(row);

    Object.keys(bookArray[i]).forEach(item => {

      if (item === "index") return;

      let cell = document.createElement("td");
      row.appendChild(cell);

      if (item == "status") {
        let button = document.createElement("button");
        button.className = "ui toggle button";
        button.innerHTML = bookArray[i]["status"];
        cell.appendChild(button);
        return;

      } else {
        cell.innerHTML += bookArray[i][item];
      }
    });

    updateStatus();
    renderDeleteButton(bookArray[i]["index"], row);
  }
}

function renderDeleteButton(book, row) {
  let cell = document.createElement("td");
  let button = document.createElement("button");

  row.appendChild(cell);
  cell.appendChild(button);

  button.setAttribute("id", book);
  button.className = "ui button delete";
  button.innerHTML = "Delete ";

  const bookButtons = document.querySelectorAll("#books-table .delete");
  Array.from(bookButtons).forEach(function (item) {
    item.addEventListener("click", e => {
      const a = e.target.parentElement;
      const b = a.parentElement;
      b.parentNode.removeChild(b);
      deleteBook(parseInt(item.id));
    });
  });
}

function displayBook(book) {
  let row = document.createElement("tr");
  bookTable.appendChild(row);

  Object.keys(book).forEach(item => {
    if (item === "index") return;
    let cell = document.createElement("td");
    row.appendChild(cell);
    if (item == "status") {
      let button = document.createElement("button");
      button.innerHTML = book[item];
      if (button.innerHTML == "Read") {
        button.className = "ui active toggle button";
      } else {
        button.className = "ui toggle button";
      }
      cell.appendChild(button);
      return;
    } else {
      cell.innerHTML = book[item];
    }
  });

  renderDeleteButton(book["index"], row);
  updateStatus();
}

// Adding toggle to read button
function updateStatus() {
  const statusButton = bookTable.querySelectorAll(".toggle");
  
  Array.from(statusButton).forEach(function (item) {
    item.addEventListener("click", e => {
      const a = e.target.parentElement;

      if (item.innerHTML == "Unread") {
        item.classList.add("active");
        item.innerHTML = "Read";
        return;

      } else {
        item.classList.remove("active");
        item.innerHTML = "Unread";
        return;
      }
      // to be updated on db
    });
  });
}

// Adding a book form
function addBookForm() {
  const addButton = document.querySelector(".addBook");
  addButton.addEventListener("click", e => {
    const form = document.getElementById("add-book-form");
    const bookNameVal = form["book-name"].value;
    const bookAuthorVal = form["author-name"].value;
    const bookPagesVal = form["book-pages"].value;
    const bookStatus = form["book-status"].checked ? "Read" : "Unread";
    const res = checkInputs(form);

    if (res) {
      const book = addBook(
        bookNameVal,
        bookAuthorVal,
        bookPagesVal,
        bookStatus
      );
      displayBook(book);
      form.reset();
    }
  });
}



// Opening up addbookForm
let accordion = document.getElementById("accordion-title");
let accordionContent = document.getElementById("accordion-content");

accordion.addEventListener("click", e => {
  if (accordion.classList.length == 2) {
    accordion.classList.remove('active');
    accordionContent.classList.remove('active');
  } else {
    accordion.classList.add("active");
    accordionContent.classList.add("active");
  }
})

addBook("TDD basics", "Dulce Woof", "365");
addBook("TDD", "Dulce Woof", "385");
addBook("JS basics", "Dulce Woof", "425");
renderLibrary();
addBookForm();