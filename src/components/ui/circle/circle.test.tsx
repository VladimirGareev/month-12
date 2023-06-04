import {cleanup, render, screen, fireEvent, within} from '@testing-library/react'
import { Circle } from './circle';
import { ElementStates } from '../../../types/element-states';

describe ("circle component testing", ()=>{
    beforeEach(cleanup);
 it("Circle отрисовывается корректно без буквы", ()=> {
        render (<Circle />);
        const circle = screen.getByTestId("circle");
        expect(circle).toHaveTextContent('');
        expect(circle).toMatchSnapshot();
    })

    it("Circle отрисовывается корректно c буквами", ()=> {
        render (<Circle letter="ABCD"/>);
        const circle = screen.getByTestId("circle");
        expect(circle).toHaveTextContent('ABCD');
        expect(circle).toMatchSnapshot();
    })

    it("Circle отрисовывается корректно c текстом в HEAD", ()=> {
        render (<Circle head="ABCD"/>);
        const head = screen.getByTestId("head");
        expect(head).toHaveTextContent('ABCD');
        expect(head).toMatchSnapshot();
    })
    
    it("Circle отрисовывается корректно c элементом в HEAD", ()=> {
        render (<Circle head={<Circle isSmall letter="ABCD"/>}/>);
        const heads = screen.getAllByTestId("head");
        const circle = within(heads[0]).getByTestId("circle")
        expect(circle).toBeInTheDocument();
        expect(circle).toHaveTextContent('ABCD');
        expect(heads[0]).toMatchSnapshot();
    })
    it("Circle отрисовывается корректно c текстом в TAIL", ()=> {
        render (<Circle tail="ABCD"/>);
        const tail = screen.getByTestId("tail");
        expect(tail).toHaveTextContent('ABCD');
        expect(tail).toMatchSnapshot();
    })
    
    it("Circle отрисовывается корректно c элементом в TAIL", ()=> {
        render (<Circle tail={<Circle isSmall letter="ABCD"/>}/>);
        const tails = screen.getAllByTestId("tail");
        const circle = within(tails[0]).getByTestId("circle")
        expect(circle).toBeInTheDocument();
        expect(circle).toHaveTextContent('ABCD');
        expect(tails[0]).toMatchSnapshot();
    })

    it("Circle отрисовывается корректно c Index", ()=> {
        render (<Circle index={1} />);
        const circle = screen.getByTestId("circle");
        const index = within(circle).getByTestId("index")
        expect(index).toBeInTheDocument();
        expect(index).toHaveTextContent('1');
        expect(circle).toMatchSnapshot();
    })

    it("Circle отрисовывается корректно пропсом isSmall", ()=> {
        render (<Circle isSmall={true} />);
        const circle = screen.getByTestId("circle");
        const small = screen.getByTestId("small");
        expect(circle).toBeInTheDocument();
        expect(small).toHaveClass("small");
        expect(circle).toMatchSnapshot();
    })
    it("Circle отрисовывается корректно в состоянии default", ()=> {
        render (<Circle state={ElementStates.Default} />);
        const circle = screen.getByTestId("circle");
        const small = screen.getByTestId("small");
        expect(circle).toBeInTheDocument();
        expect(small).toHaveClass("default");
        expect(circle).toMatchSnapshot();
    })
    it("Circle отрисовывается корректно в состоянии changing", ()=> {
        render (<Circle state={ElementStates.Changing} />);
        const circle = screen.getByTestId("circle");
        const small = screen.getByTestId("small");
        expect(circle).toBeInTheDocument();
        expect(small).toHaveClass("changing");
        expect(circle).toMatchSnapshot();
    })

    it("Circle отрисовывается корректно в состоянии modified", ()=> {
        render (<Circle state={ElementStates.Modified} />);
        const circle = screen.getByTestId("circle");
        const small = screen.getByTestId("small");
        expect(circle).toBeInTheDocument();
        expect(small).toHaveClass("modified");
        expect(circle).toMatchSnapshot();
    })
})