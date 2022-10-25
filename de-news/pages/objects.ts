import { IGunInstance, IGunInstanceRoot, IGunUserInstance } from "gun";
import { Dispatch, SetStateAction } from "react";


export interface IArticle {
    id: string
    title: string;
    text: string;
    author: string;
    date: string
}

export interface IUser {
    id: string;
}

export interface IGlobalState {
    gun: IGunInstance,
    user: IGunUserInstance,
    setUser: Dispatch<SetStateAction<IGunUserInstance<any, any, any, IGunInstanceRoot<any, IGunInstance<any>>>>>
}

