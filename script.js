// Import Firebase functions
import { ref, push, get, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-database.js";

// Get database reference from window object
const database = window.database;

// Numerology system
const numerologySystem = {
    'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
    'J': 10, 'K': 11, 'L': 12, 'M': 13, 'N': 14, 'O': 15, 'P': 16, 'Q': 17,
    'R': 18, 'S': 19, 'T': 20, 'U': 21, 'V': 22, 'W': 23, 'X': 24, 'Y': 25, 'Z': 26
};

// Personality traits based on core numbers
const personalityTraits = {
    1: {
        title: "The Leader",
        traits: "Leadership, Independence, Innovation, Determination",
        description: "Natural-born leaders with strong willpower and independence. They are innovative thinkers who prefer to take charge and make their own path. Their determination helps them overcome obstacles, but they may need to be mindful of being too dominant or controlling.",
        strengths: "Initiative, Creativity, Confidence, Originality",
        challenges: "Impatience, Stubbornness, Dominance, Isolation"
    },
    2: {
        title: "The Diplomat",
        traits: "Sensitivity, Cooperation, Diplomacy, Balance",
        description: "Highly intuitive and sensitive individuals who excel in partnerships and teamwork. They are natural peacemakers with a strong sense of harmony and balance. Their diplomatic nature helps them navigate complex social situations with grace.",
        strengths: "Cooperation, Intuition, Patience, Tact",
        challenges: "Indecision, Over-sensitivity, Dependence, Self-doubt"
    },
    3: {
        title: "The Creative",
        traits: "Creativity, Optimism, Expression, Social",
        description: "Vibrant and expressive individuals who bring joy and creativity to their surroundings. They are natural communicators with a gift for self-expression through various artistic mediums. Their optimism is infectious, but they may need to focus on follow-through.",
        strengths: "Creativity, Communication, Joy, Inspiration",
        challenges: "Scattered Energy, Superficiality, Exaggeration, Procrastination"
    },
    4: {
        title: "The Builder",
        traits: "Practicality, Dependability, Organization, Stability",
        description: "Grounded and practical individuals who excel at creating solid foundations. They are highly organized and methodical, with a strong work ethic. Their stability makes them reliable, but they may need to be more flexible at times.",
        strengths: "Reliability, Discipline, Organization, Practicality",
        challenges: "Rigidity, Stubbornness, Overwork, Resistance to Change"
    },
    5: {
        title: "The Adventurer",
        traits: "Freedom, Adventure, Change, Versatility",
        description: "Dynamic and freedom-loving individuals who thrive on change and new experiences. They are versatile and adaptable, with a natural curiosity about the world. Their adventurous spirit is inspiring, but they may need to develop more consistency.",
        strengths: "Adaptability, Freedom, Progress, Versatility",
        challenges: "Restlessness, Impulsiveness, Inconsistency, Scattered Focus"
    },
    6: {
        title: "The Nurturer",
        traits: "Nurturing, Responsibility, Harmony, Service",
        description: "Caring and responsible individuals who naturally take care of others. They create harmony in their relationships and environments. Their nurturing nature is their strength, but they may need to set healthy boundaries.",
        strengths: "Responsibility, Nurturing, Harmony, Service",
        challenges: "Over-responsibility, Perfectionism, Worry, Martyrdom"
    },
    7: {
        title: "The Seeker",
        traits: "Introspection, Spirituality, Analysis, Wisdom",
        description: "Deep thinkers and spiritual seekers who value knowledge and wisdom. They are analytical and introspective, often drawn to philosophical or spiritual pursuits. Their depth is their strength, but they may need to balance it with practical action.",
        strengths: "Wisdom, Analysis, Spirituality, Depth",
        challenges: "Isolation, Skepticism, Perfectionism, Over-analysis"
    },
    8: {
        title: "The Achiever",
        traits: "Ambition, Power, Success, Material Focus",
        description: "Ambitious and powerful individuals who excel in business and material success. They are natural leaders in the material world with strong executive abilities. Their drive is impressive, but they may need to balance material and spiritual values.",
        strengths: "Leadership, Ambition, Organization, Achievement",
        challenges: "Workaholism, Materialism, Control, Impatience"
    },
    9: {
        title: "The Humanitarian",
        traits: "Compassion, Idealism, Universal Love, Humanitarian",
        description: "Compassionate and idealistic individuals who are drawn to humanitarian causes. They have a broad perspective and deep understanding of human nature. Their compassion is their strength, but they may need to be more practical in their idealism.",
        strengths: "Compassion, Idealism, Understanding, Universal Love",
        challenges: "Over-idealism, Martyrdom, Scattered Focus, Emotional Overload"
    }
};

// Relationship dynamics based on number combinations
const relationshipDynamics = {
    "1-1": {
        title: "Power Couple",
        description: "A dynamic partnership of two strong leaders. This combination can create either a powerful alliance or a battle of wills. Success comes when both partners learn to share leadership and respect each other's independence.",
        strengths: "Strong leadership, mutual respect, shared vision",
        challenges: "Power struggles, competition, dominance issues",
        advice: "Focus on complementary leadership roles and celebrate each other's achievements"
    },
    "1-2": {
        title: "Yin and Yang",
        description: "A perfect balance of leadership and diplomacy. The 1 brings direction and initiative, while the 2 provides sensitivity and cooperation. This combination often creates a harmonious and supportive relationship.",
        strengths: "Balance, mutual support, complementary energies",
        challenges: "Different communication styles, pace differences",
        advice: "Appreciate each other's unique contributions and maintain open communication"
    },
    "1-3": {
        title: "Creative Powerhouse",
        description: "A vibrant combination of leadership and creativity. The 1 provides direction while the 3 brings inspiration and joy. Together they can create something truly unique and impactful.",
        strengths: "Creativity, dynamic energy, shared vision",
        challenges: "Different priorities, communication styles",
        advice: "Balance practical goals with creative expression"
    },
    "1-4": {
        title: "Foundation Builders",
        description: "A practical and powerful combination. The 1 brings vision while the 4 provides structure and stability. Together they can build lasting success through careful planning and execution.",
        strengths: "Stability, achievement, practical success",
        challenges: "Different approaches to change, rigidity",
        advice: "Combine vision with practical planning"
    },
    "1-5": {
        title: "Dynamic Duo",
        description: "An exciting and adventurous partnership. The 1 provides direction while the 5 brings adaptability and change. Together they can create an exciting and evolving relationship.",
        strengths: "Adaptability, growth, shared adventures",
        challenges: "Different needs for stability, focus",
        advice: "Balance freedom with commitment"
    },
    "1-6": {
        title: "Nurturing Leadership",
        description: "A balanced combination of strength and care. The 1 provides direction while the 6 brings nurturing and harmony. Together they can create a supportive and successful partnership.",
        strengths: "Balance, mutual support, shared goals",
        challenges: "Different approaches to responsibility",
        advice: "Combine leadership with compassion"
    },
    "1-7": {
        title: "Visionary Partnership",
        description: "A combination of action and wisdom. The 1 provides initiative while the 7 brings depth and analysis. Together they can achieve both material and spiritual success.",
        strengths: "Depth, achievement, shared wisdom",
        challenges: "Different communication styles, pace",
        advice: "Balance action with reflection"
    },
    "1-8": {
        title: "Power and Success",
        description: "A powerful combination focused on achievement. Both numbers bring strong leadership qualities, creating potential for great material success. Together they can build an empire.",
        strengths: "Achievement, power, shared goals",
        challenges: "Competition, work-life balance",
        advice: "Share power and celebrate joint success"
    },
    "1-9": {
        title: "Visionary Humanitarians",
        description: "A combination of leadership and compassion. The 1 provides direction while the 9 brings universal understanding. Together they can make a significant impact on the world.",
        strengths: "Vision, compassion, shared purpose",
        challenges: "Different approaches to idealism",
        advice: "Balance practical action with humanitarian goals"
    },
    "2-2": {
        title: "Soul Connection",
        description: "A deeply sensitive and intuitive partnership. Both partners are highly attuned to each other's needs and emotions, creating a strong bond of understanding and support.",
        strengths: "Deep connection, mutual understanding, harmony",
        challenges: "Over-sensitivity, indecision, dependency",
        advice: "Maintain individual identities while nurturing the connection"
    },
    "2-3": {
        title: "Creative and Expressive",
        description: "A combination of creativity and emotional expression. The 2 provides sensitivity and the 3 brings joy and social interaction. This combination often creates a vibrant and expressive relationship.",
        strengths: "Creativity, emotional connection, social interaction",
        challenges: "Different emotional needs, communication styles",
        advice: "Appreciate each other's unique contributions and maintain open communication"
    },
    "2-4": {
        title: "Stable and Practical",
        description: "A practical and stable combination. The 2 provides stability and the 4 provides practicality. Together they can create a solid foundation for a relationship.",
        strengths: "Stability, practicality, emotional foundation",
        challenges: "Different emotional needs, rigidity",
        advice: "Combine emotional stability with practical planning"
    },
    "2-5": {
        title: "Balanced Adventure",
        description: "A balanced combination of stability and adventure. The 2 provides stability while the 5 brings change and adaptability. Together they can create a harmonious and evolving relationship.",
        strengths: "Stability, adaptability, emotional connection",
        challenges: "Different emotional needs, commitment",
        advice: "Balance emotional stability with adventurous growth"
    },
    "2-6": {
        title: "Nurturing Harmony",
        description: "A harmonious combination of nurturing and emotional connection. The 2 provides emotional stability while the 6 brings nurturing and harmony. Together they can create a supportive and harmonious relationship.",
        strengths: "Emotional stability, nurturing, emotional connection",
        challenges: "Different emotional needs, over-responsibility",
        advice: "Balance emotional stability with nurturing boundaries"
    },
    "2-7": {
        title: "Deep Spiritual Connection",
        description: "A deep and spiritual connection between two individuals. The 2 provides emotional stability while the 7 brings spiritual depth and introspection. Together they can explore both material and spiritual aspects of life.",
        strengths: "Emotional stability, spiritual depth, emotional connection",
        challenges: "Different emotional needs, spiritual isolation",
        advice: "Balance emotional stability with spiritual growth"
    },
    "2-8": {
        title: "Emotional and Material Success",
        description: "A balanced combination of emotional and material success. The 2 provides emotional stability while the 8 brings ambition and material success. Together they can achieve both emotional and material goals.",
        strengths: "Emotional stability, ambition, material success",
        challenges: "Different emotional needs, work-life balance",
        advice: "Balance emotional stability with material ambition"
    },
    "2-9": {
        title: "Compassionate Idealism",
        description: "A combination of compassion and idealism. The 2 provides emotional stability while the 9 brings universal understanding and humanitarian focus. Together they can make a significant impact on the world.",
        strengths: "Emotional stability, idealism, humanitarian focus",
        challenges: "Different emotional needs, over-idealism",
        advice: "Balance emotional stability with practical action"
    },
    "3-3": {
        title: "Creative Expression",
        description: "A combination of creativity and expression. The 3 brings joy and social interaction while the 3 brings more creativity and expression. Together they can create a vibrant and expressive environment.",
        strengths: "Creativity, expression, social interaction",
        challenges: "Different communication styles, superficiality",
        advice: "Balance creativity with practical expression"
    },
    "3-4": {
        title: "Balanced Creativity",
        description: "A balanced combination of creativity and practicality. The 3 brings joy and social interaction while the 4 provides structure and stability. Together they can create a harmonious and practical environment.",
        strengths: "Creativity, practicality, social interaction",
        challenges: "Different communication styles, rigidity",
        advice: "Balance creativity with practical planning"
    },
    "3-5": {
        title: "Dynamic and Adventurous",
        description: "A dynamic and adventurous combination. The 3 brings joy and social interaction while the 5 brings change and adaptability. Together they can create a vibrant and adventurous environment.",
        strengths: "Creativity, adventure, social interaction",
        challenges: "Different communication styles, commitment",
        advice: "Balance creativity with adventurous growth"
    },
    "3-6": {
        title: "Creative and Nurturing",
        description: "A nurturing and creative combination. The 3 brings joy and social interaction while the 6 brings nurturing and harmony. Together they can create a supportive and nurturing environment.",
        strengths: "Creativity, nurturing, social interaction",
        challenges: "Different communication styles, over-responsibility",
        advice: "Balance creativity with nurturing boundaries"
    },
    "3-7": {
        title: "Intellectual and Creative",
        description: "A combination of intellectual and creative energies. The 3 brings joy and social interaction while the 7 brings depth and analysis. Together they can create a vibrant and intellectual environment.",
        strengths: "Creativity, intellectual connection, social interaction",
        challenges: "Different communication styles, superficiality",
        advice: "Balance creativity with intellectual depth"
    },
    "3-8": {
        title: "Creative Success",
        description: "A combination of creativity and success. The 3 brings joy and social interaction while the 8 brings ambition and material success. Together they can create a vibrant and successful environment.",
        strengths: "Creativity, success, social interaction",
        challenges: "Different communication styles, work-life balance",
        advice: "Balance creativity with material ambition"
    },
    "3-9": {
        title: "Creative Humanitarian",
        description: "A combination of creativity and humanitarian focus. The 3 brings joy and social interaction while the 9 brings universal understanding and humanitarian focus. Together they can create a vibrant and humanitarian environment.",
        strengths: "Creativity, humanitarian focus, social interaction",
        challenges: "Different communication styles, over-idealism",
        advice: "Balance creativity with humanitarian goals"
    },
    "4-4": {
        title: "Stable Foundation",
        description: "A solid and stable foundation for a relationship. The 4 provides structure and stability while the 4 provides more structure and stability. Together they can create a solid foundation for a relationship.",
        strengths: "Stability, foundation, practicality",
        challenges: "Rigidity, stubbornness, overwork",
        advice: "Combine stability with practical planning"
    },
    "4-5": {
        title: "Balanced Stability",
        description: "A balanced combination of stability and change. The 4 provides structure and stability while the 5 brings change and adaptability. Together they can create a harmonious and evolving environment.",
        strengths: "Stability, change, practicality",
        challenges: "Different approaches to change, rigidity",
        advice: "Balance stability with adventurous growth"
    },
    "4-6": {
        title: "Family and Home Focus",
        description: "A focus on family and home with a practical approach. The 4 provides structure and stability while the 6 brings nurturing and harmony. Together they can create a supportive and harmonious environment.",
        strengths: "Family focus, practicality, emotional connection",
        challenges: "Different emotional needs, over-responsibility",
        advice: "Balance family focus with emotional boundaries"
    },
    "4-7": {
        title: "Practical Wisdom",
        description: "A combination of practical wisdom and spiritual depth. The 4 provides structure and stability while the 7 brings depth and analysis. Together they can create a harmonious and intellectual environment.",
        strengths: "Practicality, wisdom, emotional connection",
        challenges: "Different communication styles, superficiality",
        advice: "Balance practicality with spiritual depth"
    },
    "4-8": {
        title: "Material Success",
        description: "A combination of material success and stability. The 4 provides structure and stability while the 8 brings ambition and material success. Together they can create a successful and stable environment.",
        strengths: "Stability, ambition, material success",
        challenges: "Workaholism, materialism, control",
        advice: "Balance stability with material ambition"
    },
    "4-9": {
        title: "Practical Humanitarian",
        description: "A combination of practicality and humanitarian focus. The 4 provides structure and stability while the 9 brings universal understanding and humanitarian focus. Together they can create a successful and humanitarian environment.",
        strengths: "Practicality, humanitarian focus, stability",
        challenges: "Over-idealism, martydom, scattered focus",
        advice: "Balance practicality with humanitarian goals"
    },
    "5-5": {
        title: "Adventurous Freedom",
        description: "A combination of adventurous spirit and freedom-loving nature. The 5 brings change and adaptability while the 5 brings more adventurous spirit and freedom-loving nature. Together they can create a vibrant and adventurous environment.",
        strengths: "Adventure, freedom, adaptability",
        challenges: "Restlessness, impulsiveness, inconsistency",
        advice: "Balance adventurous growth with freedom"
    },
    "5-6": {
        title: "Balanced Adventure",
        description: "A balanced combination of adventure and responsibility. The 5 brings change and adaptability while the 6 brings nurturing and harmony. Together they can create a harmonious and adventurous environment.",
        strengths: "Adventure, responsibility, adaptability",
        challenges: "Different emotional needs, over-responsibility",
        advice: "Balance adventurous growth with nurturing boundaries"
    },
    "5-7": {
        title: "Adventurous Spirit",
        description: "A combination of adventurous spirit and intellectual depth. The 5 brings change and adaptability while the 7 brings depth and analysis. Together they can create a vibrant and intellectual environment.",
        strengths: "Adventure, intellectual connection, adaptability",
        challenges: "Different communication styles, superficiality",
        advice: "Balance adventurous growth with intellectual depth"
    },
    "5-8": {
        title: "Dynamic Success",
        description: "A combination of dynamic success and freedom-loving nature. The 5 brings change and adaptability while the 8 brings ambition and material success. Together they can create a successful and adventurous environment.",
        strengths: "Adventure, success, adaptability",
        challenges: "Workaholism, materialism, control",
        advice: "Balance adventurous growth with material ambition"
    },
    "5-9": {
        title: "Adventurous Humanitarian",
        description: "A combination of adventurous spirit and humanitarian focus. The 5 brings change and adaptability while the 9 brings universal understanding and humanitarian focus. Together they can create a successful and humanitarian environment.",
        strengths: "Adventure, humanitarian focus, adaptability",
        challenges: "Over-idealism, martydom, scattered focus",
        advice: "Balance adventurous growth with humanitarian goals"
    },
    "6-6": {
        title: "Nurturing Family",
        description: "A combination of nurturing and family focus. The 6 brings nurturing and harmony while the 6 brings more nurturing and harmony. Together they can create a supportive and harmonious environment.",
        strengths: "Nurturing, harmony, family focus",
        challenges: "Over-responsibility, perfectionism, worry",
        advice: "Balance nurturing with boundaries"
    },
    "6-7": {
        title: "Balanced Nurturing",
        description: "A balanced combination of nurturing and wisdom. The 6 brings nurturing and harmony while the 7 brings depth and analysis. Together they can create a harmonious and intellectual environment.",
        strengths: "Nurturing, wisdom, emotional connection",
        challenges: "Different emotional needs, over-responsibility",
        advice: "Balance nurturing with emotional boundaries"
    },
    "6-8": {
        title: "Nurturing Success",
        description: "A combination of nurturing success and material focus. The 6 brings nurturing and harmony while the 8 brings ambition and material success. Together they can create a successful and nurturing environment.",
        strengths: "Nurturing, success, material focus",
        challenges: "Workaholism, materialism, control",
        advice: "Balance nurturing with material ambition"
    },
    "6-9": {
        title: "Nurturing Humanitarian",
        description: "A combination of nurturing and humanitarian focus. The 6 brings nurturing and harmony while the 9 brings universal understanding and humanitarian focus. Together they can create a successful and humanitarian environment.",
        strengths: "Nurturing, humanitarian focus, harmony",
        challenges: "Over-idealism, martydom, scattered focus",
        advice: "Balance nurturing with humanitarian goals"
    },
    "7-7": {
        title: "Spiritual Depth",
        description: "A deep and spiritual connection between two individuals. The 7 brings depth and analysis while the 7 brings more depth and analysis. Together they can explore both material and spiritual aspects of life.",
        strengths: "Depth, analysis, spiritual connection",
        challenges: "Isolation, skepticism, perfectionism",
        advice: "Balance depth with spiritual growth"
    },
    "7-8": {
        title: "Wisdom and Material Success",
        description: "A combination of wisdom and material success. The 7 brings depth and analysis while the 8 brings ambition and material success. Together they can create a successful and intellectual environment.",
        strengths: "Wisdom, success, material focus",
        challenges: "Workaholism, materialism, control",
        advice: "Balance wisdom with material ambition"
    },
    "7-9": {
        title: "Spiritual Humanitarian",
        description: "A combination of spiritual depth and humanitarian focus. The 7 brings depth and analysis while the 9 brings universal understanding and humanitarian focus. Together they can create a successful and humanitarian environment.",
        strengths: "Wisdom, humanitarian focus, depth",
        challenges: "Over-idealism, martydom, scattered focus",
        advice: "Balance wisdom with humanitarian goals"
    },
    "8-8": {
        title: "Material Success",
        description: "A combination of material success and ambition. The 8 brings ambition and material success while the 8 brings more ambition and material success. Together they can create a successful and stable environment.",
        strengths: "Ambition, success, material focus",
        challenges: "Workaholism, materialism, control",
        advice: "Balance ambition with stability"
    },
    "8-9": {
        title: "Success and Humanitarian",
        description: "A combination of success and humanitarian focus. The 8 brings ambition and material success while the 9 brings universal understanding and humanitarian focus. Together they can create a successful and humanitarian environment.",
        strengths: "Ambition, success, humanitarian focus",
        challenges: "Over-idealism, martydom, scattered focus",
        advice: "Balance success with humanitarian goals"
    },
    "9-9": {
        title: "Humanitarian Idealism",
        description: "A combination of humanitarian focus and idealism. The 9 brings universal understanding and humanitarian focus while the 9 brings more universal understanding and humanitarian focus. Together they can create a successful and stable environment.",
        strengths: "Humanitarian focus, idealism, stability",
        challenges: "Over-idealism, martydom, scattered focus",
        advice: "Balance humanitarian goals with idealism"
    }
};

// Calculate digital root
function digitalRoot(num) {
    while (num > 9) {
        num = num.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
    }
    return num;
}

// Calculate name number
function calculateNameNumber(name) {
    let sum = 0;
    
    for (let char of name.toUpperCase()) {
        if (numerologySystem[char]) {
            sum += numerologySystem[char];
        }
    }
    
    return digitalRoot(sum);
}

// Calculate compatibility score
function calculateCompatibilityScore(score1, score2) {
    const difference = Math.abs(score1 - score2);
    return Math.max(0, 100 - (difference * 10));
}

// Function to store name pair in Firebase
function storeNamePair(name1, name2, compatibilityScore) {
    const namePairRef = ref(database, 'namePairs');
    push(namePairRef, {
        name1: name1,
        name2: name2,
        compatibilityScore: compatibilityScore,
        timestamp: serverTimestamp()
    });
}

// Get personality insights
function getPersonalityInsights(coreNumber) {
    const insight = personalityTraits[coreNumber];
    if (!insight) return "No insights available for this number.";
    
    return `
        <h4>${insight.title}</h4>
        <p><strong>Key Traits:</strong> ${insight.traits}</p>
        <p><strong>Description:</strong> ${insight.description}</p>
        <p><strong>Strengths:</strong> ${insight.strengths}</p>
        <p><strong>Challenges:</strong> ${insight.challenges}</p>
    `;
}

// Get relationship insights
function getRelationshipInsights(core1, core2) {
    const key = [core1, core2].sort().join('-');
    const relationship = relationshipDynamics[key];
    
    if (!relationship) {
        return `
            <h4>Unique Combination</h4>
            <p>This is a unique combination with great potential for growth and learning. 
            Both partners bring different but complementary energies to the relationship.</p>
            <p><strong>Strengths:</strong> Diversity, growth potential, learning opportunities</p>
            <p><strong>Challenges:</strong> Understanding differences, finding common ground</p>
            <p><strong>Advice:</strong> Focus on communication and mutual understanding</p>
        `;
    }
    
    return `
        <h4>${relationship.title}</h4>
        <p><strong>Description:</strong> ${relationship.description}</p>
        <p><strong>Strengths:</strong> ${relationship.strengths}</p>
        <p><strong>Challenges:</strong> ${relationship.challenges}</p>
        <p><strong>Advice:</strong> ${relationship.advice}</p>
    `;
}

// Main calculation function
function calculateCompatibility() {
    const name1 = document.getElementById('name1').value.trim();
    const name2 = document.getElementById('name2').value.trim();

    if (!name1 || !name2) {
        alert('Please enter both names');
        return;
    }

    const core1 = calculateNameNumber(name1);
    const core2 = calculateNameNumber(name2);
    const compatibilityScore = calculateCompatibilityScore(core1, core2);

    // Store the name pair in Firebase
    storeNamePair(name1, name2, compatibilityScore);

    // Display results with score limit message
    document.getElementById('core1').textContent = core1;
    document.getElementById('core2').textContent = core2;
    document.getElementById('score').innerHTML = `
        <div class="score-value">${compatibilityScore}%</div>
        <div class="score-limit">(Maximum possible score: 100%)</div>
    `;

    // Display insights
    document.getElementById('insights1').innerHTML = getPersonalityInsights(core1);
    document.getElementById('insights2').innerHTML = getPersonalityInsights(core2);
    document.getElementById('relationship-insights').innerHTML = getRelationshipInsights(core1, core2);

    // Show results section
    document.querySelector('.results-section').classList.remove('hidden');
    
    // Scroll to results on mobile
    if (window.innerWidth <= 768) {
        document.querySelector('.results-section').scrollIntoView({ behavior: 'smooth' });
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add input validation
    const nameInputs = document.querySelectorAll('input[type="text"]');
    nameInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
        });
    });

    // Add touch feedback for mobile
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
            this.classList.add('active');
        });
        button.addEventListener('touchend', function() {
            this.classList.remove('active');
        });
    });

    document.getElementById('calculate').addEventListener('click', calculateCompatibility);
    
    document.getElementById('reset').addEventListener('click', () => {
        document.getElementById('name1').value = '';
        document.getElementById('name2').value = '';
        document.querySelector('.results-section').classList.add('hidden');
    });
});

// DOM Elements
const name1Input = document.getElementById('name1');
const name2Input = document.getElementById('name2');
const calculateBtn = document.getElementById('calculate');
const resetBtn = document.getElementById('reset');
const resultsSection = document.querySelector('.results-section');
const core1Element = document.getElementById('core1');
const core2Element = document.getElementById('core2');
const scoreElement = document.getElementById('score');
const insights1Element = document.getElementById('insights1');
const insights2Element = document.getElementById('insights2');
const relationshipInsightsElement = document.getElementById('relationship-insights');

// Event Listeners
calculateBtn.addEventListener('click', () => {
    const name1 = name1Input.value.trim();
    const name2 = name2Input.value.trim();

    if (!name1 || !name2) {
        alert('Please enter both names');
        return;
    }

    const core1 = calculateNameNumber(name1);
    const core2 = calculateNameNumber(name2);
    const compatibility = calculateCompatibility(core1, core2);

    // Update UI with enhanced insights
    core1Element.textContent = core1;
    core2Element.textContent = core2;
    scoreElement.textContent = `${compatibility}%`;
    
    // Enhanced personality insights
    const insight1 = personalityTraits[core1];
    const insight2 = personalityTraits[core2];
    insights1Element.innerHTML = `
        <h4>${insight1.title}</h4>
        <p><strong>Key Traits:</strong> ${insight1.traits}</p>
        <p><strong>Description:</strong> ${insight1.description}</p>
        <p><strong>Strengths:</strong> ${insight1.strengths}</p>
        <p><strong>Challenges:</strong> ${insight1.challenges}</p>
    `;
    insights2Element.innerHTML = `
        <h4>${insight2.title}</h4>
        <p><strong>Key Traits:</strong> ${insight2.traits}</p>
        <p><strong>Description:</strong> ${insight2.description}</p>
        <p><strong>Strengths:</strong> ${insight2.strengths}</p>
        <p><strong>Challenges:</strong> ${insight2.challenges}</p>
    `;

    // Enhanced relationship dynamics
    const key = [core1, core2].sort().join('-');
    const relationship = relationshipDynamics[key] || {
        title: "Unique Combination",
        description: "This is a unique combination with great potential for growth and learning. Both partners bring different but complementary energies to the relationship.",
        strengths: "Diversity, growth potential, learning opportunities",
        challenges: "Understanding differences, finding common ground",
        advice: "Focus on communication and mutual understanding"
    };

    relationshipInsightsElement.innerHTML = `
        <h4>${relationship.title}</h4>
        <p><strong>Description:</strong> ${relationship.description}</p>
        <p><strong>Strengths:</strong> ${relationship.strengths}</p>
        <p><strong>Challenges:</strong> ${relationship.challenges}</p>
        <p><strong>Advice:</strong> ${relationship.advice}</p>
    `;

    // Show results
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('visible');
});

resetBtn.addEventListener('click', () => {
    name1Input.value = '';
    name2Input.value = '';
    resultsSection.classList.add('hidden');
    resultsSection.classList.remove('visible');
}); 