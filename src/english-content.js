// English-only content overrides. Keep the original Chinese and Malay copy intact.
export const englishCopy = {
 '每一程，': 'Premium Chauffeur ',
 '都值得': 'Service in ',
 '从容。': 'Kuala Lumpur',
 '世界很大，': 'Private Chauffeur Service ',
 '美好从': 'in ',
 '这一程': 'Malaysia',
 '不必研究陌生的路线，不必为行李与时间烦心。': 'Based in Kuala Lumpur, Malaysia, Travthru arranges private chauffeur services for your itinerary.',
 '一位熟悉当地的司机，一辆恰到好处的座驾，': 'Travel with a private driver and a vehicle suited to your group,',
 '让每一次出发，都自在而安心。': 'with your route, passenger count and luggage requirements confirmed before booking.',
 '你的节奏，你的旅程': 'Chauffeur Service for Business & Leisure',
 '你只管期待，': 'Professional Chauffeur Service ',
 '其余的交给我们。': 'in Kuala Lumpur',
 'TRAVTHRU 提供吉隆坡私人包车、KLIA 与 KLIA2 机场接送、带司机用车及定制旅游；车型和报价按行程需求确认。': 'Looking for a chauffeur service in KL? Travthru offers private chauffeur services for business and leisure, KLIA and KLIA2 airport transfers, car rental with a driver and tailored tours in Kuala Lumpur. Enquire about hourly chauffeur service or an outstation transfer to destinations such as Genting Highlands or Melaka. Share your route, dates, passenger count and luggage requirements so our team can confirm availability, a suitable vehicle and a personalised quote.',
 '落地，即刻安心。': 'KLIA Airport Transfer',
 '跟着心意，慢慢走。': 'Private Transfers & Tours',
 '重要的时刻，从容抵达。': 'Corporate Chauffeur Service',
 '商务接待 · 团体出行 · 活动接送': 'Business travel · Private transportation · Routes confirmed',
 '认识我们的服务': 'Explore chauffeur services',
 '香槟铜色 Toyota Alphard 私人包车车型示意图': 'Champagne bronze Toyota Alphard illustration for private chauffeur travel',
 'Alphard / Vellfire，让每位同行者拥有贵宾席。': 'Explore Alphard / Vellfire options for luxury chauffeur travel.',
 '空间恰好，': 'Luxury MPV & ',
 '舒适': 'Private Driver ',
 '不将就。': 'Service',
 '从城市的脉搏，到山海间的自在。': 'Plan an outstation transfer to Genting Highlands or Melaka, with the route and arrangements confirmed for your journey.',
};

export const englishHero = {
 brand: 'Every journey, beautifully taken care of.',
 whatsappLabel: 'Ask us on WhatsApp ↗',
 whatsappHref: 'https://wa.me/60107198186',
};

// Match the static English build when visitors use the existing language selector.
export function syncEnglishHero(language) {
 const hero = document.querySelector('.hero-copy');
 if (!hero) return;
 if (language !== 'en') {
  hero.querySelector('.hero-brand-line')?.remove();
  hero.querySelector('.hero-whatsapp')?.remove();
  return;
 }
 if (!hero.querySelector('.hero-brand-line')) {
  const brand = document.createElement('p');
  brand.className = 'hero-brand-line';
  brand.textContent = englishHero.brand;
  hero.querySelector('h1').after(brand);
 }
 if (!hero.querySelector('.hero-whatsapp')) {
  const link = document.createElement('a');
  link.className = 'text-link hero-whatsapp';
  link.href = englishHero.whatsappHref;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = englishHero.whatsappLabel;
  hero.querySelector('.button').after(link);
 }
}
