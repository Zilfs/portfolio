var cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 280) + "px; left: " + (e.pageX - 280) + "px;")
});