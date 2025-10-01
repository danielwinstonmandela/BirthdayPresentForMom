# 🎂 Birthday Website - Image Automation System

## 📁 How to Add Your Images

### Step 1: Add Images to the Folder
1. Navigate to: `moms-birthday/public/images/`
2. Drop your images into this folder
3. Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.bmp`, `.svg`

### Step 2: Run the Generation Script
```bash
cd moms-birthday
node generate-images.js
```

### Step 3: That's it! 
Your website will automatically update with the new images! 🎉

## 🔄 Automatic vs Manual Mode

### Automatic Mode (Recommended)
```bash
# Run once and your images will automatically appear
node generate-images.js
```

### Watch Mode (Advanced)
```bash
# Automatically regenerates when you add/remove images
node generate-images.js --watch
```

## 📋 What the Script Does

1. **Scans** the `public/images/` folder
2. **Finds** all image files 
3. **Sorts** them intelligently (img1.jpg, img2.jpg, etc.)
4. **Generates** `imageData.json` with:
   - Image paths
   - Default messages 
   - Timeline labels
   - Metadata

## 🎨 Customizing Messages

The script uses these default timeline messages:
- "The Beginning" 
- "Family Memories"
- "Growing Up" 
- "Special Times"
- "Present Day"
- "Forever Grateful"

To customize, edit the `DEFAULT_MESSAGES` array in `generate-images.js`

## 📝 Example Usage

```bash
# 1. Add your photos
cp ~/Desktop/mom1.jpg public/images/
cp ~/Desktop/family.jpg public/images/
cp ~/Desktop/birthday.jpg public/images/

# 2. Generate the data
node generate-images.js

# 3. Your website now shows your actual photos! 🎉
```

## 🔍 File Structure
```
moms-birthday/
├── public/
│   └── images/           ← Drop your images here
│       ├── photo1.jpg
│       ├── photo2.jpg
│       └── ...
├── src/
│   ├── App.jsx          ← Automatically loads images
│   └── imageData.json   ← Generated automatically
└── generate-images.js   ← The magic script
```

## 🚀 Pro Tips

1. **Name your images** with numbers for better sorting: `mom1.jpg`, `mom2.jpg`
2. **Add new images anytime** - just re-run the script
3. **Multiple formats** work: JPG, PNG, GIF, etc.
4. **High quality images** look best (but will be optimized automatically)
5. **Watch mode** is perfect during development

## ⚡ Quick Commands

```bash
# Generate images (run this after adding photos)
node generate-images.js

# Watch for changes (automatic regeneration)
node generate-images.js --watch

# Check what images were found
ls -la public/images/

# Start the website
npm run dev
```

## 🎁 Result

Your mom will see:
- ✨ Her actual photos in the timeline
- 💕 Personalized messages with each image  
- 🌸 Beautiful animations and transitions
- 🎊 All the magical effects you built

**No more manual coding - just drop images and run the script!** 🚀