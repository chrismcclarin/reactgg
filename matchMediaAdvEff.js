// You're given a functioning app that utilizes useEffect with some React state to synchronize the browser's dimension with the component. This works, but it's not ideal. Instead, refactor the app to utilize React's useSyncExternalStore hook.

// TASKS
// Refactor the app to keep the same functionality but use the useSyncExternalStore hook
// Show the correct UI for larger browser dimensions
// Show the correct UI for mobile browser dimensions
// Subscribe and unsubscribe to the browser's dimensions using the MatchMedia API

import * as React from "react";
import { phone, desktop } from "./icons";

const query = "only screen and (max-width : 768px)";

export default function MatchMedia() {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleChange = () => {
            setIsMobile(window.matchMedia(query).matches);
        };

        const matchMedia = window.matchMedia(query);

        matchMedia.addEventListener("change", handleChange);

        return () => {
            matchMedia.removeEventListener("change", handleChange);
        };
    }, []);

    return (
        <section>
            Resize your browser's window to see changes.
            <article>
                <figure className={isMobile ? "active" : ""}>
                    {phone}
                    <figcaption>Is mobile: {`${isMobile}`}</figcaption>
                </figure>

                <figure className={!isMobile ? "active" : ""}>
                    {desktop}
                    <figcaption>Is larger device: {`${!isMobile}`}</figcaption>
                </figure>
            </article>
        </section>
    );
}
