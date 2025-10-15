// Gambia Coding Challenge App - HTML, CSS & JavaScript
class CodingChallengeApp {
    constructor() {
        this.challenges = this.initializeChallenges();
        this.userProgress = this.loadProgress();
        this.currentChallenge = null;
        this.currentLanguage = 'html';
        this.currentUser = null;
        this.isDarkMode = localStorage.getItem('darkMode') === 'true';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeTheme();
        this.checkAuthentication();
    }

    checkAuthentication() {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            this.currentUser = JSON.parse(currentUser);
            this.showMainApp();
        } else {
            this.showAuth();
        }
    }

    showMainApp() {
        document.getElementById('auth-container').style.display = 'none';
        document.getElementById('main-app').style.display = 'block';
        document.getElementById('user-name').textContent = this.currentUser.name;
        this.updateDashboard();
        this.renderChallenges();
        this.updateProgress();
    }

    showAuth() {
        document.getElementById('auth-container').style.display = 'block';
        document.getElementById('main-app').style.display = 'none';
    }

    initializeTheme() {
        if (this.isDarkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
            document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    setupEventListeners() {
        // Authentication forms
        document.getElementById('signup-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignUp();
        });

        document.getElementById('signin-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSignIn();
        });

        // Navigation
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.closest('.nav-btn').dataset.tab;
                this.switchTab(tab);
            });
        });

        // Language tabs
        document.querySelectorAll('.lang-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const lang = e.target.dataset.lang;
                this.switchLanguage(lang);
            });
        });

        // Output tabs
        document.querySelectorAll('.output-tab').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const output = e.target.dataset.output;
                this.switchOutput(output);
            });
        });

        // Close modal when clicking outside
        document.getElementById('challenge-modal').addEventListener('click', (e) => {
            if (e.target.id === 'challenge-modal') {
                this.closeChallenge();
            }
        });
    }

    handleSignUp() {
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Simple validation
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Check if user already exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(user => user.email === email)) {
            alert('User already exists with this email');
            return;
        }

        // Create new user
        const newUser = {
            id: Date.now(),
            name: name,
            email: email,
            password: password, // In real app, hash this
            createdAt: new Date().toISOString()
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // Set as current user
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        alert('Account created successfully!');
        this.showMainApp();
    }

    handleSignIn() {
        const email = document.getElementById('signin-email').value;
        const password = document.getElementById('signin-password').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            this.currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Welcome back!');
            this.showMainApp();
        } else {
            alert('Invalid email or password');
        }
    }

    switchTab(tabName) {
        // Update nav buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tabName).classList.add('active');
    }

    switchLanguage(lang) {
        this.currentLanguage = lang;
        
        // Update language tabs
        document.querySelectorAll('.lang-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-lang="${lang}"]`).classList.add('active');

        // Update editors
        document.querySelectorAll('.code-editor').forEach(editor => {
            editor.classList.remove('active');
        });
        document.getElementById(`${lang}-editor`).classList.add('active');
    }

    switchOutput(output) {
        // Update output tabs
        document.querySelectorAll('.output-tab').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-output="${output}"]`).classList.add('active');

        // Update output content
        document.querySelectorAll('.output-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${output}-output`).classList.add('active');
    }

    initializeChallenges() {
        return [
            {
                id: 1,
                title: "Hello, Gambia! - Your First Web Page",
                description: "Create your first HTML page that displays 'Hello, Gambia!' with a heading.",
                difficulty: "beginner",
                languages: ["html"],
                theory: `<h4>HTML Basics</h4>
<p><strong>HTML (HyperText Markup Language)</strong> is the foundation of web pages. It uses tags to structure content.</p>

<h4>Key Concepts:</h4>
<ul>
<li><strong>&lt;h1&gt;</strong> - Creates the largest heading (most important)</li>
<li><strong>&lt;p&gt;</strong> - Creates a paragraph for text content</li>
<li><strong>Tags</strong> - HTML elements wrapped in angle brackets</li>
<li><strong>Opening/Closing</strong> - Most tags have opening &lt;tag&gt; and closing &lt;/tag&gt;</li>
</ul>

<h4>Structure:</h4>
<p>HTML documents have a hierarchical structure where elements can contain other elements, creating a tree-like organization of content.</p>`,
                example: `<h1>Hello, Gambia!</h1>
<p>Welcome to your first web page!</p>`,
                solution: `<h1>Hello, Gambia!</h1>
<p>Welcome to your first web page!</p>`,
                points: 10,
                skills: ["HTML Basics", "Headings", "Paragraphs"]
            },
            {
                id: 2,
                title: "Gambian Flag Colors",
                description: "Create a simple page showing the colors of the Gambian flag using HTML and basic styling.",
                difficulty: "beginner",
                languages: ["html", "css"],
                theory: `<h4>CSS Styling</h4>
<p><strong>CSS (Cascading Style Sheets)</strong> controls the visual appearance of HTML elements.</p>

<h4>Key Concepts:</h4>
<ul>
<li><strong>&lt;div&gt;</strong> - Container element for grouping content</li>
<li><strong>&lt;style&gt;</strong> - Tag for embedding CSS within HTML</li>
<li><strong>Classes</strong> - Use .classname to style specific elements</li>
<li><strong>background-color</strong> - CSS property to set element background color</li>
<li><strong>height</strong> - CSS property to set element height</li>
</ul>

<h4>CSS Selectors:</h4>
<p>CSS uses selectors to target HTML elements. Class selectors (.) apply styles to elements with specific class names.</p>`,
                example: `<div class="flag">
    <div class="red"></div>
    <div class="blue"></div>
    <div class="green"></div>
</div>

<style>
.flag div { height: 50px; }
.red { background-color: red; }
.blue { background-color: blue; }
.green { background-color: green; }
</style>`,
                solution: `<div class="flag">
    <div class="red"></div>
    <div class="blue"></div>
    <div class="green"></div>
</div>

<style>
.flag div { height: 50px; }
.red { background-color: red; }
.blue { background-color: blue; }
.green { background-color: green; }
</style>`,
                points: 15,
                skills: ["HTML Structure", "CSS Colors", "Div Elements"]
            },
            {
                id: 3,
                title: "Gambian Cities List",
                description: "Create an unordered list of major cities in Gambia with proper HTML structure.",
                difficulty: "beginner",
                languages: ["html"],
                example: `<h2>Major Cities in Gambia</h2>
<ul>
    <li>Banjul</li>
    <li>Serekunda</li>
    <li>Brikama</li>
    <li>Bakau</li>
    <li>Farafenni</li>
</ul>`,
                solution: `<h2>Major Cities in Gambia</h2>
<ul>
    <li>Banjul</li>
    <li>Serekunda</li>
    <li>Brikama</li>
    <li>Bakau</li>
    <li>Farafenni</li>
</ul>`,
                points: 15,
                skills: ["HTML Lists", "Structure", "Content Organization"]
            },
            {
                id: 4,
                title: "Gambian Food Menu with Styling",
                description: "Create a styled menu of popular Gambian dishes with prices and descriptions.",
                difficulty: "beginner",
                languages: ["html", "css"],
                example: `<div class="menu">
    <h2>Gambian Food Menu</h2>
    <div class="dish">
        <h3>Domoda</h3>
        <p>Peanut stew with meat and vegetables</p>
        <span class="price">150 GMD</span>
    </div>
</div>

<style>
.menu { font-family: Arial, sans-serif; }
.dish { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
.price { color: green; font-weight: bold; }
</style>`,
                solution: `<div class="menu">
    <h2>Gambian Food Menu</h2>
    <div class="dish">
        <h3>Domoda</h3>
        <p>Peanut stew with meat and vegetables</p>
        <span class="price">150 GMD</span>
    </div>
    <div class="dish">
        <h3>Benachin</h3>
        <p>One-pot rice dish with fish and vegetables</p>
        <span class="price">200 GMD</span>
    </div>
    <div class="dish">
        <h3>Yassa</h3>
        <p>Grilled fish or chicken with onion sauce</p>
        <span class="price">180 GMD</span>
    </div>
</div>

<style>
.menu { font-family: Arial, sans-serif; }
.dish { border: 1px solid #ccc; padding: 10px; margin: 10px 0; }
.price { color: green; font-weight: bold; }
</style>`,
                points: 20,
                skills: ["HTML Structure", "CSS Styling", "Layout"]
            },
            {
                id: 5,
                title: "Interactive Gambian Currency Converter",
                description: "Create a currency converter that converts USD to Gambian Dalasi using JavaScript.",
                difficulty: "intermediate",
                languages: ["html", "css", "js"],
                example: `<div class="converter">
    <h2>USD to GMD Converter</h2>
    <input type="number" id="usd" placeholder="Enter USD amount">
    <button onclick="convert()">Convert</button>
    <p id="result"></p>
</div>

<script>
function convert() {
    const usd = document.getElementById('usd').value;
    const rate = 60; // 1 USD = 60 GMD
    const gmd = usd * rate;
    document.getElementById('result').textContent = usd + ' USD = ' + gmd + ' GMD';
}
</script>`,
                solution: `<div class="converter">
    <h2>USD to GMD Converter</h2>
    <input type="number" id="usd" placeholder="Enter USD amount">
    <button onclick="convert()">Convert</button>
    <p id="result"></p>
</div>

<script>
function convert() {
    const usd = document.getElementById('usd').value;
    const rate = 60; // 1 USD = 60 GMD
    const gmd = usd * rate;
    document.getElementById('result').textContent = usd + ' USD = ' + gmd + ' GMD';
}
</script>`,
                points: 25,
                skills: ["JavaScript Functions", "DOM Manipulation", "User Input"]
            },
            {
                id: 6,
                title: "Gambian Weather Display",
                description: "Create a weather display that shows different seasons in Gambia with interactive buttons.",
                difficulty: "intermediate",
                languages: ["html", "css", "js"],
                example: `<div class="weather">
    <h2>Gambian Weather</h2>
    <button onclick="showSeason('rainy')">Rainy Season</button>
    <button onclick="showSeason('dry')">Dry Season</button>
    <div id="weather-info"></div>
</div>

<script>
function showSeason(season) {
    const info = document.getElementById('weather-info');
    if (season === 'rainy') {
        info.innerHTML = '<p>Rainy Season (June-October): High humidity, frequent rainfall</p>';
    } else {
        info.innerHTML = '<p>Dry Season (November-May): Low humidity, minimal rainfall</p>';
    }
}
</script>`,
                solution: `<div class="weather">
    <h2>Gambian Weather</h2>
    <button onclick="showSeason('rainy')">Rainy Season</button>
    <button onclick="showSeason('dry')">Dry Season</button>
    <div id="weather-info"></div>
</div>

<script>
function showSeason(season) {
    const info = document.getElementById('weather-info');
    if (season === 'rainy') {
        info.innerHTML = '<p>Rainy Season (June-October): High humidity, frequent rainfall</p>';
    } else {
        info.innerHTML = '<p>Dry Season (November-May): Low humidity, minimal rainfall</p>';
    }
}
</script>`,
                points: 25,
                skills: ["JavaScript Conditionals", "Event Handling", "Dynamic Content"]
            },
            {
                id: 7,
                title: "Gambian Language Greetings",
                description: "Create a language selector that displays greetings in different Gambian languages.",
                difficulty: "intermediate",
                languages: ["html", "css", "js"],
                example: `<div class="greetings">
    <h2>Gambian Language Greetings</h2>
    <select onchange="showGreeting(this.value)">
        <option value="">Select a language</option>
        <option value="english">English</option>
        <option value="mandinka">Mandinka</option>
        <option value="wolof">Wolof</option>
    </select>
    <p id="greeting"></p>
</div>

<script>
function showGreeting(language) {
    const greetings = {
        'english': 'Hello',
        'mandinka': 'Salaam aleikum',
        'wolof': 'Salaam'
    };
    document.getElementById('greeting').textContent = greetings[language] || '';
}
</script>`,
                solution: `<div class="greetings">
    <h2>Gambian Language Greetings</h2>
    <select onchange="showGreeting(this.value)">
        <option value="">Select a language</option>
        <option value="english">English</option>
        <option value="mandinka">Mandinka</option>
        <option value="wolof">Wolof</option>
    </select>
    <p id="greeting"></p>
</div>

<script>
function showGreeting(language) {
    const greetings = {
        'english': 'Hello',
        'mandinka': 'Salaam aleikum',
        'wolof': 'Salaam'
    };
    document.getElementById('greeting').textContent = greetings[language] || '';
}
</script>`,
                points: 30,
                skills: ["JavaScript Objects", "Select Elements", "Data Structures"]
            },
            {
                id: 8,
                title: "Gambian Tourism Gallery",
                description: "Create an image gallery showcasing Gambian tourist attractions with CSS styling.",
                difficulty: "intermediate",
                languages: ["html", "css"],
                example: `<div class="gallery">
    <h2>Gambian Tourist Attractions</h2>
    <div class="attraction">
        <h3>Kunta Kinteh Island</h3>
        <div class="image-placeholder">🏝️</div>
        <p>Historic island with rich cultural heritage</p>
    </div>
</div>

<style>
.gallery { display: flex; flex-wrap: wrap; gap: 20px; }
.attraction { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
.image-placeholder { font-size: 50px; text-align: center; }
</style>`,
                solution: `<div class="gallery">
    <h2>Gambian Tourist Attractions</h2>
    <div class="attraction">
        <h3>Kunta Kinteh Island</h3>
        <div class="image-placeholder">🏝️</div>
        <p>Historic island with rich cultural heritage</p>
    </div>
    <div class="attraction">
        <h3>Abuko Nature Reserve</h3>
        <div class="image-placeholder">🌿</div>
        <p>Beautiful wildlife sanctuary</p>
    </div>
    <div class="attraction">
        <h3>Makasutu Culture Forest</h3>
        <div class="image-placeholder">🌳</div>
        <p>Cultural forest with traditional activities</p>
    </div>
</div>

<style>
.gallery { display: flex; flex-wrap: wrap; gap: 20px; }
.attraction { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
.image-placeholder { font-size: 50px; text-align: center; }
</style>`,
                points: 30,
                skills: ["CSS Flexbox", "Layout Design", "Responsive Design"]
            },
            {
                id: 9,
                title: "Gambian Student Grade Calculator",
                description: "Create a grade calculator that calculates GPA for Gambian students.",
                difficulty: "intermediate",
                languages: ["html", "css", "js"],
                example: `<div class="calculator">
    <h2>Gambian Student Grade Calculator</h2>
    <input type="number" id="math" placeholder="Math Grade">
    <input type="number" id="english" placeholder="English Grade">
    <button onclick="calculateGPA()">Calculate GPA</button>
    <p id="gpa-result"></p>
</div>

<script>
function calculateGPA() {
    const math = parseInt(document.getElementById('math').value);
    const english = parseInt(document.getElementById('english').value);
    const average = (math + english) / 2;
    let grade = '';
    if (average >= 80) grade = 'A';
    else if (average >= 70) grade = 'B';
    else if (average >= 60) grade = 'C';
    else if (average >= 50) grade = 'D';
    else grade = 'F';
    
    document.getElementById('gpa-result').textContent = 
        'Average: ' + average + ', Grade: ' + grade;
}
</script>`,
                solution: `<div class="calculator">
    <h2>Gambian Student Grade Calculator</h2>
    <input type="number" id="math" placeholder="Math Grade">
    <input type="number" id="english" placeholder="English Grade">
    <button onclick="calculateGPA()">Calculate GPA</button>
    <p id="gpa-result"></p>
</div>

<script>
function calculateGPA() {
    const math = parseInt(document.getElementById('math').value);
    const english = parseInt(document.getElementById('english').value);
    const average = (math + english) / 2;
    let grade = '';
    if (average >= 80) grade = 'A';
    else if (average >= 70) grade = 'B';
    else if (average >= 60) grade = 'C';
    else if (average >= 50) grade = 'D';
    else grade = 'F';
    
    document.getElementById('gpa-result').textContent = 
        'Average: ' + average + ', Grade: ' + grade;
}
</script>`,
                points: 35,
                skills: ["JavaScript Calculations", "Conditional Logic", "Form Handling"]
            },
            {
                id: 10,
                title: "Gambian Banking System Interface",
                description: "Create a simple banking interface with deposit and withdraw functionality.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="banking">
    <h2>Gambian Banking System</h2>
    <div class="balance">Balance: <span id="balance">1000</span> GMD</div>
    <input type="number" id="amount" placeholder="Enter amount">
    <button onclick="deposit()">Deposit</button>
    <button onclick="withdraw()">Withdraw</button>
    <p id="message"></p>
</div>

<script>
let balance = 1000;

function deposit() {
    const amount = parseInt(document.getElementById('amount').value);
    balance += amount;
    updateBalance();
    document.getElementById('message').textContent = 'Deposited ' + amount + ' GMD';
}

function withdraw() {
    const amount = parseInt(document.getElementById('amount').value);
    if (amount <= balance) {
        balance -= amount;
        updateBalance();
        document.getElementById('message').textContent = 'Withdrew ' + amount + ' GMD';
    } else {
        document.getElementById('message').textContent = 'Insufficient funds';
    }
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}
</script>`,
                solution: `<div class="banking">
    <h2>Gambian Banking System</h2>
    <div class="balance">Balance: <span id="balance">1000</span> GMD</div>
    <input type="number" id="amount" placeholder="Enter amount">
    <button onclick="deposit()">Deposit</button>
    <button onclick="withdraw()">Withdraw</button>
    <p id="message"></p>
</div>

<script>
let balance = 1000;

function deposit() {
    const amount = parseInt(document.getElementById('amount').value);
    balance += amount;
    updateBalance();
    document.getElementById('message').textContent = 'Deposited ' + amount + ' GMD';
}

function withdraw() {
    const amount = parseInt(document.getElementById('amount').value);
    if (amount <= balance) {
        balance -= amount;
        updateBalance();
        document.getElementById('message').textContent = 'Withdrew ' + amount + ' GMD';
    } else {
        document.getElementById('message').textContent = 'Insufficient funds';
    }
}

function updateBalance() {
    document.getElementById('balance').textContent = balance;
}
</script>`,
                points: 40,
                skills: ["JavaScript State Management", "Error Handling", "User Interface"]
            },
            {
                id: 11,
                title: "Gambian Market Price Tracker",
                description: "Create a price tracking system for Gambian market goods with dynamic updates.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="market">
    <h2>Gambian Market Prices</h2>
    <div class="prices">
        <div class="item">
            <span>Rice (per kg)</span>
            <span id="rice-price">50 GMD</span>
        </div>
    </div>
    <button onclick="updatePrices()">Update Prices</button>
</div>

<script>
const prices = { rice: 50, fish: 200, vegetables: 30 };

function updatePrices() {
    // Simulate price changes
    prices.rice += Math.floor(Math.random() * 10) - 5;
    document.getElementById('rice-price').textContent = prices.rice + ' GMD';
}
</script>`,
                solution: `<div class="market">
    <h2>Gambian Market Prices</h2>
    <div class="prices">
        <div class="item">
            <span>Rice (per kg)</span>
            <span id="rice-price">50 GMD</span>
        </div>
        <div class="item">
            <span>Fish (per kg)</span>
            <span id="fish-price">200 GMD</span>
        </div>
        <div class="item">
            <span>Vegetables (per kg)</span>
            <span id="veg-price">30 GMD</span>
        </div>
    </div>
    <button onclick="updatePrices()">Update Prices</button>
</div>

<script>
const prices = { rice: 50, fish: 200, vegetables: 30 };

function updatePrices() {
    // Simulate price changes
    prices.rice += Math.floor(Math.random() * 10) - 5;
    prices.fish += Math.floor(Math.random() * 20) - 10;
    prices.vegetables += Math.floor(Math.random() * 5) - 2;
    
    document.getElementById('rice-price').textContent = prices.rice + ' GMD';
    document.getElementById('fish-price').textContent = prices.fish + ' GMD';
    document.getElementById('veg-price').textContent = prices.vegetables + ' GMD';
}
</script>`,
                points: 45,
                skills: ["JavaScript Objects", "Dynamic Updates", "Random Numbers"]
            },
            {
                id: 12,
                title: "Gambian Restaurant Order System",
                description: "Create a restaurant ordering system with menu items and order calculation.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="restaurant">
    <h2>Gambian Restaurant</h2>
    <div class="menu">
        <div class="item" onclick="addToOrder('Domoda', 150)">
            <span>Domoda - 150 GMD</span>
        </div>
    </div>
    <div class="order">
        <h3>Your Order</h3>
        <div id="order-items"></div>
        <p>Total: <span id="total">0</span> GMD</p>
    </div>
</div>

<script>
let order = [];
let total = 0;

function addToOrder(item, price) {
    order.push({item: item, price: price});
    total += price;
    updateOrder();
}

function updateOrder() {
    const orderDiv = document.getElementById('order-items');
    orderDiv.innerHTML = '';
    order.forEach(item => {
        orderDiv.innerHTML += '<p>' + item.item + ' - ' + item.price + ' GMD</p>';
    });
    document.getElementById('total').textContent = total;
}
</script>`,
                solution: `<div class="restaurant">
    <h2>Gambian Restaurant</h2>
    <div class="menu">
        <div class="item" onclick="addToOrder('Domoda', 150)">
            <span>Domoda - 150 GMD</span>
        </div>
        <div class="item" onclick="addToOrder('Benachin', 200)">
            <span>Benachin - 200 GMD</span>
        </div>
        <div class="item" onclick="addToOrder('Yassa', 180)">
            <span>Yassa - 180 GMD</span>
        </div>
    </div>
    <div class="order">
        <h3>Your Order</h3>
        <div id="order-items"></div>
        <p>Total: <span id="total">0</span> GMD</p>
        <button onclick="clearOrder()">Clear Order</button>
    </div>
</div>

<script>
let order = [];
let total = 0;

function addToOrder(item, price) {
    order.push({item: item, price: price});
    total += price;
    updateOrder();
}

function clearOrder() {
    order = [];
    total = 0;
    updateOrder();
}

function updateOrder() {
    const orderDiv = document.getElementById('order-items');
    orderDiv.innerHTML = '';
    order.forEach(item => {
        orderDiv.innerHTML += '<p>' + item.item + ' - ' + item.price + ' GMD</p>';
    });
    document.getElementById('total').textContent = total;
}
</script>`,
                points: 50,
                skills: ["JavaScript Arrays", "Event Handling", "Order Management"]
            },
            {
                id: 13,
                title: "Gambian Hospital Patient Management",
                description: "Create a patient management system for Gambian hospitals with registration and search.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="hospital">
    <h2>Gambian Hospital System</h2>
    <div class="registration">
        <h3>Register Patient</h3>
        <input type="text" id="patient-name" placeholder="Patient Name">
        <input type="number" id="patient-age" placeholder="Age">
        <button onclick="registerPatient()">Register</button>
    </div>
    <div class="patients">
        <h3>Registered Patients</h3>
        <div id="patient-list"></div>
    </div>
</div>

<script>
let patients = [];

function registerPatient() {
    const name = document.getElementById('patient-name').value;
    const age = document.getElementById('patient-age').value;
    
    if (name && age) {
        patients.push({name: name, age: age, id: patients.length + 1});
        updatePatientList();
        document.getElementById('patient-name').value = '';
        document.getElementById('patient-age').value = '';
    }
}

function updatePatientList() {
    const listDiv = document.getElementById('patient-list');
    listDiv.innerHTML = '';
    patients.forEach(patient => {
        listDiv.innerHTML += '<p>ID: ' + patient.id + ' - ' + patient.name + ' (' + patient.age + ' years)</p>';
    });
}
</script>`,
                solution: `<div class="hospital">
    <h2>Gambian Hospital System</h2>
    <div class="registration">
        <h3>Register Patient</h3>
        <input type="text" id="patient-name" placeholder="Patient Name">
        <input type="number" id="patient-age" placeholder="Age">
        <button onclick="registerPatient()">Register</button>
    </div>
    <div class="patients">
        <h3>Registered Patients</h3>
        <div id="patient-list"></div>
    </div>
</div>

<script>
let patients = [];

function registerPatient() {
    const name = document.getElementById('patient-name').value;
    const age = document.getElementById('patient-age').value;
    
    if (name && age) {
        patients.push({name: name, age: age, id: patients.length + 1});
        updatePatientList();
        document.getElementById('patient-name').value = '';
        document.getElementById('patient-age').value = '';
    }
}

function updatePatientList() {
    const listDiv = document.getElementById('patient-list');
    listDiv.innerHTML = '';
    patients.forEach(patient => {
        listDiv.innerHTML += '<p>ID: ' + patient.id + ' - ' + patient.name + ' (' + patient.age + ' years)</p>';
    });
}
</script>`,
                points: 55,
                skills: ["JavaScript Arrays", "Form Validation", "Data Management"]
            },
            {
                id: 14,
                title: "Gambian E-commerce Shopping Cart",
                description: "Create a complete shopping cart system for a Gambian e-commerce site.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="shop">
    <h2>Gambian Online Shop</h2>
    <div class="products">
        <div class="product">
            <h3>Rice (5kg bag)</h3>
            <p>250 GMD</p>
            <button onclick="addToCart('Rice', 250)">Add to Cart</button>
        </div>
    </div>
    <div class="cart">
        <h3>Shopping Cart</h3>
        <div id="cart-items"></div>
        <p>Total: <span id="cart-total">0</span> GMD</p>
        <button onclick="checkout()">Checkout</button>
    </div>
</div>

<script>
let cart = [];

function addToCart(item, price) {
    cart.push({item: item, price: price});
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart-items');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cartDiv.innerHTML = '';
    cart.forEach(item => {
        cartDiv.innerHTML += '<p>' + item.item + ' - ' + item.price + ' GMD</p>';
    });
    document.getElementById('cart-total').textContent = total;
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert('Order total: ' + total + ' GMD. Thank you for shopping!');
    cart = [];
    updateCart();
}
</script>`,
                solution: `<div class="shop">
    <h2>Gambian Online Shop</h2>
    <div class="products">
        <div class="product">
            <h3>Rice (5kg bag)</h3>
            <p>250 GMD</p>
            <button onclick="addToCart('Rice', 250)">Add to Cart</button>
        </div>
        <div class="product">
            <h3>Fish (1kg)</h3>
            <p>200 GMD</p>
            <button onclick="addToCart('Fish', 200)">Add to Cart</button>
        </div>
        <div class="product">
            <h3>Vegetables (1kg)</h3>
            <p>50 GMD</p>
            <button onclick="addToCart('Vegetables', 50)">Add to Cart</button>
        </div>
    </div>
    <div class="cart">
        <h3>Shopping Cart</h3>
        <div id="cart-items"></div>
        <p>Total: <span id="cart-total">0</span> GMD</p>
        <button onclick="checkout()">Checkout</button>
        <button onclick="clearCart()">Clear Cart</button>
    </div>
</div>

<script>
let cart = [];

function addToCart(item, price) {
    cart.push({item: item, price: price});
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    const cartDiv = document.getElementById('cart-items');
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    cartDiv.innerHTML = '';
    cart.forEach(item => {
        cartDiv.innerHTML += '<p>' + item.item + ' - ' + item.price + ' GMD</p>';
    });
    document.getElementById('cart-total').textContent = total;
}

function checkout() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert('Order total: ' + total + ' GMD. Thank you for shopping!');
    cart = [];
    updateCart();
}
</script>`,
                points: 60,
                skills: ["JavaScript Arrays", "Reduce Method", "E-commerce Logic"]
            },
            {
                id: 15,
                title: "Gambian Social Media Post Creator",
                description: "Create a social media post creator with likes and comments functionality.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="social-media">
    <h2>Gambian Social Media</h2>
    <div class="create-post">
        <textarea id="post-content" placeholder="What's happening in Gambia?"></textarea>
        <button onclick="createPost()">Post</button>
    </div>
    <div id="posts"></div>
</div>

<script>
let posts = [];

function createPost() {
    const content = document.getElementById('post-content').value;
    if (content) {
        const post = {
            id: posts.length + 1,
            content: content,
            likes: 0,
            comments: []
        };
        posts.push(post);
        displayPosts();
        document.getElementById('post-content').value = '';
    }
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        displayPosts();
    }
}

function displayPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
        postsDiv.innerHTML += 
            '<div class="post">' +
            '<p>' + post.content + '</p>' +
            '<button onclick="likePost(' + post.id + ')">👍 ' + post.likes + '</button>' +
            '</div>';
    });
}
</script>`,
                solution: `<div class="social-media">
    <h2>Gambian Social Media</h2>
    <div class="create-post">
        <textarea id="post-content" placeholder="What's happening in Gambia?"></textarea>
        <button onclick="createPost()">Post</button>
    </div>
    <div id="posts"></div>
</div>

<script>
let posts = [];

function createPost() {
    const content = document.getElementById('post-content').value;
    if (content) {
        const post = {
            id: posts.length + 1,
            content: content,
            likes: 0,
            comments: []
        };
        posts.push(post);
        displayPosts();
        document.getElementById('post-content').value = '';
    }
}

function likePost(postId) {
    const post = posts.find(p => p.id === postId);
    if (post) {
        post.likes++;
        displayPosts();
    }
}

function displayPosts() {
    const postsDiv = document.getElementById('posts');
    postsDiv.innerHTML = '';
    posts.forEach(post => {
        postsDiv.innerHTML += 
            '<div class="post">' +
            '<p>' + post.content + '</p>' +
            '<button onclick="likePost(' + post.id + ')">👍 ' + post.likes + '</button>' +
            '</div>';
    });
}
</script>`,
                points: 65,
                skills: ["JavaScript Objects", "Array Methods", "Social Media Logic"]
            },
            {
                id: 16,
                title: "Gambian Government Budget Tracker",
                description: "Create a budget tracking system for government departments with spending limits.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="budget">
    <h2>Gambian Government Budget</h2>
    <div class="departments">
        <div class="dept">
            <h3>Education</h3>
            <p>Allocated: 1,000,000 GMD</p>
            <p>Spent: <span id="edu-spent">0</span> GMD</p>
            <input type="number" id="edu-amount" placeholder="Amount to spend">
            <button onclick="spend('education', 'edu-amount', 'edu-spent', 1000000)">Spend</button>
        </div>
    </div>
</div>

<script>
function spend(dept, inputId, spentId, limit) {
    const amount = parseInt(document.getElementById(inputId).value);
    const currentSpent = parseInt(document.getElementById(spentId).textContent);
    
    if (currentSpent + amount <= limit) {
        document.getElementById(spentId).textContent = currentSpent + amount;
        document.getElementById(inputId).value = '';
        alert('Spent ' + amount + ' GMD on ' + dept);
    } else {
        alert('Exceeds budget limit!');
    }
}
</script>`,
                solution: `<div class="budget">
    <h2>Gambian Government Budget</h2>
    <div class="departments">
        <div class="dept">
            <h3>Education</h3>
            <p>Allocated: 1,000,000 GMD</p>
            <p>Spent: <span id="edu-spent">0</span> GMD</p>
            <input type="number" id="edu-amount" placeholder="Amount to spend">
            <button onclick="spend('education', 'edu-amount', 'edu-spent', 1000000)">Spend</button>
        </div>
        <div class="dept">
            <h3>Health</h3>
            <p>Allocated: 800,000 GMD</p>
            <p>Spent: <span id="health-spent">0</span> GMD</p>
            <input type="number" id="health-amount" placeholder="Amount to spend">
            <button onclick="spend('health', 'health-amount', 'health-spent', 800000)">Spend</button>
        </div>
        <div class="dept">
            <h3>Infrastructure</h3>
            <p>Allocated: 1,200,000 GMD</p>
            <p>Spent: <span id="infra-spent">0</span> GMD</p>
            <input type="number" id="infra-amount" placeholder="Amount to spend">
            <button onclick="spend('infrastructure', 'infra-amount', 'infra-spent', 1200000)">Spend</button>
        </div>
    </div>
</div>

<script>
function spend(dept, inputId, spentId, limit) {
    const amount = parseInt(document.getElementById(inputId).value);
    const currentSpent = parseInt(document.getElementById(spentId).textContent);
    
    if (currentSpent + amount <= limit) {
        document.getElementById(spentId).textContent = currentSpent + amount;
        document.getElementById(inputId).value = '';
        alert('Spent ' + amount + ' GMD on ' + dept);
    } else {
        alert('Exceeds budget limit!');
    }
}
</script>`,
                points: 70,
                skills: ["JavaScript Functions", "Budget Management", "Validation Logic"]
            },
            {
                id: 17,
                title: "Gambian Agriculture Management System",
                description: "Create an agriculture management system for tracking crops and seasonal planning.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="agriculture">
    <h2>Gambian Agriculture Management</h2>
    <div class="crops">
        <h3>Available Crops</h3>
        <button onclick="plantCrop('Groundnut', 'Rainy')">Plant Groundnut</button>
        <button onclick="plantCrop('Rice', 'Rainy')">Plant Rice</button>
        <button onclick="plantCrop('Millet', 'Rainy')">Plant Millet</button>
    </div>
    <div class="field">
        <h3>Field Status</h3>
        <div id="field-status"></div>
    </div>
</div>

<script>
let field = {};

function plantCrop(crop, season) {
    const currentSeason = 'Rainy'; // Simulate current season
    if (season === currentSeason) {
        field[crop] = { planted: true, season: season };
        updateFieldStatus();
        alert(crop + ' planted successfully!');
    } else {
        alert(crop + ' cannot be planted in ' + currentSeason + ' season');
    }
}

function updateFieldStatus() {
    const statusDiv = document.getElementById('field-status');
    statusDiv.innerHTML = '';
    for (let crop in field) {
        if (field[crop].planted) {
            statusDiv.innerHTML += '<p>' + crop + ': Planted</p>';
        }
    }
}
</script>`,
                solution: `<div class="agriculture">
    <h2>Gambian Agriculture Management</h2>
    <div class="crops">
        <h3>Available Crops</h3>
        <button onclick="plantCrop('Groundnut', 'Rainy')">Plant Groundnut</button>
        <button onclick="plantCrop('Rice', 'Rainy')">Plant Rice</button>
        <button onclick="plantCrop('Millet', 'Rainy')">Plant Millet</button>
    </div>
    <div class="field">
        <h3>Field Status</h3>
        <div id="field-status"></div>
        <button onclick="harvestAll()">Harvest All</button>
    </div>
</div>

<script>
let field = {};

function plantCrop(crop, season) {
    const currentSeason = 'Rainy'; // Simulate current season
    if (season === currentSeason) {
        field[crop] = { planted: true, season: season };
        updateFieldStatus();
        alert(crop + ' planted successfully!');
    } else {
        alert(crop + ' cannot be planted in ' + currentSeason + ' season');
    }
}

function harvestAll() {
    let harvested = [];
    for (let crop in field) {
        if (field[crop].planted) {
            harvested.push(crop);
            field[crop].planted = false;
        }
    }
    if (harvested.length > 0) {
        alert('Harvested: ' + harvested.join(', '));
    } else {
        alert('No crops to harvest');
    }
    updateFieldStatus();
}

function updateFieldStatus() {
    const statusDiv = document.getElementById('field-status');
    statusDiv.innerHTML = '';
    for (let crop in field) {
        if (field[crop].planted) {
            statusDiv.innerHTML += '<p>' + crop + ': Planted</p>';
        }
    }
}
</script>`,
                points: 75,
                skills: ["JavaScript Objects", "Agriculture Logic", "Seasonal Planning"]
            },
            {
                id: 18,
                title: "Gambian Transportation System",
                description: "Create a transportation system for tracking buses, routes, and passenger management.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="transport">
    <h2>Gambian Transportation System</h2>
    <div class="buses">
        <div class="bus">
            <h3>Bus 1 - Banjul to Serekunda</h3>
            <p>Capacity: 50 passengers</p>
            <p>Current: <span id="bus1-passengers">0</span> passengers</p>
            <input type="number" id="bus1-board" placeholder="Passengers boarding">
            <button onclick="boardPassengers('bus1', 'bus1-board', 'bus1-passengers', 50)">Board</button>
        </div>
    </div>
</div>

<script>
function boardPassengers(busId, inputId, displayId, capacity) {
    const boarding = parseInt(document.getElementById(inputId).value);
    const current = parseInt(document.getElementById(displayId).textContent);
    
    if (current + boarding <= capacity) {
        document.getElementById(displayId).textContent = current + boarding;
        document.getElementById(inputId).value = '';
        alert(boarding + ' passengers boarded ' + busId);
    } else {
        alert('Bus is full!');
    }
}
</script>`,
                solution: `<div class="transport">
    <h2>Gambian Transportation System</h2>
    <div class="buses">
        <div class="bus">
            <h3>Bus 1 - Banjul to Serekunda</h3>
            <p>Capacity: 50 passengers</p>
            <p>Current: <span id="bus1-passengers">0</span> passengers</p>
            <input type="number" id="bus1-board" placeholder="Passengers boarding">
            <button onclick="boardPassengers('bus1', 'bus1-board', 'bus1-passengers', 50)">Board</button>
        </div>
        <div class="bus">
            <h3>Bus 2 - Brikama to Banjul</h3>
            <p>Capacity: 45 passengers</p>
            <p>Current: <span id="bus2-passengers">0</span> passengers</p>
            <input type="number" id="bus2-board" placeholder="Passengers boarding">
            <button onclick="boardPassengers('bus2', 'bus2-board', 'bus2-passengers', 45)">Board</button>
        </div>
        <div class="bus">
            <h3>Bus 3 - Farafenni to Banjul</h3>
            <p>Capacity: 40 passengers</p>
            <p>Current: <span id="bus3-passengers">0</span> passengers</p>
            <input type="number" id="bus3-board" placeholder="Passengers boarding">
            <button onclick="boardPassengers('bus3', 'bus3-board', 'bus3-passengers', 40)">Board</button>
        </div>
    </div>
</div>

<script>
function boardPassengers(busId, inputId, displayId, capacity) {
    const boarding = parseInt(document.getElementById(inputId).value);
    const current = parseInt(document.getElementById(displayId).textContent);
    
    if (current + boarding <= capacity) {
        document.getElementById(displayId).textContent = current + boarding;
        document.getElementById(inputId).value = '';
        alert(boarding + ' passengers boarded ' + busId);
    } else {
        alert('Bus is full!');
    }
}
</script>`,
                points: 80,
                skills: ["JavaScript Functions", "Transportation Logic", "Capacity Management"]
            },
            {
                id: 19,
                title: "Gambian Energy Management Dashboard",
                description: "Create an energy management system for tracking power consumption and renewable energy sources.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="energy">
    <h2>Gambian Energy Management</h2>
    <div class="sources">
        <h3>Energy Sources</h3>
        <div class="source">
            <h4>Solar Power</h4>
            <p>Generated: <span id="solar-power">0</span> kW</p>
            <button onclick="generatePower('solar', 'solar-power', 800)">Generate Solar</button>
        </div>
    </div>
    <div class="consumption">
        <h3>Total Consumption: <span id="total-consumption">1600</span> kW</h3>
        <p id="energy-status"></p>
    </div>
</div>

<script>
let totalGenerated = 0;

function generatePower(source, displayId, amount) {
    const current = parseInt(document.getElementById(displayId).textContent);
    document.getElementById(displayId).textContent = current + amount;
    totalGenerated += amount;
    updateEnergyStatus();
}

function updateEnergyStatus() {
    const consumption = 1600;
    const statusDiv = document.getElementById('energy-status');
    
    if (totalGenerated >= consumption) {
        statusDiv.textContent = 'Energy surplus: ' + (totalGenerated - consumption) + ' kW';
        statusDiv.style.color = 'green';
    } else {
        statusDiv.textContent = 'Energy deficit: ' + (consumption - totalGenerated) + ' kW';
        statusDiv.style.color = 'red';
    }
}
</script>`,
                solution: `<div class="energy">
    <h2>Gambian Energy Management</h2>
    <div class="sources">
        <h3>Energy Sources</h3>
        <div class="source">
            <h4>Solar Power</h4>
            <p>Generated: <span id="solar-power">0</span> kW</p>
            <button onclick="generatePower('solar', 'solar-power', 800)">Generate Solar</button>
        </div>
        <div class="source">
            <h4>Wind Power</h4>
            <p>Generated: <span id="wind-power">0</span> kW</p>
            <button onclick="generatePower('wind', 'wind-power', 400)">Generate Wind</button>
        </div>
        <div class="source">
            <h4>Grid Power</h4>
            <p>Generated: <span id="grid-power">0</span> kW</p>
            <button onclick="generatePower('grid', 'grid-power', 600)">Generate Grid</button>
        </div>
    </div>
    <div class="consumption">
        <h3>Total Consumption: <span id="total-consumption">1600</span> kW</h3>
        <p id="energy-status"></p>
        <button onclick="resetEnergy()">Reset</button>
    </div>
</div>

<script>
let totalGenerated = 0;

function generatePower(source, displayId, amount) {
    const current = parseInt(document.getElementById(displayId).textContent);
    document.getElementById(displayId).textContent = current + amount;
    totalGenerated += amount;
    updateEnergyStatus();
}

function resetEnergy() {
    totalGenerated = 0;
    document.getElementById('solar-power').textContent = '0';
    document.getElementById('wind-power').textContent = '0';
    document.getElementById('grid-power').textContent = '0';
    updateEnergyStatus();
}

function updateEnergyStatus() {
    const consumption = 1600;
    const statusDiv = document.getElementById('energy-status');
    
    if (totalGenerated >= consumption) {
        statusDiv.textContent = 'Energy surplus: ' + (totalGenerated - consumption) + ' kW';
        statusDiv.style.color = 'green';
    } else {
        statusDiv.textContent = 'Energy deficit: ' + (consumption - totalGenerated) + ' kW';
        statusDiv.style.color = 'red';
    }
}
</script>`,
                points: 85,
                skills: ["JavaScript State Management", "Energy Management", "Real-time Updates"]
            },
            {
                id: 20,
                title: "Gambian Digital Innovation Hub - Complete System",
                description: "Create a comprehensive digital innovation system that combines all previous concepts into a smart city platform.",
                difficulty: "advanced",
                languages: ["html", "css", "js"],
                example: `<div class="smart-city">
    <h2>Gambian Digital Innovation Hub</h2>
    <div class="systems">
        <h3>Smart City Systems</h3>
        <div class="system-grid">
            <div class="system" onclick="toggleSystem('transport')">
                <h4>Transportation</h4>
                <p id="transport-status">Active</p>
            </div>
            <div class="system" onclick="toggleSystem('energy')">
                <h4>Energy</h4>
                <p id="energy-status">Active</p>
            </div>
        </div>
    </div>
    <div class="citizens">
        <h3>Citizen Registration</h3>
        <input type="text" id="citizen-name" placeholder="Name">
        <button onclick="registerCitizen()">Register</button>
        <div id="citizen-list"></div>
    </div>
</div>

<script>
let systems = { transport: true, energy: true };
let citizens = [];

function toggleSystem(system) {
    systems[system] = !systems[system];
    const status = systems[system] ? 'Active' : 'Inactive';
    document.getElementById(system + '-status').textContent = status;
}

function registerCitizen() {
    const name = document.getElementById('citizen-name').value;
    if (name) {
        citizens.push({name: name, id: citizens.length + 1});
        updateCitizenList();
        document.getElementById('citizen-name').value = '';
    }
}

function updateCitizenList() {
    const listDiv = document.getElementById('citizen-list');
    listDiv.innerHTML = '';
    citizens.forEach(citizen => {
        listDiv.innerHTML += '<p>ID: ' + citizen.id + ' - ' + citizen.name + '</p>';
    });
}
</script>`,
                solution: `<div class="smart-city">
    <h2>Gambian Digital Innovation Hub</h2>
    <div class="systems">
        <h3>Smart City Systems</h3>
        <div class="system-grid">
            <div class="system" onclick="toggleSystem('transport')">
                <h4>Transportation</h4>
                <p id="transport-status">Active</p>
            </div>
            <div class="system" onclick="toggleSystem('energy')">
                <h4>Energy</h4>
                <p id="energy-status">Active</p>
            </div>
            <div class="system" onclick="toggleSystem('healthcare')">
                <h4>Healthcare</h4>
                <p id="healthcare-status">Active</p>
            </div>
            <div class="system" onclick="toggleSystem('education')">
                <h4>Education</h4>
                <p id="education-status">Active</p>
            </div>
        </div>
    </div>
    <div class="citizens">
        <h3>Citizen Registration</h3>
        <input type="text" id="citizen-name" placeholder="Name">
        <input type="number" id="citizen-age" placeholder="Age">
        <button onclick="registerCitizen()">Register</button>
        <div id="citizen-list"></div>
    </div>
    <div class="innovation-report">
        <h3>Innovation Report</h3>
        <button onclick="generateReport()">Generate Report</button>
        <div id="report"></div>
    </div>
</div>

<script>
let systems = { transport: true, energy: true, healthcare: true, education: true };
let citizens = [];

function toggleSystem(system) {
    systems[system] = !systems[system];
    const status = systems[system] ? 'Active' : 'Inactive';
    document.getElementById(system + '-status').textContent = status;
}

function registerCitizen() {
    const name = document.getElementById('citizen-name').value;
    const age = document.getElementById('citizen-age').value;
    if (name && age) {
        citizens.push({name: name, age: age, id: citizens.length + 1});
        updateCitizenList();
        document.getElementById('citizen-name').value = '';
        document.getElementById('citizen-age').value = '';
    }
}

function updateCitizenList() {
    const listDiv = document.getElementById('citizen-list');
    listDiv.innerHTML = '';
    citizens.forEach(citizen => {
        listDiv.innerHTML += '<p>ID: ' + citizen.id + ' - ' + citizen.name + ' (' + citizen.age + ' years)</p>';
    });
}

function generateReport() {
    const reportDiv = document.getElementById('report');
    let report = 'Gambian Digital Innovation Report:\n\n';
    report += 'Active Systems: ' + Object.values(systems).filter(s => s).length + '/4\n';
    report += 'Registered Citizens: ' + citizens.length + '\n\n';
    report += 'Building a digitally connected Gambia for sustainable development!';
    reportDiv.textContent = report;
}
</script>`,
                points: 100,
                skills: ["Advanced JavaScript", "System Integration", "Smart City Development"]
            }
        ];
    }

    loadProgress() {
        const saved = localStorage.getItem('gambia-coding-progress');
        if (saved) {
            return JSON.parse(saved);
        }
        return {
            completedChallenges: [],
            currentStreak: 0,
            totalPoints: 0,
            level: 1,
            achievements: ["Welcome to the Challenge!"]
        };
    }

    saveProgress() {
        localStorage.setItem('gambia-coding-progress', JSON.stringify(this.userProgress));
    }

    updateDashboard() {
        const completed = this.userProgress.completedChallenges.length;
        const streak = this.userProgress.currentStreak;
        const points = this.userProgress.totalPoints;
        const level = this.userProgress.level;

        document.getElementById('days-completed').textContent = completed;
        document.getElementById('streak').textContent = streak;
        document.getElementById('total-points').textContent = points;
        document.getElementById('level').textContent = level;

        // Update today's challenge
        const nextChallenge = this.getNextChallenge();
        if (nextChallenge) {
            document.getElementById('today-title').textContent = `Day ${nextChallenge.id}: ${nextChallenge.title}`;
            document.getElementById('today-description').textContent = nextChallenge.description;
            document.getElementById('today-difficulty').textContent = nextChallenge.difficulty.charAt(0).toUpperCase() + nextChallenge.difficulty.slice(1);
        }

        // Update achievements
        const achievementsList = document.getElementById('achievements-list');
        achievementsList.innerHTML = '';
        this.userProgress.achievements.forEach(achievement => {
            const achievementItem = document.createElement('div');
            achievementItem.className = 'achievement-item';
            achievementItem.innerHTML = `<i class="fas fa-medal"></i><span>${achievement}</span>`;
            achievementsList.appendChild(achievementItem);
        });
    }

    getNextChallenge() {
        const completed = this.userProgress.completedChallenges;
        for (let challenge of this.challenges) {
            if (!completed.includes(challenge.id)) {
                return challenge;
            }
        }
        return null;
    }

    renderChallenges() {
        const grid = document.getElementById('challenges-grid');
        grid.innerHTML = '';

        this.challenges.forEach(challenge => {
            const card = document.createElement('div');
            card.className = 'challenge-card';
            
            const isCompleted = this.userProgress.completedChallenges.includes(challenge.id);
            const isLocked = challenge.id > 1 && !this.userProgress.completedChallenges.includes(challenge.id - 1);
            
            if (isCompleted) {
                card.classList.add('completed');
            } else if (isLocked) {
                card.classList.add('locked');
            }

            const languagesText = challenge.languages.join(', ').toUpperCase();

            card.innerHTML = `
                <div class="challenge-number">Day ${challenge.id}</div>
                <div class="challenge-title">${challenge.title}</div>
                <div class="challenge-description">${challenge.description}</div>
                <div class="challenge-meta">
                    <span class="difficulty ${challenge.difficulty}">${challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}</span>
                    <span class="languages">${languagesText}</span>
                    <span class="challenge-status ${isCompleted ? 'completed' : (isLocked ? 'locked' : '')}">
                        ${isCompleted ? '✓' : (isLocked ? '🔒' : '→')}
                    </span>
                </div>
            `;

            if (!isLocked) {
                card.addEventListener('click', () => this.startChallenge(challenge.id));
            }

            grid.appendChild(card);
        });
    }

    startChallenge(challengeId) {
        const challenge = this.challenges.find(c => c.id === challengeId);
        if (!challenge) return;

        this.currentChallenge = challenge;
        
        document.getElementById('modal-title').textContent = `Day ${challenge.id}: ${challenge.title}`;
        document.getElementById('modal-description').textContent = challenge.description;
        document.getElementById('modal-theory').innerHTML = challenge.theory || '<p>Learn the concepts behind this challenge...</p>';
        document.getElementById('modal-example').textContent = challenge.example;
        
        // Clear all editors
        document.getElementById('html-editor').value = '';
        document.getElementById('css-editor').value = '';
        document.getElementById('js-editor').value = '';
        document.getElementById('code-output').textContent = '';
        
        // Set default language based on challenge
        if (challenge.languages.includes('html')) {
            this.switchLanguage('html');
        } else if (challenge.languages.includes('css')) {
            this.switchLanguage('css');
        } else {
            this.switchLanguage('js');
        }

        document.getElementById('challenge-modal').style.display = 'block';
    }

    closeChallenge() {
        document.getElementById('challenge-modal').style.display = 'none';
        this.currentChallenge = null;
    }

    runCode() {
        const html = document.getElementById('html-editor').value;
        const css = document.getElementById('css-editor').value;
        const js = document.getElementById('js-editor').value;
        
        // Create complete HTML document
        const fullHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}</script>
            </body>
            </html>
        `;
        
        // Update preview iframe
        const iframe = document.getElementById('preview-frame');
        iframe.srcdoc = fullHTML;
        
        // Also capture console output
        try {
            const originalLog = console.log;
            let logOutput = '';
            console.log = function(...args) {
                logOutput += args.join(' ') + '\n';
            };
            
            // Execute JavaScript in a safe way
            if (js.trim()) {
                eval(js);
            }
            
            console.log = originalLog;
            
            // Update console output
            document.getElementById('code-output').textContent = logOutput || 'No console output';
        } catch (error) {
            document.getElementById('code-output').textContent = `Error: ${error.message}`;
        }
    }

    submitSolution() {
        if (!this.currentChallenge) return;

        const html = document.getElementById('html-editor').value.trim();
        const css = document.getElementById('css-editor').value.trim();
        const js = document.getElementById('js-editor').value.trim();
        
        // Simple validation - check if user has written some code
        const hasContent = html || css || js;
        
        if (!hasContent) {
            alert('❌ Please write some code before submitting!');
            return;
        }
        
        // For now, accept any reasonable attempt
        // In a real app, you'd have more sophisticated validation
        if (this.isSolutionReasonable(html, css, js)) {
            this.completeChallenge(this.currentChallenge.id);
            alert('🎉 Congratulations! Challenge completed successfully!');
            this.closeChallenge();
        } else {
            alert('❌ Solution needs more work. Keep trying!');
        }
    }

    isSolutionReasonable(html, css, js) {
        // Basic validation - check if the solution contains expected elements
        const challenge = this.currentChallenge;
        
        // Check HTML content
        if (challenge.languages.includes('html') && html.length < 10) {
            return false;
        }
        
        // Check CSS content
        if (challenge.languages.includes('css') && css.length < 5) {
            return false;
        }
        
        // Check JavaScript content
        if (challenge.languages.includes('js') && js.length < 5) {
            return false;
        }
        
        return true;
    }

    completeChallenge(challengeId) {
        if (this.userProgress.completedChallenges.includes(challengeId)) return;

        const challenge = this.challenges.find(c => c.id === challengeId);
        this.userProgress.completedChallenges.push(challengeId);
        this.userProgress.totalPoints += challenge.points;
        this.userProgress.currentStreak += 1;
        this.userProgress.level = Math.floor(this.userProgress.completedChallenges.length / 5) + 1;

        // Add achievements
        if (challengeId === 1) {
            this.userProgress.achievements.push("First Web Page Created!");
        } else if (challengeId === 5) {
            this.userProgress.achievements.push("Interactive Web Developer!");
        } else if (challengeId === 10) {
            this.userProgress.achievements.push("Full-Stack Developer!");
        } else if (challengeId === 15) {
            this.userProgress.achievements.push("Advanced Web Developer!");
        } else if (challengeId === 20) {
            this.userProgress.achievements.push("🎉 Web Development Master! You've completed all 20 challenges!");
        }

        this.saveProgress();
        this.updateDashboard();
        this.renderChallenges();
        this.updateProgress();
    }

    updateProgress() {
        const completed = this.userProgress.completedChallenges.length;
        const total = this.challenges.length;
        const percentage = (completed / total) * 100;

        document.getElementById('completion-progress').style.width = `${percentage}%`;
        document.getElementById('completion-text').textContent = `${Math.round(percentage)}% Complete`;

        // Update skill progress
        const htmlProgress = Math.min(100, (completed / 5) * 100);
        const cssProgress = Math.min(100, (completed / 8) * 100);
        const jsProgress = Math.min(100, (completed / 10) * 100);

        document.getElementById('js-progress').style.width = `${jsProgress}%`;
        document.getElementById('problem-solving-progress').style.width = `${cssProgress}%`;
        document.getElementById('html-css-progress').style.width = `${htmlProgress}%`;
    }
}

// Global functions for HTML onclick handlers
function startChallenge(challengeId) {
    app.startChallenge(challengeId);
}

function closeChallenge() {
    app.closeChallenge();
}

function runCode() {
    app.runCode();
}

function submitSolution() {
    app.submitSolution();
}

function showSignIn() {
    document.getElementById('signup-page').classList.remove('active');
    document.getElementById('signin-page').classList.add('active');
}

function showSignUp() {
    document.getElementById('signin-page').classList.remove('active');
    document.getElementById('signup-page').classList.add('active');
}

function logout() {
    localStorage.removeItem('currentUser');
    app.currentUser = null;
    app.showAuth();
}

function toggleTheme() {
    app.isDarkMode = !app.isDarkMode;
    localStorage.setItem('darkMode', app.isDarkMode);
    app.initializeTheme();
}

// Initialize the app
const app = new CodingChallengeApp();