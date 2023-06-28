import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Modules/Home/Home"
import Login from "./Modules/Login/Login";
import Register from "./Modules/Register/Register";
import Perfil from "./Modules/Perfil/Perfil";
import Administration from "./Modules/Administation/Administration";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/perfil"} element={<Perfil/>}/>
                <Route path={"/administration"} element={<Administration/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
