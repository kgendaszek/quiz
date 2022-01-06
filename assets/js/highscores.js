console.log("highscores entered");


function displayHighscores() {
    console.log('displayHighScores');
    var highscores = JSON.parse(localStorage.getItem('scores'));

    highscores.sort(function(a, b) {
        return b.score - a.score;
    });

    for (var i = 0; i < highscores.length; i++ ) {
        var liEl = document.createElement('li');
        liEl.textContent = highscores[i].score + " - " + highscores[i].initials;

        document.getElementById('highscores').appendChild(liEl);
    }
}
function clearHighscores (){
    localStorage.removeItem('highscores');
    location.reload();
}
document.getElementById("clear").onclick = clearHighscores;

displayHighscores();
