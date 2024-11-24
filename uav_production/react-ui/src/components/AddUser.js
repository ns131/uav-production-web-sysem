import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, {Fragment, useEffect, useState} from "react";
import {ErrorMessage, Field, Formik} from 'formik';
import {Col, Row} from "reactstrap";
import * as Yup from "yup";
import InputArea from "./InputArea";
//import {RequestApi} from "../../services/Api";
//import ResponseMessageModal from "../ResponseMessageModal";
import { LuPencilLine } from "react-icons/lu";

function AddUser({item, isOpen, onClose, isRefresh}){
    // Başlangıçta genel bilgiler formunu göstermek için "general" olarak tanımla
    const [showMessageModal, setShowMessageModal] = useState(false);
    const [modalMessageStatus, setModalMessageStatus] = useState("success");
    const [teams, setTeams] = useState([
        {value: 1, label: "Kanat Takımı"},
        {value: 2, label: "Gövde Takımı"},
        {value: 3, label: "Kuyruk Takımı"},
        {value: 4, label: "Aviyonik Takımı"},
        {value: 5, label: "Montaj Takımı"}
    ]);

    const initialValues = {
        name: item?.first_name ? item.first_name : "",
        lastName: item?.last_name ? item.last_name : "",
        email: item?.email ? item.email : "",
        userName: item?.user_name ? item.user_name : ""
    };
    // formik için validation şeması tanımlama
    const validationShcema = Yup.object().shape({
        name: Yup.string().required('İsim boş bırakılamaz'),
        lastName: Yup.string().required('Soyisim  boş bırakılamaz'),
        email: Yup.string().email('Geçersiz e-mail adresi').required('Email boş bırakılamaz'),
        userName: Yup.string().required('Kullanıcı adı boş bırakılamaz')
    })

    const toggle = () => {
        setShowMessageModal(!showMessageModal);
        onClose && onClose();
        isRefresh && isRefresh();
    }

    const insertNewUser = (values) => {

    };

    useEffect(() => {
        console.log("item*", item);
    }, []);


    return (
        <>
            <Modal show={isOpen} onHide={onClose} backdrop="static" keyboard={false} size="lg" className={"cSModal"}>
                <Modal.Header closeButton>
                    <div className="buttonArea">
                        <div
                            color="primary"
                            onClick={() => {
                            }}
                            className={"modalOpt cSActive"}
                        >
                            <LuPencilLine /> Genel Bilgiler
                        </div>
                    </div>
                </Modal.Header>
                <Modal.Body className="modalBody">
                    <div className="userAddForm">
                        <div className="userForm">
                                <Formik
                                    initialValues={initialValues}

                                    validationSchema={validationShcema}
                                    onSubmit={(values, { setSubmitting }) => {
                                        insertNewUser(values)
                                        console.log('Form submitted:', values);
                                        setSubmitting(false);
                                    }}
                                >
                                    {({handleSubmit, handleChange,
                                          values}) => (
                                        <form onSubmit={handleSubmit} id="addedForm" className={"addedForm"}>
                                            <Row>
                                                <Col md={6} sm="12" xs="12">
                                                    <InputArea
                                                        text={"Adı"} name={"name"} id="firstName" required
                                                        onChange={handleChange} defaultValue={values.first_name}
                                                    />
                                                    <ErrorMessage name="firstName" component="div" className={"errorMess"}/>
                                                </Col>
                                                <Col md={6} sm="12" xs="12">
                                                    <InputArea
                                                        text={"Soyadı"} name={"lastName"} id="lastName" required
                                                        onChange={handleChange} defaultValue={item?.last_name ? item.last_name : values.lastName}
                                                    />
                                                    <ErrorMessage name="lastName" component="div" className={"errorMess"}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} sm="12" xs="12">
                                                    <InputArea
                                                        text={"Kullanıcı Adı"} name={"userName"} id="userName" required
                                                        onChange={handleChange} defaultValue={item?.user_name ? item.user_name : values.userName}
                                                    />
                                                    <ErrorMessage name="userName" component="div" className={"errorMess"}/>
                                                </Col>
                                                <Col md={6} sm="12" xs="12">
                                                    <Field name="teamId" as="select" id="teamId" required
                                                           className={"formik-field-select"}>
                                                        {teams.map((row, index) => {
                                                            if (row.team_id == item.team_id) {
                                                                return <option key={index} value={row.value}
                                                                               selected>{row.label}</option>
                                                            }
                                                            return <option key={index}
                                                                           value={row.value}>{row.label}</option>
                                                        })}
                                                    </Field>
                                                    <ErrorMessage name="status" component="div" className={"errorMess"}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} sm="12" xs="12">
                                                    <InputArea
                                                        text={"E-mail"} name={"email"} id="email" required
                                                        onChange={handleChange} defaultValue={values.email}
                                                    />
                                                    <ErrorMessage name="email" component="div" className={"errorMess"}/>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md={6} sm="12" xs="12">
                                                    <InputArea
                                                        text={"İşe başlama tarihi"} type={"date"}
                                                        name={"startWorkDate"} id="startWorkDate" placeholder="G"
                                                        onChange={handleChange} defaultValue={values.startWorkDate}
                                                    />
                                                    <ErrorMessage name="startWorkDate" component="div"
                                                                  className={"errorMess"}/>
                                                </Col>
                                            </Row>
                                        </form>
                                    )}
                                </Formik>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div
                        color="primary"
                        onClick={onClose}
                        className={"cSPassive"}>
                        İPTAL
                    </div>
                    <Button
                        variant="primary"
                        type={"submit"}
                        form="addedForm">
                        KAYDET</Button>
                </Modal.Footer>
            </Modal>
            {/*<ResponseMessageModal
                isOpen={showMessageModal}
                onClose={toggle}
                status={modalMessageStatus}
            />*/}
        </>
    )
}

export default AddUser;