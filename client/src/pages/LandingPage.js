import React, { Component } from 'react';
import clock from '../img/clock.jpg';


const LandingPage = () => {

    return (
    <>
        <h1 className="text-center m-5 header-font-family text-color display-3">What Is ReadMe News?</h1>
        <div className="container my-5">
            <div className="row">
                <img src={clock} className="col img-fluid w-50 rounded" alt="Clock"></img>
                <p className="col border rounded text-font-family w-50 landing-text p-3">
                    Your time is precious, there is no need to waste it. With ReadMe News you can stay up to date
                    with the latest news without having to read the entire article because we have for you! Our text
                    summarization algorithm summarizes the important information that you want to read. Get started
                    by clicking on a topic up in the navigation bar.
                </p>
            </div>
            
            
        </div>
        
    </>
    )
    
};

export default LandingPage;