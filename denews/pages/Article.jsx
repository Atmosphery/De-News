
import React from 'react';




const Article = (props) => {


    return (
        <div  className={'m-5'}>
            <h1>{props.title}</h1>
            <div>
                {props.text}
            </div>
            <div>{props.author}</div>
            <div>{props.date}</div>
            <button className='btn btn-xs btn-outline'>Edit</button>
        </div>
    )


}
export default Article;