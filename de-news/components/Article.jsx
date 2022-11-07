
import React from 'react';
import parse from 'html-react-parser';



const Article = (props) => {
    let parser = new DOMParser();

    const handleEdit = (id) => {



    }

    const handleDelete = (id) => {
        const gun = Gun();

        let articlesDB;
        gun.get('articles').once((value) => {
            articlesDB = value;
        });

        console.log(articlesDB);
        
    }

    let html = parser.parseFromString(props.text, 'text/html')
    //console.log(props.text)
    return (
        <div className='m-5'>
            <div className={'p-5 border-2 border-solid border-black w-full max-w-lg'}>
                <h1>{props.title}</h1>
                <div className='m-5'>{parse(props.text)}</div>
                <div>by: {props.author}</div>
                <div>{props.date}</div>
                

            </div>
            <button className='btn btn-xs btn-outline' onClick={handleEdit()}>Edit</button>
            <button className='btn btn-xs btn-outline' onClick={handleDelete(props.id)}>Delete</button>
        </div>
    )


}
export default Article;