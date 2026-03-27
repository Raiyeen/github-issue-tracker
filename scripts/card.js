

const showingLabels =(labelsArry)=>{
    // console.log(labelsArry);
    const label = labelsArry.map((el) => `  
                <button
                    class="btn btn-sm btn-soft btn-secondary btn-outline border-3  rounded-2xl mb-2">
                    <i class="fa-solid fa-bug"></i> ${el}
                </button>
            `
    )

    return label.join(' ');
}


const showingPriority =(priorityValue)=>{
    const highPriority =`
        <span class="issue-priority btn btn-sm btn-outline btn-error bg-red-200 rounded-md w-max text-red-600">
            ${priorityValue}      
        </span>
    `

    const mediumPriority =`
        <span class="issue-priority btn btn-sm btn-outline btn-warning bg-yellow-200 rounded-md w-max text-yellow-600">
            ${priorityValue}      
        </span>
    `

    const lowPriority =`
        <span class="issue-priority btn btn-sm btn-outline btn-info bg-blue-200 rounded-md w-max text-blue-600">
            ${priorityValue}      
        </span>
    `
    if(priorityValue == 'high'){
        return highPriority;
    } else if(priorityValue == 'medium'){
        return mediumPriority;
    } else{
        return lowPriority;
    }
}


const issueBorderSetter = (priority)=>{
    if(priority == 'high'){
        return `border-t-[#E7000B]`
    } else if(priority == 'medium'){
        return 'border-t-[#D08700]'
    } else{
        return 'border-t-[#155DFC]'
    }
}


const openClosedStatusSetter = (status) => {
    if(status == 'open'){
        return `<img src="./assets/Open-Status.png" alt="">`
    } else {
        return `<img src="./assets/Closed- Status .png" alt="" />`
    }
}

const openClosedBtnSetter =(status)=>{
    if(status == 'open'){
        return `btn-success`
    } else {
        return `btn-primary`
    }
}


const removeActiveClass = () => {
    const allBtn = document.getElementsByClassName('issue-btn');
    for (const btn of allBtn) {
        btn.classList.remove('active');
    }
    // allBtn.forEach(btn => btn.classList.remove('active'));
}

removeActiveClass();

// const setActiveClass = (activebtn)=>{
//     removeActiveClass();
//     const status = activebtn.map((active) => (active.status));
//     const st = status.find((m)=> m == 'open' || 'closed');
//     document.getElementById(`${st}-issue-btn`).classList.add('active');
  
// }

const buttons = [
  document.getElementById('all-issue-btn'),
  document.getElementById('open-issue-btn'),
  document.getElementById('closed-issue-btn'),
];

function setActiveButton(activeBtn) {
  buttons.forEach(btn => btn.classList.remove('active')); // remove from all
  activeBtn.classList.add('active');                       // add to clicked
}

// const singleIssueUrl = 'https://phi-lab-server.vercel.app/api/v1/lab/issue/{id}'

const loadIssueDetails = async(id)=>{
    const singleIssueUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(singleIssueUrl);
    const details = await res.json();
    displayIssueDetails(details.data);
}

const displayIssueDetails = (issueDetails)=> {
    const issueDetailsContainer = document.getElementById('issueDetailsContainer');
    issueDetailsContainer.innerHTML = `
        <h2 class="text-xl font-semibold">${issueDetails.title}</h2>
          <span class="btn btn-xs ${openClosedBtnSetter(issueDetails.status)} rounded-2xl">${issueDetails.status}</span>
          <span class="text-sm text-[#64748B]">. author by ${issueDetails.author}</span>
          <span class="text-sm text-[#64748B]">. ${new Date(issueDetails.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          
            <div>
                ${showingLabels(issueDetails.labels)}
            </div>

          <p class="text-sm text-[#64748B]">${issueDetails.description}</p>

          <div
            class="w-full grid grid-cols-2 bg-gray-50 rounded-sm p-3"
          >
            <div>
              <p class="text-sm text-[#64748B]">Assignee</p>
              <h3 class="text-sm">${issueDetails.assignee}</h3>
            </div>
            <div>
              <p class="text-sm text-[#64748B]">Priority</p>
              ${showingPriority(issueDetails.priority)}
            </div>
          </div>
    
    `

    document.getElementById('my_modal_4').showModal();
    
}





let allIssues = []; // store fetched data globally

function loadAllIssues() {
  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

  fetch(url)
    .then(res => res.json())
    .then(json => {
      allIssues = json.data;      // save to global variable
      displayAllCards(allIssues); // show all on load
    });
}

loadAllIssues();


// Call on page load
// loadAllIssues();

document.getElementById('all-issue-btn').addEventListener('click', (e)=> {
    setActiveButton(e.target);
    displayAllCards(allIssues);
    
});


const displayAllCards =(allIssue)=>{

    const issueCounterContainer = document.getElementById('issue-counter');
    issueCounterContainer.innerHTML ='';
    const span = document.createElement('span');
    
    span.innerText = `${allIssue.length} issues`;
    issueCounterContainer.prepend(span);

    const allIssueCardContainer = document.getElementById('issue-card-container');
    allIssueCardContainer.innerHTML = '';

    allIssue.forEach(singleIssue =>{
      
        const singleIssuecard = document.createElement('div');
        singleIssuecard.innerHTML = `
            <div onclick="loadIssueDetails(${singleIssue.id})" class="issue-card p-4 rounded-sm shadow-xl border-t-4 ${issueBorderSetter(singleIssue.priority)}">
            <!-- card top -->
            <div class="card-top border-b border-[#a1a2a4] space-y-3 pb-5">
              <div class="issue-status-holder flex justify-between items-center">
                <div class="issue-status-image">
                    ${openClosedStatusSetter(singleIssue.status)}
                    
                </div>
                ${showingPriority(singleIssue.priority)}
              </div>

              <!-- card h2 -->
              <h2 class="text-xl font-bold">
                ${singleIssue.title}
              </h2>

              <!-- card p -->
              <p class="text-sm font-normal text-[#64748B]">
                ${singleIssue.description}
              </p>

              <!-- card buttons -->

              
              <div>
                ${showingLabels(singleIssue.labels)}
              </div>
            </div>


            <!-- card bottom -->
             <div class="card-bottom text-sm font-normal text-[#64748B] pt-2">
                <p>#${singleIssue.id} by ${singleIssue.author}</p>
                <span>${new Date(singleIssue.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
             </div>
          </div>

        
        `
        
        allIssueCardContainer.append(singleIssuecard);
    });
}


document.getElementById('open-issue-btn').addEventListener('click', (e) => {
  const filtered = allIssues.filter(issue => issue.status.toLowerCase() === 'open');
  setActiveButton(e.target);
  displayAllCards(filtered);
});

document.getElementById('closed-issue-btn').addEventListener('click', (e) => {
  const filtered = allIssues.filter(issue => issue.status.toLowerCase() === 'closed');
  setActiveButton(e.target);
  displayAllCards(filtered);
  
});

setActiveButton(document.getElementById('all-issue-btn'));



document.getElementById('input-search').addEventListener('keypress', (e)=>{
    if(e.key === 'Enter'){
        removeActiveClass();
        const searchInput = document.getElementById('input-search');
        const searchValue = searchInput.value.trim().toLowerCase();
        console.log(searchValue);

        const filtered = allIssues.filter(issue =>
    issue.title.toLowerCase().includes(searchValue)
  );

  displayAllCards(filtered);
        
    }
})


