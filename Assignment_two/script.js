// Data for footprints
const footprints = [
  { type: 'Location', action: 'Ordered Coffee', details: 'Local café at 9:03 AM' },
  { type: 'Search', action: 'Is my phone listening?', details: 'Google search at 9:15 AM' },
  { type: 'Purchase', action: 'Online Shopping', details: 'Electronics store at 9:45 AM' },
  { type: 'Message', action: 'Social Media Activity', details: 'Posted status at 10:30 AM' }
];

// Data for subjects
const subjects = [
  {
    id: 'SUBJ-001',
    riskLevel: 'high',
    activities: ['Privacy Searches', 'VPN Usage', 'Encrypted Messaging'],
    predictions: ['Likely to go dark', 'Privacy-conscious behavior']
  },
  {
    id: 'SUBJ-002',
    riskLevel: 'low',
    activities: ['Regular social media', 'Public WiFi usage', 'Online shopping'],
    predictions: ['Predictable patterns', 'Data-sharing tendency']
  }
];

// Function to show a specific scene
function showScene(sceneId) {
  // Hide all scenes
  document.querySelectorAll('.scene').forEach(scene => {
    scene.classList.add('hidden');
  });
  
  // Show the requested scene
  document.getElementById(sceneId).classList.remove('hidden');
  
  // Initialize content for specific scenes
  if (sceneId === 'digital-footprint') {
    createFootprintCards();
  } else if (sceneId === 'surveillance-room') {
    createSubjectCards();
  } else if (sceneId === 'final-message') {
    setTimeout(() => {
      document.querySelector('.message-box').classList.add('visible');
    }, 100);
  }
  
  // Hide all response messages when switching scenes
  document.querySelectorAll('.response-message').forEach(message => {
    message.classList.remove('visible');
  });
}

// Function to create footprint cards
function createFootprintCards() {
  const grid = document.querySelector('.footprint-grid');
  grid.innerHTML = ''; // Clear existing content
  
  footprints.forEach((footprint, index) => {
    const card = document.createElement('div');
    card.className = 'footprint-card';
    card.innerHTML = `
      <p class="footprint-type">${footprint.type}</p>
      <h3 class="footprint-action">${footprint.action}</h3>
      <p class="footprint-details">${footprint.details}</p>
    `;
    grid.appendChild(card);
    
    // Animate cards
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 200);
  });
}

// Function to create subject cards
function createSubjectCards() {
  const grid = document.querySelector('.surveillance-grid');
  grid.innerHTML = ''; // Clear existing content
  
  subjects.forEach((subject, index) => {
    const card = document.createElement('div');
    card.className = 'subject-card';
    card.innerHTML = `
      <div class="subject-header">
        <h3 class="subject-id">${subject.id}</h3>
        <div class="risk-level ${subject.riskLevel}">${subject.riskLevel.toUpperCase()}</div>
      </div>
      
      <div class="subject-section">
        <h4>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
          Activities
        </h4>
        <ul class="subject-list">
          ${subject.activities.map(activity => `<li>${activity}</li>`).join('')}
        </ul>
      </div>
      
      <div class="subject-section">
        <h4>Predictions</h4>
        <ul class="subject-list">
          ${subject.predictions.map(prediction => `<li>${prediction}</li>`).join('')}
        </ul>
      </div>
    `;
    grid.appendChild(card);
    
    // Animate cards
    setTimeout(() => {
      card.classList.add('visible');
    }, index * 300);
  });
}

// Function to show response message for choices
function showResponse(type) {
  // Hide all response messages first
  document.querySelectorAll('.response-message').forEach(message => {
    message.classList.remove('visible');
  });
  
  // Show the specific response
  document.getElementById(`${type}-response`).classList.add('visible');
  
  // Scroll to the response
  document.getElementById(`${type}-response`).scrollIntoView({ behavior: 'smooth' });
}

// Initialize the start screen
window.onload = function() {
  showScene('start-screen');
};