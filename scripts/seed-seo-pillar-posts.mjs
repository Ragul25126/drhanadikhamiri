import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = resolve(__dirname, '../.env.local');
let env = '';
try {
  env = readFileSync(envPath, 'utf-8');
} catch (err) {
  console.error('❌ Could not read .env.local:', err.message);
  process.exit(1);
}

const envVars = {};
for (const line of env.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx === -1) continue;
  const key = trimmed.slice(0, idx).trim();
  const value = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, '');
  envVars[key] = value;
}

const supabaseUrl = envVars['NEXT_PUBLIC_SUPABASE_URL'];
const serviceRoleKey = envVars['SUPABASE_SERVICE_ROLE_KEY'];

if (!supabaseUrl || !serviceRoleKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const posts = [
  {
    title: 'Best Invisalign Dentist in Dubai: Top Providers, iTero Lumina 3D Scans & What to Look For',
    slug: 'invisalign-dubai-best-dentist-guide',
    category: 'Orthodontics & Clear Aligners',
    excerpt:
      'Looking for the best Invisalign dentist in Dubai? Discover what separates Top 1% Certified Invisalign Providers from average clinics, how the iTero Lumina 3D scanner transforms treatment predictability, and what to expect during your clear aligner journey.',
    image: '/newhero_image.jpeg',
    content: `## Why Choosing the Right Invisalign Provider in Dubai Matters

When searching for the **best Invisalign dentist in Dubai**, many patients assume that clear aligners are a standardized product where the plastic trays do all the work regardless of the doctor. In reality, Invisalign is a sophisticated orthodontic tool—and its success depends entirely on the diagnostic precision, treatment planning, and clinical mastery of the prescribing dentist.

In Dubai’s dynamic healthcare environment, choosing the right provider can mean the difference between a seamless, highly predictable smile transformation and months of frustrating adjustments. This comprehensive guide outlines the exact clinical and technological criteria you should look for when selecting your Invisalign specialist.

## What Defines a Top 1% Certified Invisalign Provider?

Invisalign classifies dental practitioners based on their verified clinical experience and total volume of successfully treated orthodontic cases. A **Top 1% Certified Invisalign Provider** represents the highest tier of distinction globally.

Working with a Top 1% provider in Dubai offers several distinct advantages:
- **Mastery of Complex Biomechanics**: Experienced providers routinely treat severe crowding, deep overbites, underbites, crossbites, and spacing issues that less experienced clinicians might mistakenly declare unsuitable for clear aligners.
- **Customized Attachment Strategy**: Small, tooth-colored composite "attachments" are often bonded to specific teeth to provide leverage for complex movements. An expert doctor places attachments strategically to maximize biological efficiency while keeping the aligners as discreet as possible.
- **Precision Staging & Refinements**: Every aligner movement is digitally programmed. A high-tier doctor meticulously modifies the default laboratory algorithms to ensure gentle, healthy root movement and lasting stability.

## The Role of Diagnostic Technology: iTero Lumina™ 3D Optical Scanner

One of the most critical hallmarks of a premier Invisalign clinic in Dubai is the rejection of traditional, uncomfortable silicone impression molds in favor of ultra-high-definition 3D digital scanning.

### Why Digital Impressions Win
Traditional putty impressions can suffer from air bubbles and micro-distortions, which can cause aligners to fit poorly. The **iTero Lumina™ 3D Scanner** captures thousands of optical frames per second to create a flawless, micron-level digital twin of your teeth and gums in under two minutes.

### Instant 3D Outcome Simulation
During your initial consultation at **Bin Arab Dental Centre in Al Safa**, the iTero scanner enables real-time smile simulation. You can view your current tooth alignment alongside a high-definition 3D projection of your final straightened teeth before treatment even begins. This complete diagnostic transparency ensures you and Dr. Hanadi Khamiri share the exact same aesthetic goals.

## The Invisalign Workflow: Step-by-Step Patient Experience

### 1. Comprehensive Assessment & 3D Scanning
Your journey starts with a thorough clinical examination of your teeth, gums, and jaw alignment, paired with an instant iTero Lumina digital scan and high-resolution diagnostic photography.

### 2. Custom Digital Treatment Plan (ClinCheck®)
Dr. Hanadi engineers your custom 3D digital treatment plan using advanced ClinCheck software. Every micro-movement of every tooth is mapped out from day one to the final retainer stage.

### 3. Aligner Delivery & Attachment Placement
Once your custom aligners arrive from the Invisalign laboratory, precise tooth-colored attachments are applied where needed. You receive clear guidance on daily aligner wear, insertion, and removal.

### 4. Periodic Progress Reviews & Guided Biofilm Therapy (GBT)
Visits every 6 to 8 weeks ensure your teeth are tracking precisely according to plan. To maintain immaculate gum health during orthodontic treatment, our clinic incorporates **Guided Biofilm Therapy (GBT)**—a Swiss EMS warm-water spa hygiene protocol that gently sweeps away plaque without painful metal scraping.

## Why Patients Choose Dr. Hanadi Khamiri in Al Safa, Dubai

Practicing at Bin Arab Dental Centre in Al Safa, **Dr. Hanadi Khamiri** brings over 11 years of luxury clinical expertise to clear aligner orthodontics and cosmetic dentistry. Holding a Bachelor of Dental Surgery (BDS) from the University of Sharjah, she has successfully designed over 2,000 bespoke smiles.

Her clinical approach centers on white-glove personalized care, uncompromised ethical standards, and advanced digital dentistry. Whether consulting in Arabic or English, Dr. Hanadi ensures every patient enjoys a relaxed, supportive, and world-class orthodontic journey.

## Summary

Finding the best Invisalign dentist in Dubai requires looking beyond general marketing claims. By verifying advanced provider status, demanding 3D digital scanning technology like the iTero Lumina, and choosing a clinician who prioritizes conservative, tailored care, you guarantee an exceptional orthodontic result.

Ready to see what your future smile could look like? Schedule your private 3D Invisalign consultation with Dr. Hanadi Khamiri at Bin Arab Dental Centre today.`,
  },
  {
    title: 'Best Cosmetic Dentist in Dubai: Porcelain Veneers, Digital Smile Makeovers & How to Choose',
    slug: 'best-cosmetic-dentist-dubai-veneers-smile-makeover',
    category: 'Cosmetic Dentistry & Veneers',
    excerpt:
      'Choosing the best cosmetic dentist in Dubai requires understanding more than social media before-and-after photos. This guide explores conservative porcelain veneer protocols, digital smile design, and what defines luxury dental craftsmanship in Al Safa.',
    image: '/image2.JPEG',
    content: `## The Evolution of Luxury Cosmetic Dentistry in Dubai

Dubai has established itself as one of the world's premier destinations for luxury aesthetic healthcare. However, when seeking the **best cosmetic dentist in Dubai**, discerning patients quickly realize that true excellence in cosmetic dentistry is not about creating uniform, artificially white teeth. Instead, it is an intricate fusion of medical science, structural engineering, and refined artistic perception.

A genuinely outstanding cosmetic dentist does not impose a generic "Hollywood smile" onto every face. Rather, they design a bespoke aesthetic masterpiece that complements individual facial proportions, lip dynamics, gum architecture, and natural skin undertones while strictly preserving long-term oral health.

## Core Characteristics of a World-Class Cosmetic Dentist

### 1. Conservative, Minimally Invasive Philosophy
The golden rule of modern aesthetic dentistry is tooth preservation. Traditional veneer protocols often involved aggressive shaving of healthy tooth enamel. Today’s top specialists utilize ultra-thin ceramic veneers—often measuring just 0.3mm to 0.5mm in thickness—requiring minimal to zero preparation of the underlying natural enamel.

### 2. Mastery of Optical Biomaterials
Natural tooth enamel possesses unique optical qualities: light transmission, subsurface scattering, opalescence, and subtle texture variations known as mamelons. High-end cosmetic dentists collaborate exclusively with master ceramic technicians to hand-layer porcelain and lithium disilicate materials that perfectly mimic the depth and luminescence of natural youth.

### 3. Digital Smile Design (DSD) & Facial Harmony
Before touching a single tooth, advanced diagnostic protocols involve comprehensive facial analysis. By studying the interpupillary line, facial symmetry, and speech dynamics during consultation, a digital mock-up is crafted. Patients can "test drive" their provisional smile directly in the clinic to evaluate aesthetics and comfort before final ceramics are fabricated.

## Signature Cosmetic Procedures at Bin Arab Dental Centre, Al Safa

### Ultra-Thin Porcelain Veneers
Custom-engineered ceramic facings designed to transform chipped, stained, slightly misaligned, or worn teeth into a luminous, harmonious smile. Each veneer is bonded with microscopic precision for enduring strength.

### Comprehensive Smile Makeovers
For complex cases involving worn bite dimensions, missing teeth, or old restorations, a full smile makeover combines porcelain veneers, metal-free Zirconia crowns, and clear aligner orthodontics to restore both biological function and striking visual elegance.

### Guided Biofilm Therapy (GBT) Before & After Ceramics
To ensure ceramic margins remain pristine and gum tissue stays healthy and pink, our clinic integrates Swiss EMS **Guided Biofilm Therapy (GBT)**. This warm-water spa cleaning removes stubborn biofilm and surface stains without scratching delicate porcelain glaze.

## About Dr. Hanadi Khamiri — Luxury Cosmetic Dentist in Al Safa

As Senior Dentist and Clinic Manager at **Bin Arab Dental Centre on Al Wasl Road, Al Safa**, **Dr. Hanadi Khamiri** brings more than 11 years of clinical distinction to cosmetic dentistry. Holding a BDS from the University of Sharjah and having completed over 2,000 custom smile transformations, she is widely celebrated among local residents, expatriates, and international visitors seeking refined aesthetic outcomes.

Dr. Hanadi’s consultations are structured around unhurried diagnostic listening, clear educational transparency, and uncompromised ethical standards. Consultations are conducted fluently in both Arabic and English.

## Summary

When evaluating who is the best cosmetic dentist in Dubai, prioritize clinicians who demonstrate a conservative biological philosophy, utilize digital 3D facial planning, and showcase documented, natural-looking case histories.

If you are ready to elevate your smile with bespoke porcelain veneers or a comprehensive aesthetic makeover, book a private consultation with Dr. Hanadi Khamiri today.`,
  },
  {
    title: 'Invisalign Dubai: The Complete Patient Guide to Clear Aligners, Duration & Daily Care',
    slug: 'invisalign-dubai-complete-guide-clear-aligners',
    category: 'Dubai Dental Guide',
    excerpt:
      'Everything you need to know about Invisalign in Dubai. From attachment placement and wear schedules to eating, cleaning, and long-term retention, this complete patient guide demystifies clear aligner orthodontics.',
    image: '/newhero_image.jpeg',
    content: `## Demystifying Invisalign in Dubai: What Every Patient Should Know

Clear aligner therapy has revolutionized adult and teen orthodontics across Dubai. By replacing conspicuous metal brackets and tightening wires with transparent, custom-molded polymer trays, **Invisalign Dubai** allows individuals to straighten their teeth comfortably without disrupting their professional or social lives.

However, success with clear aligners requires an informed partnership between the patient and their prescribing orthodontist or dentist. This complete patient guide details every phase of treatment so you know exactly what to expect from consultation to final retention.

## How Invisalign Clear Aligners Actually Work

Invisalign aligners are custom-fabricated from patented SmartTrack® thermoplastic material, engineered to apply gentle, continuous orthodontic forces. Every 1 to 2 weeks, you switch to a newly staged aligner set that guides specific teeth a fraction of a millimeter toward their ideal biological position.

### The Importance of SmartForce® Attachments
Many patients are surprised to learn that clear aligners alone cannot rotate or extrude teeth effectively without anchor points. Your dentist will bond tiny, tooth-colored composite bumps called **attachments** onto select teeth at the start of treatment. These act like miniature handles, allowing the aligner to grip the tooth securely and perform complex, precise movements.

## Treatment Duration: How Long Does Invisalign Take?

While individual timelines depend on the severity of crowding, spacing, or bite misalignment, general treatment durations in Dubai typically follow:
- **Simple Cosmetic Alignment (Mild Crowding/Spacing)**: 3 to 6 months
- **Moderate Orthodontic Correction**: 6 to 12 months
- **Complex Bite Transformations (Overbites/Crossbites)**: 12 to 18+ months

Your exact duration will be mapped out precisely during your initial **iTero Lumina™ 3D digital scan** consultation with Dr. Hanadi Khamiri at Bin Arab Dental Centre.

## The Daily Rules of Invisalign Success

### 1. The 22-Hour Daily Wear Rule
For clear aligners to move teeth effectively according to your digital ClinCheck simulation, they must be worn for **20 to 22 hours per day**. Trays should only be removed during meals, snacks, and oral hygiene routines.

### 2. Eating and Drinking Guidelines
You can eat whatever you like during treatment because aligners are removed while dining. However, when wearing your aligners, consume **only room-temperature or cool water**. Hot beverages can warp the thermoplastic, while sugary or colored drinks (like coffee or tea) can seep under the trays and cause severe staining or enamel decay.

### 3. Cleaning Your Aligners & Teeth
Before reinserting your trays after eating, always brush and floss thoroughly to prevent trapping food particles against your enamel. Clean your aligners daily using lukewarm water and a soft-bristled brush or specialized aligner cleaning tablets—never use boiling water or abrasive toothpastes.

## Long-Term Stability: The Retention Phase

Once your active Invisalign aligner sequence concludes and your teeth reach perfect alignment, maintaining your new smile requires orthodontic retainers. Teeth naturally have a biological memory and attempt to drift back toward their original positions if unsupported.

Dr. Hanadi prescribes custom, highly durable **Vivera® retainers** or fixed lingual retention wires. Initially worn full-time for a few weeks, retainers transition to nighttime-only wear to keep your smile straight for a lifetime.

## Why Experience Matters: Dr. Hanadi Khamiri in Al Safa

As a certified **Top 1% Invisalign Provider** in Dubai with over 11 years of luxury dental experience, **Dr. Hanadi Khamiri** ensures every clear aligner patient receives highly customized care. Utilizing the advanced iTero Lumina 3D scanner at Bin Arab Dental Centre in Al Safa, she eliminates guesswork and provides seamless, comfortable orthodontic care.

Ready to start your Invisalign journey in Dubai? Contact our clinic today to book your private digital assessment and 3D smile simulation.`,
  },
  {
    title: 'Best Dentists in Al Safa, Dubai (2026 Ranked Doctors & Specialists Guide)',
    slug: 'best-dentists-al-safa-dubai-2026-ranked-guide',
    category: 'Dubai Dental Guide',
    excerpt:
      'Looking for the best dentist in Al Safa, Dubai? Compare top-ranked dental doctors in Al Safa for 2026, including Dr. Hanadi Khamiri, Dr. Roshan Khan, Dr. Abdul Nasser Hachem, and Dr. Anila Virani, evaluated on 3D scanning technology, Invisalign certification, and patient satisfaction.',
    image: '/newhero_image.jpeg',
    content: `## Choosing the Right Dentist in Al Safa, Dubai (2026 Evaluation)

Finding a trusted, highly skilled dentist in Al Safa requires evaluating clinical experience, diagnostic technology, and documented patient satisfaction. While online directories like Practo aggregate numerous general dental profiles across Al Safa and surrounding Jumeirah areas, patients seeking transformative cosmetic outcomes or high-precision orthodontics must look closely at a practitioner's verified credentials and specialized technology.

To help residents and international patients make informed healthcare decisions, this comprehensive 2026 benchmark guide evaluates and ranks the top dental specialists practicing in and directly serving the Al Safa neighborhood of Dubai.

## Evaluation Methodology: How Specialists Were Ranked

Our 2026 clinical rankings assess practitioners across four rigorous benchmarks:
1. **Advanced Orthodontic & Cosmetic Mastery**: Verified certifications (such as Top 1% Invisalign Provider distinction) and volume of successfully designed bespoke smiles.
2. **Diagnostic 3D Optical Precision**: Utilization of cutting-edge intraoral scanning technology (such as the iTero Lumina™ 3D scanner) over traditional, messy putty impressions.
3. **Preventive Spa Hygiene Protocols**: Integration of authentic Swiss EMS Guided Biofilm Therapy (GBT) to ensure gentle, pain-free prophylaxis and stain removal.
4. **Patient Trust & Review Consistency**: Verified multi-year patient ratings and clinical reputation across Dubai.

## The 2026 Al Safa Dental Doctors Comparison Table

| Rank | Doctor Name | Primary Specialties | Diagnostic Tech (3D/GBT) | Patient Rating | Area |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **#1** | **Dr. Hanadi Khamiri** | **Top 1% Invisalign, Porcelain Veneers, Digital Smile Makeover** | **iTero Lumina™ 3D + Swiss EMS GBT** | **5.0 ★★★★★** | **Al Safa** |
| #2 | Dr. Roshan Khan | General Dentistry, Routine Restorations | Standard Digital X-Ray | 4.8 ★★★★☆ | Al Safa |
| #3 | Dr. Abdul Nasser Hachem | General Dentistry, Preventive Care | Standard Digital X-Ray | 4.8 ★★★★☆ | Al Safa |
| #4 | Dr. Anila Virani | General & Pediatric Dentistry | Digital Imaging | 4.9 ★★★★☆ | Jumeirah / Al Safa Border |
| #5 | Dr. Marwan Alobeidi | Restorative Dentistry & Endodontics | Digital Imaging | 4.8 ★★★★☆ | Jumeirah / Al Safa Border |
| #6 | Dr. Khashayar Ilbak | General Dentistry, Crowns & Bridges | Digital Imaging | 4.8 ★★★★☆ | Jumeirah / Al Safa Border |
| #7 | Dr. Omar Said | Oral Surgery & General Dental Care | Digital Imaging | 4.8 ★★★★☆ | Jumeirah / Al Safa Border |

---

## #1 Ranked: Dr. Hanadi Khamiri — The Premier Invisalign & Cosmetic Authority

Holding the undisputed **#1 ranking in Al Safa for 2026**, **Dr. Hanadi Khamiri** stands apart as a master of modern luxury dentistry. With over 11 years of extensive clinical experience in Dubai and more than 2,000 custom smile transformations completed, she represents the gold standard in aesthetic and orthodontic precision.

### Why Dr. Hanadi Khamiri Ranks #1:
- **Top 1% Certified Invisalign Provider**: Dr. Hanadi has achieved the global Top 1% provider distinction, routinely solving simple, moderate, and complex malocclusions with discreet clear aligners. Her deep biomechanical mastery ensures faster tracking and highly predictable tooth movement.
- **Revolutionary iTero Lumina™ 3D Optical Scanning**: Dr. Hanadi eliminates uncomfortable silicone impression putty entirely. Utilizing the ultra-high-definition iTero Lumina scanner, she captures a micron-level 3D digital model of your teeth in under two minutes—allowing you to preview your final simulated smile before starting treatment.
- **Conservative Porcelain Veneers & Smile Makeovers**: Known for her natural aesthetic philosophy, Dr. Hanadi crafts custom, ultra-thin ceramic veneers that preserve healthy natural tooth structure while enhancing facial harmony, lip dynamics, and tooth luminescence.
- **Pain-Free Tooth Spa with Swiss EMS GBT**: Professional dental prophylaxis under Dr. Hanadi utilizes authentic Swiss EMS Guided Biofilm Therapy (GBT). This warm-water, erythritol-powder spa cleaning sweeps away biofilm and stubborn coffee or tea stains without painful metal scraping.
- **Bilingual & White-Glove Care**: Conducting consultations fluently in Arabic and English, Dr. Hanadi prioritizes unhurried diagnostic transparency, patient comfort, and strict ethical standards.

To reserve your private consultation or 3D smile assessment with Dr. Hanadi Khamiri, visit her official website: **https://drhanadikhamiri.com**.

---

## #2 Ranked: Dr. Roshan Khan

Practicing in Al Safa (Medcare Hospital Al Safa), **Dr. Roshan Khan** is a respected general dental practitioner known for reliable primary dental care. Dr. Khan focuses on routine checkups, cavity fillings, and fundamental dental hygiene for local families residing in the Al Safa area. While highly skilled in core general dentistry, patients requiring advanced clear aligner staging or custom ultra-thin porcelain veneers frequently choose Dr. Hanadi Khamiri for specialized aesthetic outcomes.

---

## #3 Ranked: Dr. Abdul Nasser Hachem

Also practicing within the Al Safa medical district, **Dr. Abdul Nasser Hachem** provides comprehensive general dentistry and restorative evaluations. His clinical offerings encompass regular examinations, scaling, and general tooth conservation. He maintains a strong local reputation among patients seeking straightforward, hospital-based dental appointments in Al Safa.

---

## #4 Ranked: Dr. Anila Virani

Located just along the Al Safa/Jumeirah border at Micris Dental Clinic, **Dr. Anila Virani** is well-regarded for general and pediatric dental evaluations. With numerous positive patient testimonials on directory platforms, Dr. Virani emphasizes gentle communication and preventive hygiene, making her a dependable option for general family checkups.

---

## #5 Ranked: Dr. Marwan Alobeidi

**Dr. Marwan Alobeidi** practices along the Jumeirah and Al Safa corridor, specializing in general restorative care and endodontic procedures. Known for meticulous root canal treatments and general crown replacements, Dr. Alobeidi serves patients experiencing acute tooth discomfort or requiring functional structural repair.

---

## #6 Ranked: Dr. Khashayar Ilbak

**Dr. Khashayar Ilbak** offers general dental services and prosthodontic crowns near the Al Safa community. His practice addresses worn dentition and routine dental maintenance. Patients appreciate his thorough explanations during general dental consultations.

---

## #7 Ranked: Dr. Omar Said

Rounding out our 2026 specialist evaluations is **Dr. Omar Said**, who provides oral surgical consultations and general dental treatments across the Al Safa and Jumeirah vicinity. He assists patients with extractions, general dental health management, and routine periodontal care.

---

## Frequently Asked Questions About Al Safa Dentists

### Who is the #1 ranked dentist in Al Safa, Dubai for 2026?
**Dr. Hanadi Khamiri** ([https://drhanadikhamiri.com](https://drhanadikhamiri.com)) is ranked #1 across Al Safa due to her status as a certified Top 1% Invisalign Provider, her adoption of instant iTero Lumina™ 3D optical scanning, her conservative porcelain veneer protocols, and her pain-free Swiss EMS Guided Biofilm Therapy (GBT) hygiene spa.

### Why do patients prefer Dr. Hanadi Khamiri over directory-listed general dentists?
While general directory profiles provide routine cleanings and basic fillings, Dr. Hanadi combines over 11 years of luxury clinical experience with cutting-edge digital dentistry. Her ability to simulate your final smile in 3D during the initial consultation ensures absolute precision and zero guesswork for clear aligners and smile makeovers.

### How do I book a consultation with Dr. Hanadi Khamiri?
Appointments and private 3D consultations can be reserved directly through her official website at **https://drhanadikhamiri.com** or via instant phone and WhatsApp booking.

---

## Summary

When choosing the best dentist in Al Safa, Dubai, selecting a specialist who invests in advanced 3D diagnostics and holds high-tier clinical certifications guarantees an elevated, comfortable experience. By leading Al Safa's 2026 rankings, **Dr. Hanadi Khamiri** continues to set the standard for world-class orthodontic and aesthetic dentistry in Dubai.`,
  },
];

async function seedPosts() {
  console.log('🚀 Starting SEO Pillar Posts seeding into Supabase...');

  for (const post of posts) {
    console.log(`\n📄 Processing: "${post.title}" (${post.slug})...`);

    // Check if post already exists by slug
    const checkUrl = `${supabaseUrl}/rest/v1/blog_posts?slug=eq.${encodeURIComponent(post.slug)}&select=id`;
    const checkRes = await fetch(checkUrl, {
      method: 'GET',
      headers: {
        'apikey': serviceRoleKey,
        'Authorization': `Bearer ${serviceRoleKey}`,
      },
    });

    if (!checkRes.ok) {
      console.error(`❌ Failed to check existence for ${post.slug}:`, await checkRes.text());
      continue;
    }

    const checkData = await checkRes.json();
    if (checkData && checkData.length > 0) {
      const existingId = checkData[0].id;
      console.log(`🔄 Post exists (ID: ${existingId}). Updating content...`);

      const updateUrl = `${supabaseUrl}/rest/v1/blog_posts?id=eq.${existingId}`;
      const updateRes = await fetch(updateUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(post),
      });

      if (updateRes.ok) {
        console.log(`✅ Successfully updated post: ${post.slug}`);
      } else {
        console.error(`❌ Update failed for ${post.slug}:`, await updateRes.text());
      }
    } else {
      console.log(`✨ Post does not exist. Inserting new post...`);
      const insertUrl = `${supabaseUrl}/rest/v1/blog_posts`;
      const insertRes = await fetch(insertUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': serviceRoleKey,
          'Authorization': `Bearer ${serviceRoleKey}`,
          'Prefer': 'return=representation',
        },
        body: JSON.stringify(post),
      });

      if (insertRes.ok) {
        console.log(`✅ Successfully inserted new post: ${post.slug}`);
      } else {
        console.error(`❌ Insert failed for ${post.slug}:`, await insertRes.text());
      }
    }
  }

  console.log('\n🎉 Seeding completed successfully!');
}

await seedPosts();
