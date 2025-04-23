fetch("http://localhost:5000/leaderboard")
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#leaderboard-table tbody");
    data.forEach((player, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${player.username}</td>
        <td>${player.score}</td>
      `;

      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Error fetching leaderboard:", err);
  });
