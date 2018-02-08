//script. js

// wrap the whole content inside an IIFE (Immediately Invoked Function Expression) (read iffy)

/*(function () {
	all our code here;
})();*/

/*

 * how to write an iffy:
 step 1: write 2 sets of brackets
 ()()


 * the first set is an expression, the second one invokes the expression
 (expression)(invocation of the expression)

 * step 2: the expression is a function with no name (anonymous function) that contains all your logic
 (function() {})()


 * step 3: put all your code inside the anonymous function
 (function() {
 all the code in here
 })();
 */

/*
 instead of
 let a = 1;
 let b = 2;
 let c = 3;

 USE THIS:
 let
	 a = 1,
	 b = 2,
	 c = 3
 ;

 CONSTANTS ARE VARIABLES THAT CANNOT BE MODIFIED
 syntax :
 const	constName = constValue;

 instead of
 const a = 1;
 const b = 2;
 const c = 3;

 USE THIS:
 const
	 a = 1,
	 b = 2,
	 c = 3
 ;

 */


/*
 1) 	create your iffy
 2) 	fetch DOM elements and store them into constants
 2.1) 	store other values into variables
 3) 	set up your initialising pattern
 4) 	subscribe handlers to events on elements
 5) 	implement handlers
 */


(function() {


//---------------DECLARE VARIABLES AT THE TOP
const
//----
	fooBtn			=	document.getElementById("fooBtn"),
	currentDate		= 	document.getElementById("currentDate"),
	currentHours	= 	document.getElementById("currentHours"),
	currentMinutes	= 	document.getElementById("currentMinutes"),
    currentSeconds	= 	document.getElementById("currentSeconds"),
	smiley			=	document.getElementById("smiley"),
	smileyBtn		=	document.getElementById("smileyBtn"),
	resDiv			=	document.getElementById("resDiv"),
	reduceBtn		=	document.getElementById("reduceBtn"),
	normaliseBtn	=	document.getElementById("normaliseBtn"),
	enlargeBtn		=	document.getElementById("enlargeBtn"),
	redBtn			=	document.getElementById("redBtn"),
	blackBtn		=	document.getElementById("blackBtn"),
	animPic			= 	document.getElementById("animPic"),
	moveLeftBtn		= 	document.getElementById("moveLeftBtn"),
	moveRightBtn	= 	document.getElementById("moveRightBtn"),
	/**
	 * ===========================================
	 * selecting multiple elements using className
	 * ===========================================
	 * this will return a nodeList (HTMLcollection)
	 * array-like object => we can loop through it
	 *
	 */
	animBtns 		=	document.getElementsByClassName("animBtns"),
	gPic			=	document.getElementById("gPic"),
	prevBtn			= 	document.getElementById("prevBtn"),
	nextBtn			=	document.getElementById("nextBtn"),

	path 			= 	'assets/imgs/'
	// other constants here...
;

let
//---- flag for smiley pic change
	smiling 	= false,

//---- variable for car animation
	leftMargin 	= 0,

	// array that holds all the names of our files
	pics		=	["img_01.png","img_02.png",
            		"img_03.png","img_04.png", "car_left.png", "smiley_happy.png"],
	
	
//---- pointer for gallery
	index = 0
	
	
;

/**
 * INITIALISING
 * PATTERN
 * we want our logic to start working
 * ONLY AFTER the window object has been fully loaded
 */
//onload initialiser
window.onload = init;

//init foo
function init() {
	bindBtns();
	loadDate();
	// console.log(animBtns);
}//end init

/**
 * ====================================================
 * MANIPULATING ATTRIBUTES
 * * el.attributeName = value (only works for existing attributes)
 *
 * * WRITE MODE
 * el.setAttribute(attrName, attrValue)
 *
 * * READ MODE
 * el.getAttribute(attrName)
 *
 * * DELETE MODE
 * el.removeAttribute(attrName)
 * ====================================================
 */

function disableAnimBtns() {
	// ES6 for of
	for(let animBtn of animBtns) {
		animBtn.setAttribute("disabled", "disabled");
	} // for
} // disableAnimBtns


function enableAnimBtns() {
	// ES6 for of
	for(let animBtn of animBtns) {
		animBtn.removeAttribute("disabled");
	} // for
} // enableAnimBtns


/**
 * this will subscribe handlers to click events on our buttons
 */
function bindBtns() {
	// element.onevent = handler
	// this approach is old and deprecated
	/*fooBtn.onclick = foo;
	fooBtn.onclick = foo2;*/

	// modern approach :D
	// ****************************************************
	// subscribe listeners to events on given elements
	// el.addEventListener(event:string, listener:function)
    // ****************************************************
	fooBtn.addEventListener("click", foo);
	fooBtn.addEventListener("click", foo2);

	smileyBtn.addEventListener("click", changePic);

    reduceBtn.addEventListener("click", reduceFont);
    normaliseBtn.addEventListener("click", normaliseFont);
    enlargeBtn.addEventListener("click", enlargeFont);
    redBtn.addEventListener("click", makeTextRed);
    blackBtn.addEventListener("click", makeTextBlack);
    moveRightBtn.addEventListener("click", moveRight);
    moveLeftBtn.addEventListener("click", moveLeft);

    nextBtn.addEventListener("click", function(){
    	moveGallery("next");
    });
    prevBtn.addEventListener("click", function(){
    	moveGallery("prev");
    });

}// bindBtns

//FUNCTIONS SAMPLE
function foo() {
	alert(1);
}//end foo()


function foo2() {
	alert(2);
}//end foo2()


//--------------------DATE SAMPLE
//to be invoked at the very top
function loadDate() {
	// generating a date object using inbuilt Date constructor
	let
		// current date
		cd 			=		new Date(),
		// current  date string
		cds			=		cd.toDateString(),
		// hours
		ch			=		cd.getHours(),
		// minutes
		cm			=		cd.getMinutes(),
		// seconds
		cs			=		cd.getSeconds()

	;

	// alert(cds);


	if(ch < 10){ ch = "0" + ch; }
	if(cm < 10){ cm = "0" + cm; }
	if(cs < 10){ cs = "0" + cs; }

	//******************************************
	// injecting content / markup into elements
	// element.innerHTML = some new content
	//******************************************
	currentDate.innerHTML = cds;
	//currentHours.innerHTML = '<img src="https://www.javatpoint.com/images/javascript/javascript_logo.png" width="100">';
	currentHours.innerHTML = ch;
	currentMinutes.innerHTML = cm;
	currentSeconds.innerHTML = cs;

	//******************************************
	// executing some code after a delay
	// setTimeout(code:function, delay:ms)
	//******************************************
	setTimeout(
		// code to execute
		function(){
            loadDate();
		},
		// delay in milliseconds
		1000
	); //settimeout


}//end loadDate


//--------------------CHANGE PIC SAMPLE
//smiling = false
function changePic() {
	//*****************************************
	// manipulating DOM elements attributes
	// element.attributeName = newValue
	//*****************************************
	if(smiling === false){
        smiley.src = path + "Smiley_happy.png";
        smileyBtn.value = "No, please don't!";
        smiling = true;
	} else {
        smiley.src = path + "Smiley_sad.png";
        smileyBtn.value = "Make me happy!";
        smiling = false;
	}



}//end changePic


//--------------------CHANGE TEXT SAMPLE

//********************************************
// manipulating the CSS of an element
// element.style.propertyName = newValue
//********************************************


function reduceFont() {
	resDiv.style.fontSize = "12px";
}//end reduceFont

function normaliseFont() {
	resDiv.style.fontSize = "14px";
}//end normaliseFont

function enlargeFont() {
	resDiv.style.fontSize = "16px";
}//end enlargeFont

function makeTextRed() {
	resDiv.style.color = "red";
}//end makeTextRed

function makeTextBlack() {
	resDiv.style.color = "#000";
}//end makeTextBlack



//--------------------ANIMATION SAMPLE
// var leftMargin = 0;

function moveRight() {
	if(leftMargin < 400){
        disableAnimBtns();
        animPic.src = path + "car_right.png";
        leftMargin += 5;
        animPic.style.marginLeft = leftMargin + "px";

        setTimeout(
            function(){
                moveRight();
            }, 10
        )
	} else {
		enableAnimBtns();
		animPic.src = path + "car_left.png";
	}

}//end moveRight

function moveLeft() {
    if(leftMargin >0){
        disableAnimBtns();
        animPic.src = path + "car_left.png";
        leftMargin -= 5;
        animPic.style.marginLeft = leftMargin + "px";

        setTimeout(
            function(){
                moveLeft();
            }, 10
        )
    } else {
    	enableAnimBtns();
        animPic.src = path + "car_right.png";
    }
}//end moveLeft




//--------------------GALLERY SAMPLE
//let index = 0;
function moveGallery(direction){
	alert(direction);
	if(direction === "next"){
		// next
		if( index < pics.length - 1 ){
            index++;
		} else {
			index = 0;
		}

	} else {
		// prev
		if(index > 0){
            index--;
		} else {
			index = pics.length -1;
		}

	}// if direction

	// injecting a new source into our gPic
	// dynamically reading a filename from pics array
	gPic.src = path + pics[index];


}//end moveGallery


})();// end of iffy






