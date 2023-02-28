var counter = 1;
setInterval(function(){
    document.getElementById('radio' + counter).checked = true;
    counter++;
    if(counter > 4){
        counter = 1;
    }
}, 5000);

let Product = function(id, name, price) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.picture = "./images/toysruss/tomica-" + id + ".jpg";
}

let products = [];


document.addEventListener("DOMContentLoaded", function() {
    testProduct1 = new Product("subaru", "Tomica No.06-10 Subaru BRZ", "249.75");
    testProduct2 = new Product("fairlady", "Tomica Fairlady Z Heritage Edition Brilliant White Pearl", "299.75");
    testProduct3 = new Product("honda", "Tomica Honda CR-Z Hybrid", "299.75");
    testProduct4 = new Product("lexus", "Tomica Lexus IS F CCS-R", "299.75");
    testProduct5 = new Product("mazda", "Tomica Mazda Axela Sport Official Car", "299.75");
    products.push(testProduct1, testProduct2, testProduct3, testProduct4, testProduct5);

    displayProducts(products);

    function displayProducts() {
        for (let product of products) 
            displayProduct(product)
    }

    function displayProduct(p) {        
        let link = $("<a>").attr("href", "product.html");
        let product = $("<img>").addClass("featured").attr("src", p.picture);
        let details = $("<span>").addClass("product-details").text(p.name + " P " + p.price);

       $("div#box-products").append($(link).append(product));
       $("div#box-details").append(details);
    }

    $(document).ready(function(){
        $("input#search-bar").on("input", function(){
            let search_product = $(this).val();

		    $("div.search-popup").empty();

            fetch('./json/products.json')
            .then((response) => response.json()) 
            .then((products) => {

                let key_products = [];

                for (let i = 0; i < products.length; i++) {
                    if (products[i].name.toLowerCase().includes(search_product.toLowerCase())) {
                        key_products.push(products[i]);
                    }
                }

                console.log(key_products);

                displaySearchProducts(key_products);

                function displaySearchProducts(product) {
                    for (let i = 0; i < product.length; i++) 
                        displaySearchProduct(product, i)
                }
                
                function displaySearchProduct(p, i) {
                    let search_product = $("<div>").addClass("search-product");

                    let image = $("<img>").addClass("search-image").attr("src", p[i].image);
                    let name = $("<div>").addClass("search-name").text(p[i].name);
                    let price = $("<div>").addClass("search-price").text(p[i].price);
                    
                    $("div.search-popup").append(search_product.append(image, name, price));
                }
            });
        });
    });
    
    

    document.querySelector("div.search")?.addEventListener("click", function(e) {
        $("div.search-popup").css("visibility", "visible");
    });

    document.querySelector("main")?.addEventListener("click", function(e) {
        $("div.search-popup").css("visibility", "hidden");
    });
    
});
