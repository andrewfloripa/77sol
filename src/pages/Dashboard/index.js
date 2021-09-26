import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';


import Header from '../../components/Header';

export default class Dashboard extends Component {
    
    constructor() {
        super();
        this.state = {
            user: {},
            orcamento: "",
        }
    
    }

    componentDidMount() {
        const token = localStorage.getItem('token');        
        fetch('http://localhost:8000/api/me', { headers: new Headers({ 'Authorization': `Bearer ${token}` })})
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Oops! Ocorreu um erro. :(");

        })
        .then(user => this.setState({ user }))
        .catch(e => console.log(e));
    }

    simulation = () => {
        const token = localStorage.getItem('token');  
        const data = { cep: this.cep, accountValue: this.accountValue, structure: this.structure};
        const requestInfo = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,                          
            }),
        };

        fetch('http://localhost:8000/api/budget', requestInfo)
        .then(response => {
            if(response.ok) {                  
                response.json().then(data => {
                    this.state.orcamento = data;
                    //return orcamento;
                    //localStorage.setItem("data",  JSON.stringify(data));
                    //this.props.history.push("/simulation");
                    
                });    
            }
            throw new Error("Erro na simulação...");
            this.props.history.push("/");
        })    
        .catch(e => {
            this.setState({ message: e.message });
        }); 
    }

    render() {
        if (this.state.orcamento == ""){
            
            return (
                <div>
                    <Header/>
                
                    <center><img src="https://www.77sol.com.br/static/media/77LOGO0-0AZULV1.88b58f56.png" width="130px"/></center>
                    <hr className="my-3" />
                    <p>
                        Olá <b>{this.state.user.name}</b>                   
                    </p>
                    <p><i>Quer entender quanto pode economizar com o sol?</i></p>
                    
                    <div>              
                        <Form>
                            <FormGroup>
                                <Label for="email">1. Qual o seu CEP?</Label>
                                <Input type="number" id="cep" onChange={e => this.cep = e.target.value} placeholder="99999-999" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="valor">2. Quanto você gasta com a sua conta de luz?</Label>
                                <Input type="number" id="accountValue" onChange={e => this.accountValue = e.target.value} placeholder="Informe o valor" />
                            </FormGroup>   
                            <FormGroup>
                                <Label for="select">3. Qual é o tipo do seu telhado?</Label>
                                    <Input type="select" name="structure" id="select" onChange={e => this.structure = e.target.value}>
                                        <option value="">Selecione</option>
                                        <option value="fibrocimento-madeira">Fibrocimeto (Madeira)</option>
                                        <option value="fibrocimento-metalico">Fibrocimeto (Metálico)</option>
                                        <option value="ceramica">Cerâmica</option>
                                        <option value="metalico">Metálico</option>
                                        <option value="metalico">Lage</option>
                                        <option value="metalico">Solo</option>
                                    </Input>
                            </FormGroup>    

                            <Button color="primary" block onClick={this.simulation}> Simular </Button>                      
                            <Link to="logout">
                                <Button color="light" block> Sair </Button>
                            </Link>
                        </Form>
                    </div>
                </div>
            );
        }else{
            return (
                <div>
                    <Header/>
                   
                    <center><img src="https://www.77sol.com.br/static/media/77LOGO0-0AZULV1.88b58f56.png" width="130px"/></center>
                    <hr className="my-3" />
                    
                    <p>
                        Olá <b>{this.state.user.name}</b>                   
                    </p>
                    <p><h5><i>Veja o que podemos fazer por você:</i></h5></p>
                    
                    <div>
                         
                    <Input type="select" name="parcelas" id="select">                        
                        <option value="parcela-1">
                        {   this.state.orcamento.parcelamento[0].parcelas} 
                            x de R$ {this.state.orcamento.parcelamento[0].valor_minimo.toFixed(2)} 
                            &nbsp; a R$ {this.state.orcamento.parcelamento[0].valor_maximo.toFixed(2)
                        }
                        </option>
                        <option value="parcela-2">
                        {   this.state.orcamento.parcelamento[1].parcelas} 
                            x de R$ {this.state.orcamento.parcelamento[1].valor_minimo.toFixed(2)} 
                            &nbsp; a R$ {this.state.orcamento.parcelamento[1].valor_maximo.toFixed(2)
                        }
                        </option>
                        <option value="parcela-3">
                        {   
                            this.state.orcamento.parcelamento[2].parcelas} 
                            x de R$ {this.state.orcamento.parcelamento[2].valor_minimo.toFixed(2)} 
                            &nbsp; a R$ {this.state.orcamento.parcelamento[2].valor_maximo.toFixed(2)
                        }
                        </option>
                        <option value="parcela-4">
                        {   
                            this.state.orcamento.parcelamento[3].parcelas} 
                            x de R$ {this.state.orcamento.parcelamento[3].valor_minimo.toFixed(2)} 
                            &nbsp; a R$ {this.state.orcamento.parcelamento[3].valor_maximo.toFixed(2)
                        }
                        </option>
                        <option value="parcela-5">
                        {   
                            this.state.orcamento.parcelamento[4].parcelas} 
                            x de R$ {this.state.orcamento.parcelamento[4].valor_minimo.toFixed(2)} 
                            &nbsp; a R$ {this.state.orcamento.parcelamento[4].valor_maximo.toFixed(2)
                        }
                        </option>                        
                    </Input>                  
                    <br/>
                    <p>
                        {this.state.orcamento.integradores_regiao} empresas parceiras perto de você! 
                        &nbsp; São {this.state.orcamento.integradores_maximo} empresas parceiras na sua região!
                    </p>
                    
                    <p>
                        Você pode economizar até R$ {this.state.orcamento.economia.toFixed(2)}
                        &nbsp; em 25 anos de economia, de acordo com a garantia de geração dos equipamentos solares!
                    </p>

                    <p>
                        O seu potencial solar é <b>{this.state.orcamento.potencial}!</b>
                        &nbsp; Você pode gerar {this.state.orcamento.irradiancia/1000}&nbsp; kWh/m2 no seu CEP! O melhor CEP do Brasil gera 6 kWh/m2!
                    </p>
    
                        <Button color="success" block> Gostei, quero avançar! </Button>
                        <Link to="admin">
                            {this.state.orcamento =""}
                            <Button color="light" block> Retornar </Button>
                        </Link>
                    </div>
                </div>
            );
        }       
    }
}