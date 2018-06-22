$(document).ready(function() {
  // --- our code goes here ---
  let element = document.getElementsByClassName("textField");
  $(element).on('keyup', function(event) {
    let char = $(this).val().length;
    let remaining = 140 - char;
    let counter = $(this).parent().children(".counter").html(remaining);
    if (remaining < 0) {
      $(counter).addClass('red');
    } else {
      $(counter).removeClass('red');
    };
  });

});