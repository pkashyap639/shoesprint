checkFormValidation = (username,useremail,userpassword,userphone) =>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (username == ''){
        document.getElementById('userNameError').innerHTML = "Enter Username"
        return false
    }else{
        document.getElementById('userNameError').innerHTML = ""
    }

    if (useremail == '' || emailRegex.test(useremail) === false){
        document.getElementById('userEmailError').innerHTML = "Enter Valid Email"
        return false
    }else{
        document.getElementById('userEmailError').innerHTML = ""
    }

    if (userpassword == "" || userpassword.length <=5){
        document.getElementById('userPasswordError').innerHTML = "Password length must be greater than 5"
        return false
    }else{
        document.getElementById('userPasswordError').innerHTML = ""
    }

    if (userphone == ""){
        document.getElementById('userPhoneError').innerHTML = "Enter Phone Number"
        return false
    }else{
        document.getElementById('userPhoneError').innerHTML = ""
    }

    return true
}

getUserData = (event) =>{
    event.preventDefault()
    console.log("Get User Data");
    const form = document.getElementById('signUpForm')
    const name = form.elements.username.value
    const email = form.elements.email.value
    const password = form.elements.password.value
    const phone = form.elements.phone.value
    if (checkFormValidation(name,email,password,phone)){
        console.log("Valid Form");
        document.getElementById('redirect-msg').innerHTML = "Account Created, redirecting to Sign In"
        setTimeout(() => {
            window.location.href = '../signin/signin.html';
        }, 3000);
        
    }else{
        console.log("Invalid Form");
    }
}

