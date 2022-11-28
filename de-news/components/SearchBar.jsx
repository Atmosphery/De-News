import React from "react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import style from '../styles/search.module.css'


const SearchBar = ({ placeholder, gun}) => {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    let data = [];

    gun.map(article => article !== null ? article : undefined).once((article) => {
        data.push(article);
    })

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.title.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
        <div className="ml-5">
            <div>
                <input
                    type="text"
                    placeholder={placeholder}
                    value={wordEntered}
                    onChange={handleFilter}
                    className={'input input-primary '}
                />
            </div>
            {filteredData.length != 0 && (
                <div >
                    {filteredData.slice(0, 15).map((value, key) => {
                        return (
                            <Link href={`/article/${value['_']['#']}`}>
                                <p className="mt-5 alert text-ellipsis">{value.title}</p>
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;