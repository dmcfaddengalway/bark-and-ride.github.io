/*
 * Bark & Ride — English / Gaeilge language switch.
 *
 * How it works: the pages are written in English. When Gaeilge is chosen,
 * every piece of visible text (plus alt/aria-label/title attributes and the
 * page <title>) is looked up in GA below by its exact English wording and
 * swapped for the Irish. The choice is remembered in the visitor's browser.
 *
 * Editing: if you change English text on a page, update (or add) the matching
 * key here too — otherwise that text simply stays in English. Elements whose
 * Irish needs different markup use data-i18n="key" and an entry in HTML.
 */
(function () {
  var STORAGE_KEY = 'bar-lang';

  var GA = {
    "About": "Eolas",
    "About Us": "Fúinn",
    "FAQ": "CCanna",
    "Routes": "Bealaí",
    "60km — Dunguaire Castle": "60km — Caisleán Dhún Guaire",
    "90km — Kilmacduagh Round Tower": "90km — Cloigtheach Chill Mhic Duach",
    "125km — Poulnabrone Dolmen": "125km — Tuama Pholl na Brón",
    "Training Guide ↓": "Treoir Traenála ↓",
    "Gallery": "Gailearaí",
    "Rider Zone": "Crios na Rothaithe",
    "Sponsors": "Urraitheoirí",
    "Contact": "Teagmháil",
    "Register": "Cláraigh",
    "Training Guide": "Treoir Traenála",
    "Register Now": "Cláraigh Anois",
    "Changing Lives": "Ag Athrú Saolta",
    "Ireland's national charity empowering people with vision impairment and families of children with autism through world-class dog partnerships — since 1976.": "Carthanas náisiúnta na hÉireann a chumasaíonn daoine faoi lagú radhairc agus teaghlaigh leanaí a bhfuil uathachas orthu trí chomhpháirtíochtaí madraí den scoth — ó 1976 i leith.",
    "One Community. Changing Lives.": "Pobal Amháin. Saolta á nAthrú.",
    "Irish Guide Dogs is Ireland's national charity dedicated to enabling people who are vision impaired and families of children with autism to achieve improved mobility and independence.": "Is é Irish Guide Dogs carthanas náisiúnta na hÉireann atá tiomanta do chabhrú le daoine faoi lagú radhairc agus le teaghlaigh leanaí a bhfuil uathachas orthu soghluaisteacht agus neamhspleáchas níos fearr a bhaint amach.",
    "For over 50 years, a community of breeders, puppy raisers, home socialisers, trainers, staff, volunteers and supporters has worked together to change as many lives as possible. All services are provided completely free of charge to clients.": "Le breis agus 50 bliain, tá pobal pórtóirí, tógálaithe coileán, sóisialaithe baile, traenálaithe, foirne, oibrithe deonacha agus lucht tacaíochta ag obair le chéile chun oiread saolta agus is féidir a athrú. Cuirtear gach seirbhís ar fáil saor in aisce do chliaint.",
    "Over 85% of our income comes from voluntary donations and fundraising — which is exactly where Bark & Ride comes in.": "Tagann breis agus 85% dár n-ioncam ó shíntiúis dheonacha agus ó thiomsú airgid — agus sin go díreach áit a dtagann Bark & Ride isteach.",
    "Years Changing Lives": "Bliain ag Athrú Saolta",
    "Active Guide & Assistance Dog Clients": "Cliaint Ghníomhacha Madraí Treorach & Cúnaimh",
    "Annual Cost to Run the Organisation": "Costas Bliantúil an Eagraíocht a Reáchtáil",
    "Free": "Saor",
    "All Services to Every Client": "Gach Seirbhís do Gach Cliant",
    "What Irish Guide Dogs Does": "Obair Irish Guide Dogs",
    "Three Ways We Change Lives": "Trí Bhealach a nAthraímid Saolta",
    "We run three life-changing programmes, all provided free of charge to the people and families who need them most.": "Reáchtálaimid trí chlár a athraíonn saolta, iad uile saor in aisce do na daoine agus na teaghlaigh is mó a bhfuil gá acu leo.",
    "Guide Dogs": "Madraí Treorach",
    "Highly trained dogs matched with people who have vision impairment, providing safe independent mobility, confidence and freedom to move through the world on their own terms.": "Madraí ardoilte a mheaitseáiltear le daoine faoi lagú radhairc, a thugann soghluaisteacht shábháilte neamhspleách, muinín agus saoirse dóibh bogadh tríd an saol ar a dtéarmaí féin.",
    "Assistance Dogs": "Madraí Cúnaimh",
    "Placed with families of children with autism, these dogs provide safety, calming support and help the whole family reconnect with their community. We were the first organisation in Europe to offer this programme, launching in 2005.": "Cuirtear iad le teaghlaigh leanaí a bhfuil uathachas orthu, agus tugann na madraí seo sábháilteacht agus tacaíocht shuaimhneach, agus cabhraíonn siad leis an teaghlach ar fad athcheangal lena bpobal. Ba sinne an chéad eagraíocht san Eoraip a chuir an clár seo ar fáil, in 2005.",
    "Ambassador Dogs": "Madraí Ambasadóra",
    "Visiting teams that bring the proven therapeutic benefits of dogs to hospitals, care homes, schools and community groups across Ireland — spreading warmth one wagging tail at a time.": "Foirne cuairte a thugann buntáistí teiripeacha cruthaithe na madraí chuig ospidéil, tithe altranais, scoileanna agus grúpaí pobail ar fud na hÉireann — ag scaipeadh teasa, eireaball amháin ag croitheadh ag an am.",
    "From Pup to Partner": "Ó Choileán go Comhpháirtí",
    "The Journey of a Guide Dog": "Aistear Madra Treorach",
    "In under two years, an Irish Guide Dog pup becomes one of the most skilled and responsible dogs in the country. Here's how that journey unfolds.": "I níos lú ná dhá bhliain, éiríonn coileán de chuid Irish Guide Dogs ar cheann de na madraí is oilte agus is freagraí sa tír. Seo mar a théann an t-aistear sin chun cinn.",
    "Puppy Academy": "Acadamh na gCoileán",
    "From 8 weeks old, pups move in with Puppy Raiser families for around 10 months — learning socialisation, obedience, and confidence in everything from busy towns to railway stations.": "Ó aois 8 seachtaine, bogann coileáin isteach le teaghlaigh Tógálaithe Coileán ar feadh thart ar 10 mí — ag foghlaim sóisialaithe, umhlaíochta agus muiníne i ngach áit ó bhailte gnóthacha go stáisiúin traenach.",
    "Technical Training": "Traenáil Theicniúil",
    "At around 13 months, pups return to the National Training Centre for advanced skills: crossing roads, avoiding obstacles, and the precise behaviours that keep a visually impaired person safe.": "Ag thart ar 13 mhí d'aois, filleann na coileáin ar an Ionad Náisiúnta Traenála le haghaidh scileanna ardleibhéil: bóithre a thrasnú, constaicí a sheachaint, agus na hiompraíochtaí beachta a choinníonn duine faoi lagú radhairc slán.",
    "The Perfect Match": "An Meaitseáil Foirfe",
    "Once trained, each dog is carefully matched with a client based on personality, pace and lifestyle. The pair attend residential training together before heading home — a partnership for life.": "Nuair a bhíonn sé traenáilte, meaitseáiltear gach madra go cúramach le cliant bunaithe ar phearsantacht, luas agus stíl mhaireachtála. Freastalaíonn an bheirt ar thraenáil chónaithe le chéile sula dtéann siad abhaile — comhpháirtíocht ar feadh an tsaoil.",
    "How Bark & Ride Helps": "Mar a Chabhraíonn Bark & Ride",
    "Pedalling to Fund It All": "Ag Rothaíocht chun Íoc as Gach Rud",
    "Every guide dog and assistance dog partnership costs approximately €50,000 to breed, raise and train — and every single one is provided free of charge to the client. That model only works because of people like you.": "Cosnaíonn gach comhpháirtíocht madra treorach agus madra cúnaimh thart ar €50,000 le pórú, le tógáil agus le traenáil — agus cuirtear gach ceann acu ar fáil saor in aisce don chliant. Ní oibríonn an tsamhail sin ach mar gheall ar dhaoine cosúil leatsa.",
    "Bark & Ride was created to raise vital funds for Irish Guide Dogs. Every registration fee and every euro fundraised by our riders goes directly towards training dogs, supporting clients and keeping all services free.": "Bunaíodh Bark & Ride chun airgead ríthábhachtach a bhailiú do Irish Guide Dogs. Téann gach táille chlárúcháin agus gach euro a bhailíonn ár rothaithe go díreach chun madraí a thraenáil, chun tacú le cliaint agus chun gach seirbhís a choinneáil saor in aisce.",
    "Start Time": "Am Tosaithe",
    "09:20 — all routes depart at similar times": "09:20 — imíonn gach bealach ag amanna cosúla",
    "Location": "Suíomh",
    "The Connacht Hotel, Dublin Road, Galway": "The Connacht Hotel, Bóthar Bhaile Átha Cliath, Gaillimh",
    "60km · 90km · 125km — something for every cyclist": "60km · 90km · 125km — rud éigin do gach rothaí",
    "Parking": "Páirceáil",
    "Free on-site parking at": "Páirceáil saor in aisce ar an láthair ag",
    "Join Us": "Bí Linn",
    "Clip In. Roll Out. Change a Life.": "Clip Isteach. Amach Leat. Athraigh Saol.",
    "With three routes designed for all levels — from first-time sportive riders to seasoned competitors — Bark & Ride is a day of great cycling in aid of an even greater cause.": "Le trí bhealach deartha do gach leibhéal — ó rothaithe spóirtiúla den chéad uair go hiomaitheoirí cruthaithe — is lá iontach rothaíochta é Bark & Ride ar son cúise níos iontaí fós.",
    "Every kilometre you ride helps us keep our services free for the people who need them most.": "Cabhraíonn gach ciliméadar a rothaíonn tú linn ár seirbhísí a choinneáil saor in aisce do na daoine is mó a bhfuil gá acu leo.",
    "Learn More About Irish Guide Dogs": "Tuilleadh Eolais faoi Irish Guide Dogs",
    "Discover the full story of the charity behind this cycle — 50 years of changing lives, one dog at a time.": "Faigh amach an scéal iomlán faoin gcarthanas atá taobh thiar den turas seo — 50 bliain ag athrú saolta, madra amháin ag an am.",
    "Visit guidedogs.ie": "Tabhair cuairt ar guidedogs.ie",
    "A charity cycling event in aid of Irish Guide Dogs, spanning Co. Galway and the breathtaking landscape of the Burren, Co. Clare.": "Imeacht rothaíochta carthanais ar son Irish Guide Dogs, ar fud Co. na Gaillimhe agus tírdhreach iontach na Boirne, Co. an Chláir.",
    "Event": "Imeacht",
    "Charity": "Carthanas",
    "© 2026 Bark & Ride. In aid of": "© 2026 Bark & Ride. Ar son",
    "Registered Charity Number 20009977 · Company Registration Number 55616 · Revenue Number CHY 6006": "Uimhir Charthanais Chláraithe 20009977 · Uimhir Chláraithe Cuideachta 55616 · Uimhir Ioncaim CHY 6006",
    "Open menu": "Oscail an roghchlár",
    "Irish Guide Dogs in training": "Irish Guide Dogs faoi thraenáil",
    "Cycling scenery": "Radharcra rothaíochta",
    "About – Bark & Ride 2026": "Fúinn – Bark & Ride 2026",
    "Everything you need to know before you clip in. Can't find what you're looking for? Drop us a message.": "Gach rud nach mór duit a bheith ar eolas agat sula gclipeálann tú isteach. Ní féidir leat an rud atá uait a aimsiú? Seol teachtaireacht chugainn.",
    "Table of Contents": "Clár Ábhair",
    "Registration & Entry": "Clárú & Iontráil",
    "On the Day": "Ar an Lá",
    "Bike & Gear": "Rothar & Trealamh",
    "Fundraising & Charity": "Tiomsú Airgid & Carthanas",
    "Still stuck?": "Fós i bponc?",
    "5 questions": "5 cheist",
    "How do I register for Bark & Ride?": "Conas a chláraím do Bark & Ride?",
    "You can register online through the Register button on our website. Registration is open now and places are limited, so we recommend signing up early to secure your spot on your preferred route.": "Is féidir leat clárú ar líne tríd an gcnaipe Cláraigh ar ár suíomh gréasáin. Tá an clárú oscailte anois agus tá líon na n-áiteanna teoranta, mar sin molaimid clárú go luath chun d'áit a áirithiú ar an mbealach is fearr leat.",
    "How much does entry cost?": "Cé mhéad a chosnaíonn iontráil?",
    "Entry costs €45 per person, for all three routes. This includes route support, food stops, mechanical support, and a finisher's medal. All proceeds go directly to Irish Guide Dogs.": "Cosnaíonn iontráil €45 an duine, do na trí bhealach ar fad. Áirítear leis seo tacaíocht bhealaigh, stadanna bia, tacaíocht mheicniúil, agus bonn críochnaitheora. Téann an t-airgead ar fad go díreach chuig Irish Guide Dogs.",
    "Where do I pick up my event pack?": "Cá mbailím mo phacáiste imeachta?",
    "Event packs are collected from the registration desk at": "Bailítear pacáistí imeachta ón deasc chlárúcháin ag",
    "on the morning of the event. Registration opens at 8:00am — we recommend arriving early to allow plenty of time before the 9:20am start.": "ar maidin an imeachta. Osclaíonn an clárú ag 8:00rn — molaimid teacht go luath chun neart ama a thabhairt duit roimh an tús ag 9:20rn.",
    "Can I change my route after registering?": "An féidir liom mo bhealach a athrú tar éis clárú?",
    "Yes, you can change your route up to one week before the event by contacting us via email. Route changes on the day are not possible for safety and logistics reasons.": "Is féidir, is féidir leat do bhealach a athrú suas le seachtain roimh an imeacht trí theagmháil a dhéanamh linn trí ríomhphost. Ní féidir bealaí a athrú ar an lá ar chúiseanna sábháilteachta agus lóistíochta.",
    "Is there an age limit for participants?": "An bhfuil teorainn aoise do rannpháirtithe?",
    "Participants must be 16 or older for the 90km and 125km routes. The 60km route is open to riders aged 14 and above, provided they are accompanied by a registered adult.": "Caithfidh rannpháirtithe a bheith 16 bliana d'aois nó níos sine do na bealaí 90km agus 125km. Tá an bealach 60km oscailte do rothaithe 14 bliana d'aois agus níos sine, ar choinníoll go mbíonn duine fásta cláraithe in éineacht leo.",
    "8 questions": "8 gceist",
    "What time does the event start?": "Cén t-am a thosaíonn an t-imeacht?",
    "Registration and sign-in opens at 8:00am at": "Osclaíonn clárú agus síniú isteach ag 8:00rn ag",
    ", Galway. All routes depart at 9:20am. We recommend arriving at least an hour before the start.": ", Gaillimh. Imíonn gach bealach ag 9:20rn. Molaimid teacht uair an chloig ar a laghad roimh an tús.",
    "Where is the start/finish location?": "Cá bhfuil suíomh an tosaigh/an deiridh?",
    "The event starts and finishes in": "Tosaíonn agus críochnaíonn an t-imeacht in",
    ", Galway. Full directions and parking information will be sent to all registered participants one week before the event.": ", Gaillimh. Seolfar treoracha iomlána agus eolas páirceála chuig gach rannpháirtí cláraithe seachtain roimh an imeacht.",
    "Are there food and water stops along the route?": "An bhfuil stadanna bia agus uisce ar an mbealach?",
    "Yes. All routes have fully stocked food and water stops at regular intervals. You can expect water, energy drinks, bananas, flapjacks, and other snacks. The 125km route has four stops, the 90km has three, and the 60km has two.": "Tá. Tá stadanna bia agus uisce lán-stocáilte ag eatraimh rialta ar gach bealach. Is féidir leat uisce, deochanna fuinnimh, bananaí, flapjacks agus sneaiceanna eile a bheith ag súil leo. Tá ceithre stad ar an mbealach 125km, trí cinn ar an 90km, agus dhá cheann ar an 60km.",
    "Are there toilets on the route?": "An bhfuil leithris ar an mbealach?",
    "Yes. There is a toilet stop on route in Kinvara. We recommend making use of facilities at the start in": "Tá. Tá stad leithris ar an mbealach i gCinn Mhara. Molaimid úsáid a bhaint as na háiseanna ag an tús in",
    "before departure as well.": "roimh imeacht freisin.",
    "Is mechanical support available on the route?": "An bhfuil tacaíocht mheicniúil ar fáil ar an mbealach?",
    "Yes, roaming mechanical support vehicles patrol all routes throughout the event. They can assist with punctures, minor repairs, and if necessary, transport you and your bike back to the finish.": "Tá, bíonn feithiclí tacaíochta meicniúla ag patról ar gach bealach le linn an imeachta. Is féidir leo cabhrú le pollta, deisiúcháin bheaga, agus más gá, tú féin agus do rothar a thabhairt ar ais go dtí an líne chríochnaithe.",
    "Are showers available after the event?": "An bhfuil cithfholcadáin ar fáil tar éis an imeachta?",
    "Yes, showers are available at the finish in": "Tá, tá cithfholcadáin ar fáil ag an líne chríochnaithe in",
    ". Please bring your own towel.": ". Tabhair do thuáille féin leat, le do thoil.",
    "Is there a massage available after the event?": "An bhfuil suathaireacht ar fáil tar éis an imeachta?",
    "Yes! Complimentary post-ride massage is available at the hotel for all participants — completely free of charge. A great reward after a hard day in the saddle.": "Tá! Tá suathaireacht saor in aisce ar fáil san óstán do gach rannpháirtí tar éis an turais. Luach saothair iontach tar éis lá crua sa diallait.",
    "What happens if the weather is bad?": "Cad a tharlaíonn má bhíonn an aimsir go dona?",
    "The event runs rain or shine — this is Ireland after all! In the case of extreme weather conditions that pose a genuine safety risk, we may shorten or alter routes. Any changes will be communicated on the morning of the event.": "Téann an t-imeacht ar aghaidh báisteach nó taitneamh — is í Éire atá ann, tar éis an tsaoil! I gcás drochaimsire a chruthaíonn fíorbhaol sábháilteachta, d'fhéadfaimis bealaí a ghiorrú nó a athrú. Cuirfear aon athruithe in iúl ar maidin an imeachta.",
    "Your Bike & Gear": "Do Rothar & Do Threalamh",
    "4 questions": "4 cheist",
    "What type of bike do I need?": "Cén cineál rothair atá ag teastáil uaim?",
    "A road bike is recommended for all routes. Hybrid or gravel bikes are fine for the 60km route. E-bikes are welcome on all routes. Mountain bikes and bikes with bar-end extensions are not permitted for safety reasons.": "Moltar rothar bóthair do gach bealach. Tá rothair hibrideacha nó gairbhéil ceart go leor don bhealach 60km. Tá fáilte roimh r-rothair ar gach bealach. Ní cheadaítear rothair sléibhe ná rothair a bhfuil síntí ar cheann na láimhe orthu ar chúiseanna sábháilteachta.",
    "Are E-bikes allowed?": "An gceadaítear r-rothair?",
    "Yes, E-bikes are fully welcome on all three routes — the 60km, 90km, and 125km. There are no restrictions on motor-assisted bikes, so feel free to bring yours along.": "Ceadaítear, tá fáilte iomlán roimh r-rothair ar na trí bhealach ar fad — an 60km, an 90km agus an 125km. Níl aon srianta ar rothair mhótarchúnta, mar sin bíodh do cheann féin agat.",
    "Is a helmet mandatory?": "An bhfuil clogad éigeantach?",
    "Yes, absolutely. A properly fitted, CE-certified cycling helmet is mandatory for all participants on all routes. You will not be permitted to start without one — no exceptions.": "Tá, cinnte. Tá clogad rothaíochta deimhnithe CE atá feistithe i gceart éigeantach do gach rannpháirtí ar gach bealach. Ní cheadófar duit tosú gan ceann — gan eisceacht ar bith.",
    "What should I bring on the day?": "Cad ba cheart dom a thabhairt liom ar an lá?",
    "We recommend: your bike (in good working order), helmet, spare inner tubes, tyre levers, a pump or CO2 inflator, a rain jacket, filled water bottles, and your phone with an emergency contact saved. Your event number must be visible on your bike at all times.": "Molaimid: do rothar (in ord maith oibre), clogad, feadáin istigh bhreise, luamháin bonn, caidéal nó insileadóir CO2, seaicéad báistí, buidéil uisce lán, agus d'fhón le teagmhálaí éigeandála sábháilte air. Caithfidh d'uimhir imeachta a bheith le feiceáil ar do rothar i gcónaí.",
    "3 questions": "3 cheist",
    "Is there a minimum fundraising target?": "An bhfuil sprioc íosta tiomsaithe airgid ann?",
    "There is no mandatory fundraising minimum — your entry fee alone makes a meaningful contribution to Irish Guide Dogs. However, if you'd like to raise additional funds, we provide every participant with a personal fundraising page and tips to help you reach your goal.": "Níl aon íosmhéid éigeantach tiomsaithe airgid ann — cuireann do tháille iontrála féin go mór le Irish Guide Dogs. Mar sin féin, más mian leat airgead breise a bhailiú, tugaimid leathanach pearsanta tiomsaithe airgid agus leideanna do gach rannpháirtí chun cabhrú leat do sprioc a bhaint amach.",
    "Where does the money go?": "Cá dtéann an t-airgead?",
    "All proceeds go directly to Irish Guide Dogs. This funds the training and placement of guide dogs for people with vision impairment, and assistance dogs for families of children with autism. It costs approximately €50,000 to train and place a single guide dog.": "Téann an t-airgead ar fad go díreach chuig Irish Guide Dogs. Maoiníonn sé seo traenáil agus socrúchán madraí treorach do dhaoine faoi lagú radhairc, agus madraí cúnaimh do theaghlaigh leanaí a bhfuil uathachas orthu. Cosnaíonn sé thart ar €50,000 madra treorach amháin a thraenáil agus a shocrú.",
    "Can I set up a team fundraising page?": "An féidir liom leathanach tiomsaithe airgid foirne a bhunú?",
    "Yes! When you register, you can create or join a team. For shared team fundraising, head to our": "Is féidir! Nuair a chláraíonn tú, is féidir leat foireann a chruthú nó dul isteach i bhfoireann. Le haghaidh tiomsú airgid foirne, téigh chuig ár",
    "GoFundMe page": "leathanach GoFundMe",
    ", where your team can pool donations and track your collective impact together.": ", áit ar féidir le d'fhoireann síntiúis a chomhthiomsú agus bhur dtionchar comhchoiteann a rianú le chéile.",
    "FAQ – Bark & Ride 2026": "CCanna – Bark & Ride 2026",
    "Relive the energy, scenery and spirit of past rides. Click any photo to view fullscreen.": "Athbheoigh fuinneamh, radharcra agus spiorad na dturas a chuaigh romhainn. Cliceáil ar aon ghrianghraf chun é a fheiceáil ar an scáileán iomlán.",
    "All Photos": "Gach Grianghraf",
    "Photos coming soon!": "Grianghraif ag teacht go luath!",
    "To see full gallery, visit our": "Chun an gailearaí iomlán a fheiceáil, tabhair cuairt ar ár",
    "Flickr page": "leathanach Flickr",
    "Close": "Dún",
    "Previous": "Roimhe seo",
    "Next": "Ar aghaidh",
    "Gallery – Bark & Ride 2026": "Gailearaí – Bark & Ride 2026",
    "Irish Guide Dogs Charity Cycle": "Turas Rothaíochta Carthanais Irish Guide Dogs",
    "Pedal for": "Rothaigh ar son",
    "a Brighter World": "Domhan Níos Gile",
    "Starting from": "Ag tosú ó",
    "The Connacht Hotel, Galway": "The Connacht Hotel, Gaillimh",
    "View Routes": "Féach ar na Bealaí",
    "Not Cycling?": "Nach bhfuil tú ag Rothaíocht?",
    "Donate": "Tabhair Síntiús",
    "Connacht Hotel, Galway": "Connacht Hotel, Gaillimh",
    "Thank You": "Go Raibh Maith Agaibh",
    "A Huge Thank You to Our Sponsors": "Míle Buíochas lenár nUrraitheoirí",
    "Bark & Ride simply couldn’t roll without the generous businesses who backed us. Your support keeps guide dogs in training and clients on the move.": "Ní fhéadfadh Bark & Ride casadh gan na gnólachtaí flaithiúla a sheas linn. Coinníonn bhur dtacaíocht madraí treorach faoi thraenáil agus cliaint ar an mbóthar.",
    "Meet Our Sponsors": "Buail lenár nUrraitheoirí",
    "About the Ride": "Faoin Turas",
    "Cycle for a Cause That Changes Lives": "Rothaigh ar son Cúise a Athraíonn Saolta",
    "Bark & Ride is an annual charity cycling event in aid of": "Is imeacht rothaíochta carthanais bliantúil é Bark & Ride ar son",
    ", taking cyclists across County Galway and through the stunning landscapes of the Burren in County Clare.": ", a thugann rothaithe ar fud Chontae na Gaillimhe agus trí thírdhreacha iontacha na Boirne i gContae an Chláir.",
    "Whether you're a seasoned cyclist or a first-timer, our three route options offer a challenge for every level. Every kilometre you ride raises vital funds for guide dog training, autism assistance dogs, and family support services.": "Cibé acu an rothaí cruthaithe nó núíosach thú, tugann ár dtrí rogha bealaigh dúshlán do gach leibhéal. Bailíonn gach ciliméadar a rothaíonn tú airgead ríthábhachtach do thraenáil madraí treorach, do mhadraí cúnaimh uathachais, agus do sheirbhísí tacaíochta teaghlaigh.",
    "Starting and finishing at": "Ag tosú agus ag críochnú ag",
    "Learn More": "Tuilleadh Eolais",
    "Choose Your Challenge": "Roghnaigh do Dhúshlán",
    "Dunguaire Castle": "Caisleán Dhún Guaire",
    "Beginner": "Tosaitheoir",
    "Kilmacduagh Round Tower": "Cloigtheach Chill Mhic Duach",
    "Intermediate": "Meánleibhéal",
    "Poulnabrone Dolmen": "Tuama Pholl na Brón",
    "Challenge": "Dúshlán",
    "Route Options": "Roghanna Bealaigh",
    "Longest Route": "An Bealach is Faide",
    "For Charity": "Ar son Carthanais",
    "See It In Action": "Féach air ar Siúl",
    "Your browser does not support the video tag.": "Ní thacaíonn do bhrabhsálaí leis an gclib físe.",
    "Highlights from Bark & Ride — 125km of stunning Galway & Burren scenery": "Buaicphointí ó Bark & Ride — 125km de radharcra iontach na Gaillimhe & na Boirne",
    "From the Road": "Ón mBóthar",
    "View All Photos": "Féach ar Gach Grianghraf",
    "Our Partners": "Ár gComhpháirtithe",
    "A heartfelt thank you to every one of our sponsors — Bark & Ride wouldn't be possible without your generous support.": "Míle buíochas ó chroí le gach duine dár n-urraitheoirí — ní bheadh Bark & Ride indéanta gan bhur dtacaíocht fhlaithiúil.",
    "Gold Sponsors": "Urraitheoirí Óir",
    "Silver Sponsors": "Urraitheoirí Airgid",
    "Bronze Sponsors": "Urraitheoirí Cré-umha",
    "Venue Partner": "Comhpháirtí Ionaid",
    "Want to sponsor Bark & Ride 2026?": "Ar mhaith leat urraíocht a dhéanamh ar Bark & Ride 2026?",
    "Contact us": "Déan teagmháil linn",
    "— we’d be barking mad to say no.": "— bheimis as ár meabhair (nó as ár madra!) diúltú.",
    "Get In Touch": "Déan Teagmháil",
    "Contact Us": "Déan Teagmháil Linn",
    "Click to copy": "Cliceáil chun cóipeáil",
    "Cyclists on the Burren": "Rothaithe ar an mBoirinn",
    "Bark and Ride gallery": "Gailearaí Bark and Ride",
    "Bark & Ride 2026 – Irish Guide Dogs Charity Cycle": "Bark & Ride 2026 – Turas Rothaíochta Carthanais Irish Guide Dogs",
    "Everything you need to know before you clip in and roll out on Bark & Ride 2026.": "Gach rud nach mór duit a bheith ar eolas agat sula gclipeálann tú isteach agus sula n-imíonn tú ar Bark & Ride 2026.",
    "Essential Information for Every Rider": "Eolas Riachtanach do Gach Rothaí",
    "Welcome to the Rider Zone. Whether you're a seasoned sportive veteran or taking your first leap into organised cycling, you'll find all the need-to-know information here. From starting times to route rules, safety standards to training tips — we've got you covered.": "Fáilte go Crios na Rothaithe. Cibé acu an seanláimh ar thurais spóirtiúla thú nó an bhfuil tú ag tabhairt faoi rothaíocht eagraithe den chéad uair, gheobhaidh tú an t-eolas riachtanach ar fad anseo. Ó amanna tosaithe go rialacha bealaigh, caighdeáin sábháilteachta go leideanna traenála — tá gach rud clúdaithe againn.",
    "Be sure to familiarise yourself with these details before the event.": "Déan cinnte go bhfuil tú eolach ar na sonraí seo roimh an imeacht.",
    "Where to Stay": "Cá bhFanfaidh Tú",
    "If you're travelling from outside the region, we recommend planning your accommodation early. Here are your options:": "Má tá tú ag taisteal ó lasmuigh den réigiún, molaimid do lóistín a phleanáil go luath. Seo do roghanna:",
    "Accommodation in Galway": "Lóistín i nGaillimh",
    "Galway city is just minutes from": "Níl cathair na Gaillimhe ach cúpla nóiméad ó",
    "(our start/finish point) and offers everything from budget hostels to luxury hotels. With a vibrant dining and entertainment scene, it's the perfect base for your Bark & Ride weekend. Visit": "(ár bpointe tosaigh/deiridh) agus tá gach rud ann ó bhrúnna saora go hóstáin só. Le saol bríomhar bia agus siamsaíochta, is bonn foirfe é do do dheireadh seachtaine Bark & Ride. Tabhair cuairt ar",
    "for a full list of accommodation options.": "chun liosta iomlán roghanna lóistín a fháil.",
    "Early Bird Deal:": "Tairiscint Luath:",
    "is offering an exclusive discounted room rate for Bark & Ride participants. Availability is limited — book early to secure your spot at the start line": "ag tairiscint ráta seomra lascainithe eisiach do rannpháirtithe Bark & Ride. Tá infhaighteacht teoranta — cuir d'áirithint isteach go luath chun d'áit a fháil ag an líne tosaigh",
    "and": "agus",
    "in the hotel.": "san óstán.",
    "Nearby Towns": "Bailte in Aice Láimhe",
    "Ballinasloe, Tuam, and other towns in the region also offer accommodation. These quieter options are great if you want a more relaxed pre-event atmosphere whilst still being close enough to the start point.": "Tá lóistín ar fáil freisin i mBéal Átha na Sluaighe, i dTuaim agus i mbailte eile sa réigiún. Is roghanna iontacha iad na háiteanna níos ciúine seo más mian leat atmaisféar níos suaimhní roimh an imeacht agus tú fós gar go leor don phointe tosaigh.",
    "Event Registration": "Clárú don Imeacht",
    "Pre-event registration is mandatory.": "Tá clárú roimh an imeacht éigeantach.",
    "All riders must sign in before they can participate in Bark & Ride 2026.": "Caithfidh gach rothaí síniú isteach sular féidir leo páirt a ghlacadh in Bark & Ride 2026.",
    "Registration Details": "Sonraí Clárúcháin",
    "Detail": "Sonra",
    "Information": "Eolas",
    "When": "Cathain",
    "Event morning — 8:00am to 9:00am": "Maidin an imeachta — 8:00rn go 9:00rn",
    "Where": "Cá háit",
    ", Dublin Road, Galway": ", Bóthar Bhaile Átha Cliath, Gaillimh",
    "What to Bring": "Cad le Tabhairt Leat",
    "Your photo ID and your bike (obviously!)": "Do chárta aitheantais le grianghraf agus do rothar (ar ndóigh!)",
    "The Wristband System": "An Córas Riostbhanna",
    "Upon registration, you'll receive an": "Nuair a chláraíonn tú, gheobhaidh tú",
    "event wristband.": "riostbhanna imeachta.",
    "This wristband is essential and must be worn throughout the day. Here's why:": "Tá an riostbhanna seo riachtanach agus caithfear é a chaitheamh i rith an lae. Seo an fáth:",
    "Access Points:": "Pointí Rochtana:",
    "Your wristband grants you entry to all food and refreshment stops along the route.": "Tugann do riostbhanna cead isteach duit chuig gach stad bia agus sólaistí ar an mbealach.",
    "Post-Ride Celebration:": "Ceiliúradh Iar-Thurais:",
    "Access to the finish-line festivities, ice cream, and BBQ deals.": "Rochtain ar cheiliúradh na líne críochnaithe, uachtar reoite agus tairiscintí BBQ.",
    "Safety ID:": "Aitheantas Sábháilteachta:",
    "Your wristband has a unique number and SOS contact — if you need help, this makes identification quick and easy.": "Tá uimhir uathúil agus teagmháil SOS ar do riostbhanna — má bhíonn cabhair uait, déanann sé seo aitheantas tapa agus éasca.",
    "Souvenir:": "Cuimhneachán:",
    "Your Bark & Ride 2026 commemorative medal — a reminder of your incredible day.": "Do bhonn cuimhneacháin Bark & Ride 2026 — meabhrúchán ar do lá iontach.",
    "Important:": "Tábhachtach:",
    "Keep your wristband visible and secure throughout the event. If you need assistance during the ride, the identification number on your wristband enables our team to provide rapid support.": "Coinnigh do riostbhanna le feiceáil agus slán i rith an imeachta. Má bhíonn cúnamh uait le linn an turais, cuireann an uimhir aitheantais ar do riostbhanna ar chumas ár bhfoirne tacaíocht thapa a thabhairt.",
    "When the Event Starts": "Nuair a Thosaíonn an tImeacht",
    "All riders should assemble at the start line by the times below. We recommend arriving at least 15 minutes early to find your start group.": "Ba cheart do gach rothaí bailiú ag an líne tosaigh faoi na hamanna thíos. Molaimid teacht 15 nóiméad go luath ar a laghad chun do ghrúpa tosaigh a aimsiú.",
    "Route": "Bealach",
    "Level": "Leibhéal",
    "9:20 AM": "9:20 RN",
    "9:25 AM": "9:25 RN",
    "Marshals will be supporting riders until 5:00pm. If you choose to depart early or continue riding after official support ends, you do so at your own risk.": "Beidh maoir ag tacú le rothaithe go dtí 5:00in. Má roghnaíonn tú imeacht go luath nó leanúint ar aghaidh ag rothaíocht tar éis don tacaíocht oifigiúil críochnú, déanann tú amhlaidh ar do phriacal féin.",
    "Useful Information": "Eolas Úsáideach",
    "Here's what you need to know to make the most of your Bark & Ride experience:": "Seo an méid atá le fios agat chun an leas is fearr a bhaint as d'eispéireas Bark & Ride:",
    "Topic": "Ábhar",
    "What You Need to Know": "Cad atá le Fios Agat",
    "Weather Conditions": "Dálaí Aimsire",
    "Irish weather has a mind of its own. Come prepared for showers — rain gear and extra layers are your friends. Check the forecast the week before and plan accordingly.": "Bíonn a haigne féin ag aimsir na hÉireann. Bí réidh do chithfholcadáin — is iad trealamh báistí agus sraitheanna breise do chairde. Seiceáil réamhaisnéis na haimsire an tseachtain roimh ré agus pleanáil dá réir.",
    "Route Markers": "Marcóirí Bealaigh",
    "All routes are clearly marked with yellow & black directional signage. Stay alert and follow the signs — they're your guide! Don't rely solely on GPS.": "Tá gach bealach marcáilte go soiléir le comharthaí treo buí & dubh. Fan airdeallach agus lean na comharthaí — is iad do threoir iad! Ná bí ag brath ar GPS amháin.",
    "Refreshment Stops": "Stadanna Sólaistí",
    "Well-stocked stops are positioned along each route with water, energy foods, and friendly faces.": "Tá stadanna lán-stocáilte suite ar gach bealach le huisce, bianna fuinnimh agus aghaidheanna cairdiúla.",
    "Mechanical Support": "Tacaíocht Mheicniúil",
    "We have roaming mechanical support vehicles available on the route. However, it is your responsibility to ensure your bike is in good working condition. Check your bike before the event and carry spare tubes, a pump, and a multi-tool.": "Tá feithiclí tacaíochta meicniúla ag gluaiseacht ar an mbealach. Mar sin féin, is ortsa atá an fhreagracht a chinntiú go bhfuil do rothar in ord maith oibre. Seiceáil do rothar roimh an imeacht agus bíodh feadáin bhreise, caidéal agus il-uirlis agat.",
    "Road Closures": "Dúnadh Bóithre",
    "There are no full road closures, but expect congestion on approach roads to Galway. Leave extra time for travel and stay patient.": "Níl aon bhóithre dúnta go hiomlán, ach bí ag súil le plódú ar na bóithre isteach go Gaillimh. Fág am breise don taisteal agus bí foighneach.",
    "Traffic Awareness": "Feasacht Tráchta",
    "Irish roads can be busy with visitors. Stay alert for unfamiliar drivers, tour buses, and holiday traffic — especially on the Burren roads.": "Is féidir le bóithre na hÉireann a bheith gnóthach le cuairteoirí. Fan airdeallach ar thiománaithe nach bhfuil taithí acu ar na bóithre, busanna turais agus trácht saoire — go háirithe ar bhóithre na Boirne.",
    "Challenging Sections": "Codanna Dúshlánacha",
    "Be aware of narrow country roads, particularly in the first 40km, sections with grass-centered roadways, and steep descents in the Burren. Maintain single-file formation in narrow sections and exercise extra caution on all descents.": "Bí ar an eolas faoi bhóithre cúnga tuaithe, go háirithe sa chéad 40km, codanna le féar i lár an bhóthair, agus fánaí géara sa Bhoirinn. Coinnigh líne aonair i gcodanna cúnga agus bí an-chúramach ar gach fána.",
    "Emergency Support": "Tacaíocht Éigeandála",
    "The SOS number is printed on your wristband. If you feel unwell or need assistance, stop immediately and call. Never continue if you're struggling — your safety is paramount.": "Tá an uimhir SOS priontáilte ar do riostbhanna. Má bhraitheann tú tinn nó má bhíonn cúnamh uait, stop láithreach agus glaoigh. Ná lean ar aghaidh riamh má tá tú i dtrioblóid — is í do shábháilteacht an rud is tábhachtaí.",
    "Environmental Respect": "Meas ar an gComhshaol",
    "Please take all litter with you. We're proud of County Galway and the Burren — let's keep them beautiful for everyone. Follow LEAVE NO TRACE principles.": "Tabhair gach bruscar leat, le do thoil. Táimid bródúil as Contae na Gaillimhe agus as an mBoirinn — coinnímis álainn iad do chách. Lean prionsabail LEAVE NO TRACE.",
    "Rules and Guidelines": "Rialacha agus Treoirlínte",
    "Bark & Ride is committed to ensuring the event runs smoothly and safely. All participants are expected to adhere to the following principles:": "Tá Bark & Ride tiomanta do chinntiú go ritheann an t-imeacht go réidh agus go sábháilte. Táthar ag súil go gcloífidh gach rannpháirtí leis na prionsabail seo a leanas:",
    "Prepare Your Bike:": "Ullmhaigh do Rothar:",
    "Ensure your bike is in good working condition before the event. Carry spare tubes and essential tools.": "Déan cinnte go bhfuil do rothar in ord maith oibre roimh an imeacht. Bíodh feadáin bhreise agus uirlisí riachtanacha agat.",
    "Helmets Mandatory:": "Clogaid Éigeantach:",
    "All participants must wear a helmet at all times. No exceptions.": "Caithfidh gach rannpháirtí clogad a chaitheamh i gcónaí. Gan eisceacht.",
    "Arrive Early:": "Tar go Luath:",
    "Allow sufficient time to register, prepare, and join your designated start group.": "Tabhair go leor ama duit féin chun clárú, ullmhú, agus dul isteach i do ghrúpa tosaigh ainmnithe.",
    "Respect the Road Rules:": "Tabhair Aird ar Rialacha an Bhóthair:",
    "Follow all traffic laws, stay on designated routes, and be aware of other road users at all times.": "Lean gach dlí tráchta, fan ar na bealaí ainmnithe, agus bí airdeallach ar úsáideoirí eile an bhóthair i gcónaí.",
    "Respect Others:": "Bíodh Meas agat ar Dhaoine Eile:",
    "Treat fellow cyclists, marshals, and volunteers with courtesy and respect. We are all here for a shared purpose.": "Caith go cúirtéiseach agus go measúil le comhrothaithe, maoir agus oibrithe deonacha. Táimid go léir anseo ar son cuspóir comhroinnte.",
    "This is a Leisure Event:": "Imeacht Fóillíochta atá ann:",
    "Bark & Ride is a recreational sportive, not a race. The focus is on enjoying the ride and supporting Irish Guide Dogs.": "Turas spóirtiúil caitheamh aimsire é Bark & Ride, ní rás. Is é an fócas ná taitneamh a bhaint as an turas agus tacú le Irish Guide Dogs.",
    "Follow Marshal Instructions:": "Lean Treoracha na Maor:",
    "Our volunteers are present to ensure your safety. Please adhere to their guidance at all times.": "Tá ár n-oibrithe deonacha i láthair chun do shábháilteacht a chinntiú. Cloígh lena dtreoir i gcónaí, le do thoil.",
    "Accept Responsibility:": "Glac Freagracht:",
    "We do not provide breakdown cover. If your bike experiences mechanical failure, you are responsible for resolving the issue or requesting support.": "Ní chuirimid clúdach cliseadh ar fáil. Má theipeann go meicniúil ar do rothar, is ortsa atá an fhreagracht an fhadhb a réiteach nó tacaíocht a iarraidh.",
    "Event Support Hours:": "Uaireanta Tacaíochta an Imeachta:",
    "Official event support concludes at 5:00pm. Any cycling after this time is undertaken at your own risk.": "Críochnaíonn tacaíocht oifigiúil an imeachta ag 5:00in. Is ar do phriacal féin aon rothaíocht tar éis an ama seo.",
    "Environmental Responsibility:": "Freagracht Chomhshaoil:",
    "Please remove all litter. We are committed to preserving the natural beauty of Galway and the Burren.": "Bain gach bruscar leat, le do thoil. Táimid tiomanta d'áilleacht nádúrtha na Gaillimhe agus na Boirne a chaomhnú.",
    "Purpose and Commitment:": "Cuspóir agus Tiomantas:",
    "Remember that every kilometre you cycle directly supports Irish Guide Dogs in their vital mission to provide independence and confidence to people with vision impairment and families of children with autism.": "Cuimhnigh go dtacaíonn gach ciliméadar a rothaíonn tú go díreach le Irish Guide Dogs ina misean ríthábhachtach neamhspleáchas agus muinín a thabhairt do dhaoine faoi lagú radhairc agus do theaghlaigh leanaí a bhfuil uathachas orthu.",
    "Standards & Safety": "Caighdeáin & Sábháilteacht",
    "Bark & Ride is committed to running a world-class event with the highest safety standards. Our team works extensively to:": "Tá Bark & Ride tiomanta d'imeacht den scoth a reáchtáil leis na caighdeáin sábháilteachta is airde. Oibríonn ár bhfoireann go dian chun:",
    "Deploy route marshals and roaming mechanical support teams": "Maoir bhealaigh agus foirne tacaíochta meicniúla gluaiste a chur i bhfeidhm",
    "Provide clear directional signage and multiple refreshment stops": "Comharthaí treo soiléire agus stadanna sólaistí iomadúla a chur ar fáil",
    "Coordinate with local authorities and emergency services": "Comhordú leis na húdaráis áitiúla agus leis na seirbhísí éigeandála",
    "Ensure all riders have access to help via the SOS wristband system": "A chinntiú go bhfuil cabhair ar fáil do gach rothaí trí chóras riostbhanna SOS",
    "Follow Cycling Ireland safety guidelines": "Treoirlínte sábháilteachta Cycling Ireland a leanúint",
    "Your Responsibilities:": "Do Fhreagrachtaí:",
    "Wear your helmet, follow the designated route, respect other road users, and contact marshals or use the SOS number if you require assistance. Your safety is our primary concern.": "Caith do chlogad, lean an bealach ainmnithe, bíodh meas agat ar úsáideoirí eile an bhóthair, agus déan teagmháil le maoir nó úsáid an uimhir SOS má bhíonn cúnamh uait. Is í do shábháilteacht ár bpríomhchúram.",
    "Training and Preparation": "Traenáil agus Ullmhúchán",
    "Whether you're new to sportive cycling or an experienced participant, proper preparation is essential. Here are key considerations:": "Cibé acu atá tú nua do rothaíocht spóirtiúil nó i do rannpháirtí a bhfuil taithí agat, tá ullmhúchán ceart riachtanach. Seo príomhrudaí le cur san áireamh:",
    "Position & Comfort": "Suíomh & Compord",
    "Establishing a comfortable and efficient riding position is important. Avoid positions that are too cramped or overly extended. A qualified bike fitter or experienced cyclist can assist you in achieving proper positioning. Comfort is essential during extended rides.": "Tá sé tábhachtach suíomh rothaíochta compordach éifeachtach a bhunú. Seachain suíomhanna atá róchúng nó róshínte. Is féidir le feisteoir rothar cáilithe nó rothaí a bhfuil taithí aige cabhrú leat an suíomh ceart a bhaint amach. Tá compord riachtanach ar thurais fhada.",
    "Gear & Gearing": "Trealamh & Giaranna",
    "Quality padded cycling shorts are a worthwhile investment that significantly enhances comfort. Use gearing strategically — avoid excessive resistance, particularly on climbs. Select gears that allow for a steady, sustained pedalling rhythm. Focus on maintaining a consistent cadence rather than high power output.": "Is fiú go mór infheistíocht a dhéanamh i mbrístí gearra rothaíochta ceansaithe ar ardchaighdeán a fheabhsaíonn compord go mór. Úsáid giaranna go straitéiseach — seachain an iomarca friotaíochta, go háirithe ar ardáin. Roghnaigh giaranna a ligeann rithim chasta sheasmhach duit. Dírigh ar ráta casta comhsheasmhach seachas ar ardchumhacht.",
    "Tyre Pressure & Bike Maintenance": "Brú Bonn & Cothabháil Rothair",
    "Proper tyre pressure is essential for performance and safety. Under-inflated tyres reduce efficiency and increase puncture risk. Inflate to the pressure specified on your tyre sidewall. In wet conditions, you may consider slightly reduced pressure for improved grip, but never compromise on safety by running excessively soft tyres.": "Tá brú ceart bonn riachtanach d'fheidhmíocht agus do shábháilteacht. Laghdaíonn boinn nach bhfuil dóthain aeir iontu éifeachtúlacht agus méadaíonn siad an baol pollta. Séid iad go dtí an brú atá sonraithe ar thaobh an bhoinn. I ndálaí fliucha, d'fhéadfá brú beagán níos ísle a úsáid le haghaidh greim níos fearr, ach ná cuir an tsábháilteacht i mbaol le boinn atá ró-bhog.",
    "Nutrition & Hydration": "Cothú & Hiodráitiú",
    "Consume a light meal 1-2 hours before the event begins. During the ride, follow a consistent nutrition strategy with small amounts taken regularly — do not wait until fatigue sets in. Maintain regular hydration throughout the day with plain water, sports drinks, or electrolyte solutions. Avoid carbonated beverages, which provide minimal nutritional benefit.": "Ith béile éadrom 1-2 uair an chloig roimh thús an imeachta. Le linn an turais, lean straitéis chothaithe chomhsheasmhach le méideanna beaga go rialta — ná fan go mbraitheann tú tuirseach. Coinnigh ag ól go rialta i rith an lae le huisce, deochanna spóirt nó tuaslagáin leictrilíte. Seachain deochanna súilíneacha, nach dtugann mórán cothaithe.",
    "Braking & Cornering": "Coscánú & Coirnéil",
    "Apply both brakes evenly and smoothly when approaching turns. Avoid the common error of braking during a turn, which compromises stability. Always complete braking before entering the turn. Maintain smooth lines through corners to ensure stability and control.": "Cuir an dá choscán i bhfeidhm go cothrom agus go réidh agus tú ag druidim le casadh. Seachain an botún coitianta coscánú i lár casaidh, rud a bhaineann ón gcobhsaíocht. Críochnaigh an coscánú i gcónaí sula dtéann tú isteach sa chasadh. Coinnigh línte réidhe trí choirnéil chun cobhsaíocht agus smacht a chinntiú.",
    "Group Riding & Drafting": "Rothaíocht i nGrúpa & Scáthrothaíocht",
    "Cycling in a group is more efficient than riding alone, particularly against headwinds. Maintain close but safe spacing and take turns leading. Riding in another cyclist's slipstream significantly reduces aerodynamic resistance. Maintain situational awareness and communicate clearly with other riders about hazards and intentions.": "Tá rothaíocht i ngrúpa níos éifeachtaí ná rothaíocht leat féin, go háirithe in aghaidh na gaoithe. Coinnigh spás gar ach sábháilte agus glac seal ag an tosach. Laghdaíonn rothaíocht i sruth sleamhnáin rothaí eile an fhriotaíocht aerdinimiciúil go mór. Bí airdeallach ar do thimpeallacht agus labhair go soiléir le rothaithe eile faoi ghuaiseacha agus faoi do chuid pleananna.",
    "Helmet Safety & Awareness": "Sábháilteacht Clogaid & Feasacht",
    "Always wear a properly fitted helmet, without exception. Most cycling incidents result from rider-to-rider contact or environmental hazards. Maintain constant awareness of road conditions, including potholes and obstacles. Communicate hazards to other riders using clear signals and verbal warnings. Vigilance and awareness significantly reduce accident risk.": "Caith clogad atá feistithe i gceart i gcónaí, gan eisceacht. Tarlaíonn formhór na dtaismí rothaíochta de bharr teagmháil idir rothaithe nó guaiseacha timpeallachta. Bí airdeallach i gcónaí ar dhálaí an bhóthair, poill agus constaicí san áireamh. Cuir rothaithe eile ar an eolas faoi ghuaiseacha le comharthaí soiléire agus le rabhaidh ó bhéal. Laghdaíonn airdeall agus feasacht an baol timpiste go mór.",
    "The Finish Line Celebration": "Ceiliúradh na Líne Críochnaithe",
    "After completing your ride, we invite you to join us for a celebration of your achievement:": "Tar éis duit do thuras a chríochnú, tugaimid cuireadh duit bheith linn chun d'éacht a cheiliúradh:",
    "When:": "Cathain:",
    "12:00pm": "12:00in",
    "Where:": "Cá háit:",
    "Refreshments:": "Sólaistí:",
    "Food and beverages to replenish your energy following the event": "Bia agus deochanna chun do chuid fuinnimh a athlánú tar éis an imeachta",
    "Entertainment:": "Siamsaíocht:",
    "Live music and entertainment": "Ceol beo agus siamsaíocht",
    "Photo Opportunity:": "Deis Grianghraf:",
    "Professional photography service to commemorate your participation": "Seirbhís ghrianghrafadóireachta ghairmiúil chun do rannpháirtíocht a chomóradh",
    "Commemorative Medal:": "Bonn Cuimhneacháin:",
    "Receive your official Bark & Ride 2026 medal": "Faigh do bhonn oifigiúil Bark & Ride 2026",
    "Social Time:": "Am Sóisialta:",
    "An opportunity to connect with fellow riders and celebrate the shared mission of supporting Irish Guide Dogs": "Deis chun bualadh le comhrothaithe agus misean comhroinnte na tacaíochta do Irish Guide Dogs a cheiliúradh",
    "We encourage you to bring family members, friends, and supporters to share in the celebration and to learn more about Irish Guide Dogs and the important work they do in the community.": "Spreagaimid thú teaghlach, cairde agus lucht tacaíochta a thabhairt leat chun páirt a ghlacadh sa cheiliúradh agus chun tuilleadh a fhoghlaim faoi Irish Guide Dogs agus faoin obair thábhachtach a dhéanann siad sa phobal.",
    "Secure Your Place": "Áirithigh d'Áit",
    "You now have comprehensive information about the event, the routes, and best practices for preparation. Register today to confirm your participation in Bark & Ride 2026 and support Irish Guide Dogs.": "Tá eolas cuimsitheach agat anois faoin imeacht, faoi na bealaí, agus faoi na cleachtais is fearr le hullmhú. Cláraigh inniu chun do rannpháirtíocht in Bark & Ride 2026 a dhearbhú agus chun tacú le Irish Guide Dogs.",
    "Rider Zone – Bark & Ride 2026": "Crios na Rothaithe – Bark & Ride 2026",
    "The ultimate test. 125km covering the full breadth of the Burren, the Cliffs of Moher approach, and the Wild Atlantic Way.": "An triail deiridh. 125km a chlúdaíonn leithead iomlán na Boirne, an cur chuige go hAillte an Mhothair, agus Slí an Atlantaigh Fhiáin.",
    "Distance": "Fad",
    "Elevation Gain": "Ardú Airde",
    "4–6h": "4–6u",
    "Est. Duration": "Fad Measta",
    "Food Stops": "Stadanna Bia",
    "View Route on Strava": "Féach ar an mBealach ar Strava",
    "About This Route": "Faoin mBealach Seo",
    "The ultimate test. From the Connacht Hotel, the route extends south through Garryland Wood and then deep into the Burren limestone plateau — multiple categorised climbs, the ancient landscape around Carron, a coastal stretch near Fanore, and a few drags waiting on the return. This is a ride that will stay with you forever.": "An triail deiridh. Ón Connacht Hotel, síneann an bealach ó dheas trí Choill Ghairealáin agus ansin isteach go domhain in ardchlár aolchloiche na Boirne — roinnt ardán rangaithe, an tírdhreach ársa timpeall ar an gCarn, stráice cois cósta in aice le Fánóir, agus cúpla tarraingt ag fanacht ar an mbealach ar ais. Is turas é seo a fhanfaidh leat go deo.",
    "Route Highlights": "Buaicphointí an Bhealaigh",
    "Glann Corkscrew Climb": "Ardán Chorcscriú an Ghleanna",
    "The first real test of the day — 1.19km at 7.4%, winding up through the countryside south of Kinvara. Sets the tone for what's ahead.": "An chéad fhíorthriail den lá — 1.19km ag 7.4%, ag casadh suas tríd an tuath ó dheas de Chinn Mhara. Leagann sé síos an ton don méid atá romhat.",
    "Carron & the Burren Interior": "An Carn & Croílár na Boirne",
    "The route passes through Carron, deep in the heart of the Burren limestone plateau. The landscape here is unlike anywhere else in Ireland — raw, ancient, and extraordinary.": "Téann an bealach tríd an gCarn, i gcroílár ardchlár aolchloiche na Boirne. Níl an tírdhreach anseo cosúil le háit ar bith eile in Éirinn — amh, ársa agus neamhghnách.",
    "A 5,000-year-old portal tomb standing alone in the limestone karst — one of Ireland's most iconic prehistoric monuments, right on the route.": "Tuama pasáiste 5,000 bliain d'aois ina sheasamh leis féin sa charst aolchloiche — ceann de na séadchomharthaí réamhstairiúla is suntasaí in Éirinn, díreach ar an mbealach.",
    "Coastal Return via Fanore": "Filleadh Cois Cósta trí Fhánóir",
    "After the Burren climbs, the route drops down to the coast near Fanore for a well-earned breather before the final push back to Galway.": "Tar éis ardáin na Boirne, titeann an bealach síos chuig an gcósta in aice le Fánóir le haghaidh sosa tuillte roimh an iarracht dheiridh ar ais go Gaillimh.",
    "Elevation": "Airde",
    "The most demanding elevation profile of the three routes. Key climbs include the Glann Corkscrew (1.19km at 7.4%), an unnamed Burren road (1.46km at 7.4%), the Carron Drag (0.98km at 4.2%), and the Munnia Climb (1.25km at 3.4%) — plus a few drags on the return. Total elevation gain 171m.": "An phróifíl airde is dúshlánaí de na trí bhealach. I measc na bpríomhardán tá Corcscriú an Ghleanna (1.19km ag 7.4%), bóthar gan ainm sa Bhoirinn (1.46km ag 7.4%), Tarraingt an Chairn (0.98km ag 4.2%), agus Ardán Mhuine (1.25km ag 3.4%) — móide cúpla tarraingt ar an mbealach ar ais. Ardú airde iomlán 171m.",
    "Rider Tips": "Leideanna do Rothaithe",
    "Train specifically for this route. You need a solid base of 200+ weekly kilometres for at least 6 weeks beforehand.": "Traenáil go sonrach don bhealach seo. Tá bonn láidir de 200+ ciliméadar sa tseachtain ag teastáil uait ar feadh 6 seachtaine ar a laghad roimh ré.",
    "Nutrition is everything on a 125km ride. Eat early and often — by the time you feel hungry, you're already behind.": "Is é an cothú gach rud ar thuras 125km. Ith go luath agus go minic — faoin am a mbraitheann tú ocras, tá tú ar gcúl cheana féin.",
    "The Burren section is exposed and can be windy in any direction. Don't underestimate the cumulative fatigue of the rolling climbs.": "Tá cuid na Boirne nochtaithe agus is féidir léi a bheith gaofar ó aon treo. Ná déan beag is fiú de thuirse charnach na n-ardán rollach.",
    "Carry two bottles and refill at every food stop. The inland sections offer limited shelter and dehydration creeps up fast.": "Bíodh dhá bhuidéal agat agus athlíon iad ag gach stad bia. Is beag foscadh atá sna codanna intíre agus tagann díhiodráitiú aniar aduaidh ort go tapa.",
    "Start conservatively. The first 40km feel familiar — that's the trap. The route doesn't truly begin until you hit the Burren climbs.": "Tosaigh go stuama. Mothaíonn an chéad 40km eolach — sin an gaiste. Ní thosaíonn an bealach i ndáiríre go dtí go mbuaileann tú ardáin na Boirne.",
    "Register for This Route": "Cláraigh don Bhealach Seo",
    "↓ Download Training Guide": "↓ Íoslódáil an Treoir Traenála",
    "Interactive map — scroll to zoom · click to pan": "Léarscáil idirghníomhach — scrollaigh chun súmáil · cliceáil chun bogadh",
    "125km — Poulnabrone Dolmen — Bark & Ride 2026": "125km — Tuama Pholl na Brón — Bark & Ride 2026",
    "Taking in the iconic Dunguaire Castle and the scenic rolling terrain south of the Burren, this is the perfect introduction to Bark & Ride.": "Ag tabhairt cuairte ar Chaisleán Dhún Guaire agus ar an tír rollach álainn ó dheas den Bhoirinn, is é seo an réamhrá foirfe do Bark & Ride.",
    "2–3h": "2–3u",
    "The perfect introduction to Bark & Ride. From the Connacht Hotel, the route heads east through Ballybane and Merlin Park before sweeping south along the Galway Bay coast road to Oranmore and Clarinbridge. Scenic, sociable, and satisfying.": "An réamhrá foirfe do Bark & Ride. Ón Connacht Hotel, téann an bealach soir trí Bhaile Bán agus Páirc Mheirlinne sula scuabann sé ó dheas feadh bhóthar cósta Chuan na Gaillimhe go hÓrán Mór agus go Droichead an Chláirín. Álainn, sóisialta agus sásúil.",
    "Oranmore Coast Road": "Bóthar Cósta Órán Mór",
    "A scenic stretch along the Galway Bay shoreline — flat, fast, and a great early confidence boost.": "Stráice álainn feadh chladach Chuan na Gaillimhe — cothrom, tapa, agus borradh mór muiníne go luath.",
    "Kinvara & Dunguaire Castle": "Cinn Mhara & Caisleán Dhún Guaire",
    "The 16th-century tower house on the shores of Kinvara Bay is one of Ireland's most photographed castles — well worth a moment to look up.": "Tá an túrtheach ón 16ú haois ar bhruach Chuan Chinn Mhara ar cheann de na caisleáin is mó a ndéantar grianghraf díobh in Éirinn — is fiú go mór nóiméad a thógáil le breathnú suas.",
    "Clarinbridge Village": "Sráidbhaile Dhroichead an Chláirín",
    "A charming stop in one of Galway's most beloved villages, famous for its annual oyster festival.": "Stad deas i gceann de na sráidbhailte is ansa le muintir na Gaillimhe, cáiliúil as a fhéile oisrí bhliantúil.",
    "Mostly flat to gently rolling, but very manageable. Some drags towards the finish might catch you off guard, so save something for the last few climbs.": "Cothrom den chuid is mó go rollach go réidh, ach an-inláimhsithe. D'fhéadfadh roinnt tarraingtí i dtreo an deiridh tú a thógáil gan choinne, mar sin coinnigh rud éigin i dtaisce do na hardáin dheireanacha.",
    "Great for first-time sportive riders — pace is relaxed and support is excellent.": "Iontach do rothaithe spóirtiúla den chéad uair — tá an luas socair agus an tacaíocht ar fheabhas.",
    "Start hydrated. Clare's exposed roads can be deceptively windy.": "Tosaigh hiodráitithe. Is féidir le bóithre nochtaithe an Chláir a bheith níos gaofaire ná mar a shílfeá.",
    "Pack a light rain jacket — weather changes quickly in the Burren.": "Pacáil seaicéad báistí éadrom — athraíonn an aimsir go tapa sa Bhoirinn.",
    "Don't race — soak in the scenery and the atmosphere.": "Ná bí ag rásaíocht — bain sult as an radharcra agus as an atmaisféar.",
    "60km — Dunguaire Castle — Bark & Ride 2026": "60km — Caisleán Dhún Guaire — Bark & Ride 2026",
    "Taking in the iconic Kilmacduagh Round Tower and the dramatic karst landscape that defines the Burren, this 90km route is the heart of Bark & Ride.": "Ag tabhairt cuairte ar Chloigtheach Chill Mhic Duach agus ar an tírdhreach carstach drámatúil a shainíonn an Bhoireann, is é an bealach 90km seo croí Bark & Ride.",
    "3–4.5h": "3–4.5u",
    "The heart of Bark & Ride. Building on the 60km, the route extends south through the ancient Garryland Wood and into the Gort lowlands, passing within sight of the iconic Kilmacduagh Round Tower before looping back north. A proper step up with proper rewards.": "Croí Bark & Ride. Ag tógáil ar an 60km, síneann an bealach ó dheas trí Choill ársa Ghairealáin agus isteach in ísealchríocha an Ghoirt, ag dul thar Chloigtheach iomráiteach Chill Mhic Duach sula lúbann sé ar ais ó thuaidh. Céim cheart suas le luach saothair ceart.",
    "A fast, scenic stretch along Galway Bay — a great early warm-up with the bay on one side.": "Stráice tapa álainn feadh Chuan na Gaillimhe — téamh iontach go luath leis an gcuan ar thaobh amháin.",
    "King of Garryland": "Rí Ghairealáin",
    "6km through Garryland Wood — one of Ireland's last ancient oak woodlands. Fast, atmospheric roads with Coole Park and W.B. Yeats country just next door.": "6km trí Choill Ghairealáin — ceann de na coillte darach ársa deireanacha in Éirinn. Bóithre tapa atmaisféaracha le Páirc na Cúile agus tír W.B. Yeats díreach béal dorais.",
    "One of Ireland's finest round towers, leaning slightly and standing over 30 metres tall — a striking landmark as you pass through the quiet countryside south of Gort.": "Ceann de na cloigthithe is fearr in Éirinn, ag claonadh beagán agus os cionn 30 méadar ar airde — sainchomhartha suntasach agus tú ag dul tríd an tuath chiúin ó dheas den Ghort.",
    "Mostly rolling with a few short rises. The King of Garryland section is flat but fast. Some drags towards the finish might catch you off guard, so save something for the last few climbs. Total elevation gain 36m.": "Rollach den chuid is mó le cúpla ardú gearr. Tá cuid Rí Ghairealáin cothrom ach tapa. D'fhéadfadh roinnt tarraingtí i dtreo an deiridh tú a thógáil gan choinne, mar sin coinnigh rud éigin i dtaisce do na hardáin dheireanacha. Ardú airde iomlán 36m.",
    "The drags towards the finish come late in the ride — don't burn all your matches early on the Garryland section just because it feels fast.": "Tagann na tarraingtí i dtreo an deiridh déanach sa turas — ná dóigh do chuid lasán go léir go luath ar chuid Ghairealáin díreach toisc go mothaíonn sé tapa.",
    "The Garryland Wood stretch can be sheltered but roads are narrow — stay alert for other riders and traffic.": "Is féidir le stráice Choill Ghairealáin a bheith foscúil ach tá na bóithre cúng — fan airdeallach ar rothaithe eile agus ar thrácht.",
    "Make full use of the three food stops — proper fuelling is the difference between enjoying the last 20km and surviving it.": "Bain úsáid iomlán as na trí stad bia — is é cothú ceart an difríocht idir taitneamh a bhaint as an 20km deireanach agus teacht slán as.",
    "Carry a spare tube and know how to change it. Rural roads can be rough on tyres.": "Bíodh feadán breise agat agus bíodh a fhios agat conas é a athrú. Is féidir le bóithre tuaithe a bheith garbh ar bhoinn.",
    "90km — Kilmacduagh Round Tower — Bark & Ride 2026": "90km — Cloigtheach Chill Mhic Duach — Bark & Ride 2026",
    "Copied!": "Cóipeáilte!"
  };

  var HTML = {
    "faq-h1": "Ceisteanna<br><span>Coitianta</span>",
    "index-routes-h2": "Na <span>Bealaí</span>",
    "index-motion-h2": "An <span>Turas</span> ar Siúl"
  };

  function getLang() {
    try { return localStorage.getItem(STORAGE_KEY) === 'ga' ? 'ga' : 'en'; } catch (e) { return 'en'; }
  }
  function saveLang(l) {
    try { localStorage.setItem(STORAGE_KEY, l); } catch (e) {}
  }

  var lang = getLang();
  var root = document.documentElement;

  // Styles for the switch, plus hiding the page briefly while Irish is applied
  var style = document.createElement('style');
  style.textContent =
    'html.i18n-pending body{visibility:hidden}' +
    '.lang-switch{display:flex;align-items:center;gap:6px}' +
    '.lang-switch button{background:none;border:none;padding:4px 2px;cursor:pointer;font:inherit;color:inherit;letter-spacing:.5px;transition:color .2s}' +
    '.lang-switch button:hover{color:#fff}' +
    '.lang-switch button[aria-pressed="true"]{color:#78BE20;font-weight:600}' +
    '.lang-switch .lang-sep{opacity:.6}' +
    // Irish nav labels are longer: keep them on one line and tighten spacing a little
    'html[lang="ga"] .nav-links a{white-space:nowrap}' +
    '@media (min-width:769px) and (max-width:1100px){html[lang="ga"] .nav-links a{letter-spacing:1px;padding-left:6px;padding-right:6px}}';
  document.head.appendChild(style);
  if (lang === 'ga') root.classList.add('i18n-pending');

  var origText = new WeakMap();
  var origAttr = new WeakMap();
  var origHTML = new WeakMap();
  var origTitle = null;
  var ATTRS = ['alt', 'aria-label', 'title', 'placeholder'];

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }
  function swap(original, l) {
    if (l !== 'ga') return original;
    var t = GA[norm(original)];
    if (!t) return original;
    var lead = original.match(/^\s*/)[0], trail = original.match(/\s*$/)[0];
    return lead + t + trail;
  }

  function apply(l) {
    // Whole-element overrides first
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (!origHTML.has(el)) origHTML.set(el, el.innerHTML);
      var ga = HTML[el.getAttribute('data-i18n')];
      el.innerHTML = (l === 'ga' && ga) ? ga : origHTML.get(el);
    });

    // Text nodes
    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        var p = n.parentNode;
        if (!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.nodeName)) return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('[data-i18n],.lang-switch')) return NodeFilter.FILTER_REJECT;
        return /[A-Za-z]/.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    var n;
    while ((n = walker.nextNode())) {
      if (!origText.has(n)) origText.set(n, n.nodeValue);
      var v = swap(origText.get(n), l);
      if (n.nodeValue !== v) n.nodeValue = v;
    }

    // Attributes
    document.querySelectorAll('[alt],[aria-label],[title],[placeholder]').forEach(function (el) {
      if (el.closest('.lang-switch')) return;
      var saved = origAttr.get(el);
      if (!saved) {
        saved = {};
        ATTRS.forEach(function (a) { if (el.hasAttribute(a)) saved[a] = el.getAttribute(a); });
        origAttr.set(el, saved);
      }
      Object.keys(saved).forEach(function (a) { el.setAttribute(a, swap(saved[a], l)); });
    });

    // Page title and language attribute
    if (origTitle === null) origTitle = document.title;
    document.title = swap(origTitle, l);
    root.setAttribute('lang', l === 'ga' ? 'ga' : 'en');

    document.querySelectorAll('.lang-switch button').forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false');
    });
  }

  function buildSwitch() {
    var target = document.querySelector('.footer-bottom');
    if (!target || target.querySelector('.lang-switch')) return;
    var wrap = document.createElement('div');
    wrap.className = 'lang-switch';
    wrap.setAttribute('role', 'group');
    wrap.setAttribute('aria-label', 'Language / Teanga');
    wrap.innerHTML =
      '<button type="button" data-lang="en" lang="en">English</button>' +
      '<span class="lang-sep" aria-hidden="true">|</span>' +
      '<button type="button" data-lang="ga" lang="ga">Gaeilge</button>';
    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-lang]');
      if (!b || b.getAttribute('data-lang') === lang) return;
      lang = b.getAttribute('data-lang');
      saveLang(lang);
      apply(lang);
    });
    target.appendChild(wrap);
  }

  // Lets page scripts translate strings they set themselves
  window.barI18n = {
    t: function (s) { return lang === 'ga' && GA[s] ? GA[s] : s; },
    lang: function () { return lang; }
  };

  function init() {
    try {
      buildSwitch();
      apply(lang);
    } finally {
      root.classList.remove('i18n-pending');
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  // Never leave the page hidden, whatever happens
  setTimeout(function () { root.classList.remove('i18n-pending'); }, 3000);
})();
