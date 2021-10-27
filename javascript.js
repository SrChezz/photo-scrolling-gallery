const container = document.querySelector(".container")

let pos = {top: 0, y:0, gap: 0 };

const mouseDownHandler = function (e) {
    container.classList.remove("container-scroll")
    pos = {
        top: container.scrollTop,
        y: e.clientY
    }

    document.addEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mouseup', mouseUpHandler)
}

const mouseMoveHandler = function (e) {
    pos.gap = e.clientY - pos.y;

    container.scrollTop = pos.top - pos.gap
}

const mouseUpHandler = function () {
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.removeEventListener('mouseup', mouseUpHandler)
    container.classList.add("container-scroll")
    pos.top = container.scrollTop;

    let test = pos.top % container.clientHeight;
    

    if (test > 200 && Math.sign(pos.gap) == -1) {
        container.scrollTop = pos.top - test + container.clientHeight;
    } else if (test < 400 && Math.sign(pos.gap) == +1)  {
        container.scrollTop = pos.top - test;
    } else {
        container.scrollTop = pos.top - test;
    }
}

container.addEventListener("mousedown", mouseDownHandler)

let isScrolling;
if (!isTouchDevice()) {
    container.addEventListener("scroll", function(e) {

        // Clear our timeout throughout the scroll
        clearTimeout(isScrolling);
    
        isScrolling = setTimeout(function() {
    
            if (container.scrollTop % container.clientHeight != 0) {
                let movement = (container.scrollTop - (container.scrollTop % container.clientHeight))
    
                if ((container.scrollTop % container.clientHeight) < (container.clientHeight / 2)) {
                    container.scrollTop = movement + container.clientHeight; 
                } else if ((container.scrollTop % container.clientHeight) < (container.clientHeight - 50)) {
                    container.scrollTop = movement; 
                }
    
    
                // console.log("Now, this also should look fine", container.scrollTop % container.clientHeight, container.clientHeight / 2)
            } else {
                // console.log("this should look fine")
            }
            
    
         }, 500);
    
        
    }, false)
}


function isTouchDevice() {
    return (('ontouchstart' in window) ||
       (navigator.maxTouchPoints > 0) ||
       (navigator.msMaxTouchPoints > 0));
  }





