document.addEventListener("DOMContentLoaded",function(){
  const searchButton=document.getElementById("search-btn")
  const usernameInput=document.getElementById("username-input")
  const statsContainer=document.querySelector(".stats-container")
  const easyProgressCircle=document.querySelector(".easy")
  const mediumProgressCircle=document.querySelector(".medium")
  const hardProgressCircle=document.querySelector(".hard")
  const easyLabel=document.getElementById("easy-label")
  const mediumLabel=document.getElementById("medium-label")
  const hardLabel=document.getElementById("hard-label")
  const rankLabel=document.getElementById("rank-label")
  const acceptLabel=document.getElementById("accept-label")
  const contriLabel=document.getElementById("contri-label")
  const reputeLabel=document.getElementById("repute-label")

  /*Validating username*/
function validateUsername(username) {
  // Check empty username
  if (username.trim() === "") {
    alert("Username should not be empty");
    return false;
  }
  // Regex:
  // starts with letter
  // allows letters, numbers, underscore
  // length: 3 to 15
  const regex = /^[a-zA-Z][a-zA-Z0-9_]{2,14}$/;
  const isMatching = regex.test(username);
  if (!isMatching) {
    alert("Invalid username");
  }
  return isMatching;
}
/*Fetching userdetails through URL*/
async function fetchUserDetails(username) {
  try {
    searchButton.textContent = "Searching...";
    searchButton.disabled = true;
         // Target URL
   const response = await fetch(
    `https://leetcode-stats-api.herokuapp.com/${username}`
  );
  
    if (!response.ok) {
      throw new Error("Unable to fetch the user details");
    }

    const data = await response.json();
    console.log("Logging data", data);
    displayUserData(data);
    /*Update progress*/
function updateProgress(solved, total, label, circle) {
  if (total === 0) {
    circle.style.setProperty("--progress", "0%");
    label.textContent = "0/0";
    return;
  }

  const progress = (solved / total) * 100;
  circle.style.setProperty("--progress", `${progress}%`);
  label.textContent = `${solved}/${total}`;
}

    /*Display user data*/
function displayUserData(data){
  
const totalSolved  = data.totalSolved;
const totalQuestions = data.totalQuestions;
const easySolved = data.easySolved;
const totalEasy = data.totalEasy;
const mediumSolved = data.mediumSolved;
const totalMedium  = data.totalMedium;
const hardSolved  = data.hardSolved;
const totalHard  = data.totalHard;

updateProgress(easySolved,totalEasy,easyLabel,easyProgressCircle)
updateProgress(mediumSolved,totalMedium,mediumLabel,mediumProgressCircle)
updateProgress(hardSolved,totalHard,hardLabel,hardProgressCircle)
      
    }
  /*StatsData display*/
  function statsDisplay(rank,contri,accept,repute){
    rank.textContent = data.ranking;
  contri.textContent = data.contributionPoints;
  accept.textContent = data.acceptanceRate;
  repute.textContent = data.reputation;
}
  statsDisplay(rankLabel,contriLabel,acceptLabel,reputeLabel)

  }catch (error) {
  statsContainer.innerHTML = "<p> No Data Found</p>"
  } finally {
    searchButton.textContent = "Search";
    searchButton.disabled = false;
  }
}

 /* fetching username*/
  searchButton.addEventListener('click', function(){
    const username=usernameInput.value;
    console.log("Logging username",username);
  
  if(validateUsername(username)){
    fetchUserDetails(username);
  }
    
    
  })
})