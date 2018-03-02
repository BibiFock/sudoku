import React from 'react';
import { shallow, mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import SolverConnected, { Solver } from './Solver';
import { solveIt, loadGrid, clearIt } from '../actions';
import * as Actions from '../actions/Constants';

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
});

describe('>>> Solver - React + REDUX (mount + wrapping provider) ', () => {
    let wrapper, store;
    let mockStore = configureStore()
    let state = { isOk: true };

    beforeEach(()=>{
        store = mockStore(state);
        wrapper = mount( <Provider store={store}><SolverConnected /></Provider> );
    });

    it('+++ contains all actions', () => {
        expect(wrapper.find('button')).toHaveLength(4);
    });

    it('+++ render the connected(SMART) component', () => {
       expect(wrapper.find(SolverConnected).length).toEqual(1)
    });

    it('+++ check action on dispatching ', () => {
        store.dispatch(solveIt());
        store.dispatch(clearIt());
        store.dispatch(loadGrid(0));

        let actions = store.getActions()

        expect(actions[0].type).toBe(Actions.SOLVE);
        expect(actions[1].type).toBe(Actions.CLEAR);
        expect(actions[2].type).toBe(Actions.LOAD_GRID);
    });

});
