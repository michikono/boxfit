/*
 BoxFit v1.1 - jQuery Plugin
 (c) 2012 Michi Kono (michikono.com)
 License: http://www.opensource.org/licenses/mit-license.php
 To use: $('#target-div').boxFit()
 Will make the *text* content inside the div (or whatever tag) scale to fit that tag
 */

(function($) {
    return $.fn.boxfit = function(options) {
        var current_step, inner_span, next_font_size, original_height, original_text, original_width, settings, span;
        if (this.length === 0) {
            return $(this);
        }
        settings = {
            step_size: 1,
            step_limit: 200,
            align_middle: true,
            align_center: true,
            multiline: false,
            minimum_font_size: 5,
            maximum_font_size: null
        };
        $.extend(settings, options);
        if (!settings.multiline) {
            $(this).css('white-space', 'nowrap');
        }
        original_text = $(this).html();
        $(this).html("");
        if (settings.width) {
            original_width = settings.width;
            $(this).width(original_width + "px");
        } else {
            original_width = $(this).width();
        }
        if (settings.height) {
            original_height = settings.height;
            $(this).height(original_height + "px");
        } else {
            original_height = $(this).height();
        }
        if (settings.maxFontSize !== undefined) {
            settings.maxFont = true;
        }
        if (!original_width || !original_height) {
            if (window.console != null) {
                console.info("Set static height/width on target DIV before using boxfit! Detected width: '" + original_width + "'; height:' " + original_height + "'");
            }
            return $(this).html(original_text);
        } else {
            if ($("<div>" + original_text + "</div>").find("span.boxfitted").length === 0) {
                span = $($("<span></span>").addClass("boxfitted").html(original_text));
                $(this).html(span);
            } else {
                $(this).html(original_text);
                span = $($(original_text).find('span.boxfitted')[0]);
            }
            current_step = 0;
            inner_span = span;
            $(this).css("display", "table");
            inner_span.css("display", "table-cell");
            if (settings.align_middle) {
                inner_span.css("vertical-align", "middle");
            }
            if (settings.align_center) {
                $(this).css("text-align", "center");
                inner_span.css("text-align", "center");
            }
            inner_span.css("font-size", settings.minimum_font_size);
            while ($(this).width() <= original_width && $(this).height() <= original_height) {
                if (current_step++ > settings.step_limit) {
                    break;
                }
                next_font_size = parseInt(inner_span.css("font-size"), 10);
                if (settings.maximum_font_size && next_font_size > settings.maximum_font_size) {
                    break;
                }
                inner_span.css("font-size", next_font_size + settings.step_size);
            }
            inner_span.css("font-size", parseInt(inner_span.css("font-size"), 10) - settings.step_size);
            return $(this);
        }
    };
})(jQuery);
