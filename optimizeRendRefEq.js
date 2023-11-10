// In this challenge you're given two components, ParentComponent and ChildComponent. The goal is to make it so whenever the button in ChildComponent is clicked, you increment count in the ParentComponent. The caveat is that ChildComponent should only ever render once, when the app first loads.

// TASKS
// Increment count when the button is clicked
// ChildComponent should only render once, when the app first loads

import * as React from "react";

function ChildComponent({ children, onClick }) {
    console.count("Child component is rendering");

    return <button onClick={onClick}>{children}</button>;
}

const MemoizedChildComponent = ChildComponent;

export default function ParentComponent() {
    const [time, setTime] = React.useState(new Date().toLocaleTimeString());
    let count = 0;

    React.useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const handleIncrementCount = () => {};

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
