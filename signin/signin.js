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


makeSignIn =(email,password)=>{
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
                return -1
            }else{
                console.log("data: ",emailQuery.result);
                document.getElementById('userEmailError').innerHTML = ""
                if(password == emailQuery.result.password){
                    document.getElementById('userPasswordError').innerHTML = ""
                    console.log('Password Match');
                }else{
                    document.getElementById('userPasswordError').innerHTML = "Invalid Password"
                    return -2

                }
            }
        }


        trans.oncomplete =() =>{
            cur.close();
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

}