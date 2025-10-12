const startBtn = document.getElementById("start-btn");


startBtn.addEventListener("click",() => {
    const name = document.getElementById("username").value.trim();
    
    if (name){
        localStorage.setItem("playerName", name);
        window.location.href = "index.html";
    }else{
        alert("Please enter your name before starting!");

    }    
});