import React, { useEffect, useState } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Column } from "../ui/column/column";
import { TElementBar } from "../../types/elements";
import { Button } from "../ui/button/button";
import styles from "./sorting-page.module.css"
import { Direction } from "../../types/direction";
//import { makeTimeout } from "../string/utils";
import { bubbleSorting, randomArr, sortSelection } from "./utils";

export const SortingPage: React.FC = () => {
  const [sortingType, setSortingType] = useState("selection");
  const [array, setArray] = useState<TElementBar[]>([]);
  const [direction, setDirection] = useState<Direction|null>();
  const [loader, setLoader] = useState(false);
  const [loaderPlace, setLoaderPlace] = useState("")

  const runSorting = async (direction: Direction) => {
    setLoader(true);
    //setLoaderPosition(direction);
    sortingType === "selection"
      ? await sortSelection(array, setArray, direction, setLoaderPlace )
      : await bubbleSorting(array, setArray, direction, setLoaderPlace )
    setLoader(false);
    setDirection(null);
  };
  
  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
      <div className={styles.flexContainer}>
        <RadioInput label="Выбор"
        checked={sortingType==="selection"}
        onChange={()=>setSortingType("selection")}
        disabled={loader}
        />
        <RadioInput label="Пузырёк"extraClass={styles.radioMargin}
        checked={sortingType==="bubble"}
        onChange={()=>setSortingType("bubble")}
        disabled={loader}
        />
        <Button
        extraClass = {`${styles.radioMargin} ${styles.button}`}
        text="По возрастанию"
        sorting={Direction.Ascending}
        onClick={()=>{
          setLoaderPlace('ascending');
          runSorting(Direction.Ascending)}}
        isLoader={loaderPlace === 'ascending'}
        disabled={loader}
        />
        <Button
        text="По убыванию"
        sorting={Direction.Descending}
        onClick={()=>{
          setLoaderPlace('descending')
          runSorting(Direction.Descending)}}
        extraClass={`ml-12 ${styles.button}`}
        disabled = {loader} 
        isLoader={loaderPlace === 'descending'}
        />
        <Button
         text="Новый массив"
         extraClass={`${styles.marginLeft} ${styles.button}`}
         disabled = {loader}
         onClick={()=>setArray(randomArr())}
        />
      </div>
      <div className={styles.columns}>
          {array.length > 0 &&
            array.map((element) => (
              <Column
                index={element.number}
                key={element.id}
                state={element.state}
                extraClass="ml-10"
              />
            ))}
        </div>
      </div>

    </SolutionLayout>
  );
};
