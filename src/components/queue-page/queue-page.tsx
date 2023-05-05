import React, {useState, useMemo, useEffect} from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Circle } from "../ui/circle/circle";
import { Button } from "../ui/button/button";
import styles from "./queue.module.css";
import { Queue } from "./utils";
import { TElement } from "../../types/elements";
import { ElementStates } from "../../types/element-states";
import { makeTimeout } from "../string/utils";

export const QueuePage: React.FC = () => {

  const [value, setValue] = useState('');
  const [elements, setElements] = useState<TElement[]>([]);
  const [loader, setLoader] = useState(false);
  const [buttonLoader, setButtonLoader] = useState('')

  const queue = useMemo(() => new Queue<string>(7), []);

  
    const arr:TElement[] = [];
    for (let i = 0; i< queue.getSize(); i++) {
      arr.push({id:i, letter: ''});
    }

  useEffect(() => {
    setElements(arr.map((element)=>({...element})));
  }, []);

  const adding = async() => {
    setLoader(true);
    setButtonLoader("add");
    const tail = queue.getTail()?queue.getTail():0 as number;
    queue.enqueue(value);
    setValue('');
    if (queue.getLength() > 1) {
      elements[tail!] = {
        ...elements[tail!],
        tail: "tail",
        letter: queue.getQueue()[tail!]!,
        state: ElementStates.Changing,
      };
      const prevTail = tail! - 1 >= 0 ? tail! - 1 : queue.getSize() - 1;
      elements[prevTail] = {
        ...elements[prevTail],
        tail: undefined,
      };
    } else {
      elements[tail!] = {
        ...elements[tail!],
        tail: "tail",
        head: "head",
        letter: queue.getQueue()[tail!]!,
        state: ElementStates.Changing,
      };
    }
      setElements(elements.map((element)=>element));
      await makeTimeout(1000);
      elements[tail!] = {
        ...elements[tail!],
        state: ElementStates.Default
      };
      setElements(elements.map((element)=>element));
    setLoader(false);
    setButtonLoader('');
    
  }

  const deleting = async () => {
    setLoader(true);
    setButtonLoader("delete");
    const head = queue.getHead() as number;
    queue.dequeue();
    elements[head] = {
      ...elements[head],
      state: ElementStates.Changing,
    };
    setElements(elements.map((element)=>element));
    await makeTimeout(1000);
    elements[head] = {
      ...elements[head],
      head: undefined,
      tail: undefined,
      letter: "",
      state: ElementStates.Default,
    };
    if (queue.getLength() >= 1) {
      const newHead = (head + 1);
      elements[newHead] = {
        ...elements[newHead],
        head: "head",
      };
    }
    setElements(elements.map((element)=>element));
    setLoader(false);
    setButtonLoader('');
  }

  const clear = async() => {
    setLoader(true);
    setButtonLoader("clear");
    queue.clear();
    await makeTimeout(1000);
    setElements(arr.map((element)=>({...element})));
    setLoader(false);
    setButtonLoader('');
  }

  return (
    <SolutionLayout title="Очередь">
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
      onClick={adding}
      isLoader={buttonLoader==='add'}
      disabled={loader||queue.getTail()! === 7||!value}
     />
     <Button
     text="Удалить"
     extraClass={styles.button}
     onClick={deleting}
     isLoader={buttonLoader==='delete'}
      disabled={loader||queue.isEmpty()}
     />
     <Button
     text="Очистить"
     extraClass={`${styles.button} ${styles.marginLeft}`}
      onClick={clear}
      isLoader={buttonLoader === 'clear'}
      disabled={loader||(queue.getLength()===0&&queue.getTail()===null&&queue.getHead()===null)}
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
                tail={element.tail}

              />
            ))}
    </div>
    </div>
    </SolutionLayout>
  );
};
