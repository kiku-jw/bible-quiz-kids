from google import genai
from google.genai import types
import os
import time

# YOUR API KEY
API_KEY = "AIzaSyDZR7YoPiIqnLHEQGZE6aVVk2sktEOmJgY"
client = genai.Client(api_key=API_KEY, http_options={'api_version': 'v1beta'})

MODEL_NAME = "imagen-4.0-generate-001" 
OUTPUT_DIR = "public/illustrations"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# CORE STYLE & CHARACTERS
STYLE = "Vibrant and rich watercolor children's storybook illustration. Lush colors, detailed hand-painted backgrounds, atmospheric golden-hour lighting. desktop wallpaper quality, 8k resolution feel. NO text, NO words, NO writing, NO letters."

JOSIAH_C = "8-year-old boy king Josiah, small round earnest face, small gold crown, vibrant royal blue tunic with gold embroidery, olive skin, short dark curly hair."
JOSIAH_T = "16-year-old youth Josiah, tall and lean, regal appearance, same gold crown, ornate royal blue and gold robes, determined expression."
JOSIAH_A = "26-year-old adult King Josiah, mature face with short dark beard, large gold crown, rich purple and gold royal robes, leader-like presence."
JEREMIAH = "Prophet Jeremiah, a tall thin young man in his 20s, humble and sincere face, simple warm earthy linen robes, distinct from the king, barefoot."

PROMPTS = {
    "intro": f"{STYLE} An immersive panoramic view of ancient Jerusalem at sunset. {JOSIAH_C} and {JEREMIAH} standing side-by-side on a stone balcony overlooking the city. Vibrant orange and pink sky. They are looking at the city with hope. NO hand-holding.",
    "q1": f"{STYLE} A grand coronation in a stone temple. An elderly high priest placing a small gold crown on the head of {JOSIAH_C}. Soft rays of sun beaming through small windows. Joyful crowd in background.",
    "q2": f"{STYLE} {JOSIAH_C} sitting on a beautiful carved wooden throne in a palace hall. He looks small but brave. Detailed stone columns and tapestry in background.",
    "q3": f"{STYLE} {JOSIAH_T} kneeling alone in a lush garden, hands clasped, head bowed in prayer to Jehovah. Soft spiritual light shining from above.",
    "q4": f"{STYLE} {JOSIAH_T} pointing with determination as workers pull down a stone idol of a pagan god on a sunny hilltop. Clouds of dust, dynamic movement.",
    "q5": f"{STYLE} {JOSIAH_A} holding a wooden ruler, Supervising the repair of the great Stone Walls of the Temple. Workers with hammers and chisels. Scaffolding, busy scene.",
    "q6": f"{STYLE} A contrast scene: The Temple looking neglected in shadows, while in the foreground, people are walking past it towards stone altars in the hills. Solemn atmosphere.",
    "q7": f"{STYLE} Inside a dusty stone chamber, High Priest Hilkiah holding a large ancient leather scroll. The scroll is BLANK with no text. He looks amazed. Dust motes in the air.",
    "q8": f"{STYLE} {JOSIAH_A} standing on a wooden podium, holding an unrolled blank scroll, reading to a large colorful crowd of men, women, and children in a sunlit courtyard. NO text on scroll.",
    "q9": f"{STYLE} A large vibrant crowd of ancient Israelites in Jerusalem. They are cheering and raising their open palms towards the sky in a celebration of promise. NO salutes. Very colorful.",
    "q10": f"{STYLE} {JOSIAH_A} sitting in a peaceful stone room, leaning over a table with a large blank scroll. Deep focus, candlelight and moonlight.",
    "q11": f"{STYLE} A peaceful symbolic scene: {JOSIAH_A} bowing low in prayer, surrounded by a soft, warm golden divine aura. Gentle rays of light.",
    "q12": f"{STYLE} A beautiful decorative collage for a child's book: A gold crown, a blank scroll, and an olive branch. Vibrant watercolor backdrop. NO text.",
    "t13": f"{STYLE} A peaceful Jewish family in ancient Jerusalem sitting under a fig tree, sharing a meal. Warm, happy, transition scene.",
    "t14": f"{STYLE} {JEREMIAH} walking alone on a winding path through green fields towards the distant stone city of Jerusalem. Blue sky, soft clouds. Immersive landscape.",
    "q15": f"{STYLE} {JEREMIAH} standing in a quiet stone courtyard, holding a simple wooden staff. Sincere and brave expression. Ancient architecture.",
    "q16": f"{STYLE} {JEREMIAH} standing on a stone step in a busy marketplace, speaking to skeptical merchants. Jars of spices and fabrics in background.",
    "q17": f"{STYLE} {JEREMIAH} looking humble and slightly worried. A soft, glowing divine hand touches his shoulder to give him courage. Spiritual and peaceful. NO water, NO swimming.",
    "q18": f"{STYLE} {JEREMIAH} standing firm while stone city walls are built around him symbolically. A protective aura of golden light surrounds him. NO fire.",
    "q19": f"{STYLE} Dramatic scene: {JEREMIAH} raising a clay jar high and smashing it on the stone pavement. Shards flying. Surprised and angry elderly men in robes looking on. ONE jar, NO double image.",
    "q20": f"{STYLE} A view from a hill: The city of Jerusalem with dark storm clouds gathering above it, representing a warning of coming trouble. Sad but epic.",
    "q21": f"{STYLE} {JEREMIAH} sitting on the floor by a stone gate, his feet locked in a simple wooden stocks frame. Resilient and prayerful face. ONLY two arms, NO extra limbs.",
    "q22": f"{STYLE} {JEREMIAH} with a passionate expression. Inside his chest, a symbolic warm orange glow represents a 'fire in his heart'. Intense but beautiful watercolor.",
    "q23": f"{STYLE} A rescue scene: Several men pulling {JEREMIAH} out of a deep stone cistern using rope. Jeremiah looking up with relief. Dynamic watercolor strokes.",
    "q24": f"{STYLE} {JEREMIAH} looking upwards at a star-lit sky, his face filled with faith and obedience. Simple and powerful.",
    "q25": f"{STYLE} A group of angry ancient temple priests in elaborate robes, shouting and pointing at {JEREMIAH} who stands calm and unmoving.",
    "q26": f"{STYLE} A summary collage: A broken clay jar, a sun, and a green valley. No people. Vibrant watercolor textures. NO text.",
    "finale": f"{STYLE} A lush paradise garden in a restored Jerusalem. Children playing near blooming almond trees with pink flowers. Vibrant colors, atmosphere of ultimate joy.",
}

def generate_image(name, prompt):
    print(f"Generating {name}...")
    try:
        response = client.models.generate_images(
            model=MODEL_NAME,
            prompt=prompt,
            config=types.GenerateImagesConfig(
                number_of_images=1,
                aspect_ratio="16:9",
            )
        )
        for i, generated_image in enumerate(response.generated_images):
            filepath = os.path.join(OUTPUT_DIR, f"{name}.png")
            if hasattr(generated_image.image, 'save'):
                generated_image.image.save(filepath)
            else:
                with open(filepath, "wb") as f:
                    f.write(generated_image.image._image_bytes)
            print(f"Saved to {filepath}")
    except Exception as e:
        print(f"Error generating {name}: {e}")

# Process all prompts with a longer sleep to avoid rate limits
for name, prompt in PROMPTS.items():
    generate_image(name, prompt)
    time.sleep(10) # 10 seconds to be safe

print("v4.2 illustrations generated successfully!")
