document.getElementById('findAnswer').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "findBestAnswer" }, (response) => {
      if (chrome.runtime.lastError) {
        console.error(chrome.runtime.lastError.message);
        alert("An error occurred while searching for the best answer.");
        return;
      }

      if (response.status === "Success" && response.bestAnswer) {
        alert(`Best matching answer: ${response.bestAnswer}`);
      } else {
        alert("No relevant answer found.");
      }
    });
  });
});
