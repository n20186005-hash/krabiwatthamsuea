import type { TopicContent } from './topics';

// English-language planning guides. Each topic answers a separate visitor decision;
// do not create untranslated /th/ or /zh/ equivalents.
type Guide = [string, string, string, [string, string][], string, string];

const guides: Guide[] = [
  ['summit-viewpoint','Summit Viewpoint & Golden Buddha','What you can see at the top and how to plan time around the panorama',[
    ['The reward at the summit','The summit terrace gives an elevated view of Krabi’s limestone formations, forest and lowland settlements. Visibility changes quickly with haze and rain, so a cloudless forecast is helpful but not a guarantee.'],
    ['The Buddha and temple space','The large golden Buddha is a devotional image, not simply a photo prop. Leave room for people praying, remove footwear where signs request it and keep voices quiet.'],
    ['How to photograph the view','A wide-angle lens captures the statue and surrounding terrain; a longer lens isolates distant karsts. Protect cameras from sweat and sudden showers.'],
    ['How much time to reserve','Allow about two to three hours for a return climb with summit time, and longer in hot weather or if you stop frequently. Visitors who skip the stairs can still explore the base.']
  ],'Is the summit viewpoint accessible without stairs?','No step-free way to the summit should be assumed; enjoy the ground-level temple if stairs are unsuitable.'],
  ['sunrise-visit','Sunrise Visit Planning','Early morning light, travel logistics and a safe descent',[
    ['Before setting an alarm','Sunrise timing varies through the year. Check the date-specific time, temple access arrangements and whether the steps can be used before daylight.'],
    ['Do not climb unlit stairs','The staircase is steep and portions may be slippery. If access or lighting is uncertain, plan an early daylight start instead of climbing in darkness.'],
    ['Morning transport','Prearrange a return taxi or confirm ride-hailing availability if staying in Ao Nang. Carry drinking water even when the morning feels cool.'],
    ['Photography plan','The landscape may be hazy, misty or clear. Keep the camera dry and avoid blocking worshippers or narrow walking areas.']
  ],'Can I guarantee a sunrise view from the top?','No. Weather, visibility and access all vary; plan an alternative early-morning visit.'],
  ['sunset-visit','Sunset Visit & Descent','How to enjoy late light without getting caught on the steps after dark',[
    ['Work backward from daylight','Check the sunset time and leave sufficient time to descend the entire staircase before dark. Climbing speed alone is not a safe estimate.'],
    ['Late-afternoon heat','The concrete can retain heat even when the air starts to cool. Take water and rest breaks, especially on exposed sections.'],
    ['Choose a turnaround time','If the ascent takes longer than expected, turn around rather than rushing downhill. The view is not worth a dark descent.'],
    ['Getting back','Arrange transport to your accommodation in advance. Waiting for a ride late in the day can extend the outing.']
  ],'Is a sunset climb recommended for everyone?','No. First-time climbers should prioritize a daylight descent and adjust plans to fitness and access hours.'],
  ['rainy-season','Rainy Season Guide','Wet stairs, passing showers and flexible alternatives',[
    ['What changes in wet weather','Rain makes stair treads and handrails slippery, reduces distant views and increases the risk of sudden downpours.'],
    ['Check conditions on arrival','A forecast for Krabi does not describe every hillside shower. Look at the actual sky and ask on-site staff about any restrictions.'],
    ['What to bring','Use grippy footwear and a small waterproof bag. Avoid umbrellas while negotiating steep steps because one hand should remain free.'],
    ['Lower-level alternative','Visit the prayer halls and base-area shrines when a summit climb would be unsafe. Never enter closed forest paths.']
  ],'Should I climb during a thunderstorm?','No. Postpone the summit ascent when lightning or heavy rain is present.'],
  ['hot-season','Hot Weather & Hydration','Manage heat on the exposed staircase',[
    ['Start early','A morning start usually offers more forgiving temperatures than the midday climb, particularly on open upper sections.'],
    ['Water and breaks','Carry enough drinking water for your party and stop before exhaustion. Do not depend on a vendor being open at every stage.'],
    ['Recognize warning signs','Dizziness, confusion, nausea or unusual weakness are reasons to stop, cool down and seek assistance.'],
    ['Adjust the itinerary','Plan a shorter base visit or skip the summit when heat, illness or insufficient water makes the climb risky.']
  ],'Is the route shaded?','Parts run through forest, but exposed sections can be very hot.'],
  ['what-to-wear','Dress Code & Footwear','Temple etiquette alongside practical clothing for a steep climb',[
    ['Respect the sacred site','Cover shoulders and knees in worship spaces and follow signs about footwear. Carry a light cover-up if arriving in hiking clothes.'],
    ['Shoes for the stairs','Choose secure, grippy shoes that handle uneven, steep steps. Loose sandals can slip on damp concrete.'],
    ['Packing light','A small bag makes climbing easier; keep both hands available near railings. Bring sunscreen and a hat for exposed areas.'],
    ['At the shrines','Remove shoes where indicated and avoid posing on sacred objects or standing in the path of people praying.']
  ],'Can I wear shorts?','Bring a wrap or clothing that covers knees in temple areas, even if shorts are comfortable on the climb.'],
  ['monkeys-safety','Monkeys at Tiger Cave Temple','How to avoid food theft and unsafe wildlife encounters',[
    ['Keep a distance','Macaques may approach people around the grounds and stairs. Do not touch, chase or feed them.'],
    ['Secure possessions','Keep food out of sight and zip bags closed. Avoid dangling plastic bags, drinks or shiny loose objects.'],
    ['If a monkey approaches','Stay calm, avoid staring or cornering it, and slowly give it space. Do not fight over an item.'],
    ['After a bite or scratch','Wash the wound thoroughly and seek urgent medical advice for assessment; animal bites can require preventive treatment.']
  ],'Can children feed the monkeys?','No. Feeding encourages animals to approach people and can lead to bites or snatching.'],
  ['families-with-children','Visiting with Children','A realistic family plan for the temple and climb',[
    ['Choose the route together','The full staircase is demanding even for adults. Decide before arrival whether a ground-level visit better matches your children’s stamina.'],
    ['Plan rest stops','Pack water, sun protection and snacks kept securely away from monkeys. Keep children within reach near stairs.'],
    ['Temple learning','At the base, explain shoes-off rules, quiet voices and why people make offerings. This can be a meaningful visit without reaching the summit.'],
    ['Know when to turn around','Heat, fatigue or fear of steep steps are sufficient reasons to descend. Never pressure children to finish the climb.']
  ],'Is it stroller friendly?','Do not expect stroller access on the summit stairs; plan around the more level areas at the base.'],
  ['older-visitors','Older Visitors & Mobility','Alternatives to the strenuous summit ascent',[
    ['Evaluate the staircase','Hundreds of steep risers and hot conditions make the summit unsuitable for some people with joint, heart or balance concerns.'],
    ['Enjoy the base','The main temple grounds offer cultural interest without completing the climb. Surface conditions and access still vary by area.'],
    ['Pace and support','If you do climb, avoid rushing and use rests. Consider personal medical advice when exercise tolerance is uncertain.'],
    ['Transport close to entry','Ask your driver about the most convenient drop-off point and arrange pickup before the visit.']
  ],'Is there a lift to the summit?','Do not plan on elevator or wheelchair access to the summit viewpoint.'],
  ['solo-travel','Solo Visitor Guide','Transport, timing and sensible precautions when visiting alone',[
    ['Tell someone your plan','Share your approximate arrival and return time, particularly if starting early or traveling from outside Krabi Town.'],
    ['Carry essentials','Take water, a charged phone and an offline map. Keep valuables secure around monkeys and crowded shrines.'],
    ['Choose daylight','A daylight ascent and descent makes navigation easier and allows time for unexpected weather or fatigue.'],
    ['Return transport','Confirm a taxi pickup or ride app coverage before leaving, rather than relying on a late pickup.']
  ],'Is it easy to visit alone?','Yes for many independent visitors, provided transport and daylight timing are planned.'],
  ['photography-spots','Photography Spots & Etiquette','Temple details, summit compositions and respectful camera use',[
    ['At the summit','Look for frames combining the golden Buddha with distant limestone formations; visibility and sun position change the result.'],
    ['At ground level','Temple roofs, statues and forest details offer worthwhile compositions without the long climb.'],
    ['Respect worshippers','Do not interrupt ceremonies or enter roped-off areas for a better angle. Ask permission before close portraits.'],
    ['Protect equipment','Humidity, sweat and sudden rain are common practical challenges. Keep your camera secured while using stair rails.']
  ],'Can I use a drone?','Do not assume drone flying is permitted; check Thai aviation rules and seek site permission before any flight.'],
  ['half-day-itinerary','Half-Day Itinerary from Krabi Town','A flexible morning visit with travel and rest time',[
    ['Leave Krabi Town','Travel north to the temple with a morning start. Allow margin for local traffic and parking.'],
    ['Explore the base first','Visit the cave and monastery area respectfully, then decide whether the climb suits the day’s weather.'],
    ['Optional summit climb','Set aside roughly two to three hours for climbing, resting, photographs and descending.'],
    ['Return for a meal','Travel back toward Krabi Town for lunch rather than depending on full dining facilities at the temple.']
  ],'Can I do it in two hours?','A base visit may fit; a relaxed summit climb often requires a longer window.'],
  ['one-day-krabi-itinerary','One-Day Krabi Town & Temple Route','Combine Wat Tham Suea with Krabi Town highlights',[
    ['Morning temple visit','Begin with Wat Tham Suea while conditions are cooler; check access and decide whether to take the summit stairs.'],
    ['Lunch in Krabi Town','Return toward the town centre for a meal and a rest after the exertion of the climb.'],
    ['Riverside walk','Explore the Krabi River waterfront and town streets at an unhurried pace later in the day.'],
    ['Keep the schedule flexible','Leave room for rain, transport delays and changing energy levels; avoid treating every stop as mandatory.']
  ],'Does this require a rental car?','No, but arrange transfers in advance if you do not have your own vehicle.'],
  ['from-ao-nang','From Ao Nang to Tiger Cave Temple','Road transfer options and a realistic half-day budget',[
    ['Distance and journey','Ao Nang is west of Krabi Town; allow roughly 30–50 minutes by road, depending on traffic and pickup location.'],
    ['Private taxi','Agree on return fare and waiting time before departure. A driver who waits can simplify the trip after a tiring climb.'],
    ['Ride-hailing','Check whether an app has return availability at the temple; service coverage and prices change.'],
    ['Plan beach time separately','Do the climb early if possible, then leave afternoon flexibility for Ao Nang rather than rushing between activities.']
  ],'Can I walk from Ao Nang?','No practical sightseeing walk is recommended; travel by road transport.'],
  ['from-krabi-airport','From Krabi Airport','Planning a temple stop before or after a flight',[
    ['Route planning','The temple is inland from Krabi Airport; allow a separate road transfer and check current travel time in maps.'],
    ['Arrival-day visit','Factor in immigration, baggage, heat and fatigue before committing to a strenuous summit climb.'],
    ['Departure-day visit','Leave a generous airport buffer and avoid the summit if it might compromise check-in time.'],
    ['Luggage','Do not assume secure luggage storage exists at the temple; arrange storage with your hotel or transport provider.']
  ],'Is it a good stop with luggage?','Only when you have already arranged secure luggage storage and enough flight buffer.'],
  ['from-railay','From Railay Beach','Boat-plus-road journey to the inland temple',[
    ['No direct road from Railay','Railay is reached by boat, so travel to a road-connected pier before continuing inland.'],
    ['Allow for boat schedules','Sea conditions and boat availability can affect both directions; check locally before setting out.'],
    ['Road transfer','From the pier, use a taxi or prearranged transfer to the temple and confirm the return leg.'],
    ['Time budget','Treat this as a substantial half-day or longer outing, particularly if you want the summit climb.']
  ],'Can I take one taxi all the way from Railay?','No. A boat connection is required before any road journey.'],
  ['parking-and-driving','Parking & Driving Directions','What motorists and scooter riders should know',[
    ['Finding the entrance','Navigate to the Krabi Wat Tham Suea location, not the similarly named temple in Kanchanaburi.'],
    ['Parking on arrival','Parking is generally available at the base, but spaces and traffic arrangements can change on busy days.'],
    ['Scooter caution','Only ride if appropriately licensed and experienced. Wear a helmet and be alert to rain and road conditions.'],
    ['Before departing','Set a return route, carry water and avoid driving when exhausted by the staircase climb.']
  ],'Is parking guaranteed?','No. Check signs and staff directions, especially during events or busy periods.'],
  ['taxi-grab-transport','Taxi, Grab & Return Transfers','Choosing and arranging transport without a rental vehicle',[
    ['Compare options','Private taxis, hotel-arranged drivers and ride-hailing may all be possible, depending on your departure point.'],
    ['Agree on waiting time','A summit visit can take several hours; make sure a quoted return fare includes the wait you need.'],
    ['Avoid fixed-fare assumptions','Prices change with traffic, time and demand. Compare current quotes before committing.'],
    ['Backup return plan','Keep a driver contact or reliable alternative if an app cannot find a ride at the temple.']
  ],'Can I always book Grab for the return?','Availability varies; confirm a backup before you start climbing.'],
  ['temple-history','History of Wat Tham Suea Krabi','The monastery, forest setting and living religious tradition',[
    ['A functioning monastery','Wat Tham Suea is a place of Buddhist worship and monastic practice as well as a popular visitor destination.'],
    ['Why Tiger Cave?','Local accounts associate the name with tiger imagery and the cave setting. Distinguish local tradition from independently documented wildlife history.'],
    ['Forest and cave landscape','The site’s limestone terrain, wooded slopes and shrines shape both its devotional character and visitor experience.'],
    ['Visiting respectfully','Read on-site interpretation and follow monastery rules; worship and ceremonies take priority over sightseeing.']
  ],'Is it only a tourist viewpoint?','No. It is an active religious site and should be treated as such.'],
  ['buddhist-etiquette','Buddhist Temple Etiquette','How to behave around shrines, monks and offerings',[
    ['Dress modestly','Keep shoulders and knees covered in worship spaces and observe posted instructions about shoes.'],
    ['Be mindful of people praying','Speak softly, keep pathways open and wait until ceremonies finish before taking photographs.'],
    ['Offerings and donations','Donations are voluntary. Do not photograph donation boxes or worshippers intrusively.'],
    ['Ask when uncertain','Temple staff and local signs take precedence over generalized visitor advice.']
  ],'May I photograph monks?','Ask permission and respect a refusal, especially during religious practice.'],
  ['cave-and-ground-temples','Cave & Ground-Level Temples','What to see if you do not climb to the summit',[
    ['Begin at the monastery','Spend time around the main shrines and temple architecture before considering the staircase.'],
    ['Cave areas','Some spaces are used for worship or meditation; access can vary. Follow barriers and any footwear signs.'],
    ['Look beyond the summit','Forest scenery, statues and daily temple life provide reasons to visit without the strenuous ascent.'],
    ['Plan a gentle visit','Allow roughly 45–90 minutes at the base, depending on what is open and your personal pace.']
  ],'Do I have to climb the stairs to enjoy the temple?','No. The base is a worthwhile destination in its own right.'],
  ['krabi-town-nearby','Krabi Town After the Temple','Ideas for a relaxed afternoon close to town',[
    ['Head back to town','After the temple, return toward Krabi Town for food, rest and riverside scenery.'],
    ['Krabi River waterfront','Take an easy stroll along the public waterfront; weather and available shade influence comfort.'],
    ['Local markets','Check which markets operate on the day of your visit instead of assuming evening stalls run daily.'],
    ['Do not overpack the day','A demanding summit climb may leave less energy for further sightseeing than expected.']
  ],'Can I combine the temple with Krabi Town?','Yes. A morning temple visit and relaxed afternoon in town is a sensible pairing.'],
  ['emerald-pool-combination','Temple & Emerald Pool in One Day','A long inland excursion and its trade-offs',[
    ['Two different experiences','The temple is a cultural site with a steep ascent; Emerald Pool is an inland nature attraction with its own walking routes.'],
    ['Consider driving time','These are not adjacent sights. Check map routes and open hours before booking both in one day.'],
    ['Manage exertion','A summit climb followed by more walking can be tiring in tropical heat. Prioritize one main activity if needed.'],
    ['Transport logistics','A private driver or organized tour can reduce transfer uncertainty; confirm each stop and waiting allowance.']
  ],'Are the two attractions next door to each other?','No. Expect a separate road journey and budget substantial time.'],
  ['hot-springs-combination','Temple & Krabi Hot Springs','How to structure an inland day trip',[
    ['Early temple first','Starting at the temple can avoid some of the midday heat on the summit staircase.'],
    ['Continue inland','The hot springs are a separate destination requiring road travel; check current opening and bathing conditions.'],
    ['Pack separately','Bring dry clothing and appropriate swimwear if bathing is permitted, alongside temple-appropriate clothing.'],
    ['Choose a realistic pace','Do not add every inland attraction automatically; leave time for meals and unexpected weather.']
  ],'Can I visit both without private transport?','It may be possible with tours or transfers, but independent connections require careful planning.'],
  ['krabi-rainy-day-alternative','Rainy-Day Alternatives Near Krabi','What to do when the staircase is too slippery',[
    ['Skip hazardous stairs','If heavy rain or thunderstorms make the climb unsafe, do not force the summit plan.'],
    ['Visit accessible base areas','Where open, the monastery and covered shrines may still offer a meaningful cultural stop.'],
    ['Head into Krabi Town','Consider a meal, café or indoor activity, checking current opening rather than assuming all venues operate.'],
    ['Try another day','Keep a flexible weather window for the viewpoint if it is a priority of your trip.']
  ],'Is the temple closed whenever it rains?','Not necessarily; specific access restrictions should be checked on site.'],
  ['common-mistakes','Common First-Time Visitor Mistakes','Avoiding poor timing, wrong destinations and unrealistic plans',[
    ['Choosing the wrong Tiger Cave Temple','Confirm the map says Krabi; a different Wat Tham Suea is located in Kanchanaburi.'],
    ['Underestimating the climb','The summit staircase is a serious physical effort, not a short set of ornamental steps.'],
    ['Forgetting return transport','Confirm your route back before the ascent, particularly if you will finish late.'],
    ['Ignoring temple etiquette','Carry modest clothing, respect shrine rules and never feed the monkeys.']
  ],'What is the most important preparation?','Confirm the correct Krabi location, daylight, water and a return plan.'],
];

export const extendedGuides: Record<string, TopicContent> = Object.fromEntries(guides.map(([slug, name, focus, blocks, question, answer]) => {
  const related = ['tiger-cave-temple-steps', 'opening-hours-entrance-fee', 'how-to-get-there', 'best-time-to-visit']
    .map((s) => ({ slug: s, label: ({ 'tiger-cave-temple-steps': 'Summit steps', 'opening-hours-entrance-fee': 'Hours and entrance', 'how-to-get-there': 'Getting there', 'best-time-to-visit': 'When to visit' } as Record<string, string>)[s] }));
  return [slug, {
    slug, title: `${name} | Wat Tham Suea Krabi Visitor Guide`,
    description: `${focus}. Practical planning advice for Wat Tham Suea (Tiger Cave Temple) in Krabi, Thailand.`,
    eyebrow: 'Krabi visitor planning', h1: name,
    intro: `${focus}. This guide concerns Wat Tham Suea in Krabi, Thailand, not the similarly named temple in Kanchanaburi. Conditions, site instructions and transport options can change, so check locally before setting out.`,
    updated: 'November 2026', cardLabel: name, cardDesc: focus,
    sections: blocks.map(([heading, body], i) => ({ id: `section-${i+1}`, heading, body })),
    faq: [{q: question, a: answer}, {q: 'Where is the correct Wat Tham Suea?', a: 'This guide is for Tiger Cave Temple in Krabi. Use the destination-specific Google Maps link on this page to avoid confusing it with Wat Tham Suea in Kanchanaburi.'}], related,
  } satisfies TopicContent];
}));
