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
