const TEAMS = [
  "Team A", "Team B", "Team C", "Team D",
  "Team E", "Team F", "Team G", "Team H",
  "Team I", "Team J", "Team K", "Team L",
  "Team M", "Team N", "Team O", "Team P"
];

let rounds = [];

function createBracket(teams) {
  const bracketContainer = document.getElementById("bracket");
  bracketContainer.innerHTML = "";

  // Round 1 - pair teams
  const r1 = [];
  for (let i = 0; i < teams.length; i += 2) {
    r1.push([teams[i], teams[i + 1]]);
  }
  rounds = [r1];

  // Build empty future rounds
  for (let size = r1.length / 2; size >= 1; size = size / 2) {
    rounds.push(new Array(size).fill([null, null]));
  }

  drawBracket();
}

function drawBracket() {
  const bracket = document.getElementById("bracket");
  bracket.innerHTML = "";

  rounds.forEach((round, roundIndex) => {
    const roundDiv = document.createElement("div");
    roundDiv.className = "round";

    round.forEach((match, matchIndex) => {
      const matchDiv = document.createElement("div");
      matchDiv.className = "match";

      match.forEach((team, teamIndex) => {
        const teamDiv = document.createElement("div");
        teamDiv.className = "team";

        if (team) {
          teamDiv.textContent = team;
          teamDiv.onclick = () => handleWinner(roundIndex, matchIndex, teamIndex);
        } else {
          teamDiv.innerHTML = "<em>?</em>";
        }

        matchDiv.appendChild(teamDiv);
      });

      roundDiv.appendChild(matchDiv);
    });

    bracket.appendChild(roundDiv);
  });
}

function handleWinner(roundIndex, matchIndex, teamIndex) {
  const winner = rounds[roundIndex][matchIndex][teamIndex];
  if (!winner) return;

  // Mark this as winner
  const matchEl = document.querySelectorAll(".round")[roundIndex].children[matchIndex];
  [...matchEl.children].forEach((el) => {
    el.classList.remove("winner", "champion");
    if (el.textContent === winner) {
      el.classList.add(roundIndex === rounds.length - 1 ? "champion" : "winner");
    }
  });

  // Advance to next round
  if (roundIndex + 1 < rounds.length) {
    const nextMatchIndex = Math.floor(matchIndex / 2);
    const position = matchIndex % 2;
    const newMatch = [...rounds[roundIndex + 1][nextMatchIndex]];
    newMatch[position] = winner;
    rounds[roundIndex + 1][nextMatchIndex] = newMatch;
    drawBracket();
  }
}

function resetBracket() {
  createBracket(TEAMS);
}

// Start the bracket
createBracket(TEAMS);
