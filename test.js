async function fetchArticles(apiKey, query) {
    const url = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.articles) {
        return data.articles;
      } else {
        console.error('Error fetching articles:', data.message);
        return [];
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      return [];
    }
  }
  
  // Replace 'YOUR_API_KEY' with your actual NewsAPI key
  const apiKey = 'b9bb66d6f27640cab29de89289d2e876';
  
  // Replace 'farming' with any keyword you want to search for
  const query = 'farming';
  
  fetchArticles(apiKey, query)
    .then(articles => {
      articles.forEach(article => {
        console.log(article.title);
        console.log(article.url);
        console.log('-'.repeat(50));
      });
    })
    .catch(error => console.error('Error:', error));
  