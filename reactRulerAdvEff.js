// Using the ResizeObserver API, synchronize the width of the ruler (the article element) with your component's width state.

// TASKS
// Update the width state when the ruler is resized
// Clean up the ResizeObserver when the component is removed from the DOM

import * as React from "react";

export default function ReactRuler() {
    // ResizeObserver API requires a DOM node to observe, therefore we add a useRef hook to "grab" a node.
    const ref = React.useRef(null)
    const [width, setWidth] = React.useState(null);

    // now we use useLayoutEffect() to create a new instance of ResizeObserver and observe our reference.
    // useLayoutEffect() does the same thing as useEffect(), except that useLayoutEffect() happens before the ui paints the screen.
    React.useLayoutEffect(()=>{
        const observer = new ResizeObserver(([entry]) => {
            setWidth(entry.borderBoxSize[0].inlineSize)
        })
        //our resize obvserver will observe our reference
        observer.observe(ref.current)

        return ()=>{
            //upon re-render, observer will disconnect, then reconnect when the page finishes re-rendering.
            observer.disconnect()
        }
    }, [])

    return (
        <section>
            <h1>React Ruler</h1>
            <p>(Resize the ruler)</p>
            <article ref={ref}>
                <label>width: {Math.floor(width)}</label>
            </article>
        </section>
    );
}