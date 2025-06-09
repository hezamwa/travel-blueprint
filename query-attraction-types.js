const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const queryAttractionTypes = async () => {
  try {
    console.log('🔍 Querying all attractions to get Arabic types...\n');
    
    // Use collectionGroup to query all attractions across all cities
    const attractionsRef = admin.firestore().collectionGroup('attractions');
    const snapshot = await attractionsRef.get();
    
    console.log(`📊 Found ${snapshot.size} total attractions\n`);
    
    // Track type statistics
    const typeArCounts = new Map();
    const typeEnCounts = new Map();
    const typePairs = new Map(); // English -> Arabic mapping
    let hasTypeAr = 0;
    let missingTypeAr = 0;
    
    snapshot.docs.forEach(doc => {
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
    
    console.log('=== SUMMARY ===');
    console.log(`✅ Attractions with Arabic types (typeAr): ${hasTypeAr}`);
    console.log(`❌ Attractions missing Arabic types: ${missingTypeAr}`);
    console.log(`📈 Coverage: ${((hasTypeAr / snapshot.size) * 100).toFixed(1)}%\n`);
    
    console.log('=== TOP 20 ARABIC ATTRACTION TYPES ===');
    const sortedArabicTypes = Array.from(typeArCounts.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);
    
    sortedArabicTypes.forEach(([typeAr, count], index) => {
      console.log(`${String(index + 1).padStart(2)}. ${typeAr.padEnd(20)} (${count} attractions)`);
    });
    
    console.log('\n=== ALL UNIQUE ARABIC TYPES ===');
    const allArabicTypes = Array.from(typeArCounts.keys()).sort();
    console.log(`Total unique Arabic types: ${allArabicTypes.length}\n`);
    
    allArabicTypes.forEach((typeAr, index) => {
      const count = typeArCounts.get(typeAr);
      console.log(`${String(index + 1).padStart(3)}. ${typeAr} (${count})`);
    });
    
    console.log('\n=== ENGLISH → ARABIC TRANSLATIONS ===');
    console.log(`Total translation pairs: ${typePairs.size}\n`);
    
    const sortedPairs = Array.from(typePairs.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    sortedPairs.forEach(([english, arabic], index) => {
      const count = typeEnCounts.get(english) || 0;
      console.log(`${String(index + 1).padStart(3)}. ${english.padEnd(25)} → ${arabic.padEnd(20)} (${count})`);
    });
    
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
    process.exit(1);
  }
};

// Run the query
queryAttractionTypes()
  .then(() => {
    console.log('\n👋 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }); 