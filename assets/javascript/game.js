$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCBCZDX9SYItJQBMrgLg6y-SVPlPgA2JIk",
        authDomain: "crazy-train-d797d.firebaseapp.com",
        databaseURL: "https://crazy-train-d797d.firebaseio.com",
        projectId: "crazy-train-d797d",
        storageBucket: "crazy-train-d797d.appspot.com",
        messagingSenderId: "792798205955"
    };
    firebase.initializeApp(config);
    var database = firebase.database();
    var minTillTrain;
    var nextTrain;
    // var array = [];

    // To search for specific child within the database
    // var testID;
    // $("#test").on("click", function(){
    //     database.ref("1").set({
    //         test: "test2"
    //     })
    // });


    console.log("linked")
    $("#add-train").on("click", function (event) {
        console.log("click works")
        event.preventDefault();
        var name = $("#name-input").val().trim();
        var destination = $("#dest-input").val().trim();
        var firstTrain = $('#firstTrain-input').val().trim();
        var frequency = $("#freq-input").val().trim();

        
        // console.log('Click works');
        // Solved Mathematically
        // Test case 2:
        // 16 - 00 = 16
        // 16 % 7 = 2 (Modulus is the remainder)
        // 7 - 2 = 5 minutes away
        // 5 + 3:16 = 3:21

        // First time is set back one year to ake sure it comes before current time
        var firstTimeConverted = moment(firstTrain, 'hh:mm').subtract(1, "Years");
        var currentTime = moment();
        console.log("first time: " + moment(firstTimeConverted).format('hh:mm'));
        console.log('Current time: ' + moment(currentTime).format("hh:mm"));

        // difference in time 
        var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
        console.log('difference in time: ' + diffTime);

        // time apart (remainder)
        var remainder = diffTime % frequency;
        console.log(remainder);

        // minutes until next train
        minTillTrain = frequency - remainder;
        console.log("minutes till next train: " + minTillTrain);
        
        // what time the next train will arrive
        nextTrain = moment(moment().add(minTillTrain, 'minutes')).format('hh:mm');
        console.log("arrival time: " + moment(moment().add(minTillTrain, 'minutes')).format('hh:mm'));

        if (name && destination && firstTrain && frequency) {
            database.ref(name).set({
                name: name,
                destination: destination,
                firstTrain: firstTrain,
                frequency: frequency,
                // minutes: minTillTrain,
                // nextTrain: nextTrain,
            });
            console.log("next Train")
        } else {
            console.log("something is missing from the form");
        }


    });
    database.ref().on("child_added", trainTimes);//<--- look this up//likely updates when page loads and when a new child is added
    function trainTimes(snapshot) {
        // testID = snapshot.key;
        // array.push(testID);
        // console.log(array);
        var trainRow = $("<tr>");
        var name = $("<td>").text(snapshot.val().name);
        var destination = $('<td>').text(snapshot.val().destination);
        var frequency = $('<td>').text(snapshot.val().frequency);
        var minutes = $('<td>').text(minTillTrain);
        console.log("minutes: " + minutes);
        var nextTime = $('<td>').text(nextTrain);
        console.log("nextTime: " + nextTime);
        trainRow.append(name, destination, frequency, minutes, nextTime);
        $("#tableBody").append(trainRow);
    }
    
});