import { Product } from "@/interfaces";

export const products: Product[] = [
  {
    id: 1,
    name: "Velador Geométrico Hexagonal",
    price: 15000,
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Velador con diseño geométrico hexagonal, impreso en PLA biodegradable con acabado natural",
    category: "Veladores",
    featured: true,
  },
  {
    id: 2,
    name: "Lámpara Colgante Orgánica",
    price: 25000,
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Lámpara colgante con formas orgánicas inspiradas en la naturaleza, material 100% reciclable",
    category: "Lámparas",
    featured: true,
  },
  {
    id: 3,
    name: "Velador Minimalista Cilíndrico",
    price: 12000,
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Diseño minimalista de bajo impacto ambiental, perfecto para espacios conscientes",
    category: "Veladores",
  },
  {
    id: 4,
    name: "Lámpara de Mesa Paramétrica",
    price: 18000,
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Lámpara de mesa con diseño paramétrico único, optimizada para eficiencia energética",
    category: "Lámparas",
  },
  {
    id: 5,
    name: "Velador Artístico Espiral",
    price: 20000,
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Velador con forma espiral que maximiza la difusión de luz LED de bajo consumo",
    category: "Veladores",
  },
  {
    id: 6,
    name: "Lámpara Modular Hexagonal",
    price: 30000,
    image: "/placeholder.svg?height=400&width=400",
    description:
      "Sistema modular sustentable que crece con tus necesidades, reduciendo el consumo",
    category: "Lámparas",
  },
];

export const categories = ["Todos", "Veladores", "Lámparas"];

export const getFeaturedProducts = () => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: string) => {
  if (category === "Todos") return products;
  return products.filter((product) => product.category === category);
};
