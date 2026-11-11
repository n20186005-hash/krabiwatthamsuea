type Section = { heading: string; paragraphs: string[] };
type LegalCopy = {
  privacyTitle: string; privacyIntro: string; privacy: Section[];
  termsTitle: string; termsIntro: string; terms: Section[];
  cookieTitle: string; cookieIntro: string; essential: string; essentialInfo: string;
  analytics: string; analyticsInfo: string; allow: string; reject: string;
  status: string; granted: string; denied: string; notSet: string; saved: string;
  cookieDetails: Section[]; updated: string; back: string;
};

export const legal: Record<string, LegalCopy> = {
  en: {
    privacyTitle: 'Privacy Policy', privacyIntro: 'How this independent Wat Tham Suea travel guide handles visitor data.', updated: 'Last updated: 11 November 2026', back: 'Back to home',
    privacy: [
      { heading: '1. What this website does', paragraphs: ['krabiwatthamsuea.com provides general visitor information about Wat Tham Suea in Krabi. You can read the public pages without creating an account or submitting your name, address or payment details.'] },
      { heading: '2. Information processed', paragraphs: ['Our hosting and security infrastructure may process technical request information such as IP address, browser type, requested URL, timestamp and diagnostic data to deliver pages, protect the service and investigate faults.', 'A theme preference may be stored in your browser. Google Analytics is only loaded if you explicitly enable optional analytics in Cookie Settings. If enabled, Google may process usage events and associated identifiers under its own terms.'] },
      { heading: '3. Purposes and choices', paragraphs: ['Technical processing supports delivery, performance and abuse prevention. Optional analytics helps us understand aggregate visits and improve guides. Analytics is disabled until you opt in; you can change that choice at any time on the Cookie Settings page.'] },
      { heading: '4. External services and links', paragraphs: ['The website links to Google Maps, reference sites and photograph sources. Opening those links takes you to a third party with its own privacy practices. Weather information may be incorporated from external public-data services during site generation.'] },
      { heading: '5. Retention and rights', paragraphs: ['Your analytics choice and theme preference are stored locally until changed or cleared. Hosting providers and, when consent is given, analytics providers apply their own retention settings. Browser controls can clear site storage.', 'For privacy questions or technical support, email laupetter72@gmail.com. We will review requests within the limits of the information and services under our control.'] },
      { heading: '6. Changes', paragraphs: ['We may revise this policy when site features or service providers change. The update date at the top indicates the current version.'] },
    ],
    termsTitle: 'Terms of Service', termsIntro: 'Conditions for using this independent travel-information website.',
    terms: [
      { heading: '1. Informational purpose', paragraphs: ['This is an independent, non-profit visitor information project. It is not affiliated with any government agency, official tourism organization, Wat Tham Suea or its managing religious community. Information is provided for general planning purposes without commercial recommendations.'] },
      { heading: '2. Accuracy and changing conditions', paragraphs: ['Visitor information is compiled from public materials, including Thailand tourism sources, relevant Krabi-area public information and the references listed on our Sources and Updates page. Opening hours, admission practices, transport availability, prices, trail access and weather can change without notice. Check official announcements and local signs before visiting. No guarantee is made that every detail is current or complete.'] },
      { heading: '3. Visitor responsibility', paragraphs: ['Climbing steep temple steps and travelling in tropical conditions involve risks. Follow local rules, respect religious practice and wildlife, and make decisions according to your own health and circumstances.'] },
      { heading: '4. Photos, content and links', paragraphs: ['The rights to displayed photographs remain with their original photographers or respective rights holders. The Photo Credits page identifies published image sources where available. Links to third parties are provided for convenience and do not imply endorsement or control over their services.'] },
      { heading: '5. No bookings or transactions', paragraphs: ['This guide does not itself sell admission, arrange travel reservations or process payments. Transactions with external providers are governed by their own terms.'] },
      { heading: '6. Changes and availability', paragraphs: ['We may correct, update or remove guide content and adjust site functions. The website may be temporarily unavailable due to maintenance, hosting or network conditions.'] },
    ],
    cookieTitle: 'Cookie Settings', cookieIntro: 'Choose whether this guide may load optional Google Analytics. Essential site functions remain available either way.',
    essential: 'Essential preferences & functionality', essentialInfo: 'Always active: theme preference, site operation and possible service-worker caching. These are not advertising or analytics consent.',
    analytics: 'Optional analytics', analyticsInfo: 'Google Analytics (measurement ID G-HXM22WWPKP) helps estimate visits and page use. It loads only after you select Allow. No advertising consent is requested.',
    allow: 'Allow analytics', reject: 'Reject / withdraw analytics', status: 'Current choice', granted: 'Allowed', denied: 'Rejected', notSet: 'Not chosen (disabled)', saved: 'Preference saved.',
    cookieDetails: [
      { heading: 'Browser storage', paragraphs: ['The site uses localStorage for your visual theme and analytics choice. A service worker may cache public files for performance and offline use. If analytics is permitted, Google may set identifiers such as _ga in your browser.'] },
      { heading: 'Changing or clearing choices', paragraphs: ['Use the buttons above at any time. Rejecting stops further analytics calls from this site, but browser-stored third-party or historic data may require clearing cookies or browser site data. You can also block cookies in your browser settings.'] },
    ],
  },
  zh: {
    privacyTitle: '隐私政策', privacyIntro: '说明本站如何处理访问甲米虎穴寺旅游指南时涉及的信息。', updated: '最近更新：2026年11月11日', back: '返回首页',
    privacy: [
      { heading: '一、网站用途', paragraphs: ['krabiwatthamsuea.com 为甲米虎穴寺提供独立的旅游科普资料。浏览公开内容无需注册账号，也无需提供姓名、住址或付款资料。'] },
      { heading: '二、可能处理的信息', paragraphs: ['网站托管及安全服务可能为传送页面、排查故障及防止滥用而处理 IP 地址、浏览器类型、访问路径、时间与技术日志。', '网站可在浏览器本地保存主题外观偏好。只有在你主动同意分析功能后才会加载 Google Analytics；启用后，Google 可能依其服务条款处理使用事件及相关标识符。'] },
      { heading: '三、使用目的与选择', paragraphs: ['必要技术处理用于网站运行、性能与安全。可选统计帮助了解整体浏览情况并改进攻略。统计默认关闭，可随时在 Cookie 设置页更改。'] },
      { heading: '四、第三方服务', paragraphs: ['本站包含 Google Maps、资料来源及图片来源等外部链接。离开本站后适用第三方的隐私规则。天气资料也可能在网站构建时来自公开气象服务。'] },
      { heading: '五、保留与权利', paragraphs: ['主题偏好和统计选择保存在本机浏览器，直至修改或清除。托管及统计提供方适用各自的数据保留安排。你可以通过浏览器清除本站资料。', '隐私疑问、资料反馈及网站技术支持请联系 laupetter72@gmail.com。本站仅能处理自身可控制范围内的信息。'] },
      { heading: '六、政策更新', paragraphs: ['网站功能或服务商变化时可能更新本政策，以页面所示更新日期为准。'] },
    ],
    termsTitle: '服务条款', termsIntro: '使用本独立旅游资讯网站时适用的基本条件。',
    terms: [
      { heading: '一、信息性质', paragraphs: ['本网站是独立的非营利游客信息项目，与任何政府机构、官方旅游组织、甲米虎穴寺及其管理方均无隶属关系。内容供一般行程规划参考，不构成商业性推荐。'] },
      { heading: '二、信息准确性及资料来源', paragraphs: ['本站资料整理自公开来源，包括泰国旅游资料、甲米地区相关公开信息及「资料来源与信息更新」页面列出的参考链接。原页脚曾提及清莱府，但本景点位于甲米府，故不将清莱府资料概称为本寺的信息来源。开放时间、收费、交通、阶梯通行、天气等可能临时变化，出发前应核对现场公告及官方信息。本站不保证所有资料始终完整或实时准确。'] },
      { heading: '三、游客责任', paragraphs: ['登山阶梯、热带天气和野生动物可能带来风险。游客应遵守现场管理、尊重宗教活动，并按自身健康和能力作出决定。'] },
      { heading: '四、图片与外部链接', paragraphs: ['本网站展示照片的相关权利归原摄影者或相应权利人所有。原有的图片来源记录集中在「图片来源」页面。外部链接仅用于辅助查询，不代表本站控制或认可第三方服务。'] },
      { heading: '五、交易服务', paragraphs: ['本站不直接出售门票、不接受旅游预订或处理付款。与外部服务商发生的交易适用其自身条款。'] },
      { heading: '六、变更与中断', paragraphs: ['本站可能更新、修正内容，或因维护、托管和网络状况暂时中断服务。'] },
    ],
    cookieTitle: 'Cookie 设置', cookieIntro: '由你决定是否允许本站加载可选的 Google Analytics 统计。拒绝不会影响阅读指南。',
    essential: '必要偏好与功能', essentialInfo: '始终启用：主题外观偏好、网站运行及可能的离线缓存，不代表同意广告或统计。',
    analytics: '可选统计', analyticsInfo: 'Google Analytics（编号 G-HXM22WWPKP）帮助了解访问与页面使用情况。只有点击允许后才会加载，不请求广告追踪同意。',
    allow: '允许统计', reject: '拒绝／撤回统计同意', status: '当前选择', granted: '已允许', denied: '已拒绝', notSet: '尚未选择（默认关闭）', saved: '设置已保存。',
    cookieDetails: [
      { heading: '浏览器保存内容', paragraphs: ['本站使用 localStorage 保存主题外观和统计同意状态；Service Worker 可能缓存公开文件。允许统计后，Google 可能设置 _ga 等浏览器标识符。'] },
      { heading: '更改与清除', paragraphs: ['可随时使用上方按钮更改选择。拒绝后本站停止后续统计调用，但已存在的第三方或历史 Cookie 可能需要通过浏览器清除站点数据。'] },
    ],
  },
  th: {
    privacyTitle: 'นโยบายความเป็นส่วนตัว', privacyIntro: 'ข้อมูลเกี่ยวกับการจัดการข้อมูลผู้เข้าชมคู่มือวัดถ้ำเสือ กระบี่', updated: 'ปรับปรุงล่าสุด: 11 พฤศจิกายน 2026', back: 'กลับหน้าหลัก',
    privacy: [
      { heading: '1. วัตถุประสงค์', paragraphs: ['krabiwatthamsuea.com เป็นคู่มือท่องเที่ยวอิสระเกี่ยวกับวัดถ้ำเสือ กระบี่ อ่านเนื้อหาได้โดยไม่ต้องสร้างบัญชีหรือให้ข้อมูลการชำระเงิน'] },
      { heading: '2. ข้อมูลที่อาจมีการประมวลผล', paragraphs: ['ระบบโฮสติ้งและความปลอดภัยอาจประมวลผล IP เบราว์เซอร์ เส้นทางที่เข้าชม เวลา และข้อมูลทางเทคนิคเพื่อให้บริการและป้องกันการใช้งานผิดปกติ', 'เว็บไซต์อาจบันทึกธีมในเบราว์เซอร์ Google Analytics จะโหลดเฉพาะเมื่อคุณยินยอม โดย Google อาจประมวลผลข้อมูลการใช้งานตามข้อกำหนดของตน'] },
      { heading: '3. การใช้งานและทางเลือก', paragraphs: ['ข้อมูลทางเทคนิคใช้เพื่อให้เว็บไซต์ทำงานและปลอดภัย การวิเคราะห์แบบเลือกได้ใช้ปรับปรุงคู่มือ โดยปิดเป็นค่าเริ่มต้นและเปลี่ยนได้ในหน้าตั้งค่าคุกกี้'] },
      { heading: '4. บริการภายนอก', paragraphs: ['ลิงก์ Google Maps แหล่งข้อมูล และรูปภาพจะนำไปยังบริการที่มีนโยบายของตน ข้อมูลอากาศอาจมาจากบริการข้อมูลสาธารณะระหว่างการสร้างเว็บไซต์'] },
      { heading: '5. การเก็บรักษาและสิทธิ', paragraphs: ['ธีมและตัวเลือกการวิเคราะห์เก็บในเบราว์เซอร์จนกว่าจะเปลี่ยนหรือล้างข้อมูล ผู้ให้บริการโฮสติ้งและวิเคราะห์มีเงื่อนไขการเก็บรักษาของตน', 'หากมีคำถามด้านความเป็นส่วนตัวหรือการสนับสนุนด้านเทคนิค ติดต่อ laupetter72@gmail.com โดยเราดำเนินการได้เฉพาะข้อมูลที่อยู่ในความควบคุมของเรา'] },
      { heading: '6. การปรับปรุง', paragraphs: ['นโยบายอาจปรับเมื่อคุณสมบัติหรือผู้ให้บริการเปลี่ยน โปรดดูวันที่ปรับปรุงด้านบน'] },
    ],
    termsTitle: 'ข้อกำหนดการใช้บริการ', termsIntro: 'เงื่อนไขพื้นฐานสำหรับการใช้คู่มือท่องเที่ยวอิสระนี้',
    terms: [
      { heading: '1. ข้อมูลเพื่อการศึกษา', paragraphs: ['เว็บไซต์นี้เป็นโครงการข้อมูลนักท่องเที่ยวอิสระที่ไม่แสวงหากำไร ไม่มีความเกี่ยวข้องกับหน่วยงานรัฐบาล องค์กรท่องเที่ยวทางการ วัดถ้ำเสือ หรือผู้ดูแลวัด และไม่มีคำแนะนำเชิงพาณิชย์'] },
      { heading: '2. ความถูกต้องและแหล่งข้อมูล', paragraphs: ['ข้อมูลรวบรวมจากแหล่งสาธารณะ รวมถึงข้อมูลท่องเที่ยวของประเทศไทยและข้อมูลที่เกี่ยวข้องกับจังหวัดกระบี่ ดูรายการอ้างอิงในหน้าแหล่งข้อมูลและการปรับปรุง เวลาเปิด ค่าใช้จ่าย การเดินทาง การเข้าถึงบันได และสภาพอากาศเปลี่ยนได้ ควรตรวจสอบประกาศทางการและป้ายในพื้นที่ก่อนเดินทาง'] },
      { heading: '3. ความรับผิดชอบของผู้เข้าชม', paragraphs: ['บันไดชัน อากาศร้อน และสัตว์ป่ามีความเสี่ยง โปรดปฏิบัติตามกฎ เคารพกิจกรรมทางศาสนา และประเมินสุขภาพของตน'] },
      { heading: '4. รูปภาพและลิงก์', paragraphs: ['สิทธิในรูปภาพและเนื้อหาจากภายนอกเป็นของเจ้าของที่เกี่ยวข้อง รายละเอียดแหล่งภาพอยู่ในหน้าเครดิตภาพ ลิงก์ภายนอกไม่ได้หมายถึงการรับรองบริการนั้น'] },
      { heading: '5. การทำธุรกรรม', paragraphs: ['เว็บไซต์นี้ไม่ได้จำหน่ายบัตรหรือดำเนินการจองและชำระเงินโดยตรง ธุรกรรมภายนอกเป็นไปตามเงื่อนไขของผู้ให้บริการนั้น'] },
      { heading: '6. การเปลี่ยนแปลง', paragraphs: ['เราอาจแก้ไขเนื้อหาและเว็บไซต์อาจหยุดให้บริการชั่วคราวเพราะการบำรุงรักษาหรือระบบเครือข่าย'] },
    ],
    cookieTitle: 'ตั้งค่าคุกกี้', cookieIntro: 'เลือกว่าจะอนุญาต Google Analytics หรือไม่ คุณยังอ่านคู่มือได้หากปฏิเสธ',
    essential: 'การตั้งค่าที่จำเป็น', essentialInfo: 'ทำงานเสมอ: ธีม การทำงานของเว็บไซต์ และแคชออฟไลน์ที่อาจมี ไม่ใช่การยินยอมติดตามโฆษณา',
    analytics: 'การวิเคราะห์แบบเลือกได้', analyticsInfo: 'Google Analytics (G-HXM22WWPKP) ใช้ดูภาพรวมการเข้าชม จะโหลดหลังจากคุณกดยอมรับเท่านั้น ไม่มีการขอความยินยอมโฆษณา',
    allow: 'อนุญาตการวิเคราะห์', reject: 'ปฏิเสธ / ถอนความยินยอม', status: 'การตั้งค่าปัจจุบัน', granted: 'อนุญาตแล้ว', denied: 'ปฏิเสธแล้ว', notSet: 'ยังไม่เลือก (ปิดอยู่)', saved: 'บันทึกแล้ว',
    cookieDetails: [
      { heading: 'ข้อมูลในเบราว์เซอร์', paragraphs: ['เว็บไซต์ใช้ localStorage บันทึกธีมและความยินยอม Service Worker อาจแคชไฟล์สาธารณะ หากอนุญาต Google อาจสร้างตัวระบุ เช่น _ga'] },
      { heading: 'การเปลี่ยนหรือล้าง', paragraphs: ['เปลี่ยนตัวเลือกได้ทุกเวลา การปฏิเสธหยุดการเรียกวิเคราะห์ต่อไป แต่อาจต้องล้างคุกกี้เดิมผ่านการตั้งค่าเบราว์เซอร์'] },
    ],
  },
};
