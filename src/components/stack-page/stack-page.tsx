import React, { useState,useMemo } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./stack-page.module.css";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./utils";
import { TElement } from "../../types/elements";
import { ElementStates } from "../../types/element-states";
import { makeTimeout } from "../string/utils";
import { Circle } from "../ui/circle/circle";



export const StackPage: React.FC = () => {

  const [value, setValue] = useState('');
  const [elements, setElements] = useState<TElement[]>([]);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState('')

  const stack = useMemo(() => new Stack<TElement>(), [])

  const setNewPeak = () => {
    const peak = stack.peak();
    if(peak) {peak.head = 'top'}
    
  }

  const deletePeak = () => {
    const peak = stack.peak();
    if(peak) {peak.head = undefined}
  }

  const pushing = async() => {
    setButtonLoader('add');
    setLoader(true);
    const newElement:TElement = {
      letter: value,
      id: stack.getSize(),
      head: "top",
      state: ElementStates.Default
    }
    setValue('');
    deletePeak();
    stack.push(newElement);
    stack.peak()!.state = ElementStates.Changing;
    setElements(stack.getStack().map((element)=>({...element})));
    await makeTimeout(1000);
    stack.peak()!.state = ElementStates.Default;
    setElements(stack.getStack().map((element)=>({...element})));

    setButtonLoader('');
    setLoader(false);
  }

  const popping = async () => {
    setButtonLoader('delete');
    setLoader(true);
    stack.peak()!.state = ElementStates.Changing;
    setElements(stack.getStack().map((element)=>({...element})));
    await makeTimeout(1000);
    stack!.pop();
   if(stack.peak()) { stack.peak()!.head = "top"}
    setElements(stack.getStack().map((element)=>({...element})));
    setButtonLoader('');
    setLoader(false);
  }

  const clearing = async () => {
    setButtonLoader('clear');
    setLoader(true);
    stack.clear();
    await makeTimeout(1000);
    setElements(stack.getStack().map((element)=>({...element})));
    setButtonLoader('');
    setLoader(false);
  }

  return (
    <SolutionLayout title="Стек">
      <div className={styles.flex}>
     <div className={styles.flexContainer}>
     <Input 
     value={value}
     type="text"
     max={4}
     maxLength={4} 
     isLimitText
     extraClass={styles.input}
     onChange={(evt)=>setValue(evt.currentTarget.value)}
     />
     <Button
     text="Добавить"
     extraClass={styles.button}
     onClick={pushing}
     isLoader={buttonLoader==='add'}
     disabled={loader}
     />
     <Button
     text="Удалить"
     extraClass={styles.button}
    onClick={popping}
    isLoader={buttonLoader==='delete'}
     disabled={loader}
     />
     <Button
     text="Очистить"
     extraClass={`${styles.button} ${styles.marginLeft}`}
     onClick={clearing}
     isLoader={buttonLoader === 'clear'}
     disabled={loader}
     />
    </div>
    <div className={styles.flexContainer}>
    {elements.length > 0 &&
            elements.map((element,index) => (
              <Circle
                extraClass={styles.circle}
                letter={element.letter}
                index={index}
                key={element.id}
                head={element.head}
                state={element.state}

              />
            ))}
    </div>
    </div>
    </SolutionLayout>
  );
};
