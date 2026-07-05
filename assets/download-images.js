/**
 * KrushiMart Image Downloader
 * 
 * Downloads royalty-free images from Pexels API (free tier).
 * Get your free API key at: https://www.pexels.com/api/
 * 
 * Usage:
 *   1. Get free Pexels API key
 *   2. Set environment variable: set PEXELS_API_KEY=your_key_here
 *   3. Run: node download-images.js
 * 
 * If no API key is set, uses placeholder images from picsum.photos
 */

const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');

const PEXELS_API_KEY = process.env.PEXELS_API_KEY || '';

const ASSETS_DIR = __dirname;

// Image requirements
const CATEGORIES = {
  farmers: {
    count: 10, // Reduced for practical demo
    searches: ['indian farmer portrait', 'indian woman farmer', 'indian agriculture worker'],
    prefix: 'farmer'
  },
  vegetables: {
    items: [
      'tomato', 'potato', 'onion', 'carrot', 'cabbage',
      'cauliflower', 'brinjal', 'capsicum', 'beans', 'peas',
      'spinach', 'pumpkin', 'bottle gourd', 'bitter gourd', 'lady finger',
      'radish', 'beetroot', 'cucumber', 'chilli', 'garlic'
    ],
    count: 3, // Images per vegetable
    prefix: ''
  },
  fruits: {
    items: [
      'apple', 'banana', 'orange', 'mango', 'pomegranate',
      'papaya', 'guava', 'watermelon', 'pineapple', 'grapes',
      'strawberry', 'kiwi', 'sapota', 'jackfruit', 'lemon'
    ],
    count: 3,
    prefix: ''
  },
  grains: {
    items: [
      'rice', 'wheat', 'maize', 'millets', 'ragi',
      'jowar', 'bajra', 'barley', 'oats', 'pulses'
    ],
    count: 3,
    prefix: ''
  },
  dairy: {
    items: [
      'milk', 'curd', 'butter', 'paneer', 'cheese',
      'ghee', 'cream', 'yogurt'
    ],
    count: 3,
    prefix: ''
  },
  spices: {
    items: [
      'turmeric', 'pepper', 'cardamom', 'clove', 'cinnamon',
      'coriander', 'jeera', 'mustard', 'red chilli'
    ],
    count: 3,
    prefix: ''
  }
};

// Helper to download file
function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    const protocol = url.startsWith('https') ? https : http;
    const file = fs.createWriteStream(filepath);
    
    protocol.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        // Follow redirect
        downloadFile(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
}

// Search Pexels for images
async function searchPexels(query, perPage = 5) {
  if (!PEXELS_API_KEY) {
    // Return placeholder URLs from picsum
    const results = [];
    for (let i = 0; i < perPage; i++) {
      const seed = query.replace(/\s/g, '') + i;
      results.push(`https://picsum.photos/seed/${seed}/800/600`);
    }
    return results;
  }

  return new Promise((resolve, reject) => {
    const encodedQuery = encodeURIComponent(query);
    const url = `https://api.pexels.com/v1/search?query=${encodedQuery}&per_page=${perPage}&orientation=landscape`;
    
    https.get(url, {
      headers: { Authorization: PEXELS_API_KEY }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const photos = json.photos || [];
          resolve(photos.map(p => p.src.large));
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Download images for a category
async function downloadCategory(category, config) {
  const categoryDir = path.join(ASSETS_DIR, category);
  fs.mkdirSync(categoryDir, { recursive: true });
  
  const downloaded = [];
  
  if (config.items) {
    // Download images for each item
    for (const item of config.items) {
      console.log(`  Downloading ${item}...`);
      const searchQuery = `${item} food photography`;
      
      try {
        const urls = await searchPexels(searchQuery, config.count);
        
        for (let i = 0; i < Math.min(urls.length, config.count); i++) {
          const filename = `${item}${String(i + 1).padStart(2, '0')}.jpg`;
          const filepath = path.join(categoryDir, filename);
          
          if (!fs.existsSync(filepath)) {
            await downloadFile(urls[i], filepath);
            downloaded.push({
              name: item.charAt(0).toUpperCase() + item.slice(1),
              category: category,
              filename: filename,
              path: `assets/${category}/${filename}`
            });
            console.log(`    ✓ ${filename}`);
          }
        }
        
        // Small delay to be nice to API
        await new Promise(r => setTimeout(r, 200));
      } catch (err) {
        console.error(`    ✗ Error downloading ${item}: ${err.message}`);
      }
    }
  } else {
    // Download general images for category
    console.log(`  Downloading ${category}...`);
    const searchQueries = config.searches || [category];
    
    for (let i = 0; i < config.count; i++) {
      const query = searchQueries[i % searchQueries.length];
      const filename = `${config.prefix}${String(i + 1).padStart(3, '0')}.jpg`;
      const filepath = path.join(categoryDir, filename);
      
      if (!fs.existsSync(filepath)) {
        try {
          const urls = await searchPexels(query, 1);
          if (urls.length > 0) {
            await downloadFile(urls[0], filepath);
            downloaded.push({
              name: `${config.prefix.charAt(0).toUpperCase() + config.prefix.slice(1)} ${i + 1}`,
              category: category,
              filename: filename,
              path: `assets/${category}/${filename}`
            });
            console.log(`    ✓ ${filename}`);
          }
        } catch (err) {
          console.error(`    ✗ Error: ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 200));
      }
    }
  }
  
  return downloaded;
}

// Main function
async function main() {
  console.log('=== KrushiMart Image Downloader ===\n');
  
  if (!PEXELS_API_KEY) {
    console.log('No PEXELS_API_KEY found. Using placeholder images from picsum.photos.');
    console.log('For better results, get a free API key at: https://www.pexels.com/api/\n');
  } else {
    console.log('Using Pexels API with provided key.\n');
  }
  
  const allMetadata = [];
  let id = 1;
  
  for (const [category, config] of Object.entries(CATEGORIES)) {
    console.log(`\nProcessing ${category}...`);
    const items = await downloadCategory(category, config);
    
    for (const item of items) {
      allMetadata.push({
        id: id++,
        name: item.name,
        category: item.category,
        image: item.path
      });
    }
  }
  
  // Write metadata.json
  const metadataPath = path.join(ASSETS_DIR, 'metadata.json');
  fs.writeFileSync(metadataPath, JSON.stringify(allMetadata, null, 2));
  console.log(`\n✓ Metadata saved to ${metadataPath}`);
  console.log(`✓ Total images: ${allMetadata.length}`);
  console.log('\nDone!');
}

main().catch(console.error);
