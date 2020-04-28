import React, { useState, useEffect } from 'react';

const Upvotes = ({ upvotes, articleId }) => {

    const upvoteArticle = async () => {
        
        const result = await fetch(`/api/articles/${articleId}/upvote`, {
            method: 'post'
        });
        const body = await result.json();
        console.log(body);
            
    }

    return (
    <>
        <div>
            <button className="m-4" onClick={() => upvoteArticle()}>Upvote the article</button>
        </div>
    </>
    )
    
};

export default Upvotes;