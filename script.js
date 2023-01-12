const mainTopArrow = document.getElementById("main-arrow-top"),
mainBottomArrow = document.getElementById("main-arrow-bottom"),
mainWraper = document.getElementById("main-wraper"),
html = document.getElementsByTagName("html"),
logo = document.getElementById("logo"),
logoText = document.getElementById("logo-text"),
menu = document.getElementById("menu"),
menuTextColor = document.getElementById("menu-text-color")
menuWraper = document.getElementById("menu-wraper"),
menuContent = document.getElementById("menu-content"),
menuLogo = document.getElementById("menu-logo"),
nav = document.getElementsByClassName("menu-element"),
realNav = document.getElementById("nav");
let mainWraperPosition = 0,
scroleRun = false,
menuState = false,
scrolState = true,
mainColor = "black",
height = window.innerHeight,
navColor = "black";

// blokada i od blokowanie scrola
function preventScreenScroll(e) {
    e.preventDefault();
    return false;
}
function preventScroll(e){
    e.preventDefault();
    return false;
}
function disableScroll() {
    scrolState = true;
    document.querySelector('.scrollable').addEventListener('touchmove', preventScreenScroll, {passive: false});
    document.querySelector('.scrollable').addEventListener('wheel', preventScroll, {passive: false});
}
function enableScroll() {
    scrolState = false;
    document.querySelector('.scrollable').removeEventListener('touchmove', preventScreenScroll, {passive: false});
    document.querySelector('.scrollable').removeEventListener('wheel', preventScroll, {passive: false});


}
// zmiana kolorów strzałek, loga i napisumenu 
function changeColor (color){
    if(color != mainColor){
        mainColor = color; 
        mainTopArrow.classList.toggle("black");
        mainBottomArrow.classList.toggle("black");
        menuTextColor.classList.toggle("white");
        logoText.classList.toggle("white");
    }
}
// scroll bar opsługa 
function scrollBarUse (){
    enableScroll();
    turnOffSlider();
    window.removeEventListener("scroll",scrollBarUse );
}
// przesuwanie
function moveMainWraper (direction){
    let position = mainWraperPosition + direction;
    if(position >= 0){
        navColor = "black";
    }else{
        navColor ="white";
    }
    changeColor(navColor);
    if(position > 0){
        return;
    }else{
        if(position < -200){
            window.removeEventListener("scroll",scrollBarUse);
            html[0].style.scrollBehavior="smooth"
            window.scrollTo(0,height);
            turnOffSlider();
        }else{
            mainWraperPosition = position;
            mainWraper.style.top = position + "%";
        }
    }
}
function moveMainWraperTouchScreen (direction){
    let position = mainWraperPosition + direction;
    if(position >= 0){
        navColor = "black";
    }else{
        navColor ="white";
    }
    changeColor(navColor);
    if(position > 0){
        return;
    }else{
        if(position < -200){
            window.removeEventListener("scroll",scrollBarUse);
            html[0].style.scrollBehavior="smooth"
            enableScroll();
            turnOffSlider();
        }else{
            mainWraperPosition = position;
            mainWraper.style.top = position + "%";
        }
    }
}

// przsuwanie scrolem
function scroll (e) {
    if(!scroleRun){
        scroleRun = true;
        let direction = e.deltaY;
        moveMainWraper(-direction,e);
        setTimeout(() => scroleRun = false, 500);
    };
}

// funkcje do opsługi menu
function menuOnOffTop() {
    if(!menuState){
        menuState = true;
        window.removeEventListener("wheel",scroll);
    }else {
        window.addEventListener("wheel", scroll);
        menuState = false;
    }
    menuWraper.classList.toggle("wraper-menu-on");
    menuContent.classList.toggle("menu-content-on");
}
function menuOnOffBottom() {
    if(!menuState){
        menuState = true;
        html[0].style.scrollBehavior="auto"; 
        disableScroll();
    }else {
        menuState = false;
        html[0].style.scrollBehavior="smooth";
        enableScroll();
    }
    menuWraper.classList.toggle("wraper-menu-on");
    menuContent.classList.toggle("menu-content-on");
}
function resetMenuListeners(direction) {
    if(direction == "top"){
        menuWraper.removeEventListener("click",menuOnOffBottom);
        menuLogo.removeEventListener("click",menuOnOffBottom);
        nav[2].removeEventListener("click",menuOnOffBottom);
        menuWraper.addEventListener("click",menuOnOffTop);
        menuLogo.addEventListener("click",menuOnOffTop);
        nav[2].addEventListener("click",menuOnOffTop);
        
    }
    if(direction == "bottom"){
        menuWraper.removeEventListener("click",menuOnOffTop);
        menuLogo.removeEventListener("click",menuOnOffTop);
        nav[2].removeEventListener("click",menuOnOffTop);
        menuWraper.addEventListener("click",menuOnOffBottom);
        menuLogo.addEventListener("click",menuOnOffBottom);
        nav[2].addEventListener("click",menuOnOffBottom);
    }
}
// włączenie i wyłączenie 
 function turnOnSlider() {
    window.addEventListener("wheel", scroll);
    document.addEventListener('touchstart',touchStart);
    document.addEventListener('touchend', touchEnd);
    resetMenuListeners("top");
    window.addEventListener("scroll",scrollBarUse);
 }
 function turnOffSlider() {
    window.removeEventListener("wheel",scroll);
    document.removeEventListener('touchstart',touchStart)
    document.removeEventListener('touchend', touchEnd)
    resetMenuListeners("bottom");
 }
// scrolowanie na dotykowych ekranach 
let touchendY = 0;
let touchstartY = 0;
function checkDirection() {
    if (touchendY < touchstartY) moveMainWraperTouchScreen(-100) 
    if (touchendY > touchstartY) moveMainWraperTouchScreen(100)
}
function touchStart(e) {
    touchstartY = e.changedTouches[0].screenY
}
function touchEnd(e) {
    touchendY = e.changedTouches[0].screenY
    checkDirection()
}
// listener żeby strzałki działały 
window.addEventListener("scroll", scrollControl);
window.addEventListener("wheel", scroll);
document.addEventListener('touchstart',touchStart)
document.addEventListener('touchend', touchEnd)
disableScroll();
menuWraper.addEventListener("click",menuOnOffTop);
menuLogo.addEventListener("click",menuOnOffTop);
nav[0].addEventListener("click",menuOnOffBottom);
nav[1].addEventListener("click",menuOnOffBottom);
nav[2].addEventListener("click",menuOnOffTop);
nav[3].addEventListener("click",menuOnOffBottom);
mainTopArrow.addEventListener("click",(e) => moveMainWraper(100,e));
mainBottomArrow.addEventListener("click",(e) => moveMainWraper(-100,e));


// funkcja co ma patrzeć na pozycje i reagować w razie potrzeby 
function scrollControl() {
    let scrolPosition = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log(scrolPosition);
    if(scrolPosition == 0) {
        changeColor(navColor);
        realNav.classList.remove("mobile-nav")
        disableScroll();
        turnOnSlider();
        html[0].style.scrollBehavior="auto"
    }
    if(scrolPosition > height - 1){
        changeColor("black")
        realNav.classList.add("mobile-nav")
        turnOffSlider();
        html[0].style.scrollBehavior="smooth"
        enableScroll();
    }
    if(scrolPosition < height){
        changeColor(navColor)
        realNav.classList.remove("mobile-nav")
    }
}