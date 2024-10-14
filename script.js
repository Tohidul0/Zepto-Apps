document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://gutendex.com/books';
    const bookList = document.getElementById('book-list');
    const searchBar = document.getElementById('search-bar');
    const loader = document.getElementById('loader');
    const genreFilter = document.getElementById('genre-filter');
    let genres = new Set();
    let allBooks = [];
    const genreKeywords = ["Fantasy", "Fiction", "Drama", "Children", "Country", "Science Fiction", "Horror"];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    
    loader.classList.remove('hidden');


    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            allBooks = data.results;
            getGenres(allBooks);
            displayBooks(allBooks);
            loader.classList.add('hidden');
        })
        .catch(error => {
            loader.classList.add('hidden');
            console.error('Error fetching books:', error.message || error);
            alert('An error occurred while fetching the books. Please try again later.');
        });

    // Function to display books
    function displayBooks(books) {
        bookList.innerHTML = '';
        books.forEach(book => {
            const isWishlisted = wishlist.includes(book.id);
            const bookCard = `
                <div class="bg-white rounded-lg shadow-md p-4 relative">
                    <img class="w-full h-48 object-cover" src="${book.formats['image/jpeg']}" alt="Book cover">
                    <h2 class="text-xl font-semibold mt-4">${book.title}</h2>
                    <p class="text-gray-600">Author: ${book.authors.map(author => author.name).join(', ')}</p>
                    <p class="text-gray-600">Genre: ${book.subjects[0] || 'N/A'}</p>
                    <p class="text-gray-600">ID: ${book.id}</p>
                    <!-- Wishlist heart icon -->
                    <span class="absolute top-4 right-4 cursor-pointer">
                        <i class="heart-icon ${isWishlisted ? 'text-red-500' : 'text-gray-400'}" data-id="${book.id}">❤️</i>
                    </span>
                </div>
            `;
            bookList.innerHTML += bookCard;
        });
        // Add click event to each heart icon
        document.querySelectorAll('.heart-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const bookId = parseInt(this.getAttribute('data-id'));
                toggleWishlist(bookId);
                this.classList.toggle('text-red-500');
                this.classList.toggle('text-gray-400');
            });
        });
    }
    // Function to toggle wishlist (add/remove from localStorage)
    function toggleWishlist(bookId) {
        if (wishlist.includes(bookId)) {
            wishlist = wishlist.filter(id => id !== bookId); // Remove from wishlist
        } else {
            wishlist.push(bookId); // Add to wishlist
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist)); // Save wishlist to localStorage
    }


    // Add event listener to the search bar for real-time filtering
    searchBar.addEventListener('input', function (e) {
        loader.classList.remove('hidden');
        const searchTerm = e.target.value.toLowerCase();
        const filteredBooks = allBooks.filter(book => book.title.toLowerCase().includes(searchTerm));
        displayBooks(filteredBooks);
        loader.classList.add('hidden');
    });

    // Extract unique genres from the book list and populate the dropdown
    function getGenres(books) {
        books.forEach(book => {
            if (book.subjects.length > 0) {
                book.subjects.forEach(subject => {
                    genreKeywords.forEach(keyword => {
                        if (subject.toLowerCase().includes(keyword.toLowerCase())) {
                            genres.add(keyword);
                        }
                    });
                });
            }
        });

        //genre dropdown
        genres.forEach(genre => {
            const option = document.createElement('option');
            option.value = genre;
            option.textContent = genre;
            genreFilter.appendChild(option);
        });
    }

    // Filter books based on genre
    genreFilter.addEventListener('change', function () {
        const selectedGenre = genreFilter.value;
        let filteredBooks;

        if (selectedGenre === 'all') {
            filteredBooks = allBooks;
        } else {
            filteredBooks = allBooks.filter(book => book.subjects.some(subject => subject.toLowerCase().includes(selectedGenre.toLowerCase())));
        }

        displayBooks(filteredBooks);
    });


});
