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
            // this.socket.emit('setUserId', this.userIdField.current.value);

            this.socket.emit('answer', 'dupaa', function (responseData) {
                console.log('Callback called with data:', responseData);
            });

        });

        this.socket.on('message', (data, callback) => {
            console.log('>> New message: ', data);
            callback('ok');
        });
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
                                    <Button size="lg" onClick={this.connect} block>Submit</Button>
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
