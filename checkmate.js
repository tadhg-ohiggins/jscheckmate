(function () {
    var checkMate = {
        init: function() {
            document.addEventListener("mousedown", checkMate.downer, true);
        },
        downer: function(e) {
            checkMate.start_x = e.pageX;
            checkMate.start_y = e.pageY;
            e.preventDefault();
            document.addEventListener("mouseup", checkMate.upper, true);
            document.removeEventListener("mousedown", checkMate.downer, true);
        },
        upper: function(e) {
            checkMate.end_x = e.pageX;
            checkMate.end_y = e.pageY;
            checkMate.rectangle = {};
            if (checkMate.end_x > checkMate.start_x) {
                checkMate.rectangle.left = checkMate.start_x;
                checkMate.rectangle.right = checkMate.end_x;
            } else {
                checkMate.rectangle.left = checkMate.end_x;
                checkMate.rectangle.right = checkMate.start_x;
            };
            if (checkMate.end_y > checkMate.start_y) {
                checkMate.rectangle.top = checkMate.start_y;
                checkMate.rectangle.bottom = checkMate.end_y;
            } else {
                checkMate.rectangle.top = checkMate.end_y;
                checkMate.rectangle.bottom = checkMate.start_y;
            };
            document.removeEventListener("mouseup", checkMate.upper, true);
            checkMate.calculate();
        },
        calculate: function() {
            var checkboxes = checkMate.getCheckboxes();
            console.log(checkMate.start_x, checkMate.start_y, checkMate.end_x, checkMate.end_y);
            for (var i=0; i<checkboxes.length; i++) {
                this_box = checkboxes[i];
                newVal = !this_box.inp.getAttribute("checked");
                this_box.inp.checked = newVal;
                this_box.inp.setAttribute("checked", newVal);
            }

        },
        getCheckboxes: function() {
            var inputs = document.getElementsByTagName("input");
            var checkboxes = [];
            for (var i=0; i<inputs.length; i++) {
                this_input = inputs[i];
                console.log(this_input.type);
                if (this_input.type == "checkbox") {
                    var coords = checkMate.offset(this_input);
                    console.log(coords, checkMate.rectangle);
                    if (coords.left > checkMate.rectangle.left && coords.left < checkMate.rectangle.right) {
                        console.log(coords.left, checkMate.rectangle);
                        if (coords.top > checkMate.rectangle.top && coords.top < checkMate.rectangle.bottom) {
                            console.log("inserting");
                            checkboxes.push({coords: coords, inp: this_input});
                        }
                    }
                }
            }

            window["checkboxes"] = checkboxes;
            return checkboxes;

        },
        offset: function(elm){
            var obj = elm.getBoundingClientRect();
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
