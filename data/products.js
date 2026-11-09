// Six approved Blokes products. Empty collections stay empty until launch.
export const categories = [
  { slug: "petrolheads", name: "Blokes" },
  { slug: "rock-dogs", name: "Chicks" },
  { slug: "sheilas", name: "Rug rats" },
];
export const products = [
  {
    "id": 1201,
    "sku": "No. 1201",
    "name": "Good Under Pressure",
    "slug": "good-under-pressure",
    "category": "petrolheads",
    "price": 69,
    "image": "/products/blokes/good-under-pressure.webp",
    "graphic": "/products/blokes/good-under-pressure-artwork.png",
    "description": "Operating normally. Even when everything else isn't.",
    "detailHeading": "OPERATING NORMALLY.",
    "detailParagraphs": [
      "Deadlines, disasters, things going sideways. Some people crack. Others barely move the needle.",
      "A vintage pressure-gauge design for those who keep their cool when the heat is on. No panic. No drama. Just business as usual."
    ],
    "featured": true
  },
  {
    "id": 1202,
    "sku": "No. 1202",
    "name": "High Spec",
    "slug": "high-spec",
    "category": "petrolheads",
    "price": 69,
    "image": "/products/blokes/high-spec.webp",
    "graphic": "/products/blokes/high-spec-artwork.png",
    "description": "Field tested. Nothing to prove.",
    "detailHeading": "FIELD TESTED. NOTHING TO PROVE.",
    "detailParagraphs": [
      "High standards. Low tolerance for bullshit. No need for a certificate on the wall.",
      "A vintage engineering-plate design for the bloke who's been put through his paces and still meets spec. No upgrades required."
    ],
    "featured": true
  },
  {
    "id": 1203,
    "sku": "No. 1203",
    "name": "Cult Classic",
    "slug": "cult-classic",
    "category": "petrolheads",
    "price": 69,
    "image": "/products/blokes/cult-classic.webp",
    "graphic": "/products/blokes/cult-classic-artwork.png",
    "description": "Not for everyone. Never was.",
    "detailHeading": "NOT FOR EVERYONE. NEVER WAS.",
    "detailParagraphs": [
      "Never topped the charts. Never followed the crowd. Still has a loyal following.",
      "For the originals, the outsiders and the ones who've only got better with age.",
      "Understated vintage lettering with a quiet nod to legendary status. Some things don't need mainstream approval."
    ],
    "featured": true
  },
  {
    "id": 1204,
    "sku": "No. 1204",
    "name": "Shed Certified",
    "slug": "shed-certified",
    "category": "petrolheads",
    "price": 69,
    "image": "/products/blokes/shed-certified.webp",
    "graphic": "/products/blokes/shed-certified-artwork.png",
    "description": "No qualifications. Highly qualified.",
    "detailHeading": "NO QUALIFICATIONS. HIGHLY QUALIFIED.",
    "detailParagraphs": [
      "Some qualifications come framed. Others come from years of figuring it out in the shed.",
      "An old-school workshop certification design for the ones who can fix, build and make do without making a song and dance about it. Practically approved."
    ],
    "featured": true
  },
  {
    "id": 1205,
    "sku": "No. 1205",
    "name": "Headliner",
    "slug": "headliner",
    "category": "petrolheads",
    "price": 69,
    "image": "/products/blokes/headliner.webp",
    "graphic": "/products/blokes/headliner-artwork.png",
    "description": "Never the support act & always main stage.",
    "detailHeading": "SOME PEOPLE ARE BORN FOR THE MAIN STAGE.",
    "detailParagraphs": [
      "No audition. No warm-up act. No waiting for someone to hand over the spotlight.",
      "For those who live life at full volume, make their own entrance and have never been particularly comfortable in the background.",
      "Bold vintage concert-poster lettering. Rock 'n' roll attitude. Top billing, naturally."
    ],
    "featured": true
  },
  {
    "id": 1206,
    "sku": "No. 1206",
    "name": "Full Noise Department",
    "slug": "full-noise-department",
    "category": "petrolheads",
    "price": 69,
    "image": "/products/blokes/full-noise-department.webp",
    "graphic": "/products/blokes/full-noise-department-artwork.png",
    "description": "Set to nine. Still being polite.",
    "detailHeading": "SET TO NINE. STILL BEING POLITE.",
    "detailParagraphs": [
      "There's a time and place for restraint. The opening riff of a good song isn't one of them.",
      "A nod to vintage amplifiers, good taste in music and the belief that some things are simply better turned up.",
      "One notch left. Use it wisely."
    ],
    "featured": true
  }
];
export const getProduct = (slug) => products.find(p => p.slug === slug);
