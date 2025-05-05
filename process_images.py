from PIL import Image
import os

def process_image(input_path, output_path, target_width=1920):
    """Process an image to be used as a background."""
    try:
        with Image.open(input_path) as img:
            # Calculate aspect ratio
            aspect_ratio = img.height / img.width
            target_height = int(target_width * aspect_ratio)
            
            # Resize image
            img = img.resize((target_width, target_height), Image.Resampling.LANCZOS)
            
            # Ensure the output directory exists
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            
            # Save with quality optimization
            img.save(output_path, 'JPEG', quality=85, optimize=True)
            return True
    except Exception as e:
        print(f"Error processing {input_path}: {str(e)}")
        return False

def main():
    # Create images directory if it doesn't exist
    os.makedirs('assets/images', exist_ok=True)
    
    # Define image mappings
    images = [
        ('1.jpg', 'bg-1.jpg'),  # Modern facility with URUK branding
        ('2.jpg', 'bg-2.jpg'),  # B&W site with orange cranes
        ('3.jpg', 'bg-3.jpg'),  # Night view of facility
    ]
    
    success_count = 0
    for input_name, output_name in images:
        input_path = f'source_images/{input_name}'
        output_path = f'assets/images/{output_name}'
        
        print(f'Processing {input_name}...')
        if process_image(input_path, output_path):
            success_count += 1
            print(f'Successfully saved {output_name}')
    
    if success_count == 0:
        print("\nNo images were processed successfully.")
        print("Please ensure the source images are in the source_images directory with the correct names:")
        for input_name, _ in images:
            print(f"- {input_name}")
    else:
        print(f"\nProcessed {success_count} out of {len(images)} images successfully.")

if __name__ == '__main__':
    main() 