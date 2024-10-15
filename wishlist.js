document.addEventListener("DOMContentLoaded", function() {
    const wishlistBooks = JSON.parse(localStorage.getItem('wishlist')) || [];
    const allBooks = JSON.parse(localStorage.getItem('allBooks')) || [];
    const wishlistContainer = document.getElementById('wishlist-books');

    // Function to display wishlist books
    function displayWishlist() {
        wishlistContainer.innerHTML = ''; 

        if (wishlistBooks.length === 0) {
            wishlistContainer.innerHTML = '<p class="text-gray-500">Your wishlist is empty.</p>';
            return;
        }

        const wishlistedBooks = allBooks.filter(book => wishlistBooks.includes(book.id));

        wishlistedBooks.forEach(book => {
            const bookCard = `
                <div class="bg-white rounded-lg shadow-md p-4 mb-4">
                    <img class="w-full h-48 object-cover" src="${book.formats['image/jpeg'] || book.formats['image/png']}" alt="Book cover">
                    <h2 class="text-xl font-semibold mt-4">${book.title}</h2>
                    <p class="text-gray-600">Author: ${book.authors.map(author => author.name).join(', ')}</p>
                    <p class="text-gray-600">Genre: ${book.subjects[0] || 'N/A'}</p>
                    <a href="book.html?id=${book.id}" class="text-blue-500 hover:underline">View Details</a>
                </div>
            `;
            wishlistContainer.innerHTML += bookCard;
        });
    }

    displayWishlist(); 
});
