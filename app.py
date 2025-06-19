from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

# Team data
TEAM_DATA = {
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
}

ACCOMPLISHMENTS = [
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
]

MISSION_VALUES = [
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
]

MENTORS = [
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
]

@app.route('/')
def index():
    """Main page route"""
    return render_template('index.html',
                         team_data=TEAM_DATA,
                         accomplishments=ACCOMPLISHMENTS,
                         mission_values=MISSION_VALUES)

@app.route('/mentors')
def mentors():
    """Mentors page route"""
    return render_template('mentors.html',
                         mentors=MENTORS,
                         team_data=TEAM_DATA)

@app.route('/api/team/<year>')
def get_team_data(year):
    """API endpoint to get team data for a specific year"""
    if year in TEAM_DATA:
        return jsonify(TEAM_DATA[year])
    return jsonify({"error": "Team data not found"}), 404

@app.route('/api/accomplishments')
def get_accomplishments():
    """API endpoint to get accomplishments data"""
    return jsonify(ACCOMPLISHMENTS)

@app.route('/api/mission')
def get_mission():
    """API endpoint to get mission values"""
    return jsonify(MISSION_VALUES)

@app.route('/api/mentors')
def get_mentors():
    """API endpoint to get mentors data"""
    return jsonify(MENTORS)

@app.route('/health')
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "healthy", "team": "The Gadgeteers #9670"})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
