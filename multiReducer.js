//Given the solution code to the previous "Multistep Form" challenge you encountered earlier in the course, your job is to refactor the app to use useReducer to manage state instead of useState.

// TASKS
// Enable a user to transition to the next step
// Enable a user to return to the previous Step
// Keep track of the step and form state correctly
// Reset the form when the user submits it
// Use the useReducer hook to manage the component's state

import * as React from "react";

// initial state is made to include both the form data and the step value because they are both states that rely on each other
const initialState = {
    currentStep: 1,
    formData: {
        name: "",
        email: "",
        address: "",
        city: "",
        zipcode: ""
    }
};

// A reducer function is added for the useReducer hook. It takes two props, state and action, So that it can modify state based on the actions
function reducer(state, action){
    if (action.type === "next_step") {
// action is a string to decouple the values from the actions. State is added as a spread function and then the currentStep key is modified
        return {...state, currentStep: state.currentStep + 1}
    } else if (action.type === "prev_step") {
        return { ...state, currentStep: state.currentStep - 1 };
    } else if (action.type === "change") {
        return {
            ...state,
            formData: { ... state.formData, [action.name]: action.value}
        }
    } else if (action.type === "reset") {
        return initialState
    } else {
        throw new Error("this action type isn't supported")
    }
}

export default function MultistepFormReducer() {
// much like useState, useReducer has a state variable and then a function to set state, except this function is called "Dispatch".
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const handleNextStep = () => {
// Dispatch automatically takes in the current state, so it only needs to take in the action prop for our reducer function. 
// We made our action into an object to allow for different ways action could be modify state. 
        dispatch({ type: "next_step"});
    };

    const handlePrevStep = () => {
        dispatch({ type: "prev_step"});
    };

    const handleChange = (e) => { 
// In this example, we have the type, but we are also adding the name and value so that when we modify state, we can modify it with these values.
        dispatch({ 
            type: "change",
            name: e.target.name,
            value: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your submission");
        dispatch({type : reset});
    };
}
const { currentStep, formData } = state;

  //After this is JSX code