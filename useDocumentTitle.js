// useDocumentTitle allows you to dynamically update the title of a webpage.

// useDocumentTitle("New Title")
// For the full documentation, see usehooks.com/usedocumenttitle.

// TASKS
// Update the document's title with the first argument passed to useDocumentTitle
// Update the document's title when the first argument passed to useDocumentTitle changes

// App was made using multiple files, I decided to just put them together for ease.

import * as React from "react";
// import useDocumentTitle from "./useDocumentTitle";

//export default this function from a different file
function useDocumentTitle(title) {
    //use Effect here because we are affecting the actual DOM of the website.
    React.useEffect(()=>{
        document.title = title
    }, [title])
}

export default function App() {
    const [count, setCount] = React.useState(0);

    const handleClick = () => setCount(count + 1);

    useDocumentTitle(`Clicked ${count} times.`);

    return (
        <section>
            <h1>useDocumentTitle</h1>
            <button className="primary" onClick={handleClick}>
                Increment Count: {count}
            </button>

            <p>
                You won't be able to see the changes if you're in a sandbox environment.
                Instead, you'll want to open up the app{" "}
                <a
                className="link"
                href="https://codesandbox.io/s/usedocumenttitle-challenge-qqt4zt?file=/src/useDocumentTitle.js"
                target="_blank"
                rel="noreferrer"
                >
                    in a new tab and paste your code into it.
                </a>
                .
            </p>
        </section>
    );
}