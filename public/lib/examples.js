// One example sentence per built-in dictionary entry: key | Hebrew | English.
// Keys: n:<noun>, a:<adjective>, v:<root>:<binyan>, using plain spelling.
// The example word is wrapped in {braces}. A middle dot (·) marks a prefix
// boundary where the plain spelling must not double a letter (הַ·יֶּלֶד → הילד);
// it is never displayed.

export const EXAMPLES_TSV = `
n:איש|הָיָה שָׁם {אִישׁ} זָקֵן עִם כֶּלֶב.|There was an old man there with a dog.
n:אישה|{הָאִשָּׁה} הַזֹּאת הִיא הַמּוֹרָה שֶׁלִּי.|This woman is my teacher.
n:אב|{הָאָב} שֶׁל דָּנִי הוּא רוֹפֵא.|Danny's father is a doctor.
n:אם|{הָאֵם} מְחַבֶּקֶת אֶת הַתִּינוֹק.|The mother is hugging the baby.
n:אבא|{אַבָּא} שֶׁלִּי עוֹבֵד בְּמִשְׂרָד.|My dad works in an office.
n:אימא|{אִמָּא}, אֲנִי רָעֵב!|Mom, I'm hungry!
n:אח|יֵשׁ לִי {אָח} אֶחָד וּשְׁתֵּי אֲחָיוֹת.|I have one brother and two sisters.
n:אחות|{הָאָחוֹת} הַקְּטַנָּה שֶׁלִּי בַּת חָמֵשׁ.|My little sister is five.
n:בן|יֵשׁ לָהֶם {בֵּן} וּבַת.|They have a son and a daughter.
n:בת|{הַבַּת} שֶׁלָּהֶם לוֹמֶדֶת בָּאוּנִיבֶרְסִיטָה.|Their daughter studies at the university.
n:ילד|{הַ·יֶּלֶד} מְשַׂחֵק בַּכַּדּוּר.|The boy is playing with the ball.
n:ילדה|{הַ·יַּלְדָּה} קוֹרֵאת סֵפֶר.|The girl is reading a book.
n:תינוק|{הַתִּינוֹק} יָשֵׁן עַכְשָׁיו.|The baby is sleeping now.
n:סבא|{סַבָּא} שֶׁלִּי גָּר בְּחֵיפָה.|My grandfather lives in Haifa.
n:סבתא|{סָבְתָא} מְבַשֶּׁלֶת מָרָק טָעִים.|Grandma is cooking a tasty soup.
n:דוד|{הַדּוֹד} שֶׁלִּי בָּא לְבַקֵּר.|My uncle came to visit.
n:דודה|{הַדּוֹדָה} שֶׁלִּי גָּרָה בְּאַמֶרִיקָה.|My aunt lives in America.
n:בעל|{הַבַּעַל} שֶׁלָּהּ עוֹבֵד בַּלַּיְלָה.|Her husband works at night.
n:משפחה|כָּל {הַמִּשְׁפָּחָה} נִפְגֶּשֶׁת בְּשַׁבָּת.|The whole family gets together on Shabbat.
n:חבר|{הֶחָבֵר} הֲכִי טוֹב שֶׁלִּי גָּר קָרוֹב אֵלַי.|My best friend lives near me.
n:חברה|{חֲבֵרָה} שֶׁלִּי מְדַבֶּרֶת שָׁלוֹשׁ שָׂפוֹת.|A friend of mine speaks three languages.
n:מורה|{הַמּוֹרֶה} כּוֹתֵב עַל הַלּוּחַ.|The teacher is writing on the board.
n:מורה/f|{הַמּוֹרָה} שֶׁלָּנוּ נֶחְמָדָה מְאֹד.|Our teacher is very nice.
n:תלמיד|{הַתַּלְמִידִים} יוֹשְׁבִים בַּכִּתָּה.|The students are sitting in the classroom.
n:רופא|{הָרוֹפֵא} אָמַר שֶׁאֲנִי בָּרִיא.|The doctor said I'm healthy.
n:שוטר|{הַשּׁוֹטֵר} עָצַר אֶת הַמְּכוֹנִית.|The police officer stopped the car.
n:חייל|{הַחַיָּלִים} חוֹזְרִים הַבַּיְתָה.|The soldiers are going back home.
n:מהנדס|אָחִי {מְהַנְדֵּס} תׇּכְנָה.|My brother is a software engineer.
n:מלצר|{הַמֶּלְצַר} הֵבִיא לָנוּ אֶת הַתַּפְרִיט.|The waiter brought us the menu.
n:טבח|{הַטַּבָּח} מְבַשֵּׁל בַּמִּטְבָּח.|The cook is cooking in the kitchen.
n:מלך|{הַמֶּלֶךְ} יָשַׁב עַל הַכִּסֵּא.|The king sat on the throne.
n:מלכה|{הַמַּלְכָּה} לָבְשָׁה שִׂמְלָה יָפָה.|The queen wore a beautiful dress.
n:ספר|קָרָאתִי {סֵפֶר} מְעַנְיֵן.|I read an interesting book.
n:בית|{הַבַּיִת} שֶׁלָּנוּ קָרוֹב לַ·יָּם.|Our house is close to the sea.
n:חדר|{הַחֶדֶר} שֶׁלִּי קָטָן אֲבָל נָעִים.|My room is small but pleasant.
n:דירה|אֲנַחְנוּ מְחַפְּשִׂים {דִּירָה} בְּתֵל אָבִיב.|We're looking for an apartment in Tel Aviv.
n:קומה|אֲנִי גָּר {בַּקּוֹמָה} הַשְּׁלִישִׁית.|I live on the third floor.
n:מטבח|אִמָּא {בַּמִּטְבָּח}.|Mom is in the kitchen.
n:מקלחת|הוּא {בַּמִּקְלַחַת} עַכְשָׁיו.|He's in the shower now.
n:שולחן|הַסֵּפֶר עַל {הַשֻּׁלְחָן}.|The book is on the table.
n:כיסא|שֵׁב עַל {הַכִּסֵּא}, בְּבַקָּשָׁה.|Sit on the chair, please.
n:חלון|תִּפְתַּח אֶת {הַחַלּוֹן}, חַם פֹּה.|Open the window, it's hot in here.
n:דלת|מִישֶׁהוּ דּוֹפֵק {בַּדֶּלֶת}.|Someone is knocking on the door.
n:קיר|תָּלִינוּ תְּמוּנָה עַל {הַקִּיר}.|We hung a picture on the wall.
n:רצפה|הַמַּפְתְּחוֹת נָפְלוּ עַל {הָרִצְפָּה}.|The keys fell on the floor.
n:גג|יֵשׁ חָתוּל עַל {הַגַּג}.|There's a cat on the roof.
n:מיטה|הַיְלָדִים כְּבָר {בַּמִּטָּה}.|The kids are already in bed.
n:ארון|הַבְּגָדִים {בָּאָרוֹן}.|The clothes are in the closet.
n:מנורה|תַּדְלִיק אֶת {הַמְּנוֹרָה}, בְּבַקָּשָׁה.|Please turn on the lamp.
n:תמונה|זֹאת {תְּמוּנָה} שֶׁל הַמִּשְׁפָּחָה שֶׁלִּי.|This is a picture of my family.
n:שמיכה|קַר לִי, אֲנִי צָרִיךְ עוֹד {שְׂמִיכָה}.|I'm cold, I need another blanket.
n:כרית|{הַכָּרִית} הַזֹּאת רַכָּה מְאֹד.|This pillow is very soft.
n:מגבת|אֵיפֹה {הַמַּגֶּבֶת} שֶׁלִּי?|Where's my towel?
n:סבון|צָרִיךְ לִרְחֹץ יָדַיִם עִם {סַבּוֹן}.|You need to wash your hands with soap.
n:מעלית|{הַמַּעֲלִית} לֹא עוֹבֶדֶת הַיּוֹם.|The elevator isn't working today.
n:מדרגה|עָלִינוּ {בַּמַּדְרֵגוֹת} לַקּוֹמָה הַחֲמִישִׁית.|We took the stairs up to the fifth floor.
n:מפתח|שָׁכַחְתִּי אֶת {הַמַּפְתְּחוֹת} בַּבַּיִת.|I forgot the keys at home.
n:שעון|{הַשָּׁעוֹן} הַזֶּה מְאַחֵר.|This clock is slow.
n:תיק|מָה יֵשׁ לְךָ {בַּתִּיק}?|What do you have in your bag?
n:מחשב|אֲנִי עוֹבֵד עַל {הַמַּחְשֵׁב} כָּל הַיּוֹם.|I work on the computer all day.
n:טלפון|{הַטֶּלֶפוֹן} שֶׁלְּךָ מְצַלְצֵל.|Your phone is ringing.
n:עיתון|סַבָּא קוֹרֵא {עִתּוֹן} כָּל בֹּקֶר.|Grandpa reads a newspaper every morning.
n:מכתב|קִבַּלְתִּי {מִכְתָּב} מֵחָבֵר.|I got a letter from a friend.
n:עט|יֵשׁ לְךָ {עֵט}?|Do you have a pen?
n:עיפרון|הוּא כּוֹתֵב {בְּעִפָּרוֹן}.|He writes with a pencil.
n:מחברת|כִּתְבוּ אֶת הַתְּשׁוּבוֹת {בַּמַּחְבֶּרֶת}.|Write the answers in your notebook.
n:דף|קַח {דַּף} וְעֵט.|Take a sheet of paper and a pen.
n:לוח|הַמּוֹרָה כָּתְבָה עַל {הַלּוּחַ}.|The teacher wrote on the board.
n:אות|יֵשׁ עֶשְׂרִים וּשְׁתַּיִם {אוֹתִיּוֹת} בָּאָלֶף בֵּית.|There are twenty-two letters in the alphabet.
n:מילה|מָה פֵּרוּשׁ {הַמִּלָּה} הַזֹּאת?|What does this word mean?
n:שפה|עִבְרִית הִיא {שָׂפָה} יָפָה.|Hebrew is a beautiful language.
n:שאלה|יֵשׁ לִי {שְׁאֵלָה}.|I have a question.
n:תשובה|זֹאת {הַתְּשׁוּבָה} הַנְּכוֹנָה.|That's the right answer.
n:סיפור|אַבָּא סִפֵּר לָנוּ {סִפּוּר} לִפְנֵי הַשֵּׁנָה.|Dad told us a story before bed.
n:שיעור|{הַשִּׁעוּר} מַתְחִיל בְּשָׁעָה שְׁמוֹנֶה.|The lesson starts at eight.
n:כיתה|יֵשׁ עֶשְׂרִים תַּלְמִידִים {בַּכִּתָּה}.|There are twenty students in the class.
n:בית ספר|הוּא לוֹמֵד {בְּבֵית סֵפֶר} קָרוֹב לַבַּיִת.|He goes to a school near home.
n:בית חולים|הִיא עוֹבֶדֶת {בְּבֵית חוֹלִים}.|She works in a hospital.
n:עבודה|אֲנִי הוֹלֵךְ {לָעֲבוֹדָה} בָּרֶגֶל.|I walk to work.
n:משרד|{הַמִּשְׂרָד} שֶׁלִּי בַּקּוֹמָה הָרִאשׁוֹנָה.|My office is on the first floor.
n:מספר|מָה {הַמִּסְפָּר} שֶׁלְּךָ?|What's your number?
n:כרטיס|קָנִיתִי שְׁנֵי {כַּרְטִיסִים} לַהוֹפָעָה.|I bought two tickets to the show.
n:רעיון|יֵשׁ לִי {רַעְיוֹן} טוֹב!|I have a good idea!
n:חלום|הָיָה לִי {חֲלוֹם} מוּזָר.|I had a strange dream.
n:מחשבה|זֹאת {מַחֲשָׁבָה} מְעַנְיֶנֶת.|That's an interesting thought.
n:בעיה|אֵין {בְּעָיָה}!|No problem!
n:מצב|מָה {הַמַּצָּב}?|How's it going? (literally: what's the situation?)
n:תוכנית|מָה {הַתׇּכְנִיּוֹת} שֶׁלְּךָ לְסוֹף הַשָּׁבוּעַ?|What are your plans for the weekend?
n:יום|{הַ·יּוֹם} יֵשׁ לִי מִבְחָן.|Today I have a test.
n:לילה|{לַיְלָה} טוֹב!|Good night!
n:בוקר|{בֹּקֶר} טוֹב!|Good morning!
n:צוהריים|נִפָּגֵשׁ {בַּצׇּהֳרַיִם}.|Let's meet at noon.
n:ערב|{עֶרֶב} טוֹב!|Good evening!
n:שבוע|אֲנִי עוֹבֵד חֲמִשָּׁה יָמִים {בַּשָּׁבוּעַ}.|I work five days a week.
n:חודש|הֵם עָבְרוּ דִּירָה לִפְנֵי {חֹדֶשׁ}.|They moved a month ago.
n:שנה|{שָׁנָה} טוֹבָה!|Happy New Year!
n:שעה|הַסֶּרֶט מַתְחִיל בְּעוֹד {שָׁעָה}.|The movie starts in an hour.
n:דקה|חַכֵּה {דַּקָּה}!|Wait a minute!
n:רגע|{רֶגַע}, אֲנִי בָּא!|One moment, I'm coming!
n:זמן|אֵין לִי {זְמַן} עַכְשָׁיו.|I don't have time now.
n:מקום|זֶה {מָקוֹם} יָפֶה מְאֹד.|This is a very beautiful place.
n:סוף|אֲנִי אוֹהֵב אֶת {הַסּוֹף} שֶׁל הַסֶּרֶט.|I love the end of the movie.
n:התחלה|זֹאת רַק {הַהַתְחָלָה}.|This is only the beginning.
n:צד|הַבַּנְק {בַּצַּד} הַשֵּׁנִי שֶׁל הָרְחוֹב.|The bank is on the other side of the street.
n:מרכז|אֲנַחְנוּ גָּרִים {בַּמֶּרְכָּז}.|We live in the center.
n:פינה|הַחֲנוּת {בַּפִּנָּה}.|The shop is on the corner.
n:קו|אֵיזֶה {קַו} נוֹסֵעַ לַתַּחֲנָה הַמֶּרְכָּזִית?|Which line goes to the central station?
n:עולם|הוּא טִיֵּל בְּכָל {הָעוֹלָם}.|He traveled all over the world.
n:ארץ|אֲנִי גָּר {בָּאָרֶץ} כְּבָר עֶשֶׂר שָׁנִים.|I've lived in Israel for ten years.
n:מדינה|יִשְׂרָאֵל הִיא {מְדִינָה} קְטַנָּה.|Israel is a small country.
n:עיר|תֵּל אָבִיב הִיא {עִיר} גְּדוֹלָה.|Tel Aviv is a big city.
n:כפר|הֵם גָּרִים {בִּכְפָר} קָטָן.|They live in a small village.
n:רחוב|{הָרְחוֹב} הַזֶּה שָׁקֵט מְאֹד.|This street is very quiet.
n:כביש|אַל תַּחְצֶה אֶת {הַכְּבִישׁ} בָּאָדֹם!|Don't cross the road on red!
n:דרך|אֲנִי לֹא יוֹדֵעַ אֶת {הַדֶּרֶךְ}.|I don't know the way.
n:שוק|קָנִינוּ פֵּרוֹת {בַּשּׁוּק}.|We bought fruit at the market.
n:חנות|{הַחֲנוּת} סְגוּרָה בְּשַׁבָּת.|The shop is closed on Shabbat.
n:מסעדה|אָכַלְנוּ {בְּמִסְעָדָה} אִיטַלְקִית.|We ate at an Italian restaurant.
n:גן|הַיְלָדִים מְשַׂחֲקִים {בַּגַּן}.|The children are playing in the garden.
n:פארק|בּוֹא נֵלֵךְ {לַפַּארְק}.|Let's go to the park.
n:חוף|בַּקַּיִץ אֲנַחְנוּ הוֹלְכִים {לַחוֹף}.|In the summer we go to the beach.
n:ים|{הַ·יָּם} חַם הַיּוֹם.|The sea is warm today.
n:הר|עָלִינוּ עַל {הָהָר}.|We climbed the mountain.
n:נהר|{הַנָּהָר} הַזֶּה אָרֹךְ מְאֹד.|This river is very long.
n:אי|קַפְרִיסִין הִיא {אִי}.|Cyprus is an island.
n:שדה|הַפָּרוֹת {בַּשָּׂדֶה}.|The cows are in the field.
n:אדמה|{הָאֲדָמָה} רְטֻבָּה אַחֲרֵי הַגֶּשֶׁם.|The ground is wet after the rain.
n:עץ|הַצִּפּוֹר יוֹשֶׁבֶת עַל {הָעֵץ}.|The bird is sitting on the tree.
n:פרח|הוּא הֵבִיא לָהּ {פְּרָחִים}.|He brought her flowers.
n:אבן|הַבַּיִת בָּנוּי {מֵאֶבֶן}.|The house is built of stone.
n:שמש|{הַשֶּׁמֶשׁ} חַמָּה הַיּוֹם.|The sun is hot today.
n:ירח|{הַ·יָּרֵחַ} מָלֵא הַלַּיְלָה.|The moon is full tonight.
n:כוכב|רָאִינוּ הַרְבֵּה {כּוֹכָבִים} בַּשָּׁמַיִם.|We saw lots of stars in the sky.
n:שמיים|{הַשָּׁמַיִם} כְּחֻלִּים הַיּוֹם.|The sky is blue today.
n:ענן|אֵין אַף {עָנָן} בַּשָּׁמַיִם.|There isn't a single cloud in the sky.
n:גשם|יוֹרֵד {גֶּשֶׁם}.|It's raining.
n:שלג|בַּחֹרֶף יֵשׁ {שֶׁלֶג} בַּחֶרְמוֹן.|In winter there's snow on Mount Hermon.
n:רוח|יֵשׁ {רוּחַ} חֲזָקָה בַּחוּץ.|There's a strong wind outside.
n:אש|הֵם יָשְׁבוּ לְ·יַד {הָאֵשׁ}.|They sat by the fire.
n:אוויר|אֲנִי יוֹצֵא לִנְשֹׁם {אֲוִיר}.|I'm going out to get some air.
n:מים|אֶפְשָׁר כּוֹס {מַיִם}?|Can I have a glass of water?
n:אור|תַּדְלִיק אֶת {הָאוֹר}.|Turn on the light.
n:צבע|אֵיזֶה {צֶבַע} אַתָּה אוֹהֵב?|Which color do you like?
n:כלב|יֵשׁ לָנוּ {כֶּלֶב} גָּדוֹל.|We have a big dog.
n:חתול|{הֶחָתוּל} יָשֵׁן עַל הַסַּפָּה.|The cat is sleeping on the sofa.
n:סוס|הִיא רוֹכֶבֶת עַל {סוּס}.|She's riding a horse.
n:ציפור|{הַצִּפּוֹר} שָׁרָה בַּבֹּקֶר.|The bird sings in the morning.
n:דג|אֲנִי לֹא אוֹכֵל {דָּגִים}.|I don't eat fish.
n:חיה|הָאַרְיֵה הוּא {חַיָּה} חֲזָקָה.|The lion is a strong animal.
n:לחם|קְנֵה {לֶחֶם} בַּדֶּרֶךְ הַבַּיְתָה.|Buy bread on the way home.
n:אוכל|{הָאֹכֶל} כָּאן טָעִים מְאֹד.|The food here is very tasty.
n:ארוחה|הֵכַנְתִּי {אֲרוּחָה} לְכֻלָּם.|I made a meal for everyone.
n:בשר|הוּא לֹא אוֹכֵל {בָּשָׂר}.|He doesn't eat meat.
n:עוף|לַאֲרוּחַת עֶרֶב אָכַלְנוּ {עוֹף} עִם אֹרֶז.|For dinner we had chicken with rice.
n:ביצה|אֲנִי אוֹכֵל שְׁתֵּי {בֵּיצִים} בַּבֹּקֶר.|I eat two eggs in the morning.
n:גבינה|קָנִיתִי {גְּבִינָה} לְבָנָה.|I bought white cheese.
n:חלב|הַיְלָדִים שׁוֹתִים {חָלָב}.|The kids are drinking milk.
n:קפה|אַתָּה רוֹצֶה {קָפֶה}?|Do you want coffee?
n:תה|אֲנִי מַעֲדִיף {תֵּה} עִם לִימוֹן.|I prefer tea with lemon.
n:יין|שָׁתִינוּ {יַיִן} אָדֹם.|We drank red wine.
n:מרק|{הַמָּרָק} חַם מְאֹד.|The soup is very hot.
n:סלט|הֵכַנְתִּי {סָלָט} יְרָקוֹת.|I made a vegetable salad.
n:עוגה|אִמָּא אָפְתָה {עוּגָה}.|Mom baked a cake.
n:פרי|אֵיזֶה {פְּרִי} אַתָּה הֲכִי אוֹהֵב?|Which fruit do you like best?
n:ירק|צָרִיךְ לֶאֱכֹל הַרְבֵּה {יְרָקוֹת}.|You should eat lots of vegetables.
n:תפוח|{הַתַּפּוּחַ} הַזֶּה מָתוֹק.|This apple is sweet.
n:תפוז|אֲנִי שׁוֹתֶה מִיץ {תַּפּוּזִים}.|I'm drinking orange juice.
n:בננה|הַקּוֹף אוֹכֵל {בָּנָנָה}.|The monkey is eating a banana.
n:עגבנייה|חָתַכְתִּי {עֲגַבְנִיָּה} לַסָּלָט.|I cut a tomato for the salad.
n:מלפפון|אֲנִי אוֹהֵב {מְלָפְפוֹן} עִם מֶלַח.|I like cucumber with salt.
n:אורז|אָכַלְנוּ {אֹרֶז} עִם עוֹף.|We ate rice with chicken.
n:סוכר|אַתָּה שׁוֹתֶה קָפֶה עִם {סֻכָּר}?|Do you take your coffee with sugar?
n:מלח|חָסֵר {מֶלַח} בַּמָּרָק.|The soup needs salt.
n:שמן|צָרִיךְ קְצָת {שֶׁמֶן} לַמַּחֲבַת.|You need a little oil for the pan.
n:כוס|תֵּן לִי {כּוֹס} מַיִם, בְּבַקָּשָׁה.|Give me a glass of water, please.
n:צלחת|שִׂים אֶת {הַצַּלַּחַת} עַל הַשֻּׁלְחָן.|Put the plate on the table.
n:מזלג|אֲנִי צָרִיךְ {מַזְלֵג} וְסַכִּין.|I need a fork and a knife.
n:כף|אֵין לִי {כַּף} לַמָּרָק.|I don't have a spoon for the soup.
n:סכין|{הַסַּכִּין} הַזֹּאת חַדָּה מְאֹד.|This knife is very sharp.
n:בגד|קָנִיתִי {בְּגָדִים} חֲדָשִׁים.|I bought new clothes.
n:חולצה|הוּא לוֹבֵשׁ {חֻלְצָה} לְבָנָה.|He's wearing a white shirt.
n:מכנסיים|{הַמִּכְנָסַיִם} הָאֵלֶּה קְצָרִים לִי.|These trousers are too short for me.
n:נעל|אֵיפֹה {הַנַּעֲלַיִם} שֶׁלִּי?|Where are my shoes?
n:כובע|בַּקַּיִץ צָרִיךְ {כּוֹבַע}.|In the summer you need a hat.
n:משקפיים|אֲנִי לֹא רוֹאֶה בְּלִי {מִשְׁקָפַיִם}.|I can't see without glasses.
n:ראש|יֵשׁ לִי כְּאֵב {רֹאשׁ}.|I have a headache.
n:לב|יֵשׁ לוֹ {לֵב} טוֹב.|He has a good heart.
n:גוף|סְפּוֹרְט טוֹב {לַגּוּף}.|Sport is good for the body.
n:פה|סְגֹר אֶת {הַפֶּה} כְּשֶׁאַתָּה לוֹעֵס.|Close your mouth when you chew.
n:יד|תֵּן לִי {יָד}.|Give me your hand.
n:רגל|כּוֹאֶבֶת לִי {הָרֶגֶל}.|My leg hurts.
n:עין|יֵשׁ לָהּ {עֵינַיִם} כְּחֻלּוֹת.|She has blue eyes.
n:אוזן|{הָאֹזֶן} שֶׁלִּי כּוֹאֶבֶת.|My ear hurts.
n:שן|צָרִיךְ לְצַחְצֵחַ {שִׁנַּיִם} פַּעֲמַיִם בַּיּוֹם.|You should brush your teeth twice a day.
n:אצבע|הוּא חָתַךְ אֶת {הָאֶצְבַּע}.|He cut his finger.
n:בטן|כּוֹאֶבֶת לִי {הַבֶּטֶן}.|My stomach hurts.
n:גב|יֵשׁ לִי כְּאֵבִים {בַּגַּב}.|I have back pain.
n:שיער|יֵשׁ לָהּ {שֵׂעָר} אָרֹךְ.|She has long hair.
n:נפש|הִיא חֲבֵרַת {נֶפֶשׁ}.|She's a soulmate.
n:כסף|אֵין לִי {כֶּסֶף}.|I don't have any money.
n:זהב|זֹאת טַבַּעַת {זָהָב}.|This is a gold ring.
n:שם|מָה {הַשֵּׁם} שֶׁלְּךָ?|What's your name?
n:מכונית|יֵשׁ לָנוּ {מְכוֹנִית} חֲדָשָׁה.|We have a new car.
n:אוטובוס|אֲנִי נוֹסֵעַ לָעֲבוֹדָה {בָּאוֹטוֹבּוּס}.|I go to work by bus.
n:רכבת|{הָרַכֶּבֶת} מַגִּיעָה בְּעוֹד עֶשֶׂר דַּקּוֹת.|The train arrives in ten minutes.
n:מטוס|{הַמָּטוֹס} נָחַת בַּזְּמַן.|The plane landed on time.
n:אופניים|אֲנִי רוֹכֵב עַל {אוֹפַנַּיִם}.|I ride a bicycle.
n:מכונה|{הַמְּכוֹנָה} הַזֹּאת לֹא עוֹבֶדֶת.|This machine doesn't work.
n:חשמל|אֵין {חַשְׁמַל} בַּבִּנְיָן.|There's no electricity in the building.
n:שיר|הִיא שָׁרָה {שִׁיר} יָפֶה.|She's singing a beautiful song.
n:מוזיקה|אֲנִי אוֹהֵב {מוּזִיקָה} יִשְׂרְאֵלִית.|I love Israeli music.
n:סרט|רָאִינוּ {סֶרֶט} מַצְחִיק.|We saw a funny movie.
n:משחק|{הַמִּשְׂחָק} מַתְחִיל בִּשְׁמוֹנֶה.|The game starts at eight.
n:כדור|הַ·יֶּלֶד זָרַק אֶת {הַכַּדּוּר}.|The boy threw the ball.
n:מתנה|קִבַּלְתִּי {מַתָּנָה} לְיוֹם הַהֻלֶּדֶת.|I got a birthday present.
n:חג|{חַג} שָׂמֵחַ!|Happy holiday!
n:שבת|{שַׁבָּת} שָׁלוֹם!|Shabbat shalom!
n:מלחמה|סַבָּא נִלְחַם {בַּמִּלְחָמָה}.|Grandpa fought in the war.
n:שלום|{שָׁלוֹם}, מָה שְׁלוֹמְךָ?|Hello, how are you?
n:צבא|אָחִי מְשָׁרֵת {בַּצָּבָא}.|My brother serves in the army.
n:דגל|{הַדֶּגֶל} כָּחֹל וְלָבָן.|The flag is blue and white.
n:אהבה|{אַהֲבָה} הִיא הַדָּבָר הֲכִי חָשׁוּב.|Love is the most important thing.
n:חיים|{הַחַיִּים} יָפִים.|Life is beautiful.
n:חוכמה|{חׇכְמָה} חֲשׁוּבָה יוֹתֵר מִ·כֶּסֶף.|Wisdom matters more than money.
n:כוח|אֵין לִי {כּוֹחַ} הַיּוֹם.|I have no energy today.
n:בריאות|{בְּרִיאוּת} זֶה הַכֹּל.|Health is everything.
n:עזרה|אַתָּה צָרִיךְ {עֶזְרָה}?|Do you need help?
n:תודה|{תּוֹדָה} רַבָּה!|Thank you very much!

a:גדול|יֵשׁ לָנוּ בַּיִת {גָּדוֹל}.|We have a big house.
a:קטן|הַכֶּלֶב שֶׁלָּנוּ {קָטָן}.|Our dog is small.
a:טוב|זֶה רַעְיוֹן {טוֹב}.|That's a good idea.
a:רע|הָיָה לִי יוֹם {רַע}.|I had a bad day.
a:יפה|אֵיזֶה נוֹף {יָפֶה}!|What a beautiful view!
a:מכוער|הַבִּנְיָן הַזֶּה {מְכֹעָר}.|This building is ugly.
a:חדש|קָנִיתִי טֶלֶפוֹן {חָדָשׁ}.|I bought a new phone.
a:ישן|זֹאת מְכוֹנִית {יְשָׁנָה}.|That's an old car.
a:זקן|הָאִישׁ {הַזָּקֵן} יוֹשֵׁב בַּפַּארְק.|The old man is sitting in the park.
a:צעיר|הִיא {צְעִירָה} מְאֹד.|She's very young.
a:חכם|הוּא אִישׁ {חָכָם}.|He's a wise man.
a:טיפש|אַל תִּהְיֶה {טִפֵּשׁ}!|Don't be stupid!
a:שמח|אֲנִי {שָׂמֵחַ} לִרְאוֹת אוֹתְךָ.|I'm happy to see you.
a:עצוב|לָמָּה אַתָּה {עָצוּב}?|Why are you sad?
a:חם|הַיּוֹם {חַם} מְאֹד.|It's very hot today.
a:קר|בַּחוּץ {קַר}.|It's cold outside.
a:ארוך|זֶה הָיָה יוֹם {אָרֹךְ}.|It was a long day.
a:קצר|הַסֶּרֶט {קָצָר}.|The movie is short.
a:גבוה|הַבִּנְיָן הַזֶּה {גָּבוֹהַּ} מְאֹד.|This building is very tall.
a:נמוך|הַשֻּׁלְחָן {נָמוּךְ}.|The table is low.
a:כבד|הַתִּיק הַזֶּה {כָּבֵד}.|This bag is heavy.
a:קל|הַמִּבְחָן הָיָה {קַל}.|The test was easy.
a:קשה|עִבְרִית הִיא שָׂפָה {קָשָׁה}?|Is Hebrew a hard language?
a:מהיר|זֹאת מְכוֹנִית {מְהִירָה}.|That's a fast car.
a:איטי|הָאִינְטֶרְנֶט {אִטִּי} הַיּוֹם.|The internet is slow today.
a:עשיר|הוּא אִישׁ {עָשִׁיר}.|He's a rich man.
a:עני|הֵם גָּרִים בִּשְׁכוּנָה {עֲנִיָּה}.|They live in a poor neighborhood.
a:חזק|הוּא {חָזָק} מְאֹד.|He's very strong.
a:חלש|אֲנִי מַרְגִּישׁ {חַלָּשׁ}.|I feel weak.
a:נקי|הַחֶדֶר {נָקִי}.|The room is clean.
a:מלוכלך|הַבְּגָדִים {מְלֻכְלָכִים}.|The clothes are dirty.
a:יקר|הַמִּסְעָדָה הַזֹּאת {יְקָרָה}.|This restaurant is expensive.
a:זול|הָאֹכֶל בַּשּׁוּק {זוֹל}.|The food at the market is cheap.
a:מלא|הָאוֹטוֹבּוּס {מָלֵא}.|The bus is full.
a:ריק|הַבַּקְבּוּק {רֵיק}.|The bottle is empty.
a:פתוח|הַחֲנוּת {פְּתוּחָה} עַד שְׁמוֹנֶה.|The shop is open until eight.
a:סגור|הַדֶּלֶת {סְגוּרָה}.|The door is closed.
a:חשוב|זֶה {חָשׁוּב} מְאֹד.|This is very important.
a:מעניין|קָרָאתִי סֵפֶר {מְעַנְיֵן}.|I read an interesting book.
a:משעמם|הַשִּׁעוּר הָיָה {מְשַׁעֲמֵם}.|The lesson was boring.
a:טעים|הָאֹכֶל {טָעִים}!|The food is tasty!
a:מתוק|הָעוּגָה {מְתוּקָה} מְאֹד.|The cake is very sweet.
a:מר|הַקָּפֶה {מַר}.|The coffee is bitter.
a:חמוץ|הַלִּימוֹן {חָמוּץ}.|The lemon is sour.
a:רעב|אֲנִי {רָעֵב}!|I'm hungry!
a:צמא|הַיְלָדִים {צְמֵאִים}.|The children are thirsty.
a:עייף|אֲנִי {עָיֵף} מְאֹד הַיּוֹם.|I'm very tired today.
a:חולה|הִיא {חוֹלָה} וְנִשְׁאֲרָה בַּבַּיִת.|She's sick and stayed home.
a:בריא|אֹכֶל {בָּרִיא} חָשׁוּב.|Healthy food is important.
a:נחמד|הַשְּׁכֵנִים שֶׁלָּנוּ {נֶחְמָדִים}.|Our neighbors are nice.
a:נעים|{נָעִים} מְאֹד!|Nice to meet you!
a:חמוד|אֵיזֶה כֶּלֶב {חָמוּד}!|What a cute dog!
a:שקט|הָרְחוֹב שֶׁלָּנוּ {שָׁקֵט}.|Our street is quiet.
a:קרוב|הַתַּחֲנָה {קְרוֹבָה}.|The station is close by.
a:רחוק|זֶה {רָחוֹק} מִ·כָּאן?|Is it far from here?
a:רחב|זֶה כְּבִישׁ {רָחָב}.|It's a wide road.
a:צר|הָרְחוֹב {צַר}.|The street is narrow.
a:עמוק|הַ·יָּם פֹּה {עָמֹק}.|The sea is deep here.
a:עגול|הַשֻּׁלְחָן {עָגֹל}.|The table is round.
a:ישר|לֵךְ {יָשָׁר}.|Go straight ahead.
a:נכון|זֶה {נָכוֹן}.|That's right.
a:ראשון|זֹאת הַפַּעַם {הָרִאשׁוֹנָה} שֶׁלִּי בְּ·יִשְׂרָאֵל.|This is my first time in Israel.
a:אחרון|זֶה הָאוֹטוֹבּוּס {הָאַחֲרוֹן}.|This is the last bus.
a:אחר|יֵשׁ לָךְ צֶבַע {אַחֵר}?|Do you have another color?
a:אדום|הִיא לוֹבֶשֶׁת שִׂמְלָה {אֲדֻמָּה}.|She's wearing a red dress.
a:כחול|הַשָּׁמַיִם {כְּחֻלִּים}.|The sky is blue.
a:ירוק|הַדֶּשֶׁא {יָרֹק}.|The grass is green.
a:צהוב|הַמּוֹנִית {צְהֻבָּה}.|The taxi is yellow.
a:לבן|יֵשׁ לִי חֻלְצָה {לְבָנָה}.|I have a white shirt.
a:שחור|הֶחָתוּל {שָׁחֹר}.|The cat is black.
a:ורוד|הִיא קָנְתָה תִּיק {וָרֹד}.|She bought a pink bag.
a:סגול|אֲנִי אוֹהֵב פְּרָחִים {סְגֻלִּים}.|I love purple flowers.
a:חום|יֵשׁ לוֹ עֵינַיִם {חוּמוֹת}.|He has brown eyes.
a:אפור|הַשָּׁמַיִם {אֲפֹרִים} הַיּוֹם.|The sky is gray today.
a:כתום|הַתַּפּוּז {כָּתֹם}.|The orange is orange.
a:ישראלי|הוּא {יִשְׂרְאֵלִי}.|He's Israeli.
a:אמריקאי|הִיא {אֲמֶרִיקָאִית}.|She's American.
a:מיוחד|זֶה יוֹם {מְיֻחָד}.|It's a special day.
a:מפורסם|הוּא שַׂחְקָן {מְפֻרְסָם}.|He's a famous actor.
a:מסוכן|זֶה {מְסֻכָּן}!|That's dangerous!
a:פשוט|זֶה {פָּשׁוּט} מְאֹד.|It's very simple.
a:מסובך|הַמַּצָּב {מְסֻבָּךְ}.|The situation is complicated.
a:מצחיק|הוּא {מַצְחִיק} מְאֹד.|He's very funny.
a:אהוב|זֶה הַסֵּפֶר {הָאָהוּב} עָלַי.|This is my favorite book.
a:מוכן|אַתָּה {מוּכָן}?|Are you ready?
a:עסוק|אֲנִי {עָסוּק} עַכְשָׁיו.|I'm busy right now.
a:פנוי|הַמָּקוֹם הַזֶּה {פָּנוּי}?|Is this seat free?
a:שמן|הֶחָתוּל שֶׁלָּנוּ {שָׁמֵן}.|Our cat is fat.
a:רזה|הִיא {רָזָה} מְאֹד.|She's very thin.
a:מצוין|{מְצֻיָּן}!|Excellent!

v:כתב:paal|הִיא {כָּתְבָה} מִכְתָּב לְסָבְתָא.|She wrote a letter to Grandma.
v:קרא:paal|אֲנִי {קוֹרֵא} סֵפֶר כָּל עֶרֶב.|I read a book every evening.
v:למד:paal|אֲנִי {לוֹמֵד} עִבְרִית.|I'm learning Hebrew.
v:שמר:paal|הַכֶּלֶב {שׁוֹמֵר} עַל הַבַּיִת.|The dog guards the house.
v:סגר:paal|{סָגַרְתִּי} אֶת הַחַלּוֹן.|I closed the window.
v:פתח:paal|מָתַי {פּוֹתְחִים} אֶת הַחֲנוּת?|When does the shop open?
v:שמע:paal|{שָׁמַעְתָּ} אֶת הַחֲדָשׁוֹת?|Did you hear the news?
v:אכל:paal|מָה {אָכַלְתָּ} לַאֲרוּחַת בֹּקֶר?|What did you have for breakfast?
v:אמר:paal|מָה הוּא {אָמַר}?|What did he say?
v:שתה:paal|אֲנִי {שׁוֹתֶה} קָפֶה בַּבֹּקֶר.|I drink coffee in the morning.
v:הלך:paal|{הָלַכְנוּ} לַ·יָּם.|We went to the beach.
v:ישב:paal|{שֵׁב}, בְּבַקָּשָׁה.|Sit down, please.
v:ידע:paal|אֲנִי לֹא {יוֹדֵעַ}.|I don't know.
v:ירד:paal|{יָרַדְנוּ} בַּמַּדְרֵגוֹת.|We went down the stairs.
v:ישן:paal|הַתִּינוֹק {יָשֵׁן}.|The baby is sleeping.
v:עמד:paal|{עָמַדְנוּ} בַּתּוֹר חֲצִי שָׁעָה.|We stood in line for half an hour.
v:עבד:paal|אֵיפֹה אַתָּה {עוֹבֵד}?|Where do you work?
v:חשב:paal|{חָשַׁבְתִּי} עָלֶיךָ.|I was thinking about you.
v:אהב:paal|אֲנִי {אוֹהֵב} אוֹתָךְ.|I love you.
v:שאל:paal|הוּא {שָׁאַל} שְׁאֵלָה טוֹבָה.|He asked a good question.
v:ענה:paal|הִיא לֹא {עָנְתָה} לַטֶּלֶפוֹן.|She didn't answer the phone.
v:ראה:paal|{רָאִיתָ} אֶת הַסֶּרֶט הַזֶּה?|Have you seen this movie?
v:קנה:paal|מָה {קָנִית} בַּשּׁוּק?|What did you buy at the market?
v:בנה:paal|הֵם {בּוֹנִים} בַּיִת חָדָשׁ.|They're building a new house.
v:רצה:paal|מָה אַתָּה {רוֹצֶה} לִשְׁתּוֹת?|What do you want to drink?
v:עשה:paal|מָה אַתֶּם {עוֹשִׂים} הָעֶרֶב?|What are you doing tonight?
v:בכה:paal|הַתִּינוֹק {בּוֹכֶה}.|The baby is crying.
v:שחה:paal|אֲנִי {שׂוֹחֶה} בַּבְּרֵכָה כָּל בֹּקֶר.|I swim in the pool every morning.
v:זכה:paal|הַקְּבוּצָה שֶׁלָּנוּ {זָכְתָה}!|Our team won!
v:מצא:paal|{מָצָאתִי} אֶת הַמַּפְתְּחוֹת!|I found the keys!
v:נתן:paal|{תֵּן} לִי אֶת הַסֵּפֶר.|Give me the book.
v:לקח:paal|מִי {לָקַח} אֶת הָעֵט שֶׁלִּי?|Who took my pen?
v:נסע:paal|מָחָר אֲנַחְנוּ {נוֹסְעִים} לְאֵילַת.|Tomorrow we're going to Eilat.
v:נגע:paal|אַל {תִּגַּע} בַּזֶּה!|Don't touch that!
v:נפל:paal|הַכּוֹס {נָפְלָה} עַל הָרִצְפָּה.|The glass fell on the floor.
v:קום:paal|אֲנִי {קָם} כָּל יוֹם בְּשֵׁשׁ.|I get up at six every day.
v:שים:paal|{שִׂים} אֶת זֶה עַל הַשֻּׁלְחָן.|Put that on the table.
v:רוץ:paal|הִיא {רָצָה} כָּל בֹּקֶר בַּפַּארְק.|She runs in the park every morning.
v:שיר:paal|{שַׁרְנוּ} שִׁירִים כָּל הַלַּיְלָה.|We sang songs all night.
v:גור:paal|אֵיפֹה אַתָּה {גָּר}?|Where do you live?
v:שוב:paal|הוּא {שָׁב} הַבַּיְתָה מְאֻחָר.|He came back home late.
v:טוס:paal|מָחָר אֲנִי {טָס} לְלוֹנְדּוֹן.|Tomorrow I'm flying to London.
v:זוז:paal|{זוּז}, בְּבַקָּשָׁה!|Move, please!
v:עוף:paal|הַצִּפּוֹר {עָפָה} גָּבוֹהַּ.|The bird flew high.
v:נוח:paal|אֲנִי צָרִיךְ {לָנוּחַ} קְצָת.|I need to rest a little.
v:פגש:paal|{פָּגַשְׁתִּי} אֶת דָּנָה בָּרְחוֹב.|I met Dana in the street.
v:זכר:paal|אַתָּה {זוֹכֵר} אוֹתִי?|Do you remember me?
v:שכח:paal|{שָׁכַחְתִּי} אֶת הַטֶּלֶפוֹן בַּבַּיִת.|I forgot my phone at home.
v:סלח:paal|{סְלַח} לִי!|Excuse me! (literally: forgive me)
v:שלח:paal|{שָׁלַחְתִּי} לְךָ הוֹדָעָה.|I sent you a message.
v:לבש:paal|מָה {לָבַשְׁתְּ} לַמְּסִבָּה?|What did you wear to the party?
v:רקד:paal|הֵם {רָקְדוּ} כָּל הַלַּיְלָה.|They danced all night.
v:צחק:paal|כֻּלָּם {צָחֲקוּ}.|Everyone laughed.
v:חזר:paal|מָתַי {תַּחֲזֹר} הַבַּיְתָה?|When will you come back home?
v:עזר:paal|אֶפְשָׁר {לַעֲזֹר} לְךָ?|Can I help you?
v:עזב:paal|הוּא {עָזַב} אֶת הָעֲבוֹדָה.|He left his job.
v:גמר:paal|{גָּמַרְתָּ} אֶת שִׁעוּרֵי הַבַּיִת?|Did you finish your homework?
v:שבר:paal|מִי {שָׁבַר} אֶת הַחַלּוֹן?|Who broke the window?
v:חלם:paal|{חָלַמְתִּי} חֲלוֹם מוּזָר.|I had a strange dream.
v:כעס:paal|אַל {תִּכְעַס}.|Don't be angry.
v:רחץ:paal|{רָחַצְתִּי} אֶת הַ·יָּדַיִם.|I washed my hands.
v:פחד:paal|הַ·יֶּלֶד {פּוֹחֵד} מִ·כְּלָבִים.|The boy is afraid of dogs.
v:גדל:paal|{גָּדַלְתִּי} בְּחֵיפָה.|I grew up in Haifa.
v:טעם:paal|{טָעַמְתָּ} אֶת הָעוּגָה?|Did you taste the cake?
v:שכב:paal|הוּא {שׁוֹכֵב} עַל הַסַּפָּה.|He's lying on the sofa.
v:רכב:paal|הִיא {רוֹכֶבֶת} עַל אוֹפַנַּיִם.|She rides a bike.
v:זרק:paal|{זְרֹק} לִי אֶת הַכַּדּוּר!|Throw me the ball!
v:מכר:paal|הֵם {מָכְרוּ} אֶת הַדִּירָה.|They sold the apartment.
v:שפך:paal|{שָׁפַכְתִּי} קָפֶה עַל הַחֻלְצָה.|I spilled coffee on my shirt.
v:תפס:paal|הֶחָתוּל {תָּפַס} עַכְבָּר.|The cat caught a mouse.
v:בחר:paal|{בָּחַרְתָּ} כְּבָר?|Have you chosen yet?
v:ספר:paal|הַ·יֶּלֶד {סוֹפֵר} עַד עֶשֶׂר.|The boy is counting to ten.
v:ברח:paal|הַכֶּלֶב {בָּרַח}.|The dog ran away.
v:צעק:paal|לָמָּה אַתָּה {צוֹעֵק}?|Why are you shouting?
v:קפץ:paal|הֶחָתוּל {קָפַץ} עַל הַשֻּׁלְחָן.|The cat jumped on the table.
v:פגע:paal|הַכַּדּוּר {פָּגַע} בַּחַלּוֹן.|The ball hit the window.
v:חתך:paal|{חָתַכְתִּי} אֶת הָאֶצְבַּע.|I cut my finger.
v:הפך:paal|{הֲפֹךְ} אֶת הַדַּף.|Turn the page over.
v:אסף:paal|הַיְלָדִים {אָסְפוּ} צְדָפִים בַּחוֹף.|The kids collected shells on the beach.
v:בדק:paal|הָרוֹפֵא {בָּדַק} אוֹתִי.|The doctor examined me.
v:היה:paal|{הָיִיתִי} בְּ·יִשְׂרָאֵל בַּשָּׁנָה שֶׁעָבְרָה.|I was in Israel last year.
v:יכל:paal|אַתָּה {יָכוֹל} לַעֲזֹר לִי?|Can you help me?
v:בוא:paal|{בּוֹא} הֵנָּה!|Come here!
v:יצא:paal|הִיא {יָצְאָה} מֵהַבַּיִת בְּשֶׁבַע.|She left the house at seven.
v:כנס:nifal|{נִכְנַסְנוּ} לַחֲנוּת.|We went into the shop.
v:שאר:nifal|{נִשְׁאַרְתִּי} בַּבַּיִת כָּל הַיּוֹם.|I stayed home all day.
v:פגש:nifal|{נִפָּגֵשׁ} מָחָר?|Shall we meet tomorrow?
v:ילד:nifal|{נוֹלַדְתִּי} בְּתֵל אָבִיב.|I was born in Tel Aviv.
v:מצא:nifal|אֵיפֹה {נִמְצָא} הַבַּנְק?|Where is the bank?
v:רדם:nifal|{נִרְדַּמְתִּי} מוּל הַטֵּלֵוִיזְיָה.|I fell asleep in front of the TV.
v:בהל:nifal|אַל {תִּבָּהֵל}.|Don't be scared.
v:שבר:nifal|הַכּוֹס {נִשְׁבְּרָה}.|The glass broke.
v:גמר:nifal|הֶחָלָב {נִגְמַר}.|We're out of milk. (The milk ran out.)
v:סגר:nifal|הַדֶּלֶת {נִסְגְּרָה}.|The door closed.
v:פתח:nifal|הַתַּעֲרוּכָה {נִפְתְּחָה} אֶתְמוֹל.|The exhibition opened yesterday.
v:זכר:nifal|פִּתְאוֹם {נִזְכַּרְתִּי} בַּפְּגִישָׁה.|Suddenly I remembered the meeting.
v:לחם:nifal|הֵם {נִלְחֲמוּ} עַל הָאָרֶץ.|They fought for the country.
v:הנה:nifal|{נֶהֱנֵיתִי} מְאֹד בַּמְּסִבָּה.|I really enjoyed the party.
v:עלם:nifal|הַכֶּלֶב {נֶעֱלַם}.|The dog disappeared.
v:ראה:nifal|אַתָּה {נִרְאֶה} עָיֵף.|You look tired.
v:בנה:nifal|הַבִּנְיָן {נִבְנָה} לִפְנֵי מֵאָה שָׁנָה.|The building was built a hundred years ago.
v:שמע:nifal|זֶה {נִשְׁמָע} טוֹב!|That sounds good!
v:כשל:nifal|הוּא {נִכְשַׁל} בַּמִּבְחָן.|He failed the test.
v:חשב:nifal|הוּא {נֶחְשָׁב} לְמוּמְחֶה.|He's considered an expert.
v:דבר:piel|אַתָּה {מְדַבֵּר} עִבְרִית?|Do you speak Hebrew?
v:ספר:piel|{סַפֵּר} לִי מָה קָרָה.|Tell me what happened.
v:בקש:piel|{בִּקַּשְׁתִּי} מִ·מֶּנּוּ עֶזְרָה.|I asked him for help.
v:שלם:piel|כַּמָּה {שִׁלַּמְתָּ}?|How much did you pay?
v:חפש:piel|מָה אַתָּה {מְחַפֵּשׂ}?|What are you looking for?
v:למד:piel|הִיא {מְלַמֶּדֶת} מָתֵמָטִיקָה.|She teaches math.
v:טיל:piel|{טִיַּלְנוּ} בַּגָּלִיל.|We toured the Galilee.
v:קבל:piel|{קִבַּלְתָּ} אֶת הַהוֹדָעָה שֶׁלִּי?|Did you get my message?
v:נקה:piel|צָרִיךְ {לְנַקּוֹת} אֶת הַבַּיִת.|We need to clean the house.
v:שנה:piel|הוּא {שִׁנָּה} אֶת הַתׇּכְנִית.|He changed the plan.
v:נסה:piel|{נַסֵּה} שׁוּב.|Try again.
v:חכה:piel|{חַכֵּה} לִי!|Wait for me!
v:קוה:piel|אֲנִי {מְקַוֶּה} שֶׁתָּבוֹא.|I hope you'll come.
v:בשל:piel|אַבָּא {מְבַשֵּׁל} אֲרוּחַת עֶרֶב.|Dad is cooking dinner.
v:סדר:piel|{סַדֵּר} אֶת הַחֶדֶר שֶׁלְּךָ.|Tidy up your room.
v:צלם:piel|מִי {צִלֵּם} אֶת הַתְּמוּנָה הַזֹּאת?|Who took this picture?
v:נהל:piel|הִיא {מְנַהֶלֶת} חֶבְרָה גְּדוֹלָה.|She runs a big company.
v:ברך:piel|{בֵּרַכְנוּ} אוֹתוֹ לְיוֹם הַהֻלֶּדֶת.|We wished him a happy birthday.
v:שחק:piel|הַיְלָדִים {מְשַׂחֲקִים} בַּחוּץ.|The children are playing outside.
v:ציר:piel|הִיא {מְצַיֶּרֶת} יָפֶה מְאֹד.|She draws very well.
v:כבס:piel|{כִּבַּסְתִּי} אֶת הַבְּגָדִים.|I did the laundry.
v:עשן:piel|אָסוּר {לְעַשֵּׁן} כָּאן.|No smoking here.
v:נגן:piel|הוּא {מְנַגֵּן} בְּגִיטָרָה.|He plays the guitar.
v:בקר:piel|{בִּקַּרְנוּ} אֶת סַבָּא וְסָבְתָא.|We visited Grandpa and Grandma.
v:גדל:piel|הֵם {גִּדְּלוּ} שְׁלוֹשָׁה יְלָדִים.|They raised three children.
v:חבק:piel|{חַבֵּק} אוֹתִי!|Hug me!
v:נשק:piel|הִיא {נִשְּׁקָה} אוֹתוֹ.|She kissed him.
v:סים:piel|{סִיַּמְתִּי} אֶת הָעֲבוֹדָה.|I finished the work.
v:תקן:piel|הַטֶּכְנַאי {תִּקֵּן} אֶת הַמַּזְגָן.|The technician fixed the air conditioner.
v:בטל:piel|{בִּטַּלְנוּ} אֶת הַפְּגִישָׁה.|We canceled the meeting.
v:שקר:piel|הוּא {שִׁקֵּר} לִי.|He lied to me.
v:כבד:piel|צָרִיךְ {לְכַבֵּד} אֶת הַהוֹרִים.|You should respect your parents.
v:טלפן:piel|{טִלְפַּנְתִּי} אֵלֶיךָ אֶתְמוֹל.|I called you yesterday.
v:תרגם:piel|אַתָּה יָכוֹל {לְתַרְגֵּם} אֶת זֶה?|Can you translate this?
v:לכלך:piel|מִי {לִכְלֵךְ} אֶת הָרִצְפָּה?|Who got the floor dirty?
v:צלצל:piel|הַטֶּלֶפוֹן {מְצַלְצֵל}.|The phone is ringing.
v:ארגן:piel|הִיא {אִרְגְּנָה} אֶת הַמְּסִבָּה.|She organized the party.
v:ספר:pual|{סֻפַּר} לִי שֶׁאַתָּה עוֹבֵר דִּירָה.|I was told you're moving.
v:בשל:pual|הַבָּשָׂר {מְבֻשָּׁל} הֵיטֵב.|The meat is well cooked.
v:תקן:pual|הַמְּכוֹנִית {תֻּקְּנָה}.|The car was fixed.
v:צלם:pual|הַטֶּקֶס {צֻלַּם}.|The ceremony was filmed.
v:קבל:pual|זֶה מִנְהָג {מְקֻבָּל}.|It's an accepted custom.
v:ארגן:pual|הַטִּיּוּל {אֻרְגַּן} הֵיטֵב.|The trip was well organized.
v:בין:hifil|אֲנִי לֹא {מֵבִין}.|I don't understand.
v:כון:hifil|אִמָּא {הֵכִינָה} אֲרוּחַת עֶרֶב.|Mom made dinner.
v:קום:hifil|הֵם {הֵקִימוּ} חֶבְרָה חֲדָשָׁה.|They founded a new company.
v:רום:hifil|{הָרֵם} אֶת הַ·יָּד.|Raise your hand.
v:עור:hifil|{הָעֵר} אוֹתִי בְּשֶׁבַע.|Wake me up at seven.
v:זמן:hifil|{הִזְמַנְתִּי} פִּיצָה.|I ordered a pizza.
v:סבר:hifil|הַמּוֹרָה {הִסְבִּירָה} אֶת הַחֹמֶר.|The teacher explained the material.
v:רגש:hifil|אֵיךְ אַתָּה {מַרְגִּישׁ}?|How do you feel?
v:תחל:hifil|הַסֶּרֶט {הִתְחִיל}.|The movie has started.
v:פסק:hifil|{תַּפְסִיק}!|Stop it!
v:צלח:hifil|{הִצְלַחְתִּי}!|I did it! (I succeeded!)
v:משך:hifil|{תַּמְשִׁיךְ}.|Go on.
v:לבש:hifil|הִיא {הִלְבִּישָׁה} אֶת הַתִּינוֹק.|She dressed the baby.
v:חלט:hifil|{הֶחְלַטְנוּ} לַעֲבֹר דִּירָה.|We decided to move.
v:עבר:hifil|{תַּעֲבִיר} לִי אֶת הַמֶּלַח, בְּבַקָּשָׁה.|Pass me the salt, please.
v:שאר:hifil|{הִשְׁאַרְתִּי} לְךָ הוֹדָעָה.|I left you a message.
v:ירד:hifil|{תּוֹרִיד} אֶת הַנַּעֲלַיִם.|Take off your shoes.
v:ידע:hifil|הֵם {הוֹדִיעוּ} עַל הַחֲתֻנָּה.|They announced the wedding.
v:יצא:hifil|{הוֹצֵאתִי} כֶּסֶף מֵהַכַּסְפּוֹמָט.|I took money out of the ATM.
v:יסף:hifil|{תּוֹסִיף} קְצָת מֶלַח.|Add a little salt.
v:יבל:hifil|הַדֶּרֶךְ הַזֹּאת {מוֹבִילָה} לַ·יָּם.|This road leads to the sea.
v:יכח:hifil|{תּוֹכִיחַ}!|Prove it!
v:זכר:hifil|{תַּזְכִּיר} לִי מָחָר.|Remind me tomorrow.
v:סכם:hifil|אֲנִי {מַסְכִּים} אִתְּךָ.|I agree with you.
v:נגע:hifil|מָתַי {הִגַּעְתָּ}?|When did you arrive?
v:נכר:hifil|אֲנִי {מַכִּיר} אוֹתוֹ.|I know him.
v:יצע:hifil|הוּא {הִצִּיעַ} לִי עֲבוֹדָה.|He offered me a job.
v:נפל:hifil|{הִפַּלְתִּי} אֶת הַכּוֹס.|I dropped the glass.
v:נבט:hifil|הִיא {הִבִּיטָה} בַּחַלּוֹן.|She looked out the window.
v:נגד:hifil|{תַּגִּיד} לִי אֶת הָאֱמֶת.|Tell me the truth.
v:דלק:hifil|{הַדְלֵק} אֶת הָאוֹר.|Turn on the light.
v:כנס:hifil|{הִכְנַסְתִּי} אֶת הָאֹכֶל לַמְּקָרֵר.|I put the food in the fridge.
v:רשה:hifil|אִמָּא לֹא {מַרְשָׁה} לִי.|Mom won't let me.
v:פתע:hifil|{הִפְתַּעְתָּ} אוֹתִי!|You surprised me!
v:חזק:hifil|{תַּחֲזִיק} אֶת זֶה רֶגַע.|Hold this for a moment.
v:בטח:hifil|אֲנִי {מַבְטִיחַ}.|I promise.
v:קשב:hifil|{תַּקְשִׁיב} לִי.|Listen to me.
v:צבע:hifil|בְּעַד מִי {הִצְבַּעְתָּ}?|Who did you vote for?
v:מלץ:hifil|אֲנִי {מַמְלִיץ} עַל הַמִּסְעָדָה הַזֹּאת.|I recommend this restaurant.
v:דפס:hifil|{הִדְפַּסְתִּי} אֶת הַכַּרְטִיסִים.|I printed the tickets.
v:בוא:hifil|{הֵבֵאתִי} לְךָ מַתָּנָה.|I brought you a present.
v:זמן:hufal|{הֻזְמַנְתִּי} לַחֲתֻנָּה.|I was invited to a wedding.
v:כון:hufal|הַכֹּל {מוּכָן}?|Is everything ready?
v:חלט:hufal|עוֹד לֹא {הׇחְלַט}.|It hasn't been decided yet.
v:ירד:hufal|הַמְּחִירִים {הוּרְדוּ}.|The prices were lowered.
v:דפס:hufal|הַסֵּפֶר {הֻדְפַּס} מֵחָדָשׁ.|The book was reprinted.
v:סבר:hufal|הַכְּלָלִים {הֻסְבְּרוּ} בַּשִּׁעוּר.|The rules were explained in class.
v:לבש:hitpael|{תִּתְלַבֵּשׁ} מַהֵר, אֲנַחְנוּ מְאַחֲרִים.|Get dressed quickly, we're late.
v:רחץ:hitpael|הַ·יֶּלֶד {הִתְרַחֵץ} בָּאַמְבַּטְיָה.|The boy took a bath.
v:קשר:hitpael|{תִּתְקַשֵּׁר} אֵלַי מָחָר.|Call me tomorrow.
v:סכל:hitpael|{תִּסְתַּכֵּל} עָלַי.|Look at me.
v:שמש:hitpael|אֲנִי {מִשְׁתַּמֵּשׁ} בַּמַּחְשֵׁב כָּל יוֹם.|I use the computer every day.
v:חתן:hitpael|הֵם {הִתְחַתְּנוּ} בַּקַּיִץ.|They got married in the summer.
v:רגל:hitpael|{הִתְרַגַּלְתִּי} לַחֹם.|I got used to the heat.
v:געגע:hitpael|אֲנִי {מִתְגַּעְגֵּעַ} אֵלֶיךָ.|I miss you.
v:ענין:hitpael|אֲנִי {מִתְעַנְיֵן} בְּהִיסְטוֹרְיָה.|I'm interested in history.
v:פלל:hitpael|הוּא {מִתְפַּלֵּל} כָּל בֹּקֶר.|He prays every morning.
v:נהג:hitpael|{תִּתְנַהֵג} יָפֶה!|Behave yourself!
v:אהב:hitpael|הֵם {הִתְאַהֲבוּ} בַּחֻפְשָׁה.|They fell in love on vacation.
v:רגש:hitpael|אֲנִי כָּל כָּךְ {מִתְרַגֵּשׁ}!|I'm so excited!
v:ביש:hitpael|אַל {תִּתְבַּיֵּשׁ}.|Don't be shy.
v:פתח:hitpael|הָעִיר {הִתְפַּתְּחָה} מְאֹד.|The city has developed a lot.
v:נצל:hitpael|אֲנִי {מִתְנַצֵּל}.|I apologize.
v:צער:hitpael|אֲנִי {מִצְטַעֵר}.|I'm sorry.
v:שנה:hitpael|הַמַּצָּב {הִשְׁתַּנָּה}.|The situation has changed.
v:וכח:hitpael|אַל {תִּתְוַכֵּחַ} אִתִּי.|Don't argue with me.
v:חבא:hitpael|הֶחָתוּל {הִתְחַבֵּא} מִ·תַּחַת לַמִּטָּה.|The cat hid under the bed.
v:קלח:hitpael|אֲנִי הוֹלֵךְ {לְהִתְקַלֵּחַ}.|I'm going to take a shower.
v:סדר:hitpael|אַל תִּדְאַג, {נִסְתַּדֵּר}.|Don't worry, we'll manage.
v:צלם:hitpael|{הִצְטַלַּמְנוּ} לְ·יַד הַ·יָּם.|We had our picture taken by the sea.
v:גלה:hitpael|הַסּוֹד {הִתְגַּלָּה}.|The secret came out.
v:נדב:hitpael|הִיא {מִתְנַדֶּבֶת} בְּבֵית חוֹלִים.|She volunteers at a hospital.
v:אמן:hitpael|אֲנִי {מִתְאַמֵּן} שָׁלוֹשׁ פְּעָמִים בַּשָּׁבוּעַ.|I work out three times a week.
v:זקן:hitpael|כֻּלָּנוּ {מִזְדַּקְּנִים}.|We're all getting older.
v:שגע:hitpael|{הִשְׁתַּגַּעְתָּ}?|Have you lost your mind?
v:ברך:hitpael|{הִתְבָּרַכְנוּ} בְּ·יֶלֶד שֵׁנִי.|We were blessed with a second child.
`;
