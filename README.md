boxfit
======

Boxfit will scale text to fit inside a fixed width div. As in, if you have a div that is 300x300 pixels, it will scale the text inside it to the maximum possible size before the text overflows.

Usage
=====

```html
<div id="my-big-box" style="width: 500px; height: 500px">This is some text</div>
```

```javascript
$('#my-big-box').boxfit();
```

This will make the text appear very large to take up the entire 500x500 area as best it can.

By default, the script will fit text in a single line and vertically and horizontally center it like this:

```
---------------------------
|                         |
|          hello          | <== this text would be very large and fill up the whole box
|                         |
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
<div id="my-big-box" style="width: 500px; height: 500px">This is some text</div>
```

Into:

```html
<div id="my-big-box" style="width: 500px; height: 500px"><span style="font-size: ##">This is some text</span></div>
```

Then it applies styles to the span to center and align it. This span is EXTREMELY important as it is used to resize the inner text. The text is resized in a loop by changing the font-size attribute on the span tag. Therefor, for now, content inside the target DIV should be text only. If after 1000 iterations, the script fails to find a suitable font-size, it will give up and spit out whatever the current state is. This can happen if you have wacky CSS or lack text inside the div.

Valid parameters:

- align_middle: set to false to disable horizontal alignment behavior
- align_center: set to false to disable centering behavior
- multiline: set to true to allow the text to wrap

Notice
======
This source code will be maintained in coffeescript and compiled over to JavaScript (just a personal preference). Patches can be submitted in either and I'll just re-write it.
