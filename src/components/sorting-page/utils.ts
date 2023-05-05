import { Direction } from "../../types/direction";
import { ElementStates } from "../../types/element-states";
import { TElementBar } from "../../types/elements";
import { makeTimeout } from "../string/utils";

const genRanNb = (min:number, max:number): number => {
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

const swap = (arr: TElementBar[], firstIndex: number, secondIndex: number): void => {
    const temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

export const randomArr = (): TElementBar[] => {
    const length = genRanNb(3,17);
    const arr = [];
    for (let i = 0; i < length; i++) {
        arr.push({number:genRanNb(0,100), id:i, state: ElementStates.Default})
    }
    return arr
}

export const sortSelection = async (arr:TElementBar[], changeState:any, direction:Direction, loaderState:any) =>{
    const {length} = arr;
    arr.map((element)=>element.state=ElementStates.Default)
    for (let i = 0; i < length - 1; i++) {
        arr[i].state = ElementStates.Changing;
        let maxInd = i;
        for (let j =i+1; j < length; j++) {
            arr[j].state = ElementStates.Changing;
            changeState(arr.map((element)=>({...element})));
            if(direction === Direction.Ascending){
                if(arr[j].number < arr[maxInd].number) {
                    maxInd = j;
                    arr[maxInd].state = ElementStates.Default;
                } else {
                    arr[j].state = ElementStates.Default
                }
            } else {
                if(arr[j].number > arr[maxInd].number) {
                    maxInd = j;
                    arr[maxInd].state = ElementStates.Default;
                } else {
                    arr[j].state = ElementStates.Default
                }
            }
          await makeTimeout(500);
        }
          swap(arr, i, maxInd);
          arr[maxInd].state = ElementStates.Default;
          arr[i].state = ElementStates.Modified;
          changeState(arr.map((element)=>({...element})));
    }
          if(arr.length) {
            arr[arr.length-1].state = ElementStates.Modified
          }
          changeState(arr.map((element)=>({...element})));
          loaderState('');
      }


export const bubbleSorting = async (arr:TElementBar[], changeState:any, direction:Direction, loaderState:any) => {
    arr.map((element)=>element.state=ElementStates.Default)
    for (let i = 0; i < arr.length; i++) {
        
        for (let j = 0; j < arr.length - i -1; j++) {
         
            arr[j].state = ElementStates.Changing;
            arr[j+1].state = ElementStates.Changing;
            changeState(arr.map((element)=>({...element})));
            await  makeTimeout(500);
            if (direction === Direction.Descending){if(arr[j].number < arr[j+1].number) {
                swap(arr, j, j+1)
            }} else {if(arr[j].number > arr[j+1].number) {
                swap(arr, j, j+1)
            }}
            
            arr[j].state = ElementStates.Default
        }
        arr[arr.length - i-1].state = ElementStates.Modified;
        changeState(arr.map((element)=>({...element})));
        
        
        }
        await  makeTimeout(500);
        arr[0].state = ElementStates.Modified;
        changeState(arr.map((element)=>({...element})));
        loaderState('');
}


// const bubbleSort = (arr: number[]) => {
//     // до сортировки arr = [9,3,4,1,2,0];
//     for (let i = 0; i < arr.length; i++) {
//         for (let j = 0; j < arr.length - i - 1; j++) {
//             if (arr[i] < arr[j + 1]) { // сортируем элементы по возрастанию
//                 swap(arr[i], arr[j + 1]);
//             }
//         }
//     }
//     // после arr = [0, 1, 2, 3, 4, 9]
// } 