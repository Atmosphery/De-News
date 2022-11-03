import gun, { IGunUserInstance } from "gun";
import { Component, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import AppBar from "./appBar";



export default function Layout({children, user, loggedIn, setLoggedIn}) {
    
    return (
        <>
            <main>{children}</main>
        </>
    )
}