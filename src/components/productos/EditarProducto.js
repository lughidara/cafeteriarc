import React, { useState, useRef } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

const EditarProducto = (props) => {
    const [error, setError] = useState(false);
    
    //variables de referencia
    const nombreProductoRef = useRef("");
    const precioProductoRef = useRef("");

    const [categoria, setCategoria] = useState("");

    //copiamos la funcion de agregar producto
    const seleccionarCategoria = (e) => {
        setCategoria(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //validar los campos del formulario
        const _categoria = (categoria === "") ? props.productoSeleccionado.categoria : categoria;
        //los parentesis no hacen falta, son para verlo mejor nomas 
        //console.log(_categoria);
        //console.log(nombreProductoRef.current.value);
        //console.log(precioProductoRef.current.value);

        if(nombreProductoRef.current.value.trim() === "" || precioProductoRef.current.value.trim() === "" || _categoria===""){
            //mostrar cartel de error
            setError(true);
            return;
        }

        setError(false);
            
        //preparar el objeto a enviar-
        const productoEditado = {
            "nombreProducto": nombreProductoRef.current.value,
            "precioProducto": precioProductoRef.current.value,
            "categoria": _categoria
        }

        //enviar los cambios a la API
        try{
            const respuesta = await fetch(`https://cafeteriarc.herokuapp.com/api/cafeteria/${props.productoSeleccionado._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(productoEditado)
            })

            //console.log(respuesta)
            //la url nos la da el de backend, o si usamos una api tenemos que leer la documentacion
            //si tenemos un error de sintaxis en algun fetch nos creara un objeto vacio

            //si la operacion fue exitosa
            if (respuesta.status === 200) {
                props.setRecargarProductos(true);
                Swal.fire(
                    'Producto cambiado!',
                    'El producto ha sido modificado correctamente',
                    'success'
                );
                //redireccionamos
                props.history.push("/productos");
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrio un error, intentelo nuevamente'
                });
            }

        }catch(error){
            console.log(error);
            Swal.fire(
                'Algo salio mal!',
                'Vuelve a intentarlo',
                'question'
            )
        }
    }

    return (
        <div className="container">
            <h1 className="text-center my-4">Editar Producto</h1>
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
                        ref={nombreProductoRef}
                        defaultValue={props.productoSeleccionado.nombreProducto}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Precio *</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Ej: 150"
                        name="precio"
                        ref={precioProductoRef}
                        defaultValue={props.productoSeleccionado.precioProducto}
                    />
                </Form.Group>

                <h2 className="text-center my-5">Categoria</h2>

                <Form.Group className="container d-flex justify-content-around">
                    <Form.Check inline type="radio" label="Bebida caliente" name="opcionesDeRadio" value="bebida-caliente" onChange={seleccionarCategoria} defaultChecked={props.productoSeleccionado.categoria === "bebida-caliente"}/>

                    <Form.Check inline type="radio" label="Bebida fria" name="opcionesDeRadio" value="bebida-fria" onChange={seleccionarCategoria} defaultChecked={props.productoSeleccionado.categoria === "bebida-fria"}/>

                    <Form.Check inline type="radio" label="Sandwich" name="opcionesDeRadio" value="sandwich" onChange={seleccionarCategoria} defaultChecked={props.productoSeleccionado.categoria === "sandwich"}/>

                    <Form.Check inline type="radio" label="Dulce" name="opcionesDeRadio" value="dulce" onChange={seleccionarCategoria} defaultChecked={props.productoSeleccionado.categoria === "dulce"}/>

                    <Form.Check inline type="radio" label="Salado" name="opcionesDeRadio" value="salado" onChange={seleccionarCategoria} defaultChecked={props.productoSeleccionado.categoria === "salado"}/>

                </Form.Group>
                <div className="text-center">
                    <Button className="w-75 my-3" type="submit">Editar producto</Button>
                </div>
            </Form>

        </div>
    );
};

export default withRouter(EditarProducto);