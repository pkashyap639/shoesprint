signOut = ()=>{
    localStorage.removeItem('token')
    window.location.href = "./index.html"
}

if(localStorage.getItem('token')!='whisky'){
    window.location.href = "./index.html"
}
else{

window.onload = updateProdDesc();
window.addEventListener("resize", updateProdDesc);


function updateProdDesc() {
    var product_desc = document.getElementsByClassName("product-desc");
    var product_desc_mobile = document.getElementsByClassName("product-desc-p");

    var product_overview = document.getElementById("product-overview");
    var price_cal = document.getElementById("price-cal");

    var recipt = document.getElementById("recipt");

    if (window.screen.width <= 425) {

        for (var i = 0; i < product_desc_mobile.length; i++) {
            product_desc_mobile[i].style.display = "block";
        }
        for (var i = 0; i < product_desc.length; i++) {
            product_desc[i].style.display = "none";
        }

        recipt.classList.remove('row');
        price_cal.classList.remove('col');
        product_overview.classList.remove('col');
    } else {
        for (var i = 0; i < product_desc_mobile.length; i++) {
            product_desc_mobile[i].style.display = "none";
        }
        
        for (var i = 0; i < product_desc.length; i++) {
            product_desc[i].style.display = "block";
        }
        
        
        recipt.classList.add('row');
        price_cal.classList.add('col');
        product_overview.classList.add('col');
    }
}
}

getCartItems = async () =>{

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
            let cartItems =  cartQuery.result.cart.cartItems
            localStorage.setItem('mycart',JSON.stringify(cartItems))
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

getCartItems()
let myCartItems = localStorage.getItem('mycart')
console.log(JSON.parse(myCartItems));
