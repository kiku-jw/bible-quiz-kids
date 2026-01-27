from google import genai
from google.genai import types
import os
import time

# YOUR API KEY
API_KEY = "AIzaSyCnzwpswW9Ib1C0X8naVh2jU4OU3Bxll7s"
client = genai.Client(api_key=API_KEY, http_options={'api_version': 'v1beta'})

MODEL_NAME = "imagen-4.0-generate-001" 
OUTPUT_DIR = "public/illustrations"
os.makedirs(OUTPUT_DIR, exist_ok=True)

# ULTRA-RICH CINEMATIC STYLE
STYLE = "Ultra-rich, high-fidelity cinematic watercolor. Lush textures, atmospheric lighting with visible god-rays, deep vibrant colors. Desktop wallpaper quality, 8k resolution feel. NO text, NO labels, NO words."

# MATURE CHARACTERS
JOSIAH_ADULT = "mature King Josiah (age 26), bearded, royal blue and gold biblical robes, large gold crown, commanding but humble presence."
JEREMIAH_ADULT = "mature Prophet Jeremiah (age 26), sincere face, earthy tan linen robes, barefoot, distinct features from the king."
EBED_MELECH = "Ebed-melech (African man with dark skin), royal ancient court official robes, strong and kind."

RETRY_PROMPTS = {
    "q17": f"{STYLE} {JEREMIAH_ADULT} looking humble and sincere, his face showing a mix of worry and faith. A warm, divine light (god-ray) from heaven touches his shoulder. Beautiful ancient outdoor background. ONE person only. NO swimming.",
    "q19": f"{STYLE} A dynamic cinematic scene: {JEREMIAH_ADULT} smashing a single clay jar on a stone floor. Shards of clay flying through the air. A group of stern ancient elders in rich robes looking on with serious expressions. ONE jar, correct anatomy.",
    "q20": f"{STYLE} An epic, cinematic landscape: The ancient city of Jerusalem under a dramatic, dark, storm-filled sky. Golden lightning in the distance. A feeling of solemn warning and impending change. High-quality wallpaper.",
    "q21": f"{STYLE} {JEREMIAH_ADULT} sitting in a stone dungeon, his feet locked in a wooden stocks frame. He looks weary but full of prayer and resilience. Warm orange torchlight on the stone walls. ONLY two arms.",
    "q23": f"{STYLE} An intense rescue scene: {EBED_MELECH} and helpers leaning over the edge of a deep dark stone well, pulling {JEREMIAH_ADULT} up with thick ropes and old rags. Action, tension, and relief. Deep shadows and bright overhead light.",
    "q24": f"{STYLE} {JEREMIAH_ADULT} standing on a hill at night, looking up at a vast, beautiful star-filled sky (Milky Way). His face is lit by starlight, showing deep obedience and faith. Cinematic and peaceful.",
    "q25": f"{STYLE} {JEREMIAH_ADULT} standing firm and calm in a temple courtyard, while a group of angry ancient priests and false prophets point their fingers and shout at him. Contrast of peace vs anger. Detailed robes.",
    "q26": f"{STYLE} A beautiful, artistic summary collage: A single broken clay jar, an open blank scroll, and a blooming almond tree. Vibrant watercolor splashes, artistic and meaningful. NO text.",
    "finale": f"{STYLE} A grand, cinematic vista of a restored, beautiful Jerusalem. Lush gardens, pink almond trees in full bloom, happy families in the distance. Atmosphere of ultimate joy, peace, and hope. Ultimate desktop wallpaper.",
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

# Process the specific retry prompts
for name, prompt in RETRY_PROMPTS.items():
    generate_image(name, prompt)
    time.sleep(12) # Slightly more throttle

print("v4.2 Retry illustrations generated successfully!")
