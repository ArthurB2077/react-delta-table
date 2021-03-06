import React, { useEffect, useState } from "react"
import { DataTableHeaderCell } from "../DataTableHeaderCell"

interface SortData {
    index: number,
    order: "asc" | "desc"
}

interface HiddenColumns {
    value: string;
    index: number;
}

interface DataTableHeaderProps {
    content: Array<string>,
    hiddenColumns: Array<HiddenColumns>,
    changeSortOrder: Function,
    setSelectedColumnIndex: Function,
    dataOrder: any,
    selectedColumnIndex: number,
    theme: "light" | "dark",
}


export const DataTableHeader: React.FC<DataTableHeaderProps> = ({
    dataOrder,
    changeSortOrder,
    content,
    setSelectedColumnIndex,
    selectedColumnIndex,
    theme,
    hiddenColumns
}): JSX.Element => {
    // Index and order parameter of the column to sort
    const [sortParameter, setSortParameter] = useState<SortData>(dataOrder)

    useEffect(() => {
        changeSortOrder(sortParameter)
    }, [sortParameter, changeSortOrder])

    return (
        <thead className="data-table-header">
            <tr className="data-table-row">
                {content.map((item, index) => {
                    if(!hiddenColumns.map(hc => hc.value).includes(item)) {
                        return (
                            <DataTableHeaderCell
                                key={`${item}-${index}`}
                                indexOfTheCell={index}
                                contentOfTheCell={item}
                                changeSortOrder={setSortParameter}
                                setSelectedColumnIndex={setSelectedColumnIndex}
                                selectedColumnIndex={selectedColumnIndex}
                                theme={theme}
                            />
                        )
                    } else {
                        return null
                    }
                })}
            </tr>
        </thead>
    )
}