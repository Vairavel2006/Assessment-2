
document.addEventListener("DOMContentLoaded", function () {
    let loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();

            let role = document.getElementById("role").value;
            let username = document.getElementById("username").value;
            let password = document.getElementById("password").value;

            if (username && password) {
                if (role === "employee") {
                    window.location.href = "employee_dashboard.html";
                } else if (role === "manager") {
                    window.location.href = "manager_dashboard.html";
                }
            } else {
                alert("Please enter a valid username and password.");
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    let navLinks = document.querySelectorAll(".nav-link");
    let sections = document.querySelectorAll(".content-section");

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            let target = this.getAttribute("data-target");

            sections.forEach(section => section.style.display = "none");

            document.getElementById(target).style.display = "block";
        });
    });

    let leaveBalance = 10;
    let leaveBalanceDisplay = document.getElementById("leave-balance-count");
    if (leaveBalanceDisplay) {
        leaveBalanceDisplay.innerText = leaveBalance;
    }

    // Timesheet Form Submission
    let timesheetForm = document.getElementById("timesheet-form");
    if (timesheetForm) {
        timesheetForm.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Timesheet submitted successfully!");
        });
    }

    let leaveForm = document.getElementById("leave-form");
    if (leaveForm) {
        leaveForm.addEventListener("submit", function (event) {
            event.preventDefault();
            if (leaveBalance > 0) {
                leaveBalance--;
                leaveBalanceDisplay.innerText = leaveBalance;
                alert("Leave request submitted! Remaining leaves: " + leaveBalance);

                let request = document.createElement("div");
                request.classList.add("leave-request");
                request.innerHTML = `<p>Employee requested leave on ${document.getElementById("leave-date").value} for reason: ${document.getElementById("reason").value}</p>
                                     <button class='approve-btn'>Approve</button>
                                     <button class='reject-btn'>Reject</button>`;
                localStorage.setItem("leaveRequest", request.outerHTML);
                alert("Leave request sent to Manager!");
            } else {
                alert("Leave balance exhausted!");
            }
        });
    }

    let managerRequests = document.getElementById("manager-requests");
    if (managerRequests) {
        let storedRequest = localStorage.getItem("leaveRequest");
        if (storedRequest) {
            managerRequests.innerHTML = storedRequest;
        }
    }

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("approve-btn")) {
            event.target.parentElement.innerHTML += '<p style="color: green; font-weight: bold;">Leave Approved</p>';
            localStorage.removeItem("leaveRequest");
        } else if (event.target.classList.contains("reject-btn")) {
            event.target.parentElement.innerHTML += '<p style="color: red; font-weight: bold;">Leave Rejected</p>';
            localStorage.removeItem("leaveRequest");
        }
    });
});
