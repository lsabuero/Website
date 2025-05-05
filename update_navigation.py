import os
import re

def update_navigation_in_file(file_path):
    """Update navigation in an HTML file to include the logo."""
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Define the new navigation structure
    new_nav = '''<header role="banner" class="header">
    <nav class="main-nav" role="navigation" aria-label="Main navigation">
      <div class="container">
        <a href="/" class="nav-logo">
          <img src="assets/logo-uruk.png" alt="Uruk Group" width="140" height="45">
        </a>
        <button class="mobile-menu-button" aria-label="Toggle navigation menu">
          <span>☰</span>
        </button>
        <div class="nav-links-wrapper">
          <ul class="nav-links">
            <li><a href="/" class="active">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="news.html">News</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
          <div class="nav-cta">
            <a href="contact.html" class="cta-button">Request a Consultation</a>
          </div>
        </div>
        <div class="overlay"></div>
      </div>
    </nav>
  </header>'''
    
    # Pattern to match the entire header section
    header_pattern = r'<header[^>]*>.*?</header>'
    
    # Replace the old header with the new one
    updated_content = re.sub(header_pattern, new_nav, content, flags=re.DOTALL)
    
    # Only update if we made changes
    if updated_content != content:
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(updated_content)
        print(f"Updated: {file_path}")
        return True
    else:
        print(f"No changes needed for: {file_path}")
        return False

def main():
    # List all HTML files in the current directory
    html_files = []
    for file in os.listdir('.'):
        if file.endswith('.html') and file != 'index.html':  # Skip index.html as it's already updated
            html_files.append(file)
    
    # Update each file
    updated_count = 0
    for file_path in html_files:
        if update_navigation_in_file(file_path):
            updated_count += 1
    
    print(f"\nUpdated navigation in {updated_count} out of {len(html_files)} files.")

if __name__ == '__main__':
    main() 