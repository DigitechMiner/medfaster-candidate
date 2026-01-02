// E.164 formatter for backend
export const formatPhoneE164 = (phone: string, countryCode: string = '91'): string => {
  const clean = phone.replace(/\D/g, '');
  if (/^[6789]\d{9}$/.test(clean)) return `+${countryCode}${clean}`;
  return phone.startsWith('+') ? phone : `+${countryCode}${clean}`;
};
