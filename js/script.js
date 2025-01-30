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
    let items = document.querySelectorAll(".item-ads-shopee");
    let index = 0;

    function showNextItem() {
        items.forEach(item => item.classList.remove("active"));
        items[index].classList.add("active");

        index = (index + 1) % items.length;

        setTimeout(showNextItem, 4000);
    }

    items[0].classList.add("active");
    setTimeout(showNextItem, 4000);
});
