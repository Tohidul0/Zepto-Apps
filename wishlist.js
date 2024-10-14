document.addEventListener("DOMContentLoaded", function() {
    const apiUrl = 'https://gutendex.com/books';
    const wishlistBooks = document.getElementById('wishlist-books');
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    // Fetch books from the API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const allBooks = data.results;
            const wishlistedBooks = allBooks.filter(book => wishlist.includes(book.id));
            displayWishlist(wishlistedBooks);
        })
        .catch(error => console.error('Error fetching wishlist books:', error));

    // Display wishlisted books
    function displayWishlist(books) {
        wishlistBooks.innerHTML = ''; // Clear the wishlist
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
            wishlistBooks.innerHTML += bookCard;
        });
    }
});
