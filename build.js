const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, 'resource', 'content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

// --- Reusable Components ---

function getHead(page) {
    return `
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${page.meta.description}">
    <meta name="keywords" content="${page.meta.keywords}">
    <title>${page.title}</title>
    <!-- Load Tailwind CSS from CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Load Alpine.js for mobile menu interactivity -->
    <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.10/dist/cdn.min.js"></script>
    <!-- Set up custom configuration for Inter font and colors -->
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: {
                        sans: ['Inter', 'sans-serif'],
                    },
                    colors: {
                        'farm-green': '#1E4032', // Deep, rich green
                        'farm-brown': '#654321', // Earthy brown
                        'cta-blue': '#3B82F6',   // Standard Tailwind Blue for CTAs
                    }
                }
            }
        }
    </script>
    <style>
        html { scroll-behavior: smooth; }
    </style>
</head>`;
}

function getHeader(pageName) {
    const navLinks = [
        { name: 'Home', href: 'index.html' },
        { name: 'Volunteer', href: 'volunteer.html' },
        { name: 'Retreats', href: 'retreats.html' }
    ];

    const desktopNav = navLinks.map(link =>
        `<a href="${link.href}" class="text-base font-medium ${link.name.toLowerCase() === pageName ? 'text-white border-b-2 border-amber-300 pb-1' : 'text-amber-100 hover:text-white transition'}">${link.name}</a>`
    ).join('\n                    ');

    const mobileNav = navLinks.map(link =>
        `<a href="${link.href}" class="block py-3 px-4 text-base font-medium ${link.name.toLowerCase() === pageName ? 'text-white bg-farm-brown/20' : 'text-amber-100 hover:bg-farm-brown/20'}">${link.name}</a>`
    ).join('\n            ');

    return `
    <header x-data="{ open: false }" class="sticky top-0 z-10 bg-farm-green shadow-xl">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center py-4">
                <a href="index.html" class="text-2xl font-extrabold text-amber-100 tracking-wider">ROCKBOTTOM FARM</a>
                <nav class="hidden md:flex items-center space-x-6">
                    ${desktopNav}
                    <a href="https://www.gbfb.org/donate/" target="_blank" rel="noopener noreferrer" class="ml-4 inline-block px-5 py-2 text-base font-bold rounded-lg bg-cta-blue text-white shadow-md hover:bg-blue-700 transition">Donate</a>
                </nav>
                <div class="md:hidden">
                    <button @click="open = !open" class="text-amber-100 hover:text-white focus:outline-none">
                        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                    </button>
                </div>
            </div>
        </div>
        <div x-show="open" @click.away="open = false" x-cloak class="md:hidden bg-farm-green/95 backdrop-blur-sm">
            ${mobileNav}
            <a href="https://www.gbfb.org/donate/" target="_blank" rel="noopener noreferrer" class="block py-3 px-4 text-base font-medium text-amber-100 hover:bg-farm-brown/20">Donate</a>
        </div>
    </header>`;
}

function getFooter() {
    return `
    <footer class="bg-gray-800 text-gray-300 py-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h5 class="text-lg font-bold text-white mb-3">Our Core</h5>
                    <p class="text-sm">Driven by Bob's vision, we leverage local agriculture to fight hunger and provide essential mental health support for our community's first responders.</p>
                </div>
                <div>
                    <h5 class="text-lg font-bold text-white mb-3">Contact Us</h5>
                    <p class="text-sm">Rockbottom Farm</p>
                    <p class="text-sm">Stow, MA</p>
                    <p class="text-sm mt-2">Email: <a href="mailto:contact@rockbottomfarm.org" class="text-amber-300 hover:underline">contact@rockbottomfarm.org</a></p>
                </div>
                <div>
                    <h5 class="text-lg font-bold text-white mb-3">Connect</h5>
                    <div class="flex space-x-4 justify-center md:justify-start">
                        <a href="#" class="text-gray-400 hover:text-white transition duration-200"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg></a>
                        <a href="#" class="text-gray-400 hover:text-white transition duration-200"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12.315 2c-4.04.022-4.482.015-6.095.088-1.613.073-2.712.36-3.652 1.3C1.635 4.324.347 5.42.273 7.035c-.073 1.613-.067 2.055-.088 6.095-.022 4.04-.015 4.482.088 6.095.073 1.613.36 2.712 1.3 3.652 1.028.938 2.124 1.226 3.74 1.298 1.612.074 2.055.068 6.094.089 4.04.022 4.482.015 6.095-.088 1.613-.073 2.712-.36 3.652-1.3 1.022-.937 1.225-2.035 1.298-3.649.073-1.613.067-2.055.088-6.095.022-4.04.015-4.482-.088-6.095-.073-1.613-.36-2.712-1.3-3.652C20.476 1.635 19.38.347 17.765.273c-1.612-.073-2.055-.067-6.094-.088zm-1.84 2.167h3.362c3.953 0 4.34.017 5.852.087 1.403.064 2.203.34 2.8.94.598.6 1.07 1.573.94 2.8.07 1.512.087 1.898.087 5.852s-.017 4.34-.087 5.852c-.064 1.403-.34 2.203-.94 2.8-.6.598-1.573 1.07-2.8.94-1.512.07-1.898.087-5.852.087s-4.34-.017-5.852-.087c-1.403-.064-2.203-.34-2.8-.94-.598-.6-1.07-1.573-.94-2.8-.07-1.512-.087-1.898-.087-5.852s.017-4.34.087-5.852c.064-1.403.34-2.203.94-2.8.6-.598 1.573-1.07 2.8-.94 1.512-.07 1.898-.087 5.852-.087zM12 7.25a4.75 4.75 0 100 9.5 4.75 4.75 0 000-9.5zM12 15a3 3 0 110-6 3 3 0 010 6zm6.36-7.81a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clip-rule="evenodd" /></svg></a>
                        <a href="#" class="text-gray-400 hover:text-white transition duration-200"><svg class="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg></a>
                    </div>
                </div>
            </div>
            <div class="mt-8 pt-6 border-t border-gray-700 text-sm text-center">
                &copy; ${new Date().getFullYear()} Rockbottom Farm. All Rights Reserved. | Operated in conjunction with our sister farm in Westford, MA.
            </div>
        </div>
    </footer>`;
}


// --- Section Builders ---

function buildHeroSection(section) {
    const subtitle = section.subtitle ? `<h2 class="text-xs font-semibold tracking-widest uppercase text-amber-300 mb-3">${section.subtitle}</h2>` : '';
    const cta = section.cta ? `<a href="${section.cta.link}" class="inline-block px-10 py-4 text-lg font-bold rounded-full bg-cta-blue text-white shadow-xl hover:bg-blue-700 transition duration-300 transform hover:scale-105">${section.cta.text}</a>` : '';
    return `
    <section id="hero" class="relative overflow-hidden bg-farm-green text-white py-16 md:py-24 lg:py-32">
        <div class="absolute inset-0 bg-farm-green/90"></div>
        <div class="relative max-w-7xl mx-auto px-4 text-center">
            ${subtitle}
            <p class="text-5xl md:text-6xl font-bold leading-tight mb-6">${section.title}</p>
            <p class="text-xl md:text-2xl mb-10 max-w-3xl mx-auto font-light">${section.body}</p>
            ${cta}
        </div>
    </section>`;
}

function buildMissionsSection(section) {
    const cards = section.cards.map(card => `
        <div class="bg-amber-50 p-8 rounded-xl shadow-lg border-t-4 border-farm-green">
            <h4 class="text-2xl font-bold text-farm-green mb-3 text-center">${card.title}</h4>
            <p class="text-center md:text-left">${card.body}</p>
        </div>`).join('');
    return `
    <section id="missions" class="py-16 md:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 class="text-4xl font-extrabold text-farm-green text-center mb-12">${section.title}</h3>
            <div class="grid md:grid-cols-2 gap-10">${cards}</div>
        </div>
    </section>`;
}

function buildVisionSection(section) {
    const body = section.body.map(p => `<p class="text-lg leading-relaxed mb-6">${p}</p>`).join('');
    return `
    <section id="vision" class="py-16 md:py-24 bg-gray-100">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 class="text-4xl font-extrabold text-farm-brown mb-6">${section.title}</h3>
            <div class="w-24 h-24 mx-auto rounded-full bg-gray-300 mb-6 flex items-center justify-center text-gray-600 text-lg font-bold">BOB</div>
            ${body}
        </div>
    </section>`;
}

function buildGallerySection(section) {
    const images = section.images.map(image => `
        <div class="aspect-video rounded-xl shadow-lg overflow-hidden bg-gray-200">
            <img src="${image.src}" alt="${image.alt}" class="w-full h-full object-cover">
        </div>`).join('');
    return `
    <section id="gallery" class="py-16 md:py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 class="text-4xl font-extrabold text-farm-green text-center mb-12">${section.title}</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">${images}</div>
        </div>
    </section>`;
}

function buildCtaSection(section) {
    const ctas = section.ctas.map(cta => `
        <a href="${cta.link}" ${cta.external ? 'target="_blank" rel="noopener noreferrer"' : ''} class="inline-block w-full md:w-auto px-8 py-4 font-bold rounded-xl bg-cta-blue text-white shadow-2xl transition duration-300 hover:bg-blue-700 transform hover:-translate-y-1">
            ${cta.text}
        </a>`).join('');
    return `
    <section id="action" class="py-16 md:py-24 bg-farm-green text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h3 class="text-4xl font-extrabold text-amber-300 mb-4">${section.title}</h3>
            <p class="text-xl mb-12 max-w-3xl mx-auto">${section.body}</p>
            <div class="flex flex-col md:flex-row justify-center gap-6">${ctas}</div>
        </div>
    </section>`;
}

function buildProgramDetailsSection(section) {
    const body = section.body.map(p => `<p class="text-lg mb-4">${p}</p>`).join('');
    const features = section.features.map(feature => `
        <div class="bg-gray-100 p-6 rounded-lg">
            <h4 class="text-xl font-bold text-farm-green">${feature.title}</h4>
            <p>${feature.body}</p>
        </div>`).join('');
    return `
    <section class="py-16 md:py-24 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 class="text-3xl font-bold text-farm-brown mb-6">${section.title}</h2>
                    ${body}
                </div>
                <div class="space-y-6">${features}</div>
            </div>
        </div>
    </section>`;
}

function buildInquiryFormSection(section) {
    return `
    <section id="inquiry" class="py-16 md:py-24 bg-gray-100">
        <div class="max-w-2xl mx-auto px-4 text-center">
            <h2 class="text-3xl font-bold text-farm-green mb-4">${section.title}</h2>
            <p class="mb-8">${section.body}</p>
            <a href="${section.cta.link}" class="inline-block px-10 py-4 font-bold rounded-lg bg-farm-brown text-white shadow-lg transition duration-300 hover:bg-farm-brown/80 transform hover:-translate-y-1">
                Inquire Confidentially via Email
            </a>
        </div>
    </section>`;
}

function buildOpportunitiesSection(section) {
    const cards = section.cards.map(card => `
        <div class="bg-white p-8 rounded-lg shadow-md">
            <h3 class="text-2xl font-bold text-farm-green mb-3">${card.title}</h3>
            <p>${card.body}</p>
        </div>`).join('');
    return `
    <section class="py-16 md:py-24 bg-amber-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl font-bold text-farm-brown text-center mb-12">${section.title}</h2>
            <div class="grid md:grid-cols-3 gap-8 text-center">${cards}</div>
        </div>
    </section>`;
}

function buildSignupFormSection(section) {
    const fields = section.fields.map(field => {
        if (field.type === 'textarea') {
            return `
            <div>
                <label for="${field.name}" class="block text-sm font-medium text-gray-700">${field.label}</label>
                <textarea name="${field.name}" id="${field.name}" rows="4" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cta-blue focus:border-cta-blue" placeholder="${field.placeholder}"></textarea>
            </div>`;
        }
        return `
            <div>
                <label for="${field.name}" class="block text-sm font-medium text-gray-700">${field.label}</label>
                <input type="${field.type}" name="${field.name}" id="${field.name}" ${field.required ? 'required' : ''} class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-cta-blue focus:border-cta-blue">
            </div>`;
    }).join('');
    return `
    <section id="signup" class="py-16 md:py-24 bg-white">
        <div class="max-w-2xl mx-auto px-4">
            <h2 class="text-3xl font-bold text-farm-green text-center mb-8">${section.title}</h2>
            <form action="${section.form_action}" method="POST" class="space-y-6">
                ${fields}
                <div class="text-center">
                    <button type="submit" class="inline-block px-10 py-3 font-bold rounded-lg bg-cta-blue text-white shadow-lg transition duration-300 hover:bg-blue-700 transform hover:-translate-y-1">
                        ${section.submit_button.text}
                    </button>
                </div>
            </form>
        </div>
    </section>`;
}


// --- Main Build Process ---

function buildPage(pageName, pageContent) {
    const sectionsHtml = pageContent.sections.map(section => {
        switch (section.type) {
            case 'hero': return buildHeroSection(section);
            case 'missions': return buildMissionsSection(section);
            case 'vision': return buildVisionSection(section);
            case 'gallery': return buildGallerySection(section);
            case 'cta_section': return buildCtaSection(section);
            case 'program_details': return buildProgramDetailsSection(section);
            case 'inquiry_form': return buildInquiryFormSection(section);
            case 'opportunities': return buildOpportunitiesSection(section);
            case 'signup_form': return buildSignupFormSection(section);
            default: return '';
        }
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
${getHead(pageContent)}
<body class="font-sans bg-amber-50 text-gray-800">
    ${getHeader(pageName)}
    <main>
        ${sectionsHtml}
    </main>
    ${getFooter()}
</body>
</html>`;
}

function build() {
    console.log('Starting build...');

    const pages = Object.keys(content.pages);

    pages.forEach(pageName => {
        const pageContent = content.pages[pageName];
        const fileName = pageName === 'home' ? 'index.html' : `${pageName}.html`;
        const html = buildPage(pageName, pageContent);
        fs.writeFileSync(fileName, html);
        console.log(`Successfully built ${fileName}`);
    });

    console.log('Build finished successfully!');
}

build();