import { scroller } from "react-scroll";
import UserProfileHeader, {
  Options,
  ReusuableInput,
  SectionTitle,
  Select,
} from "./FormsET";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export function PageProfile() {
  const { register, handleSubmit } = useForm();

  useEffect(() => {
    scroller.scrollTo("top", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
    });
  }, []);

  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div className="container mx-auto p-6">
      <UserProfileHeader />

      <form
        name="top"
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg p-6 space-y-6 flex flex-col"
      >
        <SectionTitle>Kişisel Bilgileriniz</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusuableInput
            register={register}
            name="firstName"
            label="İsminiz"
            defaultValue="Zeyn"
          />
          <ReusuableInput
            register={register}
            name="lastName"
            label="Soyisim"
            defaultValue="Öz"
          />
          <ReusuableInput
            register={register}
            name="height"
            label="Boyunuz (cm)"
            type="number"
          />
          <ReusuableInput
            register={register}
            name="weight"
            label="Kilonuz"
            type="number"
          />
          <Select register={register} name="bloodType" label="Kan Grubunuz">
            <Options value="0RhPositive">0 Rh(+)</Options>
            <Options value="0RhNegative">0 Rh(-)</Options>
            <Options value="APositive">A Rh(+)</Options>
            <Options value="ANegative">A Rh(-)</Options>
            <Options value="BPositive">B Rh(+)</Options>
            <Options value="BNegative">B Rh(-)</Options>
            <Options value="ABPositive">AB Rh(+)</Options>
            <Options value="ABNegative">AB Rh(-)</Options>
          </Select>
          <ReusuableInput
            register={register}
            name="shoeSize"
            label="Ayakkabı Numaranız"
            type="number"
          />
          <ReusuableInput
            register={register}
            name="birthDate"
            label="Doğum Tarihiniz"
            type="date"
          />
          <Select
            register={register}
            name="jumpsuitSize"
            label="Tulum Bedeniniz"
          >
            <Options value="small">Küçük</Options>
            <Options value="medium">Orta</Options>
            <Options value="large">Büyük</Options>
            <Options value="extraLarge">Ekstra Büyük</Options>
          </Select>
          <ReusuableInput
            register={register}
            name="birthCity"
            label="Doğum Yeri Şehir"
          />
          <ReusuableInput
            register={register}
            name="birthDistrict"
            label="Doğum Yeri İlçe"
          />
          <ReusuableInput
            register={register}
            name="nationality"
            label="Uyruk"
          />
          <ReusuableInput register={register} name="tc" label="TC" />
          <Select
            register={register}
            name="maritalStatus"
            label="Medeni Haliniz"
          >
            <Options value="married">Evli</Options>
            <Options value="single">Bekar</Options>
          </Select>
          <Select register={register} name="gender" label="Cinsiyetiniz">
            <Options value="male">Erkek</Options>
            <Options value="female">Kadın</Options>
          </Select>
          <ReusuableInput
            register={register}
            name="tcIdentityNo"
            label="TC Kimlik No"
          />
          <Select
            register={register}
            name="militaryStatus"
            label="Askerlik Durumu"
          >
            <Options value="completed">Tamamlandı</Options>
            <Options value="exempted">Muaf</Options>
            <Options value="postponed">Ertelendi</Options>
            <Options value="notCompleted">Tamamlanmadı</Options>
          </Select>
        </div>

        <SectionTitle>İletişim Bilgileriniz</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusuableInput
            register={register}
            name="addressCity"
            label="Adres Şehir"
          />
          <ReusuableInput
            register={register}
            name="addressDistrict"
            label="Adres İlçe"
          />
          <ReusuableInput
            register={register}
            name="gsmNumber"
            label="GSM Numaranız"
            defaultValue="0544 422 71 18"
          />
          <ReusuableInput
            register={register}
            name="landlineNumber"
            label="Sabit Telefon No"
            defaultValue="0501 234 56 78"
          />
          <ReusuableInput register={register} name="country" label="Ülke" />
          <ReusuableInput
            register={register}
            name="address"
            label="Adresiniz"
          />
          <ReusuableInput
            register={register}
            name="email"
            label="E-posta"
            defaultValue="ozzz83492@gmail.com"
            isDisabled={true}
          />
        </div>

        <SectionTitle>SSK Bilgileriniz</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusuableInput
            register={register}
            name="sskNumber"
            label="SSK Sicil No"
          />
          <Select
            register={register}
            name="retirementStatus"
            label="Emeklilik Durumu"
          >
            <Options value="retired">Emekli</Options>
            <Options value="notRetired">Emekli Değil</Options>
          </Select>
        </div>

        <SectionTitle>Pasaport & GEMİ Adamı Cüzdanı Bilgileriniz</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusuableInput
            register={register}
            name="passportNumber"
            label="Pasaport No"
          />
          <ReusuableInput
            register={register}
            name="passportIssuer"
            label="Veren Makam"
          />
          <Select register={register} name="passportType" label="Pasaport Tipi">
            <Options value="ordinary">Hizmet</Options>
            <Options value="official">Resmi</Options>
            <Options value="diplomatic">Diplomatik</Options>
          </Select>
          <ReusuableInput
            register={register}
            name="passportValidity"
            label="Geçerlilik Tarihi"
            type="date"
          />
          <ReusuableInput
            register={register}
            name="policeVisaEnd"
            label="Polis Vizesi Bitiş"
            type="date"
          />
          <ReusuableInput
            register={register}
            name="competency"
            label="Yeterliliğiniz"
          />
          <ReusuableInput
            register={register}
            name="portNumber"
            label="Sicil Limanı"
          />
          <ReusuableInput
            register={register}
            name="documentNumber"
            label="Belge No"
          />
          <ReusuableInput
            register={register}
            name="healthVisaEnd"
            label="Sağlık Vizesi Bitiş"
            type="date"
          />
        </div>

        <SectionTitle>Size En Uygun Olan Tercihleriniz</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            register={register}
            name="firstPreference"
            label="1.Görev Tercihiniz"
          >
            <Options value="other">Diğer</Options>
            <Options value="engineer">Mühendis</Options>
            <Options value="officer">Memur</Options>
          </Select>
          <Select
            register={register}
            name="secondPreference"
            label="2.Görev Tercihiniz"
          >
            <Options value="other">Diğer</Options>
            <Options value="engineer">Mühendis</Options>
            <Options value="officer">Memur</Options>
          </Select>
          <Select
            register={register}
            name="thirdPreference"
            label="3.Görev Tercihiniz"
          >
            <Options value="other">Diğer</Options>
            <Options value="engineer">Mühendis</Options>
            <Options value="officer">Memur</Options>
          </Select>
          <Select register={register} name="workType" label="Çalışma Şekli">
            <Options value="fullTime">Tam Zamanlı</Options>
            <Options value="partTime">Yarı Zamanlı</Options>
          </Select>
          <Select
            register={register}
            name="flagPreference"
            label="Bayrak Tercihiniz"
          >
            <Options value="turkish">Türk</Options>
            <Options value="other">Diğer</Options>
          </Select>
          <ReusuableInput
            register={register}
            name="startDate"
            label="İşe Başlamak İstediğiniz Tarih"
            type="date"
          />
          <Select
            register={register}
            name="desiredTravelAreas"
            label="Çalışmak İstediğiniz Sefer Bölgeleri"
          >
            <Options value="europe">Avrupa</Options>
            <Options value="asia">Asya</Options>
            <Options value="america">Amerika</Options>
            <Options value="africa">Afrika</Options>
          </Select>
        </div>

        <div className="flex items-center gap-5 justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Değişiklikleri Kaydet
          </button>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105">
            <Link to="/user/work" className="block">
              Sonraki Sayfaya Geç
            </Link>
          </button>
        </div>
      </form>
    </div>
  );
}
