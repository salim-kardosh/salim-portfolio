const usersArr = [];
const usersTable = document.getElementById('usersTable');

window.onload = () => {
    if (typeof (Storage) !== "undefined") {
        let storedUsers = localStorage.getItem("userStorage");
        if (storedUsers !== null && storedUsers !== "") {
            let parsedUsers = JSON.parse(storedUsers);
            parsedUsers.forEach(userData => {
                const user = new User(userData.firstName, userData.lastName, userData.email, userData.password, userData.loggedIn);
                usersArr.push(user);
            });
            console.log(usersArr);
        }
        usersArr.forEach(user => addUserToTable(user));
    } else {
        alert("localStorage is not supported in this browser.");
    }
};


// מחלקת User
class User {
    #password; // שדה פרטי
    constructor(firstName, lastName, email, password, loggedIn = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.#password = password;
        this.loggedIn = loggedIn;
    }
    setFirstName(newFirstName){
        this.firstName = newFirstName;
    }
    setLastName(newLastName){
        this.lastName = newLastName;
    }

    getPassword() {
        return this.#password;
    }

    async setPassword(newPassword) {
        this.#password = await hashPassword(newPassword); // עדכון ה-Hash של הסיסמה
    }

    async checkPassword(inputPassword) {
        const hashedInputPassword = await hashPassword(inputPassword);
        return this.#password === hashedInputPassword;
    }
}


// שמירה של משתמש חדש עם hash לסיסמה
const submitBtn = document.getElementById('submitBtn');
if (submitBtn) {
    submitBtn.addEventListener('click', async function (event) {
        event.preventDefault(); // מונע את שליחת הטופס

        const newUserFirstName = document.getElementById('firstNameInput').value;
        const newUserLastName = document.getElementById('lastNameInput').value;
        const newUserEmail = document.getElementById('emailInput').value;
        const newUserPassword = document.getElementById('passwordInput').value;

        if (!newUserFirstName || !newUserLastName || !newUserEmail || !newUserPassword) {
            alert("יש למלא את כל השדות!");
            return;
        }

        console.log("Checking email:", newUserEmail); // בדיקת אימייל בקונסול
        if (!isValidEmail(newUserEmail)) {
            alert("האימייל שהוזן לא תקין!");
            return;
        }

        if (usersArr.some(user => user.email === newUserEmail)) {
            alert("משתמש כבר קיים במערכת!");
            return;
        }

        // ניקוי שדות
        

        const hashedPassword = await hashPassword(newUserPassword); // יצירת hash לסיסמה

        // יצירת מופע חדש של משתמש עם הסיסמה המוצפנת
        const newUser = new User(newUserFirstName, newUserLastName, newUserEmail, hashedPassword);
        usersArr.push(newUser);

        // שמירת המידע ב-localStorage
        let usersData = usersArr.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.getPassword(), // שמירת ה-hash
            loggedIn: user.loggedIn
        }));

        localStorage.setItem("userStorage", JSON.stringify(usersData));

        console.log(usersArr); // הדפסת המערך של המשתמשים לקונסול
        addUserToTable(newUser);

        document.getElementById('firstNameInput').value='';
        document.getElementById('lastNameInput').value = '';
        document.getElementById('emailInput').value = '';
        document.getElementById('passwordInput').value = '';

    });
}

// פונקציה לבדיקת אימייל תקין
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// פונקציה להוספת משתמש לטבלה
function addUserToTable(user) {
    const newRow = usersTable.insertRow();
    newRow.insertCell().textContent = user.firstName; // שימוש במשתני האובייקט
    newRow.insertCell().textContent = user.lastName;
    newRow.insertCell().textContent = user.email;
    newRow.insertCell().textContent = '********'; // סיסמא מוסתרת
    newRow.insertCell().textContent =user.loggedIn ? 'מחובר' : 'לא מחובר';
    const actionsCell = newRow.insertCell();
    const editingCell = newRow.insertCell();
    const disconnectingCell=newRow.insertCell();

    let eraseButton = document.createElement('button');
    eraseButton.style.width = '100px';
    eraseButton.style.height = '30px';
    eraseButton.style.backgroundColor = 'blue';
    eraseButton.style.color = 'white';
    eraseButton.textContent = 'מחק';
    eraseButton.style.fontSize ='10px';
    eraseButton.style.marginTop = '10px';
    eraseButton.style.marginRight ='70px';
    eraseButton.classList.add("erase-button"); 

    if (user.loggedIn) {
        eraseButton.style.display = 'block';
    } else {
        eraseButton.style.display = 'none';
    }

    let editingButton = document.createElement('button');
    editingButton.style.width = '100px';
    editingButton.style.height ='30px';
    editingButton.style.backgroundColor = 'yellow';
    editingButton.style.color ='black';
    editingButton.textContent = 'ערוך';
    editingButton.style.fontSize = '10px';
    editingButton.style.marginTop = '10px';
    editingButton.style.marginRight = '70px';
    editingButton.classList.add('editing-button');

    if (user.loggedIn){
        editingButton.style.display = 'block';
    }else{
        editingButton.style.display = 'none';
    }

    editingButton.addEventListener('click', () => {
        openModal(user.firstName, user.lastName, user.email);
    });

     let disconnectButton =document.createElement('button');
     disconnectButton.style.width = '100px';
     disconnectButton.style.height ='30px';
     disconnectButton.style.backgroundColor = 'brown'
     disconnectButton.style.color ='black';
     disconnectButton.textContent = 'התנתק';
     disconnectButton.style.fontSize = '10px';
     disconnectButton.style.marginTop = '10px';
     disconnectButton.style.marginRight = '70px';
     disconnectButton.classList.add('disconnecting-button');

     if (user.loggedIn){
        disconnectButton.style.display = 'block';
    }else{
        disconnectButton.style.display = 'none';
    }
     


    eraseButton.addEventListener('click', () => {
        // הוספת לוגיקה למחיקת המשתמש אם נדרש
        console.log("כפתור מחיקה נלחץ עבור", user.email);
            
        // מחיקת המשתמש מהמערך
        const index = usersArr.findIndex(u => u.email === user.email);
        if (index > -1) usersArr.splice(index, 1);

        // מחיקת השורה מהטבלה
        newRow.remove();

        // עדכון ה-localStorage
        localStorage.setItem("userStorage", JSON.stringify(usersArr));
        
    });
    disconnectButton.addEventListener('click', () => {
        user.loggedIn = false;
    
        // עדכון הטקסט בטבלה למצב 'לא מחובר'
        newRow.cells[4].textContent = 'לא מחובר';
    
        // הסתרת כפתורי מחיקה, עריכה והתנתקות
        eraseButton.style.display = 'none';
        editingButton.style.display = 'none';
        disconnectButton.style.display = 'none';
    
        // עדכון ב-localStorage
        let usersData = usersArr.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.getPassword(),
            loggedIn: user.loggedIn
        }));
        localStorage.setItem("userStorage", JSON.stringify(usersData));
    });
    
    

    actionsCell.appendChild(eraseButton);
    editingCell.appendChild(editingButton);
    disconnectingCell.appendChild(disconnectButton);
  
}

// התחברות ובדיקת סיסמה עם hash
document.getElementById('submitBtnToSign').addEventListener('click', async (event) => {
    event.preventDefault();
    console.log("the button is working");

    let findUserIndex = document.getElementById('emailInputSignIn').value;
    let checkUserPassword = document.getElementById('passwordToSign').value;

    let theUserIndex = usersArr.findIndex(user => user.email === findUserIndex);
    if (theUserIndex === -1) {
        console.log("User not found");
        alert("המשתמש לא נמצא");
        return;
    }

    let isPasswordCorrect = await usersArr[theUserIndex].checkPassword(checkUserPassword);
    console.log(isPasswordCorrect);

    if (isPasswordCorrect) {
        console.log("הסיסמה נכונה");
        alert("התחברות הצליחה!");
        usersArr[theUserIndex].loggedIn = true;

        const rows = usersTable.rows;
        for (let i = 1; i < rows.length; i++) {
            if (rows[i].cells[2].textContent === findUserIndex) {
                rows[i].cells[4].textContent = 'מחובר';

                // מציגים את כפתור המחיקה באמצעות querySelector
                const eraseButton = rows[i].querySelector(".erase-button"); // שורה זו נבדקת מחדש
                if (eraseButton) {
                    eraseButton.style.display = 'block'; // שורה זו מבטיחה את ההצגה לאחר התחברות************************************************************
                }
                const editingButton = rows[i].querySelector(".editing-button");
                if (editingButton) {
                    editingButton.style.display = 'block';
                }
                const disconnectButton = rows[i].querySelector(".disconnecting-button");
                if (disconnectButton) {
                    disconnectButton.style.display = 'block';
                }
            }
        }

        // שמירה מחדש ב-localStorage
        let usersData = usersArr.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.getPassword(),
            loggedIn: user.loggedIn
        }));

        localStorage.setItem("userStorage", JSON.stringify(usersData));

    } else {
        console.log("הסיסמה לא נכונה");
        alert("הסיסמה שהוזנה לא נכונה הקלד סיסמה נכונה");
    }
    if (isPasswordCorrect){
    document.getElementById('emailInputSignIn').value = '';
    document.getElementById('passwordToSign').value = '';
    }else{
        document.getElementById('passwordToSign').value = '';
    }
});


// פונקציה ליצירת hash לסיסמה
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hexString(hash);
}

// המרה לפורמט hex
function hexString(buffer) {
    const byteArray = new Uint8Array(buffer);
    const hexCodes = [...byteArray].map(value => value.toString(16).padStart(2, '0'));
    return hexCodes.join('');
}
function openModal(firstName, lastName, email) {
    document.getElementById('editFirstName').value = firstName;
    document.getElementById('editLastName').value = lastName;
    document.getElementById('editModal').dataset.email = email; // לשמור את האימייל כמאפיין
    document.getElementById('editModal').style.display = 'block';
}

document.querySelector('.close').onclick = function(){
    document.getElementById('editModal').style.display ='none';
}
async function saveChanges() {
    console.log("saveChanges called");

    const updatedFirstName = document.getElementById('editFirstName').value;
    const updatedLastName = document.getElementById('editLastName').value;
    const updatedPassword = document.getElementById('editPassword').value;

    const email = document.getElementById('editModal').dataset.email;
    const userIndex = usersArr.findIndex(user => user.email === email);

    if (userIndex !== -1) {
        usersArr[userIndex].setFirstName(updatedFirstName);
        usersArr[userIndex].setLastName(updatedLastName);
        await usersArr[userIndex].setPassword(updatedPassword);

        // עדכון שורת הטבלה בתצוגה
        updateTableRow(email, updatedFirstName, updatedLastName);

        // עדכון ב-localStorage
        let usersData = usersArr.map(user => ({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.getPassword(),
            loggedIn: user.loggedIn
        }));

        localStorage.setItem("userStorage", JSON.stringify(usersData));
    }

    document.getElementById('editModal').style.display = 'none';
}




function updateTableRow(email, updatedFirstName, updatedLastName) {
    const rows = usersTable.rows;
    for (let i = 1; i < rows.length; i++) {
        if (rows[i].cells[2].textContent === email) {
            rows[i].cells[0].textContent = updatedFirstName; 
            rows[i].cells[1].textContent = updatedLastName; 
            break;
        }
    }
}



