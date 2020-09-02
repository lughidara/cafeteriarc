import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Button } from "react-bootstrap";
import Swal from 'sweetalert2'

const Producto = (props) => {
    const eliminarProducto = (id) => {
        //el id es el que pasamos por parametro en la funcion eliminarProducto
        //console.log(id);
        Swal.fire({
            title: 'Estas seguro?',
            text: "No podras recuperar el producto eliminado",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!',
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            if (result.value) {
                //aqui debemos eliminar el producto
                try {

                    const resultado = await fetch(`http://localhost:4000/cafeteria/${id}`, {
                        method: "DELETE",
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log(resultado);
                    if (resultado.status === 200) {
                        Swal.fire(
                            'Eliminado!',
                            'Tu producto ha sido eliminado',
                            'success'
                        );

                        props.setRecargarProductos(true);

                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Ocurrio un error, intentelo nuevamente'
                        });
                    }


                } catch (error) {
                    console.log(error)

                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrio un error, intentelo nuevamente'
                    });
                }
            }
        })
    }

    return (
        <ListGroup.Item className="d-flex justify-content-between">
            <p>{props.producto.nombreProducto}
                <span className="font-weight-bold"> ${props.producto.precioProducto}</span>
            </p>
            <div>
                <Button variant="primary" className="mr-1">Editar</Button>
                <Button variant="danger" type="button" onClick={() => eliminarProducto(props.producto.id)}>Eliminar</Button>
            </div>
        </ListGroup.Item>
    );
};

export default Producto;