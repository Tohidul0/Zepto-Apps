document.addEventListener("DOMContentLoaded", function () {
    const apiUrl = 'https://gutendex.com/books';
    const bookList = document.getElementById('book-list');
    const searchBar = document.getElementById('search-bar');
    const loader = document.getElementById('loader');
    const genreFilter = document.getElementById('genre-filter');
    let genres = new Set();
    let allBooks = [];
    const genreKeywords = ["Fantasy", "Fiction", "Drama", "Children", "Country", "Science Fiction", "Horror"];

    
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
