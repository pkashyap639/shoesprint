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


databaseEntry = (username,useremail,userpassword,userphone) =>{
    // creating database
    const myDb = indexedDB.open("CustomerDB");

    // on error
    myDb.onerror = (error) =>{
        console.error(error)
    }

    myDb.onupgradeneeded = () =>{
        // getting cursor
        const cur = myDb.result
        const obj = cur.createObjectStore("customer",{keyPath: 'email'})
        // columns
        obj.createIndex("customer_info",["user"],{unique: true});
    }

    myDb.onsuccess = ()=>{
        const cur = myDb.result
        const trans = cur.transaction("customer","readwrite")
        const ins = trans.objectStore("customer")
        const userIndex = ins.index("customer_info")
        ins.put({
            email: useremail,
            password: userpassword,
            name: username,
            phone: userphone,
            cart: {
                cardId: 'cart'+useremail,
                cartItems: 
                    []
            },
            totalPrice: 0
        })

        // const query = ins.get('user1@mail.com')
        // query.onsuccess =() =>{
        //     console.log("data: ",query.result);
        // }
        trans.oncomplete =() =>{
            cur.close();
        }

    }
}


// {pId: 1,pname:'product 1', category: 'A', qty: 1, price: 5},
// {pId: 2,pname:'product 2', category: 'B', qty: 2, price: 20},
// {pId: 3,pname:'product 3', category: 'A', qty: 1, price: 7}
getUserData = (event) =>{
    event.preventDefault()
    console.log("Get User Data");
    const form = document.getElementById('signUpForm')
    const name = form.elements.username.value
    const email = form.elements.email.value
    const password = form.elements.password.value
    const phone = form.elements.phone.value
    if (checkFormValidation(name,email,password,phone)){
        const myDb = indexedDB.open("CustomerDB");
        myDb.onsuccess = () =>{
            const cur = myDb.result
            const trans = cur.transaction("customer","readwrite")
            const ins = trans.objectStore("customer")
            const query = ins.get(email)
            
            query.onsuccess =() =>{
                console.log('onSuccess:    ' + query.result)
                if (query.result == undefined){
                    console.log("Valid Form");
                    document.getElementById('redirect-msg').innerHTML = "Account Created, redirecting to Sign In"
                    databaseEntry(name,email,password,phone)
                    setTimeout(() => {
                        window.location.href = '../signin/signin.html';
                    }, 3000);
                }
                else{
                    document.getElementById('redirect-msg').innerHTML = "Account is already exists"
                }
            }
        }
        
    }else{
        console.log("Invalid Form");
    }
}


checkToken = () =>{
    if(localStorage.getItem('token')=='whisky'){
        return true
    }
    return false
}


ifLoginned = ()=>{
    if(checkToken() == true){
        window.location.href = "../cart.html"

    }
}

ifLoginned()
