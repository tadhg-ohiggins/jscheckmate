jsCheckMate
===========
Not chess, checkboxes. This is a small JavaScript utility bookmarklet meant to make it easier to toggle groups of checkboxes on a web page. Instead of having to click each checkbox individually, jsCheckMate lets you drag a rectangle around the checkboxes you want to change the state of.

Installation
------------
The easiest way to do it is to drag the following link to your browser's bookmarks:

.. raw:: html

    <a href='javascript:(function () {    var checkMate = {        init: function() {            document.addEventListener("mousedown", checkMate.downer, true);            var displayBox = document.createElement("div");            displayBox.id="checkMateDisplayBox";            var dbStyle = displayBox.style;            dbStyle.position = "absolute";            dbStyle.display = "none";            dbStyle.top = 0;            dbStyle.left = 0;            dbStyle.backgroundColor = "#CCCCCC";            dbStyle.opacity = 0.5;            document.body.appendChild(displayBox);            checkMate.dbStyle = dbStyle;        },        downer: function(e) {            e.preventDefault();            checkMate.startX = e.pageX;            checkMate.startY = e.pageY;            checkMate.dbStyle.top = e.pageY + "px";            checkMate.dbStyle.left = e.pageX + "px";            checkMate.dbStyle.display = "block";            document.addEventListener("mouseup", checkMate.upper, true);            document.addEventListener("mousemove", checkMate.moved, true);            document.removeEventListener("mousedown", checkMate.downer, true);        },        moved: function(e) {            var currentX = e.pageX;            var currentY = e.pageY;            var dbStyle = checkMate.dbStyle;            var startX = checkMate.startX;            var startY = checkMate.startY;            if (currentX > startX) {                dbStyle.width = (currentX - startX) + "px";            } else {                dbStyle.left = currentX + "px";                dbStyle.width = (startX - currentX) + "px";            };            if (currentY > checkMate.startY) {                dbStyle.height = (currentY - startY) + "px";            } else {                dbStyle.top = currentY + "px";                dbStyle.height = (startY - currentY) + "px";            };        },        upper: function(e) {            var endX = e.pageX;            var endY = e.pageY;            var startX = checkMate.startX;            var startY = checkMate.startY;            var rectangle = {};            function setLR(obj, left, right) {                obj.left = left;                obj.right = right;            }            function setTB(obj, top, bottom) {                obj.top = top;                obj.bottom = bottom;            }            if (endX > startX) {                setLR(rectangle, startX, endX);            } else {                setLR(rectangle, endX, startX);            };            if (endY > checkMate.startY) {                setTB(rectangle, startY, endY);            } else {                setTB(rectangle, endY, startY);            };            document.removeEventListener("mouseup", checkMate.upper, true);            document.removeEventListener("mousemove", checkMate.moved, true);            checkMate.dbStyle.display = "none";            checkMate.calculate(rectangle);        },        calculate: function(rectangle) {            var checkboxes = checkMate.getCheckboxes(rectangle);            function toggle(checkbox) {                console.log(checkbox);                var newVal = !checkbox.getAttribute("checked");                newVal = !checkbox.checked;                console.log(newVal);                checkbox.checked = newVal;                checkbox.setAttribute("checked", newVal);            }            for (var i=0; i<checkboxes.length; i++) {                toggle(checkboxes[i].elem);            }        },        getCheckboxes: function(rectangle) {            var inputs = document.getElementsByTagName("input");            var checkboxes = [];            for (var i=0; i<inputs.length; i++) {                this_input = inputs[i];                if (this_input.type == "checkbox") {                    var coords = checkMate.offset(this_input);                    if (coords.left > rectangle.left && coords.left < rectangle.right) {                        if (coords.top > rectangle.top && coords.top < rectangle.bottom) {                            checkboxes.push({coords: coords, elem: this_input});                        }                    }                }            }            return checkboxes;        },        offset: function(elem){            var obj = elem.getBoundingClientRect();            return {                left: obj.left + document.body.scrollLeft,                top: obj.top + document.body.scrollTop,                width: obj.width,                height: obj.height            };        }    };    checkMate.init();})();'>jsCheckMate</a>


If that doesn't work, you'll have to find the ``checkmate.js`` file in this repository, copy its contents, use your browser's bookmarks manager to create a new bookmark, then enter ``javascript:`` plus the copied contents of the file as its URL.

Usage
-----
Click the bookmark, then press and hold the mouse button. Holding the button down, drag the grey rectangle that appears around the checkboxes whose states you want toggled. Release the button to change the states of the checkboxes inside the grey rectangle.


Known Issues
------------
The browser will not scroll even if you try to pull the mouse cursor off the visible page while dragging. The workaround is to use the arrow or ``Page Up``/``Page Down`` keys to scroll the page while dragging.

Possible Future Features
------------------------
Multiple Rectangles
    Support multiple areas to define the sections in which checkboxes should be toggled, either by adding an element to the page to act as a control panel, or by allowing the use to hold down e.g. ``Shift`` in order to release the mouse without toggling state, and to then begin drawing further rectangles.
Keyboard Version
    This might simply be a separate project, but the basic idea would be to bind some key to allow cycling through checkboxes on the page, automatically toggling state when hitting each one, with a second key to toggle explicitly if needed and a third to exit this mode.

Copyright/License
-----------------
Copyright © 2012 Tadhg O’Higgins, licensed under the GPL v3; see ``license.txt`` for details.
