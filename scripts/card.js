// // GitHub API configuration
// const GITHUB_API_BASE = 'https://api.github.com/repos';
// const REPO_OWNER = 'facebook'; // Change this to your repo owner
// const REPO_NAME = 'react'; // Change this to your repo name

// // Get DOM elements
// const allBtn = document.querySelector('button:nth-of-type(1)'); // All button
// const closeBtn = document.querySelector('button:nth-of-type(2)'); // Close button
// const openBtn = document.querySelector('button:nth-of-type(3)'); // Open button
// const issueCardContainer = document.querySelector('.issue-card-container');

// // Fetch all issues
// async function fetchAllIssues() {
//   try {
//     const url = `${GITHUB_API_BASE}/${REPO_OWNER}/${REPO_NAME}/issues?state=all&per_page=12`;
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error(`GitHub API error: ${response.status}`);
//     }
    
//     const issues = await response.json();
//     displayIssues(issues);
//   } catch (error) {
//     console.error('Error fetching issues:', error);
//     showErrorMessage('Failed to load issues');
//   }
// }

// // Fetch open issues
// async function fetchOpenIssues() {
//   try {
//     const url = `${GITHUB_API_BASE}/${REPO_OWNER}/${REPO_NAME}/issues?state=open&per_page=12`;
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error(`GitHub API error: ${response.status}`);
//     }
    
//     const issues = await response.json();
//     displayIssues(issues);
//   } catch (error) {
//     console.error('Error fetching issues:', error);
//     showErrorMessage('Failed to load issues');
//   }
// }

// // Fetch closed issues
// async function fetchClosedIssues() {
//   try {
//     const url = `${GITHUB_API_BASE}/${REPO_OWNER}/${REPO_NAME}/issues?state=closed&per_page=12`;
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       throw new Error(`GitHub API error: ${response.status}`);
//     }
    
//     const issues = await response.json();
//     displayIssues(issues);
//   } catch (error) {
//     console.error('Error fetching issues:', error);
//     showErrorMessage('Failed to load issues');
//   }
// }

// // Display issues in the card container
// function displayIssues(issues) {
//   issueCardContainer.innerHTML = '';

//   if (issues.length === 0) {
//     issueCardContainer.innerHTML =
//       '<div class="col-span-3 text-center p-8"><p class="text-gray-500">No issues found</p></div>';
//     return;
//   }

//   issues.forEach((issue) => {
//     const card = createIssueCard(issue);
//     issueCardContainer.appendChild(card);
//   });
// }

// // Create a single issue card
// function createIssueCard(issue) {
//   const card = document.createElement('div');
//   card.className =
//     'issue-card p-4 rounded-sm shadow-xl border-t-4 border-t-[#00A96E]';

//   // Determine status color based on issue state
//   const statusColor = issue.state === 'closed' ? 'border-t-red-500' : 'border-t-green-500';
//   card.classList.remove('border-t-[#00A96E]');
//   card.classList.add(statusColor);

//   // Determine priority from labels
//   const priorityLabel = issue.labels.find(label => 
//     ['high', 'medium', 'low'].includes(label.name.toLowerCase())
//   );
//   const priority = priorityLabel ? priorityLabel.name.toUpperCase() : 'MEDIUM';

//   // Format date
//   const createdDate = new Date(issue.created_at).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   });

//   card.innerHTML = `
//     <!-- card top -->
//     <div class="card-top border-b border-[#a1a2a4] space-y-3 pb-5">
//       <div class="issue-status-holder flex justify-between items-center">
//         <div class="issue-status-image">
//           <span class="text-xs font-bold px-2 py-1 rounded-full ${
//             issue.state === 'closed'
//               ? 'bg-red-100 text-red-800'
//               : 'bg-green-100 text-green-800'
//           }">
//             ${issue.state.toUpperCase()}
//           </span>
//         </div>
//         <span class="issue-priority btn btn-sm btn-outline btn-error bg-red-200 rounded-md w-max text-red-600">
//           ${priority}
//         </span>
//       </div>

//       <!-- card h2 -->
//       <h2 class="text-xl font-bold line-clamp-2">
//         ${issue.title}
//       </h2>

//       <!-- card p -->
//       <p class="text-sm font-normal text-[#64748B] line-clamp-2">
//         ${issue.body ? issue.body.substring(0, 100) + '...' : 'No description provided'}
//       </p>

//       <!-- card buttons -->
//       <div class="flex flex-wrap gap-2">
//         ${issue.labels
//           .slice(0, 2)
//           .map(
//             (label) => `
//           <button class="btn btn-sm btn-outline border-2 rounded-2xl text-[12px]" 
//             style="border-color: #${label.color}; color: #${label.color}; background-color: #${label.color}20;">
//             ${label.name}
//           </button>
//         `
//           )
//           .join('')}
//       </div>
//     </div>

//     <!-- card bottom -->
//     <div class="card-bottom text-sm font-normal text-[#64748B] pt-2">
//       <p>#${issue.number} by ${issue.user.login}</p>
//       <span>${createdDate}</span>
//     </div>
//   `;

//   return card;
// }

// // Show error message
// function showErrorMessage(message) {
//   issueCardContainer.innerHTML = `
//     <div class="col-span-3 text-center p-8">
//       <p class="text-red-500">${message}</p>
//     </div>
//   `;
// }

// // Event listeners
// allBtn.addEventListener('click', fetchAllIssues);
// closeBtn.addEventListener('click', fetchClosedIssues);
// openBtn.addEventListener('click', fetchOpenIssues);

// // Fetch all issues on page load
// document.addEventListener('DOMContentLoaded', fetchAllIssues);



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



// document.getElementById('issue-all-btn').addEventListener('click', ()=>{
//     const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

//     fetch(url)
//     .then(res => res.json())
//     .then(json => displayAllCards(json.data))
    
// } )

function loadAllIssues() {
  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

  fetch(url)
    .then(res => res.json())
    .then(json => displayAllCards(json.data))
}

// Call on page load
loadAllIssues();

// Still works on button click too
document.getElementById('issue-all-btn').addEventListener('click', loadAllIssues);


const displayAllCards =(allIssue)=>{

    const issueCounterContainer = document.getElementById('issue-counter');
    const h2 = document.createElement('h2');
    h2.innerText = `${allIssue.length} issues`
    issueCounterContainer.prepend(h2);

    // console.log(allIssue.length);
    // getting the parent 
    const allIssueCardContainer = document.getElementById('issue-card-container');

    allIssue.forEach(singleIssue =>{
        // console.log(singleIssue, typeof singleIssue);
        //creating thr child

        // console.log(singleIssue.labels)
        const singleIssuecard = document.createElement('div');
        singleIssuecard.innerHTML = `
            <div class="issue-card p-4 rounded-sm shadow-xl border-t-4 ${issueBorderSetter(singleIssue.priority)}">
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

        // console.log(singleIssuecard);
        
        allIssueCardContainer.append(singleIssuecard);
    });
}


function loadAllClosedIssues() {
  const url = 'https://phi-lab-server.vercel.app/api/v1/lab/issues';

  fetch(url)
    .then(res => res.json())
    .then(json => displaycloseCards(json.data));
}

// loadAllClosedIssues();

document.getElementById('closed-issue-btn').addEventListener('click', loadAllClosedIssues);

const displaycloseCards =(allClosedIssue)=>{
    const filterIssue = allClosedIssue.filter(allstatus => allstatus.status == 'closed');
    displayAllCards(filterIssue);
}


