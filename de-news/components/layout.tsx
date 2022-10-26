import gun, { IGunUserInstance } from "gun";
import { Component, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import AppBar from "./appBar";

interface IProps {
    children: ReactNode
    user: IGunUserInstance
    loggedIn: boolean
    setLoggedIn: Dispatch<SetStateAction<boolean>>
}

export default function Layout({children, user, loggedIn, setLoggedIn}: IProps) {
    
    return (
        <>
            <main>{children}</main>
        </>
    )
}