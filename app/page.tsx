"use client";

import type React from "react";
import { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Minus,
  Leaf,
  Menu,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Product, CartItem } from "@/interfaces";
import {
  products,
  categories,
  getFeaturedProducts,
  getProductsByCategory,
} from "@/data/products";

export default function FormaNaviva() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  });
  const { toast } = useToast();

  const featuredProducts = getFeaturedProducts();

  const filteredProducts = getProductsByCategory(selectedCategory);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (cart.length === 0) {
      toast({
        title: "Carrito vacío",
        description: "Agrega productos al carrito antes de realizar el pedido",
        variant: "destructive",
      });
      return;
    }

    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      toast({
        title: "Información incompleta",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    // Crear el formulario dinámicamente y enviarlo
    const form = document.createElement("form");
    form.action = "https://formsubmit.co/alejandro.gon052130@gmail.com";
    form.method = "POST";
    form.style.display = "none";

    // Agregar campos del formulario
    const fields = {
      _subject: `🛒 NUEVO PEDIDO - Forma Nativa - ${customerInfo.name}`,
      Nombre: customerInfo.name,
      Email: customerInfo.email,
      Teléfono: customerInfo.phone,
      Dirección: customerInfo.address || "No especificada",
      Productos: cart
        .map(
          (item) =>
            `${item.name} x${item.quantity} - $${(
              item.price * item.quantity
            ).toLocaleString()}`
        )
        .join("\n"),
      Total: `$${getTotalPrice().toLocaleString()}`,
      Notas: customerInfo.notes || "Ninguna",
      _next: window.location.href,
      _captcha: "false",
    };

    Object.entries(fields).forEach(([key, value]) => {
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);

    toast({
      title: "¡Pedido enviado!",
      description: "Te contactaremos pronto para coordinar la entrega",
    });

    setCart([]);
    setCustomerInfo({
      name: "",
      email: "",
      phone: "",
      address: "",
      notes: "",
    });
  };

  return (
    <div className="min-h-screen bg-cornsilk relative">
      {/* Textura de papel artesanal como la imagen de referencia */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
      url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cfilter id='paperTexture'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' seed='5' stitchTiles='stitch'/%3E%3CfeColorMatrix in='turbulence' type='saturate' values='0'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='%23FEFAE0' filter='url(%23paperTexture)' opacity='0.6'/%3E%3C/svg%3E"),
      url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='paperSpeckles' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='12' cy='8' r='0.4' fill='%23A9B388' opacity='0.4'/%3E%3Ccircle cx='67' cy='15' r='0.3' fill='%235F6F52' opacity='0.3'/%3E%3Ccircle cx='23' cy='25' r='0.5' fill='%23B99470' opacity='0.35'/%3E%3Ccircle cx='89' cy='32' r='0.3' fill='%23A9B388' opacity='0.3'/%3E%3Ccircle cx='45' cy='42' r='0.4' fill='%235F6F52' opacity='0.25'/%3E%3Ccircle cx='78' cy='55' r='0.3' fill='%23B99470' opacity='0.3'/%3E%3Ccircle cx='34' cy='65' r='0.5' fill='%23A9B388' opacity='0.4'/%3E%3Ccircle cx='91' cy='73' r='0.3' fill='%235F6F52' opacity='0.3'/%3E%3Ccircle cx='56' cy='83' r='0.4' fill='%23B99470' opacity='0.25'/%3E%3Ccircle cx='18' cy='91' r='0.3' fill='%23A9B388' opacity='0.35'/%3E%3Cpath d='M5,20 L8,22' stroke='%235F6F52' strokeWidth='0.2' opacity='0.3'/%3E%3Cpath d='M72,38 L75,40' stroke='%23B99470' strokeWidth='0.2' opacity='0.25'/%3E%3Cpath d='M41,58 L44,60' stroke='%23A9B388' strokeWidth='0.2' opacity='0.3'/%3E%3Cpath d='M83,78 L86,80' stroke='%235F6F52' strokeWidth='0.2' opacity='0.25'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23paperSpeckles)'/%3E%3C/svg%3E"),
      radial-gradient(circle at 20% 30%, rgba(95, 111, 82, 0.03) 0%, transparent 60%),
      radial-gradient(circle at 80% 70%, rgba(169, 179, 136, 0.025) 0%, transparent 60%),
      radial-gradient(circle at 50% 50%, rgba(185, 148, 112, 0.02) 0%, transparent 70%)
    `,
          backgroundSize:
            "300px 300px, 120px 120px, 400px 400px, 350px 350px, 500px 500px",
          backgroundBlendMode: "multiply, multiply, normal, normal, normal",
        }}
      ></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/85 backdrop-blur-md z-50 border-b border-olive-light/20 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Forma Nativa Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-olive-dark font-playfair">
                  F<span className="text-alloy-orange">o</span>rma Nativa
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {getTotalItems() > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-olive-dark">
                        {getTotalItems()}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle>Carrito de Compras</SheetTitle>
                    <SheetDescription>
                      Revisa tu pedido antes de enviarlo
                    </SheetDescription>
                  </SheetHeader>

                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingCart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Tu carrito está vacío</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {cart.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-center space-x-4 p-4 bg-lemon-meringue/80 backdrop-blur-sm rounded-lg"
                            >
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                width={60}
                                height={60}
                                className="rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">
                                  {item.name}
                                </h4>
                                <p className="text-olive-dark font-semibold">
                                  ${item.price.toLocaleString()}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="w-8 text-center font-medium">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 bg-transparent"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center text-xl font-bold">
                            <span>Total:</span>
                            <span className="text-olive-dark">
                              ${getTotalPrice().toLocaleString()}
                            </span>
                          </div>
                        </div>

                        <form
                          onSubmit={handleSubmitOrder}
                          className="space-y-4 mt-6"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="name">Nombre *</Label>
                              <Input
                                id="name"
                                value={customerInfo.name}
                                onChange={(e) =>
                                  setCustomerInfo({
                                    ...customerInfo,
                                    name: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="phone">Teléfono *</Label>
                              <Input
                                id="phone"
                                value={customerInfo.phone}
                                onChange={(e) =>
                                  setCustomerInfo({
                                    ...customerInfo,
                                    phone: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <Label htmlFor="email">Email *</Label>
                            <Input
                              id="email"
                              type="email"
                              value={customerInfo.email}
                              onChange={(e) =>
                                setCustomerInfo({
                                  ...customerInfo,
                                  email: e.target.value,
                                })
                              }
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="address">Dirección</Label>
                            <Input
                              id="address"
                              value={customerInfo.address}
                              onChange={(e) =>
                                setCustomerInfo({
                                  ...customerInfo,
                                  address: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor="notes">Notas adicionales</Label>
                            <Textarea
                              id="notes"
                              value={customerInfo.notes}
                              onChange={(e) =>
                                setCustomerInfo({
                                  ...customerInfo,
                                  notes: e.target.value,
                                })
                              }
                              placeholder="Especificaciones especiales, colores preferidos, etc."
                            />
                          </div>
                          <Button
                            type="submit"
                            className="w-full bg-olive-dark hover:bg-russet text-white text-lg py-3"
                          >
                            🛒 Finalizar Compra
                          </Button>
                        </form>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Hamburger Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <SheetHeader>
                    <SheetTitle className="text-olive-dark">Menú</SheetTitle>
                  </SheetHeader>
                  <div className="mt-8 space-y-6">
                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="block text-2xl font-medium text-olive-dark hover:text-alloy-orange transition-colors py-4 border-b border-olive-light/30 w-full text-left">
                          Consultas
                        </button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:max-w-lg">
                        <SheetHeader>
                          <SheetTitle>Consultas</SheetTitle>
                          <SheetDescription>
                            Envíanos tu consulta y te responderemos pronto
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-6">
                          <form
                            action="https://formsubmit.co/alejandro.gon052130@gmail.com"
                            method="POST"
                            className="space-y-4"
                          >
                            <input
                              type="hidden"
                              name="_subject"
                              value="💬 CONSULTA - Forma Nativa"
                            />
                            <input
                              type="hidden"
                              name="_next"
                              value={
                                typeof window !== "undefined"
                                  ? window.location.href
                                  : ""
                              }
                            />
                            <input
                              type="hidden"
                              name="_captcha"
                              value="false"
                            />

                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label htmlFor="contact-name">Nombre</Label>
                                <Input
                                  id="contact-name"
                                  name="name"
                                  placeholder="Tu nombre"
                                  required
                                />
                              </div>
                              <div>
                                <Label htmlFor="contact-email">Email</Label>
                                <Input
                                  id="contact-email"
                                  name="email"
                                  type="email"
                                  placeholder="tu@email.com"
                                  required
                                />
                              </div>
                            </div>
                            <div>
                              <Label htmlFor="contact-subject">Asunto</Label>
                              <Input
                                id="contact-subject"
                                name="subject"
                                placeholder="¿En qué podemos ayudarte?"
                              />
                            </div>
                            <div>
                              <Label htmlFor="contact-message">Mensaje</Label>
                              <Textarea
                                id="contact-message"
                                name="message"
                                placeholder="Escribe tu consulta aquí..."
                                className="h-32"
                                required
                              />
                            </div>
                            <Button
                              type="submit"
                              className="w-full bg-olive-dark hover:bg-russet text-white"
                            >
                              Enviar Consulta
                            </Button>
                          </form>
                        </div>
                      </SheetContent>
                    </Sheet>

                    <Sheet>
                      <SheetTrigger asChild>
                        <button className="block text-2xl font-medium text-olive-dark hover:text-alloy-orange transition-colors py-4 border-b border-olive-light/30 w-full text-left">
                          Contacto
                        </button>
                      </SheetTrigger>
                      <SheetContent side="right" className="w-full sm:max-w-lg">
                        <SheetHeader>
                          <SheetTitle>Contacto</SheetTitle>
                          <SheetDescription>
                            Información de contacto de Forma Nativa
                          </SheetDescription>
                        </SheetHeader>
                        <div className="mt-8 space-y-6">
                          <div className="flex items-center space-x-4">
                            <Mail className="h-6 w-6 text-olive-dark" />
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                Email
                              </h4>
                              <p className="text-gray-600">
                                alejandro.gon052130@gmail.com
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <Phone className="h-6 w-6 text-olive-dark" />
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                Teléfono
                              </h4>
                              <p className="text-gray-600">
                                +54 9 11 1234-5678
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <MapPin className="h-6 w-6 text-olive-dark" />
                            <div>
                              <h4 className="font-semibold text-gray-900">
                                Ubicación
                              </h4>
                              <p className="text-gray-600">
                                Buenos Aires, Argentina
                              </p>
                            </div>
                          </div>
                          <div className="pt-6 border-t border-gray-200">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              Horarios de Atención
                            </h4>
                            <p className="text-gray-600">
                              Lunes a Viernes: 9:00 - 18:00
                            </p>
                            <p className="text-gray-600">
                              Sábados: 10:00 - 14:00
                            </p>
                          </div>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Simple Presentation */}
      <section className="pt-24 pb-16 px-4 relative z-10">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center space-x-2 bg-olive-light/15 backdrop-blur-sm rounded-full px-4 py-2 mb-8">
            <Leaf className="h-4 w-4 text-olive-dark" />
            <span className="text-sm font-medium text-olive-dark">
              Iluminación Sustentable
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-olive-dark mb-8 leading-tight font-playfair">
            F<span className="text-alloy-orange">o</span>rma Nativa
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Creamos veladores y lámparas únicos con impresión 3D sustentable.
            Cada pieza combina diseño moderno con materiales eco-friendly,
            iluminando tu hogar de forma responsable con el planeta.
          </p>
        </div>
      </section>

      {/* Category Filter & Products */}
      <section id="productos" className="py-16 px-4 relative z-10">
        {/* Overlay con fondo laurel green y textura */}
        <div
          className="absolute inset-0 bg-olive-light/75 backdrop-blur-[0.5px]"
          style={{
            backgroundImage: `
  url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='productSpeckles' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='25' cy='20' r='0.3' fill='%23FEFAE0' opacity='0.5'/%3E%3Ccircle cx='75' cy='40' r='0.4' fill='%23F9EBC7' opacity='0.4'/%3E%3Ccircle cx='50' cy='60' r='0.3' fill='%235F6F52' opacity='0.3'/%3E%3Ccircle cx='80' cy='80' r='0.4' fill='%23FEFAE0' opacity='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23productSpeckles)'/%3E%3C/svg%3E")
`,
            backgroundSize: "150px 150px, 80px 80px",
            backgroundBlendMode: "multiply, normal",
          }}
        ></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-cornsilk mb-4 font-playfair">
              Nuestros Productos
            </h2>
            <div className="flex justify-center space-x-2 mt-8">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-russet hover:bg-russet/90 text-white backdrop-blur-sm border-2 border-russet shadow-lg"
                      : "border-2 border-cornsilk text-cornsilk hover:bg-russet hover:text-white hover:border-russet backdrop-blur-sm bg-white/10 transition-all duration-300"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white/95 backdrop-blur-sm border-2 border-white/50 hover:border-russet/30"
              >
                <div className="aspect-square relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2 p-4">
                  <CardTitle className="text-base group-hover:text-olive-dark transition-colors font-playfair">
                    {product.name}
                  </CardTitle>
                  <CardDescription className="text-sm line-clamp-2">
                    {product.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-olive-dark">
                      ${product.price.toLocaleString()}
                    </span>
                    <Button
                      onClick={() => addToCart(product)}
                      size="sm"
                      className="bg-russet hover:bg-russet/90 text-white border-2 border-russet hover:border-russet/70 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      Agregar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-olive-dark text-white py-12 px-4 relative z-10 overflow-hidden">
        <div
          className="absolute inset-0 bg-olive-dark"
          style={{
            backgroundImage: `
  url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='footerSpeckles' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='15' cy='15' r='0.3' fill='%23A9B388' opacity='0.4'/%3E%3Ccircle cx='85' cy='25' r='0.4' fill='%23FEFAE0' opacity='0.3'/%3E%3Ccircle cx='45' cy='45' r='0.3' fill='%23F9EBC7' opacity='0.35'/%3E%3Ccircle cx='75' cy='65' r='0.4' fill='%23A9B388' opacity='0.3'/%3E%3Ccircle cx='25' cy='85' r='0.3' fill='%23FEFAE0' opacity='0.4'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23footerSpeckles)'/%3E%3C/svg%3E")
`,
            backgroundSize: "180px 180px, 90px 90px",
            backgroundBlendMode: "multiply, normal",
          }}
        ></div>
        <div className="container mx-auto relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-12 h-12 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Forma Nativa Logo"
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-olive-light font-playfair">
                F<span className="text-alloy-orange">o</span>rma Nativa
              </h2>
              <p className="text-cornsilk/80">
                Iluminación Sustentable & Diseño
              </p>
            </div>
          </div>
          <div className="text-center text-cornsilk/70">
            <p>
              © 2024{" "}
              <span className="text-alloy-orange font-semibold">
                Forma Nativa
              </span>
              . Todos los derechos reservados.
            </p>
            <p className="mt-2">
              Diseñado con <span className="text-alloy-orange">💚</span> para un
              futuro más{" "}
              <span className="text-alloy-orange font-medium">sustentable</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
