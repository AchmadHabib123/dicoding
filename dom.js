const COMPLETED_LIST_BOOK_ID = "completed-books";
const UNCOMPLETED_LIST_BOOK_ID = "uncompleted-books";
const ITEM_BOOKS = "itemBooks";

function addBook() {
    const uncompletedBookList = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const CompletedBookList = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const isCompleted = document.getElementById("inputBookIsComplete").checked;

    const book = inputBook(bookTitle, bookAuthor, bookYear, isCompleted);
    const bookObject = composeBookObject(bookTitle, bookAuthor, bookYear, isCompleted);

    book[ITEM_BOOKS] = bookObject.id;
    books.push(bookObject);

    if (isCompleted) {
        CompletedBookList.append(book);
    } else {
        uncompletedBookList.append(book);
    }
    updateDataToStorage();
}

function inputBook(title, author, year, isCompleted) {
    const textTitle = document.createElement("h3");
    textTitle.innerText = title;

    const textAuthor = document.createElement("p");
    textAuthor.innerText = author;

    const textYear = document.createElement("p");
    textYear.innerText = year;

    if (isCompleted) {
        firstButton = createUncheckButton();
        secondButton = createTrashButton();
    } else {
        firstButton = createCheckButton();
        secondButton = createTrashButton();
    }

    const container = document.createElement("article");
    container.classList.add("book_item");
    const containerButton = document.createElement("div");
    containerButton.classList.add("action");
    containerButton.append(firstButton, secondButton);

    container.append(textTitle, textAuthor, textYear, containerButton);

    return container;
}

function addBookToCompleted(bookElement) {
    const listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector(".book_shelf > .book_list > .book_item > h3").innerText;
    const bookAuthor = bookElement.querySelectorAll(".book_shelf > .book_list > .book_item > p")[0].innerText;
    const bookYear = bookElement.querySelectorAll(".book_shelf > .book_list > .book_item > p")[1].innerText;

    const newBook = inputBook(bookTitle, bookAuthor, bookYear, true);
    const book = findBook(bookElement[ITEM_BOOKS]);

    book.isCompleted = true;
    newBook[ITEM_BOOKS] = book.id;

    listCompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function undoBookFromCompleted(bookElement) {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    const bookTitle = bookElement.querySelector(".book_shelf > .book_list > .book_item > h3").innerText;
    const bookAuthor = bookElement.querySelectorAll(".book_shelf > .book_list > .book_item > p")[0].innerText;
    const bookYear = bookElement.querySelectorAll(".book_shelf > .book_list > .book_item > p")[1].innerText;

    const newBook = inputBook(bookTitle, bookAuthor, bookYear, false);

    const book = findBook(bookElement[ITEM_BOOKS]);
    book.isCompleted = false;
    newBook[ITEM_BOOKS] = book.id;

    listUncompleted.append(newBook);
    bookElement.remove();

    updateDataToStorage();
}

function removeBookFromCompleted(bookElement) {
    const bookPosition = findBookIndex(bookElement[ITEM_BOOKS]);
    books.splice(bookPosition, 1);

    bookElement.remove();
    updateDataToStorage();
}

function createButton(buttonTypeClass, text, eventListener) {
    const button = document.createElement("button");
    button.innerText = text;
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function(event) {
        eventListener(event);
    });
    return button;
}

function createCheckButton() {
    return createButton("green", "selesai dibaca", function(event) {
        addBookToCompleted(event.target.parentElement.parentElement);
    });
}

function createUncheckButton() {
    return createButton("green", "Belum selesai dibaca", function(event) {
        undoBookFromCompleted(event.target.parentElement.parentElement);
    });
}

function createTrashButton() {
    return createButton("red", "Hapus buku", function(event) {
        removeBookFromCompleted(event.target.parentElement.parentElement);
    });
}