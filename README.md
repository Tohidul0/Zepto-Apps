# Book Library Web Application

This project is a responsive web application built with vanilla JavaScript, HTML, and Tailwind CSS, which fetches data from the public [Gutendex API](https://gutendex.com/books). It allows users to search, filter, and manage a wishlist of books. The application also includes pagination and a user-friendly interface.

## Features

1. **Book List**  
   Displays a list of books with:
   - Title
   - Author(s)
   - Cover Image
   - Genre/Topic
   - Book ID

2. **Real-Time Search**  
   Filter books by title using a search bar.

3. **Genre Filter**  
   Dropdown filter to display books based on selected genre or topic.

4. **Wishlist**  
   Users can add or remove books from a wishlist by clicking a heart icon. Wishlisted books are stored in `localStorage` and persist across sessions.

5. **Pagination**  
   Navigate through the book list using Next, Previous, and page numbers.

6. **Multiple Pages**  
   - **Homepage**: Shows the main list of books.
   - **Wishlist Page**: Displays all books saved in the wishlist.
   - **Book Details Page**: Provides detailed information about a selected book.

## Technologies Used

- **Vanilla JavaScript**: For handling UI functionality, API calls, and managing localStorage.
- **HTML**: For structuring the web application.
- **Tailwind CSS**: For responsive and modern styling.

## How It Works

1. **Data Fetching**  
   Data is fetched from the [Gutendex API](https://gutendex.com/books) and displayed in a clean format.
   
2. **Search and Filter**  
   Users can search for books by title and filter them by genre/topic using the provided dropdown.

3. **Wishlist**  
   Clicking the heart icon on a book adds/removes it from the wishlist, which is saved in `localStorage`. Users can view their wishlist on a separate page.

4. **Pagination**  
   The book list is divided into pages, allowing users to navigate easily between sets of results.

## Project Structure

- `index.html`: Homepage displaying the book list.
- `wishlist.html`: Page showing wishlisted books.
- `book-details.html`: Page with detailed information for each book.
- `style.css`: Custom styles for layout and design.
  

