const Session = {}

Session.setUser=(data)=>{
   sessionStorage.setItem('user', JSON.stringify(data))
    window.open("#/perfil","_self")
}
Session.getUser=()=>{
    return JSON.parse(sessionStorage.getItem('user'))
}
Session.updateUser=(data)=>{
    sessionStorage.setItem('user', JSON.stringify(data))
}
Session.removeUser=()=>{
    sessionStorage.removeItem('user')
    window.open("#/home", "_self");

}

export default Session