import React, { useState, useEffect } from 'react';

const apiKey = 'b9bb66d6f27640cab29de89289d2e876';
const niche = 'urban farming';

const LibraryUrban = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const getArticles = async () => {
      const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(niche)}&apiKey=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.articles) {
          setArticles(data.articles.slice(0, 10)); 
        } else {
          throw new Error('Unable to fetch articles');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    getArticles();
  }, []);

  return (
    <div className="library-urban-container">
      <h1>Urban Farming Library</h1>
      <div className="library-urban-articles">
        {articles.map((article, index) => (
          <div className="library-urban-article" key={index}>
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryUrban;
