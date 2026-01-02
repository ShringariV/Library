const myLibrary = [];

function Book(title, author, pages, read) {
    if(!new.target){
        throw Error('Book constructor must be called with new keyword');
    }
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = Number(pages);
    this.read = Boolean(read);
}

Book.prototype.toggleRead = function () {
    this.read = !this.read;
};

function addBookToLibrary(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);

    displayLibrary();

    e.target.reset();
    return newBook;
}

document
    .getElementById('addBookForm')
    .addEventListener('submit', addBookToLibrary);

function removeBookFromLibrary(bookId) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if (index !== -1) {
        myLibrary.splice(index, 1);
        displayLibrary();
    }

}

function displayLibrary() {
    const libraryEl = document.getElementById('library');
    libraryEl.innerHTML = '';

    myLibrary.forEach(book => {
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';

        const statusText = document.createElement('p');
        statusText.textContent = book.read ? 'Read' : 'Not Read';

        bookDiv.innerHTML = `
            <h3>${book.title}</h3>
            <p>By ${book.author}</p>
            <p>${book.pages} pages</p>
        `;

        const toggleBtn = document.createElement('button');
        toggleBtn.textContent = 'Toggle Read';
        toggleBtn.addEventListener('click', () => {
            book.toggleRead();   // ✅ prototype method
            displayLibrary();    // re-render
        });

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            removeBookFromLibrary(book.id);
            displayLibrary();
        });

        bookDiv.appendChild(statusText);
        bookDiv.appendChild(toggleBtn);
        bookDiv.appendChild(removeBtn);
        libraryEl.appendChild(bookDiv);
    });
}
export { Book, addBookToLibrary, removeBookFromLibrary, displayLibrary };

