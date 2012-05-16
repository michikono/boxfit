/*
 BoxFit v1.0 - jQuery Plugin
 (c) 2012 Michi Kono (michikono.com)
 License: http://www.opensource.org/licenses/mit-license.php
 to use: $('#target-div').boxfit()
 Will make the *text* content inside the div (or whatever tag) scale to fit that tag
 */
(function($) {
    return $.fn.boxfit = function(options) {
        var current_step, inner_span, original_height, original_text, original_width, settings, size, x_padding, y_padding, _results;
        settings = {
            step_limit: 200,
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
        original_width = $(this).width();
        original_height = $(this).height();
        if (!original_width || !original_height) {
            if (window.console != null) {
                console.info('Set static height/width on target DIV before using boxfit!');
            }
            return $(this).text(original_text);
        } else {
            $(this).prepend($('<span></span>').text(original_text));
            x_padding = parseInt($(this).css('padding-left'), 10) + parseInt($(this).css('padding-right'), 10);
            y_padding = parseInt($(this).css('padding-top'), 10) + parseInt($(this).css('padding-bottom'), 10);
            current_step = 0;
            inner_span = $(this).children().first();
            while (inner_span.width() < original_width - x_padding && inner_span.height() < original_height - y_padding) {
                if (current_step++ > settings.step_limit) {
                    break;
                }
                inner_span.css("font-size", parseInt(inner_span.css("font-size"), 10) + 1);
            }
            if (settings.align_middle) {
                $(this).css('display', 'table');
                inner_span.css('display', 'table-cell');
                inner_span.css('vertical-align', 'middle');
            }
            if (settings.align_center) {
                $(this).css('text-align', 'center');
            }
            current_step = 0;
            _results = [];
            while ($(this).height() > original_height || $(this).width() > original_width) {
                size = parseInt(inner_span.css("font-size"), 10) - 1;
                if (size <= 4) {
                    break;
                }
                _results.push(inner_span.css("font-size", size));
            }
            return _results;
        }
    };
})(jQuery);