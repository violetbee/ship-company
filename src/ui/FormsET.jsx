import { Link, useLocation } from "react-router-dom";

const UserProfileHeader = () => {
  const { pathname } = useLocation();

  let secondTitle = "";
  if (pathname.includes("bilgiler")) secondTitle = "Bilgiler";
  if (pathname.includes("work")) secondTitle = "GEMİ & İŞ TECRÜBELERİ";
  if (pathname.includes("egitim")) secondTitle = "EĞİTİM BİLGİLERİ";
  if (pathname.includes("dil")) secondTitle = "Dil BİLGİLERİ";

  return (
    <div className="w-full lg:w-12/12">
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4">
          <Link to="/profile" className="text-blue-500 hover:underline">
            Profile
          </Link>
          / <span className="text-gray-600">{secondTitle}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfileHeader;

export function SectionTitle({ children, className = "" }) {
  return (
    <div className={`text-center mb-8 ${className}`}>
      <h2 className="text-xl font-extrabold tracking-wide text-blue-900 uppercase">
        {children}
      </h2>
    </div>
  );
}

export function ReusuableInput({
  register,
  name,
  defaultValue,
  label,
  type = "text",
  isDisabled = false,
}) {
  return (
    <div className="flex flex-col mb-6">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <input
        id={name}
        defaultValue={defaultValue}
        {...register(name)}
        type={type}
        className="p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out w-full"
        disabled={isDisabled}
      />
    </div>
  );
}

export function Select({ register, name, label, children }) {
  return (
    <div className="flex flex-col mb-6">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 mb-2"
        >
          {label}
        </label>
      )}
      <select
        id={name}
        {...register(name)}
        className="p-3 border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200 ease-in-out w-full"
      >
        {children}
      </select>
    </div>
  );
}

export function Options({ children, value }) {
  return <option value={value}>{children}</option>;
}
