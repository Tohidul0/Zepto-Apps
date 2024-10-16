document.addEventListener("DOMContentLoaded", function() {
    
    const wishlistBooks = JSON.parse(localStorage.getItem('wishlist')) || [];
    const allBooks = JSON.parse(localStorage.getItem('allBooks')) || [];
    const wishlistContainer = document.getElementById('wishlist-books');
    const pagination = document.getElementById('pagination');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageNumbers = document.getElementById('page-numbers');
    var currentPage = 1;
    
    // Function to display wishlist books
    function displayWishlist() {
        const booksPerRow = 3;
        const rowsPerPage = 2;
        const booksPerPage = booksPerRow * rowsPerPage;
        wishlistContainer.innerHTML = ''; 

        if (wishlistBooks.length === 0) {
            wishlistContainer.innerHTML = '<h2 class="text-gray-500 mx-auto mt-6 bg-green-400">Your wishlist is empty.</h2>';
            pagination.classList.add('hidden');
            return;
        }
        
        const wishlistedBooks = allBooks.filter(book => wishlistBooks.includes(book.id));
        const start = (currentPage - 1) * booksPerPage;
        const end = start + booksPerPage;
        const paginatedBooks = wishlistedBooks.slice(start, end);

        paginatedBooks.forEach(book => {
            const bookCard = `
                <div class="relative rounded-lg shadow-lg p-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden group border-2 border-gray-300 hover:border-blue-400 mb-4">
    <div class="w-full h-48 flex items-center justify-center mb-3 rounded-md overflow-hidden relative">
        <div class="absolute inset-0 rounded-md shadow-lg transition-shadow duration-300 group-hover:shadow-2xl"></div>
    <img class="h-full object-cover transition-transform duration-300 hover:scale-110 rounded-md" 
         src="${book.formats['image/jpeg'] || book.formats['image/png']}" 
         alt="Book cover">
</div>
    
    <h2 class="text-lg font-bold text-gray-800 mb-1 text-center hover:text-blue-500 transition-colors duration-300">
        ${book.title}
    </h2>
    
    <p class="text-gray-600 text-center mb-1 text-sm">
        <span class="font-semibold">Author:</span> ${book.authors.map(author => author.name).join(', ')}
    </p>
    
    <p class="text-gray-600 text-center mb-1 text-sm">
        <span class="font-semibold">Genre:</span> ${book.subjects[0] || 'N/A'}
    </p>

    <div class="flex justify-center items-center mt-3">
        <a href="book.html?id=${book.id}" class="text-blue-500 hover:text-blue-600 transition-colors duration-300 underline">
            View Details
        </a>
    </div>
</div>

<style>
.shadow-lg {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Custom shadow for a deeper effect */
}
</style>

            `;
            wishlistContainer.innerHTML += bookCard;
        });
        
        updatePagination(wishlistedBooks);
    }

    // Function to update pagination controls (show numbered page buttons)
    function updatePagination(wishlistedBooks) {
        const booksPerRow = 3;
        const rowsPerPage = 2;
        const booksPerPage = booksPerRow * rowsPerPage;
        const totalPages = Math.ceil(wishlistedBooks.length / booksPerPage);
        pageNumbers.innerHTML = '';

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('px-4', 'py-2', 'bg-gray-200', 'hover:bg-gray-300', 'rounded-md');
            if (i === currentPage) {
                pageButton.classList.add('bg-blue-500', 'text-white');
            }

            pageButton.addEventListener('click', function () {
                currentPage = i;
                displayWishlist();
            });

            pageNumbers.appendChild(pageButton);
        }

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Handle previous page button click
    prevButton.addEventListener('click', function () {
        if (currentPage > 1) {
            currentPage--;
            displayWishlist();
        }
    });

    // Handle next page button click
    nextButton.addEventListener('click', function () {
        const booksPerRow = 3;
        const rowsPerPage = 2;
        const booksPerPage = booksPerRow * rowsPerPage;
        const totalPages = Math.ceil(wishlistBooks.filter(book => allBooks.includes(book.id)).length / booksPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayWishlist();
        }
    });

    displayWishlist(); 
});
