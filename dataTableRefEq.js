// Given an application that already has the completed JSX and event handlers for deciding how you should filter and sort the data (searchTerm, sortColumn, and sortOrder), your job is to fetch the data (using the fetchData function), and then, in the most performant way possible, using searchTerm, sortColumn, and sortOrder, update the filteredData and sortedData variables.

// filteredData should be a memoized array of data that has been filtered based on the searchTerm.

// sortedData should be a memoized array of filteredData that has been sorted based on the sortColumn and sortOrder.

// TASKS
// The user can search Pokémon
// The user can sort Pokémon
// The Pokémon data is correctly memoized

import * as React from "react";
import { fetchData } from "./utils";

export default function DataTable() {
    const [data, setData] = React.useState([]);
    const [isRTL, setIsRTL] = React.useState(false);
    const [searchTerm, setSearchTerm] = React.useState("");
    const [sortColumn, setSortColumn] = React.useState("id");
    const [sortOrder, setSortOrder] = React.useState("asc");

    const handleHeaderClick = (column) => {
        if (column === sortColumn) {
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(column);
            setSortOrder("asc");
        }
    };
    
    // a useEffect is added to fetch the data using the function that we are importing at the beginning.
    React.useEffect(() => {
        const handleFetchData = async () => {
            const data = await fetchData();
            setData(data);
        };
    
        handleFetchData();
    }, []);

    const handleToggleClick = () => {
        setIsRTL((prev) => !prev);
    };

    // Now we need to filter the data based on the match term. Then we add useMemo hook so that it isn't recalculated on every render
    const filteredData = React.useMemo(()=>{
        return data
            .map((row)=>{
                if (
                    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    String(row.id).includes(searchTerm) ||
                    String(row.weight).includes(searchTerm)
                    ) {
                    return row;
                }
                return null;
            // .filter(Boolean): simple way to remove falsy values from an array.
            }). filter(Boolean)
        }, [data, searchTerm])

    // Then we need to sort the filtered data, again using useMemo to prevent needless calculations.
    const sortedData = React.useMemo(()=>{
        return filteredData.toSorted((a,b)=>{
            let aValue = a[sortColumn]
            let bValue = b[sortColumn]
            
            if (sortOrder === "asc") {
                return aValue > bValue ? 1: -1;
            } else {
                return aValue < bValue ? 1: -1;
            }
        })
    }, [filteredData, sortColumn, sortOrder])

    return (
        <div></div>
        //<JSX data here>
    )
}