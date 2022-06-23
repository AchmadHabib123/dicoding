const STORAGE_KEY = "BOOKS_APPS";

let books = [];

function composeBookObject(title, author, year, isCompleted) {
    return {
        id: +new Date(),
        title,
        author,
        year,
        isCompleted,
    };
}

function isStorageExist() /* boolean */ {
    if (typeof Storage === undefined) {
        alert("Browser anda tidak mendukung local storage");
        return false;
    }
    return true;
}

function saveData() {
    const parsed = JSON.stringify(books);
    localStorage.setItem(STORAGE_KEY, parsed);
    document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(STORAGE_KEY);

    let data = JSON.parse(serializedData);

    if (data !== null) books = data;

    document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
    if (isStorageExist()) saveData();
}

function findBook(bookId) {
    for (book of books) {
        if (book.id === bookId) return book;
    }
    return null;
}

function findBookIndex(bookId) {
    let index = 0;
    for (book of books) {
        if (book.id === bookId) return index;

        index++;
    }

    return -1;
}

function refreshDataFromBooks() {
    const listUncompleted = document.getElementById(UNCOMPLETED_LIST_BOOK_ID);
    let listCompleted = document.getElementById(COMPLETED_LIST_BOOK_ID);

    for (book of books) {
        const newBook = inputBook(book.title, book.author, book.year, book.isCompleted);

        if (book.isCompleted) {
            listCompleted.append(newBook);
        } else {
            listUncompleted.append(newBook);
        }
    }
}
function searchBooks() {
    document.getElementById('searchSubmit').addEventListener("click", function(event) {
        event.preventDefault();
        const searchBook = document.getElementById('searchBookTitle').value.toLowerCase();
        const bookList = document.querySelectorAll('.book_item > h3');
        for (buku of bookList) {
            if (searchBook !== bookList[0].innerText.toLowerCase()) {
                buku.parentElement.style.display = "none";
            } else {
                buku.parentElement.style.display = "block";
            }
        }
    })
}
