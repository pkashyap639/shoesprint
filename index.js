checkAuthentication = () =>{
    if(localStorage.getItem('token')=='whisky'){
        return true
    }
    return false
}

checkAuthenticationToCart = () =>{
    if(localStorage.getItem('token')=='whisky'){
        window.location.href = "../cart.html"
    }
    else{
        alert('Please Sign In First')
    }
}


signOut = ()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('email')
    localStorage.removeItem('mycart')
    window.location.href = "./index.html"
}

authorizationBtn = () =>{
    const authBtn = document.getElementById('authBtn')
    if(checkAuthentication() != true){
        authBtn.innerHTML = '<a class="nav-link"  href="./signin/signin.html">SIGN IN</a>'
    }else{
        authBtn.innerHTML = '<a class="nav-link" href="javascript:void(0);" onclick="signOut()">SIGN OUT</a>'
    }
}

authorizationBtn()
