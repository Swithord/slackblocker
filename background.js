chrome.webNavigation.onBeforeNavigate.addListener(function (details) {
    if (details.url.includes("netflix.com")) {
      chrome.tabs.update(details.tabId, { url: "https://leetcode.com" });
    }
  });



  // Obtains the file that contains count and time and updates them if at least one changed
  function compareValues(result) {
    problemsSolved = getLeetCodeTotalSolved()
    if (!result || Object.keys(result).length === 0) {
      // If the result object is empty or doesn't exist, create it
      const defaultValueForCount = problemsSolved;
      const defaultValueForTime = new Date().getTime();
      result = { count: defaultValueForCount, time: defaultValueForTime };
    }
  
    // Check if the count has changed
    if (result.count !== problemsSolved) {
      // If it has, update the count and reset the time
      result.count = problemsSolved;
      result.time = new Date().getTime();
    }
  }
  
  // Set default values
  
  chrome.storage.sync.get(['count', 'time'], compareValues);


  // API Call to leetcode-api that obtains the data for the leetcode user

  async function getLeetCodeTotalSolved() {
    // Retrieve username from Chrome Storage
    const result = await new Promise(resolve => {
      chrome.storage.sync.get(['username'], resolve);
    });
  
    const username = result.username;
  
    // Check if the username exists
    if (!username) {
      console.error('Username not found in Chrome Storage');
      return null;
    }
  
    // Construct the API URL
    const apiUrl = `https://leetcode-api-faisalshohag.vercel.app/${username}`;
  
    try {
      // Make the API call using async/await
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Return the totalSolved value
      return data.totalSolved;
    } catch (error) {
      console.error('API Error:', error);
      return null;
    }
  }
  
      