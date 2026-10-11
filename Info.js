export const WHATSAPP_NUMBER = '254712077837';
export const PHONE_DISPLAY = '0712 077 837';
export const PHONE_LINK = 'tel:+254712077837';

export const LOCATION_NAME = 'Kahawa Wendani, Nairobi';
export const MAP_EMBED_URL =
  'https://maps.google.com/maps?q=Kahawa%20Wendani%2C%20Nairobi%2C%20Kenya&z=15&output=embed';
export const MAP_OPEN_URL =
  'https://www.google.com/maps/search/?api=1&query=Kahawa+Wendani+Nairobi+Kenya';

export function whatsappLink(message = "Hello Frank's Nails, I'd like to make an enquiry.") {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}