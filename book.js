document.addEventListener("DOMContentLoaded", function() {
    const bookId = new URLSearchParams(window.location.search).get('id');
    const bookDetail = document.getElementById('book-detail');

    const allBooks = JSON.parse(localStorage.getItem('allBooks')) || []; 
    const book = allBooks.find(b => b.id == bookId); 

    if (book) {
        const bookCard = `
           <section class="relative w-full h-screen bg-gradient-to-r from-purple-400 to-indigo-600 text-white">
  <div class="absolute inset-0 flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-12 p-6 animate-fade-in">
    
    <!-- Book Cover Image -->
    <div class="w-full lg:w-1/2 h-96 overflow-hidden">
      <img class="w-full h-full object-cover object-center rounded-xl shadow-lg transition-transform duration-500 hover:scale-110" 
           src="${book.formats['image/jpeg'] || book.formats['image/png']}"  
           alt="Book cover">
    </div>
    
    <!-- Book Information -->
    <div class="w-full lg:w-1/2 space-y-4">
      <!-- Book Title -->
      <h2 class="text-4xl font-bold tracking-wide animate-pulse">${book.title}</h2>
      
      <!-- Author -->
      <p class="text-xl">
        <span class="font-semibold">Author:</span> ${book.authors.map(author => author.name).join(', ')}
      </p>
      
      <!-- Genre -->
      <p class="text-lg">
        <span class="font-semibold">Genre:</span> ${book.subjects[0] || 'N/A'}
      </p>
      
      <!-- Languages -->
      <p class="text-lg">
        <span class="font-semibold">Languages:</span> ${book.languages.join(', ')}
      </p>
      
      <!-- Media Type -->
      <p class="text-lg">
        <span class="font-semibold">Media Type:</span> ${book.media_type}
      </p>
      
      <!-- Download Count -->
      <p class="text-lg">
        <span class="font-semibold">Download Count:</span> ${book.download_count}
      </p>
      
      <!-- Book ID -->
      <p class="text-sm text-gray-300">
        Book ID: ${book.id}
      </p>
    </div>
  </div>
</section>

<!-- Tailwind CSS Animations -->
<style>
  @keyframes fade-in {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 1.5s ease-in-out;
  }
</style>

            
        `;
        bookDetail.innerHTML = bookCard; 
    } else {
        bookDetail.innerHTML = `<p class="text-red-600">Book not found.</p>`;
    }
});
