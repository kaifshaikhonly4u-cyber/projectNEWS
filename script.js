// Fetch and render news articles
async function fetchNews() {
  try {
    const response = await fetch('news.json');
    if (!response.ok) throw new Error('Failed to fetch news');
    
    const newsData = await response.json();
    displayNews(newsData.articles);
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('news-container').innerHTML = '<p class="error">Failed to load news. Please try again later.</p>';\n  }
}

// Display news articles dynamically
function displayNews(articles) {
  const container = document.getElementById('news-container');
  container.innerHTML = '';
  
  if (!articles || articles.length === 0) {
    container.innerHTML = '<p class="no-news">No news available at the moment.</p>';\n    return;
  }
  
  articles.forEach((article, index) => {
    const newsCard = document.createElement('article');
    newsCard.className = 'news-card';
    newsCard.innerHTML = `
      <div class="news-image">
        ${article.image ? `<img src="${article.image}" alt="${article.title}" onerror="this.src='https://via.placeholder.com/400x250?text=News'">` : '<img src="https://via.placeholder.com/400x250?text=No+Image" alt="No Image">'}
      </div>
      <div class="news-content">
        ${article.category ? `<span class="category">${article.category}</span>` : ''}
        <h2 class="news-title">${article.title}</h2>
        <p class="news-description">${article.description}</p>
        ${article.date ? `<span class="news-date">${new Date(article.date).toLocaleDateString('en-IN')}</span>` : ''}
      </div>
    `;
    container.appendChild(newsCard);
  });
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Load dark mode preference
function loadDarkModePreference() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
}

// Search functionality
function filterNews(query) {
  const cards = document.querySelectorAll('.news-card');
  const searchTerm = query.toLowerCase();
  
  cards.forEach(card => {
    const title = card.querySelector('.news-title').textContent.toLowerCase();
    const description = card.querySelector('.news-description').textContent.toLowerCase();
    
    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  loadDarkModePreference();
  fetchNews();
  
  // Setup search event listener
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => filterNews(e.target.value));
  }
  
  // Setup dark mode toggle
  const darkModeBtn = document.getElementById('dark-mode-btn');
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', toggleDarkMode);
  }
});
