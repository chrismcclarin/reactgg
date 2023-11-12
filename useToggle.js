// useToggle has a similar API to useState in that both return an array with the first item being the state and the second item being a way to update that state. However, unlike useState, useToggle's state value can only ever be a boolean.

// const [on, setOn] = useToggle(true);

setOn() // false
setOn() // true
setOn(false) // false
setOn(true) // true
setOn("state is still toggled") // false
// For the full documentation, see usehooks.com/usetoggle.

// TASKS
// useToggle should correctly establish its initial value, casting it to a boolean if it's not one
// useToggle should toggle the state when its updater function is invoked without a value
// useToggle should set the state to the provided value when its updater function is called with a boolean value
// useToggle should not change the state when its updater function is called with the same boolean value
// useToggle should toggle the state when its updater function is called with a value that isn't a boolean


// App was made using multiple files, I decided to just put them together for ease.

// import useToggle from "./useToggle";

import * as React from "react";

// export default this component
function useToggle(initialValue = true) {
    // useToggle is supposed to take in a boolean, so we set a React state to control setting the boolean, but we add a statement to ensure the inital value is a boolean.
    const [on, setOn] = React.useState(() => {
        if (typeof initialValue === "boolean") {
            return initialValue;
        }

        return Boolean(initialValue)
    });
    //now we need to adjust the setOn function so that it always returns a boolean in the main app
    // use of useCallback here to make the function more performant, so we memoize the function so it isn't remade every render.
    const handleToggle = React.useCallback((value) => {
        if (typeof value === "boolean") {
            return setOn(value);
        }
        // if the value taken in is not a boolean, then whatever the state the boolean is in, we want to switch it to the other.
        return setOn((v) => !v);
    })
    // always returns an array that is state and a way to toggle the boolean of the state.
    return [on, handleToggle];
}

function ToggleDemo({ on, toggle }) {
    return (
        <div>
            <label className="toggle">
                <input
                onChange={toggle}
                className="toggle-checkbox"
                type="checkbox"
                checked={on}
                />
                <div className="toggle-switch"></div>
                <span className="toggle-label">{on ? "On" : "Off"}</span>
            </label>
        </div>
    );
}

export default function App() {
    const [on, toggle] = useToggle(true);

    return (
        <section>
            <h1>UseToggle</h1>
            <button disabled={on} className="link" onClick={() => toggle(true)}>
                Turn On
            </button>
            <button disabled={!on} className="link" onClick={() => toggle(false)}>
                Turn Off
            </button>
            <button className="link" onClick={toggle}>
                Toggle
            </button>
            <button className="link" onClick={() => toggle("nope")}>
                (Also toggles)
            </button>
            <ToggleDemo toggle={toggle} on={on} />
        </section>
    );
}
