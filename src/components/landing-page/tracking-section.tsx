import { Search, Package, MapPin, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const TrackingSection = () => {
  return (
    <section id="suivi" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Suivez vos{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              colis
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entrez votre numéro de suivi pour connaître l'état de votre
            livraison en temps réel
          </p>
        </div>

        {/* Tracking Input */}
        <div className="max-w-2xl mx-auto mb-16">
          <Card className="p-8 shadow-card">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Entrez votre numéro de suivi (ex: LT123456789)"
                  className="text-lg h-12"
                />
              </div>
              <Button
                size="lg"
                className="bg-gradient-primary hover:shadow-glow transition-smooth"
              >
                <Search className="w-5 h-5 mr-2" />
                Suivre
              </Button>
            </div>
          </Card>
        </div>

        {/* Example Tracking Result */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 shadow-logistics">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">
                  Suivi du colis LT123456789
                </h3>
                <p className="text-muted-foreground">
                  Destination: Paris 75001 • Expéditeur: Lyon 69000
                </p>
              </div>
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full font-medium">
                En cours de livraison
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="space-y-6">
              {/* Step 1 - Completed */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 p-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">Colis expédié</h4>
                    <span className="text-sm text-muted-foreground">
                      Hier, 14:30
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    Le colis a été pris en charge par notre centre de tri à Lyon
                  </p>
                </div>
              </div>

              {/* Step 2 - Completed */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-500 p-2 rounded-full">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">En transit</h4>
                    <span className="text-sm text-muted-foreground">
                      Aujourd'hui, 08:15
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    Le colis est en route vers le centre de distribution de
                    Paris
                  </p>
                </div>
              </div>

              {/* Step 3 - Current */}
              <div className="flex items-start space-x-4">
                <div className="bg-gradient-primary p-2 rounded-full animate-pulse">
                  <Package className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold text-primary">
                      En cours de livraison
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      Aujourd'hui, 11:20
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    Le colis est actuellement en cours de livraison vers votre
                    adresse
                  </p>
                </div>
              </div>

              {/* Step 4 - Pending */}
              <div className="flex items-start space-x-4 opacity-50">
                <div className="bg-muted p-2 rounded-full">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-semibold">Livré</h4>
                    <span className="text-sm text-muted-foreground">
                      Estimation: 13:00
                    </span>
                  </div>
                  <p className="text-muted-foreground">
                    Le colis sera livré à votre adresse avec accusé de réception
                  </p>
                </div>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="mt-8 p-6 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold mb-1">
                    Estimation de livraison
                  </h5>
                  <p className="text-muted-foreground">
                    Aujourd'hui entre 12h00 et 14h00
                  </p>
                </div>
                <Button variant="outline">Modifier l'adresse</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TrackingSection;
