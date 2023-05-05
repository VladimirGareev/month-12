import React, { useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./string.module.css"
import { arrayFromString, makeReverse, makeTimeout } from "./utils";
import { TElement } from "../../types/elements";


export const StringComponent: React.FC = () => {

const [string, setString] = useState('');

const [elements, setElements] = useState<TElement[]>([])

const [loader, setLoader] = useState(false);

const runReverse = async () => {
  setLoader(true);
  setString("");
  const initialOrder: TElement[] = arrayFromString(string);
  setElements(initialOrder);
  await makeReverse( initialOrder,setElements, 500)
  setLoader(false);
};

  return (
    <SolutionLayout title="Строка" >
    <div className={styles.flexContainer}>
     <Input 
     value={string}
     maxLength={11} 
     isLimitText
     extraClass={styles.input}
     onChange={(evt)=>setString(evt.currentTarget.value)}
     />
     <Button
     text="Развернуть"
     extraClass={styles.button}
     onClick={runReverse}
     isLoader={loader}
     />
    </div>
    <div className={styles.flexContainer}>
    {elements.length > 0 &&
            elements.map((element) => (
              <Circle
                extraClass={styles.circle}
                letter={element.letter}
                key={element.id}
                state={element.state}
              />
            ))}
    </div>
    </SolutionLayout>
  );
};
