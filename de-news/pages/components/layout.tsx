import gun, { IGunUserInstance } from "gun";
import { Component, ReactNode, useEffect, useState } from "react";
import AppBar from "./appBar";

interface IProps {
    children: ReactNode
}

export default function Layout({children}: IProps) {
    
    return (
        <>
            <AppBar/>
            <main>{children}</main>
        </>
    )
}