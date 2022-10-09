import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import GUN from 'gun/gun'

const gun = GUN('http://localhost:8765/');



let id: number = 5;
let company: string = 'Eat Ass';
let age: number;
let ids: number[] = [1,2,3,4,5,6];
let ids2: any[] = [1,'eat', true];
let person: [number,string,boolean] = [1, "brad", false]
//Union
let id2: string | number;

id2 = "22";

//Enum
enum Direction1 {
  Up = "Up",
  Down = "Down",
  Left = 'Left',
  Right = 'Right'
}
//objects
const user: {
  id: number,
  name: string
} = {
  id: 4,
  name: 'John Doe'
}