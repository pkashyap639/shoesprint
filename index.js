checkAuthentication = () =>{
    if(localStorage.getItem('token')=='whisky'){
        window.location.href = "./cart.html"
    }
    else{
        alert("Login First")
    }
}