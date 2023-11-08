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

    const handleToggleClick = () => {
        setIsRTL((prev) => !prev);
    };

    const filteredData = [...data];

    const sortedData = [...filteredData];

    return (
        <div></div>
        //<JSX data here>
    )
}