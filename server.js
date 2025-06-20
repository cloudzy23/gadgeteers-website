const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(express.static('public'));

// Team data
const TEAM_DATA = {
    "2024": {
        "year": "2024",
        "description": "Our inaugural season team that laid the foundation for our success.",
        "members": [
            {"name": "Sierra", "role": "Captain"},
            {"name": "Jason", "role": "Captain"},
            {"name": "Sarvesh", "role": "Tester"},
            {"name": "Gaby", "role": "Social Media"},
            {"name": "Mariam", "role": "Social Media"},
            {"name": "Sarah", "role": "Safety Captain"}
        ]
    },
    "2025": {
        "year": "2025",
        "description": "Our current championship-caliber team pushing the boundaries of innovation.",
        "members": [
            {"name": "Gaby", "role": "President"},
            {"name": "Miriam", "role": "Drive Team"},
            {"name": "Bryson", "role": "Drive Team"},
            {"name": "Sarvesh", "role": "Engineering Head"},
            {"name": "Mya", "role": "Project Manager"},
            {"name": "Richard", "role": "Robot Technician & Building Head"},
            {"name": "Sage", "role": "Safety Captain"},
            {"name": "Jack", "role": "Human Player"},
            {"name": "Eli", "role": "Hardware Expert"}
        ]
    }
};

const ACCOMPLISHMENTS = [
    {
        "year": "2024",
        "title": "Rookie All Star Award",
        "status": "Runner-up",
        "description": "In our inaugural season, we demonstrated exceptional rookie performance and team spirit, earning recognition as runners-up for the prestigious Rookie All Star Award.",
        "icon": "medal"
    },
    {
        "year": "2025",
        "title": "Overall Competition",
        "status": "Second Place",
        "description": "Building on our rookie success, we achieved an outstanding second overall placement, showcasing our team's growth and dedication to excellence.",
        "icon": "trophy"
    }
];

const MISSION_VALUES = [
    {
        "icon": "lightbulb",
        "title": "Innovation",
        "description": "Pushing boundaries and thinking outside the box"
    },
    {
        "icon": "users",
        "title": "Teamwork",
        "description": "Collaborating to achieve extraordinary results"
    },
    {
        "icon": "trophy",
        "title": "Excellence",
        "description": "Striving for the highest standards in everything we do"
    }
];

const MENTORS = [
    {
        "name": "Coach Greene",
        "role": "Head Coach",
        "icon": "user-tie",
        "description": "Leading our team with expertise and dedication"
    },
    {
        "name": "Jarret",
        "role": "Programming Mentor",
        "icon": "code",
        "description": "Guiding our software development and automation"
    },
    {
        "name": "Scott",
        "role": "Building Mentor",
        "icon": "tools",
        "description": "Expert in mechanical design and construction"
    },
    {
        "name": "Dene",
        "role": "Bumpers Mentor",
        "icon": "shield-alt",
        "description": "Specialist in robot protection and safety systems"
    },
    {
        "name": "Crystal",
        "role": "Social Media Mentor",
        "icon": "share-alt",
        "description": "Managing our online presence and community outreach"
    },
    {
        "name": "Nisa",
        "role": "Sponsorships Mentor",
        "icon": "handshake",
        "description": "Building partnerships and securing team resources"
    },
    {
        "name": "Govi",
        "role": "Project Management Mentor",
        "icon": "tasks",
        "description": "Organizing workflows and ensuring project success"
    }
];

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        team_data: TEAM_DATA,
        accomplishments: ACCOMPLISHMENTS,
        mission_values: MISSION_VALUES
    });
});

app.get('/mentors', (req, res) => {
    res.render('mentors', {
        mentors: MENTORS,
        team_data: TEAM_DATA
    });
});

// API endpoints
app.get('/api/team/:year', (req, res) => {
    const year = req.params.year;
    if (TEAM_DATA[year]) {
        res.json(TEAM_DATA[year]);
    } else {
        res.status(404).json({"error": "Team data not found"});
    }
});

app.get('/api/accomplishments', (req, res) => {
    res.json(ACCOMPLISHMENTS);
});

app.get('/api/mission', (req, res) => {
    res.json(MISSION_VALUES);
});

app.get('/api/mentors', (req, res) => {
    res.json(MENTORS);
});

app.get('/health', (req, res) => {
    res.json({"status": "healthy", "team": "The Gadgeteers #9670"});
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 The Gadgeteers website is running on http://localhost:${PORT}`);
    console.log(`📱 Team: The Gadgeteers #9670`);
    console.log(`🤖 Ready to showcase our robotics team!`);
});