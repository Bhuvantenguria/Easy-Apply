// content.js
(function () {
    const formFields = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      resume: "https://example.com/resume.pdf", // Replace with actual resume upload logic
    };
  
    // Autofill logic
    const fillForm = () => {
      for (const [field, value] of Object.entries(formFields)) {
        const input = document.querySelector(`input[name="${field}"], textarea[name="${field}"]`);
        if (input) {
          input.value = value;
          input.dispatchEvent(new Event("input", { bubbles: true }));
        }
      }
      console.log("Form fields filled.");
    };
  
    // Check if already applied
    chrome.storage.local.get({ appliedJobs: [] }, (result) => {
      const currentUrl = window.location.href;
      const alreadyApplied = result.appliedJobs.some((job) => job.url === currentUrl);
  
      if (alreadyApplied) {
        alert("You have already applied for this job.");
      } else {
        fillForm();
        chrome.runtime.sendMessage({ type: "saveJob", url: currentUrl });
      }
    });
  })();
  