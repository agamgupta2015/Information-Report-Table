$(document).ready(function() {
  var data = [];
  
  // Form submission
  $("#form").submit(function(e) {
    e.preventDefault();
    var first = $("#first").val();
    var contact = $("#contact").val();
    var last = $("#last").val();

    // Check for duplicates
    for (var i = 0; i < data.length; i++) {
      if (data[i].first === first || data[i].contact === contact||data[i].last === last) {
        alert("Name or contact number already exists!");
        return;
      }
    }

    // Add data to array
    data.push({ first: first, contact: contact, last:last });

    // Clear form fields
    $("#first").val("");
    $("#contact").val("");
    $("#last").val("");
    console.log(data)
    // Update table
     updateTable();
    
  });

  // Search function
  $("#search").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#table tbody tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  // Delete function
  $("#table").on("click", ".delete", function() {
    var index = $(this).data("index");
    if (confirm("Are you sure you want to delete this entry?")) {
      data.splice(index, 1);
      console.log(data);
      updateTable();
    }
  });
                   

 function updateTable() {
    var tbody = $("#table tbody");
    tbody.empty();
   var t = ("<tr> <th class='sort'>First</th> <th>Last</th> <th>Contact No</th> <th> Delete</th> </tr>");
   tbody.append(t);
    for (var i = 0; i < data.length; i++) {
      var tr = $("<tr>");
      tr.append("<td>" + data[i].first + "</td>");
      tr.append("<td>" + data[i].last + "</td>");
      tr.append("<td>" + data[i].contact + "</td>");
      tr.append("<td><button class='delete' data-index='" + i +"'>Delete</button></td>");
      tbody.append(tr);
    }
  }
});