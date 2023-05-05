import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from "./fibonacci.module.css"
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TElement } from "../../types/elements";
import { makeTimeout } from "../string/utils";

export const FibonacciPage: React.FC = () => {
  const [value, setValue] = useState("");

  const [fibArray, setFibArray] = useState<number[]>([])
  
  const [loader, setLoader] = useState(false);

  const isDisabled = (Number(value)<=19)?false:true;

 const makeFib = async () => {
    setLoader(true);
    const n = Number(value);
    setValue('');
   
    let arr: number[] = [1, 1];
       for (let i = 2; i < n + 1; i++){
         arr.push(arr[i - 2] + arr[i -1]);
       }
    
    for (let i = 0; i< arr.length; i++){
      setFibArray(arr.slice(0,i))
      await makeTimeout(500);
    }

       setLoader(false);
 }

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.flex}>
     <div className={styles.flexContainer}>
     <Input 
     value={value}
     type="number"
     max={19} 
     isLimitText
     extraClass={styles.input}
     onChange={(evt)=>setValue(evt.currentTarget.value)}
     />
     <Button
     text="Развернуть"
     extraClass={styles.button}
     onClick={makeFib}
     isLoader={loader}
     disabled={isDisabled}
     />
    </div>
    <div className={styles.flexContainer}>
    {fibArray.length > 0 &&
            fibArray.map((element,index) => (
              <Circle
                extraClass={styles.circle}
                letter={element}
                index={index}
              />
            ))}
    </div>
    </div>
    </SolutionLayout>
  );
};
