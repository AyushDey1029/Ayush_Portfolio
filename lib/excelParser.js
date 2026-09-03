import * as xlsx from 'xlsx';
import path from 'path';
import fs from 'fs';

export async function getPortfolioData() {
  const filePath = path.join(process.cwd(), 'portfolio_data.xlsx');
  
  try {
    const buffer = fs.readFileSync(filePath);
    const workbook = xlsx.read(buffer, { type: 'buffer' });
    const data = {};

    workbook.SheetNames.forEach(sheetName => {
      const sheet = workbook.Sheets[sheetName];
      const rawJson = xlsx.utils.sheet_to_json(sheet);
      
      // Process specific sheets based on rules
      data[sheetName] = rawJson.map(row => {
        const processedRow = { ...row };
        
        // Rule 5: Convert semicolon-separated values into arrays
        ['Stack', 'FocusAreas', 'Coursework'].forEach(field => {
          if (processedRow[field]) {
            processedRow[field] = processedRow[field].split(';').map(item => item.trim()).filter(Boolean);
          } else if (field in processedRow || sheetName === 'Projects' || sheetName === 'Education') {
             // ensure array even if empty, if it's a known field
             processedRow[field] = [];
          }
        });

        // Rule 6: Parse the Description field into separate description and learning sections
        if (processedRow.Description) {
          const descText = processedRow.Description;
          const sections = { description: [], learning: [] };
          
          let currentSection = 'description';
          
          if (descText.includes('description:') || descText.includes('learning:')) {
            const parts = descText.split(/(description:|learning:)/i);
            
            for (let i = 0; i < parts.length; i++) {
              const part = parts[i].trim();
              if (part.toLowerCase() === 'description:') {
                currentSection = 'description';
              } else if (part.toLowerCase() === 'learning:') {
                currentSection = 'learning';
              } else if (part) {
                // Split by comma for multiple points
                sections[currentSection] = part.split(',').map(item => item.trim()).filter(Boolean);
              }
            }
          } else {
             // Fallback if no prefixes
             sections.description = descText.split(',').map(item => item.trim()).filter(Boolean);
          }
          
          processedRow.ParsedDescription = sections;
        }

        // Skills specific handling (comma separated)
        if (sheetName === 'Skills' && processedRow.Items) {
          processedRow.ItemsList = processedRow.Items.split(',').map(item => item.trim()).filter(Boolean);
        }

        return processedRow;
      });
    });

    return data;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return {};
  }
}
