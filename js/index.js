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
    this.picture = "./images/toysrus/tomica-" + id + ".jpg";
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
        let link = $("<a>").attr("href", "./products/product-" + p.id + ".html");
        let product = $("<img>").addClass("featured").attr("src", p.picture);
        let details = $("<span>").addClass("product-details").text(p.name + " P " + p.price);

       $("div#box-products").append($(link).append(product));
       $("div#box-details").append(details);
    }

    $(document).ready(function(){
        $("input#search-bar").on("input", function(){
            let search_product = $(this).val();

		    $("div.search-popup").empty();

            let productsJson = `[
                {
                    "name": "Tomica No.06-10 Subaru BRZ",
                    "price": "249.75",
                    "image": "./images/toysrus/tomica-subaru.jpg"
                }, 
                {
                    "name": "Tomica Fairlady Z Heritage Edition Brilliant White Pearl",
                    "price": "299.75",
                    "image": "./images/toysrus/tomica-fairlady.jpg"
                },
                {
                    "name": "Tomica Honda CR-Z Hybrid",
                    "price": "299.755",
                    "image": "./images/toysrus/tomica-honda.jpg"
                },
                {
                    "name": "Tomica Lexus IS F CCS-R",
                    "price": "399.75",
                    "image": "./images/toysrus/tomica-lexus.jpg"
                },
                {
                    "name": "Tomica Mazda Axela Sport Official Car",
                    "price": "299.75",
                    "image": "./images/toysrus/tomica-mazda.jpg"
                },
                {
                    "name": "Funko Gold James Harden",
                    "price": "600.00",
                    "image": "./images/funko/funko-harden.jpg"
                }, 
                {
                    "name": "Funko Gold Luka Doncic",
                    "price": "600.00",
                    "image": "./images/funko/funko-doncic.jpg"
                },
                {
                    "name": "Funko Gold Allen Iverson",
                    "price": "600.00",
                    "image": "./images/funko/funko-iverson.jpg"
                },
                {
                    "name": "Funko Gold Jimi Hendrix",
                    "price": "600.00",
                    "image": "./images/funko/funko-hendrix.jpg"
                },
                {
                    "name": "Funko Gold Slash",
                    "price": "600.00",
                    "image": "./images/funko/funko-slash.jpg"
                }
            ]`;
            
            let products = JSON.parse(productsJson);
            
            console.log(products);
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
    
    

    document.querySelector("div.search")?.addEventListener("click", function(e) {
        $("div.search-popup").css("visibility", "visible");
    });

    document.querySelector("main")?.addEventListener("click", function(e) {
        $("div.search-popup").css("visibility", "hidden");
    });
    
});
