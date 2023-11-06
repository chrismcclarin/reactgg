//Given the solution code to the previous "Multistep Form" challenge you encountered earlier in the course, your job is to refactor the app to use useReducer to manage state instead of useState.

// TASKS
// Enable a user to transition to the next step
// Enable a user to return to the previous Step
// Keep track of the step and form state correctly
// Reset the form when the user submits it
// Use the useReducer hook to manage the component's state

import * as React from "react";

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

function reducer(state, action){
    if (action.type === "next_step") {
        return {...state, currentStep: state.currentStep + 1}
    } else if (action.type === "prev_step") {

    } else if (action.type === "change") {

    } else if (action.type === "reset") {
        return {
            ...state,
            formData: { ... state.formData, [action.name]: action.value}
        }
    } else {
        throw new Error("this action type isn't supported")
    }
}

export default function MultistepFormReducer() {
    const [state, dispatch] = React.useReducer(reducer, initialState)

    const handleNextStep = () => {
        dispatch({ type: "next_step"});
    };

    const handlePrevStep = () => {
        dispatch({ type: "prev_step"});
    };

    const handleChange = (e) => { 
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