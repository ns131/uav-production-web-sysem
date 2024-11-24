import React, {useEffect, useMemo, useState} from 'react';
import { Button, Row, Col, Container } from "react-bootstrap";
import ReactTableB from "../components/ReactTable/ReactTableB";
import { TiPlus } from "react-icons/ti";
function Teams() {

    let [employees, setEmployees] = useState([])
    const [data, setData] = useState(
        [
            {
                "name": "Kanat Takımı",
                "description": "IHA'lara kanat üretebilen takım"
            },
            {
                "name": "Gövde Takımı",
                "description": "IHA'lara gövde üretebilen takım"
            },
            {
                "name": "Kuyruk Takımı",
                "description": "IHA'lara kuyruk üretebilen takım"
            },
            {
                "name": "Aviyonik Takımı",
                "description": "IHA'lara aviyonik üretebilen takım"
            },
            {
                "name": "Montaj Takımı",
                "description": "Üretilen ürünleri biraraya getiren takım"
            }
        ]

    );

    const columns = useMemo(
        () => [
            {
                Header: "Takım Adı",
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
                                //renderRowSubComponent={teamsSubComponent}
                                className={"reactUI"}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Teams;
