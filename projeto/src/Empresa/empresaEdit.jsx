import React from 'react';
import {Container as Grid, Card, CardTitle, CardBody, Col, Row, Form, FormGroup,
Label,Input, Button} from 'reactstrap'
import 'whatwg-fetch';
import $ from 'jquery';


export default class EmpresaEdit extends React.Component{
    constructor(){
        super();
        this.state = {
            id:localStorage.getItem('editId'),
        }
        this.submit = this.submit.bind(this);
        this.loadData = this.loadData.bind(this);
    }

    componentDidMount(){
        this.loadData();
    }

    loadData(){
        fetch(`/api/empresas/${this.state.id}`,{
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('token'),
            },
        }).then(response=>{
            return response.json();
        }).then(data=>{
            $('#nome').val(data.nome);
            $('#cnpj').val(data.cnpj);
            $('#email').val(data.email);
            $('#rua').val(data.address.rua);
            $('#bairro').val(data.address.bairro);
            $('#cep').val(data.address.cep);
            $('#complemento').val(data.address.complemento);
        }).catch(err=>{
            console.log(err);
        })
    }

    submit(e){
        e.preventDefault();
        fetch(`/api/empresas/${this.state.id}`,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({
                'nome':$('#nome').val(),
                'cnpj':$('#cnpj').val(),
                'email':$('#email').val(),
                'address':{
                    'rua':$('#rua').val(),
                    'bairro':$('#bairro').val(),
                    'cep':$('#cep').val(),
                    'complemento':$('#complemento').val(),
                },
            }),
        }).then(response=>{
            return response.json();
        }).then(data=>{
            alert(data.message.toUpperCase());
        }).catch(err=>{
            console.log(err);
        })
    }

    render(){
        const textCenter = {textAlign:"center"};
        return(
            <Grid style={{marginTop:"4.25%", marginBottom:"4.25%"}} >
                <Row>
                    <Col lg={8} md={10} sm={12} className="offset-lg-2 offset-md-1">
                        <Card>
                            <CardBody>
                                <Form>
                                    <legend style={textCenter}>Edição de Empresa</legend>
                                    <Row>
                                        <Col lg={6} sm={12}>
                                            <FormGroup>
                                                <Label for="nome">Nome</Label>
                                                <Input id="nome"></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} sm={12} xs={12}>
                                            <FormGroup>
                                                <Label for="cnpj">CNPJ</Label>
                                                <Input id="cnpj"></Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input id="email"></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6}>
                                            <FormGroup>
                                                <Label for="bairro">Bairro</Label>
                                                <Input id="bairro"></Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col lg={3} sm={12} xs={12}>
                                            <FormGroup>
                                                <Label for="cep">CEP</Label>
                                                <Input id="cep"></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={6} sm={12} xs={12}>
                                            <FormGroup>
                                                <Label for="rua">Rua</Label>
                                                <Input id="rua"></Input>
                                            </FormGroup>
                                        </Col>
                                        <Col lg={3} sm={12} xs={12}>
                                            <FormGroup>
                                                <Label for="complemento">Complemento</Label>
                                                <Input id="complemento"></Input>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Button type="submit" color="primary" className="btn-block m-t-md" onClick={this.submit}>
                                        Cadastrar
                                    </Button>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Grid>          
        );
    }
}