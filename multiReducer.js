//Given the solution code to the previous "Multistep Form" challenge you encountered earlier in the course, your job is to refactor the app to use useReducer to manage state instead of useState.

// TASKS
// Enable a user to transition to the next step
// Enable a user to return to the previous Step
// Keep track of the step and form state correctly
// Reset the form when the user submits it
// Use the useReducer hook to manage the component's state

import * as React from "react";

const initialFormData = {
    name: "",
    email: "",
    address: "",
    city: "",
    zipcode: ""
};

export default function MultistepFormReducer() {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [formData, setFormData] = React.useState(initialFormData);

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };

    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Thank you for your submission");
        setCurrentStep(1);
        setFormData(initialFormData);
    };
}


  //After this is JSX code