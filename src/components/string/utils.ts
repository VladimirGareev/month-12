import { TElement } from "../../types/elements";
import { ElementStates } from "../../types/element-states";

export const arrayFromString = (value: string): TElement[]  =>  
    value.split("").map((symb, index) =>({
        letter:symb,
        id:index,
        state:ElementStates.Default
    }
    )
    )

export const makeTimeout = (time:number) => 
    new Promise ((resolve) => setTimeout(resolve, time));

export const makeReverse = async (array:TElement[], changeState:any, timeout:number) => {
    let start = 0;
    let end = array.length - 1;
    while(start<=end) {
        await makeTimeout (1000);
        array[start].state = ElementStates.Changing;
        array[end].state = ElementStates.Changing;
        await changeState(array.map((element)=>({...element})));
        await makeTimeout (1000);
        let tmp = array[start];
        array[start]=array[end];
        array[end]=tmp;
        array[start].state = ElementStates.Modified;
        array[end].state = ElementStates.Modified;
        await changeState(array.map((element)=>({...element})));
        start++;
        end--;
    }
}
