// In this challenge you're given two components, ParentComponent and ChildComponent. The goal is to make it so whenever the button in ChildComponent is clicked, you increment count in the ParentComponent. The caveat is that ChildComponent should only ever render once, when the app first loads.

// TASKS
// Increment count when the button is clicked
// ChildComponent should only render once, when the app first loads

import * as React from "react";

function ChildComponent({ children, onClick }) {
    console.count("Child component is rendering");

    return <button onClick={onClick}>{children}</button>;
}

// Memoize the component, so it only renders once.
const MemoizedChildComponent = React.memo(ChildComponent);

export default function ParentComponent() {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());
    // add use State to adjust the state of count.
    let [count, setCount] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    
    // memoizing ChildComponent makes it so it will re-render only when the props change.
    // The problem is that onClick is a reference value and therefore it will change on every render, which changes the prop, which re-renders, which then changes the prop, etc etc.
    // this is where we use useCallback to control our onClick function
    const handleIncrementCount = React.useCallback(() => {
        setCount((count) => count + 1)
    }, []);
    // we passed a function to setCount to keep access to the current value of count without having a dependency array.

    return (
        <div>
            <p>Current time: {time}</p>
            <p>Count: {count}</p>
            <MemoizedChildComponent onClick={handleIncrementCount}>
                Increment Count
            </MemoizedChildComponent>
        </div>
    );
}
