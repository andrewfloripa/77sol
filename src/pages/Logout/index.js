import { Component } from 'react';

export default class Logout extends Component {

    componentWillMount() {
        
        const token = localStorage.getItem('token'); 
        fetch('http://localhost:8000/api/logout', { headers: new Headers({ 'Authorization': `Bearer ${token}` })})
        .then(response => {
            if(response.ok) {
                return response.json();
            }
            throw new Error("Oops! Ocorreu um erro de logout. :(");

        })
        .then(user => this.setState({ user }))
        .catch(e => console.log(e));

        localStorage.removeItem('token');
        this.props.history.push('/');
    }

    render() {
        return null;
    }
}