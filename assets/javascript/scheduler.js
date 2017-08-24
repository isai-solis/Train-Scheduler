var database = firebase.database();

$("#submitButton").click(function(event){
    event.preventDefault();

    var trainName = $("#inputTrainName").val().trim();
    var trainDestination = $("#inputDestination").val().trim();
    var firstTrainTime = moment($("#inputFirstTrainTime").val().trim(), "hh:mm a").format("HH:mm");
    var trainFrequency = $("#inputFrequency").val().trim();

    

    var newTrain = {
    train: trainName,
    destination: trainDestination,
    firstTime: firstTrainTime,
    frequency: trainFrequency,
    

    };

    database.ref().push(newTrain);

    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);

    $("#inputTrainName").val("");
    $("#inputDestination").val("");
    $("#inputFirstTrainTime").val("");
    $("#inputFrequency").val("");

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().train;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTime;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);

    var currentTime = moment();
    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log("first time converted" + firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % trainFrequency;
    var tMinutesAway = trainFrequency - tRemainder;
    var tnextArrival = moment().add(tMinutesAway, "minutes");
    var nextArrival = moment(tnextArrival).format("hh:mm");
    

    $("#table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + nextArrival + "</td><td>" + tMinutesAway + "</td></tr>");
});