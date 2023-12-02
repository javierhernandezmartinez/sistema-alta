const Session = {}

Session.setUser=(data)=>{
   localStorage.setItem('user', JSON.stringify(data))
    window.open("#/perfil","_self")
}
Session.getUser=()=>{
    return JSON.parse(localStorage.getItem('user'))
}
Session.removeUser=()=>{
    localStorage.removeItem('user')
    window.open("#/home", "_self");

}

export default Session