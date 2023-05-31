
import {cleanup, render, screen, fireEvent} from '@testing-library/react'
import { Button } from './button';

describe("Button Testing", ()=>{
    beforeEach(cleanup);

    it ('Кнопка отрисовывается с текстом', ()=>{
        render (<Button text='testing'/>);
        const button = screen.getByTestId("button");
        expect(button).toHaveTextContent('testing');
        expect(button).toMatchSnapshot();
    })
    
    it ('Кнопка отрисовывается без текста', ()=>{
        render (<Button />);
        const button = screen.getByTestId("button");
        expect(button).toHaveTextContent('');
        expect(button).toMatchSnapshot();
    })

    it ('Кнопка disabled', ()=>{
        render (<Button disabled/>);
        const button = screen.getByTestId("button");
        expect(button).toBeDisabled();
        expect(button).toMatchSnapshot();
    })

    it ('Кнопка отрисовывается с loader', ()=>{
        render (<Button isLoader />);
        const loader = screen.getByTestId("loader");
        const button = screen.getByTestId("button");
        expect(button).toContainElement(loader);
        expect(button).toMatchSnapshot();
    })

    it ('Коллбэк работает корректно', ()=>{
        const callback = jest.fn();
        render (<Button onClick={callback}/>);
        const button = screen.getByTestId("button");
        fireEvent.click(button)
        expect(callback).toHaveBeenCalled();
    })

})