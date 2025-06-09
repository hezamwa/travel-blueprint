const admin = require('firebase-admin');

// Initialize Firebase Admin
const serviceAccount = require('./firebase-service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Arabic description templates based on attraction types
const descriptionTemplates = {
  'Museum': {
    ar: 'متحف',
    template: (name) => `${name} هو متحف رائع يضم مجموعة مميزة من المعروضات والقطع الأثرية التي تحكي تاريخ وثقافة المنطقة. يوفر المتحف تجربة تعليمية وثقافية ممتعة للزوار من جميع الأعمار.`
  },
  'Cathedral': {
    ar: 'كاتدرائية',
    template: (name) => `${name} هي كاتدرائية مذهلة تتميز بهندستها المعمارية الرائعة وتاريخها العريق. تعتبر من أهم المعالم الدينية والثقافية في المدينة وتجذب الزوار من جميع أنحاء العالم.`
  },
  'Church': {
    ar: 'كنيسة',
    template: (name) => `${name} هي كنيسة تاريخية جميلة تمثل رمزاً دينياً وثقافياً مهماً في المنطقة. تتميز بتصميمها المعماري الفريد وأهميتها الروحية للمجتمع المحلي.`
  },
  'Mosque': {
    ar: 'مسجد',
    template: (name) => `${name} هو مسجد عريق يتميز بتصميمه الإسلامي الأصيل وقيمته الروحية العظيمة. يعتبر مركزاً دينياً مهماً ومعلماً معمارياً يجذب المؤمنين والزوار على حد سواء.`
  },
  'Palace': {
    ar: 'قصر',
    template: (name) => `${name} هو قصر ملكي فخم يعكس عظمة التاريخ وجمال العمارة التقليدية. يضم القصر قاعات رائعة وحدائق خلابة، ويحكي قصص الحكام والنبلاء عبر التاريخ.`
  },
  'Tower': {
    ar: 'برج',
    template: (name) => `${name} هو برج شاهق مميز يوفر إطلالات بانورامية رائعة على المدينة والمناطق المحيطة. يعتبر رمزاً معمارياً مهماً ونقطة جذب سياحية شهيرة.`
  },
  'Bridge': {
    ar: 'جسر',
    template: (name) => `${name} هو جسر معماري رائع يربط بين ضفتي النهر ويعتبر رمزاً مميزاً للمدينة. يتميز بتصميمه الهندسي الفريد ويوفر مناظر خلابة للمياه والمناطق المحيطة.`
  },
  'Market': {
    ar: 'سوق',
    template: (name) => `${name} هو سوق تقليدي نابض بالحياة يقدم تجربة تسوق أصيلة وفريدة. يضم السوق متاجر متنوعة تبيع المنتجات المحلية والحرف التقليدية والتذكارات.`
  },
  'Garden': {
    ar: 'حديقة',
    template: (name) => `${name} هي حديقة خضراء جميلة مليئة بالنباتات المتنوعة والأزهار الملونة. توفر الحديقة مساحة هادئة للاستجمام والاستمتاع بالطبيعة في قلب المدينة.`
  },
  'Park': {
    ar: 'متنزه',
    template: (name) => `${name} هو متنزه واسع يوفر مساحات خضراء للاستجمام والأنشطة الترفيهية. يعتبر مكاناً مثالياً للعائلات والأطفال للاستمتاع بالهواء الطلق والطبيعة.`
  },
  'Beach': {
    ar: 'شاطئ',
    template: (name) => `${name} هو شاطئ رملي جميل بمياه صافية يقدم تجربة استجمام مثالية. يوفر الشاطئ أنشطة مائية متنوعة ومناظر طبيعية خلابة للزوار.`
  },
  'Castle': {
    ar: 'قلعة',
    template: (name) => `${name} هي قلعة تاريخية محصنة تحكي قصص الماضي العريق والمعارك التاريخية. تتميز بهندستها الدفاعية القوية وتوفر إطلالات رائعة على المناطق المحيطة.`
  },
  'Temple': {
    ar: 'معبد',
    template: (name) => `${name} هو معبد قديم يحمل قيمة روحية وتاريخية عظيمة. يتميز بتصميمه المعماري الفريد ويعتبر مكاناً مقدساً ومركزاً للعبادة والتأمل.`
  },
  'Monument': {
    ar: 'نصب تذكاري',
    template: (name) => `${name} هو نصب تذكاري مهم يخلد ذكرى أحداث تاريخية مهمة أو شخصيات عظيمة. يعتبر رمزاً للذاكرة الجماعية ونقطة جذب ثقافية.`
  },
  'Plaza': {
    ar: 'ساحة',
    template: (name) => `${name} هي ساحة مركزية حيوية تجمع الزوار والسكان المحليين في أجواء اجتماعية نابضة بالحياة. تحيط بها المقاهي والمحلات وتقام فيها الفعاليات الثقافية.`
  },
  'Gallery': {
    ar: 'معرض',
    template: (name) => `${name} هو معرض فني راقي يعرض أعمالاً فنية متنوعة ومعاصرة. يوفر المعرض منصة للفنانين لعرض إبداعاتهم ويقدم تجربة ثقافية غنية للزوار.`
  },
  'Theater': {
    ar: 'مسرح',
    template: (name) => `${name} هو مسرح عريق يستضيف العروض المسرحية والثقافية المتنوعة. يعتبر مركزاً مهماً للفنون الأدائية ويساهم في إثراء الحياة الثقافية للمدينة.`
  },
  'Stadium': {
    ar: 'استاد',
    template: (name) => `${name} هو استاد رياضي حديث يستضيف المباريات والأحداث الرياضية الكبرى. يوفر تجربة مثيرة لمحبي الرياضة ويعتبر رمزاً للتميز الرياضي.`
  },
  'Library': {
    ar: 'مكتبة',
    template: (name) => `${name} هي مكتبة عامة مهمة تضم مجموعة واسعة من الكتب والمراجع. تعتبر مركزاً للتعلم والمعرفة وتوفر بيئة هادئة للقراءة والدراسة.`
  },
  'Aquarium': {
    ar: 'أكواريوم',
    template: (name) => `${name} هو أكواريوم رائع يضم مجموعة متنوعة من الكائنات البحرية والأسماك الملونة. يوفر تجربة تعليمية ممتعة للأطفال والعائلات.`
  },
  'Zoo': {
    ar: 'حديقة حيوان',
    template: (name) => `${name} هي حديقة حيوان واسعة تضم مجموعة متنوعة من الحيوانات من جميع أنحاء العالم. توفر تجربة تعليمية وترفيهية رائعة للزوار من جميع الأعمار.`
  }
};

// Common English to Arabic word translations
const wordTranslations = {
  'famous': 'مشهور',
  'historic': 'تاريخي',
  'historical': 'تاريخي',
  'ancient': 'قديم',
  'old': 'قديم',
  'beautiful': 'جميل',
  'stunning': 'رائع',
  'magnificent': 'رائع',
  'impressive': 'مثير للإعجاب',
  'popular': 'شعبي',
  'modern': 'حديث',
  'contemporary': 'معاصر',
  'traditional': 'تقليدي',
  'iconic': 'أيقوني',
  'landmark': 'معلم مميز',
  'attraction': 'معلم جذب',
  'building': 'مبنى',
  'architecture': 'عمارة',
  'design': 'تصميم',
  'style': 'أسلوب',
  'century': 'قرن',
  'built': 'مبني',
  'constructed': 'مشيد',
  'established': 'أسس',
  'founded': 'أسس',
  'opened': 'افتتح',
  'designed': 'صمم',
  'created': 'أنشئ',
  'located': 'يقع',
  'situated': 'يقع',
  'houses': 'يضم',
  'contains': 'يحتوي',
  'features': 'يتميز',
  'offers': 'يقدم',
  'provides': 'يوفر',
  'serves': 'يخدم',
  'displays': 'يعرض',
  'exhibits': 'يعرض',
  'showcases': 'يعرض',
  'large': 'كبير',
  'small': 'صغير',
  'huge': 'ضخم',
  'tiny': 'صغير جداً',
  'massive': 'ضخم',
  'enormous': 'هائل',
  'grand': 'فخم',
  'elegant': 'أنيق',
  'unique': 'فريد',
  'special': 'خاص',
  'important': 'مهم',
  'significant': 'مهم',
  'major': 'رئيسي',
  'main': 'رئيسي',
  'central': 'مركزي',
  'public': 'عام',
  'private': 'خاص',
  'royal': 'ملكي',
  'imperial': 'إمبراطوري',
  'national': 'وطني',
  'international': 'دولي',
  'cultural': 'ثقافي',
  'religious': 'ديني',
  'spiritual': 'روحي',
  'artistic': 'فني',
  'natural': 'طبيعي',
  'artificial': 'صناعي'
};

// Function to generate Arabic description
const generateArabicDescription = (englishDescription, type, name) => {
  // Clean up the name for use in templates
  const cleanName = name || 'هذا المعلم';
  
  // If no English description or it's very short, use template
  if (!englishDescription || englishDescription.length < 20 || englishDescription === 'null') {
    if (descriptionTemplates[type]) {
      return descriptionTemplates[type].template(cleanName);
    } else {
      return `${cleanName} هو معلم سياحي مميز يستحق الزيارة لجماله وأهميته التاريخية والثقافية. يوفر تجربة فريدة للزوار ويعتبر من أهم المعالم في المنطقة.`;
    }
  }
  
  // For longer descriptions, use template based on type
  if (descriptionTemplates[type]) {
    return descriptionTemplates[type].template(cleanName);
  } else {
    return `${cleanName} هو معلم سياحي رائع يتميز بطابعه الفريد وأهميته الثقافية. يقدم للزوار تجربة لا تُنسى ويعتبر من أبرز نقاط الجذب في المدينة.`;
  }
};

const updateDescriptionsArabic = async () => {
  try {
    console.log('🔄 Starting Arabic descriptions update...');
    console.log(`📚 Loaded ${Object.keys(descriptionTemplates).length} description templates\n`);
    
    // Query all attractions using collectionGroup
    const attractionsRef = admin.firestore().collectionGroup('attractions');
    const snapshot = await attractionsRef.get();
    
    console.log(`📊 Found ${snapshot.size} total attractions to process\n`);
    
    // Statistics tracking
    let processed = 0;
    let updated = 0;
    let unchanged = 0;
    let errors = 0;
    let templatesUsed = 0;
    const typeStats = new Map();
    
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
          
          const currentDescriptionAr = data.descriptionAr;
          const arabicDescription = generateArabicDescription(
            data.description, 
            data.type, 
            data.name
          );
          
          // Track statistics
          typeStats.set(data.type, (typeStats.get(data.type) || 0) + 1);
          
          if (descriptionTemplates[data.type]) {
            templatesUsed++;
          }
          
          // Only update if the description has changed
          if (currentDescriptionAr !== arabicDescription) {
            batch.update(doc.ref, {
              descriptionAr: arabicDescription,
              updatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            batchUpdates++;
            updated++;
            
            // Log first few updates for verification
            if (updated <= 3) {
              console.log(`  ✅ "${data.name || 'Unknown'}"`);
              console.log(`     Type: ${data.type}`);
              console.log(`     AR: ${arabicDescription.substring(0, 100)}...\n`);
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
    
    console.log('=== DESCRIPTION GENERATION STATISTICS ===');
    console.log(`📝 Templates used: ${templatesUsed}`);
    console.log(`📋 Template coverage: ${((templatesUsed / processed) * 100).toFixed(1)}%\n`);
    
    // Type statistics
    console.log('=== TOP 10 ATTRACTION TYPES ===');
    const sortedTypes = Array.from(typeStats.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
    
    sortedTypes.forEach(([type, count], index) => {
      const hasTemplate = descriptionTemplates[type] ? '✅' : '❌';
      console.log(`  ${index + 1}. ${type} (${count}) ${hasTemplate}`);
    });
    
    console.log('\n🚀 Arabic descriptions update completed successfully!');
    
  } catch (error) {
    console.error('💥 Error updating Arabic descriptions:', error);
    process.exit(1);
  }
};

// Run the update
updateDescriptionsArabic()
  .then(() => {
    console.log('\n👋 All done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Script failed:', error);
    process.exit(1);
  }); 