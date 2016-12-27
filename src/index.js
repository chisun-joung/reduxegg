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
const removeCounter = (list, index) => {
    return [
        ...list.slice(0, index),
        ...list.slice(index + 1)
    ];
};
const incrementCounter = (list, index) => {
    return [
        ...list.slice(0,index),
        list[index] + 1,
        ...list.slice(index + 1)
    ];
};
const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            if (state.id !== action.id) {
                return state;
            }

            return {
                ...state,
                completed: !state.completed
            };
        default:
            return state;
    }
}
const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined,action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t,action));
        default:
            return state;
    }
};


const testAddCounter = () => {
    const listBefore = [];
    const listAfter = [0];
    deepfreeze(listBefore);
    expect(
        addCounter(listBefore)
    ).toEqual(listAfter);
};
const testRemoveCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 20];
    deepfreeze(listBefore);
    expect(
        removeCounter(listBefore, 1)
    ).toEqual(listAfter);
};
const testIncrementCounter = () => {
    const listBefore = [0, 10, 20];
    const listAfter = [0, 11, 20];
    deepfreeze(listBefore);
    expect(
        incrementCounter(listBefore, 1)
    ).toEqual(listAfter)
};
const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Going shopping',
            completed: false
        }

    ];
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        },
        {
            id: 1,
            text: 'Going shopping',
            completed: true
        }

    ];
    deepfreeze(stateBefore);
    deepfreeze(action);
    expect(
        todos(stateBefore,action)
    ).toEqual(stateAfter);
};
const testAddTodo = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'Learn Redux'
    };
    const stateAfter = [
        {
            id: 0,
            text: 'Learn Redux',
            completed: false
        }
    ];
    deepfreeze(stateBefore);
    deepfreeze(action);
    expect(
        todos(stateBefore,action)
    ).toEqual(stateAfter);
};
testToggleTodo();
testAddCounter();
testRemoveCounter();
testIncrementCounter();
testAddTodo();
console.log('All tests passed');