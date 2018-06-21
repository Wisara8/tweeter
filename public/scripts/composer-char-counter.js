$(document).ready(function() {
  // --- our code goes here ---
  // console.log("char counter text");
  let element = document.getElementsByClassName("textField");
  $(element).on('keyup', function(event) {
    let char = $(this).val().length;
    let remaining = 140 - char;
    // console.log(remaining);
    let counter = $(this).parent().children(".counter").html(remaining);
    if (remaining < 0) {
      $(counter).addClass('red');
    } else {
      $(counter).removeClass('red');
    };
  });

});