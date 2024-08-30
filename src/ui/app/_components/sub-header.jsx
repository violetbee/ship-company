import React from "react";
import { LuTextCursor, LuShip } from "react-icons/lu";
import { BsGeoAlt } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { Button } from "../../Button";
import { Input } from "../../input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../select";

function SubHeader() {
  return (
    <form className="container flex items-center justify-between divide-x-2 divide-[#1d202c]">
      <div className="flex w-full items-center justify-center space-x-2 p-8">
        <LuTextCursor className="mt-2 text-xl text-white" />
        <Input type="text" placeholder="Başlık" className="w-2/3" />
      </div>
      <div className="flex w-full items-center justify-center space-x-2 p-8">
        <BsGeoAlt className="mt-2 text-xl text-white" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Lokasyon" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="28">Giresun</SelectItem>
            <SelectItem value="34">İstanbul</SelectItem>
            <SelectItem value="55">Samsun</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full items-center justify-center space-x-2 p-8">
        <FaRegFlag className="mt-2 text-xl text-white" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Bayrak Türü" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tc">TC</SelectItem>
            <SelectItem value="foreign">Yabancı</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex w-full items-center justify-center space-x-2 p-8">
        <LuShip className="mt-2 text-xl text-white" />
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Gemi Tipi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kuru">Kuru Yük</SelectItem>
            <SelectItem value="dokme">Dökme Yük</SelectItem>
            <SelectItem value="roro">RoRo/Ferry</SelectItem>
            <SelectItem value="lpg">LPG</SelectItem>
            <SelectItem value="chem">Kimyasal Tanker</SelectItem>
            <SelectItem value="yat">Yat</SelectItem>
            <SelectItem value="yakit">Yakıt Barcı</SelectItem>
            <SelectItem value="petrol">Petrol Tankeri</SelectItem>
            <SelectItem value="konteyner">Konteyner</SelectItem>
            <SelectItem value="balikci">Balıkçı Gemisi</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="flex gap-2" variant="outline">
        Sorgula <IoIosSearch className="shrink-0" />
      </Button>
    </form>
  );
}

export default SubHeader;
