import React from "react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineSearch, AiOutlineClose } from 'react-icons/ai'
import style from '../styles/search.module.css'


const SearchBar = ({ placeholder, gun }) => {
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
        <div className="ml-5 dropdown">
            <input
                type="text"
                placeholder={placeholder}
                value={wordEntered}
                onChange={handleFilter}
                className={'input input-primary '}
            />

            {filteredData.length != 0 && (
                <div className="dropdown-content rounded-md overflow-auto list-none mt-3 w-[300px] max-h-52 p-1  bg-base-300">
                    {filteredData.map((value, key) => {
                        return (
                            <Link href={`/article/${value['_']['#']}`}>
                                <p className="mb-1 mr-[6px] shadow-md rounded-xl overflow-hidden whitespace-nowrap text-ellipsis bg-base-200">{value.title}</p>
                            </Link>
                        );
                    })}
                </div>
            )}



        </div>
    );
}

export default SearchBar;