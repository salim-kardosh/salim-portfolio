



let btnSidebar = document.getElementById('btnSidebar');
let sideBar = document.getElementById('sideBar');
btnSidebar.addEventListener("click", function () {
    if (sideBar.classList.contains('hidden')) {
        sideBar.classList.remove('hidden');
        btnSidebar.classList.remove('hidden')

    } else {
        sideBar.classList.add('hidden');
        btnSidebar.classList.add('hidden');
    }
})

let addBoxBtn = document.getElementById('addBoxBtn'),
    choseElement = document.getElementById('choseElement'),
    deleteAllElements = document.getElementById('deleteAllElements');
let container = document.querySelector('.container');

let idCounter = 1;





addBoxBtn.onclick = function () {
    const newBox = document.createElement(choseElement.value),
        choseColor = document.getElementById('choseColor'),
        widthScale = document.getElementById('widthScale'),
        heightScale = document.getElementById('heightScale'),
        inseretPara = document.getElementById('inseretPara'),
        choseFontSize = document.getElementById('choseFontSize'),
        choseFontColor = document.getElementById('choseFontColor'),
        CbordrWidth = document.getElementById('CbordrWidth'),
        CborderStyle = document.getElementById('CborderStyle'),
        choseBorderColor = document.getElementById('choseBorderColor'),
        boxPadding = document.getElementById('boxPadding'),
        boxMargin = document.getElementById('boxMargin'),
        boxBRadius = document.getElementById('boxBRadius'),
        boxShadowX = document.getElementById('boxShadowX'),
        boxShadowY = document.getElementById('boxShadowY'),
        boxShadowRad = document.getElementById('boxShadowRad'),
        boxShadowColor = document.getElementById('boxShadowColor'),
        currentDate = new Date();

    





    newBox.id = `box ${idCounter}`;
    newBox.style.width = `${widthScale.value}px`;
    newBox.style.height = `${heightScale.value}px`;
    newBox.style.background = choseColor.value && choseColor.value !== '#000000' ? choseColor.value : 'white';
    newBox.innerHTML = `<span>${inseretPara.value}</span>`;
    newBox.style.fontSize = `${choseFontSize.value}px`;
    newBox.style.color = `${choseFontColor.value}`;
    newBox.style.borderWidth = `${CbordrWidth.value}px`;
    newBox.style.borderStyle = `${CborderStyle.value}`;
    newBox.style.borderColor = `${choseBorderColor.value}`;
    newBox.style.padding = `${boxPadding.value}px`;
    newBox.style.margin = `${boxMargin.value}px`;
    newBox.style.borderRadius = `${boxBRadius.value}%`;
    newBox.title = `element type : ${choseElement.value}\n element color: ${choseFontColor.value}\n production date:${currentDate} `;


    if (choseElement.value === "div") {
        newBox.style.boxShadow = `${boxShadowX.value}px ${boxShadowY.value}px ${boxShadowRad.value}px ${boxShadowColor.value}`;
    } else {
        newBox.style.textShadow = `${boxShadowX.value}px ${boxShadowY.value}px ${boxShadowRad.value}px ${boxShadowColor.value}`;
    }

    newBox.style.cursor = choseElement.value === "button" ? 'pointer' : 'default';







    document.querySelector(".container").appendChild(newBox);
    console.log(idCounter);
    idCounter++;

    let saveCheckBox = document.getElementById('saveCheckBox');

    if (saveCheckBox.checked) {
        console.log('Its checked');
        saveTheData()
    } else {
        console.log('Its not checked');
    }
    
}

deleteAllElements.onclick = function () {
    container = document.querySelector('.container');
    container.innerHTML = '';
}
document.getElementById('saveCheckBox').addEventListener('change', (event) => {
    if (event.target.checked) {
        saveTheData();
    }

    
});




let saveButton = document.getElementById('saveButton');

function saveTheData()  {
if (typeof(Storage) !=="undefined"){
    localStorage.setItem("savedData", container.innerHTML);
    console.log("element saved to local storage");
}else{
    alert("sorry , your browser does not support web storage....");
}
}

function loadElements() {

    if (typeof (Storage) !== "undefined") {
        let savedData = localStorage.getItem("savedData");
        if (savedData) {
            container.innerHTML = savedData;
            console.log("Elements loaded from Local Storage");
        }
    } else {
        alert("sorry , your browser does not support web storage....")
    }
}


if (typeof(Storage) !== "undefined") {
    let savedData = localStorage.getItem("savedData");
    if (savedData !== null && savedData !== "") {
        let askForReload = confirm("לשחזר את הנתונים השמורים?");
        if (askForReload) {
            loadElements();
        }
    }
} else {
    alert("Sorry, your browser does not support web storage.");
}





document.addEventListener('DOMContentLoaded', () => {
    let saveCheckBox = document.getElementById('saveCheckBox');

  
    if (localStorage.getItem('checkboxState') === 'checked') {
        saveCheckBox.checked = true;
    } else {
        saveCheckBox.checked = false;
    }

  
    saveCheckBox.addEventListener('change', () => {
        if (saveCheckBox.checked) {
            localStorage.setItem('checkboxState', 'checked');
        } else {
            localStorage.setItem('checkboxState', 'unchecked');
        }
    });
});















