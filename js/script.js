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
          // Re-execute this function to include any nested includes
          includeHTML();
        })
        .catch(error => {
          console.log('Error fetching the file:', error);
          el.innerHTML = "Page not found.";
        });
    });
  }
  
  // Call the function to include the content
  document.addEventListener("DOMContentLoaded", function() {
    includeHTML();
  });
  