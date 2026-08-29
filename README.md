# Bishop Marine Academy

Static website foundation for Bishop Marine Academy, Port Harcourt, Rivers State, Nigeria.

## Pages
Home, About, Courses, dynamic Course Details, Certifications, International Opportunities, Admissions, Contact, FAQ, Gallery, Blog/News, Student Information, Privacy Policy and Terms & Conditions.

## Data-driven structure
- `assets/data.js` contains centralized business settings, destinations, categories, courses, FAQs, gallery and testimonial structures.
- `assets/app.js` renders shared navigation/footer, course catalogue/search/filtering, dynamic course details, FAQs, destinations and WhatsApp enquiry forms.
- `assets/styles.css` contains the intentionally plain responsive presentation layer.
- `assets/brand.svg` is a replaceable temporary academy mark.

## Business settings
Update the `site` object in `assets/data.js` to change the academy name, address, phone numbers, WhatsApp number, RC number, website, email and destinations.

## Course management foundation
Each course supports a slug, category, short description, duration, requirements, learning outcomes, certification placeholder, price and featured flag. The structure is ready to be connected to Firebase or another backend/admin dashboard later.

## Important content rule
The initial content is based on the supplied Bishop Marine promotional material. Unknown accreditation bodies, certification issuers, prices, testimonials and detailed visa rules are not fabricated. International pages explicitly avoid employment or visa guarantees.

## Enquiries
The current static forms open a pre-filled WhatsApp message. No applicant database is used yet. A future secure backend can add applications, student accounts, document uploads, course dates, certificates and admin management.

## Deployment
The project is static and can be hosted with GitHub Pages or another static host. No build command is required.
