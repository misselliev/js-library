// FUNCTIONALITY

const bookArray = [];
let counter = 0;
let index = 0;

function Book(title, author, pages, status = 'Unread') {
  index += 1;
  this.index = index;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
  counter += 1;
}

const addBook = (title, author, pages, status) => {
  const newBook = new Book(title, author, pages, status);
  bookArray.push(newBook);
  return newBook;
};

const deleteBook = (book) => {
  const fila = book.parentElement.parentElement;
  let temp;
  for (let i = 0; i < bookArray.length; i += 1) {
    if (parseInt(book.id, 10) === bookArray[i].index) {
      temp = bookArray[i];
      break;
    }
  }
  const idx = bookArray.indexOf(temp);
  if (idx > -1) {
    bookArray.splice(idx, 1);
    counter -= 1;
  }
  fila.style.display = 'none';
};

function alertMe(status) {
  const type = status === true ? 'green' : 'warning';
  const str = status ? 'Book saved' : 'Fill in all the fields';
  const title = document.getElementById('accordion-title');
  const alert = document.createElement('div');
  alert.className = `ui floating ${type} message`;
  alert.innerHTML = str;
  title.appendChild(alert);
  setTimeout(() => {
    alert.style.display = 'none';
  }, 2000);
}

function checkInputs(form) {
  if (
    form['book-name'].value === ''
    || form['author-name'].value === ''
    || form['book-pages'].value === ''
  ) {
    alertMe(false);
    return false;
  }
  alertMe(true);
  return true;
}

const bookTable = document.querySelector('#books-table');

function addDeleteButton(book, row) {
  const cell = document.createElement('td');
  const button = document.createElement('button');

  row.appendChild(cell);
  cell.appendChild(button);

  button.setAttribute('id', book.index);
  button.className = 'ui colored-btn button delete';
  button.innerHTML = 'Delete';

  button.addEventListener('click', () => {
    deleteBook(button);
  });
}

// Adding toggle to read button
function updateStatus(button) {
  if (button.innerHTML === 'Unread') {
    button.classList.add('change-color');
    button.innerHTML = 'Read';
  } else {
    button.classList.remove('change-color');
    button.innerHTML = 'Unread';
  }

  let book;
  for (let i = 0; i < bookArray.length; i += 1) {
    if (parseInt(button.id, 10) === bookArray[i].index) {
      book = bookArray[i];
      break;
    }
  }
  book.status = book.status === 'Read' ? 'Unread' : 'Read';
}

function displayBook(book) {
  const row = document.createElement('tr');
  bookTable.appendChild(row);
  const tempIndex = book.index;

  Object.keys(book).forEach((item) => {
    if (item === 'index') return;

    const cell = document.createElement('td');
    row.appendChild(cell);
    if (item === 'status') {
      const button = document.createElement('button');
      button.setAttribute('id', tempIndex);
      button.innerHTML = book[item];
      if (button.innerHTML === 'Read') {
        button.className = 'ui colored-btn change-color toggle button';
      } else {
        button.className = 'ui toggle colored-btn button';
      }
      cell.appendChild(button);
      button.addEventListener('click', () => {
        updateStatus(button);
      });
    } else {
      cell.innerHTML = book[item];
    }
  });

  addDeleteButton(book, row);
}

// Adding a book form
function addBookForm() {
  const addButton = document.querySelector('.addBook');
  addButton.addEventListener('click', () => {
    const form = document.getElementById('add-book-form');
    const bookNameVal = form['book-name'].value;
    const bookAuthorVal = form['author-name'].value;
    const bookPagesVal = form['book-pages'].value;
    const bookStatus = form['book-status'].checked ? 'Read' : 'Unread';
    const res = checkInputs(form);

    if (res) {
      const book = addBook(bookNameVal, bookAuthorVal, bookPagesVal, bookStatus);
      displayBook(book);
      form.reset();
    }
  });
}

// Opening up addbookForm
const accordion = document.getElementById('accordion-title');
const accordionContent = document.getElementById('accordion-content');

accordion.addEventListener('click', () => {
  if (accordion.classList.length === 2) {
    accordion.classList.remove('active');
    accordionContent.classList.remove('active');
  } else {
    accordion.classList.add('active');
    accordionContent.classList.add('active');
  }
});

function renderLibrary() {
  let row;
  bookArray.forEach((book) => {
    row = document.createElement('tr');
    bookTable.appendChild(row);

    Object.keys(book).forEach((item) => {
      if (item === 'index') return;

      const cell = document.createElement('td');
      row.appendChild(cell);

      if (item === 'status') {
        const button = document.createElement('button');
        button.setAttribute('id', book.index);
        button.className = 'ui toggle colored-btn button';
        button.innerHTML = book.status;
        cell.appendChild(button);
        button.addEventListener('click', () => {
          updateStatus(button);
        });
      } else {
        cell.innerHTML += book[item];
      }
    });

    addDeleteButton(book, row);
  });
}

addBook('TDD basics', 'Dulce Woof', '365');
addBook('TDD cryptics', "Dulce Lion's Heart", '385');
addBook('JS basics', 'Dulce Woof', '425');
renderLibrary();
addBookForm();