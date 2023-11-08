// Complete the app so that the user can change their locale as well as iterate through every prime number. Take special care to only re-calculate the prime number when the user clicks NEXT PRIME.

// TASKS
// Increment the prime number count when the button is clicked
// Change the language when the select option is changed
// Memoize nthprime so that it's only re-calculated when count changes

import * as React from "react";
import { calculatePrime, translations, formatNumberToString } from "./utils";

export default function LocalizedPrimeNumbers() {
    // To increment prime and change the language, we need to set them as states.
    const [count, setCount] = React.useState(1);
    const [locale, setLocale] = React.useState("en-US");

    // handleClick changes the count by 1, so it needs set Count
    const handleClick = () => setCount(count + 1);
    // handle locale change is changed when the value is different in the click event. 
    const handleLocaleChange = (e) => setLocale(e.target.value);

    // here is where we add the memoization. We need to control this calculation to only happen when count changes.
    //much like use Effect, we add the function into the useMemo hook, and add count as a dependency.
    const nthprime = React.useMemo(()=> {
        return  calculatePrime(count);
    }, [count]);

    return (
        <div>
            <header>
                <select value={locale} onChange={handleLocaleChange}>
                    <option value="en-US">English (US)</option>
                    <option value="es-ES">Español (ES)</option>
                </select>

                <button className="primary" onClick={handleClick}>
                    {translations[locale].nextPrime}    
                </button>
            </header>
            <p>
                {translations[locale].nthPrime(
                formatNumberToString(count, locale),
                nthprime
                )}
            </p>
        </div>
    );
}