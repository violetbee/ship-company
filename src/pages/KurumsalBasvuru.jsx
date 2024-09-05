import React from "react";

const KurumsalBasvuru = () => {
  return (
    <section className="bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">
          Kurumsal Başvuru
        </h2>
        <p className="text-lg text-gray-700 text-center mb-6">
          Kurumsal başvurunuz için gerekli bilgileri eksiksiz olarak doldurmanız
          gerekmektedir. Başvurunuzu tamamlamak için lütfen formu dikkatlice
          doldurun ve gerekli bilgileri eksiksiz olarak sağlayın. Detaylı bilgi
          almak veya başvurunuzu göndermek için
          <strong> [E-posta: guvendenizcilik@hotmail.com] </strong> adresinden
          ya da
          <strong> +90 541 473 75 30</strong> ve telefon numaralarından bize
          ulaşabilirsiniz.
        </p>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Başvuru Formu</h3>
          <p className="text-gray-800 mb-4">
            Lütfen aşağıdaki bilgileri eksiksiz olarak doldurunuz:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            <li>
              <strong>Firma adı:</strong> [Firma adınızı buraya girin]
            </li>
            <li>
              <strong>Adres:</strong> [Adresinizi buraya girin]
            </li>
            <li>
              <strong>Şehir:</strong> İstanbul
            </li>
            <li>
              <strong>Telefon:</strong> [Telefon numaranızı buraya girin]
            </li>
            <li>
              <strong>Fax:</strong> [Fax numaranızı buraya girin]
            </li>
            <li>
              <strong>Web Adresi:</strong> [Web adresinizi buraya girin]
            </li>
            <li>
              <strong>E-mail:</strong> [E-mail adresinizi buraya girin]
            </li>
            <li>
              <strong>İşletmenizdeki gemi sayısı:</strong> [Gemi sayınızı buraya
              girin]
            </li>
          </ul>
          <p className="text-gray-800 mb-4 mt-6">
            <strong>Yetkili Kişi</strong>
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-800">
            <li>
              <strong>Adı:</strong> [Yetkili kişinin adını buraya girin]
            </li>
            <li>
              <strong>Soyadı:</strong> [Yetkili kişinin soyadını buraya girin]
            </li>
            <li>
              <strong>Görevi:</strong> [Yetkili kişinin görevini buraya girin]
            </li>
            <li>
              <strong>Cep tel:</strong> [Yetkili kişinin cep telefonunu buraya
              girin]
            </li>
            <li>
              <strong>E-mail:</strong> [Yetkili kişinin e-mail adresini buraya
              girin]
            </li>
          </ul>
          <p className="text-gray-700 mt-6">
            Lütfen formdaki tüm bilgileri eksiksiz olarak doldurduğunuzdan emin
            olun. Başvurunuzu <strong>guvendenizcilik@hotmail.com</strong>
            e-posta adresine gönderebilir veya
            <strong>+90 541 473 75 30</strong> ve telefon numaralarından bizimle
            iletişime geçebilirsiniz.
          </p>
        </div>
      </div>
    </section>
  );
};

export default KurumsalBasvuru;
