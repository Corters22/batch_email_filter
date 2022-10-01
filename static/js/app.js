// from data.js
var rawData = data;

var outputData = {}
var tableData = []

for (var obj of rawData) {
    var prvID = {prvID: obj["provider id"]};
    var prvName= {prvName:obj['provider name']};
    var prvEmail = {email: obj['email']};
    var prvPhone = {number: obj['phone number']};
    outputData = Object.assign(prvID, prvName, prvPhone, prvEmail);
    tableData.push(outputData)
    // console.log(prvID, prvName, prvPhone, prvEmail)
}

console.log('tabledata', tableData)

// Use D3 to select the table
var table1 = d3.select("#prv-table");
// Use D3 to select the table body
var tableBody = d3.select("tbody");

// adding data into table

tableData.forEach((report) => {
    var row = tableBody.append("tr");
    Object.entries(report).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });


var filterButton = d3.select("#filter-btn")
var clearButton = d3.select('#clear-btn')


// Create event handlers for clicking the button or pressing the enter key
filterButton.on("click", runEnter);
clearButton.on('click', runClear);
// form.on("change",runEnter);

// Complete the event handler function for the form
function runEnter() {

    // Prevent the page from refreshing
    d3.event.preventDefault();
    // tableBody.remove()
    
    // Select the input element and get the raw HTML node
    var inputState = d3.select("#state");
    var inputCity = d3.select("#city");
    var inputGender = d3.select("#gender");
    var inputSpeciality1 = d3.select("#speciality1");
    // var inputShape = d3.select("#shape");
  
    // Get the value property of the input element
    var stateValue = inputState.property("value");
    var cityValue = inputCity.property("value");
    var genderValue = inputGender.property("value");
    var speciality1Value = inputSpeciality1.property("value");
    // var shapeValue = inputShape.property("value");
  
    console.log("state entered:", stateValue);
    console.log("city entered:", cityValue);
    console.log("gender entered:", genderValue);
    console.log("speciality1 entered:", speciality1Value);
    // console.log("shape entered:", shapeValue);  

    //Running if/else statements to only filter by fields that have a value. If there is no value in the field,
    // changing the name of the list to add to the table body.
      
    if (stateValue != '') {
      var filteredByState = rawData.filter(report => report.state === stateValue);
    }
    else {
      filteredByState = rawData;
    }
    if (cityValue != '') {
        var filteredByCity = filteredByState.filter(report => report.city === cityValue);
    }
    else {
      filteredByCity = filteredByState;
    }
    if (genderValue != '') {
      var filteredByGender = filteredByCity.filter(report => report.gender === genderValue);
    }
    else {
      filteredByGender = filteredByCity;
    }
    if (speciality1Value != '') {
      var filteredBySpeciality1 = filteredByGender.filter(report => report.speciality1 === speciality1Value);
    }
    else {
      filteredBySpeciality1 = filteredByGender;
    }
    // if (shapeValue != '') {
    //   var filteredData = filteredByCountry.filter(report => report.shape === shapeValue);
    // }
    // else {
    //   filteredData = filteredByCountry;
    // }
    
    console.log('filteredData:', filteredBySpeciality1);

    // Clearing table
    tableBody.html('')

    var filteredoutputData = {}
    var filteredtableData = []

    for (var obj of filteredBySpeciality1) {
        var filteredprvID = {prvID: obj["provider id"]};
        var filteredprvName= {prvName:obj['provider name']};
        var filteredprvEmail = {email: obj['email']};
        var filteredprvPhone = {number: obj['phone number']};
        filteredoutputData = Object.assign(filteredprvID, filteredprvName, filteredprvPhone, filteredprvEmail);
        filteredtableData.push(filteredoutputData)
        // console.log(prvID, prvName, prvPhone, prvEmail)
    }

    // Adding filtered values to the table
    filteredtableData.forEach((report) => {
        var row = tableBody.append("tr");
        Object.entries(report).forEach(([key, value]) => {
          var cell = row.append("td");
          cell.text(value);
        });
      });
  
};

// function definition for clearing the filters and replacing the table with all data.

function runClear() {
  // Clearing values in the inputs (placeholder goes back)
  inputDate = d3.select("#state").property("value", '');
  inputCity = d3.select("#city").property("value", '');
  inputState = d3.select("#gender").property("value", '');
  inputCountry = d3.select("#speciality1").property("value", '');
//   inputShape = d3.select("#shape").property("value", '');

  // Clear filtered table
  tableBody.html('')

  // Adding back original table
  tableData.forEach((report) => {
    var row = tableBody.append("tr");
    Object.entries(report).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });
}