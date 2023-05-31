import {cleanup} from '@testing-library/react';
import { sortSelection, bubbleSorting, randomArr } from './utils';
import { Direction } from '../../types/direction';
import { ElementStates } from '../../types/element-states';

const mockArray = [
    {
        "number": 1,
        "id": 0,
        "state": ElementStates.Default
    },
    {
        "number": 15,
        "id": 1,
        "state": ElementStates.Default
    },
    {
        "number": 40,
        "id": 2,
        "state": ElementStates.Default
    },
    {
        "number": 80,
        "id": 3,
        "state": ElementStates.Default
    },
    {
        "number": 83,
        "id": 4,
        "state": ElementStates.Default
    },
    {
        "number": 57,
        "id": 5,
        "state": ElementStates.Default
    },
    {
        "number": 56,
        "id": 6,
        "state": ElementStates.Default
    }
]

const mockOneElementArray = [
    {
        "number": 1,
        "id": 0,
        "state": ElementStates.Default
    }
]

const mockEmptyArray = [
    {
        "number": "",
        "id": 0,
        "state": ElementStates.Default
    }
]

describe ("sorting algorithms testing", ()=>{
beforeEach(cleanup);
it ("сортировка выбором корректно работает при сортировке массива из нескольких элементов по убыванию", async()=>{
    const mockFn = jest.fn();
    const updArray = await sortSelection(mockArray, mockFn, Direction.Descending, mockFn, 0)
    expect(updArray).toEqual([83,80,57,56,40,15,1]);

})

it ("сортировка выбором корректно работает при сортировке массива из нескольких элементов по возрастанию", async()=>{
    const mockFn = jest.fn();
    const updArray = await sortSelection(mockOneElementArray, mockFn, Direction.Ascending, mockFn, 0)
    expect(updArray).toEqual([1]);

})
it ("сортировка выбором корректно работает при сортировке массива из одного элемента по убыванию", async()=>{
    const mockFn = jest.fn();
    const updArray = await sortSelection(mockOneElementArray, mockFn, Direction.Descending, mockFn, 0)
    expect(updArray).toEqual([1]);

})
it ("сортировка выбором корректно работает при сортировке массива из одного элемента по возрастанию", async()=>{
    const mockFn = jest.fn();
    const updArray = await sortSelection(mockOneElementArray, mockFn, Direction.Ascending, mockFn, 0)
    expect(updArray).toEqual([1]);

})
it ("сортировка выбором корректно работает при сортировке пустого массива по убыванию", async()=>{
    const mockFn = jest.fn();
    const updArray = await sortSelection(mockEmptyArray, mockFn, Direction.Descending, mockFn, 0)
    expect(updArray).toEqual([""]);

})
it ("сортировка выбором корректно работает при сортировке пустого массива по возрастанию", async()=>{
    const mockFn = jest.fn();
    const updArray = await sortSelection(mockEmptyArray, mockFn, Direction.Ascending, mockFn, 0)
    expect(updArray).toEqual([""]);
})
//

it ("сортировка  корректно работает при сортировке массива из нескольких элементов по убыванию", async()=>{
    const mockFn = jest.fn();
    const updArray = await bubbleSorting (mockArray, mockFn, Direction.Descending, mockFn, 0)
    expect(updArray).toEqual([83,80,57,56,40,15,1]);

})

it ("сортировка выбором корректно работает при сортировке массива из нескольких элементов по возрастанию", async()=>{
    const mockFn = jest.fn();
    const updArray = await bubbleSorting (mockOneElementArray, mockFn, Direction.Ascending, mockFn, 0)
    expect(updArray).toEqual([1]);

})
it ("сортировка выбором корректно работает при сортировке массива из одного элемента по убыванию", async()=>{
    const mockFn = jest.fn();
    const updArray = await bubbleSorting (mockOneElementArray, mockFn, Direction.Descending, mockFn, 0)
    expect(updArray).toEqual([1]);

})
it ("сортировка выбором корректно работает при сортировке массива из одного элемента по возрастанию", async()=>{
    const mockFn = jest.fn();
    const updArray = await bubbleSorting (mockOneElementArray, mockFn, Direction.Ascending, mockFn, 0)
    expect(updArray).toEqual([1]);

})
it ("сортировка выбором корректно работает при сортировке пустого массива по убыванию", async()=>{
    const mockFn = jest.fn();
    const updArray = await bubbleSorting (mockEmptyArray, mockFn, Direction.Descending, mockFn, 0)
    expect(updArray).toEqual([""]);

})
it ("сортировка выбором корректно работает при сортировке пустого массива по возрастанию", async()=>{
    const mockFn = jest.fn();
    const updArray = await bubbleSorting (mockEmptyArray, mockFn, Direction.Ascending, mockFn, 0)
    expect(updArray).toEqual([""]);
})

})