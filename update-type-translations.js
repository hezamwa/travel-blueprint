const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Comprehensive Arabic translations for attraction types
const attractionTypeTranslations = {
  'Museum': 'متحف',
  'Cathedral': 'كاتدرائية',
  'Church': 'كنيسة', 
  'Mosque': 'مسجد',
  'Palace': 'قصر',
  'Tower': 'برج',
  'Bridge': 'جسر',
  'Market': 'سوق',
  'Garden': 'حديقة',
  'Park': 'متنزه',
  'Beach': 'شاطئ',
  'Castle': 'قلعة',
  'Temple': 'معبد',
  'Monument': 'نصب تذكاري',
  'Plaza': 'ساحة',
  'Square': 'ميدان',
  'Gallery': 'معرض',
  'Theater': 'مسرح',
  'Theatre': 'مسرح',
  'Opera House': 'دار الأوبرا',
  'Basilica': 'بازيليكا',
  'Sanctuary': 'ملاذ',
  'Shrine': 'ضريح',
  'Fortress': 'حصن',
  'Archaeological Site': 'موقع أثري',
  'Stadium': 'استاد - ملعب',
  'Library': 'مكتبة',
  'University': 'جامعة',
  'Observatory': 'مرصد',
  'Aquarium': 'أكواريوم',
  'Zoo': 'حديقة حيوان',
  'Shopping Center': 'مركز تسوق',
  'Street': 'شارع',
  'Avenue': 'جادة',
  'Boulevard': 'شارع كبير',
  'Promenade': 'كورنيش',
  'Waterfront': 'واجهة بحرية',
  'Harbor': 'ميناء',
  'Port': 'مرفأ',
  'Lighthouse': 'منارة',
  'Island': 'جزيرة',
  'Lake': 'بحيرة',
  'River': 'نهر',
  'Valley': 'وادي',
  'Mountain': 'جبل',
  'Hill': 'تل',
  'Cliff': 'جرف',
  'Viewpoint': 'نقطة مشاهدة',
  'Lookout': 'مطل',
  'Building': 'مبنى',
  'Architecture': 'عمارة',
  'Historic Site': 'موقع تاريخي',
  'Religious Site': 'موقع ديني',
  'Natural Site': 'موقع طبيعي',
  'Cultural Site': 'موقع ثقافي',
  'Entertainment': 'ترفيه',
  'Recreation': 'استجمام',
  'Sports': 'رياضة',
  'Education': 'تعليم',
  'Transportation': 'نقل',
  'Commercial': 'تجاري',
  'Residential': 'سكني',
  'Government': 'حكومي',
  'Military': 'عسكري',
  'Industrial': 'صناعي',
  'Art': 'فن',
  'Science': 'علوم',
  'Nature': 'طبيعة',
  'Water': 'مياه',
  'Food': 'طعام',
  'Shopping': 'تسوق',
  'Hotel': 'فندق',
  'Restaurant': 'مطعم',
  'Cafe': 'مقهى',
  'Bar': 'بار',
  'Club': 'نادي',
  'Store': 'متجر',
  'Shop': 'محل',
  'Mall': 'مول',
  'Cinema': 'سينما',
  'Concert Hall': 'قاعة حفلات',
  'Convention Center': 'مركز مؤتمرات',
  'Exhibition': 'معرض',
  'Fair': 'معرض',
  'Festival': 'مهرجان',
  'Event': 'حدث',
  'Statue': 'تمثال',
  'Sculpture': 'منحوتة',
  'Fountain': 'نافورة',
  'Memorial': 'نصب تذكاري',
  'Cemetery': 'مقبرة',
  'Synagogue': 'كنيس',
  'Convent': 'دير',
  'Monastery': 'دير',
  'Abbey': 'دير',
  'Chapel': 'كنيسة صغيرة',
  'Forum': 'منتدى',
  'Amphitheater': 'مدرج',
  'Colosseum': 'كولوسيوم',
  'Arena': 'ساحة',
  'Ruins': 'أطلال',
  'Wall': 'جدار',
  'Gate': 'بوابة',
  'Arch': 'قوس',
  'Dome': 'قبة',
  'Spire': 'برج',
  'Minaret': 'مئذنة',
  'Obelisk': 'مسلة',
  'Column': 'عمود',
  'Pillar': 'عمود',
  'activity':'أنشطة',
'Activity':'أنشطة',
 'Attraction':'أنشطة',
'historical':'موقع تاريخي',
'Historical Area':'موقع تاريخي',
'historical landmark':'معلم تاريخي',
'Historical Landmark':'معلم تاريخي',
'Historical Place':'موقع تاريخي',
'historical sites':'موقع تاريخي',
'Landmark':'معلم',
'marina':'بحري',
'Marina':'بحري',
'Memorial':'معلم',
'Modern Area':'منطقة حديثة',
'Modern Landmark':'معلم حديث',
'Scenic Area':'منظر خلاب',
'Scenic Landmark':'معلم خلاب',
'Scenic Place':'موقع خلاب',
'Scenic Site':'موقع خلاب',
'Scenic Viewpoint':'نقطة مشاهدة خلابة',
'Scenic Lookout':'مطل خلاب',
'Scenic Building':'مبنى خلاب',
'Scenic':'منظر خلاب',
'Scenic View':'منظر خلاب',
'Scenic Look':'منظر خلاب',
'Scenic Building':'منظر خلاب',
'Scenic Place':'منظر خلاب',
'Scenic Site':'منظر خلاب',
'Educational':'تعليمي',
'Educational Institution':'منشأة تعليمية',
'sport':'رياضي',
'Sport':'رياضي',
'Waterway':'طريق مائي'
};

// Advanced function to get Arabic translation with fuzzy matching
const getArabicType = (englishType) => {
  if (!englishType || typeof englishType !== 'string') {
    return 'معلم سياحي'; // Default: tourist attraction
  }

  const originalType = englishType.trim();
  
  // Direct exact match
  if (attractionTypeTranslations[originalType]) {
    return attractionTypeTranslations[originalType];
  }
  
  // Case-insensitive exact match
  const lowerType = originalType.toLowerCase();
  for (const [key, value] of Object.entries(attractionTypeTranslations)) {
    if (key.toLowerCase() === lowerType) {
      return value;
    }
  }
  
  // Handle plurals by removing 's' or 'es'
  const singularAttempts = [
    lowerType.replace(/ies$/, 'y'), // galleries -> gallery
    lowerType.replace(/es$/, ''),   // churches -> church
    lowerType.replace(/s$/, '')     // museums -> museum
  ];
  
  for (const singular of singularAttempts) {
    for (const [key, value] of Object.entries(attractionTypeTranslations)) {
      if (key.toLowerCase() === singular) {
        return value;
      }
    }
  }
  
  // Partial word matching for compound types
  const typeWords = originalType.toLowerCase().split(/[\s\-_]+/);
  for (const word of typeWords) {
    if (word.length < 3) continue; // Skip short words
    
    for (const [key, value] of Object.entries(attractionTypeTranslations)) {
      const keyWords = key.toLowerCase().split(/[\s\-_]+/);
      if (keyWords.includes(word)) {
        return value;
      }
    }
  }
  
  // Pattern matching for common keywords
  const patterns = [
    { keywords: ['museum', 'musee', 'museo'], arabic: 'متحف' },
    { keywords: ['church', 'église', 'iglesia', 'kirk'], arabic: 'كنيسة' },
    { keywords: ['mosque', 'masjid', 'mosquée'], arabic: 'مسجد' },
    { keywords: ['palace', 'palais', 'palacio', 'palazzo'], arabic: 'قصر' },
    { keywords: ['castle', 'château', 'castillo', 'castello'], arabic: 'قلعة' },
    { keywords: ['tower', 'tour', 'torre', 'turm'], arabic: 'برج' },
    { keywords: ['bridge', 'pont', 'puente', 'ponte'], arabic: 'جسر' },
    { keywords: ['market', 'marché', 'mercado', 'mercato'], arabic: 'سوق' },
    { keywords: ['garden', 'jardin', 'jardín', 'giardino'], arabic: 'حديقة' },
    { keywords: ['park', 'parc', 'parque', 'parco'], arabic: 'متنزه' },
    { keywords: ['beach', 'plage', 'playa', 'spiaggia'], arabic: 'شاطئ' },
    { keywords: ['temple', 'templo', 'tempio'], arabic: 'معبد' },
    { keywords: ['square', 'place', 'plaza', 'piazza'], arabic: 'ميدان' },
    { keywords: ['gallery', 'galerie', 'galería', 'galleria'], arabic: 'معرض' },
    { keywords: ['theater', 'theatre', 'théâtre', 'teatro'], arabic: 'مسرح' },
    { keywords: ['statue', 'estatua', 'statua'], arabic: 'تمثال' },
    { keywords: ['fountain', 'fontaine', 'fuente', 'fontana'], arabic: 'نافورة' },
    { keywords: ['monument', 'monumento'], arabic: 'نصب تذكاري' }
  ];
  
  const lowerOriginal = originalType.toLowerCase();
  for (const pattern of patterns) {
    if (pattern.keywords.some(keyword => lowerOriginal.includes(keyword))) {
      return pattern.arabic;
    }
  }
  
  // If no translation found, keep original and log it
  console.log(`  ⚠️  No Arabic translation found for: "${originalType}"`);
  return originalType;
};

const updateTypeTranslations = async () => {
  try {
    console.log('🔄 Starting typeAr update based on type values...');
    console.log(`📚 Loaded ${Object.keys(attractionTypeTranslations).length} translation mappings\n`);
    
    // Query all attractions using collectionGroup
    const attractionsRef = admin.firestore().collectionGroup('attractions');
    const snapshot = await attractionsRef.get();
    
    console.log(`📊 Found ${snapshot.size} total attractions to process\n`);
    
    // Statistics tracking
    let processed = 0;
    let updated = 0;
    let unchanged = 0;
    let errors = 0;
    const translationStats = new Map();
    const untranslatedTypes = new Set();
    
    // Process in batches to avoid memory issues
    const batchSize = 500;
    const batches = [];
    
    for (let i = 0; i < snapshot.docs.length; i += batchSize) {
      const batchDocs = snapshot.docs.slice(i, i + batchSize);
      batches.push(batchDocs);
    }
    
    console.log(`🔄 Processing ${batches.length} batches of up to ${batchSize} documents each\n`);
    
    for (let batchIndex = 0; batchIndex < batches.length; batchIndex++) {
      const batchDocs = batches[batchIndex];
      const batch = db.batch();
      let batchUpdates = 0;
      
      console.log(`📦 Processing batch ${batchIndex + 1}/${batches.length} (${batchDocs.length} documents)`);
      
      for (const doc of batchDocs) {
        try {
          const data = doc.data();
          processed++;
          
          if (!data.type) {
            console.log(`  ⚠️  Document ${doc.id} has no 'type' field`);
            continue;
          }
          
          const currentTypeAr = data.typeAr;
          const newTypeAr = getArabicType(data.type);
          
          // Track translation statistics
          if (newTypeAr !== data.type) {
            translationStats.set(data.type, (translationStats.get(data.type) || 0) + 1);
          } else {
            untranslatedTypes.add(data.type);
          }
          
          // Only update if the translation has changed
          if (currentTypeAr !== newTypeAr) {
            batch.update(doc.ref, {
              typeAr: newTypeAr,
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            batchUpdates++;
            updated++;
            
            // Log first few updates for verification
            if (updated <= 5) {
              console.log(`  ✅ "${data.name || 'Unknown'}" | "${data.type}" → "${newTypeAr}"`);
            }
          } else {
            unchanged++;
          }
          
        } catch (error) {
          console.error(`  ❌ Error processing document ${doc.id}:`, error.message);
          errors++;
        }
      }
      
      // Commit the batch if there are updates
      if (batchUpdates > 0) {
        await batch.commit();
        console.log(`  ✅ Committed ${batchUpdates} updates in batch ${batchIndex + 1}`);
      } else {
        console.log(`  ℹ️  No updates needed in batch ${batchIndex + 1}`);
      }
      
      // Progress update
      const progressPercent = (((batchIndex + 1) / batches.length) * 100).toFixed(1);
      console.log(`  📈 Progress: ${progressPercent}% (${processed}/${snapshot.size} processed)\n`);
    }
    
    // Final statistics
    console.log('=== UPDATE COMPLETE ===');
    console.log(`🎯 Total attractions processed: ${processed}`);
    console.log(`✅ Attractions updated: ${updated}`);
    console.log(`➡️  Attractions unchanged: ${unchanged}`);
    console.log(`❌ Errors encountered: ${errors}`);
    console.log(`📊 Success rate: ${((updated / processed) * 100).toFixed(1)}%\n`);
    
    // Translation statistics
    console.log('=== TRANSLATION STATISTICS ===');
    console.log(`🔤 Successfully translated types: ${translationStats.size}`);
    console.log(`⚠️  Untranslated types: ${untranslatedTypes.size}\n`);
    
    if (translationStats.size > 0) {
      console.log('📈 Top 10 translated types:');
      const sortedTranslations = Array.from(translationStats.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
      
      sortedTranslations.forEach(([type, count], index) => {
        const arabic = getArabicType(type);
        console.log(`  ${index + 1}. ${type} → ${arabic} (${count} attractions)`);
      });
    }
    
    if (untranslatedTypes.size > 0) {
      console.log('\n⚠️  Types that need manual translation:');
      Array.from(untranslatedTypes).sort().forEach((type, index) => {
        console.log(`  ${index + 1}. "${type}"`);
      });
    }
    
    console.log('\n🚀 Translation update completed successfully!');
    
  } catch (error) {
    console.error('💥 Error updating type translations:', error);
    process.exit(1);
  }
};

// Run the update
updateTypeTranslations()
  .then(() => {
    console.log('\n👋 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }); 