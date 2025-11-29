import 'dotenv/config';
import { PrismaClient } from './generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';

// Initialize the adapter with the connection string from env
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
// Pass the adapter to the PrismaClient
const prisma = new PrismaClient({ adapter });

const makiList = [
  {
    name: 'Spicy Tuna Maki',
    description:
      'A tantalizing blend of spicy tuna, cucumber, and avocado, harmoniously rolled in nori and seasoned rice.',
    price: 5,
    imageSrc: '/MenuPageMaterials/sushi/spicyTunaMaki.png',
  },
  {
    name: 'Mango Maki',
    description:
      'Tempura-fried shrimp, cucumber, and cream cheese embrace a center of fresh avocado, delivering a satisfying contrast of textures.',
    price: 5,
    imageSrc: '/MenuPageMaterials/sushi/mangoMaki.png',
  },
  {
    name: 'Salmon Maki',
    description:
      'Shiitake mushrooms, avocado, and pickled daikon radish nestle within a roll of seasoned rice, coated with nutty sesame seeds.',
    price: 5,
    imageSrc: '/MenuPageMaterials/sushi/salmonMaki.png',
  },
  {
    name: 'Tuna Maki',
    description:
      'A vibrant assortment of julienned carrots, bell peppers, and cucumber, tightly encased in a nori-wrapped rice roll.',
    price: 5,
    imageSrc: '/MenuPageMaterials/sushi/tunaMaki.png',
  },
];

const uraMakiList = [
  {
    name: 'Volcano Delight',
    description:
      'Creamy crab salad, avocado, and cucumber rolled inside, topped with spicy tuna and drizzled with fiery sriracha sauce.',
    price: 12,
    imageSrc: '/MenuPageMaterials/sushi/volcanoDelight.png',
  },
  {
    name: 'Rainbow Fusion',
    description:
      'A colorful blend of fresh tuna, salmon, yellowtail, and avocado, enveloping a core of cucumber and crab stick.',
    price: 12,
    imageSrc: '/MenuPageMaterials/sushi/rainbowFusion.png',
  },
  {
    name: 'Dragon Elegance',
    description:
      'Grilled eel and avocado nestled within the roll, draped with slices of ripe avocado resembling dragon scales.',
    price: 12,
    imageSrc: '/MenuPageMaterials/sushi/dragonElegance.png',
  },
  {
    name: 'Sunset Serenity',
    description:
      'Tempura shrimp, cucumber, and spicy mayo embraced by a roll of soy paper, crowned with slices of creamy mango.',
    price: 12,
    imageSrc: '/MenuPageMaterials/sushi/sunsetSerenity.png',
  },
  {
    name: 'Mystic Garden',
    description:
      'Shiitake mushrooms, asparagus, and cucumber intermingle with crispy tempura bits, blanketed by a layer of sesame seeds.',
    price: 12,
    imageSrc: '/MenuPageMaterials/sushi/mysticGarden.png',
  },
  {
    name: 'Ocean Breeze',
    description:
      'A medley of fresh shrimp, crab stick, and avocado, laced with a gentle touch of zesty yuzu-infused tobiko.',
    price: 12,
    imageSrc: '/MenuPageMaterials/sushi/oceanBreeze.png',
  },
  {
    name: 'Tokyo Blossom',
    description:
      'Delicate pink soy paper envelopes a blend of tuna, crab stick, and cucumber, embellished with edible flower petals.',
    price: 12,
    imageSrc: '/MenuPageMaterials/sushi/tokyoBlossom.png',
  },
];

const specialRollsList = [
  {
    name: 'Sunrise Bliss',
    description:
      'A delicate combination of fresh salmon, cream cheese, and asparagus, rolled in orange-hued tobiko for a burst of sunrise-inspired flavors.',
    price: 16,
    imageSrc: '/MenuPageMaterials/sushi/sunriseBliss.png',
  },
  {
    name: 'Mango Tango Fusion',
    description:
      'Tempura shrimp, cucumber, and avocado dance alongside sweet mango slices, drizzled with a tangy mango sauce.',
    price: 16,
    imageSrc: '/MenuPageMaterials/sushi/mangoTangoFusion.png',
  },
  {
    name: 'Truffle Indulgence',
    description:
      'Decadent slices of black truffle grace a roll of succulent wagyu beef, cucumber, and microgreens, culminating in an exquisite umami symphony.',
    price: 16,
    imageSrc: '/MenuPageMaterials/sushi/truffleIndulgence.png',
  },
  {
    name: 'Pacific Firecracker',
    description:
      'Spicy crab salad, tempura shrimp, and jalapeño peppers combine in a fiery ensemble, accented with a chili-infused aioli.',
    price: 16,
    imageSrc: '/MenuPageMaterials/sushi/pacificFirecracker.png',
  },
  {
    name: 'Eternal Eel Enchantment',
    description:
      'An enchanting blend of eel tempura, foie gras, and cucumber, elegantly layered with truffle oil and gold leaf for a touch of opulence.',
    price: 16,
    imageSrc: '/MenuPageMaterials/sushi/eternalEelEnchantment.png',
  },
];

const articlesData = [
  {
    date: new Date('2023-08-24'),
    header: 'How Qitchen Redefines Flavor Harmony in Every Bite',
    description:
      "Experience an orchestra of tastes as Qitchen's sushi unveils a symphony of perfectly balanced flavors.",
    imageSrc: '/BlogPageMaterials/articles/Image1.png',
  },
  {
    date: new Date('2023-08-24'),
    header: 'Unveiling the Mastery Behind Our Culinary Craftsmanship',
    description:
      "Explore the meticulous artistry and dedication that create Qitchen's renowned sushi perfection.",
    imageSrc: '/BlogPageMaterials/articles/Image2.png',
  },
  {
    date: new Date('2023-08-24'),
    header: 'Journey through Freshness Exquisite Sushi Selection',
    description:
      "Embark on a seafood adventure, guided by Qitchen's fresh and exquisite sushi creations from the sea.",
    imageSrc: '/BlogPageMaterials/articles/Image3.png',
  },
  {
    date: new Date('2023-08-24'),
    header: "Palate with Qitchen's Unsurpassed Sushi Delicacies",
    description:
      "Discover the heights of gastronomic delight as Qitchen's sushi transports you to a new culinary realm.",
    imageSrc: '/BlogPageMaterials/articles/Image4.png',
  },
  {
    date: new Date('2023-08-24'),
    header: 'The Qitchen Experience Beyond Sushi',
    description:
      "Immerse in Qitchen's passion for culinary excellence, where sushi is more than a dish—it's an experience.",
    imageSrc: '/BlogPageMaterials/articles/Image5.png',
  },
];

const commonParagraphs = [
  {
    header: "Unveiling Culinary Artistry: A Journey into Qitchen's Soul",
    content:
      "In a world where dining experiences often blend into the ordinary, Qitchen stands as an emblem of culinary passion redefined. Beyond being a restaurant that serves sushi, Qitchen is an embodiment of dedication, creativity, and a profound love for the art of gastronomy. As you step through its doors, you're not merely entering an eatery; you're immersing yourself in an experience that goes beyond the boundaries of a traditional dining encounter.",
    position: 0,
  },
  {
    header: 'Crafting a Feast for the Senses',
    content:
      "The heart of Qitchen's allure lies in its meticulous attention to every detail, from the selection of ingredients to the presentation of each dish. While renowned for its exceptional sushi, Qitchen's passion for perfection extends to every facet of the culinary journey. The talented chefs curate a symphony of flavors, seamlessly blending textures, colors, and aromas to create a multisensory masterpiece. The ambiance itself speaks of a story where modern elegance meets warmth, inviting patrons to relish not only the food but also the atmosphere that envelopes them. Each dish that graces the table is not just a meal; it's a tale told through taste—a testament to the tireless commitment Qitchen has toward crafting an experience that resonates with food enthusiasts and connoisseurs alike.",
    position: 1,
  },
  {
    header: 'Beyond Sushi: Nurturing Connections',
    content:
      "While the gastronomic delights are undoubtedly the centerpiece, Qitchen goes beyond being a culinary haven. It's a place that fosters connections, where conversations flow as smoothly as the sake, and moments turn into cherished memories. The passionate team at Qitchen believes that dining is an act of bonding—a chance to share joy, laughter, and stories over a beautifully laid table. The Qitchen experience transcends the physical walls of the restaurant. It's an invitation to step out of the ordinary and into a world where passion for food is an art, and every guest is a cherished canvas. Through the symphony of flavors, the artistry of presentation, and the warmth of connection, Qitchen invites you to witness passion personified in every aspect of your dining journey.",
    position: 2,
  },
];

async function main() {
  console.log('Starting seeding...');

  await prisma.paragraph.deleteMany();
  await prisma.article.deleteMany();
  await prisma.dish.deleteMany();
  await prisma.category.deleteMany();
  await prisma.reservation.deleteMany();

  console.log('Cleaned database.');

  const makiCategory = await prisma.category.create({
    data: {
      name: 'Maki',
    },
  });

  for (const dish of makiList) {
    await prisma.dish.create({
      data: {
        name: dish.name,
        description: dish.description,
        price: dish.price,
        imageSrc: dish.imageSrc,
        categoryId: makiCategory.id,
      },
    });
  }
  console.log('Seeded Maki dishes.');

  const uraMakiCategory = await prisma.category.create({
    data: {
      name: 'Uramaki',
    },
  });

  for (const dish of uraMakiList) {
    await prisma.dish.create({
      data: {
        name: dish.name,
        description: dish.description,
        price: dish.price,
        imageSrc: dish.imageSrc,
        categoryId: uraMakiCategory.id,
      },
    });
  }
  console.log('Seeded Uramaki dishes.');

  const specialCategory = await prisma.category.create({
    data: {
      name: 'Special Rolls',
    },
  });

  for (const dish of specialRollsList) {
    await prisma.dish.create({
      data: {
        name: dish.name,
        description: dish.description,
        price: dish.price,
        imageSrc: dish.imageSrc,
        categoryId: specialCategory.id,
      },
    });
  }
  console.log('Seeded Special Rolls.');

  for (const articleData of articlesData) {
    await prisma.article.create({
      data: {
        name: articleData.header,
        publicationDate: articleData.date,
        description: articleData.description,
        imageSrc: articleData.imageSrc,
        paragraphs: {
          create: commonParagraphs.map((para) => ({
            name: para.header,
            content: para.content,
            position: para.position,
          })),
        },
      },
    });
  }
  console.log('Seeded Articles with Paragraphs.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
