// This array stores all assignments in one place.
// Each assignment is saved as an object with a name, score, and points possible.
let assignments = [];

// This function runs when the user clicks the Add Assignment button.
function addAssignment() {
  try {
    let name = document.querySelector("#name").value;
    let score = Number(document.querySelector("#score").value);
    let points = Number(document.querySelector("#points").value);

    // These errors are thrown so all invalid input can be handled in one catch block.
    if (name === "") {
      throw new Error("Assignment name cannot be blank.");
    }

    if (score < 0) {
      throw new Error("Score earned cannot be negative.");
    }

    if (points <= 0) {
      throw new Error("Points possible must be greater than zero.");
    }

    if (score > points) {
      throw new Error("Score earned cannot be greater than points possible.");
    }

    let assignment = {
      name: name,
      score: score,
      points: points
    };

    assignments.push(assignment);

    clearInputs();
    updatePage();

  } catch (error) {
    // The catch block handles any error thrown inside the try block.
    alert(error.message);
  }
}

// This keeps the form clean after an assignment is added.
function clearInputs() {
  document.querySelector("#name").value = "";
  document.querySelector("#score").value = "";
  document.querySelector("#points").value = "";
}

// This function uses reduce to add all earned points together.
function getTotalEarned() {
  let total = assignments.reduce(function (sum, assignment) {
    return sum + assignment.score;
  }, 0);

  return total;
}

// This function uses reduce to add all possible points together.
function getTotalPossible() {
  let total = assignments.reduce(function (sum, assignment) {
    return sum + assignment.points;
  }, 0);

  return total;
}

// This function calculates the current percentage.
// It checks for zero first so the page does not show an error before anything is entered.
function getPercentage() {
  let earned = getTotalEarned();
  let possible = getTotalPossible();

  if (possible === 0) {
    return 0;
  }

  return (earned / possible) * 100;
}

// This function turns a percentage into a letter grade.
function getLetterGrade(percent) {
  if (percent >= 90) {
    return "A";
  } else if (percent >= 80) {
    return "B";
  } else if (percent >= 70) {
    return "C";
  } else if (percent >= 60) {
    return "D";
  } else {
    return "F";
  }
}

// This recursive function counts assignments.
// A normal .length would be easier, but recursion is included to meet the project requirement.
function countAssignments(index) {
  if (index === assignments.length) {
    return 0;
  }

  return 1 + countAssignments(index + 1);
}

// This function displays each assignment on the page.
// The map function changes assignment objects into HTML list items.
function showAssignments() {
  let list = document.querySelector("#assignmentList");

  if (assignments.length === 0) {
    list.innerHTML = "<li>No assignments added yet.</li>";
    return;
  }

  let htmlList = assignments.map(function (assignment) {
    return "<li>" +
      assignment.name +
      ": " +
      assignment.score +
      " / " +
      assignment.points +
      "</li>";
  });

  list.innerHTML = htmlList.join("");
}

// This function updates the whole page whenever the assignment data changes.
function updatePage() {
  let earned = getTotalEarned();
  let possible = getTotalPossible();
  let percent = getPercentage();
  let letter = getLetterGrade(percent);
  let count = countAssignments(0);

  document.querySelector("#earned").textContent = earned;
  document.querySelector("#possible").textContent = possible;
  document.querySelector("#percent").textContent = percent.toFixed(2) + "%";
  document.querySelector("#letter").textContent = letter;
  document.querySelector("#count").textContent = count;

  // Day.js is used here to show the last time the grade summary changed.
  document.querySelector("#date").textContent = dayjs().format("MMM D, YYYY h:mm A");

  showAssignments();
}

// This gives the page a starting display before the user enters anything.
updatePage();