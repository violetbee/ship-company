import React from "react";
import { Link } from "react-router-dom";
import { CarouselDemo } from "../ui/app/_components/carousel";
import bg from "../assets/giresun.jpeg";
import { useJobListing } from "../hooks/useJobListing";
import Spinner from "../ui/Spinner";

export default function Home() {
  const { isLoading, error, jobListingData } = useJobListing();

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className="mb-10 text-white">
      <div
        style={{
          backgroundImage: `url(${bg})`,
          width: "100%",
          height: "500px",
          backgroundPosition: "bottom",
          backgroundSize: "cover",
        }}
      >
        <div className="container flex h-full w-full flex-col items-end justify-end pb-14 pl-8">
          <h1 className="cursor-pointer bg-[#171923] p-4 text-center text-4xl font-bold duration-200 hover:bg-[#0b0c0f]">
            Güven Crewing Agency
          </h1>
          <p className="mt-4 cursor-pointer bg-[#0b0c0f] p-4 text-center text-lg duration-200 hover:bg-[#171923]">
            Denizcilik sektöründe 20 yıllık tecrübe
          </p>
        </div>
      </div>

      <div className="container mt-8 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-bold text-[#171923]">
          Öne Çıkarılanlar
        </h2>
        <CarouselDemo />
      </div>

      <div className="container mt-8 flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-bold text-[#171923]">
          Son İlanlar
        </h2>
        <div className="mt-4 w-full">
          <div className="flex w-full items-center justify-between bg-[#171923] p-4 text-white">
            <p className="w-1/6">Tarih</p>
            <p className="w-1/6">Gereken Personel</p>
            <p className="w-1/6">Gemi Tipi</p>
            <p className="w-1/6">Tonaj</p>
            <p className="w-1/6">Bayrak Türü</p>
            <p className="w-1/6">Detay</p>
          </div>
          {jobListingData
            .slice(-3)
            .reverse()
            .map((jobPosting) => (
              <div
                key={jobPosting.id}
                className="flex w-full items-center justify-between border-t border-[#171923] bg-white p-4 text-[#171923]"
              >
                <p className="w-1/6">{jobPosting.date}</p>
                <p className="w-1/6">{jobPosting.required_personnel}</p>
                <p className="w-1/6">{jobPosting.ship_type}</p>
                <p className="w-1/6">{jobPosting.tonnage}</p>
                <p className="w-1/6">{jobPosting.flag_type}</p>
                <Link
                  className="w-1/6 rounded-full bg-[#171923] px-4 py-2 text-center text-white"
                  to={`/ilanlar/${jobPosting.id}`}
                >
                  Detay
                </Link>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
