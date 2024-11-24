import React, {forwardRef, Fragment, useEffect, useRef, useState} from "react";
import {
    useTable,
    useExpanded,
    useFilters,
    useSortBy,
    usePagination,
    useBlockLayout
} from "react-table";
import {DefaultColumnFilter, Filter} from "./filters";
import {Col, Form, Row, Button } from "react-bootstrap";
import Select from "react-select";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { FaArrowUpWideShort } from "react-icons/fa6";
import { FaAngleRight, FaAnglesRight, FaAnglesLeft, FaAngleLeft } from "react-icons/fa6";
import {LuSettings2} from "react-icons/lu";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
        <div className="cb action">
            <label>
                <input type="checkbox" ref={resolvedRef} {...rest} />
                <span>All</span>
            </label>
        </div>
    );
});

const ReactTableB = ({ columns, data, className, renderRowSubComponent, onUpdate, onAction, isComingSub = false, subData, subOnUpdate, employees }) => {
    console.log("data**", data)
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        // rows,
        page,
        prepareRow,
        visibleColumns,
        useResizeColumns,
        // for 'usePagination' hook
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        //
        rows,
        footerGroups,
        //
        state: { pageIndex, pageSize },
        allColumns,
        getToggleHideAllColumnsProps
    } = useTable({
            columns,
            data,
            defaultColumn: {Filter: DefaultColumnFilter},
            initialState: { pageIndex: 0,
                pageSize: 10,
                visibleColumns: columns,
                hiddenColumns: columns
                    .filter(col => col.show == false)
                    .map(col => col.accessor),
            }
        },
        useFilters,
        useSortBy,
        useExpanded,
        usePagination,
        useBlockLayout, // Use the block layout
    )

    /*useEffect(() => {
        if (isComingSub){
            setPageSize(Number(data.length))
        }
    }, [isComingSub]);*/

    const getTotal = (columnId) => {
        return rows.reduce((sum, row) => {
            const value = row.values[columnId];
            return sum + (typeof value == 'number' ? value : 0);
        }, 0);
    };

    const hasCalculateTotal = columns.some(column => column.calculateTotal);

    const generateSortingIndicator = column => {
        return column.isSorted ? (column.isSortedDesc ? <FaArrowDownWideShort className={"filtreIconDownUp"}/> : <FaArrowUpWideShort className={"filtreIconDownUp"}/>) : ""
    }

    const onChangeInSelect = event => {
        setPageSize(Number(event.value))
    }

    const onChangeInInput = event => {
        const page = event.target.value ? Number(event.target.value) - 1 : 0
        gotoPage(page)
    }

    const handleRowClick = (row) => {
        onUpdate(row.original)
    };

    const rowActionClick = (row) => {
        onAction(row.original)
    };
    const toggleOptions = () => {
        var options = document.querySelector('.select-container .options');
        options.style.display = options.style.display != 'block' ? 'block' : 'none';
    }
    const pageSizeOptions = [
        {value: 10, label: 10 + " Satır"},
        {value: 20, label: 20 + " Satır"},
        {value: 30, label: 30 + " Satır"},
        {value: 40, label: 40 + " Satır"},
        {value: 50, label: 50 + " Satır"}
    ]
    const customStyles = {
        menu: (provided) => ({
            ...provided,
            zIndex: 9999,
            fontSize: 13,
            borderRadius: "none"
        }),
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    };
    return (
        <Fragment>
            <div className={className}>
                {/* Table Start */}
                <div className={"reactTableMain"}
                     style={{maxWidth: "1080px", overflowX: "auto", height: "60vh"}}>
                    <table {...getTableProps()}>
                        {!isComingSub && <thead>
                        {headerGroups?.map((headerGroup, headerGroupIndex) => (
                            <tr style={{height: "50px"}} key={headerGroupIndex} {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, columnIndex) => (
                                    <th key={columnIndex} {...column.getHeaderProps({
                                        style: {minWidth: column.minWidth, width: column.width}
                                    })}>
                                        <div {...column.getSortByToggleProps()} className={"headerName"}>
                                            {column.render("Header")}
                                            {generateSortingIndicator(column)}
                                        </div>
                                        <Filter column={column}/>
                                    </th>
                                ))}
                            </tr>
                        ))}
                        </thead>}

                        {page.length > 0 ? <tbody {...getTableBodyProps()} className={"reactTableBody"}
                                                  style={{maxHeight: window.innerWidth <= 768 ? "32vh" : "50vh"}}>
                            {/*{rows.map(row => {*/}
                            {page.map((row, rowIndex) => {
                                prepareRow(row)
                                return (
                                    <Fragment key={row.getRowProps().key}>
                                        <tr className={"reactTableBodyTr"} key={rowIndex}
                                            style={{boxShadow: "1px -1px 2px 1px rgb(0, 0, 0, var(--bg-op))", height: "20px"}}>
                                            {row.cells.map((cell, cellIndex) => {
                                                // console.log("cell.column.width:", cell.column.width)
                                                const columnWidth = cell.column.width;
                                                // const maxChar = Math.floor((columnWidth * 11)/100)
                                                const maxChar = 100;

                                                const isLongText = cell.column.Header != "Durum" && typeof cell.value == "string" && cell.value.length > maxChar;
                                                const displayText = isLongText ? cell.value.slice(0, maxChar) + "..." : cell.value;
                                                // console.log("displayText:", displayText, rowIndex, cell.render("Cell"))
                                                return <td
                                                    onClick={() => {
                                                        if (cell.column.updateModal != false) {
                                                            handleRowClick(row)
                                                        }
                                                        if (cell.column.actionModal) {
                                                            rowActionClick(row)
                                                        }
                                                    }}
                                                    {...cell.getCellProps()}
                                                    key={cellIndex}
                                                    className={isLongText ? ' tooltipR ' : ''}
                                                >

                                                    {isLongText ? displayText : cell.render("Cell")}
                                                    {isLongText && <span
                                                        className={rowIndex == 0 ? "tooltiptext first-tooltip" : "tooltiptext"}>
                                                    {cell.value}</span>}
                                                </td>;

                                            })}
                                        </tr>
                                        {/*{row.isExpanded && (
                                            <tr>
                                                <td style={{display: "flex"}}
                                                    colSpan={visibleColumns.length}>{renderRowSubComponent(row, subData, subOnUpdate, employees)}</td>
                                            </tr>
                                        )}*/}
                                    </Fragment>
                                )
                            })}
                            </tbody> :
                            // <div className={"noRecords"}>Kayıt bulunamadı.</div>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className={"noRecords"}>Kayıt bulunamadı.</div>
                                    </td>
                                </tr>
                            </tbody>
                        }
                        {hasCalculateTotal &&
                            <tfoot style={{display: window.innerWidth <= 768 && "flex"}}>
                            {footerGroups.map(footerGroup => (
                                <tr {...footerGroup.getFooterGroupProps()} style={{
                                    display: "flex",
                                    alignItems: "center",
                                    height: "35px",
                                    borderTop: "1px solid #dee2e6",
                                    borderBottom: "1px solid #dee2e6"
                                }}>
                                    {footerGroup.headers.map(column => (
                                        <td {...column.getFooterProps()} style={{
                                            padding: "0 5px",
                                            width: column.width,
                                            fontWeight: 500,
                                            borderLeft: "1px solid #dee2e6"
                                        }}>
                                            {column.calculateTotal
                                                ? <span style={{color: "#0a58ca", fontWeight: 500, fontSize: "14px"}}>
                                                    {getTotal(column.id)}</span>
                                                : <span style={{fontSize: "13px"}}>{column.id == "expander" ? "Toplam: " : null}</span>}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                            </tfoot>}
                    </table>
                </div>

                {!isComingSub && window.innerWidth <= 768 && <Row className="reactTableFooter align-items-center">
                    {/* Sol Butonlar */}
                    <Col md={2} sm={1} xs={1} className="d-flex justify-content-start">
                        <Button
                            variant="primary"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                            className="m-1"
                            style={{ fontSize: "15px" }}
                        >
                            <FaAnglesLeft />
                        </Button>
                    </Col>

                    {/* Orta Bölüm */}
                    <Col
                        md={8}
                        sm={6}
                        xs={6}
                        className="d-flex flex-wrap justify-content-center text-center"
                    >
                        <Col md={8} sm={12} xs={12} className="p-1">
                            <Select
                                value={pageSizeOptions.find((item) => item.value === pageSize)}
                                onChange={onChangeInSelect}
                                options={pageSizeOptions}
                                className="reactSelect"
                                menuPortalTarget={document.body}
                                styles={customStyles}
                            />
                        </Col>
                    </Col>

                    {/* Sağ Butonlar */}
                    <Col md={2} sm={2} xs={1} className="d-flex justify-content-end">
                        <Button
                            variant="primary"
                            onClick={nextPage}
                            disabled={!canNextPage}
                            className="m-1"
                            style={{ fontSize: "15px" }}
                        >
                            <FaAngleRight />
                        </Button>
                    </Col>
                </Row>}
            </div>
        </Fragment>
    )
}

export default ReactTableB;