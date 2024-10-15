document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://gutendex.com/books';
    const bookList = document.getElementById('book-list');
    const searchBar = document.getElementById('search-bar');
    const loader = document.getElementById('loader');
    const genreFilter = document.getElementById('genre-filter');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const pageNumbers = document.getElementById('page-numbers');
    let genres = new Set();
   
    let allBooks = JSON.parse(localStorage.getItem('allBooks')) || [];
    console.log(allBooks)
    let filteredBooks = [];
    const genreKeywords = ["Fantasy", "Fiction", "Drama", "Children", "Country", "Science Fiction", "Horror"];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let currentPage = 1;
    const booksPerRow = 3;
    const rowsPerPage = 2;
    const booksPerPage = booksPerRow * rowsPerPage; 
    
    loader.classList.remove('hidden');
    if(allBooks != []){
            filteredBooks = allBooks; 
            getGenres(allBooks);
            displayBooks(filteredBooks);
            updatePagination(filteredBooks);
            loader.classList.add('hidden');
    }
    else{
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            allBooks = data.results;
            filteredBooks = allBooks; 
            getGenres(allBooks);
            localStorage.setItem('allBooks', JSON.stringify(allBooks));
            displayBooks(filteredBooks);
            updatePagination(filteredBooks);
            loader.classList.add('hidden');
        })
        .catch(error => {
            console.error('Error fetching books:', error.message || error);
            alert('An error occurred while fetching the books. Please try again later.');
            loader.classList.add('hidden');
        });
    }

    // Function to display books
    function displayBooks(books) {
        bookList.innerHTML = '';
        const start = (currentPage - 1) * booksPerPage;
        const end = start + booksPerPage;
        const paginatedBooks = books.slice(start, end);
        paginatedBooks.forEach(book => {
            const isWishlisted = wishlist.includes(book.id) ? '❤️' : '🤍';
            const bookCard = `
                <div class="bg-white rounded-lg shadow-md p-4">
                    <img class="w-full h-48 object-cover" src="${book.formats['image/jpeg'] || book.formats['image/png']}" alt="Book cover">
                    <h2 class="text-xl font-semibold mt-4">${book.title}</h2>
                    <p class="text-gray-600">Author: ${book.authors.map(author => author.name).join(', ')}</p>
                    <p class="text-gray-600">Genre: ${book.subjects[0] || 'N/A'}</p>
                    <p class="text-gray-600">ID: ${book.id}</p>
                    <span class="cursor-pointer text-2xl" onclick="toggleWishlist(${book.id})">${isWishlisted}</span>
                    <a href="book.html?id=${book.id}" class="text-blue-500 hover:underline">View Details</a>
                </div>
            `;
            bookList.innerHTML += bookCard;
        });

        document.querySelectorAll('.heart-icon').forEach(icon => {
            icon.addEventListener('click', function() {
                const bookId = parseInt(this.getAttribute('data-id'));
                toggleWishlist(bookId);
                this.classList.toggle('text-red-500');
                this.classList.toggle('text-gray-400');
                this.classList.add('animate-ping');
                setTimeout(() => this.classList.remove('animate-ping'), 300);
            });
        });
    }

    
     // Load wishlist from local storage

     window.toggleWishlist = function(bookId) {
        if (wishlist.includes(bookId)) {
            wishlist = wishlist.filter(id => id !== bookId);
        } else {
            wishlist.push(bookId);
        }
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        displayBooks(allBooks); 
    };

    // Add event listener to the search bar for real-time filtering
    searchBar.addEventListener('input', function (e) {
        loader.classList.remove('hidden');
        const searchTerm = e.target.value.toLowerCase();
        filteredBooks = allBooks.filter(book => book.title.toLowerCase().includes(searchTerm));
        currentPage = 1; 
        displayBooks(filteredBooks);
        updatePagination(filteredBooks);
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
        if (selectedGenre === 'all') {
            filteredBooks = allBooks;
        } else {
            filteredBooks = allBooks.filter(book => book.subjects.some(subject => subject.toLowerCase().includes(selectedGenre.toLowerCase())));
        }
        currentPage = 1; 
        displayBooks(filteredBooks);
        updatePagination(filteredBooks);
    });

    // Function to update pagination controls (show numbered page buttons)
    function updatePagination(books) {
        const totalPages = Math.ceil(books.length / booksPerPage);
        pageNumbers.innerHTML = ''; 

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.classList.add('px-4', 'py-2', 'bg-gray-200', 'hover:bg-gray-300', 'rounded-md');
            if (i === currentPage) {
                pageButton.classList.add('bg-blue-500', 'text-white');
            }

            pageButton.addEventListener('click', function() {
                currentPage = i;
                displayBooks(books);
                updatePagination(books); 
            });

            pageNumbers.appendChild(pageButton);
        }

        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    // Handle previous page button click
    prevButton.addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            displayBooks(filteredBooks);
            updatePagination(filteredBooks);
        }
    });

    // Handle next page button click
    nextButton.addEventListener('click', function() {
        const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayBooks(filteredBooks);
            updatePagination(filteredBooks);
        }
    });
});
