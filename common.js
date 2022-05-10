// ===> Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addstudents");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
  }
}

// ===> Select an element in a row and highlight it
let table = document.getElementById('tablegrid');
let selectedRows = []
table.onclick = function(event) {
    let target = event.target;
      highlight(target.tagName == 'TR' ? target : target.parentNode);
    }
    function highlight(node) {
      node.classList.toggle('highlight');
    }

// ===> Select all elements in a row and highlight it
function selectAll() {
  let table = document.getElementById('tablegrid');
  let rows = table.getElementsByTagName('TR');
  for (let i = 0; i < rows.length; i++) {
    rows[i].classList.add('highlight');
  }
}

// ===> Unselect all elements in a row and unhighlight it
function unSelectAll() {
  let table = document.getElementById('tablegrid');
  // let rows = table.getElementsByTagName('tbody');
  let rows = table.getElementsByTagName('TR');
  for (let i = 0; i < rows.length; i++) {
    rows[i].classList.remove('highlight');
  }
}

// ===> Append the selected row to another table
function appendRows() {
  let table = document.getElementById('tablegrid');
  let rows = table.getElementsByTagName('TR');
  let selectedRows = [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].classList.contains('highlight')) {
      selectedRows.push(rows[i]);
    }
  }
  let tablemainpage = document.getElementById('tablegridmainpage');
  for (let i = 0; i < selectedRows.length; i++) {
    tablemainpage.appendChild(selectedRows[i]);
  }
}

// ===> Grid Table
TableView(tableData);
function TableView(tableData) {
  var table = document.getElementById("mytable");
  var input = document.getElementById("myinput");

  function populateTable() {
    table.innerHTML = "";
    for (let data of tableData) {
      let row = table.insertRow(-1);
      let name = row.insertCell(0);
      name.innerHTML = data.name;

      let quantity = row.insertCell(1);
      quantity.innerHTML = data.employeeid;

      let price = row.insertCell(2);
      price.innerHTML = data.CompanyName;

      let expiry = row.insertCell(3);
      expiry.innerHTML = data.JobRole;
    }

    filterTable();
  }

  function filterTable() {
    let filter = input.value.toUpperCase();
    rows = table.getElementsByTagName("TR");
    let flag = false;
    
    for (let row of rows) {
      let cells = row.getElementsByTagName("TD");

      for (let cell of cells) {
        if (cell.textContent.toUpperCase().indexOf(filter) > -1) {
          if (filter) {
            cell.style.backgroundColor = "";
          } else {
            cell.style.backgroundColor = "";
          }

          flag = true;
        } else {
          cell.style.backgroundColor = "";
        }
      }

      if (flag) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }

      flag = false;
    }
  }
  populateTable();

  input.addEventListener("keyup", function (event) {
    filterTable(event);
  });
}

// ===> when students are added to the table, the buttoncontainer is hidden 
let tablegrid = document.getElementById('tablegrid');
tablegrid.addEventListener('click', function() {
  buttoncontainer.style.display = 'none';
}
);

// ===> delete the selected row from the table
function deleteRow() {
  let table = document.getElementById('tablegridmainpage');
  let rows = table.getElementsByTagName('TR');
  let selectedRowss = [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].classList.contains('highlightmainpage')) {
      selectedRowss.push(rows[i]);
    }
  }
  for (let i = 0; i < selectedRowss.length; i++) {
    table.removeChild(selectedRowss[i]);
  }
}

// ===> Select an element in a row and highlight it in the tablegridmainpage
let tablegridmainpage = document.getElementById('tablegridmainpage');
let selectedRowss = []
tablegridmainpage.onclick = function(event) {
  let target = event.target;

  highlightmainpage(target.tagName == 'TR' ? target : target.parentNode);
}
function highlightmainpage(node) {
  node.classList.toggle('highlightmainpage');
}

// ===> Save the data to the json file
function saveData() {
  let table = document.getElementById('tablegridmainpage');
  let rows = table.getElementsByTagName('TR');
  let selectedRowss = [];
  for (let i = 0; i < rows.length; i++) {
    if (rows[i].classList.contains('highlightmainpage')) {
      selectedRowss.push(rows[i]);
    }
  }
  let data = [];
  for (let i = 0; i < selectedRowss.length; i++) {
    let row = selectedRowss[i];
    let name = row.getElementsByTagName('TD')[0].innerHTML;
    let quantity = row.getElementsByTagName('TD')[1].innerHTML;
    let price = row.getElementsByTagName('TD')[2].innerHTML;
    let expiry = row.getElementsByTagName('TD')[3].innerHTML;
    data.push({
      name: name,
      employeeid: quantity,
      CompanyName: price,
      JobRole: expiry
    });
  }
  let json = JSON.stringify(data);
  let blob = new Blob([json], { type: "application/json" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "data.json";
  a.click();
}
