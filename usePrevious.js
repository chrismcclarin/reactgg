// usePrevious is useful for tracking what a value was during the previous render. This can be particularly handy in scenarios where it's necessary to compare the current value with the previous one, such as triggering actions or rendering based on changes.

// const previousValue = usePrevious(value);
// For the full documentation, see usehooks.com/useprevious.

// TASKS
// usePrevious should return null on the first render
// usePrevious should return the previous value when the current value changes

import * as React from "react";
// import usePrevious from "./usePrevious";

// export default
function usePrevious() {
    const [current, setCurrent] = React.useState(value);
    const [previous, setPrevious] = React.useState(null);

    if(current != value){
        setPrevious(current)
        setCurrent(value)
    }
    
    return previous;
}

function getRandomColor() {
    const colors = ["green", "blue", "purple", "red", "pink"];
        return colors[Math.floor(Math.random() * colors.length)];
}

export default function App() {
    const [color, setColor] = React.useState(getRandomColor());
    const previousColor = usePrevious(color);

    const handleClick = () => {
        function getNewColor() {
            const newColor = getRandomColor();
            if (color === newColor) {
                getNewColor();
            } else {
                setColor(newColor);
            }
            }
        getNewColor();
    };

    return (
        <section>
        <h1>usePrevious</h1>
        <button className="link" onClick={handleClick}>
            Next
        </button>
        <article>
            <figure>
            <p style={{ background: `var(--${previousColor})` }} />
            <figcaption>Previous: {previousColor}</figcaption>
            </figure>
            <figure>
            <p style={{ background: `var(--${color})` }} />
            <figcaption>Current: {color}</figcaption>
            </figure>
        </article>
        </section>
    );
}
