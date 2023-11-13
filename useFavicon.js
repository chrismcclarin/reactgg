// useFavicon allows you to dynamically update the document's favicon.

// useFavicon("https://ui.dev/favicon/favicon-32x32.png")
// For the full documentation, see usehooks.com/usefavicon.

// TASKS
// Update the document's favicon with the href passed to useFavicon
// Update the document's favicon when the href passed to useFavicon changes

import * as React from "react";
// import useFavicon from "./useFavicon";

//export default 
//You'll want to synchronize the document's favicon with the first argument passed to useFavicon. To do that, you can utilize React's useEffect hook.
function useFavicon(url) {

//In order to update the document's favicon, we need to do some DOM scripting. Here's how it'll work.
// First, you'll want to use document.querySelector to see if there's already a link element with the rel attribute set to icon. If there isn't, create it, update its type to image/x-icon, set it's rel property to icon, set its href property to url, and append it to the document's head.
// If there is already a link element, you'll just want to update its href property to url.
    React.useEffect(() => {
        let link = document.querySelector(`link[rel~="icon"]`)
    
        if (!link) {
            link = document.createElement("link");
            link.type = "image/x-icon";
            link.rel = "icon";
            link.href = url;
            document.head.appendChild(link);
        } else {
            link.href = url;
        }
    }, [url]);
}


const faviconMap = {
    uidotdev: "https://ui.dev/favicon/favicon-32x32.png",
    bytes: "https://bytes.dev/favicon/favicon-32x32.png",
    react_newsletter: "https://reactnewsletter.com/favicon/favicon-32x32.png"
};

export default function App() {
    const [id, setId] = React.useState("uidotdev");

    useFavicon(faviconMap[id]);

    return (
        <section>
            <h1>useFavicon</h1>
            <button
                title="Set the favicon to uidotdev's logo"
                className={`link ${id === "uidotdev" && "active"}`}
                onClick={() => setId("uidotdev")}
            >
                ui.dev
            </button>
            <button
                title="Set the favicon to Bytes' logo"
                className={`link ${id === "bytes" && "active"}`}
                onClick={() => setId("bytes")}
            >
                bytes
            </button>
            <button
                title="Set the favicon to React Newsletter's logo"
                className={`link ${id === "react_newsletter" && "active"}`}
                onClick={() => setId("react_newsletter")}
            >
                react newsletter
            </button>
            <p>
                You won't be able to see the changes if you're in a sandbox environment.
                Instead, you'll want to open up the app{" "}
                <a
                className="link"
                href="https://codesandbox.io/s/usefavicon-challenge-5z9yxg?file=/src/useFavicon.js"
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
