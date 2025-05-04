# Uruk Group Website

A modern, responsive website for Uruk Group, an Iraqi-owned engineering and EPC company.

## Features

- Responsive design
- Dark mode support
- Multiple pages (Home, About, Services, Projects, News, EHS, Legal, Contact)
- SVG-based assets
- Azure Static Web Apps deployment ready

## Deployment to Azure Static Web Apps

1. Create a new repository on GitHub and push this code to it
2. Go to the Azure Portal and create a new Static Web App
3. Connect your GitHub repository
4. Configure the build settings:
   - App location: `/`
   - Api location: (leave empty)
   - Output location: (leave empty)
5. Add the following secrets to your GitHub repository:
   - `AZURE_STATIC_WEB_APPS_API_TOKEN`: Get this from the Azure Portal
6. The site will automatically deploy when you push to the main branch

## Local Development

1. Clone the repository
2. Start a local server:
   ```bash
   python3 -m http.server 8000
   ```
3. Open http://localhost:8000 in your browser

## Project Structure

```
uruk-group-website/
├── assets/           # Images and media files
├── resources/        # Downloadable documents
├── .github/          # GitHub Actions workflow
├── index.html        # Homepage
├── about.html        # About page
├── services.html     # Services page
├── projects.html     # Projects page
├── news.html         # News page
├── ehs.html          # EHS Planning page
├── legal.html        # Legal page
├── contact.html      # Contact page
├── styles.css        # Main stylesheet
├── script.js         # JavaScript functionality
├── favicon.svg       # Website favicon
└── staticwebapp.config.json  # Azure Static Web Apps config
``` 