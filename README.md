jQuery Boxfit v1.2.3
======

http://michikono.github.io/boxfit

Boxfit is a jQuery plugin for resizing text. It will scale text to fit inside a fixed width div. Boxfit respects padding settings for the div. While boxfit will not scale images, it *will* handle text with other visual entities mixed in.

Usage
=====

(Optional) Install using bower:

    $ bower install -S jquery.boxfit

Include the library after jQuery (this example is pulling from the bower_components/ folder):

```html
<script src="bower_components/jquery.boxfit/dist/jquery.boxfit.min.js" type="text/javascript"></script>
```

Create a div:

```html
<div id="my-big-box" style="width: 500px; height: 500px">
  This is some text
</div>
```

Apply the transformer:

```javascript
$('#my-big-box').boxfit();
```

This will make the text appear very large to take up the entire 500x500 area as best it can.

By default, the script will fit text in a single line and vertically and horizontally center it like this:

```
---------------------------
|                         |
|          hello          | <= this text would be very large
|                         |    and fill up the whole box
---------------------------
```

Long strings are shrunk down to fit in the box. This may not always be desired. You can pass in arguments to make the text wrap across lines to try to fill out as much of the box as possible:

```javascript
$('#my-big-box').boxfit({multiline: true});
```

```
---------------------------
|         hello           |
|        this is          |
|         hello           |
---------------------------
```

What it's actually doing under the hood is converting

```html
<div id="my-big-box" style="width: 500px; height: 500px">
  This is some text
</div>
```

Into:

```html
<div id="my-big-box" style="width: 500px; height: 500px">
  <span style="font-size: ##">
    This is some text
  </span>
</div>
```

Then it applies styles to the span to center and align it. This span is EXTREMELY important as it is used to resize the inner text. The text is resized in a loop by changing the font-size attribute on the span tag. Therefor, for now, content inside the target DIV should be text only. If after 200 iterations, the script fails to find a suitable font-size, it will give up and spit out whatever the current state is. This can happen if you have wacky CSS or lack text inside the div.

Valid parameters:

- *align_middle*: (default true) set to false to disable vertical alignment behavior
- *align_center*: (default true) set to false to disable centering behavior (horizontal)
- *step_size*: (default 1) the amount to change each time - bigger numbers are faster but fit less perfectly
- *step_limit*: (default 200) the number of font size iterations we should step through until we give up
- *multiline*: (default false) set to true to allow the text to wrap
- *width*: manually set a width if you haven't set one explicitly via CSS
- *height*: manually set a height if you haven't set one explicitly via CSS
- *minimum_font_size*: (default 5) minimum font size (changing this may cause some "shrink" scenarios to overflow instead)
- *maximum_font_size*: (default null) set to the max font size you want for the element, if none is given there is no maximum

Demo
====
View the file at http://michikono.github.io/boxfit/demo.html for examples in action.


License
=======
Copyright Michi Kono. Boxfit uses the MIT license. More info here: http://www.opensource.org/licenses/mit-license.php

Releases
----------------------------
* `v1.2.3` Support for AMD/CJS
* `v1.2.2` Added a functional demo page and fixed an issue where line-heights would break wrapped text
* `v1.2.1` Updated project to use plain JavaScript instead of Coffee (manually converting patches was making maintenance a chore).
* `v1.2.0` Added support for re-running Boxfit, added support for running Boxfit for multiple elements at once.
* `v1.01`
