//Name:- Trishit Kundu
//Roll:- 1928327
//JS Project of BOOK CLUB

//-------------------------------------------------------------------
//Declaring Global variables that can be put throughout the program.
let login_name = document.getElementById("logged-user");
let fp = 0;

//-------------------------------------------------------------------
//Table printing structure

function TablePrinting(data) {
    let table = document.getElementById("info-table");

    for (let i = 0; i < data.length; i++) {
        let row = `<tr>
          <td>${data[i].Id}</td>
          <td>${data[i].Title}</td>
          <td>${data[i].Author}</td>
          <td>${data[i].Lender}</td>
          <td>${data[i].Borrower}</td>
          <td>${data[i].Action}</td>

      </tr>`;
        table.innerHTML += row;
    }
}

//---------------------------------------------------------------
//return function
function returnValue(i) {
    BookArray[i].Borrower = "-";
    delete_table(BookArray);
    UpdateTable(BookArray);
    addnewrow();
}

//---------------------------------------------------------------
//borrow function
function borrowValue(i) {
    BookArray[i].Borrower = login_name.value;
    delete_table(BookArray);
    UpdateTable(BookArray);
    addnewrow();
}

//---------------------------------------------------------------
//table updating & buttons of borrower & return function
function UpdateTable(data) {
    let table = document.getElementById("info-table");
    for (let i = 0; i < data.length; i++) {
        if (
            login_name.value != data[i].Lender &&
            login_name.value == data[i].Borrower
        ) {
            let row3 = `<tr>
              <td>${data[i].Id}</td>
              <td>${data[i].Title}</td>
              <td>${data[i].Author}</td>
              <td>${data[i].Lender}</td>
              <td>${data[i].Borrower}</td>
              <td><button type="button" onclick="returnValue(${i});">Return</button></td>
    
          </tr>`;
            table.innerHTML += row3;
        } else if (login_name.value != data[i].Lender && data[i].Borrower == "-") {
            let row4 = `<tr>
              <td>${data[i].Id}</td>
              <td>${data[i].Title}</td>
              <td>${data[i].Author}</td>
              <td>${data[i].Lender}</td>
              <td>${data[i].Borrower}</td>
              <td><button type="button" onclick="borrowValue(${i});">Borrow</button></td>
    
          </tr>`;
            table.innerHTML += row4;
        } else {
            let row = `<tr>
    <td>${data[i].Id}</td>
    <td>${data[i].Title}</td>
    <td>${data[i].Author}</td>
    <td>${data[i].Lender}</td>
    <td>${data[i].Borrower}</td>
    <td>${data[i].Action}</td>

</tr>`;
            table.innerHTML += row;
        }
    }
}

//---------------------------------------------------------------
//row adding function
function rowadd(data) {
    let table1 = document.getElementById("info-table");
    let row1 = `<tr>
    <td>${data.Id}</td>
    <td>${data.Title}</td>
    <td>${data.Author}</td>
    <td>${data.Lender}</td>
    <td>${data.Borrower}</td>
    <td>${data.Action}</td>

</tr>`;
    table1.innerHTML += row1;
}
//-----------------------------------------------------------------

//Data structure
let BookArray = [{
        Id: "1",
        Title: "Book1",
        Author: "Author1",
        Lender: "UserC",
        Borrower: "UserB",
        Action: "-",
    },
    {
        Id: "2",
        Title: "Book2",
        Author: "Author2",
        Lender: "UserC",
        Borrower: "-",
        Action: "-",
    },
    {
        Id: "3",
        Title: "Book3",
        Author: "Author3",
        Lender: "UserD",
        Borrower: "UserC",
        Action: "-",
    },
    {
        Id: "4",
        Title: "Book4",
        Author: "Author4",
        Lender: "UserA",
        Borrower: "-",
        Action: "-",
    },
    {
        Id: "5",
        Title: "Book5",
        Author: "Author5",
        Lender: "UserA",
        Borrower: "-",
        Action: "-",
    },
    {
        Id: "6",
        Title: "Book6",
        Author: "Author6",
        Lender: "UserB",
        Borrower: "UserA",
        Action: "-",
    },
];
//----------------------------------------------------------
//Printing Table
TablePrinting(BookArray);

//----------------------------------------------------------
//Add New book and printing input books
function addBook() {
    let table = document.getElementById("info-table");
    let p = login_name.value;
    let row = `<tr>
            <td>${BookArray.length + 1}</td>
            <td><input type='text' id="new-book" placeholder="title"></td>
            <td><input type='text' id="new-author" placeholder="author"></td>
            <td>${p}</td>
            <td>${"-"}</td>
            <td><button type="button" onclick="new_book_author_entry();">Add book</button></td>

        </tr>`;
    table.innerHTML += row;
}
//----------------------------------------------------------
//New row functionality

function addnewrow() {
    addBook();
}
//------------------------------------------------------------------------
//remove function
function delete_table(data) {
    if (fp == 0) {
        for (let i = data.length; i > 0; i--) {
            document.getElementById("info-table").deleteRow(i);
        }
    } else if (fp == 1) {
        for (let i = data.length + 1; i > 0; i--) {
            document.getElementById("info-table").deleteRow(i);
        }
    }
}
//------------------------------------------------------------------------
//input function
function new_book_author_entry() {
    var new_entry = {
        Id: null,
        Title: null,
        Author: null,
        Lender: null,
        Borrower: null,
        Action: null,
    };
    var input_new_book = document.getElementById("new-book").value;
    var input_new_author = document.getElementById("new-author").value;
    if (input_new_book && input_new_author) {
        new_entry.Id = BookArray.length + 1;
        new_entry.Title = input_new_book;
        new_entry.Author = input_new_author;
        new_entry.Lender = login_name.value;
        new_entry.Borrower = "-";
        new_entry.Action = "-";
        BookArray.push(new_entry);
        document.getElementById("info-table").deleteRow(BookArray.length);
        rowadd(new_entry);
        addnewrow();
    }
}

//----------------------------------------------------------------
//Logged in

function changeLoggedInUser() {
    let UserArray = ["UserA", "UserB", "UserC", "UserD"];

    for (let j = 0; j < UserArray.length; j++) {
        if (login_name.value === UserArray[j]) {
            delete_table(BookArray);
            fp = 1;
            UpdateTable(BookArray);
            addnewrow();
            return (document.getElementById("logged-in-user-name").innerHTML =
                "Logged in: " + login_name.value);
        } else {
            document.getElementById("logged-in-user-name").innerHTML =
                "No User logged in.";
        }
    }
    delete_table(BookArray);
    fp = 0;
    TablePrinting(BookArray);
}
//----------------------------------------------------------