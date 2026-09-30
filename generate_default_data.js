// Script to generate defaultData.ts from cleaned JSON
const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, 'cleaned_data.json');
const outPath = path.join(__dirname, 'lib', 'defaultData.ts');

let jsonStr = fs.readFileSync(jsonPath, 'utf8');
// Remove BOM if present
if (jsonStr.charCodeAt(0) === 0xFEFF) jsonStr = jsonStr.slice(1);
const data = JSON.parse(jsonStr);

// Read existing file to preserve interfaces
const existingContent = fs.readFileSync(outPath, 'utf8');

// Extract everything before "export const DEFAULT_SITE_DATA"
const interfaceMatch = existingContent.match(/([\s\S]*?)export\s+const\s+DEFAULT_SITE_DATA/);
const interfaceSection = interfaceMatch ? interfaceMatch[1] : '';

// Format the data as pretty-printed JSON for TypeScript
const formattedData = JSON.stringify(data, null, 2);

const output = `${interfaceSection}export const DEFAULT_SITE_DATA: SiteData = ${formattedData};\n`;

fs.writeFileSync(outPath, output, 'utf8');
console.log('defaultData.ts updated successfully!');
console.log(`File size: ${output.length} bytes`);
