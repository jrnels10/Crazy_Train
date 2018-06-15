$(document).ready(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyBOiHjYKn_QoqL5RLl219teUF9-DaB49gc",
        authDomain: "hethere-51bee.firebaseapp.com",
        databaseURL: "https://hethere-51bee.firebaseio.com",
        projectId: "hethere-51bee",
        storageBucket: "hethere-51bee.appspot.com",
        messagingSenderId: "427607132711"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var array = [];

    // To search for specific child within the database
    var testID;
    $("#test").on("click", function(){
        database.ref("1").set({
            test: "test2"
        })
    });

    
    $("#add-user").on("click", function (event) {
        event.preventDefault();
        var name = $("#name-input").val().trim();
        var role = $("#role-input").val().trim();
        var startDate = $("#startdate-input").val().trim();
        var rate = $("#rate-input").val().trim();

        
        // console.log('Click works');
        if (name && role && startDate && rate) {
            database.ref(name).set({
                name: name,
                role: role,
                startDate: startDate,
                monthlyRate: rate
            });
        } else {
            console.log("something is missing from the form");
        }


    });
    database.ref().on("child_added", renderEmployees);//<--- look this up//likely updates when page loads and when a new child is added

    function renderEmployees(snapshot) {
        testID = snapshot.key;
        array.push(testID);
        console.log(array);
        var employeeRow = $("<tr>");
        var name = $("<td>").text(snapshot.val().name);
        var role = $('<td>').text(snapshot.val().role);
        var startDate = $('<td>').text(snapshot.val().startDate);
        var workTime = $('<td>').text(5);
        var monthRate = $('<td>').text(snapshot.val().monthlyRate);
        var cost = $('<td>').text(parseInt(workTime.text()) * parseInt(monthRate.text()));
        employeeRow.append(name, role, startDate, workTime, monthRate, cost);
        $("#tableBody").append(employeeRow);
    }
});