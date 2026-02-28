const trackBtn = document.getElementById('trackBtn');
const issueIdInput = document.getElementById('issueIdInput');
const trackList = document.getElementById('trackList');

const imageModal = document.getElementById('imageModal');
const issueImage = document.getElementById('issueImage');
const closeImageModal = document.getElementById('closeImageModal');

closeImageModal.onclick = () => { imageModal.style.display = 'none'; };
window.onclick = (e) => { if(e.target === imageModal) imageModal.style.display = 'none'; };

const dummyIssues = [
  {id:1, category:"Pothole", desc:"Big pothole on Main St", status:"Open", verify: 5, img:"pothole.jpeg"},
  {id:2, category:"Garbage", desc:"Garbage pile near park", status:"Open", verify: 3, img:"garbage.jpeg"},
  {id:3, category:"Streetlight", desc:"Streetlight not working", status:"Resolved", verify: 2, img:"streetlight.jpg"},
  {id:4, category:"Water", desc:"Water leakage on 2nd Ave", status:"Open", verify: 4, img:"water.jpeg"},
  {id:5, category:"Electricity", desc:"Power outage near mall", status:"Resolved", verify: 1, img:"electricity.avif"}
];

trackBtn.addEventListener('click', () => {
  const id = parseInt(issueIdInput.value);
  if(isNaN(id)) { alert("Enter a valid Issue ID"); return; }

  const issue = dummyIssues.find(i => i.id === id);
  trackList.innerHTML = "";

  if(!issue) {
    trackList.innerHTML = "<p>Issue not found.</p>";
    return;
  }

  const div = document.createElement('div');
  div.className = 'issue-card';
  div.innerHTML = `
    <img src="${issue.img}" class="thumbnail" alt="${issue.category}" />
    <div class="issue-info">
      <div class="issue-category">${issue.category} 
        <span class="issue-status">${issue.status}</span>
        <button class="verifyBtn">✅ <span class="count">${issue.verify}</span></button>
      </div>
      <div class="issue-desc">${issue.desc}</div>
    </div>
  `;

  // Verify button click
  const verifyBtn = div.querySelector(".verifyBtn");
  const countSpan = div.querySelector(".count");
  verifyBtn.addEventListener('click', () => {
    issue.verify++;
    countSpan.textContent = issue.verify;
  });

  const thumb = div.querySelector(".thumbnail");
  thumb.addEventListener('click', () => {
    issueImage.src = issue.img;
    imageModal.style.display = 'flex';
  });

  trackList.appendChild(div);
});
