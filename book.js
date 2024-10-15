document.addEventListener("DOMContentLoaded", function() {
    const bookId = new URLSearchParams(window.location.search).get('id');
    const bookDetail = document.getElementById('book-detail');

    const allBooks = JSON.parse(localStorage.getItem('allBooks')) || []; // Get all books from local storage
    const book = allBooks.find(b => b.id == bookId); // Find the book with the matching ID

    if (book) {
        const bookCard = `
            <img class="w-full h-48 object-cover" src="${book.formats['image/jpeg'] || book.formats['image/png']}" alt="Book cover">
            <h2 class="text-xl font-semibold mt-4">${book.title}</h2>
            <p class="text-gray-600">Author: ${book.authors.map(author => author.name).join(', ')}</p>
            <p class="text-gray-600">Genre: ${book.subjects[0] || 'N/A'}</p>
            <p class="text-gray-600">ID: ${book.id}</p>
        `;
        bookDetail.innerHTML = bookCard; // Display the book details
    } else {
        bookDetail.innerHTML = `<p class="text-red-600">Book not found.</p>`;
    }
});
