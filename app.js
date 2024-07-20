// slection of query using Custom attributes
let Password_Dispaly=document.querySelector("[Password-Display]");  
let copyMsg=document.querySelector(".Copy-msg")
let copyBtn=document.querySelector("[copy-icon]");
let Length=document.querySelector(".lengthNumber-container");
let Slide=document.querySelector(".slider");
let UpperCase=document.querySelector("#upperCase");
let LowerCase=document.querySelector("#LowerCase");
let Numbers=document.querySelector("#Numbers");
let Symbols=document.querySelector("#Symbols");
let Color_Indicator=document.querySelector(".strength-color");
let GenerateBtn=document.querySelector(".GenerateButton");
let allCheckBoxes=document.querySelectorAll("input[type=checkbox]");
let SpecialChar='@#$%^&*()~<>';

let password="";
let passwordLength=10;  
let checkCount=1;


handleSlide();
Color_Indicator.style.backgroundColor="#808080";
Color_Indicator.style.boxShadow="0 0 20px #808080" ;
// handling slide bar
function handleSlide(){
    Slide.value=passwordLength;
    Length.innerText=passwordLength;
    const min=Slide.min;
    const max=Slide.max;
    Slide.style.backgroundSize=((passwordLength-min)*100/(max-min))+"% 100%";
}
// for setting Color of Strength
function SetColor(color1,color2){
    Color_Indicator.style.backgroundColor=color1; 
    Color_Indicator.style.backgroundColor=color2;
}

// generating Random Integer
function getRandomInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

//generate Random Number
function generateRandomNumber(){
    return getRandomInteger(0,9)
}

// generateLowerCase Letter 
function gernerateLowerCase(){
    return String.fromCharCode(getRandomInteger(97,122));
}

//generate UpperCase letter
//String.fromCharCode is a method which gives Alphabhet from ascii codeValue
function generateUpperCase(){
    return String.fromCharCode(getRandomInteger(65,90));
}

//generate any random symbol from specialchars
//.charAt(randomNum); this method returns which char is present at a randomNum(number) from the String; 
function generateSymbol(){
    const randomNum=getRandomInteger(0,SpecialChar.length);
    return SpecialChar.charAt(randomNum);
}
function shufflePassword(array){
    //yeit fishy algo
    for(let i=array.length-1;i>0;i--){
        let rIdx=Math.floor(Math.random()*(i+1));
        let temp=array[rIdx];
        array[i]=array[rIdx];
        array[rIdx]=temp;
    }
    let str="";
    array.forEach((el)=> (str += el))
    return str;
       
   
}
function StrengthIndicator(){
    let upperLetter=false;
    let lowerLetter=false;
    let Num =false;
    let symbol=false;

    if(UpperCase.checked){
        upperLetter=true;
    }
    if(LowerCase.checked){
        lowerLetter=true;
    }
    if(Numbers.checked){
        Num=true;
    }
    if(Symbols.checked){
        symbol=true;
    }

    if(upperLetter&&lowerLetter&& Num && symbol &&passwordLength>=8){
        Color_Indicator.style.backgroundColor="#00ff00"; 
        Color_Indicator.style.boxShadow="0px 0px 10px #00ff00";  
        Color_Indicator.style.border="1px solid #00ff00"; 
    }else if((upperLetter||lowerLetter)&& (Num || symbol) &&passwordLength>=6){
        Color_Indicator.style.backgroundColor="#ffcf2d"; 
        Color_Indicator.style.boxShadow="0px 0px 10px #ffcf2d";   
        Color_Indicator.style.border="1px solid #ffcf2d"; 

    }else{
        Color_Indicator.style.backgroundColor= "#ff0000";
        Color_Indicator.style.boxShadow="0px 0px 10px #ff0000";   
        Color_Indicator.style.border="1px solid  #ff0000"; 

    }
}

//function to copy password is Clipboard API which uses WriteText() method

async function copyContent(){
    try{
        await navigator.clipboard.writeText(Password_Dispaly.value);
        copyMsg.innerText="copied";
     
    }catch(e){
        copyMsg.innerText="Failed";
    }
    // copyMsg.classList.add("active");
    // setTimeout(()=>{
    //     copyMsg.classList.remove("active");
    // },2000);
    copyMsg.style.zIndex ="1";
    setTimeout(()=>{
        copyMsg.style.zIndex ="-1";   
    },2000)
}

//Slide Bar EventListener
Slide.addEventListener("input",(e)=>{
    passwordLength=e.target.value;
    handleSlide();
});


copyBtn.addEventListener("click",()=>{
    if(Password_Dispaly.value){
        copyContent()
    }
});

function handleCheckBoxChange(){
    checkCount=0;
    allCheckBoxes.forEach((checkBox)=>{
        if(checkBox.checked){
            checkCount++;
        }
    })
     //special condition

   if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlide();
   }
}
allCheckBoxes.forEach((checkBox)=>{
    checkBox.addEventListener("change",handleCheckBoxChange)
})
// //generate Password Button
GenerateBtn.addEventListener("click",()=>{

    //none of the cehckBox is checked
    if(checkCount==0){
        return;
    }
    // if password length count is less checked checkBoxes 
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlide();
    }


    //generate new password
    password="";

    //create an empty array
    let funcArr=[];
    if(UpperCase.checked){
        funcArr.push(generateUpperCase)
    }
    if( LowerCase.checked){
        funcArr.push(gernerateLowerCase)
    }
    if(Numbers.checked){
        funcArr.push(generateRandomNumber)
    }
    if(Symbols.checked){
        funcArr.push(generateSymbol)
    }

    //compulsory addition in password
    for(let i=0;i<funcArr.length;i++){
        password+=funcArr[i]();
    }
    // remaining addition in letter
    for(let j=0;j<passwordLength-funcArr.length;j++){
        let randIdx=getRandomInteger(0,funcArr.length);
        password+=funcArr[randIdx]();
    }

  

    //shuffeling of passowrd
    password=shufflePassword(Array.from(password));
    Password_Dispaly.value=password;
    // Password_Dispaly.classList.add("")
    StrengthIndicator();
    
})