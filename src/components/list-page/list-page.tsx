import React, { useEffect, useMemo, useState } from "react";
import { nanoid } from "nanoid";

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { INode, LinkedList } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { makeTimeout } from "../string/utils";

import { TElement } from "../../types/elements";
import { ElementStates } from "../../types/element-states";
import { Action } from "../../types/buttonEnum";

import styles from "./list.module.css";

export const ListPage: React.FC = () => {
  const [value, setValue] = useState("");
  const [indexValue, setIndexValue] = useState<string>("");
  const [loaderPosition, setLoaderPosition] = useState<Action | null>(null);
  const [listElements, setListElements] = useState<TElement[]>([]);

  const list = useMemo(() => new LinkedList<string>(), []);

  const initialChars = useMemo(() => ["A","R","R","A","Y"], []);

  useEffect(() => {
    initialChars.forEach((char, index) => list.insertAt(char, index));
    const initialList = initialChars.map((letter, index) => {
      const isHead = index === 0 ? "head" : undefined;
      const isTail = index === list.getSize() - 1 ? "tail" : undefined;
      return { letter, id: nanoid(), head: isHead, tail: isTail };
    });
    setListElements(initialList);
  }, []);

  const insertFirstElement = async () => {
    const newChar = (
      <Circle letter={value} state={ElementStates.Changing} isSmall />
    );
    setValue("");
    setIndexValue("");
    listElements.push({
      letter: "",
      id: nanoid(),
      head: newChar,
      tail: "tail",
    });
    setListElements(listElements.map((element)=>element));
    await makeTimeout(SHORT_DELAY_IN_MS);

    listElements[0].head = "head";
    listElements[0].state = ElementStates.Modified;
    const node = list.getHead();
    if (node) {
      listElements[0].letter = node.value;
    }

    setListElements(listElements.map((element)=>element));
    await makeTimeout(SHORT_DELAY_IN_MS);

    listElements[0].state = ElementStates.Default;
    setListElements(listElements.map((element)=>element));
  };

  const insertElement = async (index: number) => {
    const newChar = (
      <Circle letter={value} state={ElementStates.Changing} isSmall />
    );

    setValue("");
    setIndexValue("");
    let curr = list.getHead() as INode<string>;
    let position = 0;

    let prevHead = listElements[position].head;
    listElements[position].head = newChar;
    setListElements(listElements.map((element)=>element));

    await makeTimeout(SHORT_DELAY_IN_MS);

    while (position < index) {
      listElements[position].head = prevHead;
      listElements[position].state = ElementStates.Changing;
      if (curr.next) {
        curr = curr.next;
      }
      position++;
      if (!listElements[position]) {
        listElements.push({
          letter: "",
          id: nanoid(),
          head: position === 0 ? "head" : undefined,
          tail: position === listElements.length ? "tail" : undefined,
        });
      }
      if (position === listElements.length - 1) {
        listElements[listElements.length - 2].tail = undefined;
      }
      prevHead = listElements[position].head;
      listElements[position].head = newChar;
      setListElements(listElements.map((element)=>element));
      await makeTimeout(SHORT_DELAY_IN_MS);
    }

    listElements[position].head = prevHead;

    if (index === 0) {
      listElements[0].head = undefined;
    }

    if (position === list.getSize() - 1) {
      listElements[position].letter = curr.value;
    } else {
      listElements.splice(position, 0, {
        letter: curr.value,
        id: nanoid(),
        head: position === 0 ? "head" : undefined,
        tail: position === listElements.length ? "tail" : undefined,
      });
    }
    listElements[position].state = ElementStates.Modified;
    setListElements(listElements.map((element)=>element));
    await makeTimeout(SHORT_DELAY_IN_MS);
    listElements.map((element)=>element.state=ElementStates.Default)
    setListElements(listElements.map((element)=>element));
  };

  const insertElementAtTail = async () => {
    setValue("");
    const newChar = (
      <Circle letter={value} state={ElementStates.Changing} isSmall />
    );
    listElements[listElements.length - 1].tail = undefined;
    listElements.push({
      letter: "",
      id: nanoid(),
      head: newChar,
      tail: "tail",
    });
    setListElements(listElements.map((element)=>element));
    await makeTimeout(SHORT_DELAY_IN_MS);
    const tail = list.getTail() as INode<string>;
    listElements[listElements.length - 1].state = ElementStates.Modified;
    listElements[listElements.length - 1].letter = tail.value;
    listElements[listElements.length - 1].head = undefined;
    setListElements(listElements.map((element)=>element));
    await makeTimeout(SHORT_DELAY_IN_MS);
    listElements[listElements.length - 1].state = ElementStates.Default;
    setListElements(listElements.map((element)=>element));
  };

  const removeElement = async (index: number) => {
    setIndexValue("");
    let position = 0;
    while (position < index) {
      listElements[position].state = ElementStates.Changing;
      position++;
      setListElements(listElements.map((element)=>element));
      await makeTimeout(SHORT_DELAY_IN_MS);
    }

    const charToRemove = (
      <Circle
        letter={listElements[position].letter}
        state={ElementStates.Changing}
        isSmall
      />
    );

    listElements[position].letter = "";
    listElements[position].tail = charToRemove;
    setListElements(listElements.map((element)=>element));
    await makeTimeout(SHORT_DELAY_IN_MS);

    if (position === 0 && list.getSize() > 0) {
      listElements[position + 1].head = "head";
    }

    if (position === listElements.length - 1 && list.getSize() > 0) {
      listElements[position - 1].tail = "tail";
    }

    listElements.splice(position, 1);
    listElements.map((element)=>element.state=ElementStates.Default)
    setListElements(listElements.map((element)=>element));
  };

  const visualizeInserting = async (index: number, loader: Action) => {
    setLoaderPosition(loader);
    list.insertAt(value, index);
    listElements.length > 0
      ? await insertElement(index)
      : await insertFirstElement();
    setLoaderPosition(null);
  };

  const visualizeInsertingAtTail = async () => {
    setLoaderPosition(Action.AddAtTail);
    list.insertAtTail(value);
    listElements.length > 0
      ? await insertElementAtTail()
      : await insertFirstElement();
    setLoaderPosition(null);
  };

  const visualizeRemoving = async (index: number, loader: Action) => {
    setLoaderPosition(loader);
    list.removeFrom(index);
    await removeElement(index);
    setLoaderPosition(null);
  };

  return (
    <SolutionLayout title="Связный список">
      <div  className={styles.wrapper}>
        <fieldset className={styles.fieldset}>
          <Input
            maxLength={4}
            isLimitText
            extraClass={styles.input}
            value={value}
            onChange={(evt) => setValue(evt.currentTarget.value)}
            
          />
          <Button
            text="Добавить в head"
            extraClass={styles.button}
            onClick={() => visualizeInserting(0, Action.AddAtHead)}
            disabled={
              list.getSize() === 10 || loaderPosition !== null || !value
            }
            isLoader={loaderPosition === Action.AddAtHead}
            
          />
          <Button
            text="Добавить в tail"
            extraClass={styles.button}
            onClick={visualizeInsertingAtTail}
            disabled={
              list.getSize() === 10 || loaderPosition !== null || !value
            }
            isLoader={loaderPosition === Action.AddAtTail}
            
          />
          <Button
            text="Удалить из head"
            extraClass={styles.button}
            onClick={() => visualizeRemoving(0, Action.DeleteFromHead)}
            disabled={list.getSize() === 0 || loaderPosition !== null}
            isLoader={loaderPosition === Action.DeleteFromHead}
            
          />
          <Button
            text="Удалить из tail"
            extraClass={styles.button}
            onClick={() =>
              visualizeRemoving(list.getSize() - 1, Action.DeleteFromTail)
            }
            disabled={list.getSize() === 0 || loaderPosition !== null}
            isLoader={loaderPosition === Action.DeleteFromTail}
            
          />
        </fieldset>
        <fieldset className={styles.fieldset}>
          <Input
            type="number"
            min={0}
            max={listElements.length}
            maxLength={1}
            isLimitText
            extraClass={styles.input}
            placeholder="Введите индекс"
            value={indexValue}
            onChange={(evt) => setIndexValue(evt.currentTarget.value)}
            
          />
          <Button
            text="Добавить по индексу"
            extraClass={styles.button_wide}
            onClick={() => visualizeInserting(Number(indexValue), Action.AddAt)}
            disabled={
              !indexValue ||
              Number(indexValue) > list.getSize() ||
              list.getSize() === 10 ||
              loaderPosition !== null ||
              !value
            }
            isLoader={loaderPosition === Action.AddAt}
            
          />
          <Button
            text="Удалить по индексу"
            extraClass={styles.button_wide}
            onClick={() =>
              visualizeRemoving(Number(indexValue), Action.DeleteFrom)
            }
            disabled={
              !indexValue ||
              Number(indexValue) < 0 ||
              Number(indexValue) > list.getSize() - 1 ||
              list.getSize() === 0 ||
              loaderPosition !== null
            }
            isLoader={loaderPosition === Action.DeleteFrom}
            
          />
        </fieldset>
        <div className={styles.algorithm}>
          {listElements.length > 0 &&
            listElements.map((element, index) => (
              <div className={styles.elementWrapper} key={element.id}>
                <Circle
                  letter={element.letter}
                  head={element.head}
                  tail={element.tail}
                  state={element.state}
                  index={index}
                />
                {index < listElements.length - 1 && <ArrowIcon />}
              </div>
            ))}
        </div>
      </div>
    </SolutionLayout>
  );
};