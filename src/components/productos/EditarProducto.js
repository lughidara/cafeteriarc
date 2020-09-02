import React from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const EditarProducto = () => {
    return (
        <div className="container">
            <h1 className="text-center my-4">Editar Producto</h1>
            <Form>
                <Form.Group>
                    <Form.Label>Nombre de producto *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ej: Cafe con leche"
                        name="nombre"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control type="text" placeholder="Ej: $150"
                        name="precio"
                    />
                </Form.Group>

                <h2 className="text-center my-5">Categoria</h2>

                <Form.Group className="container d-flex justify-content-around">
                    <Form.Check inline type="radio" label="Bebida caliente" name="opcionesDeRadio" value="bebida-caliente"/>
                    <Form.Check inline type="radio" label="Bebida fria" name="opcionesDeRadio" value="bebida-fria"/>
                    <Form.Check inline type="radio" label="Sandwich" name="opcionesDeRadio" value="sandwich"/>
                    <Form.Check inline type="radio" label="Dulce" name="opcionesDeRadio" value="dulce"/>
                    <Form.Check inline type="radio" label="Salado" name="opcionesDeRadio" value="salado"/>
                </Form.Group>
                <div className="text-center">
                    <Button className="w-75 my-3" type="submit">Editar producto</Button>
                </div>
            </Form>

        </div>
    );
};

export default EditarProducto;