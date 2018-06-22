/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$('#document').ready(function(e) {
  function createTweetElement(tweetData) {

    let $tweet = $('<article>').addClass("tweeted");

      let $header = $('<header>').addClass('userHeader');
      let $img = $('<img>').attr('src', tweetData.user.avatars.small);
      $header.append($img);

      let $name = $('<h2>').text(tweetData.user.name);
      $header.append($name);

      let $handle = $('<p>').text(tweetData.user.handle);
      $header.append($handle);

    $tweet.append($header);

      let $div = $('<div>').text(tweetData.content.text);

    $tweet.append($div);
      let now = + new Date();
      //returns readable date in seconds, minutes, etc... with no decimal placest.
      let ago = humanizeDuration((now - tweetData.created_at), {round: true, largest: 1});
      console.log(now);
      let $footer = $('<footer>').addClass('userFooter');
      let $created = $('<p>').text('Created at: ' + ago);

      $footer.append($created);

      let $flagIcon= $('<i>').addClass('fa fa-flag');
      let $heartIcon= $('<i>').addClass('fa fa-heart');
      let $retweetIcon= $('<i>').addClass('fa fa-retweet');
      let $footerIcons = $('<span>').addClass('icons');

      $footerIcons.append($flagIcon);
      $footerIcons.append($heartIcon);
      $footerIcons.append($retweetIcon);

      $footer.append($footerIcons);
    $tweet.append($footer);

    return $tweet;
  }

  function loadTweets() {
    $.ajax({
          url: '/tweets',
          method: 'GET',
          success: function (tweetData) {
            renderTweets(tweetData);
          }
    });
  };

  function renderTweets(tweets) {
    tweets.forEach(tweet => {
      var $tweet = createTweetElement(tweet);
      $('#tweets-container').prepend($tweet);
     })
  };

  $('#compose').on('click', function(e) {
    $('.new-tweet').slideToggle("slow", function() {
      $('.textField').focus();
    });
  });

  $('form').on('submit', function(e) {
    e.preventDefault();

    // 1. Get the data from the from
    let data = $('form').serialize();
    if ($('form textarea').val() === '') {
      alert("Text Area is Empty!");
    }
    else if ($('form textarea').val().length > 140) {
      alert("Too Many Characters!");
    } else {
      // 2. Make a AJAX request using that data
      $.ajax('/tweets', {
        method: 'POST',
        data: data
      }).done(function(newTweet) {
        loadTweets();
        $('form textarea').val('')
        $('.counter').html(140);
      });
    }
  });

  loadTweets();
});

