import React, { useState, useEffect } from 'react';
import './App.css';
import './bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Inicio from './components/principal/Inicio'
import EditarProducto from './components/productos/EditarProducto'
import AgregarProducto from './components/productos/AgregarProducto'
import ListaProductos from './components/productos/ListaProductos'
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Swal from 'sweetalert2';
import PaginaError from './components/error404/PaginaError';


//browserrouter es el nombre del enrutador, que se lo utiliza como router, y este elemetno me dara acceso a la parte de las rutas del navegador (host:3000/productos por ejemplo)
//el switch sirve para que en la lista de varias rutas que renderizan los distintos componentes, elije una y solo una por vez
//route sera la ruta. Se define una ruta para cada una de las partes del sitio. Nosotros lo creamos
//Link no lo usamos por ahora, por eso lo borramos


function App() {
  const [productos, setProductos] = useState([]);
  const [recargarProductos, setRecargarProductos] = useState(true);

  useEffect(() => {
    if (recargarProductos) {
      consultarAPI();
      //agregamos corchetes vacios entre la llave y el parentesis para solo consultar a la api al montar la pagina, y cuando cambia el componente no se le presta atencion
      setRecargarProductos(false);
    }
  }, [recargarProductos])

  const consultarAPI = async () => {
    try {
      //obtener lista de productos
      const consulta = await fetch("https://cafeteriarc.herokuapp.com/api/cafeteria"); //antes no teniamos el /api, eso cambia (ahora cn la BD)
      //console.log(consulta);
      const respuesta = await consulta.json();
      console.log(respuesta);

      if (await consulta.status !== 200) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Algo salio mal!',
        })
      }

      //guardar en el state
      setProductos(respuesta);

    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Router>
      <Header></Header>
      {/* los componentes que queremos que aparezcan en todas las paginas del sitio deben ir fuera del switch, pero siempre dentro del router */}
      {/* tenemos que envolver todo en el objeto router */}
      <Switch>
        <Route exact path="/">
          {/* path="/" es la pagina principal, onda google.com.ar/ */}
          <Inicio></Inicio>
        </Route>
        <Route exact path="/productos">
          <ListaProductos productos={productos} setRecargarProductos={setRecargarProductos}></ListaProductos>
        </Route>
        <Route exact path="/productos/nuevo">
          <AgregarProducto setRecargarProductos={setRecargarProductos}></AgregarProducto>
        </Route>
        <Route exact path="/productos/editar/:_id" render={(props) => {
          //dentro de toda esta funcion anonima va el codigo a ejecutar antes de renderizar el componente
          console.log(props);
          //considerar que ya estamos en la ruta, pero que todavia no se renderizo el componente -no llegamos al return
          
          //obtener el id de la ruta
          const idProducto = props.match.params._id;
          //console.log(idProducto);
          //buscar el producto que coincida con el id
          const productoSeleccionado = productos.find(producto => producto._id === idProducto)
          //no hacen falta los parentesis en este caso en la funcion anonima
          console.log(productoSeleccionado)


          //mostrar el componente editar producto

          return <EditarProducto productoSeleccionado={productoSeleccionado} setRecargarProductos={setRecargarProductos}></EditarProducto>
        }}>
          {/* el metodo render es oblidatorio, se ejecuta siempre aunque no lo pongamos y hacemos uso de este para obtener los props y poder obtener el id antes de que se renderice el componente*/}
          {/* para que dependa del parametro la url va con los : seguido de una palabra que le ponemos nosotros y asi se llamara el props*/}  
        </Route>
        <Route exact path="*">
          <PaginaError></PaginaError>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
