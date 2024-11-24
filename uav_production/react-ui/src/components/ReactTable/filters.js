import React, {useEffect} from "react"
import { Input } from "reactstrap"
import Select from "react-select";

export const Filter = ({ column }) => {
    return (
        <div style={{ margin: "5px 0 10px" }}>
            {column.canFilter && column.render("Filter")}
        </div>
    )
}

export const DefaultColumnFilter = ({
                                        column: {
                                            filterValue,
                                            setFilter,
                                            preFilteredRows: { length },
                                        },
                                    }) => {
    useEffect(() => {
    }, [length]);
    return (
        <Input
            value={filterValue || ""}
            onChange={e => {
                setFilter(e.target.value || undefined)
            }}
            className={"reactInput"}
            placeholder={`Ara...`}
        />
    )
}

export const SelectColumnFilter = ({
                                        column: {
                                            filterOptions,
                                            filterValue,
                                            setFilter,
                                            preFilteredRows: { length },
                                        }
                                   }) => {
    return (
        <Select
            options={filterOptions}
            isClearable={true}
            value={ filterOptions.filter(item => item.value == filterValue) || ""}
            onChange={e => {
                setFilter(e ? e.value : undefined)
            }}
            className={"reactSelect"}
            // placeholder={`search (${length}) ...`}
            placeholder={`Ara...`}
        />
    )
}