#!/bin/bash

echo "🎂 Mom's Birthday Website - Image Setup Helper"
echo "=============================================="
echo ""

# Check if images directory exists
if [ ! -d "public/images" ]; then
    echo "📁 Creating images directory..."
    mkdir -p public/images
fi

# Count existing images
image_count=$(find public/images -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.gif" -o -iname "*.webp" \) | wc -l)

echo "📊 Current images in folder: $image_count"
echo ""

if [ $image_count -eq 0 ]; then
    echo "🎯 QUICK START:"
    echo "1. Drop your mom's photos into: public/images/"
    echo "2. Run: npm run images"
    echo "3. Start website: npm run dev"
    echo ""
    echo "💡 Supported formats: JPG, PNG, GIF, WebP"
    echo ""
    
    # Ask if user wants to open the folder
    echo "Would you like to open the images folder? (y/n)"
    read -r response
    if [[ "$response" =~ ^[Yy]$ ]]; then
        if command -v open >/dev/null 2>&1; then
            open public/images
        elif command -v xdg-open >/dev/null 2>&1; then
            xdg-open public/images
        else
            echo "📂 Please manually navigate to: $(pwd)/public/images"
        fi
    fi
else
    echo "✅ Found $image_count images! Generating website data..."
    npm run images
    echo ""
    echo "🚀 Ready to start website: npm run dev"
fi

echo ""
echo "📖 For detailed instructions, see: README-IMAGES.md"