const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const sampleQuery = async () => {
  try {
    console.log('🔍 Sample query - checking first few attractions...\n');
    
    // Get first 5 cities
    const citiesRef = db.collection('cities');
    const citiesSnapshot = await citiesRef.limit(5).get();
    
    console.log(`📊 Sampling ${citiesSnapshot.size} cities\n`);
    
    let sampleCount = 0;
    const samples = [];
    
    for (const cityDoc of citiesSnapshot.docs) {
      const cityData = cityDoc.data();
      console.log(`📍 Checking: ${cityData.name || cityDoc.id}`);
      
      // Get first 3 attractions from this city
      const attractionsRef = db.collection('cities').doc(cityDoc.id).collection('attractions');
      const attractionsSnapshot = await attractionsRef.limit(3).get();
      
      attractionsSnapshot.docs.forEach(doc => {
        const data = doc.data();
        samples.push({
          city: cityData.name || cityDoc.id,
          name: data.name,
          type: data.type,
          typeAr: data.typeAr,
          hasDescription: !!data.description,
          hasDescriptionAr: !!data.descriptionAr
        });
        sampleCount++;
      });
      
      console.log(`   Found ${attractionsSnapshot.size} attractions`);
    }
    
    console.log('\n=== SAMPLE RESULTS ===');
    console.log(`📊 Total sample size: ${sampleCount} attractions\n`);
    
    samples.forEach((sample, index) => {
      console.log(`${index + 1}. ${sample.name} (${sample.city})`);
      console.log(`   Type: ${sample.type} ${sample.typeAr ? `→ ${sample.typeAr}` : '(no Arabic)'}`);
      console.log(`   Description: ${sample.hasDescription ? 'EN ✅' : 'EN ❌'} ${sample.hasDescriptionAr ? 'AR ✅' : 'AR ❌'}`);
      console.log('');
    });
    
    // Summary stats
    const withTypeAr = samples.filter(s => s.typeAr).length;
    const withDescAr = samples.filter(s => s.hasDescriptionAr).length;
    
    console.log('=== SAMPLE STATISTICS ===');
    console.log(`🔤 Arabic types: ${withTypeAr}/${sampleCount} (${((withTypeAr/sampleCount)*100).toFixed(1)}%)`);
    console.log(`📝 Arabic descriptions: ${withDescAr}/${sampleCount} (${((withDescAr/sampleCount)*100).toFixed(1)}%)`);
    
    console.log('\n✅ Sample query completed successfully!');
    
  } catch (error) {
    console.error('❌ Error in sample query:', error);
    process.exit(1);
  }
};

// Run the sample query
sampleQuery()
  .then(() => {
    console.log('\n👋 Sample done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Sample failed:', error);
    process.exit(1);
  }); 