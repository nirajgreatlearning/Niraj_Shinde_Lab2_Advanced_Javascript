var resumes = [];
var filteredResumes = [];
var currentResumeIndex = 0;

const txtsearchResume = document.getElementById("txtSearchResume");
txtsearchResume.addEventListener("keyup", setQuery);
let noSearchResult = document.getElementById('search-results');

var nxtBtn = document.getElementById('next-btn');
var prvBtn = document.getElementById('prev-btn');

var searchResultArea = document.getElementById('search-result-area');
var resumeDisplayArea = document.querySelector('.resume-container');
var searchBarArea = document.querySelector('.search-bar-area');



function initResume() {
	if (isUserLoggedIn()) {
		getResumeData();
	}
	else {
		window.location = 'Login.html';
	}
}

function getResumeData() {
	const url = 'data/data.json';

	// Calling the API
	fetch(url)
		.then((response) => {
			return response.json();
		})
		.then((responseJson) => {
			if (responseJson != null && responseJson.resume != null && responseJson.resume.length > 0) {
				resumes = responseJson.resume;
				filteredResumes = resumes;
				renderResume();
			}
			else {
				displayNoDataFound();
			}
		})
		.catch(err => {
			console.log(err);
			displayNoDataFound();
		});
}

function displayNoDataFound() {
	searchBarArea.style.display = "none";
	showNoSearchResultsAndHideResume();
	renderNoSearchResult();
}

function isUserLoggedIn() {
	var isloggedIn = false;
	var userName = window.localStorage.getItem('username');
	if (userName === "admin") {
		isloggedIn = true;
	}
	return isloggedIn;
}

function setQuery(evt) {
	filterResumes(txtsearchResume.value);
}

function filterResumes(searchResume) {
	currentResumeIndex = 0;
	noSearchResult.innerHTML = "";
	if (searchResume.length > 0) {
		filteredResumes = resumes.filter((el) => el.basics.AppliedFor.toLowerCase().includes(searchResume.toLowerCase()));
		console.log(filteredResumes);
		console.log(resumes);
		if (filteredResumes.length > 0) {
			renderResume();
		}
		else {
			showNoSearchResultsAndHideResume();
			renderNoSearchResult();
		}
	}
	else {
		filteredResumes = resumes;
		renderResume();
	}
}

function renderNoSearchResult() {
	noSearchResult.innerHTML = `
			<div style="border: 1px solid black; border-radius: 10px; padding: 20px; margin-left: 20%; margin-right: 20%">
				<img width='80' height='80' src='images/no-result-found.png' alt='No results found'/>
				<span style="text-align: center; position: absolute; top: 100px;"> No results found</span>
			</div>
		`;
}

function showNoSearchResultsAndHideResume() {
	searchResultArea.style.display = 'block';
	resumeDisplayArea.style.display = 'none';
}

function showResumeAndHideNoSearchResults() {
	searchResultArea.style.display = 'none'
	resumeDisplayArea.style.display = 'block'
}

function handleNext() {
	currentResumeIndex = currentResumeIndex + 1;
	renderResume();
}

function handlePrev() {
	currentResumeIndex = currentResumeIndex - 1;
	renderResume();
}

function renderResume() {
	var searchResult = filteredResumes[currentResumeIndex];

	showResumeAndHideNoSearchResults();

	renderResumeHeader(searchResult.basics.name, searchResult.basics.AppliedFor);
	renderPI(searchResult.basics);
	renderTechnicalSkills(searchResult.skills.keywords);
	renderHobbies(searchResult.interests.hobbies);
	renderCompanyDetails(searchResult.work);
	renderProject(searchResult.projects);
	renderEducation(searchResult.education);
	renderInternship(searchResult.Internship);
	renderAchievements(searchResult.achievements.Summary);
	displayNavigationButtons();
}

function renderProject(project) {
	let projectNode = document.getElementById('project-details')
	projectNode.innerHTML = "";
	let pname = project.name
	let pdesc = project.description
	let pnameNode = document.createElement('b')
	pnameNode.innerText = pname + ': '
	let pdescNode = document.createElement('span')
	pdescNode.innerText = pdesc
	projectNode.appendChild(pnameNode)
	projectNode.appendChild(pdescNode)
}

function renderPI(basics) {
	let mNum = document.getElementById('mobile-number')
	let email = document.getElementById('email')
	let linkedin = document.getElementById('linkedin')

	mNum.innerText = basics.phone
	email.innerText = basics.email

	linkedin.innerHTML = ''
	let lNode = document.createElement('a')
	lNode.innerText = 'Linkedin'
	lNode.href = basics.profiles.url
	linkedin.appendChild(lNode)
}

function renderEducation(education) {
	let ugNode = document.getElementById('ug')
	let ssNode = document.getElementById('senior-secondary')
	let hsNode = document.getElementById('high-school')

	ugNode.innerText = `${education.UG.institute}, ${education.UG.course}, ${education.UG['Start Date']}, ${education.UG['End Date']}, ${education.UG.cgpa}`
	ssNode.innerText = `${education['Senior Secondary'].institute}, ${education['Senior Secondary'].cgpa}`
	hsNode.innerText = `${education['High School'].institute}, ${education['High School'].cgpa}`
}

function renderResumeHeader(name, appliedFor) {
	let nameNode = document.getElementById('name')
	let appliedForNode = document.getElementById('appliedFor')
	nameNode.innerText = name;
	appliedForNode.innerText = appliedFor;
}

function renderCompanyDetails(companyDetails) {
	let prevCompanyName = document.getElementById('prev-company-name')
	let prevCompanyPosition = document.getElementById('prev-company-position')
	let prevCompanyStartDate = document.getElementById('prev-company-start-date')
	let prevCompanyEndDate = document.getElementById('prev-company-end-date')
	let prevCompanySummary = document.getElementById('prev-company-summary')

	prevCompanyName.innerText = companyDetails['Company Name']
	prevCompanyPosition.innerText = companyDetails.Position
	prevCompanyStartDate.innerText = companyDetails['Start Date']
	prevCompanyEndDate.innerText = companyDetails['End Date']
	prevCompanySummary.innerText = companyDetails.Summary
}

function renderTechnicalSkills(keywords) {
	let tech_skills = document.getElementById('tech-skills')
	tech_skills.innerHTML = ''
	keywords.forEach(k => {
		tech_skills.appendChild(document.createTextNode(k));
		tech_skills.appendChild(document.createElement('br'));
	})
}

function renderHobbies(hobbies) {
	let hobbiesNode = document.getElementById('hobbies')
	hobbiesNode.innerHTML = ''
	hobbies.forEach(h => {
		hobbiesNode.appendChild(document.createTextNode(h));
		hobbiesNode.appendChild(document.createElement('br'));
	})
}

function renderInternship(internship) {
	let prevInternName = document.getElementById('internship-name')
	let prevInternPosition = document.getElementById('internship-position')
	let prevInternStartDate = document.getElementById('internship-start-date')
	let prevInternEndDate = document.getElementById('internship-end-date')
	let prevInternSummary = document.getElementById('internship-summary')

	prevInternName.innerText = internship['Company Name']
	prevInternPosition.innerText = internship.Position
	prevInternStartDate.innerText = internship['Start Date']
	prevInternEndDate.innerText = internship['End Date']
	prevInternSummary.innerText = internship.Summary
}

function renderAchievements(achievements) {
	let achievementList = document.getElementById('achievements')
	achievementList.innerHTML = ''
	achievements.forEach(a => {
		let lNode = document.createElement('li')
		lNode.innerText = a
		achievementList.appendChild(lNode);
	})
}

function displayNavigationButtons() {
	nxtBtn.style.display = 'none';
	prvBtn.style.display = 'none';
	if (filteredResumes.length > 1) {
		if (currentResumeIndex < filteredResumes.length - 1) {
			nxtBtn.style.display = 'inline';
		}
		if (!(currentResumeIndex === 0)) {
			prvBtn.style.display = 'inline';
		};
	}
}

initResume();
