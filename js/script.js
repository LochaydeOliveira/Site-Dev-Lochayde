function includeHTML() {
    var elements = document.querySelectorAll("[data-include-html]");
    elements.forEach(function(el) {
      var file = el.getAttribute("data-include-html");
      fetch(file)
        .then(response => {
          if (response.ok) return response.text();
          throw new Error('Network response was not ok.');
        })
        .then(data => {
          el.innerHTML = data;
          el.removeAttribute("data-include-html");

          includeHTML();
        })
        .catch(error => {
          console.log('Error fetching the file:', error);
          el.innerHTML = "Page not found.";
        });
    });
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
  });


  document.addEventListener("DOMContentLoaded", function () {
    let itemsShopee = document.querySelectorAll(".item-ads-shopee");
    let index = 0;

    function showNextItem() {
      itemsShopee.forEach(item => item.classList.remove("active"));
      itemsShopee[index].classList.add("active");

        index = (index + 1) % itemsShopee.length;

        setTimeout(showNextItem, 4000);
    }

    itemsShopee[0].classList.add("active");
    setTimeout(showNextItem, 4000);
});




        window.addEventListener("load", function () {
          var btnTopo = document.getElementById("btnTopo");


          window.addEventListener("scroll", function () {
              if (window.scrollY > 1250) {
                  btnTopo.style.display = "block";
              } else {
                  btnTopo.style.display = "none";
              }
          });


          btnTopo.addEventListener("click", function () {
              window.scrollTo({
                  top: 0,
                  behavior: "smooth"
              });
          });
      });

      if (window.location.pathname.includes("catalogo.html")) {
      document.addEventListener("DOMContentLoaded", function() {
        fetch("catalogo.json")
        .then(response => response.json())
        .then(products => {
            const container = document.getElementById("product-container");
            
            products.forEach(product => {
                const card = document.createElement("div");
                card.className = "col";
                card.innerHTML = `
                    <div class="card h-100 border-0 rounded-pill text-center">
                        <a class="img-prod" href="${product.url}" target="_blank">   
                            <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        </a>
                        <div class="card-body">
                            <div class="rating">
                                <span class="stars" data-rating="${product.rating}"></span>
                                <span class="rating-text">${product.rating}</span>
                            </div>
                            <a href="${product.url}" class="card-title" target="_blank">${product.name}</a>
                            <p style="display: none!important;">${product.price}</p>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });

            document.querySelectorAll(".stars").forEach(el => {
                let rating = parseFloat(el.getAttribute("data-rating"));
                let starsHTML = "";
            
                for (let i = 1; i <= 5; i++) {
                    if (rating >= 4.7) {
                        starsHTML += '<i class="bi bi-star-fill"></i>'; // 5 estrelas cheias
                    } else if (rating > 4.4 && rating < 4.6 && i === 5) {
                        starsHTML += '<i class="bi bi-star-half"></i>'; // Quinta estrela pela metade
                    } else if (rating <= 4.4 && i === 5) {
                        starsHTML += '<i class="bi bi-star"></i>'; // Quinta estrela vazia
                    } else {
                        starsHTML += '<i class="bi bi-star-fill"></i>'; // Estrelas cheias padrão
                    }
                }
            
                el.innerHTML = starsHTML;
            });
            
    
            
        })
        .catch(error => console.error("Erro ao carregar os produtos:", error));
    });
    }

    let products = [];

    function addProduct() {
        let name = document.getElementById("name").value;
        let image = document.getElementById("image").value;
        let rating = parseFloat(document.getElementById("rating").value);
        let url = document.getElementById("url").value;

        let newProduct = { name, image, rating, url };

        products.push(newProduct);

        document.getElementById("jsonOutput").value = JSON.stringify({ products }, null, 2);
    }

    function downloadJSON() {
        let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ products }, null, 2));
        let downloadAnchor = document.createElement("a");
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "catalogo.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        document.body.removeChild(downloadAnchor);
    }


    function checkVisibility() {
        const banner = document.getElementById('bannerSlim');
        const rect = banner.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top <= windowHeight && rect.bottom >= 0) {
            banner.classList.add('banner-visible');
        }
    }

    function hideBanner() {
        const banner = document.getElementById('bannerSlim');
        banner.style.opacity = '0';
        setTimeout(() => {
            banner.style.display = 'none';
        }, 500); // Tempo do fade-out
    }

    document.addEventListener('scroll', checkVisibility);


    document.addEventListener("DOMContentLoaded", function () {

        document.querySelectorAll('.dropdown-submenu > a').forEach(function (element) {
            element.addEventListener("click", function (e) {
                if (window.innerWidth < 992) { 
                    e.preventDefault(); 
                    let submenu = this.nextElementSibling;
                    if (submenu.style.display === "block") {
                        submenu.style.display = "none";
                    } else {

                        document.querySelectorAll('.dropdown-menu .dropdown-menu').forEach(function (el) {
                            el.style.display = "none";
                        });
                        submenu.style.display = "block";
                    }
                }
            });
        });
    });