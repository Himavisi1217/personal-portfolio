// 1. Typing Animation for Name
const nameText = "HIMAVISI EKANAYAKE"; 
const element = document.getElementById("typing-text");
let index = 0;

function typeWriter() {
    if (index < nameText.length) {
        element.innerHTML += nameText.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Speed of typing
    }
}

// 2. Interactive Skills (Accordion Logic)
function toggleSkill(element) {
    // Toggle the 'active' class on the clicked item
    element.classList.toggle('active');
}

// 3. Database Connection & Project Rendering
// To make this work with a live DB, replace URL and KEY below.
const SUPABASE_URL = 'https://wyhpwjzodzcsxvvqovjz.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind5aHB3anpvZHpjc3h2dnFvdmp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc5NTY5NTcsImV4cCI6MjA4MzUzMjk1N30.vXMv7lebXywXMOUMz4PIa2aQtu1CmexdZA2g3-B5j4g';
// const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

async function fetchProjects() {
    const container = document.getElementById('project-container');
    
    // --- MODE A: REAL DATABASE (Uncomment later) ---
    /*
    const { data, error } = await _supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
    if (error) {
        container.innerHTML = `<p style="color:red">Error: ${error.message}</p>`;
        return;
    }
    renderProjects(data);
    */

    // --- MODE B: STATIC DATA (CV Projects + Your GitHub Links) ---
    const dummyData = [
        {
            title: "BizStart Pro (Final Year Project)",
            description: "Developed an AI-powered mobile app to support start-ups using Flutter and OpenAI API.",
            tech_stack: ["Flutter", "OpenAI API", "Mobile Dev"],
            // Matches your CV [cite: 36]
            link: "" 
        },
        {
            title: "Organic Snacks Database",
            description: "CRUD-enabled web application with SQL database integration. Improved data accessibility and UI.",
            tech_stack: ["SQL", "HTML/CSS", "CRUD"],
            // Matches your CV [cite: 47]
            link: ""
        },
        {
            title: "Team Check Insight",
            description: "Employee health analytics system. Led requirement analysis and prototype design.",
            tech_stack: ["Agile", "Analytics", "Prototyping"],
            // Matches your CV [cite: 50]
            link: "https://www.figma.com/design/Rg3k78NMU2dShGKls63LVh/Team-Check-Insights?node-id=0-1&t=m4X8kz9KA8ITJCHL-1"
        }
    ];
    
    // Simulate network delay for "hacker" feel
    setTimeout(() => {
        renderProjects(dummyData);
    }, 800);
}

function renderProjects(projects) {
    const container = document.getElementById('project-container');
    container.innerHTML = ''; // Clear loading text

    projects.forEach(proj => {
        const techHtml = proj.tech_stack.map(t => `<span class="tech-tag">${t}</span>`).join('');
        
        const card = `
            <div class="project-card">
                <h3>> ${proj.title}</h3>
                <p style="margin: 10px 0; color: #aaa;">${proj.description}</p>
                <div style="margin-bottom: 10px;">${techHtml}</div>
                <a href="${proj.link}" target="_blank" class="btn-neon" style="font-size: 0.8rem;">View_Source</a>
            </div>
        `;
        container.innerHTML += card;
    });
}

// 4. Matrix Background Effect
function initMatrix() {
    const canvas = document.getElementById('matrix-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to rain down
    const chars = "01010101 HIMAVISI SQL PYTHON REACT FLUTTER ";
    const font_size = 14;
    const columns = canvas.width / font_size;
    const drops = [];

    for(let x = 0; x < columns; x++) drops[x] = 1;

    function draw() {
        ctx.fillStyle = "rgba(5, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#ff3333"; // Red Matrix Rain
        ctx.font = font_size + "px arial";
        
        for(let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random()*chars.length)];
            ctx.fillText(text, i*font_size, drops[i]*font_size);
            
            if(drops[i]*font_size > canvas.height && Math.random() > 0.975)
                drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 35);
}

// Initialize everything on page load
window.onload = () => {
    typeWriter();
    fetchProjects();
    initMatrix(); 
};

// Handle window resize for Matrix
window.addEventListener('resize', () => {
    const canvas = document.getElementById('matrix-bg');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// 5. Form Submission Handler
function handleSubmit(event) {
    event.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    event.target.reset();
}