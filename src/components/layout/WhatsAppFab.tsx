import { WhatsAppIcon } from "@/components/ui/icons";
import { site } from "@/lib/site";

export default function WhatsAppFab() {
  const msg = encodeURIComponent(
    "¡Hola! Estoy interesado en sus percheros decorativos.",
  );
  return (
    <a
      href={`https://wa.me/${site.whatsapp}?text=${msg}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <WhatsAppIcon width={30} height={30} />
    </a>
  );
}
