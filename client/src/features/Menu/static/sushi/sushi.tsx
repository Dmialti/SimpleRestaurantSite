import type { DishItemProps } from "../../components/DishItem/DishItem";

const makiList: DishItemProps[] = [
  {
    name: "Spicy Tuna Maki",
    description:
      "A tantalizing blend of spicy tuna, cucumber, and avocado, harmoniously rolled in nori and seasoned rice.",
    price: 5,
    imageSrc: "/MenuPageMaterials/sushi/spicyTunaMaki.png",
  },
  {
    name: "Mango Maki",
    description:
      "Tempura-fried shrimp, cucumber, and cream cheese embrace a center of fresh avocado, delivering a satisfying contrast of textures.",
    price: 5,
    imageSrc: "/MenuPageMaterials/sushi/mangoMaki.png",
  },
  {
    name: "Salmon Maki",
    description:
      "Shiitake mushrooms, avocado, and pickled daikon radish nestle within a roll of seasoned rice, coated with nutty sesame seeds.",
    price: 5,
    imageSrc: "/MenuPageMaterials/sushi/salmonMaki.png",
  },
  {
    name: "Tuna Maki",
    description:
      "A vibrant assortment of julienned carrots, bell peppers, and cucumber, tightly encased in a nori-wrapped rice roll.",
    price: 5,
    imageSrc: "/MenuPageMaterials/sushi/tunaMaki.png",
  },
];

const uraMakiList: DishItemProps[] = [
  {
    name: "Volcano Delight",
    description:
      "Creamy crab salad, avocado, and cucumber rolled inside, topped with spicy tuna and drizzled with fiery sriracha sauce.",
    price: 12,
    imageSrc: "/MenuPageMaterials/sushi/volcanoDelight.png",
  },
  {
    name: "Rainbow Fusion",
    description:
      "A colorful blend of fresh tuna, salmon, yellowtail, and avocado, enveloping a core of cucumber and crab stick.",
    price: 12,
    imageSrc: "/MenuPageMaterials/sushi/rainbowFusion.png",
  },
  {
    name: "Dragon Elegance",
    description:
      "Grilled eel and avocado nestled within the roll, draped with slices of ripe avocado resembling dragon scales.",
    price: 12,
    imageSrc: "/MenuPageMaterials/sushi/dragonElegance.png",
  },
  {
    name: "Sunset Serenity",
    description:
      "Tempura shrimp, cucumber, and spicy mayo embraced by a roll of soy paper, crowned with slices of creamy mango.",
    price: 12,
    imageSrc: "/MenuPageMaterials/sushi/sunsetSerenity.png",
  },
  {
    name: "Mystic Garden",
    description:
      "Shiitake mushrooms, asparagus, and cucumber intermingle with crispy tempura bits, blanketed by a layer of sesame seeds.",
    price: 12,
    imageSrc: "/MenuPageMaterials/sushi/mysticGarden.png",
  },
  {
    name: "Ocean Breeze",
    description:
      "A medley of fresh shrimp, crab stick, and avocado, laced with a gentle touch of zesty yuzu-infused tobiko.",
    price: 12,
    imageSrc: "/MenuPageMaterials/sushi/oceanBreeze.png",
  },
  {
    name: "Tokyo Blossom",
    description:
      "Delicate pink soy paper envelopes a blend of tuna, crab stick, and cucumber, embellished with edible flower petals.",
    price: 12,
    imageSrc: "/MenuPageMaterials/sushi/tokyoBlossom.png",
  },
];

const specialRollsList: DishItemProps[] = [
  {
    name: "Sunrise Bliss",
    description:
      "A delicate combination of fresh salmon, cream cheese, and asparagus, rolled in orange-hued tobiko for a burst of sunrise-inspired flavors.",
    price: 16,
    imageSrc: "/MenuPageMaterials/sushi/sunriseBliss.png",
  },
  {
    name: "Mango Tango Fusion",
    description:
      "Tempura shrimp, cucumber, and avocado dance alongside sweet mango slices, drizzled with a tangy mango sauce.",
    price: 16,
    imageSrc: "/MenuPageMaterials/sushi/mangoTangoFusion.png",
  },
  {
    name: "Truffle Indulgence",
    description:
      "Decadent slices of black truffle grace a roll of succulent wagyu beef, cucumber, and microgreens, culminating in an exquisite umami symphony.",
    price: 16,
    imageSrc: "/MenuPageMaterials/sushi/truffleIndulgence.png",
  },
  {
    name: "Pacific Firecracker",
    description:
      "Spicy crab salad, tempura shrimp, and jalapeño peppers combine in a fiery ensemble, accented with a chili-infused aioli.",
    price: 16,
    imageSrc: "/MenuPageMaterials/sushi/pacificFirecracker.png",
  },
  {
    name: "Eternal Eel Enchantment",
    description:
      "An enchanting blend of eel tempura, foie gras, and cucumber, elegantly layered with truffle oil and gold leaf for a touch of opulence.",
    price: 16,
    imageSrc: "/MenuPageMaterials/sushi/eternalEelEnchantment.png",
  },
];

const sushi = { makiList, uraMakiList, specialRollsList };

export default sushi;
