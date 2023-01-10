//canvas fullscreen stuff
function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", function (e) {
    handleResize();
})


handleResize();