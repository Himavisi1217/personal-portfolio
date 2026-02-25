// 1. Typing Animation for Name
const nameText = "HIMAVISI EKANAYAKE";
const element = document.getElementById("typing-text");
let index = 0;

function typeWriter() {
    if (index < nameText.length) {
        element.innerHTML += nameText.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Speed of typing
    } else {
        // Add blinking cursor after typing is complete
        element.classList.add('typing-complete');
    }
}

// 2. Interactive Skills (Accordion Logic)
function toggleSkill(element) {
    // Close other active items
    const allItems = document.querySelectorAll('.skill-item');
    allItems.forEach(item => {
        if (item !== element && item.classList.contains('active')) {
            item.classList.remove('active');
            const fills = item.querySelectorAll('.fill');
            fills.forEach(fill => {
                if (fill) fill.style.width = '0';
            });
        }
    });

    // Toggle the 'active' class on the clicked item
    const isActive = element.classList.toggle('active');

    // Animate progress bar
    const fill = element.querySelector('.fill');
    if (fill) {
        if (isActive) {
            // Store original width if not already stored
            if (!fill.dataset.targetWidth) {
                fill.dataset.targetWidth = fill.style.width || '0%';
            }
            // Animate from 0 to target
            fill.style.width = '0';
            setTimeout(() => {
                fill.style.width = fill.dataset.targetWidth;
            }, 100);
        } else {
            fill.style.width = '0';
        }
    }
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
            link: "https://github.com/Himavisi1217/bizstartpro.git"
        },
        {
            title: "Business Solutions Web Template",
            description: "Developed a website template for a business to showcase their solutions",
            tech_stack: ["React", "HTML", "CSS", "JavaScript"],
            link: "https://github.com/Himavisi1217/company-solution-showcase.git"
        },
        {
            title: "Organic Snacks Database",
            description: "CRUD-enabled web application with SQL database integration. Improved data accessibility and UI.",
            tech_stack: ["SQL", "HTML/CSS", "CRUD"],
            link: ""
        },
        {
            title: "Task Management Application",
            description: "An application that can be used to assign tasks to employees and track their progress.",
            tech_stack: ["React native", "expo", "Firebase"],
            link: "https://github.com/Himavisi1217/task-management-system.git"
        },
        {
            title: "Team Check Insight",
            description: "Employee health analytics system. Led requirement analysis and prototype design.",
            tech_stack: ["Agile", "Analytics", "Prototyping"],
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
        const techStack = Array.isArray(proj.tech_stack)
            ? proj.tech_stack
            : typeof proj.tech_stack === 'string' && proj.tech_stack.trim().length > 0
                ? proj.tech_stack.split(',').map(item => item.trim()).filter(Boolean)
                : [];

        const techHtml = techStack.length > 0
            ? techStack.map(t => `<span class="tech-tag">${t}</span>`).join('')
            : `<span class="tech-tag">General</span>`;

        const title = proj.title || 'Untitled Project';
        const description = proj.description || 'No description available.';
        const link = typeof proj.link === 'string' ? proj.link.trim() : '';

        // Only show link button if link exists
        const linkButton = link
            ? `<a href="${link}" target="_blank" class="btn-neon" style="font-size: 0.8rem;">View_Source</a>`
            : `<span class="btn-neon" style="font-size: 0.8rem; opacity: 0.5; cursor: not-allowed;">No_Link_Available</span>`;

        const card = `
            <div class="project-card">
                <h3>> ${title}</h3>
                <p style="margin: 10px 0; color: #aaa;">${description}</p>
                <div style="margin-bottom: 10px;">${techHtml}</div>
                ${linkButton}
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
        ctx.fillStyle = "rgba(0, 0, 0, 0.06)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // brighter red with subtle glow
        ctx.fillStyle = "#ff9a9a";
        ctx.font = `bold ${font_size}px monospace`;
        ctx.shadowColor = "#ff9a9a";
        ctx.shadowBlur = 10;

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