from PIL import Image, ImageDraw, ImageFont
import io

def create_uruk_logo():
    """Create a simple URUK logo PNG as a placeholder."""
    # Create an image with a transparent background
    width, height = 300, 100
    image = Image.new("RGBA", (width, height), (255, 255, 255, 0))
    draw = ImageDraw.Draw(image)
    
    # Draw "URUK" text
    try:
        font = ImageFont.truetype("arial.ttf", 60)
    except IOError:
        # Use default font if Arial is not available
        font = ImageFont.load_default()
    
    # Draw text in dark gray
    draw.text((20, 20), "URUK", fill=(51, 51, 51, 255), font=font)
    
    # Draw colored stripes on the right side
    red_stripe = [(240, 20), (240, 80), (260, 80), (260, 20)]
    green_stripe = [(270, 20), (270, 80), (290, 80), (290, 20)]
    
    draw.polygon(red_stripe, fill=(206, 17, 38, 255))  # Red stripe
    draw.polygon(green_stripe, fill=(0, 107, 63, 255))  # Green stripe
    
    # Save the image
    image.save("assets/logo-uruk.png", "PNG")
    print("Logo created successfully!")

if __name__ == "__main__":
    create_uruk_logo() 