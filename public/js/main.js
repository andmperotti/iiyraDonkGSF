const deleteBtn = document.querySelectorAll(".del");
const deleteJobBtn = document.querySelectorAll(".deljob");
const deleteBuildBtn = document.querySelectorAll(".delBuild");
const deleteUserBtn = document.querySelectorAll(".deleteUser");
const verifyUserBtn = document.querySelectorAll(".verifyUser");
const adminUserBtn = document.querySelectorAll(".adminUser");

Array.from(deleteBtn).forEach((el) => {
  el.addEventListener("click", deleteRequested);
});
Array.from(deleteJobBtn).forEach((el) => {
  el.addEventListener("click", deleteJob);
});

Array.from(deleteBuildBtn).forEach((el) => {
  el.addEventListener("click", deleteBuild);
});

async function deleteRequested() {
  const requestId = this.parentNode.dataset.id;
  try {
    const response = await fetch("request/deleteRequested", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        requestIdFromJsFile: requestId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function deleteJob() {
  const requestId = this.parentNode.dataset.id;
  try {
    const response = await fetch("jobs/deleteJob", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        requestIdFromJsFile: requestId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
  } catch (err) {
    console.log(err);
  }
}

async function deleteBuild() {
  const requestId = this.parentNode.dataset.id;
  try {
    const response = await fetch("builds/deleteBuild", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        requestIdFromJsFile: requestId,
      }),
    });
    const data = await response.json();
    console.log(data);
    location.reload();
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

//admin panel listeners
Array.from(deleteUserBtn).forEach((el) => {
  el.addEventListener("click", deleteUser);
});
Array.from(verifyUserBtn).forEach((el) => {
  el.addEventListener("click", verifyUser);
});

Array.from(adminUserBtn).forEach((el) => {
  el.addEventListener("click", adminUser);
});

async function deleteUser() {
  const requestId = this.parentNode.parentNode.dataset.id;
  try {
    let confirm = await verifyModal("Delete");
    if (confirm === true) {
      const response = await fetch("admin/deleteUser", {
        method: "delete",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          requestIdFromJsFile: requestId,
        }),
      });
      const data = await response.json();
      console.log(data);
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

async function verifyUser() {
  const requestId = this.parentNode.parentNode.dataset.id;
  try {
    let confirm = await verifyModal("Verify");
    if (confirm === true) {
      const response = await fetch("admin/verifyUser", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          requestIdFromJsFile: requestId,
        }),
      });
      const data = await response.json();
      console.log(data);
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

async function adminUser() {
  const requestId = this.parentNode.parentNode.dataset.id;
  try {
    let confirm = await verifyModal("Admin");
    if (confirm === true) {
      const response = await fetch("admin/adminUser", {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          requestIdFromJsFile: requestId,
        }),
      });
      const data = await response.json();
      console.log(data);
      location.reload();
    }
  } catch (err) {
    console.log(err);
  }
}

//modal for verifying actions of admin panel
function verifyModal(type) {
  return new Promise((resolve) => {
    let modalUi = document.createElement("div");
    modalUi.classList.add("verifyModal");

    let modalHeader = document.createElement("h2");
    modalHeader.textContent = "Verify Action";
    modalUi.appendChild(modalHeader);

    let modalDescription = document.createElement("p");
    modalDescription.textContent = `Are you sure you want to ${type} this user?`;
    modalUi.appendChild(modalDescription);

    let actionButtons = document.createElement("section");
    let verifyButton = document.createElement("button");
    let cancelButton = document.createElement("button");
    verifyButton.type = "button";
    cancelButton.type = "button";
    verifyButton.id = "verifyConfirm";
    cancelButton.id = "cancelConfirm";
    verifyButton.textContent = `${type}`;
    cancelButton.textContent = "Cancel";
    actionButtons.appendChild(verifyButton);
    actionButtons.appendChild(cancelButton);
    modalUi.appendChild(actionButtons);

    document.querySelector("body").appendChild(modalUi);

    let adminAction = document.querySelector("#verifyConfirm");
    let adminCancel = document.querySelector("#cancelConfirm");
    //how do i tell the function to not return undefined and wait for one of these listeners to be invoked and return?
    adminAction.addEventListener("click", () => {
      document.querySelector(".verifyModal").remove();
      resolve(true);
    });
    adminCancel.addEventListener("click", () => {
      document.querySelector(".verifyModal").remove();
      resolve(false);
    });
  });
}
