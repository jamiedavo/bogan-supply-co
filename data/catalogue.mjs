export const categories = [
  {
    slug: "mens",
    name: "Men’s",
    description: "Shed sessions. Pie runs. Front-row noise.",
  },
  {
    slug: "womens",
    name: "Women’s",
    description: "Your ute. Your playlist. Your rules.",
  },
  {
    slug: "kids",
    name: "Kids’",
    description: "Small legends. Considerable volume.",
  },
];
const designs = {
  mens: [
    "Shed Department",
    "Pie Run Social Club",
    "Jandals All Year",
    "Local Legend",
    "Garage Radio",
    "Chur Bro",
    "Ute Weekend",
    "Backyard Headliner",
    "Mince & Cheese",
    "Still in the Shed",
    "She’ll Be Right",
    "Cold Start Club",
    "After Hours Garage",
    "Road Trip Regular",
    "Bogan Original",
  ],
  womens: [
    "Shed Queen",
    "Own the Ute",
    "Gumboot Social Club",
    "Yeah Nah",
    "Front Row Regular",
    "Sweet As",
    "Pie Run Passenger",
    "Bach Weekend",
    "Loud & Local",
    "No Sunday Best",
    "Hard Out",
    "Off the Clock",
    "Garage Girl",
    "West Coast Weekend",
    "Bogan Original",
  ],
  kids: [
    "Little Legend",
    "Junior Shed Crew",
    "Mini Roadie",
    "Gumboot Gang",
    "Snack Run",
    "Little Chur",
    "Backyard Explorer",
    "Tiny Headliner",
    "Co-Pilot",
    "Muddy Weekend",
    "Small but Loud",
    "Early Start Club",
    "Junior Garage",
    "Bach Kid",
    "Bogan Original",
  ],
};
export const colours = {
  Bitumen: "#242422",
  Bone: "#e6dfce",
  "Washed red": "#89483e",
};
const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
export const products = categories.flatMap((category, categoryIndex) =>
  designs[category.slug].map((design, i) => {
    const type = i < 10 ? "t-shirt" : "hoodie";
    const isKid = category.slug === "kids";
    const id = categoryIndex * 15 + i + 1;
    return {
      id,
      slug: `${category.slug}-${slugify(design)}-${type}`,
      category: category.slug,
      type,
      design,
      name: `${design} ${type === "t-shirt" ? "T-shirt" : "Hoodie"}`,
      price: isKid
        ? type === "t-shirt"
          ? 29
          : 59
        : type === "t-shirt"
          ? 45
          : 89,
      sku: `BSC-${category.slug.toUpperCase()}-${String(i + 1).padStart(2, "0")}`,
      sizes: isKid
        ? ["2", "4", "6", "8", "10", "12", "14"]
        : category.slug === "womens"
          ? ["XS", "S", "M", "L", "XL", "2XL"]
          : ["S", "M", "L", "XL", "2XL", "3XL"],
      colours: ["Bitumen", "Bone", "Washed red"],
      description: `${design}. ${isKid ? "For the next generation of Kiwi legends." : "For a very New Zealand kind of weekend."}`,
      details:
        type === "t-shirt"
          ? "Proposed regular-fit cotton tee with a crew neck and original front print."
          : "Proposed relaxed-fit fleece hoodie with a front pouch and original chest print.",
      featured: i === 0 || i === 10,
      printStyle: i % 3,
    };
  }),
);
export const formatMoney = (value) =>
  new Intl.NumberFormat("en-NZ", { style: "currency", currency: "NZD" }).format(
    value,
  );
export const getProduct = (slug) =>
  products.find((product) => product.slug === slug);
