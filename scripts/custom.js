$(document).ready(function(){

  $(".form-overlay").hide();
  $("#exitMap").hide();
  $("overlay-container").hide();
  $("#guidance-info-box").hide();

  /* Scrolling Navbar */
  // var scroll_start = 0;
  // var startchange = $('.navbar');
  // var offset = startchange.offset();

  //  $(document).scroll(function() { 
  //     scroll_start = $(this).scrollTop();
  //     if(scroll_start > offset.top) {
  //         $('.navbar').css('background-color', 'rgba(255, 248, 224, .8)');
  //      } else {
  //         $('.navbar').css('background-color', 'transparent');
  //      }
  //  });

// Starting Form Flow

  $(".addEvent").on("click", function(){
      fadeThisIn($("#guidance-overlay"));
    //   $('.form-overlay').fadeIn();
      if ($(window).width() < 468) {
        $(".noscroll").css("overflow", "hidden");
      }
  });

  $("#try-it").on("click", function(){
        // $('.form-overlay').show();
      fadeThisIn($("#locationForm"));
      fadeThisOut($("#guidance-overlay"));
    });

   $("#no-thanks").on("click", function(){
        fadeThisOut($("#guidance-overlay"));
        $(".noscroll").css("overflow", "scroll");
    });

  $(".exitLocationBtn").on("click", function(){
    fadeThisOut($("#locationForm"));
    $(".noscroll").css("overflow", "scroll");
  });

// Homepage
//   $("#addEventHomepage").on("click", function(){
//     fadeThisIn($("#locationForm"));
//     $(".home-elements").hide();
//     $(".mapPrompts").hide();
//   });

/* USER DENYS TO ADD MORE DETAILS */
  $("#deny").on("click", function(){
    fadeThisOut($("#form-start-overlay"));
    fadeThisIn($("#confirmExit"));
  });   

/* USER ACCEPTS TO ADD MORE DETAILS*/
  $("#accept").on("click", function(){
   fadeThisOut($("#form-start-overlay"));
   fadeThisIn($("#userGender"));
   $("#pac-input").hide();
  });
  
  //This is selecting type of location
  //locationRangeBtn
  $(".navyBtn").on("click", function(){
   
      $("#locationForm").fadeOut(600);
      $("#guidance-info-box").show();
      // $(".home-elements").show();
      // $("#addPrompt").show();
      // $("#exitMap").show();
      
      
      //console.log('this',this);
      userKey = $(this).parent().parent().data("value");
      userObject[userKey] = $(this).val();
  })

  $("#guidance-info-box-ok").on("click", function(){
      $("#guidance-info-box").fadeOut(600);
      //Enabling dropping of pin
      mapObject.seeMap = false;
      clearMarkers();
  })


// Form controls
  $(".answerBtn").on("click", function() {
     current_fs = $(this).parent().parent();
	   next_fs = $(this).parent().parent().next();
     current_fs.fadeOut(600);
	   next_fs.fadeIn(600); 
     userKey = $(this).parent().parent().data("value");
     userObject[userKey] = $(this).val();
    //  console.log(userObject);
  });

  $(".backBtn").on("click", function() {
      current_fs = $(this).parent().parent();
	    previous_fs = $(this).parent().parent().prev();
      current_fs.hide();
	    previous_fs.show(); 
  });

  $(".skipBtn").on("click", function() {
    current_fs = $(this).parent().parent();
	  next_fs = $(this).parent().parent().next();
    current_fs.fadeOut(600);
	  next_fs.fadeIn(600); 
  });

//Subfields
/* DATE PAGES ********************** */
  $("#dateSpec-skipBtn").click(function(){
    currentPage = $(this).parent().parent();
    nextPage = $("#multipleAssaults");
    currentPage.fadeOut(600);
    nextPage.fadeIn(600);
  });

  $(".dateBtn1").click(function(){
   currentPage = $(this).parent().parent();
   nextPage = $("#dateRange1");
   currentPage.fadeOut(600);
   nextPage.fadeIn(600);
   userKey = $(this).parent().parent().data("value");
   userObject[userKey] = $(this).val();
 });

 $(".dateBtn2").click(function(){
   currentPage = $(this).parent().parent();
   nextPage = $("#dateRange2");
   currentPage.fadeOut(600);
   nextPage.fadeIn(600);
   userKey = $(this).parent().parent().data("value");
   userObject[userKey] = $(this).val();
 });

  $(".noDateBtn").click(function(){
   currentPage = $(this).parent().parent();
   nextPage = $("#multipleAssaults");
   currentPage.fadeOut(600);
   nextPage.fadeIn(600);
 });

  $("#saveDate1").click(function(){
   currentPage = $(this).parent().parent();
   nextPage = $("#multipleAssaults");
   currentPage.fadeOut(600);
   nextPage.fadeIn(600);
   userKey = $(this).parent().parent().data("value");
   userObject[userKey] = $("#dateStart1").val() + " - " + $("#dateEnd1").val();
  });

 $("#date1-skipBtn").click(function(){
    currentPage = $(this).parent().parent();
    nextPage = $("#multipleAssaults");
    currentPage.fadeOut(600);
    nextPage.fadeIn(600);
  });


  $("#saveDate2").click(function(){
   currentPage = $(this).parent().parent();
   nextPage = $("#multipleAssaults");
   currentPage.fadeOut(600);
   nextPage.fadeIn(600);
   userKey = $(this).parent().parent().data("value");
   userObject[userKey] = $("#dateStart2").val() + " - " + $("#dateEnd2").val();
 });

$("#date2-backBtn").click(function(){
   currentPage = $(this).parent().parent();
   previousPage = $("#dateSpecificity");
   currentPage.fadeOut(600);
   previousPage.fadeIn(600);
 });

/* MULTIPLE ASSAULTS CONTROL BUTTONS */
  $("#multipleA-backBtn").click(function(){
   currentPage = $(this).parent().parent();
   previousPage = $("#dateSpecificity");
   currentPage.fadeOut(600);
   previousPage.fadeIn(600);
 });

 /* SCHOOL CAMPUS CONTROL BUTTONS */
  $(".notCampusBtn").click(function(){
    currentPage = $(this).parent().parent();
    nextPage = $("#reported");
    currentPage.fadeOut(600);
    nextPage.fadeIn(600);
    userKey = $(this).parent().parent().data("value");
    userObject[userKey] = $(this).val();
  });

  $("#saveCampusBtn").click(function(){
   currentPage = $(this).parent().parent();
   nextPage = $(this).parent().parent().next();
   currentPage.fadeOut(600);
   nextPage.fadeIn(600);
   userKey = $(this).parent().parent().data("value");
   userObject[userKey] = $("#campusC-box").val();
  });

  $("#campus-skipBtn").click(function(){
    currentPage = $(this).parent().parent();
    nextPage = $("#reported");
    currentPage.fadeOut(600);
    nextPage.fadeIn(600);
  });

/* REPORTED CONTROL BUTTONS ******* */
  $("#notReportedBtn").click(function(){
   currentPage = $(this).parent().parent();
   nextPage = $("#confirmSubmit");
   currentPage.fadeOut(600);
   nextPage.fadeIn(600);
  }); 

  $("#reportedBackBtn").click(function(){
   currentPage = $(this).parent().parent();
   previousPage = $("#schoolCampus");
   currentPage.fadeOut(600);
   previousPage.fadeIn(600);
  });

  $("#reportedSkipBtn").click(function(){
    currentPage = $(this).parent().parent();
    nextPage = $("#confirmSubmit");
    currentPage.fadeOut(600);
    nextPage.fadeIn(600);
  });

  $(".prosecutedBtn").click(function(){
  //  currentPage = $(this).parent();
   nextPage = $(this).parent().next();
  //  currentPage.fadeOut(600);
   nextPage.fadeIn(600);
   userKey = $(this).parent().data("value");
   userObject[userKey] = $(this).val();
 });

//Exit Buttons
  $(".exitBtn").on("click", function() {
    $("#confirmExit").show();
  });

  $("#confirmExit > #exitYes").on("click", function() {
    $(".form-overlay").fadeOut();
    $("#seePrompt").fadeIn();
    $("#pac-input").fadeIn();
    fadeThisIn($(".home-elements"));
    $(".noscroll").css("overflow", "scroll");
  });

  $("#exitNo").on("click", function() {
    $("#confirmExit").hide();
  });

  $(".exitYesDelete").on("click", function() {
    document.getElementById("resetForm").reset();
    $(".form-overlay").fadeOut();
    $("#seePrompt").fadeIn();
    $("#pac-input").fadeIn();
    fadeThisIn($(".home-elements"));
    $(".noscroll").css("overflow", "scroll");
  });

  $("#exitMapBtn").click(function(){
      $(".home-elements").hide();
      $("#addPrompt").hide();
      $("#exitMap").hide();
      fadeThisIn($("#homepage-overlay"));
      $(".noscroll").css("overflow", "scroll");
  });
    
// Submit
      
  $("#submitBackBtn").click(function(){
   currentPage = $(this).parent().parent();
   currentPage.fadeOut(600);
   fadeThisIn($("#reported"));
  });

  $(".end-submit").on("click", function() {
    $("#confirmSubmit").hide();
    $("#form-thankYou").show();
    mapObject.seeMap = true;
  })

  $("#end-return").on("click", function(){
    $(".form-overlay").hide();
    fadeThisIn($(".home-elements"));
    fadeThisIn($("#seePrompt"));
    mapObject.seeMap = true;
  });

  // Privacy
  // $(".privacy-policy, #privacyLink").on("click", function() {
  //   $("#ppolicy").show();
  // });

  // $(".exitPrivacy").on("click", function(){
  //   $("#ppolicy").hide();
  // });

}); //document.ready
