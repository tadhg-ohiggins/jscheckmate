(function () {
    var checkMate = {
        init: function () {
            document.addEventListener("mousedown", checkMate.downer, true);
            var displayBox = document.createElement("div");
            displayBox.id = "checkMateDisplayBox";
            var dbStyle = displayBox.style;
            dbStyle.position = "absolute";
            dbStyle.display = "none";
            dbStyle.top = 0;
            dbStyle.left = 0;
            dbStyle.backgroundColor = "#CCCCCC";
            dbStyle.opacity = 0.5;
            document.body.appendChild(displayBox);
            checkMate.dbStyle = dbStyle;
        },
        downer: function (e) {
            e.preventDefault();
            checkMate.startX = e.pageX;
            checkMate.startY = e.pageY;
            checkMate.dbStyle.top = e.pageY + "px";
            checkMate.dbStyle.left = e.pageX + "px";
            checkMate.dbStyle.display = "block";
            document.addEventListener("mouseup", checkMate.upper, true);
            document.addEventListener("mousemove", checkMate.moved, true);
            document.removeEventListener("mousedown", checkMate.downer, true);

        },
        moved: function (e) {
            var currentX = e.pageX,
                currentY = e.pageY,
                dbStyle = checkMate.dbStyle,
                startX = checkMate.startX,
                startY = checkMate.startY;
            if (currentX > startX) {
                dbStyle.width = (currentX - startX) + "px";
            } else {
                dbStyle.left = currentX + "px";
                dbStyle.width = (startX - currentX) + "px";
            }
            if (currentY > checkMate.startY) {
                dbStyle.height = (currentY - startY) + "px";
            } else {
                dbStyle.top = currentY + "px";
                dbStyle.height = (startY - currentY) + "px";
            }
        },
        upper: function (e) {
            var endX = e.pageX,
                endY = e.pageY,
                startX = checkMate.startX,
                startY = checkMate.startY,
                rectangle = {};
            function setLR(obj, left, right) {
                obj.left = left;
                obj.right = right;
            }
            function setTB(obj, top, bottom) {
                obj.top = top;
                obj.bottom = bottom;
            }
            if (endX > startX) {
                setLR(rectangle, startX, endX);
            } else {
                setLR(rectangle, endX, startX);
            }
            if (endY > checkMate.startY) {
                setTB(rectangle, startY, endY);
            } else {
                setTB(rectangle, endY, startY);
            }
            document.removeEventListener("mouseup", checkMate.upper, true);
            document.removeEventListener("mousemove", checkMate.moved, true);
            checkMate.dbStyle.display = "none";
            checkMate.calculate(rectangle);
        },
        calculate: function (rectangle) {
            var checkboxes = checkMate.getCheckboxes(rectangle);
            function toggle(checkbox) {
                var newVal = !checkbox.getAttribute("checked");
                newVal = !checkbox.checked;
                checkbox.checked = newVal;
                checkbox.setAttribute("checked", newVal);
            }
            for (var i=0; i<checkboxes.length; i++) {
                toggle(checkboxes[i].elem);
            }
        },
        getCheckboxes: function (rectangle) {
            var inputs = document.getElementsByTagName("input");
            var checkboxes = [];
            for (var i=0; i<inputs.length; i++) {
                var this_input = inputs[i];
                if (this_input.type === "checkbox") {
                    var coords = checkMate.offset(this_input);
                    if (coords.left > rectangle.left && coords.left < rectangle.right) {
                        if (coords.top > rectangle.top && coords.top < rectangle.bottom) {
                            checkboxes.push({coords: coords, elem: this_input});
                        }
                    }
                }
            }
            return checkboxes;
        },
        offset: function (elem){
            var obj = elem.getBoundingClientRect();
            return {
                left: obj.left + document.body.scrollLeft,
                top: obj.top + document.body.scrollTop,
                width: obj.width,
                height: obj.height
            };
        }
    };
    checkMate.init();
})();
/*
 *  
 *  jsCheckMate, a simple bookmarklet for toggling checkbox element state.
 *
 *  Copyright © 2012 Tadhg O’Higgins
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
