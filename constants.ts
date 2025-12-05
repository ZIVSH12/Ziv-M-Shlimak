import { Product, Translations } from './types';

export const PRODUCTS: Product[] = [
  { id: 1, name_he: "במבה אסם (מארז 8)", name_en: "Osem Bamba (8 Pack)", price: 12.99, category: "snacks", img: "https://picsum.photos/500/500?random=1", kosher: true, vegan: true, description_en: "The classic peanut butter puff.", description_he: "חטיף הבוטנים הקלאסי והאהוב." },
  { id: 2, name_he: "קפה טורקי עלית", name_en: "Elite Turkish Coffee", price: 8.50, category: "coffee", img: "https://picsum.photos/500/500?random=2", kosher: true, vegan: true, description_en: "Strong, roasted coffee.", description_he: "קפה קלוי וחזק." },
  { id: 3, name_he: "זעתר ישראלי אמיתי", name_en: "Authentic Za'atar", price: 6.99, category: "pantry", img: "https://picsum.photos/500/500?random=3", kosher: true, vegan: true },
  { id: 4, name_he: "חלבה וניל", name_en: "Vanilla Halva", price: 9.99, category: "snacks", img: "https://picsum.photos/500/500?random=4", kosher: true, vegan: false },
  { id: 5, name_he: "טחינה הר ברכה", name_en: "Har Bracha Tahini", price: 14.99, category: "pantry", img: "https://picsum.photos/500/500?random=5", kosher: true, vegan: true },
  { id: 6, name_he: "בוץ ים המלח", name_en: "Dead Sea Mud Mask", price: 19.99, category: "culture", img: "https://picsum.photos/500/500?random=6", kosher: false, vegan: true },
  { id: 7, name_he: "נרות שבת מהודרים", name_en: "Shabbat Candles", price: 11.50, category: "culture", img: "https://picsum.photos/500/500?random=7", kosher: true, vegan: false },
  { id: 8, name_he: "שוקולד פרה", name_en: "Elite Cow Chocolate", price: 4.50, category: "snacks", img: "https://picsum.photos/500/500?random=8", kosher: true, vegan: false },
  { id: 9, name_he: "ביסלי גריל (מארז 6)", name_en: "Bissli Grill (6 Pack)", price: 10.99, category: "snacks", img: "https://picsum.photos/500/500?random=9", kosher: true, vegan: true },
  { id: 10, name_he: "שמן זית גלילי", name_en: "Galilee Olive Oil", price: 24.99, category: "pantry", img: "https://picsum.photos/500/500?random=10", kosher: true, vegan: true },
];

export const TRANSLATIONS: Translations = {
  nav_home: { he: "ראשי", en: "Home" },
  nav_catalog: { he: "קטלוג", en: "Shop" },
  nav_about: { he: "מי אנחנו", en: "About Us" },
  nav_contact: { he: "צור קשר", en: "Contact" },
  hero_title: { he: "הטעמים של ישראל, אצלך בבית", en: "The Tastes of Israel, at Home" },
  hero_subtitle: { he: "משלוח מהיר לכל רחבי ארה״ב", en: "Fast shipping across the US" },
  hero_cta: { he: "לקטלוג המלא", en: "Shop Now" },
  cart_title: { he: "עגלת קניות", en: "Shopping Cart" },
  cart_empty: { he: "העגלה ריקה", en: "Your cart is empty" },
  cart_total: { he: "סה״כ", en: "Total" },
  cart_checkout: { he: "לקופה", en: "Checkout" },
  ai_helper_title: { he: "היועץ של Blue & Gold", en: "Blue & Gold Concierge" },
  ai_helper_placeholder: { he: "למשל: אני מחפש מתנה לחבר טבעוני...", en: "E.g., I need a gift for a vegan friend..." },
  ai_helper_btn: { he: "שאל את המומחה", en: "Ask the Expert" },
  badge_kosher: { he: "כשר", en: "Kosher" },
  badge_vegan: { he: "טבעוני", en: "Vegan" },
  footer_about: { he: "מביאים את ישראל אליך.", en: "Bringing Israel to you." },
  add_to_cart: { he: "הוסף לעגלה", en: "Add to Cart" },
};