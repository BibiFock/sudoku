import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Sudoku from './components/Sudoku';
import Solver from './components/Solver';

it('renders app first level have Solver and Sudoku', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.contains(<Solver />)).toEqual(true);
    expect(wrapper.contains(<Sudoku />)).toEqual(true);

    // expect(wrapper).toContainReact(<Sudoku />);
});
