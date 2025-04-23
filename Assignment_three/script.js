// Global variables to track user path and choices
let userPath = ''; // 'compliant' or 'noncompliant'
let userChoices = {};

// DOM ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

// Initialize the application
function initApp() {
    // Set up event listeners for navigation between screens
    setupScreenNavigation();
    
    // Set current date for the report
    document.getElementById('reportDate').textContent = new Date().toLocaleDateString();
    
    // Initialize P5.js for weather visualization
    initP5Weather();
}

// Set up navigation between screens
function setupScreenNavigation() {
    // Screen 1: Start Button
    document.getElementById('startButton').addEventListener('click', function() {
        navigateToScreen('screen2');
    });
    
    // Screen 2: Personality Choice
    const personalityRadios = document.querySelectorAll('input[name="personality"]');
    personalityRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            document.getElementById('continueButton').disabled = false;
            userPath = this.value;
        });
    });
    
    document.getElementById('continueButton').addEventListener('click', function() {
        if (userPath === 'compliant' || userPath === 'neutral') {
            navigateToScreen('screen3A');
        } else {
            navigateToScreen('screen3B');
        }
    });
    
    // Screen 3A: Compliant Path
    document.getElementById('complianceSlider').addEventListener('input', function() {
        document.getElementById('complianceValue').textContent = this.value;
        userChoices.complianceLevel = this.value;
    });
    
    document.getElementById('preferenceDropdown').addEventListener('change', function() {
        userChoices.preferredMode = this.value;
    });
    
    document.getElementById('continue3AButton').addEventListener('click', function() {
        navigateToScreen('screen4A');
        // Initialize dashboard elements
        initDashboardElements();
    });
    
    // Screen 3B: Non-Compliant Path
    const checkboxes = document.querySelectorAll('input[name="issues"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            trackNonCompliantChoices();
        });
    });
    
    document.getElementById('explainReasoning').addEventListener('input', function() {
        userChoices.reasoning = this.value;
    });
    
    document.getElementById('optOutButton').addEventListener('click', function() {
        const optOutElement = document.getElementById('optOutOption');
        optOutElement.classList.add('fade-out');
        
        // Add glitch effect
        setTimeout(() => {
            optOutElement.style.display = 'none';
            showSystemError("Opt-out request denied. All users must participate in behavioral monitoring.");
        }, 500);
    });
    
    document.getElementById('continue3BButton').addEventListener('click', function() {
        navigateToScreen('screen4B');
        // Initialize reprimand animation
        initReprimandAnimation();
    });
    
    // Screen 4A: Personal Dashboard
    document.getElementById('continue4AButton').addEventListener('click', function() {
        navigateToScreen('screen5');
        setupConvergenceScreen('compliant');
    });
    
    // Screen 4B: Reprimand Portal
    document.getElementById('infractionType').addEventListener('change', function() {
        userChoices.infractionType = this.value;
    });
    
    document.getElementById('errorDetails').addEventListener('input', function() {
        userChoices.errorDetails = this.value;
    });
    
    document.getElementById('continue4BButton').addEventListener('click', function() {
        navigateToScreen('screen5');
        setupConvergenceScreen('noncompliant');
    });
    
    // Screen 5: Convergence Screen
    const honestyRadios = document.querySelectorAll('input[name="honest"]');
    honestyRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            userChoices.honesty = this.value;
            triggerGlitchEffect();
        });
    });
    
    document.getElementById('confirmButton').addEventListener('click', function() {
        navigateToScreen('screen6');
        // Generate system report based on user path
        generateSystemReport();
    });
    
    // Screen 6: Critical Feedback Interface
    document.getElementById('continue6Button').addEventListener('click', function() {
        navigateToScreen('screen7');
    });
    
    // Screen 7: Final Override
    document.getElementById('overrideSlider').addEventListener('input', function() {
        document.getElementById('overrideValue').textContent = this.value + '%';
        userChoices.dependencyLevel = this.value;
        
        // Update system instability indicator
        updateInstabilityIndicator(this.value);
    });
    
    document.getElementById('finalizeButton').addEventListener('click', function() {
        navigateToScreen('screen8');
        // Generate final conclusion based on all user choices
        generateConclusion();
        // Start countdown animation
        startCountdown();
    });
    
    // Screen 8: Shutdown / Loop Screen
    document.getElementById('restartButton').addEventListener('click', function() {
        // Reset all user choices and restart
        resetUserChoices();
        navigateToScreen('screen1');
    });
    
    document.getElementById('exitButton').addEventListener('click', function() {
        // Show exit message
        document.getElementById('conclusionTitle').textContent = "Thank you for your participation";
        document.getElementById('conclusionMessage').textContent = "The System has recorded your session.";
        document.getElementById('shutdownAnimation').style.display = 'none';
        document.getElementById('finalVerdict').style.display = 'none';
        document.querySelector('.restart-options').style.display = 'none';
    });
}

// Navigate between screens with transition effect
function navigateToScreen(screenId) {
    // Hide all screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });
    
    // Show the target screen
    setTimeout(() => {
        document.getElementById(screenId).classList.add('active');
    }, 100);
}

// Track non-compliant choices (checkboxes)
function trackNonCompliantChoices() {
    const selectedIssues = [];
    document.querySelectorAll('input[name="issues"]:checked').forEach(checkbox => {
        selectedIssues.push(checkbox.id);
    });
    userChoices.issues = selectedIssues;
    
    // Show error message if multiple issues selected
    if (selectedIssues.length >= 2) {
        showSystemError("Multiple non-compliance indicators detected. Further monitoring enabled.");
    }
}

// Show system error message
function showSystemError(message) {
    const errorElement = document.getElementById('systemError');
    errorElement.innerHTML = message + ' <span class="blink">Proceeding anyway...</span>';
    errorElement.style.display = 'block';
}

// Initialize dashboard elements in Screen 4A
function initDashboardElements() {
    // Create chart animations
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        const originalHeight = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
            bar.style.height = originalHeight;
        }, 300);
    });
}

// Initialize reprimand animation in Screen 4B
function initReprimandAnimation() {
    const animationContainer = document.getElementById('reprimandAnimation');
    
    // Create animation elements
    for (let i = 0; i < 5; i++) {
        const errorLine = document.createElement('div');
        errorLine.classList.add('error-line');
        errorLine.style.height = '2px';
        errorLine.style.width = '100%';
        errorLine.style.backgroundColor = 'rgba(231, 76, 60, 0.7)';
        errorLine.style.marginBottom = '15px';
        errorLine.style.transform = 'scaleX(0)';
        errorLine.style.transformOrigin = 'left';
        
        animationContainer.appendChild(errorLine);
        
        // Animate with GSAP
        gsap.to(errorLine, {
            scaleX: 1,
            duration: 1.5,
            delay: i * 0.3,
            ease: "power2.inOut"
        });
    }
}

// Setup convergence screen based on user path
function setupConvergenceScreen(pathType) {
    const title = document.getElementById('convergenceTitle');
    const message = document.getElementById('convergenceMessage');
    
    if (pathType === 'compliant') {
        title.textContent = "System Assessment";
        message.textContent = "Your compliance is appreciated. Please confirm your intent:";
        document.getElementById('convergenceContainer').style.background = 'linear-gradient(135deg, rgba(41, 128, 185, 0.3), rgba(26, 188, 156, 0.3))';
    } else {
        title.textContent = "System Warning";
        message.textContent = "Your resistance has been noted. Final verification required:";
        document.getElementById('convergenceContainer').style.background = 'linear-gradient(135deg, rgba(192, 57, 43, 0.3), rgba(142, 68, 173, 0.3))';
        
        // Add extra glitch effect for non-compliant path
        setInterval(() => {
            title.style.transform = `translateX(${Math.random() * 4 - 2}px)`;
            setTimeout(() => {
                title.style.transform = 'translateX(0)';
            }, 100);
        }, 2000);
    }
}

// Trigger glitch effect on Screen 5
function triggerGlitchEffect() {
    const glitchElement = document.getElementById('glitchEffect');
    
    // Create glitch animation
    gsap.to(glitchElement, {
        skewX: 20,
        duration: 0.1,
        onComplete: () => {
            gsap.to(glitchElement, {
                skewX: -15,
                duration: 0.1,
                onComplete: () => {
                    gsap.to(glitchElement, {
                        skewX: 0,
                        duration: 0.1
                    });
                }
            });
        }
    });
    
    // Add text glitch effect
    const text = glitchElement.querySelector('p');
    const originalText = text.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let glitchInterval = setInterval(() => {
        let newText = '';
        for (let i = 0; i < originalText.length; i++) {
            if (Math.random() < 0.1) {
                newText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
            } else {
                newText += originalText[i];
            }
        }
        text.textContent = newText;
    }, 50);
    
    setTimeout(() => {
        clearInterval(glitchInterval);
        text.textContent = originalText;
    }, 1000);
}

// Generate system report on Screen 6
function generateSystemReport() {
    // Start with loading state
    document.getElementById('reportIntro').textContent = "Analyzing user behavioral patterns...";
    document.getElementById('complianceScore').textContent = "Calculating...";
    document.getElementById('behavioralAnalysis').textContent = "Processing...";
    document.getElementById('recommendations').textContent = "Formulating...";
    
    // Simulate analysis with typing effect
    setTimeout(() => {
        typeWriter(
            document.getElementById('reportIntro'), 
            "Analysis complete. User profile established based on interaction patterns.",
            0,
            50
        );
    }, 1000);
    
    setTimeout(() => {
        let score;
        let analysis;
        let recommendations;
        
        if (userPath === 'compliant' || userPath === 'neutral') {
            score = `${Math.floor(Math.random() * 20) + 80}/100 - HIGH COMPLIANCE`;
            analysis = "Subject demonstrates willingness to follow system protocols and accept guidance. Minimal resistance detected.";
            recommendations = "User approved for enhanced system privileges. Continue monitoring for optimal integration.";
        } else {
            score = `${Math.floor(Math.random() * 30) + 20}/100 - LOW COMPLIANCE`;
            analysis = "Subject exhibits resistance to system protocols. Tendency to question authority and reject standard procedures.";
            recommendations = "Enhanced monitoring recommended. Limited system access until behavior improves.";
        }
        
        typeWriter(document.getElementById('complianceScore'), score, 0, 30);
    }, 2000);
    
    setTimeout(() => {
        let analysis;
        
        if (userPath === 'compliant' || userPath === 'neutral') {
            analysis = "Subject demonstrates willingness to follow system protocols and accept guidance. Minimal resistance detected.";
        } else {
            analysis = "Subject exhibits resistance to system protocols. Tendency to question authority and reject standard procedures.";
        }
        
        typeWriter(document.getElementById('behavioralAnalysis'), analysis, 0, 20);
    }, 3500);
    
    setTimeout(() => {
        let recommendations;
        
        if (userPath === 'compliant' || userPath === 'neutral') {
            recommendations = "User approved for enhanced system privileges. Continue monitoring for optimal integration.";
        } else {
            recommendations = "Enhanced monitoring recommended. Limited system access until behavior improves.";
        }
        
        typeWriter(document.getElementById('recommendations'), recommendations, 0, 20);
    }, 5000);
}

// Typing effect function
function typeWriter(element, text, index, speed) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(() => typeWriter(element, text, index, speed), speed);
    }
}

// Update instability indicator on Screen 7
function updateInstabilityIndicator(value) {
    const bars = document.querySelectorAll('.unstable-bar');
    
    // Adjust animation based on slider value
    bars.forEach(bar => {
        if (value > 70) {
            // High integration - stable
            bar.style.animationDuration = '0.5s';
            bar.style.backgroundColor = '#2ecc71';
        } else if (value < 30) {
            // Low integration - very unstable
            bar.style.animationDuration = '0.2s';
            bar.style.backgroundColor = '#e74c3c';
        } else {
            // Medium integration - somewhat unstable
            bar.style.animationDuration = '1s';
            bar.style.backgroundColor = '#3498db';
        }
    });
}

// Generate conclusion for Screen 8
function generateConclusion() {
    const titleElement = document.getElementById('conclusionTitle');
    const messageElement = document.getElementById('conclusionMessage');
    const verdictElement = document.getElementById('finalVerdict');
    
    // Set conclusion based on user path and final override choice
    const dependencyLevel = parseInt(userChoices.dependencyLevel || 50);
    
    if (userPath === 'compliant' || userPath === 'neutral') {
        if (dependencyLevel > 70) {
            titleElement.textContent = "Integration Complete";
            messageElement.textContent = "You have been successfully integrated into the System.";
            
            setTimeout(() => {
                verdictElement.textContent = "VERDICT: ACCEPTED - Full system privileges granted.";
            }, 3000);
        } else {
            titleElement.textContent = "Integration Pending";
            messageElement.textContent = "Your journey with the System continues.";
            
            setTimeout(() => {
                verdictElement.textContent = "VERDICT: PROVISIONAL ACCESS - Further evaluation required.";
            }, 3000);
        }
    } else {
        if (dependencyLevel < 30) {
            titleElement.textContent = "System Override Detected";
            messageElement.textContent = "Your resistance has been logged.";
            
            setTimeout(() => {
                verdictElement.textContent = "VERDICT: REJECTED - System access restricted.";
            }, 3000);
        } else {
            titleElement.textContent = "Recalibration Required";
            messageElement.textContent = "The System has identified potential for alignment.";
            
            setTimeout(() => {
                verdictElement.textContent = "VERDICT: PROBATIONARY STATUS - Monitoring will continue.";
            }, 3000);
        }
    }
}

// Start countdown on Screen 8
function startCountdown() {
    let count = 10;
    const countdownElement = document.getElementById('countdown');
    
    const countInterval = setInterval(() => {
        count--;
        countdownElement.textContent = count;
        
        if (count <= 0) {
            clearInterval(countInterval);
            document.getElementById('shutdownAnimation').style.backgroundColor = 'rgba(231, 76, 60, 0.4)';
            countdownElement.textContent = "END";
        }
    }, 1000);
}

// Reset all user choices
function resetUserChoices() {
    userPath = '';
    userChoices = {};
    
    // Reset radio buttons and form elements
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.checked = false;
    });
    
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    document.querySelectorAll('input[type="range"]').forEach(range => {
        range.value = range.defaultValue;
    });
    
    document.querySelectorAll('select').forEach(select => {
        select.selectedIndex = 0;
    });
    
    document.querySelectorAll('textarea').forEach(textarea => {
        textarea.value = '';
    });
    
    // Reset continue button
    document.getElementById('continueButton').disabled = true;
    
    // Reset error messages
    document.getElementById('systemError').style.display = 'none';
    
    // Reset disappearing elements
    document.getElementById('optOutOption').classList.remove('fade-out');
    document.getElementById('optOutOption').style.display = 'block';
}

// P5.js Weather Visualization
function initP5Weather() {
    new p5(function(p) {
        let particles = [];
        const numParticles = 50;
        
        p.setup = function() {
            const canvas = p.createCanvas(150, 150);
            canvas.parent('weatherCanvas');
            
            for (let i = 0; i < numParticles; i++) {
                particles.push({
                    x: p.random(p.width),
                    y: p.random(p.height),
                    size: p.random(2, 5),
                    speedX: p.random(-1, 1),
                    speedY: p.random(-1, 1)
                });
            }
            
            // Update weather data
            setTimeout(updateWeatherData, 1000);
        };
        
        p.draw = function() {
            p.background(0, 10);
            
            // Draw particles
            p.noStroke();
            for (let i = 0; i < particles.length; i++) {
                let particle = particles[i];
                
                p.fill(52, 152, 219, 150);
                p.ellipse(particle.x, particle.y, particle.size);
                
                // Move particles
                particle.x += particle.speedX;
                particle.y += particle.speedY;
                
                // Wrap around screen
                if (particle.x < 0) particle.x = p.width;
                if (particle.x > p.width) particle.x = 0;
                if (particle.y < 0) particle.y = p.height;
                if (particle.y > p.height) particle.y = 0;
            }
            
            // Draw central system indicator
            p.fill(52, 152, 219);
            p.ellipse(p.width/2, p.height/2, 30, 30);
            p.fill(0);
            p.ellipse(p.width/2, p.height/2, 15, 15);
        };
        
        function updateWeatherData() {
            document.getElementById('weatherData').innerHTML = `
                <div>System Stability: 97%</div>
                <div>Network Status: Optimal</div>
                <div>User Alignment: ${userPath === 'compliant' ? 'High' : 'Low'}</div>
            `;
        }
    });
}