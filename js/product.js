var current_index;  //index for the large picture to be altered so we can keep track
var bigimg; //the actual large image element 
var smallimgs; //the collection of small images

window.onload = function () {
    // we start by initiating the values of our globals so that they are set to something
    current_index = 0;

    bigimg = document.getElementById("img_big");

    smallimgs = document.getElementsByClassName("small_img");

    //add eventlisteners

    //to large image

    bigimg.onclick = clicklistenerbig;


    //to small images and add an index to each one

    for (let i = 0; i < smallimgs.length; i++) {
        smallimgs[i].onclick = clicklistenersmall;
        smallimgs[i].setAttribute("data-index", i);
    }

    //to outside of overlay img/buttons so that it can disapear again

    document.getElementById("overlay").addEventListener("click", overlay_remove);

    //to buttons.
    //Remember to stop the flow so the overlay doesnt disapear using stopPropagation

    document.getElementById("previous_img").addEventListener("click",
        function (theEvent) {
            theEvent.stopPropagation();
            back();
        });
    document.getElementById("next_img").addEventListener("click",
        function (theEvent) {
            theEvent.stopPropagation();
            forward();
        }
    );

    //and to keyevents for the overlay

    document.addEventListener("keydown", key_listener);

}

// mark the chosen small picture
// add a listen to the pictures with a new function for the opening toggle

window.addEventListener("load", init);
function init() {
    let borders = document.querySelectorAll(".small_pictures img");
    for (let border of borders) {
        border.addEventListener('click', toggleHighlight);
    }
}

// toggle the border

function toggleHighlight(e) {
    let highlighted_elems = this.parentNode.querySelectorAll("img.highlight");
    let wasSelected = this.classList.contains("highlight");
    for (let elem of highlighted_elems) {
        elem.classList.remove("highlight");
    }
    if (!wasSelected) {
        this.classList.add("highlight");
    }
}

//handle overlay visability

function overlay_show() {
    //toggle class for overlay on by adding .visable
    document.getElementById("overlay").classList.add("visable");

}

function overlay_remove() {
    document.getElementById("overlay").classList.remove("visable");
}

//changing the image

function change_overlay_image_from_index(index) {
    //use a querySelector to get the right src to change
    document.querySelector("#overlay .overlay_img").src = smallimgs[index].dataset.srcbig;
    //remember to change current index
    current_index = index;
}

//listener functions for the pictures

function clicklistenersmall() {
    //set big img src to small img src data src
    bigimg.src = this.dataset.srcbig;
    //change index for big img to the img index
    current_index = this.dataset.index;
}

function clicklistenerbig() {
    //find and set overlay img src to imgbigsrc
    let overlay_all = document.getElementsByClassName("overlay_img");
    let overlay = overlay_all[0];

    overlay.src = bigimg.src;
    //show overlay
    overlay_show();
}

// mark the chosen small picture
// add a listen to the pictures with a new function for the opening toggle

window.addEventListener("load", init);
function init() {
    let borders = document.querySelectorAll(".small_pictures img");
    for (let border of borders) {
        border.addEventListener('click', toggleHighlight);
    }
}

// toggle the border

function toggleHighlight(e) {
    let highlighted_elems = this.parentNode.querySelectorAll("img.highlight");
    let wasSelected = this.classList.contains("highlight");
    for (let elem of highlighted_elems) {
        elem.classList.remove("highlight");
    }
    if (!wasSelected) {
        this.classList.add("highlight");
    }
}

//handle overlay visability

function overlay_show() {
    //toggle class for overlay on by adding .visable
    document.getElementById("overlay").classList.add("visable");

}

function overlay_remove() {
    document.getElementById("overlay").classList.remove("visable");
}


//forward and backwards functions for overlay scroll

//keylistner function so we can use the arrowkeys to scroll through the images in the overlay

function key_listener(pressed_key) {
    if (pressed_key.key == "ArrowRight") {
        forward();
    } else if (pressed_key.key == "ArrowLeft") {
        back();
    }

}


function forward() {
    // make sure that when the index matches the length of smallimgs index becomes index 0 so we dont go out of bounds
    let index = current_index + 1;
    if (index == smallimgs.length || index > smallimgs.length) {
        index = 0;
    }
    change_overlay_image_from_index(index);
}

function back() {
    // make sure that when the index is -1 index becomes index smallimgs.length -1 so we dont go out of bounds
    let index = current_index - 1;
    if (index < 0) {
        index = smallimgs.length - 1;
    }
    change_overlay_image_from_index(index);

}