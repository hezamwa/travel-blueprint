const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Arabic translations for attraction types (comprehensive list)
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
  'Opera House': 'دار الأوبرا',
  'Basilica': 'بازيليكا',
  'Sanctuary': 'ملاذ',
  'Shrine': 'ضريح',
  'Fortress': 'حصن',
  'Archaeological Site': 'موقع أثري',
  'Stadium': 'استاد',
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
  
  // Additional common attraction types
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
  'Event': 'حدث'
};

// Function to get Arabic translation with better matching
const getArabicType = (englishType) => {
  if (!englishType) return 'معلم سياحي'; // Default: tourist attraction
  
  // Direct match
  if (attractionTypeTranslations[englishType]) {
    return attractionTypeTranslations[englishType];
  }
  
  // Try case-insensitive match
  const lowerType = englishType.toLowerCase();
  for (const [key, value] of Object.entries(attractionTypeTranslations)) {
    if (key.toLowerCase() === lowerType) {
      return value;
    }
  }
  
  // Try partial match for compound types
  const typeWords = englishType.split(' ');
  for (const word of typeWords) {
    for (const [key, value] of Object.entries(attractionTypeTranslations)) {
      if (key.toLowerCase().includes(word.toLowerCase()) || word.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }
  }
  
  // Return a generic Arabic translation based on common patterns
  if (englishType.toLowerCase().includes('museum')) return 'متحف';
  if (englishType.toLowerCase().includes('church')) return 'كنيسة';
  if (englishType.toLowerCase().includes('mosque')) return 'مسجد';
  if (englishType.toLowerCase().includes('palace')) return 'قصر';
  if (englishType.toLowerCase().includes('castle')) return 'قلعة';
  if (englishType.toLowerCase().includes('tower')) return 'برج';
  if (englishType.toLowerCase().includes('bridge')) return 'جسر';
  if (englishType.toLowerCase().includes('market')) return 'سوق';
  if (englishType.toLowerCase().includes('garden')) return 'حديقة';
  if (englishType.toLowerCase().includes('park')) return 'متنزه';
  if (englishType.toLowerCase().includes('beach')) return 'شاطئ';
  if (englishType.toLowerCase().includes('temple')) return 'معبد';
  if (englishType.toLowerCase().includes('square')) return 'ميدان';
  if (englishType.toLowerCase().includes('plaza')) return 'ساحة';
  if (englishType.toLowerCase().includes('gallery')) return 'معرض';
  if (englishType.toLowerCase().includes('theater') || englishType.toLowerCase().includes('theatre')) return 'مسرح';
  
  // Default fallback - keep English but log it
  console.log(`  ⚠️  No Arabic translation found for type: "${englishType}"`);
  return englishType; // Keep original if no translation found
};

// Note: Description update functionality removed for now
// Only updating attraction types to Arabic

const updateAttractionsSchema = async () => {
  try {
    console.log('Starting attractions schema update (Arabic types only)...');
    console.log('Available translations for:', Object.keys(attractionTypeTranslations).length, 'attraction types');
    
    // Get all cities to access their attractions subcollections
    const citiesSnapshot = await db.collection('cities').get();
    let totalUpdated = 0;
    let totalErrors = 0;
    let translationStats = { translated: 0, untranslated: 0 };
    const uniqueTypes = new Set();
    
    for (const cityDoc of citiesSnapshot.docs) {
      const cityId = cityDoc.id;
      console.log(`\nProcessing attractions for city: ${cityId}`);
      
      // Get attractions subcollection for this city
      const attractionsSnapshot = await db
        .collection('cities')
        .doc(cityId)
        .collection('attractions')
        .get();
      
      const batch = db.batch();
      let batchCount = 0;
      
      for (const attractionDoc of attractionsSnapshot.docs) {
        const data = attractionDoc.data();
        const attractionRef = attractionDoc.ref;
        
        // Track unique types
        uniqueTypes.add(data.type);
        
        // Generate Arabic type using improved function
        const arabicType = getArabicType(data.type);
        
        // Log translation details for first few attractions
        if (totalUpdated < 10) {
          console.log(`  📍 "${data.name}" | Type: "${data.type}" → "${arabicType}"`);
        }
        
        // Track translation success
        if (arabicType !== data.type) {
          translationStats.translated++;
        } else {
          translationStats.untranslated++;
        }
        
        // Update document with Arabic type field only
        batch.update(attractionRef, {
          typeAr: arabicType,
          updatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
        
        batchCount++;
        totalUpdated++;
        
        // Commit batch every 500 operations (Firestore limit)
        if (batchCount >= 500) {
          await batch.commit();
          console.log(`  ✅ Committed batch of ${batchCount} updates for ${cityId}`);
          batchCount = 0;
        }
      }
      
      // Commit any remaining operations in the batch
      if (batchCount > 0) {
        await batch.commit();
        console.log(`  ✅ Committed final batch of ${batchCount} updates for ${cityId}`);
      }
      
      console.log(`  📊 Updated ${attractionsSnapshot.size} attractions for ${cityId}`);
    }
    
    console.log('\n=== Update Summary ===');
    console.log(`🎯 Total attractions updated: ${totalUpdated}`);
    console.log(`✅ Successfully translated: ${translationStats.translated}`);
    console.log(`⚠️  Kept in English: ${translationStats.untranslated}`);
    console.log(`📋 Unique attraction types found: ${uniqueTypes.size}`);
    console.log(`🔄 Translation coverage: ${((translationStats.translated / totalUpdated) * 100).toFixed(1)}%`);
    console.log('\n📝 All unique types found:');
    Array.from(uniqueTypes).sort().forEach(type => {
      const arabic = getArabicType(type);
      const translated = arabic !== type ? '✅' : '❌';
      console.log(`  ${translated} "${type}" → "${arabic}"`);
    });
    console.log('\n🚀 Schema update completed successfully!');
    
  } catch (error) {
    console.error('❌ Error updating attractions schema:', error);
    process.exit(1);
  }
};

// Run the update
updateAttractionsSchema()
  .then(() => {
    console.log('All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Script failed:', error);
    process.exit(1);
  }); 