chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url && tab.url.includes("learning.mheducation.com")) {
      // Automatically send a message to the content script when the tab becomes active
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          func: () => {
            chrome.runtime.sendMessage({ action: "findBestAnswer" }, (response) => {
              if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError.message);
                return;
              }

              if (response && response.status === "Success" && response.bestAnswer) {
                console.log(`Best matching answer: ${response.bestAnswer}`);
              } else {
                console.log("No relevant answer found.");
              }
            });
          },
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError.message);
          }
        }
      );
    }
  });
});
