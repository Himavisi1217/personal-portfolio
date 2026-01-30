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
            link: "https://github.com/Himavisi1217/bizstartpro.git" 
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
    if (!ctx) return;

    // initialize size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters to rain down
    const chars = "01010101 HIMAVISI SQL PYTHON REACT FLUTTER ";
    const font_size = 14;
    const columns = Math.floor(canvas.width / font_size);
    // use an array filled with 1s
    const drops = new Array(columns).fill(1);

    // expose some values to the resize handler
    canvas._font_size = font_size;
    canvas._columns = columns;
    canvas._drops = drops;

    function draw() {
        // stronger fade so overlapping characters appear brighter
        ctx.fillStyle = "rgba(0, 0, 0, 0.12)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // brighter red with subtle glow
        ctx.fillStyle = "#ff6666";
        ctx.font = `bold ${font_size}px monospace`;
        ctx.shadowColor = "#ff6666";
        ctx.shadowBlur = 6;

        for (let i = 0; i < canvas._drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * font_size, canvas._drops[i] * font_size);

            if (canvas._drops[i] * font_size > canvas.height && Math.random() > 0.975) canvas._drops[i] = 0;
            canvas._drops[i]++;
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
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // recompute columns/drops so rain scales with new width
    const font_size = canvas._font_size || 14;
    const columns = Math.floor(canvas.width / font_size);
    canvas._columns = columns;
    canvas._drops = new Array(columns).fill(1);
    if (ctx) ctx.font = `bold ${font_size}px monospace`;
});

// 5. Form Submission Handler (FormSubmit.co - no service id required)
async function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    try {
        const res = await fetch('https://formsubmit.co/ajax/himavisiekanayake676@gmail.com', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok) {
            alert('Message sent — thank you!');
            form.reset();
        } else {
            console.error('FormSubmit error:', res.status, data);
            alert('Send failed: ' + (data.message || JSON.stringify(data)));
        }
    } catch (err) {
        console.error('Send error:', err);
        alert('Send error: ' + err.message);
    }
}