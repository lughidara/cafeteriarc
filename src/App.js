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
      const consulta = await fetch("http://localhost:4000/cafeteria");
      console.log(consulta);
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
        <Route exact path="/productos/editar">
          <EditarProducto></EditarProducto>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;
