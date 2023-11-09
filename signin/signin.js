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
    if(localStorage.getItem('token')=='whisky'){
        return true
    }
    return false
}

makeSignIn = async (email, password) => {
    let flag = 1;

    const openDatabase = () => {
        return new Promise((resolve, reject) => {
            const myDb = indexedDB.open("CustomerDB");

            myDb.onerror = (error) => {
                reject("Error opening database");
            };

            myDb.onsuccess = (event) => {
                const db = event.target.result;
                resolve(db);
            };
        });
    };

    try {
        const db = await openDatabase();
        const transaction = db.transaction("customer", "readwrite");
        const store = transaction.objectStore("customer");
        const userIndex = store.index("customer_info");

        const emailQuery = store.get(email);

        emailQuery.onsuccess = () => {
            if (emailQuery.result == undefined) {
                document.getElementById('userEmailError').innerHTML = "Email Not Exist";
                flag = -1;
            } else {
                console.log("data: ", emailQuery.result);
                document.getElementById('userEmailError').innerHTML = "";
                if (password == emailQuery.result.password) {
                    document.getElementById('userPasswordError').innerHTML = "";
                    console.log('Password Match');
                } else {
                    document.getElementById('userPasswordError').innerHTML = "Invalid Password";
                    flag = -1;
                }
            }
        };

        transaction.oncomplete = () => {
            db.close();
            if (flag == -1) {
                return false;
            }
            generateToken();
            // Consider handling the redirection here or use a callback
        };
    } catch (error) {
        console.error(error);
    }
};

userSignIn = async (event) => {
    event.preventDefault();
    console.log("Get User Data");
    const form = document.getElementById('signInForm');
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    validateSignIn(email, password);
    await makeSignIn(email, password);
    // Move the redirection logic inside the asynchronous code
    window.location.href = "../cart.html";
    checkToken();
};
