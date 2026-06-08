import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DB_PATH = path.join(__dirname, 'troubleshooting.json');

// Color helpers for console output
const colors = {
    reset: "\x1b[0m",
    bright: "\x1b[1m",
    dim: "\x1b[2m",
    underline: "\x1b[4m",
    fg: {
        red: "\x1b[31m",
        green: "\x1b[32m",
        yellow: "\x1b[33m",
        blue: "\x1b[34m",
        magenta: "\x1b[35m",
        cyan: "\x1b[36m",
        white: "\x1b[37m",
        gray: "\x1b[90m"
    },
    bg: {
        red: "\x1b[41m",
        green: "\x1b[42m",
        yellow: "\x1b[43m",
        blue: "\x1b[44m"
    }
};

function printUsage() {
    console.log(`
${colors.bright}${colors.fg.cyan}Puter.js KB Spy - Troubleshooting Search Utility${colors.reset}
===================================================
Query the local troubleshooting database of 1000+ issues.

${colors.bright}Usage:${colors.reset}
  node search.js <query_string> [options]
  node search.js --area <area_name>
  node search.js --framework <framework_name>

${colors.bright}Options:${colors.reset}
  --area, -a       Filter by troubleshooting area:
                     - credit_limits
                     - popup_blockers
                     - secure_context
                     - node_vm_sandboxing
                     - openai_compatibility
                     - cors_coop_coep
  --framework, -f  Filter by framework (e.g. React, Next.js, Node.js, Vite, etc.)
  --browser, -b    Filter by browser or runtime (e.g. Chrome, Firefox, Safari, Node.js VM, etc.)
  --limit, -l      Limit results output count (default: 5)
  --help, -h       Show this help message

${colors.bright}Examples:${colors.reset}
  node search.js "HTTP 402"
  node search.js "popup blocked" --browser Chrome
  node search.js --area secure_context --limit 3
`);
}

// Parse command line arguments
const args = process.argv.slice(2);

if (args.includes('--help') || args.includes('-h') || (args.length === 0 && process.stdin.isTTY)) {
    printUsage();
    process.exit(0);
}

// Load database
if (!fs.existsSync(DB_PATH)) {
    console.error(`${colors.fg.red}Error: Troubleshooting database not found at ${DB_PATH}.${colors.reset}`);
    console.error(`Please run the crawlers_and_generators.py crawler script first to build the database.`);
    process.exit(1);
}

let db = [];
try {
    const rawData = fs.readFileSync(DB_PATH, 'utf8');
    db = JSON.parse(rawData);
} catch (error) {
    console.error(`${colors.fg.red}Error parsing database JSON: ${error.message}${colors.reset}`);
    process.exit(1);
}

// Build query parameters
let query = "";
let areaFilter = null;
let frameworkFilter = null;
let browserFilter = null;
let limit = 5;

for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg === '--area' || arg === '-a') {
        areaFilter = args[++i];
    } else if (arg === '--framework' || arg === '-f') {
        frameworkFilter = args[++i];
    } else if (arg === '--browser' || arg === '-b') {
        browserFilter = args[++i];
    } else if (arg === '--limit' || arg === '-l') {
        limit = parseInt(args[++i], 10) || 5;
    } else if (arg.startsWith('-')) {
        console.error(`${colors.fg.red}Unknown option: ${arg}${colors.reset}`);
        printUsage();
        process.exit(1);
    } else {
        query = arg;
    }
}

// Perform search
const results = db.filter(entry => {
    // 1. Text Query Filter (if specified)
    if (query) {
        const queryLower = query.toLowerCase();
        const matchTitle = entry.title.toLowerCase().includes(queryLower);
        const matchCause = entry.root_cause.toLowerCase().includes(queryLower);
        const matchSolution = entry.solution.toLowerCase().includes(queryLower);
        const matchErrorCode = entry.error_code.toLowerCase().includes(queryLower);
        const matchTags = entry.tags.some(tag => tag.toLowerCase().includes(queryLower));
        
        if (!matchTitle && !matchCause && !matchSolution && !matchErrorCode && !matchTags) {
            return false;
        }
    }
    
    // 2. Area Filter
    if (areaFilter) {
        if (entry.area.toLowerCase() !== areaFilter.toLowerCase()) {
            return false;
        }
    }
    
    // 3. Framework Filter
    if (frameworkFilter) {
        if (!entry.framework.toLowerCase().includes(frameworkFilter.toLowerCase())) {
            return false;
        }
    }
    
    // 4. Browser Filter
    if (browserFilter) {
        if (!entry.browser.toLowerCase().includes(browserFilter.toLowerCase())) {
            return false;
        }
    }
    
    return true;
});

// Output results
console.log(`\n${colors.bright}${colors.fg.green}Search completed. Found ${results.length} matching entries (showing top ${Math.min(limit, results.length)}).${colors.reset}\n`);

results.slice(0, limit).forEach((entry, index) => {
    console.log(`${colors.bright}${colors.fg.cyan}[${index + 1}] ${entry.title} (${entry.id})${colors.reset}`);
    console.log(`${colors.dim}------------------------------------------------------------${colors.reset}`);
    console.log(`${colors.bright}${colors.fg.yellow}Area:${colors.reset}       ${entry.area}`);
    console.log(`${colors.bright}${colors.fg.yellow}Code/Error:${colors.reset} ${colors.fg.red}${entry.error_code}${colors.reset}`);
    console.log(`${colors.bright}${colors.fg.yellow}Environment:${colors.reset} ${entry.framework} | ${entry.browser}`);
    console.log(`${colors.bright}${colors.fg.yellow}Severity:${colors.reset}    ${entry.severity}`);
    console.log(`${colors.bright}${colors.fg.yellow}Tags:${colors.reset}        ${entry.tags.join(', ')}`);
    console.log();
    
    console.log(`${colors.bright}${colors.fg.magenta}Symptoms:${colors.reset}`);
    entry.symptoms.forEach(symptom => {
        console.log(`  * ${symptom}`);
    });
    console.log();
    
    console.log(`${colors.bright}${colors.fg.magenta}Root Cause:${colors.reset}`);
    console.log(`  ${entry.root_cause}`);
    console.log();
    
    console.log(`${colors.bright}${colors.fg.green}Workable Solution:${colors.reset}`);
    // Indent code snippets and lines inside solutions
    const indentedSolution = entry.solution.split('\n').map(line => `  ${line}`).join('\n');
    console.log(indentedSolution);
    console.log(`\n${colors.dim}============================================================${colors.reset}\n`);
});

if (results.length > limit) {
    console.log(`${colors.dim}... and ${results.length - limit} more entries match. Refine your query or increase --limit.${colors.reset}\n`);
}
