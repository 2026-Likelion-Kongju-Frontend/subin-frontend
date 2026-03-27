const btns = document.querySelectorAll(".timeline-item");
const secs = document.querySelectorAll("section");
const darkToggle = document.getElementById("darkToggle");
const bgToggle = document.getElementById("bgToggle");

btns.forEach(b =>
    b.onclick = () =>
        window.scrollTo({
            top: document.getElementById(b.dataset.target).offsetTop,
            behavior: "smooth"
        })
);

darkToggle.onchange = () => document.body.classList.toggle("dark");
bgToggle.onchange = () => document.body.classList.toggle("photo-mode");

window.onscroll = () => {
    let i = secs.length;
    while (--i && window.scrollY + 120 < secs[i].offsetTop) {}
    document.querySelector(".active")?.classList.remove("active");
    btns[i].classList.add("active");
};