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
navMenu.addEventListener("click", (e) => {
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
    //add logic here to delte their entries

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
  } catch (err) {
    console.log(err);
  }
}

async function verifyUser() {
  const requestId = this.parentNode.parentNode.dataset.id;
  try {
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
  } catch (err) {
    console.log(err);
  }
}

async function adminUser() {
  const requestId = this.parentNode.parentNode.dataset.id;
  try {
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
  } catch (err) {
    console.log(err);
  }
}
