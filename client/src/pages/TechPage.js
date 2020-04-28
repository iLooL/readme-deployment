import React from 'react';
import NewsArticlesList from '../components/NewsArticleList';
import { Link } from 'react-router-dom';

const PoliticsPage = () => {

    return (
    <>
        <h1 className="text-center m-5 header-font-family text-color display-3">Technological Articles</h1>
        <NewsArticlesList articleType={"technology"}/>
    </>
    )
    
};

export default PoliticsPage;