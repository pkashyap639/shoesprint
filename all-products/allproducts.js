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
        let arr = data.products
        arr.forEach(element => {
            rowItems.innerHTML += `
                <div class="col-md-3 col-sm-3 col-xs-12 d-flex justify-content-center mb-4">
                    <div class="card" style="width: 18rem;">
                        <div class="product-img-box d-flex justify-content-center">
                            <img src="..." class="card-img-top" alt="...">
                        </div>
                            <div class="card-body" id="${element.productId}">
                                <p class="card-text cost">${element.price} $</p>
                                <p class="card-text product-name">${element.productName}</p>
                                <p class="card-text product-category">${element.category}</p>
                                <div class="btn-group d-flex justify-content-center mt-4" role="group" >
                                <button type="button" class="btn add-btn" id="${element.productId}">Add</button>
                                <button type="button" class="btn view-btn" id="${element.productId}">View</button>
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

gettingProductsData()
