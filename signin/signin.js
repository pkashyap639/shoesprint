validateSignIn = (useremail,userpassword) =>{
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (useremail == '' || emailRegex.test(useremail) === false){
        document.getElementById('userEmailError').innerHTML = "Enter Valid Email"
        return false
    }else{
        document.getElementById('userEmailError').innerHTML = ""
    }

    if (userpassword == "" || userpassword.length <=5){
        document.getElementById('userPasswordError').innerHTML = "Enter Valid Password"
        return false
    }else{
        document.getElementById('userPasswordError').innerHTML = ""
    }

    return true
}


// Token Generation
generateToken = ()=>{
    const token = "whisky"
    localStorage.setItem('token',token)
}

// Check if token Exists
checkToken = () =>{
    if(localStorage.getItem('token')='whisky'){
        return true
    }
    return false
}

makeSignIn =(email,password)=>{
    let flag = 1
    // creating database
    const myDb = indexedDB.open("CustomerDB");

    // on error
    myDb.onerror = (error) =>{
        console.error(error)
    }  
    myDb.onsuccess = ()=>{
        const cur = myDb.result
        const trans = cur.transaction("customer","readwrite")
        const ins = trans.objectStore("customer")
        const userIndex = ins.index("customer_info")

        const emailQuery = ins.get(email)
        // If email exists
        emailQuery.onsuccess =() =>{
            if(emailQuery.result == undefined){
                document.getElementById('userEmailError').innerHTML = "Email Not Exist"
                flag = -1
            }else{
                console.log("data: ",emailQuery.result);
                document.getElementById('userEmailError').innerHTML = ""
                if(password == emailQuery.result.password){
                    document.getElementById('userPasswordError').innerHTML = ""
                    console.log('Password Match');
                }else{
                    document.getElementById('userPasswordError').innerHTML = "Invalid Password"
                    flag = -1
                }
            }
        }


        trans.oncomplete =() =>{
            cur.close();

            if(flag == -1){
                return false
            }
             generateToken()  
        }

    } 
    
}

userSignIn =(event)=>{
    event.preventDefault()
    console.log("Get User Data");
    const form = document.getElementById('signInForm')
    const email = form.elements.email.value
    const password = form.elements.password.value
    validateSignIn(email,password)
    makeSignIn(email,password)
    checkToken()

}