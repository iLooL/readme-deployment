import React, { useState, useEffect } from 'react';

const CommentsSection = ({ articleId }) => {

    // put this as an entry in the database once it work on the frontend
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState('');

    // comments get
    useEffect( () => {
        // we make this because useEffect cannot be an async call
        const fetchData = async () => {
            const result = await fetch(`/api/comments/${articleId}`); // rest of path is defined in package.json
            const body = await result.json(); // has article info
            setComments(body); // sets article infos state to what we got from server
        }
        fetchData();
        
    }, [articleId, comments]);


    // comments post
    const addComment = async () => {
        if (localStorage.getItem("user") != "null"){
            const user = localStorage.getItem("user");
            const result = await fetch(`/api/comments/${articleId}`, {
                method: 'post',
                body: JSON.stringify({ article_id: articleId, username: user, text: commentText }), // allows server to parse data as a string
                headers: {
                    // when sending post requests with JSON body we must include a header
                    'Content-Type': 'application/json', // tells server what kind of data we are sending
                }
            });
            const body = await result.json();
            setCommentText('');
        }
        else{
            // tell user they are not logged in
            console.log("not logged in")
        }
    }

    return (
    <>
        <div>
            <div className="row">
                <label> 
                    <textarea className="comment-box mx-5 col" rows="4" cols="123" values={commentText} onChange={(event) => setCommentText(event.target.value)}/>
                </label>
                
            </div>

            <div className="row">
                <button className="col mx-5 my-3" onClick={() => addComment()}>Add Comment</button>
            </div>
            

            {comments.map((comment, key) => (
                <div>
                    <div className="comment border mx-5 my-3" key={key}>
                        <h4 className="my-3 mx-5">{comment.username}</h4>
                        <p className="mx-3">{comment.text}</p>
                    </div>
                </div>
            ))}
        </div>
    </>
    )
    
};

export default CommentsSection;