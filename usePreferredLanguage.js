// usePreferredLanguage returns a string that represents the preferred language of the user, as set in the browser settings. You can get access to their preferred language via navigator.language. You can listen to changes to the preferred language by adding an event listener for the languagechange event.

// const language = usePreferredLanguage()
// TASKS
// usePreferredLanguage should return the user's preferred language as a string
// usePreferredLanguage should listen for changes to the user's preferred language and update the return value accordingly
// usePreferredLanguage should unsubscribe from the languagechange event when the component that uses usePreferredLanguage is removed from the DOM
// usePreferredLanguage should throw an error if it's used on the server

// import usePreferredLanguage from "./usePreferredLanguage";

import * as React from "react";

// Because you're synchronizing your component with state that the browser is already controlling, you'll want to use React's useSyncExternalStore hook to implement usePreferredLanguage.

//you'll just pass subscribe's callback function as the second argument to addEventListener.
const subscribe = (cb) => {
    window.addEventListener("languagechange", cb);
    return () => window.removeEventListener("languagechange", cb);
};

// What you return from getSnapshot will be what the user receives when they invoke usePreferredLanguage. This, of course, should be the user's preferred language which we can get via navigator.language.
const getSnapshot = () => {
    return navigator.language;
};

//To ensure that usePreferredLanguage is only used on the client (where navigator exists), you'll want to throw an error in getServerSnapshot. This isn't necessary, but it does provide a better UX than leaving it out.
const getServerSnapshot = () => {
    throw Error("usePreferredLanguage is a client-only hook");
};

//export default
function usePreferredLanguage() {
    return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export default function App() {
    const language = usePreferredLanguage();

    return (
        <section>
            <h1>usePreferredLanguage</h1>
            <p>
                You can change your preferred language here -
                chrome://settings/languages
            </p>
            <h2>
                The correct date format for <pre>{language}</pre> is{" "}
                <time>{new Date(Date.now()).toLocaleDateString(language)}</time>
            </h2>
        </section>
    );
}