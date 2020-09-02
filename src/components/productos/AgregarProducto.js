import React, { useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
//el {} es para que nuestro componente agregarproducto pueda acceder a la propiedad history, para poder redireccionar a otra pag luego de a;adir un elemento. Acordarnos que tbn lo tenemos que agregar en el export

const AgregarProducto = (props) => {
    const [nombreProducto, setNombreProducto] = useState("");
    const [precioProducto, setPrecioProducto] = useState("");
    const [categoria, setCategoria] = useState("");
    const [error, setError] = useState(false);


    //funciones
    const seleccionarCategoria = (e) => {
        setCategoria(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //siempre debemos validar los datos
        if (nombreProducto.trim() === "" || precioProducto.trim() === "" || categoria === "") {
            //mostrar un cartel de error
            setError(true);
            return;
        }
        setError(false);
        //enviar el producto nuevo a la api

        //construir un objeto con los datos a enviar a la API
        //objeto cualquiera
        const datos = {
            nombreProducto, //nombreProducto: nombreProducto,
            precioProducto,
            categoria
        }
        //id lo crea json server
        //nombreProducto: nombreProducto,
        //izq> nombre de la propiedad, derecha: nombre del state
        //se llaman igual porque podemos ponerlo una sola vez y ya esta bien

        try {
            const cabecera = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            };
            //operacion get es solo con el fetch con un solo parametro *en la mayoria de los casos, pero para modificar agregar y etc necesitamos otro parametro mas (que es un objeto, lo podemos poner directamente ahi dentro de los parentesis, o lo guardamos dentro de una const)
            //este objeto ya esta definido, podemos encotnrarlo en developer mozilla
            const resultado = await fetch("http://localhost:4000/cafeteria", cabecera);
            console.log(resultado); //status 201 es que se agrego efectivamente el producto

            //si la operacion fue exitosa
            if (resultado.status === 201) {
                Swal.fire(
                    'Producto agregado!',
                    'El producto ha sido agregado correctamente',
                    'success'
                );
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrio un error, intentelo nuevamente'
                  });
            }

            //actualizar lista de productos
            props.setRecargarProductos(true);
            //redireccionar a lista de productos
            props.history.push("/productos");
            
        } catch (error) {
            console.log(error);

        }

    }

    return (
        <div className="container">
            <h1 className="text-center my-4">Agregar Producto</h1>
            <Form onSubmit={handleSubmit}>
                {(error) ?
                    (<Alert variant={"warning"}>
                        Todos los campos son obligatorios!
                    </Alert>)
                    : null}
                <Form.Group>
                    <Form.Label>Nombre de producto *</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ej: Cafe con leche"
                        name="nombre"
                        onChange={(e) => setNombreProducto(e.target.value)} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control type="text" placeholder="Ej: $150"
                        name="precio"
                        onChange={(e) => setPrecioProducto(e.target.value)} />
                </Form.Group>

                <h2 className="text-center my-5">Categoria</h2>

                <Form.Group className="container d-flex justify-content-around">
                    <Form.Check inline type="radio" label="Bebida caliente" name="opcionesDeRadio" value="bebida-caliente" onChange={seleccionarCategoria} />
                    <Form.Check inline type="radio" label="Bebida fria" name="opcionesDeRadio" value="bebida-fria" onChange={seleccionarCategoria} />
                    <Form.Check inline type="radio" label="Sandwich" name="opcionesDeRadio" value="sandwich" onChange={seleccionarCategoria} />
                    <Form.Check inline type="radio" label="Dulce" name="opcionesDeRadio" value="dulce" onChange={seleccionarCategoria} />
                    <Form.Check inline type="radio" label="Salado" name="opcionesDeRadio" value="salado" onChange={seleccionarCategoria} />
                </Form.Group>
                <div className="text-center">
                    <Button className="w-75 my-3" type="submit">Agregar producto</Button>
                </div>
            </Form>

        </div>
    );
};

export default withRouter(AgregarProducto);