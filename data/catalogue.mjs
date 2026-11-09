// Approved six-product catalogue; the other collections have no products yet.
export const categories = [
  {
    "slug": "petrolheads",
    "name": "Blokes",
    "description": "Six originals. No filler."
  },
  {
    "slug": "rock-dogs",
    "name": "Chicks",
    "description": "Coming soon."
  },
  {
    "slug": "sheilas",
    "name": "Rug rats",
    "description": "Coming soon."
  }
];
export const products = [
  {
    "id": 1201,
    "sku": "BSC-1201",
    "name": "Good Under Pressure",
    "design": "Good Under Pressure",
    "slug": "good-under-pressure",
    "category": "petrolheads",
    "type": "t-shirt",
    "price": 69,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colours": [
      "Bitumen"
    ],
    "image": "/products/blokes/good-under-pressure.webp",
    "description": "Operating normally. Even when everything else isn't.",
    "detailHeading": "OPERATING NORMALLY.",
    "detailParagraphs": [
      "Deadlines, disasters, things going sideways. Some people crack. Others barely move the needle.",
      "A vintage pressure-gauge design for those who keep their cool when the heat is on. No panic. No drama. Just business as usual."
    ],
    "details": "Heavyweight black tee. Fit, fabric and sizing are subject to supplier confirmation.",
    "featured": true
  },
  {
    "id": 1202,
    "sku": "BSC-1202",
    "name": "High Spec",
    "design": "High Spec",
    "slug": "high-spec",
    "category": "petrolheads",
    "type": "t-shirt",
    "price": 69,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colours": [
      "Bitumen"
    ],
    "image": "/products/blokes/high-spec.webp",
    "description": "Field tested. Nothing to prove.",
    "detailHeading": "FIELD TESTED. NOTHING TO PROVE.",
    "detailParagraphs": [
      "High standards. Low tolerance for bullshit. No need for a certificate on the wall.",
      "A vintage engineering-plate design for the bloke who's been put through his paces and still meets spec. No upgrades required."
    ],
    "details": "Heavyweight black tee. Fit, fabric and sizing are subject to supplier confirmation.",
    "featured": true
  },
  {
    "id": 1203,
    "sku": "BSC-1203",
    "name": "Cult Classic",
    "design": "Cult Classic",
    "slug": "cult-classic",
    "category": "petrolheads",
    "type": "t-shirt",
    "price": 69,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colours": [
      "Bitumen"
    ],
    "image": "/products/blokes/cult-classic.webp",
    "description": "Not for everyone. Never was.",
    "detailHeading": "NOT FOR EVERYONE. NEVER WAS.",
    "detailParagraphs": [
      "Never topped the charts. Never followed the crowd. Still has a loyal following.",
      "For the originals, the outsiders and the ones who've only got better with age.",
      "Understated vintage lettering with a quiet nod to legendary status. Some things don't need mainstream approval."
    ],
    "details": "Heavyweight black tee. Fit, fabric and sizing are subject to supplier confirmation.",
    "featured": true
  },
  {
    "id": 1204,
    "sku": "BSC-1204",
    "name": "Shed Certified",
    "design": "Shed Certified",
    "slug": "shed-certified",
    "category": "petrolheads",
    "type": "t-shirt",
    "price": 69,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colours": [
      "Bitumen"
    ],
    "image": "/products/blokes/shed-certified.webp",
    "description": "No qualifications. Highly qualified.",
    "detailHeading": "NO QUALIFICATIONS. HIGHLY QUALIFIED.",
    "detailParagraphs": [
      "Some qualifications come framed. Others come from years of figuring it out in the shed.",
      "An old-school workshop certification design for the ones who can fix, build and make do without making a song and dance about it. Practically approved."
    ],
    "details": "Heavyweight black tee. Fit, fabric and sizing are subject to supplier confirmation.",
    "featured": true
  },
  {
    "id": 1205,
    "sku": "BSC-1205",
    "name": "Headliner",
    "design": "Headliner",
    "slug": "headliner",
    "category": "petrolheads",
    "type": "t-shirt",
    "price": 69,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colours": [
      "Bitumen"
    ],
    "image": "/products/blokes/headliner.webp",
    "description": "Never the support act & always main stage.",
    "detailHeading": "SOME PEOPLE ARE BORN FOR THE MAIN STAGE.",
    "detailParagraphs": [
      "No audition. No warm-up act. No waiting for someone to hand over the spotlight.",
      "For those who live life at full volume, make their own entrance and have never been particularly comfortable in the background.",
      "Bold vintage concert-poster lettering. Rock 'n' roll attitude. Top billing, naturally."
    ],
    "details": "Heavyweight black tee. Fit, fabric and sizing are subject to supplier confirmation.",
    "featured": true
  },
  {
    "id": 1206,
    "sku": "BSC-1206",
    "name": "Full Noise Department",
    "design": "Full Noise Department",
    "slug": "full-noise-department",
    "category": "petrolheads",
    "type": "t-shirt",
    "price": 69,
    "sizes": [
      "S",
      "M",
      "L",
      "XL",
      "2XL",
      "3XL"
    ],
    "colours": [
      "Bitumen"
    ],
    "image": "/products/blokes/full-noise-department.webp",
    "description": "Set to nine. Still being polite.",
    "detailHeading": "SET TO NINE. STILL BEING POLITE.",
    "detailParagraphs": [
      "There's a time and place for restraint. The opening riff of a good song isn't one of them.",
      "A nod to vintage amplifiers, good taste in music and the belief that some things are simply better turned up.",
      "One notch left. Use it wisely."
    ],
    "details": "Heavyweight black tee. Fit, fabric and sizing are subject to supplier confirmation.",
    "featured": true
  }
];
export const colours = { Bitumen: "#242422" };
export const formatMoney = (value) => new Intl.NumberFormat("en-NZ", {style:"currency",currency:"NZD"}).format(value);
export const getProduct = slug => products.find(p=>p.slug===slug);
