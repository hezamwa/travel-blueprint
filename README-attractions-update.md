# Attractions Schema Update - Arabic Support

This document explains the process of updating the attractions collection to include Arabic translations for type and description fields.

## Overview

The attractions collection has been updated to support multilingual content with the following new fields:
- `typeAr`: Arabic translation of the attraction type
- `descriptionAr`: Arabic description of the attraction

## Schema Changes

### Before Update
```json
{
  "name": "Eiffel Tower",
  "type": "Tower",
  "description": "Iconic iron lattice tower located on the Champ de Mars",
  "cityId": "paris_france"
}
```

### After Update
```json
{
  "name": "Eiffel Tower",
  "type": "Tower",
  "typeAr": "برج",
  "description": "Iconic iron lattice tower located on the Champ de Mars",
  "descriptionAr": "برج حديدي أيقوني يقع في شامب دي مارس",
  "cityId": "paris_france",
  "updatedAt": "2024-01-15T10:30:00Z"
}
```

## Update Process

### Prerequisites
1. Install firebase-admin dependency:
   ```bash
   npm install firebase-admin
   ```

2. Update your `firebase_config.json` with your actual Firebase service account credentials:
   ```json
   {
     "type": "service_account",
     "project_id": "your-actual-project-id",
     "private_key_id": "your-private-key-id",
     "private_key": "-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY\n-----END PRIVATE KEY-----\n",
     "client_email": "firebase-adminsdk-xxxxx@your-project-id.iam.gserviceaccount.com",
     // ... other credentials
   }
   ```

### Running the Update
Execute the update script:
```bash
npm run update-attractions
```

### What the Script Does
1. **Connects to Firestore** using Firebase Admin SDK
2. **Iterates through all cities** to access their attractions subcollections  
3. **For each attraction**:
   - Translates the `type` field to Arabic using predefined mappings
   - Generates appropriate Arabic descriptions based on attraction type
   - Adds `typeAr` and `descriptionAr` fields
   - Adds `updatedAt` timestamp
4. **Uses batch operations** for efficient updates (500 documents per batch)
5. **Provides progress logging** and final summary

## Supported Attraction Types

The script includes Arabic translations for 50+ attraction types:

| English | Arabic |
|---------|--------|
| Museum | متحف |
| Cathedral | كاتدرائية |
| Church | كنيسة |
| Mosque | مسجد |
| Palace | قصر |
| Tower | برج |
| Bridge | جسر |
| Market | سوق |
| Garden | حديقة |
| Park | متنزه |
| Beach | شاطئ |
| Castle | قلعة |
| Temple | معبد |
| Monument | نصب تذكاري |
| Plaza | ساحة |
| Gallery | معرض |
| ... | ... |

## React App Integration

### Component Updates
The `AttractionCard` component has been updated to display Arabic content when the language is set to Arabic:

```jsx
const AttractionCard = ({ attraction }) => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === 'ar';

  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6">
          {attraction.name}
        </Typography>
        
        <Chip 
          label={isArabic && attraction.typeAr ? attraction.typeAr : attraction.type}
          color="secondary"
          variant="outlined"
        />
        
        <Typography variant="body2">
          {isArabic && attraction.descriptionAr 
            ? attraction.descriptionAr 
            : attraction.description || t('no_data')
          }
        </Typography>
      </CardContent>
    </Card>
  );
};
```

### New Service Functions
Added new Firestore service functions:

```javascript
// Get attraction types with both English and Arabic translations
export const getAttractionTypesWithTranslations = async () => {
  // Returns: [{ en: "Museum", ar: "متحف" }, ...]
};
```

### Updated Translations
Added new i18n keys for attraction-related UI:
- `attraction_types`: "Attraction Types" / "أنواع المعالم السياحية"
- `filter_by_type`: "Filter by Type" / "تصفية حسب النوع"  
- `all_types`: "All Types" / "جميع الأنواع"

## Expected Results

After running the update script:
- ✅ All attractions will have Arabic type translations
- ✅ All attractions will have contextual Arabic descriptions
- ✅ React app will display Arabic content when language is set to Arabic
- ✅ Maintains backward compatibility with existing English content
- ✅ Adds timestamps for tracking updates

## Verification

To verify the update was successful:

1. **Check Firestore Console**: Verify that attractions now have `typeAr` and `descriptionAr` fields
2. **Test React App**: Switch language to Arabic and verify attractions display Arabic content
3. **Check Console Logs**: Review the script output for update statistics

## Troubleshooting

### Common Issues
1. **Firebase credentials error**: Ensure `firebase_config.json` has correct service account data
2. **Permission denied**: Verify your service account has Firestore read/write permissions
3. **Batch operation failures**: Check Firestore quotas and limits
4. **Missing translations**: Some attraction types may not have predefined Arabic translations

### Recovery
If the update fails partially:
- The script is designed to be re-runnable
- Existing Arabic fields will be overwritten with new values
- Use Firestore backup/restore if major issues occur

## Performance Notes

- **Batch Operations**: Uses Firestore batch writes for efficiency
- **Rate Limiting**: Processes 500 documents per batch to stay within limits
- **Memory Usage**: Processes cities sequentially to manage memory
- **Estimated Time**: ~2-5 minutes for 3,000+ attractions depending on network speed

## Future Enhancements

Potential improvements for future updates:
1. **AI-powered translations** for more accurate Arabic descriptions
2. **Support for additional languages** (French, Spanish, etc.)
3. **User-contributed translations** with moderation system
4. **Automatic translation updates** when English content changes 