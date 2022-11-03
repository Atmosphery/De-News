
import React from 'react';




const Article = (props) => {


    return (
        <div>
            <h1>{props.title}</h1>
            <div>
                {props.text}
            </div>
            <div>{props.author}</div>
            <div>{props.date}</div>
        </div>
    )


}
export default Article;