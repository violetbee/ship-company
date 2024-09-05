import { useState } from "react";
import Modal from "react-modal";

const PrivacyAgreement = ({ onAgreementChange }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckboxChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onAgreementChange(newChecked);

    // Modalı açma ve kapama durumunu yönet
    if (newChecked) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className="form-checkbox text-blue-500"
        />
        <span className="text-gray-700">
          Gizlilik Sözleşmesi'ni okudum ve kabul ediyorum.
        </span>
      </label>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Gizlilik Sözleşmesi"
        className="flex items-center justify-center p-4 w-full max-w-3xl mx-auto"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl mx-auto p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              Guven Crewing Agency Kişisel Verilerin İşlenmesi Aydınlatma Metni
            </h2>
            <button
              onClick={closeModal}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
          <div className="space-y-4 max-h-[70vh] overflow-y-auto">
            <p className="font-semibold">1. KİŞİSEL VERİ</p>
            <p className="font-semibold">2. Kişisel Veri Tanımı</p>
            <p>
              m.3/I(d) çerçevesinde “kişisel veri”, kimliği belirli veya
              belirlenebilir gerçek kişilere ilişkin her türlü bilgiyi ifade
              eder. Bu kapsamda kişisel veri; belirli veya belirlenebilir gerçek
              bir kişiye ilişkin her türlü bilgiyi ifade etmektedir. Örnek
              olarak; adınız, soyadınız, TC kimlik numaranız, adresiniz, telefon
              numaranız, e-posta adresiniz, doğum tarihiniz, erişimde
              bulunduğunuz IP numarası, yaptığınız işlemlere ait bilgiler, vb.
              size ilişkin bilgiler kişisel verilerinizdir. Ayrıca KVK Kanunu’na
              göre; kişilerin ırkı, etnik kökeni, siyasi düşüncesi, felsefi
              inancı, dini, mezhebi veya diğer inançları, kılık ve kıyafeti,
              dernek, vakıf, sendika, vb. üyelikleri, sağlığı, cinsel hayatı,
              ceza mahkûmiyeti ve güvenlik tedbirleriyle ilgili verileri ile
              biyometrik ve genetik verileri, vb. veriler özel nitelikli kişisel
              verilerdir. Bu kapsamda, anonim bilgiler, anonim hale getirilen
              bilgiler ve belirli bir kişi ile ilişkilendirilemeyen diğer
              veriler Şirketimiz’in bu konudaki Politikası gereği kişisel veri
              olarak kabul edilmez.
            </p>
            <p className="font-semibold">
              1. Kişisel Verilerin İşlenmesi Kavramı
            </p>
            <p>
              KVK Kanunu m.3/I(e) çerçevesinde Kişisel verilerin işlenmesi,
              kişisel verilerin tamamen veya kısmen otomatik olan ya da herhangi
              bir veri kayıt sisteminin parçası olmak kaydıyla otomatik olmayan
              yollarla elde edilmesi, kaydedilmesi, depolanması, muhafaza
              edilmesi, değiştirilmesi, yeniden düzenlenmesi, açıklanması,
              aktarılması, devralınması, elde edilebilir hâle getirilmesi,
              sınıflandırılması ya da kullanılmasının engellenmesi gibi veriler
              üzerinde gerçekleştirilen her türlü işlemi ifade etmektedir.
            </p>
            <p className="font-semibold">III. AYDINLATMA KAPSAMI</p>
            <p>
              1. Kişisel Verilerin Toplanması, İşlenmesi ve İşleme Amaçları
              Kişisel Verileriniz, Şirketimiz tarafından verilen hizmet, ürün ya
              da ticari faaliyete bağlı olarak değişkenlik gösterebilmekle;
              otomatik ya da otomatik olmayan yöntemlerle, ofisler, şubeler,
              bayiler, çağrı merkezi, internet sitesi, sosyal medya mecraları,
              mobil uygulamalar ve benzeri vasıtalarla sözlü, yazılı ya da
              elektronik olarak toplanmaktadır/toplanabilecektir. K.V.K. Kanunu
              Madde 5.2 ve Madde 6.3 kapsamında kanuni yükümlülüklerimizi yerine
              getirmek, bir sözleşmenin kurulması veya ifası, hukuki
              yükümlülüklerimizi yerine getirmek, bir hakkın tesisi,
              kullanılması veya korunması ve temel hak ve özgürlüklerinize zarar
              vermeksizin, meşru menfaatlerimizin korunması amacıyla ve
              alenileştirdiğiniz kişisel veriler bakımından açık rızanız
              olmaksızın işlenebilmektedir. Yine Kişisel verileriniz, işbu
              Aydınlatma Metni’nde belirtilen amaçlar dahilinde K.V.K.Kanunu
              Madde 5.1 ve Madde 6.2 kapsamında açık rızanızın alınması şartı
              ile de işlenebilmektedir. Guven Crew Agency üyelik/Sadakat
              programı başta olmak üzere sair üyelik/sadakat
              programımız/programlarımız ve üyeliklere dahil olmaksızın da tüm
              ürünlerimizi temin edebilmektesiniz. Buna mukabil Guven Crew
              Agency üyelik/Sadakat programı ve diğer sadakat programlarımız ve
              üyeliklerimiz, üyelerine özel avantajlar sunduğundan,
              program/üyelik avantajlardan yararlanabilmek adına programlara
              dahil olmanız/üyelik yaptırmanız ile birlikte Kişisel
              Verilerinizin istisnai haller dışında da işlenmesine açık rıza
              vermektesiniz. Toplanan kişisel verileriniz, Şirketimiz tarafından
              sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli
              çalışmaların iş birimlerimiz tarafından yapılması, Şirketimiz
              tarafından sunulan ürün ve hizmetlerin sizlerin beğeni, kullanım
              alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere
              önerilmesi, Şirketimizin ve Şirketimizle iş ilişkisi içerisinde
              olan kişilerin hukuki ve ticari güvenliğinin temini (Şirketimiz
              tarafından yürütülen iletişime yönelik idari operasyonlar, Şirkete
              ait lokasyonların fiziksel güvenliğini ve denetimini sağlamak, iş
              ortağı/müşteri/tedarikçi (yetkili veya çalışanları) değerlendirme
              süreçleri, hukuki uyum süreci, mali işler v.b.), Şirketimizin
              ticari ve iş stratejilerinin belirlenmesi ve uygulanması ve
              Şirketimizin insan kaynakları politikalarının yürütülmesinin
              temini amaçlarıyla KVK Kanunu’nun 5. ve 6. maddelerinde belirtilen
              kişisel veri işleme şartları ile amaçları dahilinde ve
              yürürlükteki sair yasal mevzuata uygun işlenmektedir/işlenecektir.
              1. İşlenen Kişisel Verilerin Yurtiçi ve/veya Yurtdışında Kimlere
              ve Hangi Amaçla Aktarılabileceği Toplanan Kişisel verileriniz;
              Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri
              faydalandırmak için gerekli çalışmaların iş birimlerimiz
              tarafından yapılması, Şirketimiz tarafından sunulan ürün ve
              hizmetlerin sizlerin beğeni, kullanım alışkanlıkları ve
              ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi,
              Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin
              hukuki ve ticari güvenliğinin temini (Şirketimiz tarafından
              yürütülen iletişime yönelik idari operasyonlar, Şirkete ait
              lokasyonların fiziksel güvenliğini ve denetimini sağlamak, iş
              ortağı/müşteri/tedarikçi (yetkili veya çalışanları) değerlendirme
              süreçleri, hukuki uyum süreci, mali işler v.b.), Şirketimizin
              ticari ve iş stratejilerinin belirlenmesi ve uygulanması ile
              Şirketimizin insan kaynakları politikalarının yürütülmesinin
              temini amaçlarıyla, Yasal olarak aktarılması gereken idari ve
              resmi makamlara, mevzuatın gerektirmesi ve hukuki yükümlülüğün
              yerine getirilmesi için ilgili kişi ve kurumlara, hukuki
              zorunluluklar nedeniyle ve yasal sınırlamalar çerçevesinde
              bağımsız denetim şirketlerine, vergi danışmanlarına ve diğer
              harici profesyonel danışmanlara, avukatlara, sigorta şirketlerine,
              ortaklarına, hizmet alınan veya alınacak olan yurt içi – yurt dışı
              üçüncü taraflara, hissedarlarımıza, iş ortaklarımıza,
              tedarikçilerimize, kanunen yetkili kamu kurumları ve özel
              kişilere, gerek KVK Kanunu’nun 8. ve 9. maddelerinde belirtilen
              kişisel veri işleme şartları ve amaçları çerçevesinde ve gerekse
              de sair yasal mevzuat kapsamında
              aktarılmaktadır/aktarılabilecektir. Toplanan Kişisel verileriniz;
              KVK Kurulu tarafından yeterli korumaya sahip olduğu ilan edilen
              yabancı ülkelere (“Yeterli Korumaya Sahip Yabancı Ülke”) veya
              yeterli korumanın bulunmaması durumunda Türkiye’deki ve ilgili
              yabancı ülkedeki veri sorumlularının yeterli bir korumayı yazılı
              olarak taahhüt ettiği ve KVK Kurulu’nun izninin bulunduğu yabancı
              ülkelere (“Yeterli Korumayı Taahhüt Eden Veri Sorumlusunun
              Bulunduğu Yabancı Ülke”) aktarılmaktadır/aktarılabilecektir.
              Şirketimiz bu doğrultuda KVK Kanunu’nun 9. maddesinde öngörülen
              düzenlemelere ve sair yasal mevzuata uygun hareket
              etmektedir/edecektir.
            </p>
            <p>
              1. Kişisel Veri Toplamanın Yöntemi Ve Hukuki Sebebi Kişisel
              verileriniz, denetim ve danışmanlık hizmetlerimiz, Şirketimiz
              çalışanlarına yapılan yazılı/dijital başvurular, internet sitemiz,
              telefon numaralarımızın aranması, sosyal medya, SMS kanalları, ve
              sair sözlü, yazılı veya elektronik ortamda, otomatik ya da
              otomatik olmayan yöntemlerle ve Şirketimiz’in sizler ile iletişime
              geçtiği veya ileride iletişime geçebileceği sair kanallar
              vasıtasıyla temin edilerek faaliyetlerimizi yürütmek, sizlerle
              aramızdaki sözleşmesel ve kanuni yükümlülüklerimizi yerine
              getirmek amaçlarıyla elde edilmekte ve elde edilen kişisel veriler
              ilgili Mevzuatlar uyarınca yasal süreler içerisinde
              saklanmaktadır. 11. Kişisel Veri Sahibinin KVK Kanunu’nun 11.
              Maddesinde Sayılan Hakları Kişisel veri sahipleri olarak,
              haklarınıza ilişkin taleplerinizi, işbu Aydınlatma Metni’nde
              aşağıda düzenlenen yöntemlerle Şirketimize iletmeniz durumunda
              Şirketimiz talebin niteliğine göre talebi en geç otuz gün içinde
              ücretsiz olarak sonuçlandıracaktır. Ancak, Kişisel Verileri Koruma
              Kurulunca bir ücret öngörülmesi halinde, Şirketimiz tarafından
              belirlenen tarifedeki ücret alınacaktır. Bu kapsamda kişisel veri
              sahipleri, K.V.K. Kanunu Madde 11 uyarınca; Kişisel Verilerinin
              işlenip işlenmediğini öğrenme, işlenmişse buna ilişkin bilgi talep
              etme, Kişisel Verilerinin işlenme amacını ve bunların amacına
              uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt
              dışında kişisel verilerinin aktarıldığı üçüncü kişileri bilme,
              kişisel verilerinin eksik veya yanlış işlenmiş olması halinde
              bunların düzeltilmesini isteme, amaç, süre ve meşruiyet
              prensipleri dahilinde değerlendirilmek üzere kişisel verilerinin
              işlenmesini gerektiren sebeplerin ortadan kalkması halinde
              silinmesini veya yok edilmesini isteme, Kişisel Verilerinin
              düzeltilmesi, silinmesi ya da yok edilmesi halinde bu işlemlerin
              kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini
              isteme, işlenen kişisel verilerinin münhasıran otomatik sistemler
              vasıtasıyla analiz edilmesi durumunda aleyhlerine bir sonucun
              ortaya çıkması halinde bu sonuca itiraz etme, Kişisel Verilerinin
              kanuna aykırı olarak işlenmesi ve bu sebeple zarara uğramaları
              halinde zararın giderilmesini talep etme haklarına sahiptirler.
            </p>
            <p>
              KVK Kanunu’nun 13. maddesinin 1. fıkrası gereğince, yukarıda
              belirtilen haklarınızı kullanmak ile ilgili talebinizi, yazılı
              veya Kişisel Verileri Koruma Kurulu’nun belirlediği diğer
              yöntemlerle Şirketimize iletebilirsiniz. Kişisel Verileri Koruma
              Kurulu, şu aşamada herhangi bir yöntem belirlemediği için,
              başvurunuzu, KVK Kanunu gereğince, yazılı olarak Şirketimize
              iletmeniz gerekmektedir. Bu çerçevede Şirketimize KVK Kanunu’nun
              11. maddesi kapsamında yapacağınız başvurularda yazılı olarak
              başvurunuzu ileteceğiniz kanallar ve usuller aşağıda
              açıklanmaktadır: Kişisel verilerinizin açık rıza ile işlendiği
              hallerde söz konusu açık rızanızı geri almanız durumunda söz
              konusu açık rızaya dayalı işlemenin gerekli olduğu üyelik/sadakat
              programından çıkarılacağınızı ve söz konusu işlemeler sayesinde
              yararlandığınız avantajlardan ilgili tarih itibariyle
              yararlandırılamayacağınızı önemle belirtmek isteriz.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PrivacyAgreement;
