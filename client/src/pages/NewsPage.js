import React, { useState, useEffect } from 'react';
import CommentsSection from '../components/CommentsSection';
import Upvotes from '../components/Upvotes';

const NewsPage = ({ match }) => {

    const article_id = match.params.article_id;
    const [article, setArticleInfo] = useState('');
    // const [] = use

    useEffect( () => {
        // we make this because useEffect cannot be an async call
        const fetchData = async () => {
            const result = await fetch(`/api/articles/${article_id}`); // rest of path is defined in package.json
            const body = await result.json(); // has article info
            setArticleInfo(body); // sets article infos state to what we got from server
        }
        fetchData();
    }, [article_id]);

    return (
    <>
        <div className="container">
            <h1 className="m-3">{article.title}</h1>
            <p className="px-5 mt-5">{article.summary}</p>  

            <Upvotes upvotes={article.upvotes} articleId={article.article_id}/>
            <h2 className="border-bottom pb-3 mb-3">Comments</h2>

            {/* COMMENTS SECTION */}

            <CommentsSection articleId={article.article_id}/>
        </div>
        
    </>
    )
    
};

export default NewsPage;