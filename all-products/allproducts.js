var allPorducts = null

gettingProductsData = () =>{
    const rowItems = document.getElementById('products-row')
    const productsJson = '../products/products.JSON'
    fetch(productsJson)
    .then((response) => {
        if (!response.ok) {
        throw new Error('Network response was not ok');
        }
        return response.json(); 
    })
    .then((data) => {
        allPorducts = data.products
        let arr = data.products
        arr.forEach(element => {
            rowItems.innerHTML += `
                <div class="col-md-3 col-sm-3 col-xs-12 d-flex justify-content-center mb-4">
                    <div class="card" style="width: 18rem;">
                        <div class="product-img-box d-flex justify-content-center">
                            <img src="${element.imageUrl}.png" class="card-img-top" alt="...">
                        </div>
                            <div class="card-body" id="${element.productId}">
                                <p class="card-text cost">${element.price} $</p>
                                <p class="card-text product-name">${element.productName}</p>
                                <p class="card-text product-category">${element.category}</p>
                                <div class="btn-group d-flex justify-content-center mt-4" role="group" >
                                <button type="button" class="btn add-btn" onClick="addProduct(${element.productId})" id="${element.productId}">Add</button>
                                <button type="button" class="btn view-btn" onClick='showModal("${element.productName}","${element.imageUrl}")' data-bs-toggle="modal" data-bs-target="#exampleModal"   id="${element.productId}">View</button>
                            </div>
                        </div>
                    </div>
                </div>
                `

        });
    })
    .catch((error) => {
        console.error('There was a problem ', error);
    });
}

showModal = (productName,imageUrl)=>{
    console.log(123);
    document.getElementById('exampleModalLabel').innerHTML = productName
    document.getElementById('modal-body').innerHTML = `<img src="${imageUrl}.png" class="card-img-top" alt="...">`
}

gettingProductsData()

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
    window.location.href = "../index.html"
}

authorizationBtn = () =>{
    const authBtn = document.getElementById('authBtn')
    if(checkAuthentication() != true){
        authBtn.innerHTML = '<a class="nav-link"  href="../signin/signin.html">SIGN IN</a>'
    }else{
        authBtn.innerHTML = '<a class="nav-link" href="javascript:void(0);" onclick="signOut()">SIGN OUT</a>'
    }
}
authorizationBtn()

addProduct = async (productId) =>{
    let prodResult;
    if(checkAuthentication() == true){
        allPorducts.forEach(elm=>{
            if(elm.productId == productId){
                console.log(elm);
                prodResult = elm
            }
        })
        //
        
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
        
                const cartQuery = store.get(localStorage.getItem('email'));
        
                cartQuery.onsuccess = () => {
                    cartQuery.result.cart.cartItems.push(prodResult)
                    cartQuery.result.totalPrice+=prodResult.price
                    store.put(cartQuery.result)
                    console.log("Cart Updated");
                };
        
                transaction.oncomplete = () => {
                    db.close();
                    if (flag == -1) {
                        return false;
                    }
                    
                };
            } catch (error) {
                console.error(error);
            }
        
        
    }
    else{
        alert("Please Sign In First")
    }
}
