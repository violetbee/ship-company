import React from "react";

const ContactUs = () => {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">İletişim</h2>
        <p className="text-lg text-gray-700 text-center mb-6">
          Bize yazın, en kısa sürede cevap vereceğiz.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Adres Kısmı */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Adres</h3>
            <p className="text-gray-800">Giresun / Türkiye</p>
          </div>

          {/* Telefon Numaraları Kısmı */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">
              Telefon Numaralarımız
            </h3>
            <p className="text-gray-800 mb-2">+90 541 473 75 30</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* E-posta Kısmı */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">E-posta</h3>
            <p className="text-gray-800 mb-2">
              <a
                href="mailto:guvendenizcilik@hotmail.com"
                className="text-blue-600 hover:underline"
              >
                guvendenizcilik@hotmail.com
              </a>
            </p>
            <p className="text-gray-800">
              <a
                href="mailto:kurumsal@example.com"
                className="text-blue-600 hover:underline"
              >
                kurumsal@example.com
              </a>
            </p>
          </div>

          {/* Skype Kısmı */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold mb-4">Skype</h3>
            <p className="text-gray-800">
              <span className="text-blue-600">guvendenizcilik</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
