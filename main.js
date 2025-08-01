const more = document.getElementById("more");
const moreBox = document.getElementById("more_box_popup");
const closeBtn = document.getElementById("close_btn");
const overlays = document.querySelectorAll(".overlay");
const zoomPopup = document.getElementById("zoom_img");
const zoomBoxes = document.querySelectorAll(".zoom_box");
const tabs = document.querySelectorAll(".tab");
const sections = document.querySelectorAll(".section");
const barsIcon = document.getElementById("bars_icon");
const barsWrapper = document.getElementById("bars_wrapper");
const bars = document.querySelectorAll(".bar");

more.addEventListener("click", () => {
    moreBox.classList.add("active");
});

barsIcon.addEventListener("click", () => {
    barsWrapper.classList.toggle("active");
});

closeBtn.addEventListener("click", () => {
    moreBox.classList.remove("active");
});

function closeAllZoomBoxes() {
    zoomBoxes.forEach(box => box.style.display = "none");
    document.body.style.overflow = "";
    zoomPopup.style.display = "none";
};

overlays.forEach((overlay, index) => {
    overlay.addEventListener("click", () => {
        closeAllZoomBoxes();
        zoomPopup.style.display = "block";
        zoomBoxes[index].style.display = "flex";
        document.body.style.overflow = "hidden";
    });
});

zoomBoxes.forEach(box => {
    const images = box.querySelectorAll("img");
    const nextBtn = box.querySelector(".next_arrow");
    let currentIndex = 0;

    if (images.length <= 1) {
        nextBtn.style.display = "none";
    };
    
    if (nextBtn && images.length > 1) {
        nextBtn.addEventListener("click", () => {
        images[currentIndex].style.display = "none";
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.display = "block";
    });
    };
    
    const closeZoom = box.querySelector("#close_btn_zoom");
    closeZoom.addEventListener("click", () => {
        closeAllZoomBoxes();
    });
});

function updateHeight() {
    const activeSection = document.querySelector(".section.active");
    const sectionWrapper = document.querySelector(".section_wrapper");

    if (sectionWrapper && activeSection) {
        sectionWrapper.style.height = activeSection.scrollHeight + "px";
    };
};

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);

        if (!targetSection) return;

        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");

        sections.forEach(section => section.classList.remove("active"));
        targetSection.classList.add("active");

        const imgs = targetSection.querySelectorAll("img");
        let loaded = 0;

        if (imgs.length > 0) {
            imgs.forEach(img => {
                if (img.complete) loaded++;
                else img.addEventListener("load", () => {
                    loaded++;
                    if (loaded === imgs.length) updateHeight();
                });
            });
            if (loaded === imgs.length) {
                updateHeight();
            };
        } else {
            updateHeight();
        };
        
        targetSection.addEventListener("transitionend", function handler(e) {
            if (e.propertyName === "transform") {
                updateHeight();
                targetSection.removeEventListener("transitionend", handler);
            };
        });
    });
});

bars.forEach(bar => {
    bar.addEventListener("click", () => {
        const targetId = bar.getAttribute("data-target");
        const targetSection = document.getElementById(targetId);

        if (!targetSection) return;

        bars.forEach(b => b.classList.remove("active"));
        bar.classList.add("active");

        sections.forEach(section => section.classList.remove("active"));
        targetSection.classList.add("active");

        const imgs = targetSection.querySelectorAll("img");
        let loaded = 0;

        if (imgs.length > 0) {
            imgs.forEach(img => {
                if (img.complete) loaded++;
                else img.addEventListener("load", () => {
                    loaded++;
                    if (loaded === imgs.length) updateHeight();
                });
            });
            if (loaded === imgs.length) {
                updateHeight();
            };
        } else {
            updateHeight();
        };
        
        targetSection.addEventListener("transitionend", function handler(e) {
            if (e.propertyName === "transform") {
                updateHeight();
                targetSection.removeEventListener("transitionend", handler);
            };
        });

        barsWrapper.classList.remove("active");

    });
});

window.addEventListener("DOMContentLoaded", () => {
    const firstTab = document.querySelector(".tab");
    const firstSection = document.querySelector(".section");
    
    if (firstTab && firstSection) {
        firstTab.classList.add("active");
        firstSection.classList.add("active");
        
        const imgs = firstSection.querySelectorAll("img");
        let loaded = 0;

        if (imgs.length > 0) {
            imgs.forEach(img => {
                if (img.complete) loaded++;
                else img.addEventListener("load", () => {
                    loaded++;
                    if (loaded === imgs.length) updateHeight();
                });
            });
            if (loaded === imgs.length) {
                updateHeight();
            };
        } else {
            updateHeight();
        };
    };  
});