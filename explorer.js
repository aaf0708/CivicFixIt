const issuesList = document.getElementById('issuesList');

const dummyIssues = [
  {id:1, category:"Pothole", desc:"Big pothole on Main St", status:"Open", verify: 0, img:"pothole.jpeg"},
  {id:2, category:"Garbage", desc:"Garbage pile near park", status:"Open", verify: 0, img:"garbage.jpeg"},
  {id:3, category:"Streetlight", desc:"Streetlight not working", status:"Resolved", verify: 0, img:"streetlight.jpg"},
  {id:4, category:"Water", desc:"Water leakage on 2nd Ave", status:"Open", verify: 0, img:"water.jpeg"},
  {id:5, category:"Electricity", desc:"Power outage near mall", status:"Resolved", verify: 0, img:"electricity.avif"}
];

const imageModal = document.createElement('div');
imageModal.className = 'modal';
imageModal.style.display = 'none';
imageModal.innerHTML = `
  <div class="modal-content">
    <span class="close">&times;</span>
    <img id="issueImage" src="" alt="Issue Image" style="max-width:90vw; max-height:90vh; border-radius:8px;">
  </div>
`;
document.body.appendChild(imageModal);

const issueImage = imageModal.querySelector('#issueImage');
const closeModal = imageModal.querySelector('.close');

closeModal.onclick = () => { imageModal.style.display = 'none'; };
window.onclick = (e) => { if(e.target === imageModal) imageModal.style.display = 'none'; };

function displayDummyIssues() {
  const sortedIssues = dummyIssues.sort((a, b) => b.verify - a.verify);
  issuesList.innerHTML = "";

  sortedIssues.forEach(issue => {
    const div = document.createElement("div");
    div.className = "issue-card";

    div.innerHTML = `
      <div class="issue-category">
        ${issue.category} 
        <span class="status ${issue.status.toLowerCase()}">${issue.status}</span>
        <button class="verifyBtn">✅ <span class="count">${issue.verify}</span></button>
      </div>
      <div class="issue-desc">${issue.desc}</div>
      <img src="${issue.img}" class="thumbnail" alt="${issue.category}" />
    `;

    const verifyBtn = div.querySelector(".verifyBtn");
    const countSpan = verifyBtn.querySelector(".count");
    verifyBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      issue.verify++;
      countSpan.textContent = issue.verify;
      displayDummyIssues();
    });

    const thumb = div.querySelector(".thumbnail");
    thumb.addEventListener('click', (e) => {
      e.stopPropagation();
      issueImage.src = issue.img;
      imageModal.style.display = 'flex';
    });

    issuesList.appendChild(div);
  });
}

displayDummyIssues();
