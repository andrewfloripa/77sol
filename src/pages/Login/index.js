import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';

import Header from '../../components/Header';

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            message : this.props.location.state?this.props.location.state.message: '',
        };
    }

    signIn = () => {
        const data = { email: this.email, password: this.password };
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',               
            }),
        };

        fetch('http://localhost:8000/api/login', requestInfo)
        .then(response => {
            if(response.ok) {
                return response.json()
                
            }
            throw new Error("Login inválido...");
        })
        .then(token => {
            if (token.access_token){

                localStorage.setItem('token', token.access_token);
                this.props.history.push("/admin");
                return;
            }
            throw new Error("Login inválido...");
        })
        .catch(e => {
            this.setState({ message: e.message });
        }); 
    }

    register() {
        this.props.history.push("/register");
    }

    render() {
        return (
            <div className="col-md-6">
                <header>
                        <center><img src="https://www.77sol.com.br/static/media/77LOGO0-0AZULV1.88b58f56.png" width="130px"/></center>
                </header>
                <hr  className="my-3"/>
                {
                    this.state.message !== ''? (
                        <Alert color="danger" className="text-center"> {this.state.message} </Alert>
                    ) : ''
                }
                <Form>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" id="email" onChange={e => this.email = e.target.value} placeholder="Informe seu e-mail" required/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input type="password" id="password" onChange={e => this.password = e.target.value} placeholder="Informe a senha" required/>
                    </FormGroup>
                    <Button color="primary" block onClick={this.signIn}> Entrar </Button>
                    <Link to="register">
                            <Button color="light" block> Regristar-se </Button>
                    </Link>                    
                </Form>
            </div>
        );
    }
}