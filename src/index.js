import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import deepfreeze  from 'deepfreeze';
import expect from 'expect';

const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

const store = createStore(counter);


store.dispatch({type: 'INCREMENT'});
console.log(store.getState());

const Counter = ({
    value,
    onIncrement,
    onDecrement
}) => (
    <div>
        <h1> {value} </h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
);

const render = () => {
    ReactDOM.render(
        <Counter
            value={store.getState()}
            onIncrement={()=>
                store.dispatch({
                    type: 'INCREMENT'
                })
            }
            onDecrement={()=>
                store.dispatch({
                    type: 'DECREMENT'
                })
            }
        />,
        document.getElementById('root')
    );
};

store.subscribe(render);
render();

const addCounter = (list) => {
    return [...list, 0];

};

const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];
    deepfreeze(listBefore);
    expect(
        addCounter(listBefore)
    ).toEqual(listAfter);
};

const removeCounter = (list, index) => {
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ];
};

const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];
    deepfreeze(listBefore);
    expect(
        removeCounter(listBefore, 1)
    ).toEqual(listAfter);
};

const incrementCounter = (list, index) => {
    return [
        ...list.slice(0,index),
        list[index] + 1,
        ...list.slice(index + 1)
    ];
};

const testIncrementCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];
    deepfreeze(listBefore);
    expect(
        incrementCounter(listBefore, 1)
    ).toEqual(listAfter)
};

testAddCounter();
testRemoveCounter();
testIncrementCounter();
console.log('All tests passed');