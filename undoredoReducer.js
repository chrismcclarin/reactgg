// The goal of this challenge is, using useReducer, add increment, decrement, undo, and redo functionality to your application. Unlike the other challenges, you'll need to wire up useReducer, the event handlers, and the reducer function yourself – you won't need to touch the JSX though.

// TASKS
// Clicking increment should increment the counter
// Clicking decrement should decrement the counter
// Clicking undo and redo should undo or redo the previous action

import * as React from "react";

const initialState = {
    //notice the the past is the array of all past numbers for the undo
    //the present is the shown value
    //and the future is the array of all future numbers for the redo
    past: [],
    present: 0,
    future: []
};

function reducer(state, action) {
// this deconstructs the state object, so we can use the keys instead of state.key
    const { past, present, future } = state;

    if (action.type === "increment") {
        return {
            // the past gets all the previous past values plus the current present value
            past: [...past, present],
            // the present is incremented by 1
            present: present + 1,
            // the future is cleared because it is only applied when the user presses undo. 
            future: []
        };
    }
    //decrement is the same as increment, but with a -1
    if (action.type === "decrement") {
        return {    
            past: [...past, present],
            present: present - 1,
            future: []
        };
    }
    
    if (action.type === "undo") {
        return {   
        // for undo, the past needs to be all but the last value
            past: past.slice(0, -1),
        // the present needs to be the last value in the past array
            present: past.at(-1),
        // then we add the current present to the front of the future array, for the redo action type
            future: [present, ...future]
        };
    }
    
    if (action.type === "redo") {
        return {
        //for the rdo, the past gets all the previous past values and the current one
            past: [...past, present],
        // the present gets the first value of the future becuase we decided to put that value in front in the undo action type.
            present: future[0],
        // then we remove the first value of the array because we put the value in the front.
            future: future.slice(1)
        };
    }
    
    throw new Error("This action type isn't supported.")
}


export default function CounterWithUndoRedo() {
    // this was obviously replaced with useReducer()
    const [state, dispatch] = React.useReducer(reducer, initialState);

    // the event handlers need the object with the key type as we have seen before.
    const handleIncrement = () => dispatch({ type: "increment" });
    const handleDecrement = () => dispatch({ type: "decrement" });
    const handleUndo = () => dispatch({ type: "undo" });
    const handleRedo = () => dispatch({ type: "redo" });

    return (
        <div>
            <h1>Counter: {state.present}</h1>
            <button className="link" onClick={handleIncrement}>
                Increment
            </button>
            <button className="link" onClick={handleDecrement}>
                Decrement
            </button>
            <button
                className="link"
                onClick={handleUndo}
                disabled={!state.past.length}
            >
                Undo
            </button>
            <button
                className="link"
                onClick={handleRedo}
                disabled={!state.future.length}
            >
                Redo
            </button>
        </div>
    );
}
