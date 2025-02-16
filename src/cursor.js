$(document).ready(function () {
    var cursor = document.querySelector(".cursor");
    $(document).on("mousemove", function (event) {
        cursor.setAttribute("style", "top: " + (event.pageY - $(".cursor-space").offset().top - 280) + "px; left: " + (event.pageX - 280) + "px;");
    });
});



