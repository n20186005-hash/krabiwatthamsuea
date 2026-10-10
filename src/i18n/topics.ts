/**
 * 专题页内容（报告第七节）
 * ------------------------------------------------------------------
 * 五个独立攻略页，每个主题提供真正不同的实用内容，而非重复首页段落。
 * 三语（en / th / zh）共用同一组 slug（采用英文形式），便于 hreflang 互链。
 *
 * 这些专题页与首页共用同一个实体锚点（#attraction），通过 BaseLayout 的
 * TouristAttraction 结构化数据强化实体绑定；FAQ 与面包屑末项由本模块驱动。
 */

export interface TopicSection {
  id: string;
  heading: string;
  body: string;
}

export interface TopicFaq {
  q: string;
  a: string;
}

export interface TopicRelated {
  slug: string;
  label: string;
}

export interface TopicContent {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  updated: string;
  cardLabel: string;
  cardDesc: string;
  quickFacts?: { label: string; value: string }[];
  sections: TopicSection[];
  faq: TopicFaq[];
  related: TopicRelated[];
}

export const topicSlugs = [
  'tiger-cave-temple-steps',
  'opening-hours-entrance-fee',
  'how-to-get-there',
  'best-time-to-visit',
  'wat-tham-suea-krabi-vs-kanchanaburi',
] as const;

export type TopicSlug = (typeof topicSlugs)[number];

export const topicUi: Record<string, {
  exploreEyebrow: string;
  exploreTitle: string;
  backToGuide: string;
  updatedLabel: string;
  relatedGuides: string;
  faqTitle: string;
  toHome: string;
}> = {
  en: {
    exploreEyebrow: 'Plan your visit',
    exploreTitle: 'Tiger Cave Temple Krabi — Guides',
    backToGuide: '← Back to main guide',
    updatedLabel: 'Verified',
    relatedGuides: 'Related guides',
    faqTitle: 'Frequently asked questions',
    toHome: 'Wat Tham Suea guide',
  },
  th: {
    exploreEyebrow: 'วางแผนการเยี่ยมชม',
    exploreTitle: 'คู่มือวัดถ้ำเสือ กระบี่',
    backToGuide: '← กลับคู่มือหลัก',
    updatedLabel: 'ตรวจสอบแล้ว',
    relatedGuides: 'คู่มือที่เกี่ยวข้อง',
    faqTitle: 'คำถามที่พบบ่อย',
    toHome: 'คู่มือวัดถ้ำเสือ',
  },
  zh: {
    exploreEyebrow: '规划行程',
    exploreTitle: '甲米虎穴寺攻略',
    backToGuide: '← 返回主攻略',
    updatedLabel: '已核实',
    relatedGuides: '相关攻略',
    faqTitle: '常见问题',
    toHome: '虎穴寺攻略',
  },
};

export const topics: Record<string, Record<string, TopicContent>> = {
  en: {
    'tiger-cave-temple-steps': {
      slug: 'tiger-cave-temple-steps',
      title: 'Tiger Cave Temple Steps — How Many & What to Expect | Krabi',
      description: 'How many steps are there at Tiger Cave Temple Krabi? The summit climb is commonly counted as 1,237–1,260 steps. Read what the ascent is really like, how long it takes and tips for the climb.',
      eyebrow: 'The Climb',
      h1: 'Tiger Cave Temple Steps: How Many & What to Expect',
      intro: 'The staircase to the summit of Wat Tham Suea is the single thing every visitor asks about. Depending on the source and how you count, it is usually described as 1,237 to 1,260 steps — a steep, shaded concrete climb crowned by a giant gold Buddha and a panoramic viewpoint.',
      updated: 'October 2026',
      cardLabel: 'Steps & the Summit Climb',
      cardDesc: '1,237–1,260 steps, climb time, difficulty and tips.',
      quickFacts: [
        { label: 'Steps to summit', value: '1,237–1,260 (counts vary)' },
        { label: 'Typical climb time', value: '30–60 minutes up' },
        { label: 'Summit height', value: '~278 m above sea level' },
        { label: 'Difficulty', value: 'Steep, some sections unshaded' },
      ],
      sections: [
        {
          id: 'how-many',
          heading: 'How many steps are there, really?',
          body: 'Most travel guides quote 1,237 steps, while park and later renovation counts often round it to 1,260. Either way it is a long, steep flight of concrete and stone steps — so treat 1,237–1,260 as the realistic range rather than an exact figure.',
        },
        {
          id: 'what-its-like',
          heading: 'What the climb is actually like',
          body: 'The steps are wide and even, but relentlessly steep, with only a few flat rest landings. The lower two-thirds pass through forest shade; the final stretch is open and hotter. Monkeys patrol the railings, so keep food hidden and bags closed.',
        },
        {
          id: 'how-long',
          heading: 'How long does it take?',
          body: 'Fit visitors reach the golden Buddha in about 30 minutes; most people take 45–60 minutes with breaks. Going down is easier but hard on the knees — allow the same time back.',
        },
        {
          id: 'tips',
          heading: 'Tips for the climb',
          body: 'Start before 08:00 or after 16:00 to avoid midday heat, carry at least 1 litre of water, wear proper shoes, and pause at the rest terraces. The view across the Krabi plain and Andaman limestone karsts is the reward at the top.',
        },
      ],
      faq: [
        { q: 'Is the Tiger Cave Temple staircase free?', a: 'Yes. Entry to the temple and the staircase is free; only donations are welcomed at the pavilions.' },
        { q: 'Are there fewer steps from a back route?', a: 'A second, gentler access path runs via the valley temple, but it still joins the same steep main staircase near the top — there is no shortcut that skips the steps.' },
        { q: 'Can children or older visitors do the climb?', a: 'Children used to walking manage fine with breaks. Visitors with limited mobility can enjoy the cave temple, valley temples and flat forest paths at the base instead of the summit.' },
        { q: 'Are the steps open all day?', a: 'The staircase generally follows the temple opening hours of roughly 06:00–18:00; start early enough to be down before dark.' },
        { q: 'How hard is the Tiger Cave Temple hike compared with other Krabi viewpoints?', a: 'It is the most demanding of Krabi’s temple climbs because of the step count and heat, but the panorama from the summit is among the best in the province.' },
      ],
      related: [
        { slug: 'opening-hours-entrance-fee', label: 'Opening Hours & Entrance Fee' },
        { slug: 'best-time-to-visit', label: 'Best Time to Visit' },
        { slug: 'how-to-get-there', label: 'How to Get There' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: 'Krabi vs Kanchanaburi' },
      ],
    },
    'opening-hours-entrance-fee': {
      slug: 'opening-hours-entrance-fee',
      title: 'Tiger Cave Temple Opening Hours & Entrance Fee | Krabi',
      description: 'Tiger Cave Temple Krabi opening hours are typically 06:00–18:00 and entry is free. Plan your visit, dress code and what to bring with this practical guide.',
      eyebrow: 'Plan Your Visit',
      h1: 'Opening Hours & Entrance Fee',
      intro: 'Wat Tham Suea is an active temple as well as a hiking spot, so the basics — when it opens, what it costs, and how to dress — are worth knowing before you go.',
      updated: 'October 2026',
      cardLabel: 'Opening Hours & Fee',
      cardDesc: 'Hours, free entry, dress code and facilities.',
      quickFacts: [
        { label: 'Opening hours', value: '~06:00–18:00 daily' },
        { label: 'Entrance fee', value: 'Free (donations welcome)' },
        { label: 'Dress code', value: 'Shoulders & knees covered' },
        { label: 'Best arrival', value: 'Before 08:00 or after 16:00' },
      ],
      sections: [
        {
          id: 'hours',
          heading: 'Opening hours',
          body: 'The temple grounds and staircase are generally open from around 06:00 to 18:00 every day. The exact gate times can shift, so arrive with daylight to spare — the steps are unlit after dark.',
        },
        {
          id: 'fee',
          heading: 'Entrance fee',
          body: 'There is no ticket for Wat Tham Suea. Entry is free for both the temple and the summit staircase; small donations at the pavilions support the monks and site upkeep.',
        },
        {
          id: 'dress',
          heading: 'Dress code',
          body: 'As a working Buddhist monastery, cover shoulders and knees, remove shoes before entering ordination halls, and keep voices low. A sarong is handy if you arrive in shorts.',
        },
        {
          id: 'facilities',
          heading: 'What is on site',
          body: 'At the base you will find parking, basic toilets, drink stalls and the cave and valley temples. There are no restaurants or ATMs, so bring water and cash for offerings or drinks.',
        },
      ],
      faq: [
        { q: 'What time does Tiger Cave Temple open?', a: 'Roughly 06:00–18:00 daily; the staircase should be climbed in daylight, so aim to start before 17:00.' },
        { q: 'How much is the entrance fee?', a: 'Entry is free. Donations are optional and go toward the temple.' },
        { q: 'Can I visit at sunset?', a: 'The summit is a famous sunset spot, but the gate closes around 18:00, so plan to be descending by then rather than arriving late.' },
        { q: 'Is there a dress code for the staircase?', a: 'The stairs themselves have no dress rule, but the temples at the base require covered shoulders and knees — dress accordingly.' },
        { q: 'Are there toilets and parking?', a: 'Yes, both are available near the entrance; parking is free.' },
      ],
      related: [
        { slug: 'tiger-cave-temple-steps', label: 'Steps & the Summit Climb' },
        { slug: 'how-to-get-there', label: 'How to Get There' },
        { slug: 'best-time-to-visit', label: 'Best Time to Visit' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: 'Krabi vs Kanchanaburi' },
      ],
    },
    'how-to-get-there': {
      slug: 'how-to-get-there',
      title: 'How to Get to Tiger Cave Temple Krabi (from Town & Ao Nang)',
      description: 'Directions to Tiger Cave Temple Krabi: 7 km north of Krabi Town. Get there by car, taxi, songthaew or scooter, with distances, fares and map for Ao Nang and the airport.',
      eyebrow: 'Getting There',
      h1: 'How to Get to Tiger Cave Temple',
      intro: 'Wat Tham Suea sits about 7 km north of Krabi Town and roughly 25 km from Ao Nang, making it an easy half-day trip from almost anywhere in the area.',
      updated: 'October 2026',
      cardLabel: 'How to Get There',
      cardDesc: 'Distances, fares and routes from town, Ao Nang & airport.',
      quickFacts: [
        { label: 'From Krabi Town', value: '~7 km · 10–15 min' },
        { label: 'From Ao Nang', value: '~25 km · 30–40 min' },
        { label: 'From Krabi Airport', value: '~17 km · 20–25 min' },
        { label: 'Taxi fare (town)', value: '≈ 200–300 THB' },
      ],
      sections: [
        {
          id: 'by-car',
          heading: 'By car, taxi or ride-hailing',
          body: 'The simplest way is a taxi, Grab, or rented car/scooter. From Krabi Town follow the 4034 road north; the temple is signposted in English and Thai. A one-way taxi from town runs about 200–300 THB, and a return with waiting is easy to arrange.',
        },
        {
          id: 'songthaew',
          heading: 'By songthaew (shared pickup)',
          body: 'Local songthaew pickups run along the Krabi Town–Tambon routes and can drop you near the temple for a few dozen baht, though they are slower and less frequent in the evening.',
        },
        {
          id: 'from-ao-nang',
          heading: 'From Ao Nang & Railay',
          body: 'Ao Nang is about 30–40 minutes away by road; Railay has no direct road link, so take a longtail boat to Ao Nang first, then continue by road. Most Ao Nang hotels can book a private transfer.',
        },
        {
          id: 'drive',
          heading: 'Driving & parking',
          body: 'There is a large free parking area at the base. The final approach is a short spur road off the 4034; follow the temple signs. Scooter riders should note the last stretch is exposed in the afternoon heat.',
        },
      ],
      faq: [
        { q: 'How far is Tiger Cave Temple from Krabi Town?', a: 'About 7 km north, a 10–15 minute drive depending on traffic.' },
        { q: 'Can I get there by public transport?', a: 'Yes — songthaew pickups connect Krabi Town with nearby tambons and can drop you close by, but a taxi or scooter is faster and more flexible.' },
        { q: 'How much is a taxi from Ao Nang?', a: 'Expect roughly 400–600 THB one way; many visitors book a round trip with waiting time.' },
        { q: 'Is it worth visiting on the way to the airport?', a: 'Yes — the temple is only about 20 minutes from Krabi Airport, so it fits neatly into a departure-day half day.' },
        { q: 'Where do I park?', a: 'There is free parking at the temple base, including space for cars and tour vans.' },
      ],
      related: [
        { slug: 'opening-hours-entrance-fee', label: 'Opening Hours & Entrance Fee' },
        { slug: 'tiger-cave-temple-steps', label: 'Steps & the Summit Climb' },
        { slug: 'best-time-to-visit', label: 'Best Time to Visit' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: 'Krabi vs Kanchanaburi' },
      ],
    },
    'best-time-to-visit': {
      slug: 'best-time-to-visit',
      title: 'Best Time to Visit Tiger Cave Temple Krabi (Weather & Crowds)',
      description: 'The best time to visit Tiger Cave Temple Krabi is the cool, dry season from November to March, climbing early morning or late afternoon to beat heat and crowds.',
      eyebrow: 'When to Go',
      h1: 'Best Time to Visit Tiger Cave Temple',
      intro: 'Timing your climb well matters more here than at most temples — the staircase is fully exposed to the tropical sun, so the season and the hour of day both make a big difference.',
      updated: 'October 2026',
      cardLabel: 'Best Time to Visit',
      cardDesc: 'Seasons, best hours, crowds and weather tips.',
      quickFacts: [
        { label: 'Best months', value: 'Nov–Mar (cool & dry)' },
        { label: 'Best hours', value: '06:30–09:00 or 16:00–17:30' },
        { label: 'Avoid', value: 'Midday heat; Apr–May hottest' },
        { label: 'Wettest', value: 'May–Oct afternoons' },
      ],
      sections: [
        {
          id: 'season',
          heading: 'By season',
          body: 'November to March is the cool, dry season and the most comfortable for the climb, with lower humidity and clearer summit views. April and May are the hottest months, while May through October brings afternoon rain showers — mornings stay workable.',
        },
        {
          id: 'time-of-day',
          heading: 'By time of day',
          body: 'Climb before 09:00 or after 16:00. Early morning is coolest and best for photos; late afternoon catches the sunset from the summit but you must descend before the 18:00 gate.',
        },
        {
          id: 'weekday',
          heading: 'Weekday vs weekend',
          body: 'Weekends and Thai public holidays draw local families and tour groups. A weekday morning is quieter and the staircase feels less crowded.',
        },
        {
          id: 'weather',
          heading: 'Weather & what to bring',
          body: 'Carry water, a hat and sunscreen year-round. During the wet season pack a light rain shell and expect slick steps after rain. Check the live Krabi forecast before you set off.',
        },
      ],
      faq: [
        { q: 'What is the best month to visit?', a: 'November to March, the cool dry season, offers the most comfortable climb and clearest views.' },
        { q: 'What time of day is best for the climb?', a: 'Early morning (before 09:00) or late afternoon (after 16:00) avoids the worst heat; sunset from the top is spectacular but start early enough to descend by 18:00.' },
        { q: 'Is it safe in the rainy season?', a: 'Yes, but steps get slippery after rain — wear grippy shoes and climb in the drier morning hours.' },
        { q: 'When is it least crowded?', a: 'Weekday mornings are quietest; avoid Thai holidays and weekend afternoons.' },
        { q: 'Can I climb during the hot season?', a: 'You can, but April–May afternoons are extreme — go at first light and bring plenty of water.' },
      ],
      related: [
        { slug: 'tiger-cave-temple-steps', label: 'Steps & the Summit Climb' },
        { slug: 'opening-hours-entrance-fee', label: 'Opening Hours & Entrance Fee' },
        { slug: 'how-to-get-there', label: 'How to Get There' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: 'Krabi vs Kanchanaburi' },
      ],
    },
    'wat-tham-suea-krabi-vs-kanchanaburi': {
      slug: 'wat-tham-suea-krabi-vs-kanchanaburi',
      title: 'Wat Tham Suea Krabi vs Kanchanaburi — Which Tiger Cave Temple?',
      description: 'There are two Wat Tham Suea (Tiger Cave Temple) in Thailand. This guide explains the difference between the Krabi Tiger Cave Temple and the one in Kanchanaburi so you do not confuse them.',
      eyebrow: 'Two Same-Named Temples',
      h1: 'Wat Tham Suea Krabi vs Kanchanaburi',
      intro: 'Thailand has more than one temple called Wat Tham Suea — literally “Tiger Cave Temple”. The most famous internationally is in Krabi, but a well-known one also sits in Kanchanaburi. They are separate places about 200 km apart.',
      updated: 'October 2026',
      cardLabel: 'Krabi vs Kanchanaburi',
      cardDesc: 'Tell the two same-named temples apart.',
      quickFacts: [
        { label: 'Krabi location', value: 'Krabi Town, Andaman coast' },
        { label: 'Krabi steps', value: '1,237–1,260 to summit' },
        { label: 'Kanchanaburi location', value: 'Kanchanaburi, west Thailand' },
        { label: 'Kanchanaburi steps', value: '~157 to the main chedi' },
      ],
      sections: [
        {
          id: 'krabi',
          heading: 'Wat Tham Suea, Krabi',
          body: 'This is the temple this guide covers: a forest monastery about 7 km north of Krabi Town with a steep 1,237–1,260-step staircase to a golden Buddha and a panoramic viewpoint over the Andaman limestone karsts. It is the one most travellers mean by “Tiger Cave Temple”.',
        },
        {
          id: 'kanchanaburi',
          heading: 'Wat Tham Suea, Kanchanaburi',
          body: 'The Kanchanaburi temple lies west of Bangkok near the River Kwai. It is known for a large golden Buddha, a glittering chedi and rice-field scenery, with a much shorter climb of around 157 steps and supporting stairways. It is a different temple in a different province.',
        },
        {
          id: 'how-to-tell',
          heading: 'How to tell them apart',
          body: 'Check the province and the step count. Krabi = Andaman coast, ~1,237–1,260 steps, famous summit viewpoint. Kanchanaburi = River Kwai region, far fewer steps, rice-field setting. Both share the name Wat Tham Suea (วัดถ้ำเสือ).',
        },
        {
          id: 'which-to-visit',
          heading: 'Which should you visit?',
          body: 'If you are touring Krabi and the Andaman coast, the Krabi temple is the one to climb. If you are basing yourself around Kanchanaburi and the River Kwai, visit that one. This site focuses on the Krabi Tiger Cave Temple.',
        },
      ],
      faq: [
        { q: 'Are the Krabi and Kanchanaburi Tiger Cave Temples the same?', a: 'No. They are two separate temples in different provinces, roughly 200 km apart, that happen to share the name Wat Tham Suea.' },
        { q: 'Which one has more steps?', a: 'Krabi has the famous 1,237–1,260-step summit climb; the Kanchanaburi temple’s main climb is about 157 steps.' },
        { q: 'Which is the “real” Tiger Cave Temple?', a: 'Both are real temples; “Tiger Cave Temple” is a common Thai temple name. The Krabi one is the internationally better-known hiking destination.' },
        { q: 'Is the Kanchanaburi temple on this website?', a: 'No — this guide is dedicated to the Krabi Tiger Cave Temple. The Kanchanaburi temple is mentioned only to prevent confusion.' },
        { q: 'Can I visit both in one trip?', a: 'Only with significant travel time; they are in opposite regions of Thailand, so most visitors choose one based on their itinerary.' },
      ],
      related: [
        { slug: 'tiger-cave-temple-steps', label: 'Steps & the Summit Climb' },
        { slug: 'opening-hours-entrance-fee', label: 'Opening Hours & Entrance Fee' },
        { slug: 'how-to-get-there', label: 'How to Get There' },
        { slug: 'best-time-to-visit', label: 'Best Time to Visit' },
      ],
    },
  },

  th: {
    'tiger-cave-temple-steps': {
      slug: 'tiger-cave-temple-steps',
      title: 'บันไดวัดถ้ำเสือ กระบี่ — จำนวนขั้นและสิ่งที่ควรรู้',
      description: 'บันไดวัดถ้ำเสือ กระบี่ นับเป็นกี่ขั้น จริง ๆ แล้วนิยมนับอยู่ที่ 1,237–1,260 ขั้น ขึ้นอยู่กับแหล่งที่มา อ่านต่อสำหรับความจริงของการเดินขึ้น ใช้เวลานานแค่ไหน และคำแนะนำสำหรับการปีน',
      eyebrow: 'การปีนเขา',
      h1: 'บันไดวัดถ้ำเสือ: จำนวนขั้นและสิ่งที่ควรเตรียมตัว',
      intro: 'บันไดสู่ยอดเขาของวัดถ้ำเสือคือสิ่งที่ผู้มาเยือนทุกคนสงสัย เป็นบันไดคอนกรีตชันที่รายล้อมด้วยธรรมชาติ โดยนิยมนับอยู่ที่ 1,237 ถึง 1,260 ขั้น ขึ้นไปบนยอดเขาที่มีพระพุทธรูปทองคำขนาดใหญ่และจุดชมวิวกว้าง',
      updated: 'ตุลาคม 2026',
      cardLabel: 'บันไดและการปีนสู่ยอด',
      cardDesc: '1,237–1,260 ขั้น ระยะเวลาปีน ความยาก และคำแนะนำ',
      quickFacts: [
        { label: 'ขั้นขึ้นยอด', value: '1,237–1,260 (แตกต่างกันตามแหล่ง)' },
        { label: 'เวลาปกติขึ้นเขา', value: '30–60 นาที (ขึ้น)' },
        { label: 'ความสูงยอดเขา', value: '~278 ม. จากระดับน้ำทะเล' },
        { label: 'ความยาก', value: 'ชัน บางช่วงไม่มีร่มเงา' },
      ],
      sections: [
        {
          id: 'how-many',
          heading: 'จริง ๆ แล้วมีกี่ขั้น',
          body: 'คู่มือท่องเที่ยวส่วนใหญ่ระบุ 1,237 ขั้น ในขณะที่การนับจากการปรับปรุงภายหลังมักปัดเศษเป็น 1,260 ขั้น ไม่ว่ากรณีใดก็เป็นบันไดคอนกรีตและหินชันยาวเหยียด จึงถือเอา 1,237–1,260 ขั้นเป็นช่วงที่สมจริงแทนตัวเลขที่ตายตัว',
        },
        {
          id: 'what-its-like',
          heading: 'การปีนจริงเป็นอย่างไร',
          body: 'บันไดกว้างและเสมอกัน แต่ชันอย่างต่อเนื่อง มีเฉพาะพื้นที่พักบ้างตอนเดิน ส่วนล่างสองในสามร่มรื่นใต้ป่า ส่วนท้ายโล่งและร้อนกว่า ลิงมักเดินวนเวียนตามราวบันได จึงควรเก็บอาหารและปิดกระเป๋าให้มิดชิด',
        },
        {
          id: 'how-long',
          heading: 'ใช้เวลานานแค่ไหน',
          body: 'ผู้ที่ฟิตจะถึงพระพุทธรูปทองในราว 30 นาที ส่วนมากใช้ 45–60 นาทีพร้อมพัก ส่วนการลงเขาง่ายกว่าแต่จะกดที่เข่า จงเผื่อเวลากลับเท่าเดิม',
        },
        {
          id: 'tips',
          heading: 'คำแนะนำสำหรับการปีน',
          body: 'ออกเดินก่อน 08:00 หรือหลัง 16:00 เพื่อเลี่ยงความร้อนกลางวัน พกน้ำอย่างน้อย 1 ลิตร สวมรองเท้าที่เหมาะสม และพักตามลานพัก จุดชมวิวเหนือที่ราบกระบี่และเขาหินปูนอันดามันจะเป็นรางวัลบนยอด',
        },
      ],
      faq: [
        { q: 'บันไดวัดถ้ำเสือเสียค่าเข้าหรือไม่', a: 'ไม่เสีย ทั้งวัดและบันไดเข้าชมฟรี มีเพียงการรับบริจาคตามศาลา' },
        { q: 'มีทางลัดขั้นน้อยกว่าด้านหลังไหม', a: 'มีเส้นทางเข้าที่ไม่ชันนักผ่านวัดในหุบเขา แต่สุดท้ายก็เชื่อมกับบันไดหลักชันเดิมใกล้ยอด ไม่มีทางลัดที่ข้ามบันไดไปได้' },
        { q: 'เด็กหรือผู้สูงอายุปีนได้ไหม', a: 'เด็กที่ชินกับการเดินทำได้ดีพร้อมพัก ผู้ที่เคลื่อนไหวจำกัดสามารถชมถ้ำ วัดในหุบเขา และทางเดินป่าราบที่ฐานแทนยอดเขา' },
        { q: 'บันไดเปิดทั้งวันไหม', a: 'บันไดโดยทั่วไปเปิดตามเวลาวัดราว 06:00–18:00 ให้เริ่มแต่เช้าเพื่อลงให้ทันก่อนค่ำ' },
        { q: 'ปีนยากกว่าจุดชมวิวอื่นในกระบี่ไหม', a: 'เป็นการปีนเขาวัดที่หนักที่สุดของกระบี่เพราะจำนวนขั้นและความร้อน แต่ทัศนียภาพบนยอดอยู่ในอันดับต้น ๆ ของจังหวัด' },
      ],
      related: [
        { slug: 'opening-hours-entrance-fee', label: 'เวลาเปิดและค่าเข้า' },
        { slug: 'best-time-to-visit', label: 'ช่วงเวลาที่ดีที่สุด' },
        { slug: 'how-to-get-there', label: 'การเดินทาง' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: 'กระบี่เทียบกับกาญจนบุรี' },
      ],
    },
    'opening-hours-entrance-fee': {
      slug: 'opening-hours-entrance-fee',
      title: 'เวลาเปิดและค่าเข้า วัดถ้ำเสือ กระบี่',
      description: 'วัดถ้ำเสือ กระบี่ เปิดราว 06:00–18:00 ทุกวันและเข้าชมฟรี วางแผนการเดินทาง ข้อบังคับการแต่งกาย และสิ่งที่ควรนำไปกับคู่มือนี้',
      eyebrow: 'วางแผนการเยี่ยมชม',
      h1: 'เวลาเปิดและค่าเข้า',
      intro: 'วัดถ้ำเสือเป็นทั้งวัดที่ยังทำวัตรและจุดปีนเขา สิ่งพื้นฐานอย่างเวลาเปิด ค่าใช้จ่าย และการแต่งกาย จึงควรรู้ก่อนไป',
      updated: 'ตุลาคม 2026',
      cardLabel: 'เวลาเปิดและค่าเข้า',
      cardDesc: 'เวลา เข้าฟรี ข้อบังคับการแต่งกาย และสิ่งอำนวยความสะดวก',
      quickFacts: [
        { label: 'เวลาเปิด', value: '~06:00–18:00 ทุกวัน' },
        { label: 'ค่าเข้า', value: 'ฟรี (ต้อนรับบริจาค)' },
        { label: 'การแต่งกาย', value: 'ปกปิดไหล่และเข่า' },
        { label: 'เวลามาถึงดีที่สุด', value: 'ก่อน 08:00 หรือหลัง 16:00' },
      ],
      sections: [
        {
          id: 'hours',
          heading: 'เวลาเปิด',
          body: 'บริเวณวัดและบันไดเปิดราว 06:00–18:00 ทุกวัน เวลาประตูอาจเปลี่ยนได้ จงมาแต่กลางวันให้พอ บันไดไม่มีไฟหลังค่ำ',
        },
        {
          id: 'fee',
          heading: 'ค่าเข้า',
          body: 'วัดถ้ำเสือไม่มีค่าตั๋ว เข้าชมวัดและบันไดฟรี บริจาคเล็กน้อยตามศาลาสนับสนุนพระและการดูแลสถานที่',
        },
        {
          id: 'dress',
          heading: 'การแต่งกาย',
          body: 'ในฐานะวัดพุทธที่ยังจำพรรษา ให้ปกปิดไหล่และเข่า ถอดรองเท้าก่อนเข้าองค์พระ และรักษาความสงบ โสร่งมีประโยชน์หากมาด้วยกางเกงขาสั้น',
        },
        {
          id: 'facilities',
          heading: 'สิ่งอำนวยความสะดวก',
          body: 'ที่ฐานมีที่จอดรถ ห้องน้ำเบื้องต้น ร้านน้ำ และถ้ำกับวัดในหุบเขา ไม่มีภัตตาคารหรือตู้ ATM จึงนำน้ำและเงินสดสำหรับของบูชาหรือเครื่องดื่ม',
        },
      ],
      faq: [
        { q: 'วัดถ้ำเสือเปิดกี่โมง', a: 'ราว 06:00–18:00 ทุกวัน บันไดควรปีนกลางวัน จงเริ่มก่อน 17:00' },
        { q: 'ค่าเข้าเท่าไร', a: 'เข้าฟรี บริจาคตามสมัครใจเพื่อวัด' },
        { q: 'ไปช่วงพระอาทิตย์ตกได้ไหม', a: 'ยอดเขาเป็นจุดชมพระอาทิตย์ตกที่มีชื่อ แต่ประตูปิดราว 18:00 จงวางแผนลงให้ทัน' },
        { q: 'บันไดมีข้อบังคับการแต่งกายไหม', a: 'ตัวบันไดไม่มีกฎ แต่วัดที่ฐานต้องปกปิดไหล่และเข่า จงแต่งกายให้เหมาะสม' },
        { q: 'มีห้องน้ำและที่จอดรถไหม', a: 'มีทั้งคู่บริเวณทางเข้า ที่จอดรถฟรี' },
      ],
      related: [
        { slug: 'tiger-cave-temple-steps', label: 'บันไดและการปีนสู่ยอด' },
        { slug: 'how-to-get-there', label: 'การเดินทาง' },
        { slug: 'best-time-to-visit', label: 'ช่วงเวลาที่ดีที่สุด' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: 'กระบี่เทียบกับกาญจนบุรี' },
      ],
    },
    'how-to-get-there': {
      slug: 'how-to-get-there',
      title: 'การเดินทางไปวัดถ้ำเสือ กระบี่ (จากตัวเมืองและอ่าวนาง)',
      description: 'เส้นทางไปวัดถ้ำเสือ กระบี่ ห่างตัวเมืองกระบี่ 7 กม. ไปได้ด้วยรถยนต์ แท็กซี สองแถว หรือมอเตอร์ไซค์ พร้อมระยะทาง ค่าโดยสาร และแผนที่จากอ่าวนางและสนามบิน',
      eyebrow: 'การเดินทาง',
      h1: 'การเดินทางไปวัดถ้ำเสือ',
      intro: 'วัดถ้ำเสือตั้งห่างจากตัวเมืองกระบี่ราว 7 กม. และห่างอ่าวนางราว 25 กม. จึงเป็นทริปครึ่งวันที่สะดวกจากแทบทุกที่ในพื้นที่',
      updated: 'ตุลาคม 2026',
      cardLabel: 'การเดินทาง',
      cardDesc: 'ระยะทาง ค่าโดยสาร และเส้นทางจากเมือง อ่าวนาง และสนามบิน',
      quickFacts: [
        { label: 'จากตัวเมืองกระบี่', value: '~7 กม. · 10–15 นาที' },
        { label: 'จากอ่าวนาง', value: '~25 กม. · 30–40 นาที' },
        { label: 'จากสนามบินกระบี่', value: '~17 กม. · 20–25 นาที' },
        { label: 'ค่าแท็กซี (เมือง)', value: '≈ 200–300 บาท' },
      ],
      sections: [
        {
          id: 'by-car',
          heading: 'โดยรถยนต์ แท็กซี หรือแอปเรียก',
          body: 'วิธีง่ายสุดคือแท็กซี Grab หรือเช่ารถ/มอเตอร์ไซค์ จากตัวเมืองกระบี่ให้ใช้ถนน 4034 ไปทางเหนือ วัดมีป้ายส่องภาษาไทยและอังกฤษ แท็กซี่จากเมืองราว 200–300 บาท และจองรถไปกลับพร้อมรอได้ง่าย',
        },
        {
          id: 'songthaew',
          heading: 'โดยสองแถว',
          body: 'สองแถวรับจ้างวิ่งตามเส้นทางตัวเมืองกระบี่–ตำบล สามารถส่งใกล้วัดได้ในราคาร้อยต้น ๆ แต่ช้ากว่าและน้อยช่วงค่ำ',
        },
        {
          id: 'from-ao-nang',
          heading: 'จากอ่าวนางและไร่เลย์',
          body: 'อ่าวนางห่างทางรถราว 30–40 นาที ไร่เลย์ไม่มีถนนตรง จงต่อเรือหางยาวไปอ่าวนางก่อนแล้วเดินทางทางบก โรงแรมอ่าวนางส่วนใหญ่จองรถรับส่งส่วนตัวได้',
        },
        {
          id: 'drive',
          heading: 'การขับและที่จอด',
          body: 'มีลานจอดรถฟรีกว้างขวางที่ฐาน ทางเข้าสุดท้ายเป็นถนนแยกสั้นจาก 4034 ตามป้ายวัด ผู้ขับมอเตอร์ไซค์ควรระวังช่วงสุดท้ายที่โล่งกลางแดดบ่าย',
        },
      ],
      faq: [
        { q: 'วัดถ้ำเสือห่างตัวเมืองกระบี่เท่าไร', a: 'ราว 7 กม. ทางเหนือ ขับ 10–15 นาทีขึ้นกับการจราจร' },
        { q: 'ไปได้ด้วยรถสาธารณะไหม', a: 'ได้ สองแถวเชื่อมตัวเมืองกับตำบลใกล้เคียงและส่งใกล้วัดได้ แต่แท็กซีหรือมอเตอร์ไซค์เร็วและยืดหยุ่นกว่า' },
        { q: 'แท็กซีจากอ่าวนางเท่าไร', a: 'ราว 400–600 บาทเที่ยวเดียว หลายคนจองไปกลับพร้อมเวลารอ' },
        { q: 'คุ้มไหมที่จะแวะวันเดินทางสนามบิน', a: 'คุ้ม วัดห่างสนามบินกระบี่เพียงราว 20 นาที จึงเหมาะกับครึ่งวันวันเดินทาง' },
        { q: 'จอดรถที่ไหน', a: 'มีที่จอดรถฟรีที่ฐานวัด รวมทั้งรถยนต์และรถตู้ทัวร์' },
      ],
      related: [
        { slug: 'opening-hours-entrance-fee', label: 'เวลาเปิดและค่าเข้า' },
        { slug: 'tiger-cave-temple-steps', label: 'บันไดและการปีนสู่ยอด' },
        { slug: 'best-time-to-visit', label: 'ช่วงเวลาที่ดีที่สุด' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: 'กระบี่เทียบกับกาญจนบุรี' },
      ],
    },
    'best-time-to-visit': {
      slug: 'best-time-to-visit',
      title: 'ช่วงเวลาที่ดีที่สุดในการเยี่ยมชมวัดถ้ำเสือ กระบี่',
      description: 'ช่วงเวลาที่ดีที่สุดคือฤดูหนาวเย็นและแห้งพ.ย.–มี.ค. ปีนตอนเช้าตรู่หรือบ่ายแก้ๆ เพื่อเลี่ยงความร้อนและความแออัด',
      eyebrow: 'เวลาที่ควรไป',
      h1: 'ช่วงเวลาที่ดีที่สุดในการเยี่ยมชม',
      intro: 'การเลือกเวลาปีนสำคัญกว่าวัดส่วนใหญ่ บันไดโล่งรับแดดเขตร้อนเต็มที่ ทั้งฤดูกาลและเวลาในวันจึงต่างกันมาก',
      updated: 'ตุลาคม 2026',
      cardLabel: 'ช่วงเวลาที่ดีที่สุด',
      cardDesc: 'ฤดูกาล เวลาที่ดีที่สุด ความแออัด และคำแนะนำสภาพอากาศ',
      quickFacts: [
        { label: 'เดือนที่ดีที่สุด', value: 'พ.ย.–มี.ค. (เย็นและแห้ง)' },
        { label: 'เวลาที่ดีที่สุด', value: '06:30–09:00 หรือ 16:00–17:30' },
        { label: 'เลี่ยง', value: 'ความร้อนกลางวัน เม.ย.–พ.ค. ร้อนสุด' },
        { label: 'ฝนชุกสุด', value: 'พ.ค.–ต.ค. ตอนบ่าย' },
      ],
      sections: [
        {
          id: 'season',
          heading: 'ตามฤดูกาล',
          body: 'พ.ย.–มี.ค. เป็นฤดูเย็นและแห้ง สบายที่สุดสำหรับการปีน ความชื้นต่ำและวิวยอดชัดเจน เม.ย.และพ.ค. ร้อนสุด ส่วนพ.ค.–ต.ค. มีฝนตกตอนบ่าย เช้ายังไปได้',
        },
        {
          id: 'time-of-day',
          heading: 'ตามเวลาในวัน',
          body: 'ปีนก่อน 09:00 หรือหลัง 16:00 เช้าตรู่เย็นสุดและดีสำหรับถ่ายภาพ บ่ายแก้ๆ จับพระอาทิตย์ตกบนยอด แต่ต้องลงให้ทันประตู 18:00',
        },
        {
          id: 'weekday',
          heading: 'วันธรรมดาเทียบวันหยุด',
          body: 'เสาร์อาทิตย์และวันหยุดไทยมีครอบครัวและกรุ๊ปทัวร์ วันธรรมดาเช้าจะสงบและบันไดไม่แออัด',
        },
        {
          id: 'weather',
          heading: 'สภาพอากาศและสิ่งที่ควรนำ',
          body: 'พกน้ำ หมวก และครีมกันแดดตลอดปี ฤดูฝนเตรียมเสื้อกันฝนเบาและระวังบันไดลื่นหลังฝน ตรวจสอบพยากรณ์กระบี่สดก่อนออกเดิน',
        },
      ],
      faq: [
        { q: 'เดือนไหนดีที่สุด', a: 'พ.ย.–มี.ค. ฤดูเย็นแห้ง ปีนสบายและวิวชัด' },
        { q: 'เวลาใดในวันดีที่สุด', a: 'เช้าตรู่ (ก่อน 09:00) หรือบ่ายแก้ๆ (หลัง 16:00) เลี่ยงร้อน พระอาทิตย์ตกบนยอดสวยงามแต่เริ่มแต่เช้าพอลงทัน 18:00' },
        { q: 'ปลอดภัยในฤดูฝนไหม', a: 'ได แต่บันไดลื่นหลังฝน สวมรองเทากันลื่นและปีนตอนเช้าที่แห้งกว่า' },
        { q: 'เมื่อใดไม่แออัดที่สุด', a: 'เช้าวันธรรมดาสงบสุด หลีกเลี่ยงวันหยุดไทยและบ่ายเสาร์อาทิตย์' },
        { q: 'ปีนหน้าร้อนได้ไหม', a: 'ได้ แต่บ่าย เม.ย.–พ.ค. รุนแรง จงไปตอนรุ่งอรุณและพกน้ำมาก' },
      ],
      related: [
        { slug: 'tiger-cave-temple-steps', label: 'บันไดและการปีนสู่ยอด' },
        { slug: 'opening-hours-entrance-fee', label: 'เวลาเปิดและค่าเข้า' },
        { slug: 'how-to-get-there', label: 'การเดินทาง' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: 'กระบี่เทียบกับกาญจนบุรี' },
      ],
    },
    'wat-tham-suea-krabi-vs-kanchanaburi': {
      slug: 'wat-tham-suea-krabi-vs-kanchanaburi',
      title: 'วัดถ้ำเสือ กระบี่ เทียบกับกาญจนบุรี — วัดถ้ำเสืออันไหน',
      description: 'ประเทศไทยมีวัดถ้ำเสือมากกว่าหนึ่งแห่ง คู่มือนี้อธิบายความต่างระหว่างวัดถ้ำเสือกระบี่กับกาญจนบุรี เพื่อไม่ให้สับสน',
      eyebrow: 'สองวัดชื่อเดียวกัน',
      h1: 'วัดถ้ำเสือ กระบี่ เทียบกับกาญจนบุรี',
      intro: 'ไทยมีวัดชื่อวัดถ้ำเสอมากกว่าหนึ่งแห่ง แห่งที่รู้จักระดับโลกอยู่กระบี่ อีกแห่งที่มีชื่อเสียงตั้งที่กาญจนบุรี เป็นสถานที่ต่างกันราว 200 กม.',
      updated: 'ตุลาคม 2026',
      cardLabel: 'กระบี่เทียบกับกาญจนบุรี',
      cardDesc: 'แยกความต่างของสองวัดชื่อเดียวกัน',
      quickFacts: [
        { label: 'ที่ตั้งกระบี่', value: 'ตัวเมืองกระบี่ ฝั่งอันดามัน' },
        { label: 'ขั้นกระบี่', value: '1,237–1,260 ขึ้นยอด' },
        { label: 'ที่ตั้งกาญจนบุรี', value: 'กาญจนบุรี ตะวันตกไทย' },
        { label: 'ขั้นกาญจนบุรี', value: '~157 ขึ้นเจดีย์หลัก' },
      ],
      sections: [
        {
          id: 'krabi',
          heading: 'วัดถ้ำเสือ กระบี่',
          body: 'นี่คือวัดที่คู่มือนี้ครอบคลุม วัดป่าราว 7 กม. เหนือตัวเมืองกระบี่ มีบันไดชัน 1,237–1,260 ขั้นสู่พระพุทธรูปทองและจุดชมวิวเหนือเขาหินปูนอันดามัน เป็นที่ที่นักท่องเที่ยวหมายถึง “Tiger Cave Temple”',
        },
        {
          id: 'kanchanaburi',
          heading: 'วัดถ้ำเสือ กาญจนบุรี',
          body: 'วัดกาญจนบุรีตั้งตะวันตกกรุงเทพฯ ใกล้แม่น้ำแคว มีพระพุทธรูปทองขนาดใหญ่ เจดีย์วิจิตร และทัศนียภาพนาข้าว มีบันไดสู่เจดีย์หลักราว 157 ขั้น เป็นวัดต่างจังหวัด',
        },
        {
          id: 'how-to-tell',
          heading: 'จะแยกกันอย่างไร',
          body: 'ดูจังหวัดและจำนวนขั้น กระบี่ = ฝั่งอันดามัน ขั้น 1,237–1,260 จุดชมวิวยอดดัง กาญจนบุรี = แถบแม่น้ำแคว ขั้นน้อยกว่ามาก ท่ามกลางนาข้าว ทั้งคู่ใช้ชื่อวัดถ้ำเสือ (วัดถ้ำเสือ)',
        },
        {
          id: 'which-to-visit',
          heading: 'ควรไปที่ไหน',
          body: 'หากเที่ยวกระบี่และฝั่งอันดามัน วัดกระบี่คือที่ต้องปีน หากฐานที่กาญจนบุรีและแม่น้ำแคว ไปวัดนั้น เว็บนี้มุ่งที่วัดถ้ำเสือกระบี่',
        },
      ],
      faq: [
        { q: 'วัดถ้ำเสือกระบี่กับกาญจนบุรีใช่วัดเดียวกันไหม', a: 'ไม่ ต่างจังหวัดกันราว 200 กม. แต่ชื่อวัดถ้ำเสือเหมือนกัน' },
        { q: 'แห่งไหนขั้นมากกว่า', a: 'กระบี่มีบันไดขึ้นยอด 1,237–1,260 ขั้น ส่วนกาญจนบุรีราว 157 ขั้น' },
        { q: 'แห่งไหนคือ “วัดถ้ำเสือตัวจริง”', a: 'ทั้งคู่เป็นวัดจริง ชื่อนี้เป็นชื่อวัดพุทธไทยที่พบได้ทั่วไป กระบี่เป็นจุดปีนเขาที่รู้จักระดับโลก' },
        { q: 'เว็บนี้มีวัดกาญจนบุรีไหม', a: 'ไม่ เว็บนี้มุ่งวัดถ้ำเสือกระบี่ กาญจนบุรีกล่าวถึงเพื่อป้องกันความสับสน' },
        { q: 'เที่ยวทั้งสองแห่งในทริปเดียวได้ไหม', a: 'ได้ก็ต่อเมื่อมีเวลาเดินทางมาก ทั้งสองอยู่คนละภูมิภาค จึงเลือกตามแผนส่วนใหญ่' },
      ],
      related: [
        { slug: 'tiger-cave-temple-steps', label: 'บันไดและการปีนสู่ยอด' },
        { slug: 'opening-hours-entrance-fee', label: 'เวลาเปิดและค่าเข้า' },
        { slug: 'how-to-get-there', label: 'การเดินทาง' },
        { slug: 'best-time-to-visit', label: 'ช่วงเวลาที่ดีที่สุด' },
      ],
    },
  },

  zh: {
    'tiger-cave-temple-steps': {
      slug: 'tiger-cave-temple-steps',
      title: '甲米虎穴寺登山台阶——数量与实地体验 | 甲米',
      description: '甲米虎穴寺到底有多少级台阶？登顶通常计为 1,237–1,260 级（视来源而定）。阅读本文了解登顶的真实情况、耗时与爬坡建议。',
      eyebrow: '登山',
      h1: '甲米虎穴寺台阶：数量与实地体验',
      intro: '通往虎穴寺山顶的阶梯是每位游客最关心的问题。根据来源与计数方式不同，通常记为 1,237 至 1,260 级——一段陡峭、有遮荫的水泥台阶，尽头是约 2,500 年历史的佛塔式建筑与山顶巨型金佛。',
      updated: '2026 年 10 月',
      cardLabel: '台阶与登顶',
      cardDesc: '1,237–1,260 级、耗时、难度与建议。',
      quickFacts: [
        { label: '登顶台阶', value: '1,237–1,260 级（口径不一）' },
        { label: '通常登顶耗时', value: '上行约 30–60 分钟' },
        { label: '山顶海拔', value: '约 278 米' },
        { label: '难度', value: '陡峭，部分无遮荫' },
      ],
      sections: [
        {
          id: 'how-many',
          heading: '到底有多少级？',
          body: '多数旅游攻略写作 1,237 级，而公园及后期修缮计数常取整为 1,260 级。无论如何，这都是一段又长又陡的水泥与石阶，因此把 1,237–1,260 级视为真实区间，而非精确数字。',
        },
        {
          id: 'what-its-like',
          heading: '登顶实际是什么样',
          body: '台阶宽而平整，却一路陡升，只有几处平台可歇脚。前三分之二穿行于林荫，最后一段开阔且更晒。猴子常在栏杆上游荡，请藏好食物、拉好背包。',
        },
        {
          id: 'how-long',
          heading: '需要多久？',
          body: '体力好者约 30 分钟抵达金佛，多数人含休息需 45–60 分钟。下山的路更轻松，但伤膝盖——请预留同样的返程时间。',
        },
        {
          id: 'tips',
          heading: '登坡建议',
          body: '在 08:00 前或 16:00 后出发以避开正午高温，至少携带 1 升水，穿合适的鞋，并在休息台歇脚。山顶俯瞰甲米平原与安达曼石灰岩峰林的视野就是回报。',
        },
      ],
      faq: [
        { q: '虎穴寺台阶要门票吗？', a: '不要。寺庙与台阶均免费开放，仅在亭阁随喜布施。' },
        { q: '从后山是否有更少台阶的路？', a: '山谷寺院一侧有一条较缓的进入路径，但临近山顶仍并入同一段陡峭主阶梯——没有能跳过台阶的捷径。' },
        { q: '儿童或长者能爬吗？', a: '习惯走路的儿童在休息下可以胜任。行动不便者可在山脚参观石窟、山谷寺院与平坦的森林步道，不必登顶。' },
        { q: '台阶全天开放吗？', a: '阶梯大致跟随寺庙 06:00–18:00 的开放时间；请趁天亮出发，赶在天黑前下山。' },
        { q: '虎穴寺徒步比甲米其他观景点更难吗？', a: '就台阶数量与高温而言，它是甲米最吃力的寺院攀登，但山顶全景位居全省前列。' },
      ],
      related: [
        { slug: 'opening-hours-entrance-fee', label: '开放时间与门票' },
        { slug: 'best-time-to-visit', label: '最佳游览时间' },
        { slug: 'how-to-get-there', label: '如何到达' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: '甲米 vs 北碧府' },
      ],
    },
    'opening-hours-entrance-fee': {
      slug: 'opening-hours-entrance-fee',
      title: '甲米虎穴寺开放时间与门票 | 甲米',
      description: '甲米虎穴寺通常 06:00–18:00 开放、免费入园。用这份实用指南规划行程、着装规范与随身物品。',
      eyebrow: '规划行程',
      h1: '开放时间与门票',
      intro: '虎穴寺既是正在使用的寺院，也是徒步胜地，因此基本信息——何时开门、花费多少、如何着装——出发前值得了解。',
      updated: '2026 年 10 月',
      cardLabel: '开放时间与门票',
      cardDesc: '时间、免费入园、着装与设施。',
      quickFacts: [
        { label: '开放时间', value: '约 06:00–18:00 每日' },
        { label: '门票', value: '免费（欢迎布施）' },
        { label: '着装', value: '遮肩盖膝' },
        { label: '最佳到达', value: '08:00 前或 16:00 后' },
      ],
      sections: [
        {
          id: 'hours',
          heading: '开放时间',
          body: '寺院场地与阶梯通常每日约 06:00 至 18:00 开放。确切关门时间可能变动，请留足白昼时间——台阶天黑后无照明。',
        },
        {
          id: 'fee',
          heading: '门票',
          body: '虎穴寺不售门票。寺院与登顶阶梯均免费；亭阁内小额布施用于支持僧侣与场地维护。',
        },
        {
          id: 'dress',
          heading: '着装规范',
          body: '作为在用的佛教寺院，请遮住肩膀与膝盖，进入大殿前脱鞋，并保持安静。若穿短裤，一条纱笼会很方便。',
        },
        {
          id: 'facilities',
          heading: '现场设施',
          body: '山脚设有停车场、基础洗手间、饮水摊，以及石窟与山谷寺院。没有餐厅或 ATM，请自备饮水与现金用于供品或饮料。',
        },
      ],
      faq: [
        { q: '虎穴寺几点开门？', a: '约 06:00–18:00 每日；阶梯应在白天攀登，请尽量在 17:00 前开始。' },
        { q: '门票多少钱？', a: '免费入园，布施随喜，用于寺院。' },
        { q: '可以看日落吗？', a: '山顶是著名的日落点，但大门约 18:00 关闭，因此请安排在天黑前下山，而非深夜抵达。' },
        { q: '阶梯有着装要求吗？', a: '阶梯本身无规定，但山脚寺院要求遮肩盖膝——请相应着装。' },
        { q: '有洗手间和停车场吗？', a: '有，入口附近两者皆备，停车免费。' },
      ],
      related: [
        { slug: 'tiger-cave-temple-steps', label: '台阶与登顶' },
        { slug: 'how-to-get-there', label: '如何到达' },
        { slug: 'best-time-to-visit', label: '最佳游览时间' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: '甲米 vs 北碧府' },
      ],
    },
    'how-to-get-there': {
      slug: 'how-to-get-there',
      title: '如何前往甲米虎穴寺（从市区与奥南）',
      description: '甲米虎穴寺交通：距甲米镇 7 公里。可乘汽车、出租车、双条车或摩托前往，附奥南与机场的距离、车费与地图。',
      eyebrow: '交通方式',
      h1: '如何前往虎穴寺',
      intro: '虎穴寺位于甲米镇以北约 7 公里、奥南约 25 公里处，几乎可从当地任何地方轻松安排半日游。',
      updated: '2026 年 10 月',
      cardLabel: '如何到达',
      cardDesc: '距离、车费与从市区、奥南、机场的路线。',
      quickFacts: [
        { label: '距甲米镇', value: '约 7 公里 · 10–15 分钟' },
        { label: '距奥南', value: '约 25 公里 · 30–40 分钟' },
        { label: '距甲米机场', value: '约 17 公里 · 20–25 分钟' },
        { label: '镇上出租车', value: '约 200–300 泰铢' },
      ],
      sections: [
        {
          id: 'by-car',
          heading: '自驾、出租车或网约车',
          body: '最简单的方式是出租车、Grab 或租车/摩托。从甲米镇沿 4034 公路向北，寺院有泰英双语指示牌。镇上单程出租车约 200–300 泰铢，也可轻松约定往返等候。',
        },
        {
          id: 'songthaew',
          heading: '双条车（共享皮卡）',
          body: '本地双条车沿甲米镇—社区线路行驶，可在寺院附近放下，费用几十泰铢，但傍晚班次更少更慢。',
        },
        {
          id: 'from-ao-nang',
          heading: '从奥南与莱利',
          body: '奥南陆路约 30–40 分钟；莱利无直达公路，需先乘长尾船到奥南再转陆路。多数奥南酒店可代订私人接送。',
        },
        {
          id: 'drive',
          heading: '自驾与停车',
          body: '山脚有宽敞的免费停车场。最后一段是从 4034 岔出的短支路，沿寺院指示牌行驶。摩托骑行者注意末段午后会暴晒。',
        },
      ],
      faq: [
        { q: '虎穴寺离甲米镇多远？', a: '以北约 7 公里，视交通 10–15 分钟车程。' },
        { q: '可以乘公共交通到吗？', a: '可以——双条车连接甲米镇与邻近社区，可在附近放下，但出租车或摩托更快更灵活。' },
        { q: '从奥南打车多少钱？', a: '单程约 400–600 泰铢；许多人会包往返并含等候时间。' },
        { q: '离机场顺路吗？', a: '顺路——寺院距甲米机场仅约 20 分钟，适合安排在离店半日。' },
        { q: '停哪里？', a: '山脚有免费停车场，含小汽车与旅游中巴车位。' },
      ],
      related: [
        { slug: 'opening-hours-entrance-fee', label: '开放时间与门票' },
        { slug: 'tiger-cave-temple-steps', label: '台阶与登顶' },
        { slug: 'best-time-to-visit', label: '最佳游览时间' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: '甲米 vs 北碧府' },
      ],
    },
    'best-time-to-visit': {
      slug: 'best-time-to-visit',
      title: '甲米虎穴寺最佳游览时间（天气与人流）',
      description: '甲米虎穴寺最佳游览时间是 11 月至 3 月的凉干季，清晨或傍晚登顶以避开高温与人流。',
      eyebrow: '何时前往',
      h1: '最佳游览时间',
      intro: '在此安排登山时机比多数寺院更重要——阶梯完全暴露在高温下，因此季节与一天中的时刻都很关键。',
      updated: '2026 年 10 月',
      cardLabel: '最佳游览时间',
      cardDesc: '季节、最佳时段、人流与天气建议。',
      quickFacts: [
        { label: '最佳月份', value: '11 月–3 月（凉干）' },
        { label: '最佳时段', value: '06:30–09:00 或 16:00–17:30' },
        { label: '避开', value: '正午高温；4–5 月最热' },
        { label: '最多雨', value: '5–10 月午后' },
      ],
      sections: [
        {
          id: 'season',
          heading: '按季节',
          body: '11 月至 3 月为凉干季，攀登最舒适，湿度较低、山顶视野最清晰。4 月与 5 月最热，而 5 月至 10 月午后多阵雨——早晨仍可行。',
        },
        {
          id: 'time-of-day',
          heading: '按一天中的时段',
          body: '在 09:00 前或 16:00 后攀登。清晨最凉且最适合拍照；傍晚可在山顶看日落，但须在 18:00 关门前沿阶而下。',
        },
        {
          id: 'weekday',
          heading: '工作日 vs 周末',
          body: '周末与泰国公共假期会涌入本地家庭与旅行团。工作日上午更安静，阶梯也不拥挤。',
        },
        {
          id: 'weather',
          heading: '天气与随身物品',
          body: '全年携带饮水、帽子与防晒。雨季备轻薄雨衣，雨后台阶湿滑。出发前查看甲米实时天气预报。',
        },
      ],
      faq: [
        { q: '哪个月最好？', a: '11 月至 3 月的凉干季，攀登最舒适、视野最清晰。' },
        { q: '一天中何时登顶最好？', a: '清晨（09:00 前）或傍晚（16:00 后）避开最热；山顶日落壮观，但请及早出发以赶在 18:00 前下山。' },
        { q: '雨季安全吗？', a: '安全，但雨后台阶湿滑——穿防滑鞋，并在较干的上午攀登。' },
        { q: '何时最不拥挤？', a: '工作日上午最安静；避开泰国节假日与周末午后。' },
        { q: '热季能爬吗？', a: '可以，但 4–5 月午后极端炎热——请赶在清晨出发并多带水。' },
      ],
      related: [
        { slug: 'tiger-cave-temple-steps', label: '台阶与登顶' },
        { slug: 'opening-hours-entrance-fee', label: '开放时间与门票' },
        { slug: 'how-to-get-there', label: '如何到达' },
        { slug: 'wat-tham-suea-krabi-vs-kanchanaburi', label: '甲米 vs 北碧府' },
      ],
    },
    'wat-tham-suea-krabi-vs-kanchanaburi': {
      slug: 'wat-tham-suea-krabi-vs-kanchanaburi',
      title: '甲米虎穴寺 vs 北碧府虎穴寺——哪座是你要的？',
      description: '泰国有两座 Wat Tham Suea（虎穴寺）。本指南说明甲米虎穴寺与北碧府虎穴寺的区别，避免混淆。',
      eyebrow: '同名两座寺院',
      h1: '甲米虎穴寺 vs 北碧府虎穴寺',
      intro: '泰国不止一座名为 Wat Tham Suea（虎穴寺）的寺院。国际最知名的是甲米那座，而北碧府也有一座知名的。两者相距约 200 公里，并不相同。',
      updated: '2026 年 10 月',
      cardLabel: '甲米 vs 北碧府',
      cardDesc: '区分两座同名寺院。',
      quickFacts: [
        { label: '甲米位置', value: '甲米镇，安达曼海岸' },
        { label: '甲米台阶', value: '登顶 1,237–1,260 级' },
        { label: '北碧府位置', value: '北碧府，泰国西部' },
        { label: '北碧府台阶', value: '主佛塔约 157 级' },
      ],
      sections: [
        {
          id: 'krabi',
          heading: '甲米虎穴寺',
          body: '这正是本站介绍的寺院：位于甲米镇以北约 7 公里的森林寺院，有陡峭的 1,237–1,260 级台阶通往金佛，以及俯瞰安达曼石灰岩峰林的全景。多数旅客所说的“Tiger Cave Temple”即指此。',
        },
        {
          id: 'kanchanaburi',
          heading: '北碧府虎穴寺',
          body: '北碧府的寺院位于曼谷以西、桂河附近，以大型金佛、璀璨佛塔与稻田风光闻名，主佛塔攀登仅约 157 级并辅以登山设施。它是另一座、位于另一府的寺院。',
        },
        {
          id: 'how-to-tell',
          heading: '如何区分',
          body: '看府治与台阶数。甲米 = 安达曼海岸、1,237–1,260 级、著名山顶观景；北碧府 = 桂河地区、台阶少得多、稻田环境。两者都叫 Wat Tham Suea（วัดถ้ำเสือ）。',
        },
        {
          id: 'which-to-visit',
          heading: '该去哪座',
          body: '若你在甲米与安达曼海岸游览，甲米这座就是该爬的；若以桂河周边的北碧府为据点，就去那座。本站专注于甲米虎穴寺。',
        },
      ],
      faq: [
        { q: '甲米与北碧府的虎穴寺是同一座吗？', a: '不是。它们是不同府的两座寺院，相距约 200 公里，只是同名 Wat Tham Suea。' },
        { q: '哪座台阶更多？', a: '甲米有著名的 1,237–1,260 级登顶台阶；北碧府主攀登约 157 级。' },
        { q: '哪座才是“真正的”虎穴寺？', a: '两座都是真寺院；“虎穴寺”是泰国寺院的常见名称。甲米那座是国际知名的徒步目的地。' },
        { q: '本站有北碧府寺院吗？', a: '没有——本站专设甲米虎穴寺，提及北碧府仅为避免混淆。' },
        { q: '一趟行程能逛两座吗？', a: '只有安排充足车程才行；两者分处泰国不同地区，多数游客按行程择一。' },
      ],
      related: [
        { slug: 'tiger-cave-temple-steps', label: '台阶与登顶' },
        { slug: 'opening-hours-entrance-fee', label: '开放时间与门票' },
        { slug: 'how-to-get-there', label: '如何到达' },
        { slug: 'best-time-to-visit', label: '最佳游览时间' },
      ],
    },
  },
};
