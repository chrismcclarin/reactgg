// Complete the app so that the user can change their locale as well as iterate through every prime number. Take special care to only re-calculate the prime number when the user clicks NEXT PRIME.

// TASKS
// Increment the prime number count when the button is clicked
// Change the language when the select option is changed
// Memoize nthprime so that it's only re-calculated when count changes

import * as React from "react";
import { calculatePrime, translations, formatNumberToString } from "./utils";

export default function LocalizedPrimeNumbers() {
    const count = 1;
    const locale = "en-US";

    const handleClick = () => {};
    const handleLocaleChange = () => {};

    const nthprime = calculatePrime(count);

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