const userDirector = () => {
    const direction = document.querySelector(".redirecting");
    const signin = document.querySelector("#sign-in")
    const email = document.querySelector(".email");
    const password = document.querySelector(".password");
    const adminEmail = "admin@freementors.com";
    const adminPassword = "admin@123";
    const mentorEmail = "mentor@freementors.com";
    const mentorPassword = "mentor@123"

    direction.addEventListener("click", () => {
        if(email.value === adminEmail && password.value === adminPassword){
            signin.setAttribute("action", "admin.html");
        }
        if(email.value === mentorEmail && password.value === mentorPassword){
            signin.setAttribute("action", "mentor-homepage.html");
        }
    })
}
userDirector();