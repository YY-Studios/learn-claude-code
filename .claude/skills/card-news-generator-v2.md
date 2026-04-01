# Card News Generator v2 - Complete Documentation

This tool automates creation of 600x600 Instagram-style card news series. Users provide a topic, select colors, and optionally add background images—Claude generates content and produces multiple formatted cards.

## Key Features

**Core Functionality:**
- Generates 5-7 card content pieces automatically
- Supports solid color backgrounds or custom background images
- Text automatically wraps to fit 600x600px canvas
- "Title: Maximum 20 characters; Content: Maximum 60 characters"

**Background Image Support (V2):**
- Accepts image folders with sorted files (01.jpg, 02.jpg, etc.)
- Applies dark overlay with adjustable opacity (0.0-1.0)
- Automatically switches text to white for contrast
- Supports JPG, PNG, WebP, BMP formats

## Usage Workflow

1. **Gather Requirements:** Ask user for topic, background color (RGB), and optionally image folder path
2. **Generate Content:** Create numbered card content following character limits
3. **Run Generator:** Execute auto_generator.py or generate_card.py with appropriate parameters
4. **Deliver Results:** Provide download links to generated PNG files

## Recommended Background Colors

Six preset options provided in RGB format, converting to hex (e.g., warm beige 245,243,238 becomes #f5f3ee).

## Technical Specs

Canvas: 600x600 pixels with 40px padding; font sizes range from 28px content to 60px badges. Images are center-cropped and resized automatically using LANCZOS resampling.
