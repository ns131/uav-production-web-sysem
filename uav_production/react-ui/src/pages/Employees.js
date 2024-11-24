import React, {useContext, useEffect, useMemo, useState} from 'react';
// import AuthContext from '../context/AuthContext';
import ReactTableB from "../components/ReactTable/ReactTableB";
import { Button, Row, Col, Container } from "react-bootstrap";
import {SelectColumnFilter} from "../components/ReactTable/filters";
import { TiPlus } from "react-icons/ti";
import {apiGet} from "../api/Api";

function Employees() {
    // const { authTokens, logoutUser } = useContext(AuthContext);
    const [showAddUser, setShowAddUser] = useState(false);
    const [employees, setEmployees] = useState([])
    // employeeId'yi silmek için fetch isteği
    /*const deleteEmployee = async (employeeId) => {
        try {
            const response = await fetch(`http://<sunucu_adresi>/api/employees/delete/${employeeId}/`, {
                method: 'DELETE',
                headers: {
                    // 'Authorization': `Bearer ${token}`,  // Authorization header (JWT token)
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 204) {
                console.log('Employee deleted successfully.');
                // Başarılı işlem sonrası yapılacak işlemler
            } else if (response.status === 404) {
                console.error('Employee not found.');
            } else {
                console.error('Failed to delete employee.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };*/
    useEffect(() => {
        getEmployees()
    }, []);

    const getEmployees = async () => {
        const response = await apiGet('employees/');
        if(response.status === 200){
            setEmployees(response)
            console.log(response)
        }
    };

    /*const getEmployeess = async() => {
        let response = await fetch('http://127.0.0.1:8000/api/employees', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization':'Bearer ' + String(authTokens.access)
            }
        })
        let data = await response.json()
        setEmployees(data)
        /!*if(response.status === 200){
            setEmployees(data)
            console.log(data)
        }*!/
    }*/

    const formatDate = (dateString) => {
        const [part1, part2, part3] = dateString?.split(/[-.]/);
        if (part1.length === 4) {
            return `${part3}.${part2}.${part1}`;
        }
        return `${part1}.${part2}.${part3}`;
    };

    const toggleAdded = () => {
        setShowAddUser(!showAddUser);
    }

    const columns = useMemo(
        () => [
            {
                Header: "Ad Soyad",
                accessor: "first_name",
                Cell: (cellProps) => {
                    return <div>{cellProps.row.original.first_name + " " + cellProps.row.original.last_name}</div>
                }
            },
            {
                Header: "Kullanıcı Adı",
                accessor: "username"
            },
            {
                Header: "Email",
                accessor: "email",
                width: 250
            },
            {
                Header: "Doğum Tarihi",
                accessor: "birth_date",
                Cell: (cellProps) => {
                    return <div>{formatDate(cellProps.row.original.birth_date)}</div>
                }
            },
            {
                Header: "İşe Başlama Tarihi",
                accessor: "hire_date",
                Cell: (cellProps) => {
                    return <div>{formatDate(cellProps.row.original.hire_date)}</div>
                }
            },
            {
                Header: "Takımı",
                accessor: "team",
                Filter: SelectColumnFilter,
                filter: 'equals',
                disableSortBy: true,
                width: 150,
                filterOptions: [
                    {value: 1, label: "Kanat Takımı"},
                    {value: 2, label: "Gövde Takımı"},
                    {value: 3, label: "Kuyruk Takımı"},
                    {value: 4, label: "Aviyonik Takımı"},
                    {value: 5, label: "Montaj Takımı"}
                ],
                Cell: (cellProps) => {
                    if (cellProps.row.original.team == 1) {
                        return "Kanat Takımı"
                    } else if(cellProps.row.original.team == 2) {
                        return "Gövde Takımı"
                    } else if(cellProps.row.original.team == 3){
                        return "Kuyruk Takımı"
                    } else if(cellProps.row.original.team == 4){
                        return "Aviyonik Takımı"
                    } else if(cellProps.row.original.team == 5){
                        return "Montaj Takımı"
                    } else {
                        return "-"
                    }
                }
            },
        ].filter(Boolean),
        [] // [yetki1,yetki2..] gibi
    )
    return (
        <div className="my-5">
            <Container>
                <Row className="mb-5">
                    <Col>
                        <div className="d-flex align-items-center">
                            <Button
                                variant="primary"
                                className="me-2 d-flex align-items-center"
                                onClick={toggleAdded}
                            >
                                <TiPlus className="me-1"/>
                                Personel Ekle
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="userList">
                            <ReactTableB
                                columns={columns}
                                data={employees}
                                className={"reactUI"}
                            />
                        </div>
                    </Col>
                </Row>
                {/*Add Employee Modal*/}
                {/*{showAddUser &&
                    <AddUser
                        isOpen={showAddUser}
                        onClose={toggleAdded}
                        item={selectedItem}
                        isRefresh={getUserList}
                    />
                }*/}
            </Container>
        </div>
    )
}

export default Employees;