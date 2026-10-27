// Built-in dictionary. Words are written with nikkud; the plain spelling is
// derived automatically (toPlain) unless given after a "|".
//
// Nouns:      singular | gender (m, f, mf) | plural ("-" if none, "=" if the word is plural-only) | English
//             (a plain-spelling override can follow the singular after "~")
// Adjectives: masc. sg | fem. sg | masc. pl | fem. pl | English
// Verbs:      { r: root, b: binyan, g: English, ...engine flags } — see conjugate.js

const NOUNS_TSV = `
אִישׁ|m|אֲנָשִׁים|man
אִשָּׁה|f|נָשִׁים|woman
אָב|m|אָבוֹת|father
אֵם|f|אִמָּהוֹת|mother
אַבָּא|m|אַבָּאִים|dad
אִמָּא|f|אִמָּהוֹת|mom
אָח|m|אַחִים|brother
אָחוֹת|f|אֲחָיוֹת|sister
בֵּן|m|בָּנִים|son
בַּת|f|בָּנוֹת|daughter
יֶלֶד|m|יְלָדִים|boy, child
יַלְדָּה|f|יְלָדוֹת|girl
תִּינוֹק|m|תִּינוֹקוֹת|baby
סַבָּא|m|סַבָּאִים|grandfather
סָבְתָא|f|סָבְתוֹת|grandmother
דּוֹד|m|דּוֹדִים|uncle
דּוֹדָה|f|דּוֹדוֹת|aunt
בַּעַל|m|בְּעָלִים|husband, owner
מִשְׁפָּחָה|f|מִשְׁפָּחוֹת|family
חָבֵר|m|חֲבֵרִים|friend (m)
חֲבֵרָה|f|חֲבֵרוֹת|friend (f)
מוֹרֶה|m|מוֹרִים|teacher (m)
מוֹרָה|f|מוֹרוֹת|teacher (f)
תַּלְמִיד|m|תַּלְמִידִים|pupil, student
רוֹפֵא|m|רוֹפְאִים|doctor
שׁוֹטֵר|m|שׁוֹטְרִים|police officer
חַיָּל|m|חַיָּלִים|soldier
מְהַנְדֵּס|m|מְהַנְדְּסִים|engineer
מֶלְצַר|m|מֶלְצָרִים|waiter
טַבָּח|m|טַבָּחִים|cook
מֶלֶךְ|m|מְלָכִים|king
מַלְכָּה|f|מְלָכוֹת|queen
סֵפֶר|m|סְפָרִים|book
בַּיִת|m|בָּתִּים|house, home
חֶדֶר|m|חֲדָרִים|room
דִּירָה|f|דִּירוֹת|apartment
קוֹמָה|f|קוֹמוֹת|floor, storey
מִטְבָּח|m|מִטְבָּחִים|kitchen
מִקְלַחַת|f|מִקְלָחוֹת|shower
שֻׁלְחָן|m|שֻׁלְחָנוֹת|table
כִּסֵּא|m|כִּסְאוֹת|כיסאות|chair
חַלּוֹן|m|חַלּוֹנוֹת|window
דֶּלֶת|f|דְּלָתוֹת|door
קִיר|m|קִירוֹת|wall
רִצְפָּה|f|רְצָפוֹת|floor
גַּג|m|גַּגּוֹת|roof
מִטָּה|f|מִטּוֹת|bed
אָרוֹן|m|אֲרוֹנוֹת|closet, cupboard
מְנוֹרָה|f|מְנוֹרוֹת|lamp
תְּמוּנָה|f|תְּמוּנוֹת|picture
שְׂמִיכָה|f|שְׂמִיכוֹת|blanket
כָּרִית|f|כָּרִיּוֹת|pillow
מַגֶּבֶת|f|מַגָּבוֹת|towel
סַבּוֹן|m|סַבּוֹנִים|soap
מַעֲלִית|f|מַעֲלִיּוֹת|elevator
מַדְרֵגָה|f|מַדְרֵגוֹת|stair, step
מַפְתֵּחַ|m|מַפְתְּחוֹת|key
שָׁעוֹן|m|שְׁעוֹנִים|clock, watch
תִּיק|m|תִּיקִים|bag
מַחְשֵׁב|m|מַחְשְׁבִים|computer
טֶלֶפוֹן|m|טֶלֶפוֹנִים|telephone
עִתּוֹן|m|עִתּוֹנִים|newspaper
מִכְתָּב|m|מִכְתָּבִים|letter (mail)
עֵט|m|עֵטִים|pen
עִפָּרוֹן|m|עֶפְרוֹנוֹת|pencil
מַחְבֶּרֶת|f|מַחְבָּרוֹת|notebook
דַּף|m|דַּפִּים|page, sheet
לוּחַ|m|לוּחוֹת|board
אוֹת|f|אוֹתִיּוֹת|letter (of the alphabet)
מִלָּה|f|מִלִּים|word
שָׂפָה|f|שָׂפוֹת|language
שְׁאֵלָה|f|שְׁאֵלוֹת|question
תְּשׁוּבָה|f|תְּשׁוּבוֹת|answer
סִפּוּר|m|סִפּוּרִים|story
שִׁעוּר|m|שִׁעוּרִים|lesson
כִּתָּה|f|כִּתּוֹת|class, classroom
בֵּית סֵפֶר|m|בָּתֵּי סֵפֶר|school
בֵּית חוֹלִים|m|בָּתֵּי חוֹלִים|hospital
עֲבוֹדָה|f|עֲבוֹדוֹת|work, job
מִשְׂרָד|m|מִשְׂרָדִים|office
מִסְפָּר|m|מִסְפָּרִים|number
כַּרְטִיס|m|כַּרְטִיסִים|ticket, card
רַעְיוֹן|m|רַעְיוֹנוֹת|idea
חֲלוֹם|m|חֲלוֹמוֹת|dream
מַחֲשָׁבָה|f|מַחֲשָׁבוֹת|thought
בְּעָיָה|f|בְּעָיוֹת|problem
מַצָּב|m|מַצָּבִים|situation
תׇּכְנִית|f|תׇּכְנִיּוֹת|plan, program
יוֹם|m|יָמִים|day
לַיְלָה|m|לֵילוֹת|night
בֹּקֶר|m|בְּקָרִים|morning
צׇהֳרַיִם|m|=|noon
עֶרֶב|m|עֲרָבִים|evening
שָׁבוּעַ|m|שָׁבוּעוֹת|week
חֹדֶשׁ|m|חֳדָשִׁים|חודשים|month
שָׁנָה|f|שָׁנִים|year
שָׁעָה|f|שָׁעוֹת|hour
דַּקָּה|f|דַּקּוֹת|minute
רֶגַע|m|רְגָעִים|moment
זְמַן|m|זְמַנִּים|time
מָקוֹם|m|מְקוֹמוֹת|place
סוֹף|m|סוֹפִים|end
הַתְחָלָה|f|הַתְחָלוֹת|beginning
צַד|m|צְדָדִים|side
מֶרְכָּז|m|מֶרְכָּזִים|center
פִּנָּה|f|פִּנּוֹת|corner
קַו|m|קַוִּים|line
עוֹלָם|m|עוֹלָמוֹת|world
אֶרֶץ|f|אֲרָצוֹת|land, country
מְדִינָה|f|מְדִינוֹת|state, country
עִיר|f|עָרִים|city
כְּפָר|m|כְּפָרִים|village
רְחוֹב|m|רְחוֹבוֹת|street
כְּבִישׁ|m|כְּבִישִׁים|road
דֶּרֶךְ|f|דְּרָכִים|way, road
שׁוּק|m|שְׁוָקִים|market
חֲנוּת|f|חֲנֻיּוֹת|shop, store
מִסְעָדָה|f|מִסְעָדוֹת|restaurant
גַּן|m|גַּנִּים|garden, kindergarten
פַּארְק|m|פַּארְקִים|park
חוֹף|m|חוֹפִים|beach, shore
יָם|m|יַמִּים|sea
הַר|m|הָרִים|mountain
נָהָר|m|נְהָרוֹת|river
אִי|m|אִיִּים|island
שָׂדֶה|m|שָׂדוֹת|field
אֲדָמָה|f|אֲדָמוֹת|earth, soil
עֵץ|m|עֵצִים|tree, wood
פֶּרַח|m|פְּרָחִים|flower
אֶבֶן|f|אֲבָנִים|stone
שֶׁמֶשׁ|f|שְׁמָשׁוֹת|sun
יָרֵחַ|m|יְרֵחִים|moon
כּוֹכָב|m|כּוֹכָבִים|star
שָׁמַיִם|m|=|sky
עָנָן|m|עֲנָנִים|cloud
גֶּשֶׁם|m|גְּשָׁמִים|rain
שֶׁלֶג|m|שְׁלָגִים|snow
רוּחַ|f|רוּחוֹת|wind, spirit
אֵשׁ|f|-|fire
אֲוִיר|m|-|air
מַיִם|m|=|water
אוֹר|m|אוֹרוֹת|light
צֶבַע|m|צְבָעִים|color
כֶּלֶב|m|כְּלָבִים|dog
חָתוּל|m|חֲתוּלִים|cat
סוּס|m|סוּסִים|horse
צִפּוֹר|f|צִפֳּרִים|ציפורים|bird
דָּג|m|דָּגִים|fish
חַיָּה|f|חַיּוֹת|animal
לֶחֶם|m|לְחָמִים|bread
אֹכֶל|m|-|food
אֲרוּחָה|f|אֲרוּחוֹת|meal
בָּשָׂר|m|-|meat
עוֹף|m|עוֹפוֹת|chicken, poultry
בֵּיצָה|f|בֵּיצִים|egg
גְּבִינָה|f|גְּבִינוֹת|cheese
חָלָב|m|-|milk
קָפֶה|m|-|coffee
תֵּה|m|-|tea
יַיִן|m|יֵינוֹת|wine
מָרָק|m|מְרָקִים|soup
סָלָט|m|סָלָטִים|salad
עוּגָה|f|עוּגוֹת|cake
פְּרִי|m|פֵּרוֹת|fruit
יָרָק|m|יְרָקוֹת|vegetable
תַּפּוּחַ|m|תַּפּוּחִים|apple
תַּפּוּז|m|תַּפּוּזִים|orange
בָּנָנָה|f|בָּנָנוֹת|banana
עֲגַבְנִיָּה|f|עַגְבָנִיּוֹת|tomato
מְלָפְפוֹן|m|מְלָפְפוֹנִים|cucumber
אֹרֶז|m|-|rice
סֻכָּר|m|-|sugar
מֶלַח|m|-|salt
שֶׁמֶן|m|שְׁמָנִים|oil
כּוֹס|f|כּוֹסוֹת|cup, glass
צַלַּחַת|f|צַלָּחוֹת|plate
מַזְלֵג|m|מַזְלְגוֹת|fork
כַּף|f|כַּפּוֹת|spoon
סַכִּין|mf|סַכִּינִים|knife
בֶּגֶד|m|בְּגָדִים|garment, clothing
חֻלְצָה|f|חֻלְצוֹת|shirt
מִכְנָסַיִם|m|=|trousers
נַעַל|f|נַעֲלַיִם|shoe
כּוֹבַע|m|כּוֹבָעִים|hat
מִשְׁקָפַיִם|m|=|glasses
רֹאשׁ|m|רָאשִׁים|head
לֵב|m|לְבָבוֹת|heart
גּוּף|m|גּוּפִים|body
פֶּה|m|פִּיּוֹת|mouth
יָד|f|יָדַיִם|hand
רֶגֶל|f|רַגְלַיִם|leg, foot
עַיִן|f|עֵינַיִם|eye
אֹזֶן|f|אׇזְנַיִם|ear
שֵׁן|f|שִׁנַּיִם|tooth
אֶצְבַּע|f|אֶצְבָּעוֹת|finger
בֶּטֶן|f|בְּטָנִים|belly
גַּב|m|גַּבּוֹת|back
שֵׂעָר~שיער|m|שְׂעָרוֹת|hair
נֶפֶשׁ|f|נְפָשׁוֹת|soul
כֶּסֶף|m|כְּסָפִים|money, silver
זָהָב|m|-|gold
שֵׁם|m|שֵׁמוֹת|name
מְכוֹנִית|f|מְכוֹנִיּוֹת|car
אוֹטוֹבּוּס|m|אוֹטוֹבּוּסִים|bus
רַכֶּבֶת|f|רַכָּבוֹת|train
מָטוֹס|m|מְטוֹסִים|airplane
אוֹפַנַּיִם|m|=|bicycle
מְכוֹנָה|f|מְכוֹנוֹת|machine
חַשְׁמַל|m|-|electricity
שִׁיר|m|שִׁירִים|song, poem
מוּזִיקָה|f|-|music
סֶרֶט|m|סְרָטִים|movie
מִשְׂחָק|m|מִשְׂחָקִים|game
כַּדּוּר|m|כַּדּוּרִים|ball
מַתָּנָה|f|מַתָּנוֹת|gift
חַג|m|חַגִּים|holiday
שַׁבָּת|f|שַׁבָּתוֹת|Sabbath
מִלְחָמָה|f|מִלְחָמוֹת|war
שָׁלוֹם|m|-|peace; hello
צָבָא|m|צְבָאוֹת|army
דֶּגֶל|m|דְּגָלִים|flag
אַהֲבָה|f|אֲהָבוֹת|love
חַיִּים|m|=|life
חׇכְמָה|f|-|wisdom
כּוֹחַ|m|כּוֹחוֹת|strength, force
בְּרִיאוּת|f|-|health
עֶזְרָה|f|-|help
תּוֹדָה|f|תּוֹדוֹת|thanks
`;

const NOUN_NOTES = {
  'אִשָּׁה': 'Irregular plural.',
  'אִישׁ': 'Irregular plural.',
  'בַּיִת': 'Irregular plural.',
  'עִיר': 'Irregular plural.',
  'דֶּרֶךְ': 'Usually feminine, occasionally masculine.',
  'שֶׁמֶשׁ': 'Usually feminine; masculine in some literary use.',
  'סַכִּין': 'Used as both masculine and feminine.',
  'מַיִם': 'Has no singular: מַיִם is plural in form and takes plural agreement (הַמַּיִם קָרִים).',
  'שָׁמַיִם': 'Has no singular: שָׁמַיִם is plural in form and takes plural agreement (הַשָּׁמַיִם כְּחֻלִּים).',
  'חַיִּים': 'Has no singular: חַיִּים is plural in form and takes plural agreement (הַחַיִּים יָפִים).',
  'מִכְנָסַיִם': 'Has no singular: one pair is also מִכְנָסַיִם (מִכְנָסַיִם חֲדָשִׁים, new trousers).',
  'מִשְׁקָפַיִם': 'Has no singular: one pair is also מִשְׁקָפַיִם (מִשְׁקָפַיִם חֲדָשִׁים, new glasses).',
  'אוֹפַנַּיִם': 'Has no singular: one bicycle is also אוֹפַנַּיִם (אוֹפַנַּיִם חֲדָשִׁים, a new bike). The form is the dual of אוֹפָן, "wheel" (literary); in modern Hebrew אוֹפָן usually means "manner, way".',
  'צׇהֳרַיִם': 'Has no singular: צׇהֳרַיִם is dual in form (בַּצׇּהֳרַיִם, at noon).',
  'רוּחַ': 'Usually feminine.',
};

const ADJECTIVES_TSV = `
גָּדוֹל|גְּדוֹלָה|גְּדוֹלִים|גְּדוֹלוֹת|big
קָטָן|קְטַנָּה|קְטַנִּים|קְטַנּוֹת|small
טוֹב|טוֹבָה|טוֹבִים|טוֹבוֹת|good
רַע|רָעָה|רָעִים|רָעוֹת|bad
יָפֶה|יָפָה|יָפִים|יָפוֹת|beautiful
מְכֹעָר|מְכֹעֶרֶת|מְכֹעָרִים|מְכֹעָרוֹת|ugly
חָדָשׁ|חֲדָשָׁה|חֲדָשִׁים|חֲדָשׁוֹת|new
יָשָׁן|יְשָׁנָה|יְשָׁנִים|יְשָׁנוֹת|old (of things)
זָקֵן|זְקֵנָה|זְקֵנִים|זְקֵנוֹת|old (of people)
צָעִיר|צְעִירָה|צְעִירִים|צְעִירוֹת|young
חָכָם|חֲכָמָה|חֲכָמִים|חֲכָמוֹת|wise, clever
טִפֵּשׁ|טִפְּשָׁה|טִפְּשִׁים|טִפְּשׁוֹת|stupid
שָׂמֵחַ|שְׂמֵחָה|שְׂמֵחִים|שְׂמֵחוֹת|happy
עָצוּב|עֲצוּבָה|עֲצוּבִים|עֲצוּבוֹת|sad
חָם|חַמָּה|חַמִּים|חַמּוֹת|hot, warm
קַר|קָרָה|קָרִים|קָרוֹת|cold
אָרֹךְ|אֲרֻכָּה|אֲרֻכִּים|אֲרֻכּוֹת|long
קָצָר|קְצָרָה|קְצָרִים|קְצָרוֹת|short
גָּבוֹהַּ|גְּבוֹהָה|גְּבוֹהִים|גְּבוֹהוֹת|tall, high
נָמוּךְ|נְמוּכָה|נְמוּכִים|נְמוּכוֹת|short, low
כָּבֵד|כְּבֵדָה|כְּבֵדִים|כְּבֵדוֹת|heavy
קַל|קַלָּה|קַלִּים|קַלּוֹת|light, easy
קָשֶׁה|קָשָׁה|קָשִׁים|קָשׁוֹת|hard, difficult
מָהִיר|מְהִירָה|מְהִירִים|מְהִירוֹת|fast
אִטִּי|אִטִּית|אִטִּיִּים|אִטִּיּוֹת|slow
עָשִׁיר|עֲשִׁירָה|עֲשִׁירִים|עֲשִׁירוֹת|rich
עָנִי|עֲנִיָּה|עֲנִיִּים|עֲנִיּוֹת|poor
חָזָק|חֲזָקָה|חֲזָקִים|חֲזָקוֹת|strong
חַלָּשׁ|חַלָּשָׁה|חַלָּשִׁים|חַלָּשׁוֹת|weak
נָקִי|נְקִיָּה|נְקִיִּים|נְקִיּוֹת|clean
מְלֻכְלָךְ|מְלֻכְלֶכֶת|מְלֻכְלָכִים|מְלֻכְלָכוֹת|dirty
יָקָר|יְקָרָה|יְקָרִים|יְקָרוֹת|expensive; dear
זוֹל|זוֹלָה|זוֹלִים|זוֹלוֹת|cheap
מָלֵא|מְלֵאָה|מְלֵאִים|מְלֵאוֹת|full
רֵיק|רֵיקָה|רֵיקִים|רֵיקוֹת|empty
פָּתוּחַ|פְּתוּחָה|פְּתוּחִים|פְּתוּחוֹת|open
סָגוּר|סְגוּרָה|סְגוּרִים|סְגוּרוֹת|closed
חָשׁוּב|חֲשׁוּבָה|חֲשׁוּבִים|חֲשׁוּבוֹת|important
מְעַנְיֵן|מְעַנְיֶנֶת|מְעַנְיְנִים|מְעַנְיְנוֹת|interesting
מְשַׁעֲמֵם|מְשַׁעֲמֶמֶת|מְשַׁעַמְמִים|מְשַׁעַמְמוֹת|boring
טָעִים|טְעִימָה|טְעִימִים|טְעִימוֹת|tasty
מָתוֹק|מְתוּקָה|מְתוּקִים|מְתוּקוֹת|sweet
מַר|מָרָה|מָרִים|מָרוֹת|bitter
חָמוּץ|חֲמוּצָה|חֲמוּצִים|חֲמוּצוֹת|sour
רָעֵב|רְעֵבָה|רְעֵבִים|רְעֵבוֹת|hungry
צָמֵא|צְמֵאָה|צְמֵאִים|צְמֵאוֹת|thirsty
עָיֵף|עֲיֵפָה|עֲיֵפִים|עֲיֵפוֹת|tired
חוֹלֶה|חוֹלָה|חוֹלִים|חוֹלוֹת|sick
בָּרִיא|בְּרִיאָה|בְּרִיאִים|בְּרִיאוֹת|healthy
נֶחְמָד|נֶחְמָדָה|נֶחְמָדִים|נֶחְמָדוֹת|nice
נָעִים|נְעִימָה|נְעִימִים|נְעִימוֹת|pleasant
חָמוּד|חֲמוּדָה|חֲמוּדִים|חֲמוּדוֹת|cute
שָׁקֵט|שְׁקֵטָה|שְׁקֵטִים|שְׁקֵטוֹת|quiet
קָרוֹב|קְרוֹבָה|קְרוֹבִים|קְרוֹבוֹת|near, close
רָחוֹק|רְחוֹקָה|רְחוֹקִים|רְחוֹקוֹת|far
רָחָב|רְחָבָה|רְחָבִים|רְחָבוֹת|wide
צַר|צָרָה|צָרִים|צָרוֹת|narrow
עָמֹק|עֲמֻקָּה|עֲמֻקִּים|עֲמֻקּוֹת|deep
עָגֹל|עֲגֻלָּה|עֲגֻלִּים|עֲגֻלּוֹת|round
יָשָׁר|יְשָׁרָה|יְשָׁרִים|יְשָׁרוֹת|straight; honest
נָכוֹן|נְכוֹנָה|נְכוֹנִים|נְכוֹנוֹת|correct, true
רִאשׁוֹן|רִאשׁוֹנָה|רִאשׁוֹנִים|רִאשׁוֹנוֹת|first
אַחֲרוֹן|אַחֲרוֹנָה|אַחֲרוֹנִים|אַחֲרוֹנוֹת|last
אַחֵר|אַחֶרֶת|אֲחֵרִים|אֲחֵרוֹת|other
אָדֹם|אֲדֻמָּה|אֲדֻמִּים|אֲדֻמּוֹת|red
כָּחֹל|כְּחֻלָּה|כְּחֻלִּים|כְּחֻלּוֹת|blue
יָרֹק|יְרֻקָּה|יְרֻקִּים|יְרֻקּוֹת|green
צָהֹב|צְהֻבָּה|צְהֻבִּים|צְהֻבּוֹת|yellow
לָבָן|לְבָנָה|לְבָנִים|לְבָנוֹת|white
שָׁחֹר|שְׁחֹרָה|שְׁחֹרִים|שְׁחֹרוֹת|black
וָרֹד|וְרֻדָּה|וְרֻדִּים|וְרֻדּוֹת|pink
סָגֹל|סְגֻלָּה|סְגֻלִּים|סְגֻלּוֹת|purple
חוּם|חוּמָה|חוּמִים|חוּמוֹת|brown
אָפֹר|אֲפֹרָה|אֲפֹרִים|אֲפֹרוֹת|gray
כָּתֹם|כְּתֻמָּה|כְּתֻמִּים|כְּתֻמּוֹת|orange
יִשְׂרְאֵלִי|יִשְׂרְאֵלִית|יִשְׂרְאֵלִים|יִשְׂרְאֵלִיּוֹת|Israeli
אֲמֶרִיקָאִי|אֲמֶרִיקָאִית|אֲמֶרִיקָאִים|אֲמֶרִיקָאִיּוֹת|American
מְיֻחָד|מְיֻחֶדֶת|מְיֻחָדִים|מְיֻחָדוֹת|special
מְפֻרְסָם|מְפֻרְסֶמֶת|מְפֻרְסָמִים|מְפֻרְסָמוֹת|famous
מְסֻכָּן|מְסֻכֶּנֶת|מְסֻכָּנִים|מְסֻכָּנוֹת|dangerous
פָּשׁוּט|פְּשׁוּטָה|פְּשׁוּטִים|פְּשׁוּטוֹת|simple
מְסֻבָּךְ|מְסֻבֶּכֶת|מְסֻבָּכִים|מְסֻבָּכוֹת|complicated
מַצְחִיק|מַצְחִיקָה|מַצְחִיקִים|מַצְחִיקוֹת|funny
אָהוּב|אֲהוּבָה|אֲהוּבִים|אֲהוּבוֹת|beloved
מוּכָן|מוּכָנָה|מוּכָנִים|מוּכָנוֹת|ready
עָסוּק|עֲסוּקָה|עֲסוּקִים|עֲסוּקוֹת|busy
פָּנוּי|פְּנוּיָה|פְּנוּיִים|פְּנוּיוֹת|free, available
שָׁמֵן|שְׁמֵנָה|שְׁמֵנִים|שְׁמֵנוֹת|fat
רָזֶה|רָזָה|רָזִים|רָזוֹת|thin
מְצֻיָּן|מְצֻיֶּנֶת|מְצֻיָּנִים|מְצֻיָּנוֹת|excellent
`;

const IMP = (ms, fs, mp, fp) => ({ ms, fs, mp, fp });

export const VERBS = [
  // ---- pa'al
  { r: 'כתב', b: 'paal', g: 'to write' },
  { r: 'קרא', b: 'paal', g: 'to read; to call' },
  { r: 'למד', b: 'paal', g: 'to learn, to study', fut: 'a' },
  { r: 'שׁמר', b: 'paal', g: 'to guard, to keep' },
  { r: 'סגר', b: 'paal', g: 'to close' },
  { r: 'פתח', b: 'paal', g: 'to open' },
  { r: 'שׁמע', b: 'paal', g: 'to hear' },
  { r: 'אכל', b: 'paal', g: 'to eat', pa: true },
  { r: 'אמר', b: 'paal', g: 'to say', pa: true, forms: { infinitive: 'לוֹמַר' } },
  { r: 'שׁתה', b: 'paal', g: 'to drink' },
  { r: 'הלך', b: 'paal', g: 'to go, to walk', py: true },
  { r: 'ישׁב', b: 'paal', g: 'to sit', py: true },
  { r: 'ידע', b: 'paal', g: 'to know', py: true },
  { r: 'ירד', b: 'paal', g: 'to go down', py: true },
  { r: 'ישׁן', b: 'paal', g: 'to sleep', py: 'keep', fut: 'a', forms: { present: IMP('יָשֵׁן', 'יְשֵׁנָה', 'יְשֵׁנִים', 'יְשֵׁנוֹת') } },
  { r: 'עמד', b: 'paal', g: 'to stand' },
  { r: 'עבד', b: 'paal', g: 'to work' },
  { r: 'חשׁב', b: 'paal', g: 'to think' },
  { r: 'אהב', b: 'paal', g: 'to love', fut: 'a' },
  { r: 'שׁאל', b: 'paal', g: 'to ask' },
  { r: 'ענה', b: 'paal', g: 'to answer' },
  { r: 'ראה', b: 'paal', g: 'to see' },
  { r: 'קנה', b: 'paal', g: 'to buy' },
  { r: 'בנה', b: 'paal', g: 'to build' },
  { r: 'רצה', b: 'paal', g: 'to want' },
  { r: 'עשׂה', b: 'paal', g: 'to do, to make' },
  { r: 'בכה', b: 'paal', g: 'to cry' },
  { r: 'שׂחה', b: 'paal', g: 'to swim' },
  { r: 'זכה', b: 'paal', g: 'to win' },
  { r: 'מצא', b: 'paal', g: 'to find' },
  { r: 'נתן', b: 'paal', g: 'to give', pn: true, fut: 'e', assimilateN: true, forms: { imperative: IMP('תֵּן', 'תְּנִי', 'תְּנוּ', 'תֵּנָּה'), infinitive: 'לָתֵת' } },
  { r: 'לקח', b: 'paal', g: 'to take', pn: true, forms: { imperative: IMP('קַח', 'קְחִי', 'קְחוּ', 'קַחְנָה'), infinitive: 'לָקַחַת' } },
  { r: 'נסע', b: 'paal', g: 'to travel, to drive', pn: true, forms: { imperative: IMP('סַע', 'סְעִי', 'סְעוּ', 'סַעְנָה'), infinitive: 'לִנְסֹעַ' } },
  { r: 'נגע', b: 'paal', g: 'to touch', pn: true, forms: { imperative: IMP('גַּע', 'גְּעִי', 'גְּעוּ', 'גַּעְנָה'), infinitive: 'לָגַעַת' } },
  { r: 'נפל', b: 'paal', g: 'to fall', pn: true },
  { r: 'קום', b: 'paal', g: 'to get up, to rise' },
  { r: 'שׂים', b: 'paal', g: 'to put, to place' },
  { r: 'רוץ', b: 'paal', g: 'to run' },
  { r: 'שׁיר', b: 'paal', g: 'to sing' },
  { r: 'גור', b: 'paal', g: 'to live, to reside' },
  { r: 'שׁוב', b: 'paal', g: 'to return' },
  { r: 'טוס', b: 'paal', g: 'to fly (travel by plane)' },
  { r: 'זוז', b: 'paal', g: 'to move' },
  { r: 'עוף', b: 'paal', g: 'to fly' },
  { r: 'נוח', b: 'paal', g: 'to rest' },
  { r: 'פגשׁ', b: 'paal', g: 'to meet' },
  { r: 'זכר', b: 'paal', g: 'to remember' },
  { r: 'שׁכח', b: 'paal', g: 'to forget' },
  { r: 'סלח', b: 'paal', g: 'to forgive' },
  { r: 'שׁלח', b: 'paal', g: 'to send' },
  { r: 'לבשׁ', b: 'paal', g: 'to wear, to put on', fut: 'a' },
  { r: 'רקד', b: 'paal', g: 'to dance' },
  { r: 'צחק', b: 'paal', g: 'to laugh' },
  { r: 'חזר', b: 'paal', g: 'to return, to repeat', c1Silent: false },
  { r: 'עזר', b: 'paal', g: 'to help' },
  { r: 'עזב', b: 'paal', g: 'to leave' },
  { r: 'גמר', b: 'paal', g: 'to finish' },
  { r: 'שׁבר', b: 'paal', g: 'to break' },
  { r: 'חלם', b: 'paal', g: 'to dream', c1Silent: false },
  { r: 'כעס', b: 'paal', g: 'to be angry' },
  { r: 'רחץ', b: 'paal', g: 'to wash' },
  { r: 'פחד', b: 'paal', g: 'to be afraid' },
  { r: 'גדל', b: 'paal', g: 'to grow (up)', fut: 'a', forms: { present: IMP('גָּדֵל', 'גְּדֵלָה', 'גְּדֵלִים', 'גְּדֵלוֹת') } },
  { r: 'טעם', b: 'paal', g: 'to taste' },
  { r: 'שׁכב', b: 'paal', g: 'to lie down', fut: 'a' },
  { r: 'רכב', b: 'paal', g: 'to ride', fut: 'a' },
  { r: 'זרק', b: 'paal', g: 'to throw' },
  { r: 'מכר', b: 'paal', g: 'to sell' },
  { r: 'שׁפך', b: 'paal', g: 'to pour, to spill' },
  { r: 'תפס', b: 'paal', g: 'to catch' },
  { r: 'בחר', b: 'paal', g: 'to choose' },
  { r: 'ספר', b: 'paal', g: 'to count' },
  { r: 'ברח', b: 'paal', g: 'to run away, to escape' },
  { r: 'צעק', b: 'paal', g: 'to shout' },
  { r: 'קפץ', b: 'paal', g: 'to jump' },
  { r: 'פגע', b: 'paal', g: 'to hit, to hurt' },
  { r: 'חתך', b: 'paal', g: 'to cut' },
  { r: 'הפך', b: 'paal', g: 'to turn over' },
  { r: 'אסף', b: 'paal', g: 'to collect, to gather' },
  { r: 'בדק', b: 'paal', g: 'to check' },
  {
    r: 'היה', b: 'paal', g: 'to be', irregular: true,
    table: {
      past: { '1s': 'הָיִיתִי', '2ms': 'הָיִיתָ', '2fs': 'הָיִית', '3ms': 'הָיָה', '3fs': 'הָיְתָה|הייתה', '1p': 'הָיִינוּ', '2mp': 'הֱיִיתֶם', '2fp': 'הֱיִיתֶן', '3p': 'הָיוּ' },
      present: null,
      future: { '1s': 'אֶהְיֶה', '2ms': 'תִּהְיֶה', '2fs': 'תִּהְיִי', '3ms': 'יִהְיֶה', '3fs': 'תִּהְיֶה', '1p': 'נִהְיֶה', '2mp': 'תִּהְיוּ', '2fp': 'תִּהְיֶינָה', '3mp': 'יִהְיוּ', '3fp': 'תִּהְיֶינָה' },
      imperative: IMP('הֱיֵה', 'הֲיִי', 'הֱיוּ', 'הֱיֶינָה'),
      infinitive: 'לִהְיוֹת',
    },
    note: 'No present tense in modern Hebrew.',
  },
  {
    r: 'יכל', b: 'paal', g: 'can, to be able', irregular: true, lemma: 'יָכוֹל',
    table: {
      past: { '1s': 'יָכֹלְתִּי', '2ms': 'יָכֹלְתָּ', '2fs': 'יָכֹלְתְּ', '3ms': 'יָכֹל', '3fs': 'יָכְלָה', '1p': 'יָכֹלְנוּ', '2mp': 'יְכׇלְתֶּם', '2fp': 'יְכׇלְתֶּן', '3p': 'יָכְלוּ' },
      present: IMP('יָכוֹל', 'יְכוֹלָה', 'יְכוֹלִים', 'יְכוֹלוֹת'),
      future: { '1s': 'אוּכַל', '2ms': 'תּוּכַל', '2fs': 'תּוּכְלִי', '3ms': 'יוּכַל', '3fs': 'תּוּכַל', '1p': 'נוּכַל', '2mp': 'תּוּכְלוּ', '2fp': 'תּוּכַלְנָה', '3mp': 'יוּכְלוּ', '3fp': 'תּוּכַלְנָה' },
      imperative: null,
      infinitive: null,
    },
    note: 'No imperative or infinitive; use לִהְיוֹת מְסֻגָּל ("to be able").',
  },
  {
    r: 'בוא', b: 'paal', g: 'to come', irregular: true,
    table: {
      past: { '1s': 'בָּאתִי', '2ms': 'בָּאתָ', '2fs': 'בָּאת', '3ms': 'בָּא', '3fs': 'בָּאָה', '1p': 'בָּאנוּ', '2mp': 'בָּאתֶם', '2fp': 'בָּאתֶן', '3p': 'בָּאוּ' },
      present: IMP('בָּא', 'בָּאָה', 'בָּאִים', 'בָּאוֹת'),
      future: { '1s': 'אָבוֹא', '2ms': 'תָּבוֹא', '2fs': 'תָּבוֹאִי', '3ms': 'יָבוֹא', '3fs': 'תָּבוֹא', '1p': 'נָבוֹא', '2mp': 'תָּבוֹאוּ', '2fp': 'תָּבֹאנָה', '3mp': 'יָבוֹאוּ', '3fp': 'תָּבֹאנָה' },
      imperative: IMP('בּוֹא', 'בּוֹאִי', 'בּוֹאוּ', 'בֹּאנָה'),
      infinitive: 'לָבוֹא',
    },
  },
  {
    r: 'יצא', b: 'paal', g: 'to go out, to leave', irregular: true,
    table: {
      past: { '1s': 'יָצָאתִי', '2ms': 'יָצָאתָ', '2fs': 'יָצָאת', '3ms': 'יָצָא', '3fs': 'יָצְאָה', '1p': 'יָצָאנוּ', '2mp': 'יְצָאתֶם', '2fp': 'יְצָאתֶן', '3p': 'יָצְאוּ' },
      present: IMP('יוֹצֵא', 'יוֹצֵאת', 'יוֹצְאִים', 'יוֹצְאוֹת'),
      future: { '1s': 'אֵצֵא', '2ms': 'תֵּצֵא', '2fs': 'תֵּצְאִי', '3ms': 'יֵצֵא', '3fs': 'תֵּצֵא', '1p': 'נֵצֵא', '2mp': 'תֵּצְאוּ', '2fp': 'תֵּצֶאנָה', '3mp': 'יֵצְאוּ', '3fp': 'תֵּצֶאנָה' },
      imperative: IMP('צֵא', 'צְאִי', 'צְאוּ', 'צֶאנָה'),
      infinitive: 'לָצֵאת',
    },
  },

  // ---- nif'al
  { r: 'כנס', b: 'nifal', g: 'to enter' },
  { r: 'שׁאר', b: 'nifal', g: 'to stay, to remain' },
  { r: 'פגשׁ', b: 'nifal', g: 'to meet (each other)' },
  { r: 'ילד', b: 'nifal', g: 'to be born' },
  { r: 'מצא', b: 'nifal', g: 'to be found, to be located' },
  { r: 'רדם', b: 'nifal', g: 'to fall asleep' },
  { r: 'בהל', b: 'nifal', g: 'to be frightened' },
  { r: 'שׁבר', b: 'nifal', g: 'to be broken' },
  { r: 'גמר', b: 'nifal', g: 'to end, to run out' },
  { r: 'סגר', b: 'nifal', g: 'to be closed' },
  { r: 'פתח', b: 'nifal', g: 'to be opened' },
  { r: 'זכר', b: 'nifal', g: 'to recall' },
  { r: 'לחם', b: 'nifal', g: 'to fight' },
  { r: 'הנה', b: 'nifal', g: 'to enjoy' },
  { r: 'עלם', b: 'nifal', g: 'to disappear' },
  { r: 'ראה', b: 'nifal', g: 'to seem, to look' },
  { r: 'בנה', b: 'nifal', g: 'to be built' },
  { r: 'שׁמע', b: 'nifal', g: 'to sound, to be heard' },
  { r: 'כשׁל', b: 'nifal', g: 'to fail' },
  { r: 'חשׁב', b: 'nifal', g: 'to be considered' },

  // ---- pi'el
  { r: 'דבר', b: 'piel', g: 'to speak' },
  { r: 'ספר', b: 'piel', g: 'to tell' },
  { r: 'בקשׁ', b: 'piel', g: 'to ask for, to request' },
  { r: 'שׁלם', b: 'piel', g: 'to pay' },
  { r: 'חפשׂ', b: 'piel', g: 'to look for, to search' },
  { r: 'למד', b: 'piel', g: 'to teach' },
  { r: 'טיל', b: 'piel', g: 'to take a walk, to tour' },
  { r: 'קבל', b: 'piel', g: 'to receive' },
  { r: 'נקה', b: 'piel', g: 'to clean' },
  { r: 'שׁנה', b: 'piel', g: 'to change' },
  { r: 'נסה', b: 'piel', g: 'to try' },
  { r: 'חכה', b: 'piel', g: 'to wait' },
  { r: 'קוה', b: 'piel', g: 'to hope' },
  { r: 'בשׁל', b: 'piel', g: 'to cook' },
  { r: 'סדר', b: 'piel', g: 'to arrange, to tidy' },
  { r: 'צלם', b: 'piel', g: 'to photograph' },
  { r: 'נהל', b: 'piel', g: 'to manage' },
  { r: 'ברך', b: 'piel', g: 'to bless, to congratulate' },
  { r: 'שׂחק', b: 'piel', g: 'to play' },
  { r: 'ציר', b: 'piel', g: 'to draw, to paint' },
  { r: 'כבס', b: 'piel', g: 'to do laundry' },
  { r: 'עשׁן', b: 'piel', g: 'to smoke' },
  { r: 'נגן', b: 'piel', g: 'to play (music)' },
  { r: 'בקר', b: 'piel', g: 'to visit' },
  { r: 'גדל', b: 'piel', g: 'to raise, to grow' },
  { r: 'חבק', b: 'piel', g: 'to hug' },
  { r: 'נשׁק', b: 'piel', g: 'to kiss' },
  { r: 'סים', b: 'piel', g: 'to finish' },
  { r: 'תקן', b: 'piel', g: 'to fix, to correct' },
  { r: 'בטל', b: 'piel', g: 'to cancel' },
  { r: 'שׁקר', b: 'piel', g: 'to lie (tell a lie)' },
  { r: 'כבד', b: 'piel', g: 'to respect, to honor' },
  { r: 'טלפן', b: 'piel', g: 'to phone' },
  { r: 'תרגם', b: 'piel', g: 'to translate' },
  { r: 'לכלך', b: 'piel', g: 'to make dirty' },
  { r: 'צלצל', b: 'piel', g: 'to ring' },
  { r: 'ארגן', b: 'piel', g: 'to organize' },

  // ---- pu'al
  { r: 'ספר', b: 'pual', g: 'to be told' },
  { r: 'בשׁל', b: 'pual', g: 'to be cooked' },
  { r: 'תקן', b: 'pual', g: 'to be fixed' },
  { r: 'צלם', b: 'pual', g: 'to be photographed' },
  { r: 'קבל', b: 'pual', g: 'to be accepted' },
  { r: 'ארגן', b: 'pual', g: 'to be organized' },

  // ---- hif'il
  { r: 'בין', b: 'hifil', g: 'to understand' },
  { r: 'כון', b: 'hifil', g: 'to prepare' },
  { r: 'קום', b: 'hifil', g: 'to establish, to set up' },
  { r: 'רום', b: 'hifil', g: 'to lift, to raise' },
  { r: 'עור', b: 'hifil', g: 'to wake (someone) up' },
  { r: 'זמן', b: 'hifil', g: 'to invite; to order' },
  { r: 'סבר', b: 'hifil', g: 'to explain' },
  { r: 'רגשׁ', b: 'hifil', g: 'to feel' },
  { r: 'תחל', b: 'hifil', g: 'to begin, to start' },
  { r: 'פסק', b: 'hifil', g: 'to stop' },
  { r: 'צלח', b: 'hifil', g: 'to succeed' },
  { r: 'משׁך', b: 'hifil', g: 'to continue' },
  { r: 'לבשׁ', b: 'hifil', g: 'to dress (someone)' },
  { r: 'חלט', b: 'hifil', g: 'to decide' },
  { r: 'עבר', b: 'hifil', g: 'to transfer, to pass' },
  { r: 'שׁאר', b: 'hifil', g: 'to leave (behind)' },
  { r: 'ירד', b: 'hifil', g: 'to take down, to lower' },
  { r: 'ידע', b: 'hifil', g: 'to announce, to inform' },
  { r: 'יצא', b: 'hifil', g: 'to take out' },
  { r: 'יסף', b: 'hifil', g: 'to add' },
  { r: 'יבל', b: 'hifil', g: 'to lead' },
  { r: 'יכח', b: 'hifil', g: 'to prove' },
  { r: 'זכר', b: 'hifil', g: 'to remind' },
  { r: 'סכם', b: 'hifil', g: 'to agree' },
  { r: 'נגע', b: 'hifil', g: 'to arrive', pn: true },
  { r: 'נכר', b: 'hifil', g: 'to know (someone), to recognize', pn: true },
  { r: 'יצע', b: 'hifil', g: 'to offer, to suggest', pn: true },
  { r: 'נפל', b: 'hifil', g: 'to drop', pn: true },
  { r: 'נבט', b: 'hifil', g: 'to look, to gaze', pn: true },
  { r: 'נגד', b: 'hifil', g: 'to tell, to say', pn: true },
  { r: 'דלק', b: 'hifil', g: 'to turn on, to light' },
  { r: 'כנס', b: 'hifil', g: 'to put in, to bring in' },
  { r: 'רשׁה', b: 'hifil', g: 'to allow' },
  { r: 'פתע', b: 'hifil', g: 'to surprise' },
  { r: 'חזק', b: 'hifil', g: 'to hold', c1Silent: false },
  { r: 'בטח', b: 'hifil', g: 'to promise' },
  { r: 'קשׁב', b: 'hifil', g: 'to listen' },
  { r: 'צבע', b: 'hifil', g: 'to vote; to point' },
  { r: 'מלץ', b: 'hifil', g: 'to recommend' },
  { r: 'דפס', b: 'hifil', g: 'to print' },
  {
    r: 'בוא', b: 'hifil', g: 'to bring', irregular: true,
    table: {
      past: { '1s': 'הֵבֵאתִי', '2ms': 'הֵבֵאתָ', '2fs': 'הֵבֵאת', '3ms': 'הֵבִיא', '3fs': 'הֵבִיאָה', '1p': 'הֵבֵאנוּ', '2mp': 'הֲבֵאתֶם', '2fp': 'הֲבֵאתֶן', '3p': 'הֵבִיאוּ' },
      present: IMP('מֵבִיא', 'מְבִיאָה', 'מְבִיאִים', 'מְבִיאוֹת'),
      future: { '1s': 'אָבִיא', '2ms': 'תָּבִיא', '2fs': 'תָּבִיאִי', '3ms': 'יָבִיא', '3fs': 'תָּבִיא', '1p': 'נָבִיא', '2mp': 'תָּבִיאוּ', '2fp': 'תָּבֵאנָה', '3mp': 'יָבִיאוּ', '3fp': 'תָּבֵאנָה' },
      imperative: IMP('הָבֵא', 'הָבִיאִי', 'הָבִיאוּ', 'הָבֵאנָה'),
      infinitive: 'לְהָבִיא',
    },
  },

  // ---- huf'al
  { r: 'זמן', b: 'hufal', g: 'to be invited' },
  { r: 'כון', b: 'hufal', g: 'to be prepared' },
  { r: 'חלט', b: 'hufal', g: 'to be decided' },
  { r: 'ירד', b: 'hufal', g: 'to be taken down' },
  { r: 'דפס', b: 'hufal', g: 'to be printed' },
  { r: 'סבר', b: 'hufal', g: 'to be explained' },

  // ---- hitpa'el
  { r: 'לבשׁ', b: 'hitpael', g: 'to get dressed' },
  { r: 'רחץ', b: 'hitpael', g: 'to bathe, to wash oneself' },
  { r: 'קשׁר', b: 'hitpael', g: 'to call, to contact' },
  { r: 'סכל', b: 'hitpael', g: 'to look' },
  { r: 'שׁמשׁ', b: 'hitpael', g: 'to use' },
  { r: 'חתן', b: 'hitpael', g: 'to get married' },
  { r: 'רגל', b: 'hitpael', g: 'to get used to' },
  { r: 'געגע', b: 'hitpael', g: 'to miss, to long for' },
  { r: 'ענין', b: 'hitpael', g: 'to be interested' },
  { r: 'פלל', b: 'hitpael', g: 'to pray' },
  { r: 'נהג', b: 'hitpael', g: 'to behave' },
  { r: 'אהב', b: 'hitpael', g: 'to fall in love' },
  { r: 'רגשׁ', b: 'hitpael', g: 'to get excited' },
  { r: 'בישׁ', b: 'hitpael', g: 'to be ashamed, to be shy' },
  { r: 'פתח', b: 'hitpael', g: 'to develop' },
  { r: 'נצל', b: 'hitpael', g: 'to apologize' },
  { r: 'צער', b: 'hitpael', g: 'to be sorry, to regret' },
  { r: 'שׁנה', b: 'hitpael', g: 'to change (oneself)' },
  { r: 'וכח', b: 'hitpael', g: 'to argue' },
  { r: 'חבא', b: 'hitpael', g: 'to hide (oneself)' },
  { r: 'קלח', b: 'hitpael', g: 'to take a shower' },
  { r: 'סדר', b: 'hitpael', g: 'to get organized, to manage' },
  { r: 'צלם', b: 'hitpael', g: 'to have one’s picture taken' },
  { r: 'גלה', b: 'hitpael', g: 'to be revealed, to turn out' },
  { r: 'נדב', b: 'hitpael', g: 'to volunteer' },
  { r: 'אמן', b: 'hitpael', g: 'to practice, to work out' },
  { r: 'זקן', b: 'hitpael', g: 'to grow old' },
  { r: 'שׁגע', b: 'hitpael', g: 'to go crazy' },
  { r: 'ברך', b: 'hitpael', g: 'to be blessed' },
];

function parseRows(tsv) {
  return tsv.trim().split('\n').map((l) => l.split('|'));
}

const form = (n, p) => ({ n, p: p || null });

export const NOUNS = parseRows(NOUNS_TSV).map((f) => {
  // A plain-spelling override may follow either the singular or the plural.
  let [sgField, gender, ...rest] = f;
  const gloss = rest.pop();
  const [pl, plPlain] = rest;
  const [sg, sgPlain] = sgField.split('~');
  // Plural-only nouns (מַיִם, אוֹפַנַּיִם): the dictionary form is the plural, and there is no singular.
  const pluralOnly = pl === '=';
  return {
    type: 'noun',
    lemma: form(sg, sgPlain),
    gender,
    pluralOnly,
    plural: pluralOnly ? form(sg, sgPlain) : pl && pl !== '-' ? form(pl, plPlain) : null,
    gloss,
    note: NOUN_NOTES[sg] || null,
  };
});

export const ADJECTIVES = parseRows(ADJECTIVES_TSV).map(([ms, fs, mp, fp, gloss]) => ({
  type: 'adjective',
  forms: { ms: form(ms), fs: form(fs), mp: form(mp), fp: form(fp) },
  gloss,
}));
