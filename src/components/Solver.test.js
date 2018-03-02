import React from 'react';
import { shallow } from 'enzyme';
import SolverConnected, { Solver } from './Solver';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

describe('>>> Solver --- render components', () => {
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow( <Solver haveError={ false } /> );
    })

    it('+++ container is here with class: .actions', () => {
        expect(wrapper).toHaveLength(1);
        expect(wrapper.hasClass('actions')).toBe(true);
    });

    it('+++ actions containers here with class: .actions-body', () => {
        expect(wrapper.find('.actions > .actions-body')).toHaveLength(1);
    });

    it('+++ test all actions are here', () => {
        expect(wrapper.find('button')).toHaveLength(4);
    });

    ['load grid 1', 'load grid 2', 'clear', 'résoudre'].forEach((text, index) => {
        it('+++ test action: ' + text, () => {
            expect(wrapper.find('button').at(index).text()).toEqual(text);
        });
    });
});

describe('>>> Solver - REDUX', () => {
    let wrapper, store;
    let mockStore = configureStore()
    let state = { isOk: true };

    beforeEach(()=>{
        store = mockStore(state);
        wrapper = shallow( <SolverConnected store={store} /> );
    })

    it('+++ render the connected(SMART) component', () => {
        expect(wrapper.length).toEqual(1)
    });

    it('+++ check initial state', () => {
        expect(wrapper.prop('haveError')).toBe(!state.isOk);
    });

    // it('+++ render solve should be enable', () => {
        // expect(wrapper.find('button:disabled')).toHaveLength(0);
    // });

    // it('+++ render solve is disabled', () => {
        // expect(wrapper.find('button:disabled')).toHaveLength(1);
    // });


});
