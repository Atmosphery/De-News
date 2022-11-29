

import React from 'react';
//import not from 'gun/lib/not.js';
import _ from 'lodash';
import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import axios from 'axios';
import { useEffect, useMemo, useRef, useState } from "react";
//const Quill = dynamic(() => import('react-quill').then(md => md.default), { ssr: false });
const ReactQuill = dynamic(
    async () => {
        const { default: RQ } = await import("react-quill");
        const { default: QU } = await import("@writergate/quill-image-uploader-nextjs");
        console.log("QU", QU);
        RQ.Quill.register("modules/imageUploader", QU);



        return function forwardRef({ forwardedRef, ...props }) {
            return <RQ ref={forwardedRef} {...props} />;
        };
    },
    {
        ssr: false
    }
);

const Create_article = ({ gun, user, loggedIn, setLoggedIn }) => {

    const router = useRouter();

    useEffect(() => {
        if (router && router.query) {
            console.log(router.query);
            if (!user.is) {

                router.push('/login');
            }
        }
    }, [router]);

    const modules = useMemo(
        () => ({

            imageUploader: {
                upload: (file) => {
                    return new Promise(async (resolve, reject) => {
                        console.log(file);
                        const formData = new FormData();

                        formData.append("file", file);
                        formData.append('upload_preset', 'news-images');

                        const data = await fetch('https://api.cloudinary.com/v1_1/df93uxoek/image/upload', {
                            method: 'POST',
                            body: formData
                        }).then(r => r.json());

                        resolve(
                            data.secure_url
                        );

                    });
                }
            },
            toolbar: {
                container: [
                    [{ header: [1, 2, 3, 4, false] }],
                    ["bold", "italic", "underline", "strike", "blockquote"],
                    [{ color: [] }, { background: [] }],
                    [
                        { align: [] },
                        { list: "ordered" },
                        { list: "bullet" },
                        { indent: "-1" },
                        { indent: "+1" }
                    ],
                    ["link", "image"],
                    ["clean"]
                ],
                handlers: {
                    image: (e) => {
                        console.log("imageHandler", e);
                        return e;
                    }
                }
            }
        }),
        []
    );
    /*
    
    */

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    let article = { id: '', author: '', title: '', date: '', text: '' };

    const [editorHtml, setEditorHtml] = useState('</br></br></br></br></br></br></br></br></br></br></br></br></br></br></br>');
    const [articleAdded, setArticleAdded] = useState(<div></div>);

    let username;
    let _data;

    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [selectedFile, setSelectedFile] = useState();

    useEffect(() => {
        username = sessionStorage.getItem('currentUsername');
        console.log(username)
    })

    const saveArticle = async (event) => {
        event.preventDefault();

        var elements = event.currentTarget.elements

        var pub;
        if (user.is.pub === undefined) {
            pub = 'anonymous';
        } else {
            pub = user.is?.pub;
        }

        await handleImageUpload();
        
        console.log(_data);


        article = {
            id: '',
            user: pub,
            author: username,
            title: elements.title.value,
            date: new Date().toUTCString(),
            text: editorHtml,
            thumbnail: _data
        }

        

        


        gun
            .get('articles')
            .set(article, (ack) => {
                if (ack.err) {
                    console.log('An error happened while inserting')
                    setArticleAdded(<h2 className='text-green-700'>An error occured, Article was not inserted</h2>);
                    console.log(ack.err);
                } else {
                    console.log('Data Sucessfully inserted')
                    setArticleAdded(<h2 className='text-green-700'>Article '{article.title}' was added</h2>);

                }

            });
    }

    const handleEditorChnage = (html) => {
        setEditorHtml(html);
        console.log(editorHtml);
        console.log(html)
    }

    const handleImageChange = ({ target }) => {
        if (target.files) {
            const file = target.files[0];
            setSelectedImage(URL.createObjectURL(file));
            console.log(selectedImage)
            setSelectedFile(file);
        }
    }

    const handleImageUpload = async () => {
        setUploading(true);

        try {
            if (!selectedFile) return;
            const formData = new FormData();
            formData.append("file", selectedFile);
            formData.append('upload_preset', 'news-images');

            const data = await fetch('https://api.cloudinary.com/v1_1/df93uxoek/image/upload', {
                method: 'POST',
                body: formData
            }).then(r => r.json());


            console.log(data);
            _data = data.secure_url;

        } catch (error) {
            console.log(error.response?.data);
        }
        setUploading(false);
    }



    return (
        <main>
            <div className='m-10 '>
                <form onSubmit={saveArticle} className='flex'>
                    <div className='flex-col w-screen max-w-6xl'>
                        <div>
                            <label>Title</label><br />
                            <input name='title' className='input input-bordered w-full max-w-sm' />
                        </div>

                        <div className='max-w-4xl p-20'>
                            <label>
                                <input type="file" hidden onChange={handleImageChange} />
                                <div className='w-40 aspect-video rounded flex items-center justify-center border-2 border-dashed cursor-pointer'>
                                    {selectedImage ?
                                        (<img src={selectedImage} alt="" />) :
                                        (<span>Select Image</span>)
                                    }
                                </div>
                            </label>
                        </div>

                        <div className='mt-5'>
                            <label>Text</label><br />
                            <div className='mt-2'>
                                <ReactQuill
                                    name='text'
                                    modules={modules}
                                    formats={formats}
                                    className='bg-white text-black w-full'
                                    theme='snow'
                                    value={editorHtml}
                                    onChange={handleEditorChnage}
                                />
                            </div>
                        </div>


                        {articleAdded}
                        <div className='mt-5'>
                            <button
                                className='btn'
                                disabled={uploading}
                                style={{ opacity: uploading ? '.5' : '1' }}
                            >
                                {uploading ? "Uploading.." : "Upload"}
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </main>

    );
}

export default Create_article;

