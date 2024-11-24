import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
// import { apiPost } from '../api/Api';
import AuthContext from '../context/AuthContext'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    // const [success, setSuccess] = useState('');

    let {loginUser} = useContext(AuthContext)

    /*const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const data = { email, password };
            const response = await apiPost('login/', data);
            setSuccess('Giriş başarılı!');
            console.log('Token:', response.token); // Backend'den dönen token
        } catch (err) {
            setError('Giriş başarısız. Bilgilerinizi kontrol edin.');
        }
    };*/

    return (
        <div
            style={{
                background: 'linear-gradient(45deg, #0B0C10 50%, #4682B4 50%)',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col md={6} lg={4}>
                        <Card className="shadow-lg">
                            <Card.Body>
                                <h3 className="text-center mb-4" style={{ color: '#04050a' }}>
                                    Üretim ve Montaj Takip Sistemi
                                </h3>
                                {/*{error && <Alert variant="danger">{error}</Alert>}*/}
                                {/*{success && <Alert variant="success">{success}</Alert>}*/}
                                {/*<Form onSubmit={handleLogin}>*/}
                                <Form onSubmit={loginUser}>
                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Kullanıcı Adı</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name={"username"}
                                            placeholder="Kullanıcı Adı Giriniz"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Şifre</Form.Label>
                                        <Form.Control
                                            type="password"
                                            name={"password"}
                                            placeholder="Şifre Giriniz"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        className="w-100"
                                        style={{
                                            backgroundColor: '#4facfe',
                                            borderColor: '#4facfe',
                                        }}
                                    >
                                        Giriş Yap
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;
