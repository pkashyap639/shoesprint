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

function cartItemsList(){
    var myCartItemsJson = JSON.parse(myCartItems)
    for (let i = 0; i < myCartItemsJson.length; i++) {
        var product_over = document.getElementById('product-overview');
        var z = document.createElement('div');

        if(window.screen.width < 425){

        
        z.innerHTML = `
        <div class="products row">
        <div class="product-image col container h-100 my-auto
            text-center ">
            <img src="${myCartItemsJson[i]['productImage']}" class="product-img"
                alt="">
        </div>

        <div class="col product-desc-p">
        <div class="text-center">
            <p class="product-name">${myCartItemsJson[i]['productName']}</p>
            <p class="product-price">$${myCartItemsJson[i]['price'].toFixed(2)}</p>
            <div id="product-qnt">
                <div class="row px-2">
                    <a href="" class="col
                        text-decoration-none
                        fw-bold text-black">-</a>
                    <div class="col">1</div>
                    <a href="" class="col
                        text-decoration-none
                        fw-bold text-black">+</a>
                </div>
            </div>
            <a href="" class="text-black">Remove</a>
        </div>
        </div>
        </div>
        

        <hr>
        `
    }else{
        z.innerHTML = `
        <div class="products row">
        <div class="product-image col container h-100 my-auto
            text-center ">
            <img src="images/ShoeOne.jpg" class="product-img"
                alt="">
        </div>

        <div class="col text-center product-desc">
            Nike Jordan Air Max 1234
        </div>
        <div class=" col text-center product-desc">
            <p class="product-price">$225.99</p>
            <div id="product-qnt">
                <div class="row px-2">
                    <a href="" class="col text-decoration-none
                        fw-bold text-black">-</a>
                    <div class="col p-0">1</div>
                    <a href="" class="col text-decoration-none
                        fw-bold text-black">+</a>
                </div>
            </div>
            <a href="" class="text-black">Remove</a>
        </div>
        
        <hr>
        `}
        console.log('aaa')
        product_over.appendChild(z)
    }
}
cartItemsList()

function cartTotal(){
    let subtotal = 0;
    let discount = 0;
    let tax = 0;
    let total = 0;
    let myCartItemsJson = JSON.parse(myCartItems);

    var subtotalHtml = document.getElementById('subtotal')
    var taxHtml = document.getElementById('tax')
    var taxHstHtml = document.getElementById('tax-hst')
    var totalHtml = document.getElementById('total')

    for (let i = 0; i < myCartItemsJson.length; i++) {
        subtotal += myCartItemsJson[i]['price']
    }
    
    tax = subtotal * 0.13
    total = subtotal + tax

    console.log(tax)
    subtotalHtml.innerHTML = `$${subtotal.toFixed(2)}`
    taxHtml.innerHTML = `$${tax.toFixed(2)}`
    taxHstHtml.innerHTML = `$${tax.toFixed(2)}`
    total.innerHTML = `$${total.toFixed(2)}`

}

cartTotal()