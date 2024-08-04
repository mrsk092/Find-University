let baseUrl = "http://universities.hipolabs.com/search?name=";
let btn = document.querySelector("button");
let cooldownMessage = document.querySelector("#cooldown-message");
let cooldown = false;
let cooldownTime = 5000;

btn.addEventListener("click", async () => {
    if (cooldown) {
        cooldownMessage.innerText = "Please wait before making another request.";
        return;
    }
    
    cooldown = true;
    setTimeout(() => {
        cooldown = false;
        cooldownMessage.innerText = "";
    }, cooldownTime);

    let country = document.querySelector("input").value;
    console.log(country);

    let colleges = await getCollege(country);
    show(colleges);
});

async function getCollege(country) {
    try {
        let response = await axios.get(baseUrl + country);
        return response.data;
    } catch {
        console.log("Something went wrong");
        return [];
    }
}

function show(colleges) {
    let ul = document.querySelector("ul");
    ul.innerHTML = "";

    colleges.forEach((college, index) => {
        setTimeout(() => {
            let li = document.createElement("li");
            li.innerText = college.name;
            li.classList.add("fade-in");
            ul.appendChild(li);
        }, index * 300); 
    });
}
