(function () {
    var checkMate = {
        init: function() {
            // Add Google CDN jQuery:
            jqEl = document.createElement("script");
            jqEl.setAttribute("type", "text/javascript");
            jqEl.setAttribute("src", "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js");
            document.getElementsByTagName("head")[0].appendChild(jqEl)
            this.downer();
        },
        downer: function(e) {
            alert("downer", e);
        }
    };
    checkMate.init();
})();

