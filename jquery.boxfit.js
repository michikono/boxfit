(function($) {
  return $.fn.boxFit = function(options) {
    var current_step, goal_achieved, inner_span, original_height, original_text, original_width, settings, x_padding, y_padding;
    settings = {
      step_limit: 1000,
      align_middle: true,
      align_center: true,
      multiline: false
    };
    $.extend(settings, options);
    if (!settings.multiline) {
      $(this).css('white-space', 'nowrap');
    }
    original_text = $(this).text();
    $(this).html("");
    $(this).prepend($('<span></span>').text(original_text));
    x_padding = parseInt($(this).css('padding-top'), 10) + parseInt($(this).css('padding-bottom'), 10);
    y_padding = parseInt($(this).css('padding-left'), 10) + parseInt($(this).css('padding-right'), 10);
    original_width = $(this).width();
    original_height = $(this).height();
    current_step = 0;
    goal_achieved = false;
    inner_span = $(this).children().first();
    while (inner_span.width() + x_padding < original_width || inner_span.height() + y_padding < original_height) {
      goal_achieved = true;
      if (current_step++ > settings.step_limit) {
        goal_achieved = false;
        break;
      }
      inner_span.css("font-size", parseInt(inner_span.css("font-size"), 10) + 1);
    }
    if (goal_achieved) {
      current_step = 0;
      while (inner_span.width() + x_padding > original_width || inner_span.height() + y_padding > original_height) {
        if (current_step++ > settings.step_limit) {
          break;
        }
        inner_span.css("font-size", parseInt(inner_span.css("font-size"), 10) - 1);
      }
    }
    if (settings.align_middle) {
      $(this).css('display', 'table');
      inner_span.css('display', 'table-cell');
      inner_span.css('vertical-align', 'middle');
    }
    if (settings.align_center) {
      return $(this).css('text-align', 'center');
    }
  };
})(jQuery);
