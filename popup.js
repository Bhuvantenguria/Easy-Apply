// popup.js
document.getElementById("viewHistory").addEventListener("click", () => {
    chrome.storage.local.get({ appliedJobs: [] }, (result) => {
      const historyDiv = document.getElementById("history");
      historyDiv.innerHTML = "<h2>Application History:</h2>";
      result.appliedJobs.forEach((job) => {
        const div = document.createElement("div");
        div.textContent = `Applied at: ${job.url} on ${new Date(job.date).toLocaleString()}`;
        historyDiv.appendChild(div);
      });
    });
  });
  