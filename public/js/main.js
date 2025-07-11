/* eslint-disable no-unused-vars */
const deleteBtn = document.querySelectorAll(".delete-request");
let modalActive = false;

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteRequested);
});

async function deleteRequested() {
  const requestId = this.parentNode.parentNode.dataset.id;
  try {
    let confirm = await verifyModal(
      "Delete:",
      // eslint-disable-next-line prettier/prettier
      this.parentNode.parentNode.childNodes[1].textContent.trim()
    );
    if (confirm === true) {
      const response = await fetch("request/deleteRequested", {
        method: "delete",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          requestIdFromJsFile: requestId,
        }),
      });
      const data = await response.json();
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

//nav menu button logic, click to open menu
const navMenu = document.querySelector("#menuButton");
const menuNav = document.querySelector(".menuNav");
navMenu.addEventListener("click", () => {
  menuNav.classList.toggle("showMenu");
});

//modal for verifying actions
function verifyModal(action, thing) {
  if (modalActive === false) {
    modalActive = true;
    return new Promise((resolve) => {
      let modalUi = document.createElement("div");
      modalUi.classList.add("verifyModal");

      let modalHeader = document.createElement("h2");
      modalHeader.textContent = "Verify Action";
      modalUi.appendChild(modalHeader);

      let modalDescription = document.createElement("p");
      modalDescription.textContent = `Are you sure you want to ${action} ${thing}?`;
      modalUi.appendChild(modalDescription);

      let actionButtons = document.createElement("section");
      let verifyButton = document.createElement("button");
      let cancelButton = document.createElement("button");
      verifyButton.type = "button";
      cancelButton.type = "button";
      verifyButton.id = "verifyConfirm";
      cancelButton.id = "cancelConfirm";
      verifyButton.textContent = `${action.slice(0, -1)}`;
      cancelButton.textContent = "Cancel";
      actionButtons.appendChild(verifyButton);
      actionButtons.appendChild(cancelButton);
      actionButtons.classList.add("action-section");
      modalUi.appendChild(actionButtons);

      document.querySelector("body").appendChild(modalUi);
      let adminAction = document.querySelector("#verifyConfirm");
      let adminCancel = document.querySelector("#cancelConfirm");
      //how do i tell the function to not return undefined and wait for one of these listeners to be invoked and return?
      adminAction.addEventListener("click", () => {
        modalUi.remove();
        resolve(true);
      });

      adminCancel.addEventListener("click", () => {
        modalUi.remove();
        resolve(false);
      });
    });
  }
  modalActive = false;
}

//sorting function for table headers, snagged from w3schools, bless them
function sortTable(n) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.querySelector("table");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

// action span listners
let markCompleteSpans = Array.from(document.querySelectorAll(".complete-item"));
let uncompleteSpans = Array.from(document.querySelectorAll(".mark-uncomplete"));

async function uncompleteRequested() {
  const requestId = this.parentNode.parentNode.dataset.id;
  try {
    let confirm = await verifyModal(
      "Uncomplete:",
      // eslint-disable-next-line prettier/prettier
      this.parentNode.parentNode.childNodes[1].textContent.trim()
    );
    if (confirm === true) {
      const response = await fetch("request/markUncomplete", {
        method: "put",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          requestIdFromJsFile: requestId,
        }),
      });
      const data = await response.json();
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

uncompleteSpans.forEach((el) => {
  el.addEventListener("click", uncompleteRequested);
});

async function markComplete() {
  const requestId = this.parentNode.parentNode.dataset.id;
  try {
    let confirm = await verifyModal(
      "Complete:",
      // eslint-disable-next-line prettier/prettier
      this.parentNode.parentNode.childNodes[1].textContent.trim()
    );
    if (confirm === true) {
      const response = await fetch("request/markComplete", {
        method: "put",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          requestIdFromJsFile: requestId,
        }),
      });
      const data = await response.json();
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

markCompleteSpans.forEach((el) => {
  el.addEventListener("click", markComplete);
});

//listener that converts date-object dates to local date and time
document.addEventListener("DOMContentLoaded", () => {
  const dateObjects = document.querySelectorAll(".date-object");
  dateObjects.forEach((date) => {
    if (date.textContent !== "predate" && date.textContent) {
      let utcDate = new Date(Date.parse(date.textContent.trim()));
      date.textContent = `${utcDate.getMonth() + 1}/${utcDate.getDate()}/${utcDate.getFullYear()}
        ${utcDate.getHours()}:${String(utcDate.getMinutes()).padStart(2, "0")}:${String(utcDate.getSeconds()).padStart(2, "0")}`;
    }
  });
});
