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
    frequency: trainFrequency
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

    $("#table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFrequency + "</td><td>" + "placeholder" + "</td><td>" + "placeholder2" + "</td></tr>");
});