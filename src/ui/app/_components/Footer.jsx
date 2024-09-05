import { Link } from "react-router-dom";
import { Button } from "../../Button";

const Footer = () => {
  return (
    <footer className="bg-[#171923] text-white py-10">
      <div className="container mx-auto flex flex-col md:flex-row items-start justify-between">
        {/* Sol Taraf - Logo */}
        <div className="flex flex-col items-start mb-6 md:mb-0">
          <h1 className="text-2xl font-bold text-white mb-4">
            Güven Crewing Agency
          </h1>
        </div>

        {/* Sağ Taraf - Linkler ve İletişim */}
        <div className="flex flex-col md:flex-row items-start gap-12 md:gap-24">
          {/* Linkler */}
          <div className="flex flex-col md:flex-row md:gap-8 mb-6 md:mb-0">
            <div className="flex flex-col gap-2">
              <Link className="hover:underline text-white" to="/">
                Ana Sayfa
              </Link>
              <Link className="hover:underline text-white" to="/hakkimizda">
                Hakkımızda
              </Link>
            </div>
            <div className="flex flex-col gap-2 md:ml-8">
              <Link className="hover:underline text-white" to="/kurumsal">
                Kurumsal Başvuru
              </Link>
              <Link className="hover:underline text-white" to="/hizmetler">
                İş İlanları
              </Link>
              <Link className="hover:underline text-white" to="/iletisim">
                İletişim
              </Link>
            </div>
          </div>

          {/* İletişim Bilgileri */}
          <div className="flex flex-col">
            <h2 className="text-lg font-semibold mb-4">İletişim</h2>
            <p className="mb-2">
              <a
                href="mailto:guvendenizcilik@hotmail.com"
                className="underline text-white"
              >
                guvendenizcilik@hotmail.com
              </a>
            </p>
            <p className="text-white">+90 541 473 75 30</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
