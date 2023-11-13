import {BrowserRouter, Routes, Route, HashRouter} from "react-router-dom";
import Home from "./Modules/Home/Home"
import Login from "./Modules/Login/Login";
import Register from "./Modules/Register/Register";
import Perfil from "./Modules/Perfil/Perfil";
import Administration from "./Modules/Administation/Administration";
import {Provider} from "react-redux";
import store from './App/Store/Store'

function App() {
  return (
      <Provider store={store}>
          <div className="App">
              <HashRouter>
                  <Routes>
                      <Route path={"/"} element={<Home/>}/>
                      <Route path={"/home"} element={<Home/>}/>
                      <Route path={"/login"} element={<Login/>}/>
                      <Route path={"/register"} element={<Register/>}/>
                      <Route path={"/perfil"} element={<Perfil/>}/>
                      <Route path={"/administration"} element={<Administration/>}/>
                  </Routes>
              </HashRouter>
          </div>
      </Provider>

  );
}

export default App;
