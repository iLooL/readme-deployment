import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const NewsArticleList = (props) => {
   
    const name = props.articleType;
    console.log(name);
    const [articles, setArticles] = useState([])

  useEffect(function() {
    async function getArticles() {
      try {
        const response = await axios.get(`api/${name}`);
        setArticles(response.data);
      } catch(error) {
        console.log('error', error);
      }
    }        
    getArticles();
  }, []);

  console.log(articles.length);

    return (
        <>
        <div>
        {articles.map((article) => {
            return(
            <div key={article._id} className="card align-top m-5 rounded-bottom">
              <div className="card-header">
              <a href={article.url} target="_blank" className="border-primary m-1">{article.title}</a>
              <h6 className="card-subtitle text-muted mt-2">By {article.author}</h6>
              </div>
                <div className="card-body">
                  <p className="card-text">{article.summary.substring(0, 150)}...</p>
                  <Link to={`/articles/${article._id}`}>Read me</Link>
                  <p className="card-text mt-4 border-top">Upvotes: {article.upvotes}</p>
                </div>
            </div>
            )     
        })}
        </div>
        </>
    );
}

export default NewsArticleList;