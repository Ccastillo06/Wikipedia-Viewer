$(document).ready(function(){ 
    $("form").submit(function(e){ // Activate this function when the form is submitted.
      
      $("ul").empty();  // Remove the list created before.
      
      e.preventDefault(); // Stop the page from refreshing after submit.
      
      var lookFor = document.getElementById("search").value;  // Get the value of the input and make it a variable.
      
      $.ajax({ // Use an ajax function to call an API from server.
        url : 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + lookFor + '&limit=10&namespace=0&format=json', 
        dataType : 'jsonp', // Secure data type.
        success: function(data){  // If success in getting the data from the wiki API, then do the function storing the array in data.
          
          var div =  document.getElementById('lister'); // Use the div with id #lister and set it as a variable.
          var list = document.createElement('ul');  // Create an ul element in order to fill it.
          
          // The API returns an array of 4 elements, [1] is the name, [2] is the description and [3] is the link. [0] is the search value.
          for(var i = 0; i < data[1].length; i++) { // Loop through the array of data given.
                        
            var item = document.createElement('li');  // Create a li element to store the whole info.
            var title = document.createElement('h1'); // Set the title of the wiki page as a header.
            var description = document.createElement('p');  // Set the description given as a paragraph.
            var a = document.createElement('a');  // Create a link variable to target the wiki page.
            
            a.setAttribute('href', data[3][i]); // The link will get to the page.
            
            title.appendChild(document.createTextNode(data[1][i])); // Store the text name given from the API as title.
            description.appendChild(document.createTextNode(data[2][i])); // Same for the description.
            
            
            item.appendChild(title);  // Store title into item.
            item.appendChild(description);  // Store description into item.
            a.appendChild(item);  // Set the whole item as a link.
            
            $(a).attr('target', '_blank');  // Give the link the _blank property to open a new tab.
            
            list.appendChild(a);  // Store the list item into the ul generated element.
          }
          
          div.appendChild(list);  // And finally store it all into the div.
        }
      });
      
      $("#myForm")[0].reset();  // Clear the input box after search.
      
    });
});
