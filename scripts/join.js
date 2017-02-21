$(document).ready(function(){

var firebaseEmail = new Firebase("https://join-emails.firebaseio.com/");

var userEmailObject;

$("#join-submit").on("click", function(){
    // userEmailObject = $("#inputEmail1").val();
    // firebaseEmail.push(userEmailObject);
    alert("Thank you!");
});

});
