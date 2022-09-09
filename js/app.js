let tableBody = document.getElementById('tableBody');
//let tableBody2 = document.getElementById('tableBody2');

function calculateTotalGradePoint() {
    let total = 0;
    let gradePoints = document.getElementsByClassName("grade_point_value"); //inner.html if guna span
    let TGP = document.getElementById("TotalGP")

    // iterate and calculate
    for(const n of gradePoints)
    {
        total += parseFloat(n.value);
    }
    
    // assign to html element
    TGP.value = total;
}

function calculateGradePoint(credit, grade, gradePointElement) {
    let gradePoint = credit * grade;
    gradePointElement.value = gradePoint;
    //calculateTotalGradePoint();
}

function calculateGPA() {
    let newGPA = document.getElementById("result");
    let tch = document.getElementById("TotalCH");
    let tgp = document.getElementById("TotalGP");
    let gpa = parseFloat(tgp.value)/parseFloat(tch.value);

    newGPA.value = gpa.toFixed(2);
}

function calculateCGPA() {
    let newCGPA = document.getElementById("CGPA");
    let before_cgpa = document.getElementById("beforecgpa");
    let before_CH = document.getElementById("beforeCH");
    let tch = document.getElementById("TotalCH");
    let tgp = document.getElementById("TotalGP");

    let before_tgp = parseFloat(before_cgpa.value)*parseFloat(before_CH.value);
    let cgpa = (before_tgp + parseFloat(tgp.value))/(parseFloat(before_CH.value) + parseFloat(tch.value));
    newCGPA.value = cgpa.toFixed(2);
}

function calculateTotalCH() {
    let TCH = document.getElementById("TotalCH");
    let credit_H = document.getElementsByClassName("credit_hour");
    let total = 0;
    
    for(const n of credit_H)
    {
        total += parseFloat(n.value); //.value sebab value
    }

    //display value
    TCH.value = total.toFixed(2);
}

function addRow() {
    let rowNum = tableBody.rows.length;

    // Create Credit input element
    let textbox = document.createElement("input");
    textbox.className = "credit_hour";
    textbox.type = "number";

    // Create Select element for grade points
    let select = document.createElement("select");
    select.className = "grades";
    select.style.marginLeft = '3.5rem'

    let grades = [
        ["A+", 4.00],
        ["A", 4.00],
        ["A-", 3.67],
        ["B+", 3.33],
        ["B", 3.00],
        ["B-", 2.67],
        ["C+", 2.33],
        ["C", 2.00],
        ["C-", 1.67],
        ["D+", 1.33],
        ["D", 1.00],
        ["E", 0.67],
        ["F", 0.00]
    ]

    grades.forEach((value) => {
        console.log(value);
        let option = document.createElement("option");
        option.innerHTML = value[0];
        option.value = value[1];
        select.add(option);
    });

    // Create input element for grade points
    let gradePoint = document.createElement("input");
    gradePoint.className = "grade_point_value";
    gradePoint.readOnly = "readonly";
    gradePoint.type = "text";

    gradePoint.style.textAlign = 'center';
    gradePoint.style.border = '2px solid #f98b05';
    gradePoint.style.marginLeft = '5rem'

    textbox.onchange = function () {
        calculateGradePoint(textbox.value, select.value, gradePoint);
    };
    select.onchange = function () {
        calculateGradePoint(textbox.value, select.value, gradePoint);
    };

    let row = tableBody.insertRow(rowNum);
    let col1 = row.insertCell(0);
    let col2 = row.insertCell(1);
    let col3 = row.insertCell(2);
    col1.appendChild(textbox);
    col2.appendChild(select);
    col3.appendChild(gradePoint);
}

document.getElementById("addCreditBtn").onclick = function () {
    addRow();
}

document.getElementById("calcBtn").onclick = function () {
    calculateTotalCH();
    calculateTotalGradePoint();
    calculateGPA();
}

document.getElementById("CGPAbtn").onclick = function () {
    calculateCGPA();
}

addRow();