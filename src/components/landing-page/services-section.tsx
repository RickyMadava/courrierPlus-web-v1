import { Shield, Clock, FileCheck, Truck, Users, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      icon: Shield,
      title: "Accusés de réception",
      description:
        "Confirmation automatique de livraison avec signature électronique et horodatage précis.",
      color: "bg-gradient-primary",
    },
    {
      icon: Clock,
      title: "Livraison express",
      description:
        "Service de livraison rapide avec créneaux horaires personnalisables selon vos besoins.",
      color: "bg-primary",
    },
    {
      icon: FileCheck,
      title: "Documents sécurisés",
      description:
        "Transport sécurisé de documents sensibles avec traçabilité complète et protection renforcée.",
      color: "bg-primary",
    },
    {
      icon: Truck,
      title: "Suivi temps réel",
      description:
        "Géolocalisation en direct de vos colis avec notifications automatiques à chaque étape.",
      color: "bg-gradient-primary",
    },
    {
      icon: Users,
      title: "Support dédié",
      description:
        "Équipe de support disponible 24h/7j pour répondre à toutes vos questions et urgences.",
      color: "bg-primary",
    },
    {
      icon: Globe,
      title: "Livraison nationale",
      description:
        "Couverture complète du territoire français avec délais garantis et tarifs transparents.",
      color: "bg-primary",
    },
  ];

  return (
    <section id="services" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Nos{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              services
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez notre gamme complète de services logistiques conçus pour
            répondre à tous vos besoins d'expédition et de suivi de colis.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="p-8 hover:shadow-logistics transition-smooth cursor-pointer group border-primary/10 hover:border-primary/20"
              >
                <div className="space-y-4">
                  <div
                    className={`${service.color} p-4 rounded-xl w-fit group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold group-hover:text-primary transition-smooth">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Card className="max-w-4xl mx-auto p-12 shadow-logistics bg-gradient-hero text-white">
            <h3 className="text-3xl font-bold mb-4">
              Prêt à optimiser vos livraisons ?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Rejoignez plus de 10 000 entreprises qui font confiance à
              CorrierPlus pour leurs besoins logistiques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-smooth">
                Demander une démo
              </button>
              <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-smooth">
                Contacter un expert
              </button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
