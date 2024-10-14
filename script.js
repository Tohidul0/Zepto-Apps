document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://gutendex.com/books';
    const bookList = document.getElementById('book-list');

    // Fetch the books from the API
    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayBooks(data.results);
    })
    .catch(error => {
        console.error('Error fetching books:', error.message || error);
        alert('An error occurred while fetching the books. Please try again later.');
    });

    // Function to display books
    function displayBooks(books) {
        bookList.innerHTML = ''; 
        books.forEach(book => {
            const bookCard = `
                <div class="bg-white rounded-lg shadow-md p-4">
                    <img class="w-full h-48 object-cover" src="${book.formats['image/jpeg']}" alt="Book cover">
                    <h2 class="text-xl font-semibold mt-4">${book.title}</h2>
                    <p class="text-gray-600">Author: ${book.authors.map(author => author.name).join(', ')}</p>
                    <p class="text-gray-600">Genre: ${book.subjects[0] || 'N/A'}</p>
                    <p class="text-gray-600">ID: ${book.id}</p>
                </div>
            `;
            bookList.innerHTML += bookCard;
        });
    }
});
