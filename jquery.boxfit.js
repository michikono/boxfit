(function($) {
    return $.fn.boxfit = function(options) {
        var current_step, inner_span, original_height, original_text, original_width, settings, size, span, x_padding, y_padding, _results;
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
            span = $('<span></span>').text(original_text);
            $(this).prepend(span);
            x_padding = parseInt($(span).css('padding-left'), 10) + parseInt($(this).css('padding-right'), 10);
            y_padding = parseInt($(span).css('padding-top'), 10) + parseInt($(this).css('padding-bottom'), 10);
            current_step = 0;
            inner_span = $(this).children().first();
            while (inner_span.width() < original_width - x_padding || inner_span.height() < original_height - y_padding) {
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
            while ($(this).width() > original_width || $(this).height() > original_height) {
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