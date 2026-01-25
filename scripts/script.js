// AOS Initialization
AOS.init({
    duration: 300,
    easing: 'ease-in-out',
    once: false,
    mirror: true,
    offset: 120,
    delay: 100,
    anchorPlacement: 'top-bottom'
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Typed.js Framework Usage
new Typed('#typed-text', {
    strings: ['Student', 'Beginner Android-Dev', 'Full-Stack Dev', 'Creative Designer', 'Linux Enthusiast'],
    typeSpeed: 50,
    backSpeed: 30,
    loop: true,
    showCursor: true
});

// GitHub Repos Loading Script
const GITHUB_USERNAME = 'amevrynx';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

async function loadGitHubRepos() {
    try {
        const response = await fetch(GITHUB_API_URL);
        const repos = await response.json();

        const sortedRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count)
            .slice(0, 6);

        const reposContainer = document.getElementById('github-repos');
        const template = document.getElementById('repo-template');
        const loadingSpinner = document.querySelector('.loading-spinner');
        loadingSpinner.remove();

        sortedRepos.forEach(repo => {
            const card = template.content.cloneNode(true);

            card.querySelector('h3').textContent = repo.name;
            card.querySelector('.repo-description').textContent = repo.description || 'No description available';
            card.querySelector('.repo-language').textContent = repo.language || 'N/A';
            card.querySelector('.repo-stars').textContent = repo.stargazers_count;
            card.querySelector('.repo-link').href = repo.html_url;

            reposContainer.appendChild(card);
        });

    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        const reposContainer = document.getElementById('github-repos');
        const loadingSpinner = document.querySelector('.loading-spinner');

        loadingSpinner.innerHTML = `
            <p class="text-red-500">Error loading repositories. Please try again later or try refreshing the page !!</p>
        `;
    }
}

// Cyber Matrix Background Script
function initializeMatrixBackground() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    document.body.appendChild(canvas);

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?~アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヰヱヲン";
    const drops = [];
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#ffffffff';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 35);
}

// Certifications
function loadCertifications() {
    fetch('/scripts/certifications.json')
        .then(response => response.json())
        .then(data => {
            const certificationsContainer = document.getElementById('certifications-container');
            const certificationTemplate = document.getElementById('certification-template');

            data.certifications.forEach(certification => {
                const clone = certificationTemplate.content.cloneNode(true);
                clone.querySelector('.certification-title').textContent = certification.title;
                clone.querySelector('.certification-issuer').textContent = `Issuer: ${certification.issuer}`;
                clone.querySelector('.certification-date').textContent = `Date: ${certification.date}`;
                clone.querySelector('.certification-description').textContent = certification.description;

                certificationsContainer.appendChild(clone);
            });
        })
        .catch(error => console.error('Error loading certifications:', error));
}

// Education
function loadEducation() {
    fetch('/scripts/education.json')
        .then(response => response.json())
        .then(data => {
            const educationContainer = document.getElementById('education-container');
            const educationTemplate = document.getElementById('education-template');

            data.education.forEach(item => {
                const clone = educationTemplate.content.cloneNode(true);
                clone.querySelector('.education-degree').textContent = item.degree;
                clone.querySelector('.education-institution').textContent = item.institution;
                clone.querySelector('.education-description').textContent = item.description;

                educationContainer.appendChild(clone);
            });
        })
        .catch(error => console.error('Error loading education data:', error));
}

// Skills
function loadSkills() {
    fetch('/scripts/skills.json')
        .then(response => response.json())
        .then(data => {
            const skillsContainer = document.getElementById('skills-container');
            const skillsTemplate = document.getElementById('skills-template');

            data.skills.forEach(skill => {
                const clone = skillsTemplate.content.cloneNode(true);
                clone.querySelector('.skill-category').textContent = skill.category;

                const skillList = clone.querySelector('.skill-list');
                skill.items.forEach(item => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('flex', 'items-center', 'space-x-2');

                    // Adds skill logo
                    const logo = document.createElement('img');
                    logo.src = item.logo;
                    logo.alt = `${item.name} logo`;
                    logo.classList.add('w-6', 'h-6');

                    // Adds skill name
                    const skillName = document.createElement('span');
                    skillName.textContent = item.name;

                    listItem.appendChild(logo);
                    listItem.appendChild(skillName);
                    skillList.appendChild(listItem);
                });

                skillsContainer.appendChild(clone);
            });
        })
        .catch(error => console.error('Error loading skills data:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    loadGitHubRepos();
    initializeMatrixBackground();
    loadCertifications();
    loadEducation();
    loadSkills();
});