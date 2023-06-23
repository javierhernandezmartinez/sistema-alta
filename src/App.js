import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Home from "./Components/Home/Home"
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Perfil from "./Components/Perfil/Perfil";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<Home/>}/>
                <Route path={"/login"} element={<Login/>}/>
                <Route path={"/register"} element={<Register/>}/>
                <Route path={"/perfil"} element={<Perfil/>}/>
                <Route path={"/administration"} element={<Login/>}/>
            </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
