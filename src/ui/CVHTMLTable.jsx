export default function CVHTMLTable() {
  return (
    <div className="flex flex-col">
      <div className="canvas_div_pdf w-full" id="canvas_div_pdf">
        <div className="mt-5 flex justify-center">
          <div className="text-center">
            <img
              src="https://www.gemideis.com/assets/img/gemilogo.jpeg"
              className="mx-auto"
              width="100px"
              alt="logo"
            />
            <h1 className="text-2xl font-bold">
              Neta Denizcilik <span>Özgeçmiş</span>
            </h1>
            <h6 className="mt-2">
              Tel: <a href="tel:+90 212 580 90 09">+90 212 580 90 09</a> /{" "}
              <a href="tel:+90 543 301 35 33">+90 543 301 35 33</a> /{" "}
              <a
                target="_blank"
                href="https://api.whatsapp.com/send?phone=+90 543 301 35 35"
              >
                +90 535 301 35 35
              </a>
            </h6>
            <b>
              <a href="https://gemideis.com/">www.gemideis.com</a>
            </b>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center mb-4">
            <h1 className="text-xl font-bold">KİŞİSEL BİLGİLER</h1>
          </div>

          <div className="flex justify-center space-x-4">
            <div className="w-4/5">
              <table className="w-full border border-gray-300">
                <tbody>
                  <tr>
                    <th className="border p-2">Ad Soyad</th>
                    <td className="border p-2">Zeyn Öz</td>
                  </tr>
                  <tr>
                    <th className="border p-2">Adres</th>
                    <td className="border p-2"></td>
                  </tr>
                  <tr>
                    <th className="border p-2">Cep Telefonu</th>
                    <td className="border p-2">
                      <a href="tel:+905444227118">+905444227118</a>
                    </td>
                  </tr>
                  <tr>
                    <th className="border p-2">E-posta</th>
                    <td className="border p-2">
                      <a href="mailto:ozzz83492@gmail.com">
                        ozzz83492@gmail.com
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <th className="border p-2 text-red-500">Yeterlilik</th>
                    <td className="border p-2 font-bold">Diğer</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="w-1/5">
              <img
                src="https://www.gemideis.com/storage//user/bos.png"
                className="w-full h-auto"
                alt="Profil"
              />
            </div>
          </div>

          <div className="mt-4">
            <table className="w-full border border-gray-300">
              <tbody>
                <tr>
                  <th className="border p-2">Doğum Yeri İl</th>
                  <td className="border p-2"></td>
                  <th className="border p-2">Doğum Yeri İlçe</th>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <th className="border p-2">Dogum Tarihi</th>
                  <td className="border p-2"></td>
                  <th className="border p-2">Askerlik Durumu</th>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <th className="border p-2">Kan Grubu</th>
                  <td className="border p-2"></td>
                  <th className="border p-2">Boyu / Kilosu</th>
                  <td className="border p-2"> / </td>
                </tr>
                <tr>
                  <th className="border p-2">Uyruk</th>
                  <td className="border p-2"></td>
                  <th className="border p-2">Ayakkabı No/Tulum Bedeni</th>
                  <td className="border p-2"> / </td>
                </tr>
                <tr>
                  <th className="border p-2">Cinsiyeti</th>
                  <td className="border p-2"></td>
                  <th className="border p-2">Kimlik No</th>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <th className="border p-2">Ssk Sicil No</th>
                  <td className="border p-2"></td>
                  <th className="border p-2">Emeklilik Durumu</th>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">EĞİTİM BİLGİLERİ</h1>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">DİL BİLGİLERİ</h1>
          </div>
          <div className="flex justify-center mt-2">
            <table className="w-full border border-gray-300">
              <tbody>
                <tr>
                  <th className="border p-2">Dil</th>
                  <th className="border p-2">Seviye</th>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">PASAPORT &amp; CÜZDAN</h1>
          </div>
          <div className="flex justify-center mt-2">
            <table className="w-full border border-gray-300">
              <tbody>
                <tr>
                  <th className="border p-2">Gemi Adamı Yeterlilik</th>
                  <td className="border p-2">Diğer</td>
                  <th className="border p-2">Liman Cüzdanı Kart No</th>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <th className="border p-2">Pasaport Tipi</th>
                  <td className="border p-2"></td>
                  <th className="border p-2">Belge No</th>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <th className="border p-2">Pasaport No</th>
                  <td className="border p-2"></td>
                  <th className="border p-2">Polis Vizesi Bitiş</th>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <th className="border p-2">Veren Makam</th>
                  <td className="border p-2"></td>
                  <th className="border p-2">Sağlık Vizesi Bitiş</th>
                  <td className="border p-2"></td>
                </tr>
                <tr>
                  <th className="border p-2">Geçerlilik Tarihi</th>
                  <td className="border p-2"></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">SERTİFİKA BİLGİLERİ</h1>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">GEMİ &amp; İŞ TECRÜBELERİ</h1>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">TERCİH BİLGİLERİ</h1>
          </div>
        </div>

        <div className="mt-4">
          <div className="text-center">
            <h1 className="text-xl font-bold">REFERANSLAR</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
