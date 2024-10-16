document.addEventListener("DOMContentLoaded", function() {
    const bookId = new URLSearchParams(window.location.search).get('id');
    const bookDetail = document.getElementById('book-detail');

    const allBooks = JSON.parse(localStorage.getItem('allBooks')) || []; 
    const book = allBooks.find(b => b.id == bookId); 

    if (book) {
        const bookCard = `
          <section class="relative w-full min-h-screen bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white py-10">
  <div class="container mx-auto flex flex-col lg:flex-row items-center justify-center space-y-8 lg:space-y-0 lg:space-x-16 p-6 animate-fade-in">
    
    <!-- Book Cover Image -->
    <div class="w-full lg:w-1/3 h-auto max-h-96 overflow-hidden flex items-center justify-center">
      <div class="relative">
        <img class="max-w-full max-h-full object-contain rounded-lg transition-transform duration-500 hover:scale-105" 
             src="${book.formats['image/jpeg'] || book.formats['image/png']}"  
             alt="Book cover">
        <div class="absolute inset-0 rounded-lg border-2 border-gray-200 shadow-xl transition-all duration-500 transform hover:scale-105 hover:shadow-2xl"></div>
      </div>
    </div>
    
    <!-- Book Information -->
    <div class="w-full lg:w-2/3 space-y-4 text-center lg:text-left">
      <!-- Book Title -->
      <h2 class="text-5xl font-extrabold tracking-wide text-gray-100 animate-pulse">
        ${book.title}
      </h2>
      
      <!-- Author -->
      <p class="text-xl text-gray-300">
        <span class="font-semibold text-white">Author:</span> ${book.authors.map(author => author.name).join(', ')}
      </p>
      
      <!-- Genre -->
      <p class="text-lg text-gray-300">
        <span class="font-semibold text-white">Genre:</span> ${book.subjects[0] || 'N/A'}
      </p>
      
      <!-- Languages -->
      <p class="text-lg text-gray-300">
        <span class="font-semibold text-white">Languages:</span> ${book.languages.join(', ')}
      </p>
      
      <!-- Media Type -->
      <p class="text-lg text-gray-300">
        <span class="font-semibold text-white">Media Type:</span> ${book.media_type}
      </p>
      
      <!-- Download Count -->
      <p class="text-lg text-gray-300">
        <span class="font-semibold text-white">Download Count:</span> ${book.download_count}
      </p>
      
      <!-- Book ID -->
      <p class="text-sm text-gray-500 italic">
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
