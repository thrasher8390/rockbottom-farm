# Rockbottom Farm Website

This is a simple, responsive website for Rockbottom Farm, a non-profit organization with a dual mission: to fight childhood hunger and to provide a sanctuary for first responders.

## Technologies Used

*   HTML
*   [Tailwind CSS](https://tailwindcss.com/)
*   [Alpine.js](https://alpinejs.dev/)

## Pages

*   **index.html:** The landing page, introducing the farm and its missions.
*   **volunteer.html:** Information about volunteering opportunities and a sign-up form.
*   **retreats.html:** Information about the "Grounded Hero Program" for first responders.

## Recommendations for Future Development

*   **Consolidate CSS:** Create a single, separate CSS file (e.g., `styles.css`) and link it in the `<head>` of each HTML file. This will improve performance and make it easier to manage your styles.
*   **Set up a build process:** For a production website, it is recommended to set up a build process (e.g., with Node.js and npm) to bundle your CSS and JavaScript files. This will reduce the number of HTTP requests and improve page load times.
*   **Use a templating engine:** To avoid duplicating the header and footer in each HTML file, consider using a templating engine (like Nunjucks or Handlebars) or a static site generator (like Jekyll or Eleventy).
*   **Add a favicon:** Add a favicon to make the site look more professional.
*   **Replace placeholder social media links:** The social media links in the footer are currently placeholders. They should be replaced with actual links to the farm's social media pages.
*   **Configure form submission:** The volunteer sign-up form currently reloads the page on submission. A form submission service like [Formspree](https://formspree.io/) or a serverless function should be used to handle the form submissions.