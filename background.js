// background.js
chrome.runtime.onInstalled.addListener(() => {
    console.log("Auto Apply Extension installed.");
  });
  
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "saveJob") {
      // Save applied job to storage
      chrome.storage.local.get({ appliedJobs: [] }, (result) => {
        const jobs = result.appliedJobs;
        jobs.push({ url: message.url, date: new Date().toISOString() });
        chrome.storage.local.set({ appliedJobs: jobs }, () => {
          console.log("Job saved:", message.url);
          sendResponse({ success: true });
        });
      });
      return true; // Keeps the message channel open for async response
    }
  });
  