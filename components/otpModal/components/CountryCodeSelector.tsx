"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { countryList } from "@/app/utils/constant/countryCode";

interface Country {
  name: string;
  code: string;
  dial_code: string;
  flag: string;
}

interface CountryCodeSelectorProps {
  value: string;
  onChange: (dialCode: string) => void;
  disabled?: boolean;
}

export default function CountryCodeSelector({
  value,
  onChange,
  disabled = false,
}: CountryCodeSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const countries = countryList as Country[];

  const selectedCountry =
    countries.find((c) => c.dial_code === value) ||
    countries.find((c) => c.code === "CA") ||
    countries[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleToggleDropdown = () => {
    if (!disabled) {
      setIsOpen((prev) => !prev);
    }
  };

  const handleSelectCountry = (country: Country) => {
    onChange(country.dial_code);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={handleToggleDropdown}
        disabled={disabled}
        className="flex items-center gap-1.5 px-3 py-3 border-r border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="text-base">{selectedCountry?.flag}</span>
        <span className="text-sm font-medium text-[#252B37]">
          {selectedCountry?.dial_code}
        </span>
        <ChevronDown
          size={14}
          className={`text-[#717680] transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full mt-1 bg-white rounded-lg w-56 shadow-xl border border-gray-200 z-[10001] max-h-60 overflow-y-auto">
          <div className="divide-y divide-gray-100">
            {countries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => handleSelectCountry(country)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors text-left ${
                  selectedCountry?.code === country.code ? "bg-gray-50" : ""
                }`}
              >
                <span className="text-lg">{country.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-[#252B37] truncate">
                    {country.name}
                  </div>
                </div>
                <div className="text-sm text-[#717680] font-medium shrink-0">
                  {country.dial_code}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
