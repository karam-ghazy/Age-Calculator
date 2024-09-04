// Get DOM elements
let dateDiv = document.querySelectorAll(".birthday > div");
let day = document.querySelector(".birthday .day input");
let month = document.querySelector(".birthday .month input");
let year = document.querySelector(".birthday .year input");

let calcBtn = document.querySelector(".icon-arrow div");

// Attach click event to the button
calcBtn.onclick = function () {
  clearErrors();

  // Parse input values to integers
  let dayValue = parseInt(day.value);
  let monthValue = parseInt(month.value);
  let yearValue = parseInt(year.value);

  // Validate each input
  let validDay = validateDay(dayValue, monthValue, yearValue);
  let validMonth = validateMonth(monthValue, yearValue);
  let validYear = validateYear(yearValue);

  // Handle validation errors
  if (!validDay) errorMessage(day);
  if (!validMonth) errorMessage(month);
  if (!validYear) errorMessage(year);

  if (validDay && validMonth && validYear) {
    let { years, months, days } = calculateAge(dayValue, monthValue, yearValue);

    document.querySelector(".age .year span").textContent = years;
    document.querySelector(".age .month span").textContent = months;
    document.querySelector(".age .day span").textContent = days;
  }
};

// Get the current date values
const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth() + 1;
const currentDay = new Date().getDate();

// Days in each month
const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Validate the day with consideration for leap years
function validateDay(day, month, year) {
  if (validateMonth(month, year)) {
    let maxDays = daysInMonth[month - 1];
    if (month === 2 && isLeapYear(year)) maxDays = 29;
    return day >= 1 && day <= maxDays && day <= currentDay;
  } else return false;
}

// Validate the month
function validateMonth(month, year) {
  if (validateYear(year)) return month <= currentMonth;
  else return false;
}

// Validate the year
function validateYear(year) {
  if (isNaN(year)) return false;
  return year >= 1900 && year <= currentYear;
}

// Check if a year is a leap year
function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Show an error message
function errorMessage(child) {
  let p = document.createElement("p");
  p.classList.add("error");
  p.innerHTML = "Must be a valid date";
  child.parentElement.appendChild(p);

  dateDiv.forEach((div) => {
    div.classList.add("error");
  });
}

// Clear all error messages
function clearErrors() {
  let errorMessages = document.querySelectorAll("p.error");
  errorMessages.forEach((error) => error.remove());
  let errorContainers = document.querySelectorAll(".error");
  errorContainers.forEach((container) => container.classList.remove("error"));
}

// Function to calculate age
function calculateAge(day, month, year) {
  let today = new Date();
  let birthDate = new Date(year, month - 1, day);

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  // Adjust the calculation if the birth day and month have not occurred this year
  if (months < 0 || (months === 0 && days < 0)) {
    years--;
    months += 12;
  }

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); // Get the number of days in the previous month
  }

  return { years, months, days };
}
