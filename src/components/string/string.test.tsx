
import { makeReverse, arrayFromString } from "./utils";
import {cleanup} from '@testing-library/react';

describe ("string reversing tests", ()=>{
    beforeEach(cleanup);
    it ("алгоритм корректно разворачивает строку с чётным количеством символов", async ()=>{
        const mockFn = jest.fn();
        const array = arrayFromString("Hello!");
        await makeReverse(array,mockFn,0);
        const arrayUpd:string[] = [];
        array.forEach((elem)=>{
            arrayUpd.push(elem.letter as string)
        })
        expect(arrayUpd).toEqual(["!","o","l","l", "e", "H"]);
    })

    it ("алгоритм корректно разворачивает строку с НЕчётным количеством символов", async ()=>{
        const mockFn = jest.fn();
        const array = arrayFromString("Hello");
        await makeReverse(array,mockFn,0);
        const arrayUpd:string[] = [];
        array.forEach((elem)=>{
            arrayUpd.push(elem.letter as string)
        })
        expect(arrayUpd).toEqual(["o","l","l", "e", "H"]);
    })

    it ("алгоритм корректно работает со строкой в один символ", async ()=>{
        const mockFn = jest.fn();
        const array = arrayFromString("H");
        await makeReverse(array,mockFn,0);
        const arrayUpd:string[] = [];
        array.forEach((elem)=>{
            arrayUpd.push(elem.letter as string)
        })
        expect(arrayUpd).toEqual(["H"]);
    })

    it ("алгоритм корректно работает со строкой без символов", async ()=>{
        const mockFn = jest.fn();
        const array = arrayFromString("");
        await makeReverse(array,mockFn,0);
        const arrayUpd:string[] = [];
        array.forEach((elem)=>{
        arrayUpd.push(elem.letter as string)
        })
        expect(arrayUpd).toEqual([]);
    })
})