import React, {useEffect, useMemo, useState} from 'react';
import { Button, Row, Col, Container } from "react-bootstrap";
import ReactTableB from "../components/ReactTable/ReactTableB";
import { TiPlus } from "react-icons/ti";
function Parts() {
    const [data, setData] = useState(
        [
            {
                "name": "Kanat",
                "description": "IHA'lar için kanat parçası"
            },
            {
                "name": "Gövde",
                "description": "IHA'lar için gövde parçası"
            },
            {
                "name": "Kuyruk",
                "description": "IHA'lar için kuyruk parçası"
            },
            {
                "name": "Aviyonik",
                "description": "IHA'lar için aviyonik"
            }
        ]

    );

    const columns = useMemo(
        () => [
            /*{
                Header: "",
                id: 'expander',
                width: 50,
                updateModal: false,
                Cell: ({ row }) => (
                    <span {...row.getToggleRowExpandedProps()}>
                        {/!*row.isExpanded ? '👇' : '👉'*!/}
                        {row.isExpanded ? <RiArrowRightDownFill style={{color: "rgb(13 110 253 / 66%)"}}/> : <RiArrowRightFill style={{color: "rgb(13 110 253 / 66%)"}}/>}
                    </span>
                )
            },*/
            {
                Header: "Parça Adı",
                accessor: "name"
            },
            {
                Header: "Açıklama",
                accessor: "description",
                width: 500
            }
        ].filter(Boolean),
        []
    )

    useEffect(() => {

    }, []);

    const getUserList = () => {
        /*RequestApi({
            function: "getUsersList",
            userAll: "X"
        }, (response) => {
            if (response.message == "success") {
                setData(response.usersList);
                console.log("usersList****", response.usersList);
            }
        });*/
    }

    return (
        <div className="my-5">
            <Container>
                <Row>
                    <Col>
                        <div className="userList">
                            <ReactTableB
                                columns={columns}
                                data={data}
                                //renderRowSubComponent={partsSubComponent}
                                className={"reactUI"}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Parts;
