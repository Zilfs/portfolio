var cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
    cursor.setAttribute("style", "top: " + (e.pageY - 48) + "px; left: " + (e.pageX - 48) + "px;")
})