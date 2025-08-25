import {
  Truck,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="border-2 border-black p-2 rounded-lg">
                <Truck className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">CorrierPlus</span>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Votre partenaire de confiance pour l'acheminement sécurisé de vos
              colis avec accusés de réception en temps réel.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 cursor-pointer transition-all duration-30 hover:scale-110" />
              <Twitter className="w-5 h-5 cursor-pointer transition-all duration-30 hover:scale-110" />
              <Linkedin className="w-5 h-5 cursor-pointer transition-all duration-30 hover:scale-110" />
              <Instagram className="w-5 h-5 cursor-pointer transition-all duration-30 hover:scale-110" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#accueil"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Accueil
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#suivi"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Suivi de colis
                </a>
              </li>
              <li>
                <a
                  href="#tarifs"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Tarifs
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Livraison express
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Accusés de réception
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Documents sécurisés
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Suivi temps réel
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:font-bold transition-all duration-300 scale-x-50"
                >
                  Support 24/7
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5" />
                <span className="text-primary-foreground/80">
                  Lot : IVL 8 Ankadifotsy, 
                  <br />
                  Antananarivo
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5" />
                <span className="text-primary-foreground/80">
                  +261 34 39 154 28
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5" />
                <span className="text-primary-foreground/80">
                  contact@corrierplus.com
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © {new Date().getFullYear()} CorrierPlus. Tous droits réservés.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-primary-foreground/60 hover:underline transition-all duration-300"
              >
                Politique de confidentialité
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:underline transition-all duration-300"
              >
                Conditions d'utilisation
              </a>
              <a
                href="#"
                className="text-primary-foreground/60 hover:underline transition-all duration-300"
              >
                Mentions légales
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
