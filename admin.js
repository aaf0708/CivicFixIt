/* // Dummy admin credentials
const admins = [
  { username: "gov_official1", password: "pass123" },
  { username: "gov_official2", password: "pass456" }
];

// Dummy issues (can be same as explore)
let issues = [
  {id:1, category:"Pothole", desc:"Big pothole on Main St", status:"Open", verify: 3, img:"images/pothole.jpeg"},
  {id:2, category:"Garbage", desc:"Garbage pile near park", status:"Open", verify: 2, img:"images/garbage.jpeg"},
  {id:3, category:"Streetlight", desc:"Streetlight not working", status:"Resolved", verify: 5, img:"images/streetlight.jpg"}
];

const loginSection = document.getElementById('loginSection');
const dashboard = document.getElementById('dashboard');
const adminLoginBtn = document.getElementById('adminLoginBtn');
const loginError = document.getElementById('loginError');
const adminIssuesList = document.getElementById('adminIssuesList');

// Login logic
adminLoginBtn.addEventListener('click', () => {
  const username = document.getElementById('adminUsername').value;
  const password = document.getElementById('adminPassword').value;

  const valid = admins.find(a => a.username === username && a.password === password);

  if(valid) {
    loginSection.style.display = 'none';
    dashboard.style.display = 'block';
    renderAdminIssues();
  } else {
    loginError.textContent = "Invalid credentials!";
  }
});

// Render issues for admin
function renderAdminIssues() {
  // Sort by verify count
  issues.sort((a,b) => b.verify - a.verify);
  adminIssuesList.innerHTML = "";

  issues.forEach(issue => {
    const div = document.createElement('div');
    div.className = 'issue-card';
    div.innerHTML = `
      <div class="issue-category">
        ${issue.category} - <span class="status ${issue.status.toLowerCase()}">${issue.status}</span>
        <button class="verifyBtn">✅ <span class="count">${issue.verify}</span></button>
      </div>
      <div class="issue-desc">${issue.desc}</div>
      <img src="${issue.img}" class="thumbnail" style="width:100px;cursor:pointer" />
      <button class="resolveBtn">Mark as Resolved</button>
    `;

    // Verify button increases count
    const verifyBtn = div.querySelector('.verifyBtn');
    const countSpan = div.querySelector('.count');
    verifyBtn.addEventListener('click', () => {
      issue.verify++;
      countSpan.textContent = issue.verify;
      renderAdminIssues();
    });

    // Resolve button
    const resolveBtn = div.querySelector('.resolveBtn');
    resolveBtn.addEventListener('click', () => {
      issue.status = "Resolved";
      renderAdminIssues();
    });

    // Thumbnail click opens image
    const thumb = div.querySelector('.thumbnail');
    thumb.addEventListener('click', () => {
      window.open(issue.img, '_blank');
    });

    adminIssuesList.appendChild(div);
  });
}
 */

// === Dummy reported issues ===
const issues = [
  {
    image: 'pothole.jpeg',
    desc: 'Huge pothole near Main Street',
    category: 'Pothole',
    location: 'Lat: 12.9716, Lon: 77.5946',
    verifyCount: 5
  },
  {
    image: 'garbage.jpeg',
    desc: 'Garbage dumped near park',
    category: 'Garbage',
    location: 'Lat: 12.9352, Lon: 77.6245',
    verifyCount: 3
  },
  {
    image: 'streetlight.jpg',
    desc: 'Streetlight not working on 3rd Ave',
    category: 'Streetlight',
    location: 'Lat: 12.9121, Lon: 77.6387',
    verifyCount: 7
  }
];

// === Fake AI price estimation ===
issues.forEach(i => {
  const base = 500 + Math.random() * 500;          // base cost
  const severityBoost = i.verifyCount * 50;        // more verifications -> higher cost
  i.aiPrice = Math.round(base + severityBoost);
  i.confidence = (85 + Math.random() * 10).toFixed(1); // 85–95% confidence
});

const loading = document.getElementById('loading');
const issuesList = document.getElementById('issuesList');

function renderIssues() {
  issuesList.innerHTML = '';
  issues.forEach(issue => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100">
        <img src="${issue.image}" class="card-img-top" alt="${issue.category}">
        <div class="card-body">
          <h5 class="card-title">${issue.category}</h5>
          <p class="card-text"><strong>Description:</strong> ${issue.desc}</p>
          <p class="card-text"><strong>Location:</strong> ${issue.location}</p>
          <p class="card-text"><strong>Verifications:</strong> ${issue.verifyCount}</p>
          <p class="ai-price">AI Estimated Cost: ₹${issue.aiPrice}</p>
          <p class="confidence">Confidence: ${issue.confidence}%</p>
        </div>
      </div>
    `;
    issuesList.appendChild(col);
  });
}

// Fake AI delay for realism
setTimeout(() => {
  loading.style.display = 'none';
  issuesList.style.display = 'flex';
  renderIssues();
}, 1500);
