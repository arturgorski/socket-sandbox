import React, { Component } from 'react';

import styles from './App.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Col, Container, Form, FormGroup, Input, Navbar, NavbarBrand, Row } from 'reactstrap';

import io from 'socket.io-client';


// socket.on('dupa', function (data) {
//     console.log(data);
//     // socket.emit('my other event', { my: 'data' });
// });

class App extends Component {
    connect = () => {
        this.userId = this.userIdField.current.value;
        if (this.socket) {
            this.socket.close();
        }
        this.socket = io('http://localhost', {
            query: {
                userId: this.userId
            },
            transports: ['websocket'],
        });

        this.socket.on('connect', () => {
            console.log('>>> Connected to socket server');
        });

        this.socket.on('warmUp', (data) => {
            console.log('>> New warm up message: ', data);
        });

        this.socket.on('question', (data) => {
            console.log('>> New warm up message: ', data);
        });
    };

    join = () => {
        this.socket.emit('join', {userId: this.userId});
    };

    emit = () => {
        this.socket.emit('message', 'hello friends!');
    };

    constructor(props) {
        super(props);
        this.userIdField = React.createRef();
        this.userId = undefined;
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">Socket playground</NavbarBrand>
                </Navbar>
                <Container>
                    <Row>
                        <Col>
                            <div className={styles.main}>
                                <Form>
                                    <FormGroup>
                                        <Input type="text" name="userId" id="userIdField"
                                               innerRef={this.userIdField} bsSize="lg"/>
                                    </FormGroup>
                                    <Button size="lg" onClick={this.connect} block>Connect</Button>
                                    <Button size="lg" onClick={this.join} block>Join</Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default App;
