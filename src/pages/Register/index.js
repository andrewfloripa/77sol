import React, { Component } from 'react';
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
            
        
    register = () => {
        
        const data = { name: this.name, email: this.email, password: this.password, password_confirmation: this.password_confirmation};
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',                          
            }),
        };

        fetch('http://localhost:8000/api/register', requestInfo)
        .then(response => {
            if(response.ok) {
                this.props.history.push("/");
                return response.json()

                
            }
            throw new Error("Dados informados inválidos...");
        })    
        .catch(e => {
            this.setState({ message: e.message });
        }); 
    }

    render() {
        return (
            <div className="col-md-6">
                <header>
                        <img src="https://www.77sol.com.br/static/media/77LOGO0-0AZULV1.88b58f56.png" width="100px"/>                       
                </header>
                <hr  className="my-3"/>
                {
                    this.state.message !== ''? (
                        <Alert color="danger" className="text-center"> {this.state.message} </Alert>
                    ) : ''
                }
                <Form>
                    <FormGroup>
                        <Label for="nome">Nome</Label>
                        <Input type="text" id="name" onChange={e => this.name = e.target.value} placeholder="Informe seu nome" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" id="email" onChange={e => this.email = e.target.value} placeholder="Informe seu e-mail" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password">Senha</Label>
                        <Input type="password" id="password" onChange={e => this.password = e.target.value} placeholder="Informe a senha" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password_confirmation">Confirme a senha</Label>
                        <Input type="password" id="password_confirmation" onChange={e => this.password_confirmation = e.target.value} placeholder="Confirme a senha" />
                    </FormGroup>                    
                    <Button color="primary" block onClick={this.register}> Registrar-se </Button>
                    <Link to="/">
                            <Button color="light" block> Voltar </Button>
                    </Link>
                </Form>
            </div>
        );
    }
}