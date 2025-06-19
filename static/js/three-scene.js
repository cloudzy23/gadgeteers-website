// Three.js 3D Scene with Premium Gear Animation
class ThreeScene {
    constructor() {
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.gears = [];
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.scrollY = 0;
        this.init();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('three-canvas'),
            alpha: true,
            antialias: true
        });

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.renderer.setClearColor(0x000000, 0);

        // Camera position
        this.camera.position.z = 5;

        // Create gears
        this.createGears();
        
        // Create particles
        this.createParticles();

        // Lighting
        this.setupLighting();

        // Event listeners
        this.setupEventListeners();

        // Start animation
        this.animate();
    }

    createGears() {
        const gearGeometry = this.createGearGeometry();
        const gearMaterial = new THREE.MeshPhongMaterial({
            color: 0xf59e0b,
            shininess: 100,
            transparent: true,
            opacity: 0.8
        });

        // Main gear
        const mainGear = new THREE.Mesh(gearGeometry, gearMaterial);
        mainGear.position.set(2, 0, 0);
        mainGear.scale.set(1.5, 1.5, 0.3);
        this.scene.add(mainGear);
        this.gears.push({ mesh: mainGear, speed: 0.01, direction: 1 });

        // Secondary gears
        const gear2 = new THREE.Mesh(gearGeometry, gearMaterial.clone());
        gear2.material.color.setHex(0xfbbf24);
        gear2.position.set(-1.5, 1.5, -0.5);
        gear2.scale.set(0.8, 0.8, 0.2);
        this.scene.add(gear2);
        this.gears.push({ mesh: gear2, speed: 0.015, direction: -1 });

        const gear3 = new THREE.Mesh(gearGeometry, gearMaterial.clone());
        gear3.material.color.setHex(0xd97706);
        gear3.position.set(-1, -1.8, -1);
        gear3.scale.set(0.6, 0.6, 0.15);
        this.scene.add(gear3);
        this.gears.push({ mesh: gear3, speed: 0.02, direction: 1 });
    }

    createGearGeometry() {
        const shape = new THREE.Shape();
        const outerRadius = 1;
        const innerRadius = 0.3;
        const teeth = 12;
        const toothHeight = 0.2;

        // Create gear shape
        for (let i = 0; i <= teeth * 2; i++) {
            const angle = (i / (teeth * 2)) * Math.PI * 2;
            const radius = i % 2 === 0 ? outerRadius + toothHeight : outerRadius;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;

            if (i === 0) {
                shape.moveTo(x, y);
            } else {
                shape.lineTo(x, y);
            }
        }

        // Create hole in center
        const hole = new THREE.Path();
        for (let i = 0; i <= 32; i++) {
            const angle = (i / 32) * Math.PI * 2;
            const x = Math.cos(angle) * innerRadius;
            const y = Math.sin(angle) * innerRadius;

            if (i === 0) {
                hole.moveTo(x, y);
            } else {
                hole.lineTo(x, y);
            }
        }

        shape.holes.push(hole);

        const extrudeSettings = {
            depth: 0.2,
            bevelEnabled: true,
            bevelSegments: 2,
            steps: 2,
            bevelSize: 0.05,
            bevelThickness: 0.05
        };

        return new THREE.ExtrudeGeometry(shape, extrudeSettings);
    }

    createParticles() {
        const particleCount = 100;
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;

            // Gold color variations
            const goldVariation = Math.random() * 0.3 + 0.7;
            colors[i * 3] = goldVariation; // R
            colors[i * 3 + 1] = goldVariation * 0.6; // G
            colors[i * 3 + 2] = 0; // B
        }

        const particleGeometry = new THREE.BufferGeometry();
        particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const particleMaterial = new THREE.PointsMaterial({
            size: 0.05,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending
        });

        this.particles = new THREE.Points(particleGeometry, particleMaterial);
        this.scene.add(this.particles);
    }

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);

        // Directional light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        // Point light for gold effect
        const pointLight = new THREE.PointLight(0xf59e0b, 1, 10);
        pointLight.position.set(2, 2, 2);
        this.scene.add(pointLight);
    }

    setupEventListeners() {
        // Mouse movement
        window.addEventListener('mousemove', (event) => {
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        // Scroll tracking
        window.addEventListener('scroll', () => {
            this.scrollY = window.pageYOffset;
        });

        // Resize
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        });
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        // Rotate gears based on scroll
        this.gears.forEach((gear, index) => {
            const scrollRotation = this.scrollY * 0.001 * gear.direction;
            const autoRotation = Date.now() * gear.speed * gear.direction;
            gear.mesh.rotation.z = scrollRotation + autoRotation;

            // Add subtle floating animation
            gear.mesh.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
        });

        // Animate particles
        if (this.particles) {
            this.particles.rotation.y += 0.001;
            this.particles.rotation.x += 0.0005;

            // Particle floating effect
            const positions = this.particles.geometry.attributes.position.array;
            for (let i = 0; i < positions.length; i += 3) {
                positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.001;
            }
            this.particles.geometry.attributes.position.needsUpdate = true;
        }

        // Camera movement based on mouse and scroll
        this.camera.position.x += (this.mouse.x * 0.5 - this.camera.position.x) * 0.05;
        this.camera.position.y += (this.mouse.y * 0.5 - this.camera.position.y) * 0.05;

        // Scroll-based camera movement
        this.camera.position.z = 5 + this.scrollY * 0.001;

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize the scene when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ThreeScene();
});
