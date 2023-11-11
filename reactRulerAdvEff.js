// Using the ResizeObserver API, synchronize the width of the ruler (the article element) with your component's width state.

// TASKS
// Update the width state when the ruler is resized
// Clean up the ResizeObserver when the component is removed from the DOM

import * as React from "react";

export default function ReactRuler() {
    const [width, setWidth] = React.useState(null);

    return (
        <section>
            <h1>React Ruler</h1>
            <p>(Resize the ruler)</p>
            <article>
                <label>width: {Math.floor(width)}</label>
            </article>
        </section>
    );
}