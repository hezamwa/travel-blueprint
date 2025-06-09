const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Helper function to add delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const queryAttractionTypesSafe = async () => {
  try {
    console.log('🔍 Querying attractions with rate limiting to avoid quotas...\n');
    
    // Get list of cities first
    const citiesRef = db.collection('cities');
    const citiesSnapshot = await citiesRef.get();
    
    console.log(`📊 Found ${citiesSnapshot.size} cities to process\n`);
    
    // Track type statistics
    const typeArCounts = new Map();
    const typeEnCounts = new Map();
    const typePairs = new Map(); // English -> Arabic mapping
    let hasTypeAr = 0;
    let missingTypeAr = 0;
    let totalAttractions = 0;
    let processedCities = 0;
    
    // Process cities one by one to avoid quota issues
    for (const cityDoc of citiesSnapshot.docs) {
      const cityId = cityDoc.id;
      const cityData = cityDoc.data();
      
      try {
        console.log(`📍 Processing: ${cityData.name || cityId}`);
        
        // Get attractions for this city with small batches
        const attractionsRef = db.collection('cities').doc(cityId).collection('attractions');
        const attractionsSnapshot = await attractionsRef.limit(1000).get();
        
        console.log(`   Found ${attractionsSnapshot.size} attractions`);
        totalAttractions += attractionsSnapshot.size;
        
        attractionsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          
          // Count English types
          if (data.type) {
            typeEnCounts.set(data.type, (typeEnCounts.get(data.type) || 0) + 1);
          }
          
          // Count Arabic types
          if (data.typeAr) {
            typeArCounts.set(data.typeAr, (typeArCounts.get(data.typeAr) || 0) + 1);
            hasTypeAr++;
            
            // Track English -> Arabic pairs
            if (data.type && data.typeAr) {
              typePairs.set(data.type, data.typeAr);
            }
          } else {
            missingTypeAr++;
          }
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
    
    console.log('\n=== SUMMARY ===');
    console.log(`🏙️  Cities processed: ${processedCities}/${citiesSnapshot.size}`);
    console.log(`🎯 Total attractions found: ${totalAttractions}`);
    console.log(`✅ Attractions with Arabic types (typeAr): ${hasTypeAr}`);
    console.log(`❌ Attractions missing Arabic types: ${missingTypeAr}`);
    console.log(`📈 Coverage: ${totalAttractions > 0 ? ((hasTypeAr / totalAttractions) * 100).toFixed(1) : 0}%\n`);
    
    if (typeArCounts.size > 0) {
      console.log('=== TOP 20 ARABIC ATTRACTION TYPES ===');
      const sortedArabicTypes = Array.from(typeArCounts.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20);
      
      sortedArabicTypes.forEach(([typeAr, count], index) => {
        console.log(`${String(index + 1).padStart(2)}. ${typeAr.padEnd(20)} (${count} attractions)`);
      });
    }
    
    if (typeArCounts.size > 0) {
      console.log('\n=== ALL UNIQUE ARABIC TYPES ===');
      const allArabicTypes = Array.from(typeArCounts.keys()).sort();
      console.log(`Total unique Arabic types: ${allArabicTypes.length}\n`);
      
      allArabicTypes.forEach((typeAr, index) => {
        const count = typeArCounts.get(typeAr);
        console.log(`${String(index + 1).padStart(3)}. ${typeAr} (${count})`);
      });
    }
    
    if (typePairs.size > 0) {
      console.log('\n=== ENGLISH → ARABIC TRANSLATIONS ===');
      console.log(`Total translation pairs: ${typePairs.size}\n`);
      
      const sortedPairs = Array.from(typePairs.entries()).sort((a, b) => a[0].localeCompare(b[0]));
      sortedPairs.forEach(([english, arabic], index) => {
        const count = typeEnCounts.get(english) || 0;
        console.log(`${String(index + 1).padStart(3)}. ${english.padEnd(25)} → ${arabic.padEnd(20)} (${count})`);
      });
    }
    
    // Check for missing translations
    console.log('\n=== MISSING ARABIC TRANSLATIONS ===');
    const missingTranslations = [];
    typeEnCounts.forEach((count, englishType) => {
      if (!typePairs.has(englishType)) {
        missingTranslations.push({ type: englishType, count });
      }
    });
    
    if (missingTranslations.length > 0) {
      console.log(`Found ${missingTranslations.length} English types without Arabic translations:\n`);
      missingTranslations
        .sort((a, b) => b.count - a.count)
        .forEach(({ type, count }, index) => {
          console.log(`${String(index + 1).padStart(3)}. ${type.padEnd(30)} (${count} attractions)`);
        });
    } else {
      console.log('✅ All English types have Arabic translations!');
    }
    
    console.log('\n🎉 Query completed successfully!');
    
  } catch (error) {
    console.error('❌ Error querying attraction types:', error);
    
    if (error.message.includes('Quota exceeded')) {
      console.log('\n💡 QUOTA EXCEEDED SOLUTIONS:');
      console.log('1. Wait a few minutes for quota to reset');
      console.log('2. Use Firebase Spark plan for higher quotas');
      console.log('3. Try running the script with fewer cities');
      console.log('4. Contact Firebase support for quota increase');
    }
    
    process.exit(1);
  }
};

// Run the query
queryAttractionTypesSafe()
  .then(() => {
    console.log('\n👋 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }); 