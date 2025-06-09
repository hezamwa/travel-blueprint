const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const exportDescriptions = async () => {
  try {
    console.log('🔄 Starting descriptions export to local JSON...\n');
    
    // Get list of cities first
    const citiesRef = db.collection('cities');
    const citiesSnapshot = await citiesRef.get();
    
    console.log(`📊 Found ${citiesSnapshot.size} cities to process\n`);
    
    const allAttractions = [];
    let totalAttractions = 0;
    let processedCities = 0;
    
    // Process cities one by one to avoid quota issues
    for (const cityDoc of citiesSnapshot.docs) {
      const cityId = cityDoc.id;
      const cityData = cityDoc.data();
      
      try {
        console.log(`📍 Processing: ${cityData.name || cityId}`);
        
        // Get attractions for this city
        const attractionsRef = db.collection('cities').doc(cityId).collection('attractions');
        const attractionsSnapshot = await attractionsRef.get();
        
        console.log(`   Found ${attractionsSnapshot.size} attractions`);
        totalAttractions += attractionsSnapshot.size;
        
        // Extract attraction data
        attractionsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          
          allAttractions.push({
            id: doc.id,
            cityId: cityId,
            cityName: cityData.name || cityId,
            name: data.name || '',
            type: data.type || '',
            typeAr: data.typeAr || '',
            description: data.description || '',
            descriptionAr: data.descriptionAr || '',
            hasEnglishDescription: !!(data.description && data.description.length > 0),
            hasArabicDescription: !!(data.descriptionAr && data.descriptionAr.length > 0),
            hasEnglishType: !!(data.type && data.type.length > 0),
            hasArabicType: !!(data.typeAr && data.typeAr.length > 0),
            descriptionLength: (data.description || '').length,
            descriptionArLength: (data.descriptionAr || '').length,
            continent: cityData.continent || '',
            country: cityData.country || ''
          });
        });
        
        processedCities++;
        
        // Add delay every 10 cities to avoid rate limits
        if (processedCities % 10 === 0) {
          console.log(`   ⏱️  Processed ${processedCities}/${citiesSnapshot.size} cities. Adding delay...`);
          await delay(2000); // 2 second delay
        }
        
      } catch (error) {
        console.error(`   ❌ Error processing city ${cityId}:`, error.message);
        // Continue with next city
      }
    }
    
    // Sort attractions by city, then by name
    allAttractions.sort((a, b) => {
      if (a.cityName !== b.cityName) {
        return a.cityName.localeCompare(b.cityName);
      }
      return a.name.localeCompare(b.name);
    });
    
    // Create summary statistics
    const summary = {
      exportDate: new Date().toISOString(),
      totalCities: processedCities,
      totalAttractions: totalAttractions,
      statistics: {
        withEnglishDescription: allAttractions.filter(a => a.hasEnglishDescription).length,
        withArabicDescription: allAttractions.filter(a => a.hasArabicDescription).length,
        withEnglishType: allAttractions.filter(a => a.hasEnglishType).length,
        withArabicType: allAttractions.filter(a => a.hasArabicType).length,
        emptyDescriptions: allAttractions.filter(a => !a.hasEnglishDescription).length,
        missingArabicDescriptions: allAttractions.filter(a => a.hasEnglishDescription && !a.hasArabicDescription).length
      },
      typeBreakdown: {},
      cityBreakdown: {}
    };
    
    // Calculate type breakdown
    const typeMap = new Map();
    const cityMap = new Map();
    
    allAttractions.forEach(attraction => {
      // Type breakdown
      if (attraction.type) {
        if (!typeMap.has(attraction.type)) {
          typeMap.set(attraction.type, {
            count: 0,
            withArabicType: 0,
            withEnglishDescription: 0,
            withArabicDescription: 0
          });
        }
        const typeStats = typeMap.get(attraction.type);
        typeStats.count++;
        if (attraction.hasArabicType) typeStats.withArabicType++;
        if (attraction.hasEnglishDescription) typeStats.withEnglishDescription++;
        if (attraction.hasArabicDescription) typeStats.withArabicDescription++;
      }
      
      // City breakdown
      if (!cityMap.has(attraction.cityName)) {
        cityMap.set(attraction.cityName, {
          count: 0,
          withArabicDescriptions: 0,
          continent: attraction.continent,
          country: attraction.country
        });
      }
      const cityStats = cityMap.get(attraction.cityName);
      cityStats.count++;
      if (attraction.hasArabicDescription) cityStats.withArabicDescriptions++;
    });
    
    // Convert maps to objects for JSON
    summary.typeBreakdown = Object.fromEntries(typeMap);
    summary.cityBreakdown = Object.fromEntries(cityMap);
    
    // Create the final export object
    const exportData = {
      summary,
      attractions: allAttractions
    };
    
    // Save to JSON file
    const outputPath = path.join(__dirname, 'attractions-dataset.json');
    fs.writeFileSync(outputPath, JSON.stringify(exportData, null, 2), 'utf8');
    
    console.log('\n=== EXPORT COMPLETE ===');
    console.log(`🏙️  Cities processed: ${processedCities}/${citiesSnapshot.size}`);
    console.log(`🎯 Total attractions exported: ${totalAttractions}`);
    console.log(`📁 File saved: ${outputPath}`);
    console.log(`💾 File size: ${(fs.statSync(outputPath).size / 1024 / 1024).toFixed(2)} MB\n`);
    
    console.log('=== DATASET STATISTICS ===');
    console.log(`✅ English descriptions: ${summary.statistics.withEnglishDescription}`);
    console.log(`🔤 Arabic descriptions: ${summary.statistics.withArabicDescription}`);
    console.log(`❌ Missing descriptions: ${summary.statistics.emptyDescriptions}`);
    console.log(`⚠️  Need Arabic translation: ${summary.statistics.missingArabicDescriptions}`);
    console.log(`📊 Description coverage: ${((summary.statistics.withArabicDescription / totalAttractions) * 100).toFixed(1)}%\n`);
    
    console.log('=== TOP 10 ATTRACTION TYPES ===');
    const sortedTypes = Object.entries(summary.typeBreakdown)
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, 10);
    
    sortedTypes.forEach(([type, stats], index) => {
      const arabicCoverage = stats.count > 0 ? ((stats.withArabicDescription / stats.count) * 100).toFixed(1) : 0;
      console.log(`${index + 1}. ${type} (${stats.count}) - ${arabicCoverage}% Arabic descriptions`);
    });
    
    console.log('\n=== SAMPLE ATTRACTIONS ===');
    allAttractions.slice(0, 5).forEach((attraction, index) => {
      console.log(`${index + 1}. ${attraction.name} (${attraction.cityName})`);
      console.log(`   Type: ${attraction.type} ${attraction.typeAr ? `→ ${attraction.typeAr}` : ''}`);
      console.log(`   Description: ${attraction.description.substring(0, 50)}${attraction.description.length > 50 ? '...' : ''}`);
      if (attraction.descriptionAr) {
        console.log(`   Arabic: ${attraction.descriptionAr.substring(0, 50)}${attraction.descriptionAr.length > 50 ? '...' : ''}`);
      }
      console.log('');
    });
    
    console.log('🎉 Dataset export completed successfully!');
    console.log('📋 You can now work with the local JSON file for mapping and analysis.');
    
  } catch (error) {
    console.error('❌ Error exporting descriptions:', error);
    process.exit(1);
  }
};

// Run the export
exportDescriptions()
  .then(() => {
    console.log('\n👋 Export complete!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Export failed:', error);
    process.exit(1);
  }); 