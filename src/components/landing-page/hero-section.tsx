"use client";

import { ArrowRight, Shield, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";

const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden">
      {/* Background with animated mesh gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>

      {/* Floating geometric shapes with mouse interaction */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating orb */}
        <div
          className="absolute w-96 h-96 bg-gradient-to-br from-primary/20 via-primary-glow/10 to-transparent rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            top: "10%",
            left: "15%",
            transform: `translate(${mousePosition.x * 100}px, ${
              mousePosition.y * 50
            }px) scale(${1 + mousePosition.x * 0.1})`,
            opacity: isVisible ? 0.6 : 0,
          }}
        />

        {/* Medium floating shapes */}
        <div
          className="absolute w-64 h-64 bg-gradient-to-br from-accent/30 via-accent/10 to-transparent rounded-full blur-2xl transition-all duration-700 ease-out"
          style={{
            top: "60%",
            right: "20%",
            transform: `translate(${-mousePosition.x * 80}px, ${
              -mousePosition.y * 60
            }px) rotate(${mousePosition.x * 45}deg)`,
            opacity: isVisible ? 0.4 : 0,
          }}
        />

        {/* Small accent shapes */}
        <div
          className="absolute w-32 h-32 bg-gradient-to-br from-primary-glow/40 to-primary/20 rounded-full blur-xl transition-all duration-500 ease-out"
          style={{
            top: "30%",
            right: "10%",
            transform: `translate(${mousePosition.x * 60}px, ${
              mousePosition.y * 40
            }px)`,
            opacity: isVisible ? 0.8 : 0,
          }}
        />

        {/* Additional floating elements */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm transition-all duration-300 ease-out"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
              transform: `translate(${mousePosition.x * (30 + i * 10)}px, ${
                mousePosition.y * (20 + i * 5)
              }px)`,
              opacity: isVisible ? 0.6 : 0,
              animationDelay: `${i * 0.2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content with staggered animations */}
          <div
            className={`space-y-8 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="space-y-6">
              <div
                className={`inline-flex items-center px-6 py-3 bg-primary/10 backdrop-blur-sm rounded-full text-primary font-medium border border-primary/20 transition-all duration-700 ease-out hover:text-black ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0.2s" }}
              >
                <Shield className="w-5 h-5 mr-3" />
                Livraison sécurisée avec accusé de réception
              </div>

              <h1
                className={`text-5xl lg:text-7xl font-bold leading-tight transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0.4s" }}
              >
                Gérez vos
                <span className="bg-gradient-primary bg-clip-text text-transparent block lg:inline">
                  {" "}
                  livraisons{" "}
                </span>
                en toute confiance
              </h1>

              <p
                className={`text-xl text-muted-foreground max-w-lg leading-relaxed transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0.6s" }}
              >
                Suivez vos colis en temps réel, obtenez des accusés de réception
                automatiques et garantissez la sécurité de vos envois avec notre
                plateforme intelligente.
              </p>
            </div>

            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.8s" }}
            >
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-all duration-300 group hover:scale-105"
              >
                Commencer maintenant
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover:bg-green-300 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                Voir la démo
              </Button>
            </div>

            {/* Animated stats */}
            <div
              className={`flex flex-wrap gap-12 pt-8 transition-all duration-700 ease-out ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "1s" }}
            >
              {[
                { value: "99.9%", label: "Fiabilité" },
                { value: "24/7", label: "Support" },
                { value: "10k+", label: "Clients" },
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl font-bold text-primary group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Enhanced cards with glassmorphism */}
          <div
            className={`space-y-6 transition-all duration-1000 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-8"
            }`}
            style={{ transitionDelay: "0.3s" }}
          >
            {[
              {
                icon: MapPin,
                title: "Suivi en temps réel",
                description:
                  "Localisez vos colis à tout moment avec notre système de géolocalisation avancé.",
                gradient: "from-primary to-primary-glow",
                delay: "0.4s",
              },
              {
                icon: Shield,
                title: "Accusés de réception",
                description:
                  "Recevez automatiquement la confirmation de livraison avec signature numérique.",
                gradient: "from-primary to-accent/80",
                delay: "0.6s",
              },
              {
                icon: Clock,
                title: "Livraison rapide",
                description:
                  "Optimisation des itinéraires pour des livraisons plus rapides et efficaces.",
                gradient: "from-primary-glow to-primary",
                delay: "0.8s",
              },
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className={`p-8 bg-card/80 backdrop-blur-xl border border-white/20 shadow-2xl hover:shadow-glow transition-all duration-500 ease-out group hover:scale-105 hover:-translate-y-2 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{
                    transitionDelay: feature.delay,
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                  }}
                >
                  <div className="flex items-start space-x-6">
                    <div
                      className={`bg-gradient-to-br ${feature.gradient} p-4 rounded-2xl shadow-glow group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                    >
                      <IconComponent className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* Subtle animated grid pattern */}
      <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,rgb(59,130,246)_1px,transparent_0)] bg-[size:24px_24px]"></div>
    </section>
  );
};

export default HeroSection;
