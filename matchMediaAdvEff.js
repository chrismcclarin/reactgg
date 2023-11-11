// You're given a functioning app that utilizes useEffect with some React state to synchronize the browser's dimension with the component. This works, but it's not ideal. Instead, refactor the app to utilize React's useSyncExternalStore hook.

// TASKS
// Refactor the app to keep the same functionality but use the useSyncExternalStore hook
// Show the correct UI for larger browser dimensions
// Show the correct UI for mobile browser dimensions
// Subscribe and unsubscribe to the browser's dimensions using the MatchMedia API

import * as React from "react";
import { phone, desktop } from "./icons";

const query = "only screen and (max-width : 768px)";
// useSyncExternalStore uses subscribe and getSnapshot functions.
// getSnapshot is similar to the state, as it grabs a snapshot of the state that is being controlled elsewhere.
// subscribe is similar to getState, as it connects to the outside source that is controlling the state.

// in this case, we need to add those functions. The getSnapshot function will replace the handleChange function.
const getSnapshot = () => {
    return window.matchMedia(query).matches;
};

// subscribe will handle the event listeners so that whenever a change needs to happen it can call the getSnapshot.
const subscribe = (callback) => {
    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener("change", callback);

    return () => {
        matchMedia.removeEventListener("change", callback);
    };
};

export default function MatchMedia() {
    // since State is being controlled elsewhere, we no longer need to control it in react.
    // since getSnapshot and subscribe cover all the functionality, we just need to set isMobile to call those functions.
    // useEffect is now replaced with useSyncExternalStore, so it is removed.
    const isMobile = React.useSyncExternalStore(subscribe, getSnapshot);

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
