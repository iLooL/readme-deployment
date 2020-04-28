import React from 'react';

const newArticle  = {
    maxWidth: '90%',
    padding: '10px 10px 10px 10px',
    marginTop: '25px',
    marginBottom: '30px',
    marginLeft: '40px',
    marginLight: '40px',
    backgroundColor: '#DFDCD9', 
    border: '1px solid #2E5266',
    borderRadius: '15px'
};

const articleName = {
    fontSize: '24px',
    color: '#6E8898'
};


export default function makeArticle({ article }) {
    return (
        <div style={newArticle}>
            <a href="#" style={articleName}>{article.title}</a>
            <p>{article.summary}</p>
        </div>
    )
}
