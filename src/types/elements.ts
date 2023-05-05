import { ReactComponentElement } from "react";
import { ElementStates } from "./element-states"

export type TElement = {
    letter: string|number;
    id: number|string;
    state?: ElementStates;
    head?: string|React.ReactElement;
    tail?: string|React.ReactElement;
}

export type TElementBar = {
    number: number;
    id: number;
    state: ElementStates;
}

