const historyList = document.getElementById("history-list");
const backbtn = document.getElementById("back-btn");


const quizHistory = JSON.parse(localStorage.getItem("quizHistory")) || [];


if (quizHistory.length === 0){
    historyList.innerHTML = "<p>No history yet. Play a game first!</p>";
}else{
    historyList.innerHTML = quizHistory.map(
    (entry,index) => `<p><strong>${index +1}.${entry.name}</strong> - $(entry.score}/${entry.total} (${entry.date})</p>`
    )
    .join("");

}
backbtn.addEventListener("click",() =>{
    window.location.href = "login.html";
});
    

