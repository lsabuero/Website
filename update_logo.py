import os
import re

def update_logo_in_file(file_path):
    """Update SVG logo references to PNG in an HTML file."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # First, update meta tag and JSON-LD references
    content = re.sub(
        r'(content|"logo")=["\'](assets/logo-uruk\.svg|assets/logo-uruk\.png|favicon\.svg)["\']', 
        r'\1="assets/logo-uruk.png"', 
        content
    )
    
    # Next, update image tags for the logo
    content = re.sub(
        r'<img src=["\']assets/logo-uruk\.svg["\'] alt=["\'][^"\']*["\'](?:\s+width=["\']\d+["\'])?(?:\s+height=["\']\d+["\'])?>', 
        r'<img src="assets/logo-uruk.png" alt="Uruk Group" width="140" height="45">', 
        content
    )
    
    # Update favicon references
    content = re.sub(
        r'<link rel="icon" type="image/(?:svg\+xml|png)" href="(?:favicon\.svg|assets/logo-uruk\.png)">', 
        r'<link rel="icon" type="image/png" href="assets/logo-uruk.png">', 
        content
    )
    
    # Update the nav-logo img tag
    content = re.sub(
        r'<a href="/" class="nav-logo">\s*<img src="[^"]*" alt="[^"]*"[^>]*>', 
        r'<a href="/" class="nav-logo">\n          <img src="assets/logo-uruk.png" alt="Uruk Group" width="140" height="45">', 
        content
    )
    
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)
    
    print(f"Updated: {file_path}")

def main():
    # List all HTML files in the current directory and subdirectories
    html_files = []
    for root, _, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    # Update each file
    updated_count = 0
    for file_path in html_files:
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                original_content = file.read()
            
            update_logo_in_file(file_path)
            
            with open(file_path, 'r', encoding='utf-8') as file:
                new_content = file.read()
            
            if original_content != new_content:
                updated_count += 1
        except Exception as e:
            print(f"Error processing {file_path}: {str(e)}")
    
    print(f"Updated {updated_count} out of {len(html_files)} files.")

if __name__ == '__main__':
    main() 