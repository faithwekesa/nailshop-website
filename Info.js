export const WHATSAPP_NUMBER = '254700000000';
export const PHONE_DISPLAY = '0700 000 000';
export const PHONE_LINK = 'tel:+254700000000';

export const LOCATION_NAME = 'Kahawa Wendani, Nairobi';
export const MAP_EMBED_URL =
  'https://www.google.com/maps?q=Kahawa+Wendani,+Nairobi,+Kenya&z=15&output=embed';
export const DIRECTIONS_URL =
  'https://www.google.com/maps/search/?api=1&query=Kahawa+Wendani+Nairobi+Kenya';

export function whatsappLink(message = "Hello Frank's Nails, I'd like to book an appointment.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}