(function($, _, KAVINISMS) {

"use strict";

// # Constants
var
    ANIM_END = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
    ANIM_IN = 'fadeInLeft',
    ANIM_OUT = 'zoomOut',
    VIDEO_ID = 'zKdwTgrow3E',
    EMBED = '<iframe style="position:fixed" width="1" height="1" frameborder="0" src="//www.youtube.com/v/' +
            VIDEO_ID + '?hd=1&autoplay=1&loop=1&playlist=,"></iframe>',
    SECRET = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

// # Globals
var
    $document = $(document),
    $body = $('body'),
    $ask = $('#ask'),
    $askFields = $('#ask-fields'),
    $kavinism = $('#kavinism'),
    first = true,
    kkeys = [];

// Out with the old, in with the new
// Pre - text is not visible (animationed out or otherwise)
// Post - form re-enabled
var kavinismHandler = function() {
  $kavinism.html(_.sample(KAVINISMS));
  $kavinism.removeClass(ANIM_OUT).addClass(ANIM_IN).one(ANIM_END, function() {

    // Re-enable form
    $askFields.prop('disabled', false);
  });
};

// # Page ready
$(function() {

  $ask.submit(function(e) {
    e.preventDefault();

    // Gotta be a question
    if (!$('#question').val().length)
      return;

    // Disable form until animation done
    $askFields.prop('disabled', true);

    // Take care of the first animation
    if (first) {
      first = false;
      kavinismHandler();
    } else {
      $kavinism.removeClass(ANIM_IN).addClass(ANIM_OUT).one(ANIM_END, kavinismHandler);
    }
  });

  // shhhh
  var secretFunc;
  $document.keydown(secretFunc = function(e) {
    kkeys.push(e.keyCode);
    if (kkeys.length > SECRET.length)
      kkeys.shift();
    if (_.isEqual(kkeys, SECRET)) {
      $document.unbind('keydown', secretFunc);
      $body.append(EMBED);
    }
  });
});

})(window.jQuery, window._, window.KAVINISMS);
