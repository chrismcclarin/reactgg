// The useDefault hook behaves similar to useState but with one difference – if the state of the hook is undefined or null, useDefault will default the state back to a provided default value.

// const [state, setState] = useDefault(initialValue, defaultValue);
// For the full documentation, see usehooks.com/usedefault.

// TASKS
// useDefault should return an array
// On the initial render, the state that useDefault returns should be the same as the initialValue given to useDefault when it was invoked
// When invoked, useDefault's updater function should update its state to the value passed to the updater function
// If useDefault's state becomes undefined, the state that useDefault returns should be the defaultValue given to useDefault when it was invoked
// If useDefault's state becomes null, the state that useDefault returns should be the defaultValue given to useDefault when it was invoked

// this is made with two components, but I made them one for ease.
// import useDefault from "./useDefault";

// export default this function from another page
function useDefault(initialState, defaultState) {
    //useDefault takes in the initial state and Default state and then sets up the useState hook.
    const [state, setState] = React.useState(initialState)
    // since the state change is in event handlers, we just need to set up an if statement for when the state is undefined or null and set the state to the default state.
    if (state === null || typeof state === "undefined"){
        setState(defaultState)
    }
    //useDefault always returns an array that includes the current state and the setState function.
    return [state, setState];
}

export default function App() {
    const initialState = { name: "Tyler" };
    const defaultState = { name: "Ben" };

    const [user, setUser] = useDefault(initialState, defaultState);

    return (
        <section>
            <h1>useDefault</h1>

            <button
                title="Sets the value to Lynn"
                className="link"
                onClick={() => setUser({ name: "Lynn" })}
            >
                Lynn
            </button>
            <button
                title="Sets the value to Tyler"
                className="link"
                onClick={() => setUser({ name: "Tyler" })}
            >
                Tyler
            </button>
            <button
                title="Sets the value to null causing it to use the default value"
                className="link"
                onClick={() => setUser(null)}
            >
                null
            </button>
            <pre>
                <code>{JSON.stringify(user)}</code>
            </pre>
        </section>
    );
}
