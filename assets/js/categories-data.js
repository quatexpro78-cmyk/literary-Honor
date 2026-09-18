"use strict";

window.literaryHonorsCategories = {
    summary: [
        { value: "60+", label: "Awards" },
        { value: "Fiction", label: "Multiple Genres" },
        { value: "Non-Fiction", label: "Multiple Subjects" },
        { value: "Up to 5", label: "Category Entries" }
    ],
    filters: [
        { value: "all", label: "All" },
        { value: "fiction", label: "Fiction" },
        { value: "non-fiction", label: "Non-Fiction" }
    ],
    categories: [
        {
            id: "book-of-the-year-fiction",
            name: "Book of the Year (Fiction)",
            slug: "book-of-the-year-fiction",
            type: "fiction",
            group: "General Fiction",
            description: "The top fiction honor, awarded to the single most outstanding novel entered across every fiction category.",
            detail: "Book of the Year (Fiction) recognises the strongest work of fiction entered in the current cycle regardless of genre. Judges weigh storytelling, character, prose and lasting impact together. Any published novel is eligible, and entries in other fiction categories are also considered here.",
            active: true
        },
        {
            id: "best-literary-fiction",
            name: "Best Literary Fiction",
            slug: "best-literary-fiction",
            type: "fiction",
            group: "General Fiction",
            description: "Character-rich work distinguished by thoughtful themes, language and emotional depth.",
            detail: "Literary Fiction is where language, theme and interiority carry as much weight as plot. Judges consider how well form and subject serve each other and how fully the writing delivers on its ambition.",
            active: true
        },
        {
            id: "best-debut-novel",
            name: "Best Debut Novel",
            slug: "best-debut-novel",
            type: "fiction",
            group: "General Fiction",
            description: "A first published novel that announces a distinctive new voice.",
            detail: "Best Debut Novel is open to authors publishing their first full-length novel. Judges look for a confident voice, strong storytelling and the promise of a lasting career. Any genre is eligible.",
            active: true
        },
        {
            id: "best-historical-fiction",
            name: "Best Historical Fiction",
            slug: "best-historical-fiction",
            type: "fiction",
            group: "General Fiction",
            description: "Stories rooted in another time, where setting and historical context shape the narrative.",
            detail: "Historical Fiction places invented characters and events inside a real past. Judges weigh accuracy alongside storytelling and look for a narrative that could only happen in the time it occupies.",
            active: true
        },
        {
            id: "best-contemporary-fiction",
            name: "Best Contemporary Fiction",
            slug: "best-contemporary-fiction",
            type: "fiction",
            group: "General Fiction",
            description: "Present-day stories that capture modern life, relationships and society.",
            detail: "Contemporary Fiction covers novels set in the present or recent past that speak to how people live now. Judges look for authentic characters, believable settings and a story that resonates with today's readers.",
            active: true
        },
        {
            id: "best-humor-novel",
            name: "Best Humor Novel",
            slug: "best-humor-novel",
            type: "fiction",
            group: "General Fiction",
            description: "Fiction that entertains through wit, comic timing and a sharp eye for the absurd.",
            detail: "Best Humor Novel recognises comic fiction of every kind, from satire to light-hearted romps. Judges assess timing, originality and whether the humour serves character and story rather than replacing them.",
            active: true
        },
        {
            id: "best-mystery",
            name: "Best Mystery",
            slug: "best-mystery",
            type: "fiction",
            group: "Genre Fiction",
            description: "Puzzle-driven stories built around investigation, clues and a satisfying reveal.",
            detail: "Best Mystery covers detective stories, whodunits and investigative fiction. Judges look for fair-play plotting, an engaging investigator and a solution that rewards the reader's attention.",
            active: true
        },
        {
            id: "best-thriller",
            name: "Best Thriller",
            slug: "best-thriller",
            type: "fiction",
            group: "Genre Fiction",
            description: "High-stakes narratives driven by danger, pace and relentless tension.",
            detail: "Best Thriller rewards fiction that keeps readers turning pages. Judges weigh pacing, escalating stakes, credible threat and an ending that delivers on the tension built throughout.",
            active: true
        },
        {
            id: "best-suspense-novel",
            name: "Best Suspense Novel",
            slug: "best-suspense-novel",
            type: "fiction",
            group: "Genre Fiction",
            description: "Slow-burning stories that hold readers in a state of dread and anticipation.",
            detail: "Best Suspense Novel recognises fiction where psychological tension and uncertainty drive the reading experience. Judges assess atmosphere, control of information and sustained unease.",
            active: true
        },
        {
            id: "best-crime-fiction",
            name: "Best Crime Fiction",
            slug: "best-crime-fiction",
            type: "fiction",
            group: "Genre Fiction",
            description: "Stories set in the world of crime, its perpetrators, victims and consequences.",
            detail: "Best Crime Fiction covers novels centred on criminal acts and the people around them. Judges look for authenticity, moral complexity and a plot that treats its subject with weight.",
            active: true
        },
        {
            id: "best-romance-novel",
            name: "Best Romance Novel",
            slug: "best-romance-novel",
            type: "fiction",
            group: "Genre Fiction",
            description: "Stories in which an emotionally satisfying romantic relationship is central to the journey.",
            detail: "Romance centres a relationship and the emotional journey that shapes it. Judges look for chemistry earned through scene and dialogue, meaningful obstacles and a satisfying ending. All heat levels and subgenres are eligible.",
            active: true
        },
        {
            id: "best-science-fiction-novel",
            name: "Best Science Fiction Novel",
            slug: "best-science-fiction-novel",
            type: "fiction",
            group: "Genre Fiction",
            description: "Speculative stories shaped by science, technology and imagined futures.",
            detail: "Best Science Fiction Novel covers hard and soft science fiction, space opera, dystopia and near-future speculation. Judges assess world-building, internal logic and whether the ideas are carried by compelling characters.",
            active: true
        },
        {
            id: "best-fantasy-novel",
            name: "Best Fantasy Novel",
            slug: "best-fantasy-novel",
            type: "fiction",
            group: "Genre Fiction",
            description: "Inventive worlds shaped by myth, magic, wonder and extraordinary journeys.",
            detail: "Fantasy covers invented worlds, magic systems and myth-rooted storytelling. Judges assess the internal consistency of the world and whether the characters remain compelling within it. Epic, urban and literary fantasy all qualify.",
            active: true
        },
        {
            id: "best-paranormal-fiction",
            name: "Best Paranormal Fiction",
            slug: "best-paranormal-fiction",
            type: "fiction",
            group: "Genre Fiction",
            description: "Stories where ghosts, the supernatural and the unexplained intrude on everyday life.",
            detail: "Best Paranormal Fiction covers novels featuring supernatural elements outside traditional horror or fantasy. Judges look for atmosphere, originality and a believable blend of the ordinary and the uncanny.",
            active: true
        },
        {
            id: "best-horror-novel",
            name: "Best Horror Novel",
            slug: "best-horror-novel",
            type: "fiction",
            group: "Genre Fiction",
            description: "Atmospheric storytelling designed to unsettle, frighten or explore the darker unknown.",
            detail: "Horror is judged on its ability to unsettle and sustain dread, not simply to shock. Judges weigh atmosphere, the pacing of revelation and how well the threat is realised on the page.",
            active: true
        },
        {
            id: "best-adventure-novel",
            name: "Best Adventure Novel",
            slug: "best-adventure-novel",
            type: "fiction",
            group: "Genre Fiction",
            description: "Action-driven journeys defined by exploration, peril and discovery.",
            detail: "Best Adventure Novel recognises fiction built on quests, expeditions and survival. Judges look for momentum, vivid settings and protagonists whose courage is tested in meaningful ways.",
            active: true
        },
        {
            id: "best-children-s-picture-book",
            name: "Best Children's Picture Book",
            slug: "best-children-s-picture-book",
            type: "fiction",
            group: "Young Readers",
            description: "Illustrated stories for the youngest readers where words and pictures work as one.",
            detail: "Best Children's Picture Book covers illustrated books for early childhood. Judges consider the harmony of text and illustration, age-appropriate language and whether the story holds up to rereading.",
            active: true
        },
        {
            id: "best-children-s-chapter-book",
            name: "Best Children's Chapter Book",
            slug: "best-children-s-chapter-book",
            type: "fiction",
            group: "Young Readers",
            description: "Early chapter books that build confidence and joy in newly independent readers.",
            detail: "Best Children's Chapter Book recognises fiction for readers moving beyond picture books. Judges look for accessible prose, engaging characters and stories that respect a young reader's growing ability.",
            active: true
        },
        {
            id: "best-middle-grade-novel",
            name: "Best Middle Grade Novel",
            slug: "best-middle-grade-novel",
            type: "fiction",
            group: "Young Readers",
            description: "Stories for readers aged roughly eight to twelve, full of heart, humour and discovery.",
            detail: "Best Middle Grade Novel covers fiction for pre-teen readers across every genre. Judges assess voice, emotional honesty and a narrative that speaks directly to this age group.",
            active: true
        },
        {
            id: "best-teen-and-young-adult-novel",
            name: "Best Teen & Young Adult Novel",
            slug: "best-teen-and-young-adult-novel",
            type: "fiction",
            group: "Young Readers",
            description: "Engaging stories written for teen readers and centered on discovery, identity and change.",
            detail: "Young Adult is written for readers roughly twelve to eighteen. Judges look for an authentic voice, emotional honesty and a story that respects its audience rather than instructing it.",
            active: true
        },
        {
            id: "best-young-adult-fantasy",
            name: "Best Young Adult Fantasy",
            slug: "best-young-adult-fantasy",
            type: "fiction",
            group: "Young Readers",
            description: "Magic, myth and invented worlds written for teen readers.",
            detail: "Best Young Adult Fantasy recognises fantasy fiction aimed at teen readers. Judges weigh world-building, character growth and a voice that speaks to a young adult audience.",
            active: true
        },
        {
            id: "best-young-adult-romance",
            name: "Best Young Adult Romance",
            slug: "best-young-adult-romance",
            type: "fiction",
            group: "Young Readers",
            description: "Love stories that capture first relationships and the emotions of growing up.",
            detail: "Best Young Adult Romance covers romantic fiction written for teen readers. Judges look for authentic emotion, age-appropriate handling of relationships and a satisfying arc.",
            active: true
        },
        {
            id: "best-christian-fiction",
            name: "Best Christian Fiction",
            slug: "best-christian-fiction",
            type: "fiction",
            group: "Specialized Fiction",
            description: "Stories shaped by Christian faith, values and spiritual journeys.",
            detail: "Best Christian Fiction recognises novels in which faith is central to character and story. Judges assess storytelling quality alongside the sincerity and depth of its spiritual themes.",
            active: true
        },
        {
            id: "best-graphic-novel",
            name: "Best Graphic Novel",
            slug: "best-graphic-novel",
            type: "fiction",
            group: "Specialized Fiction",
            description: "Sequential art that tells a complete story through words and images together.",
            detail: "Best Graphic Novel covers book-length comics and illustrated narratives. Judges consider the interplay of art and text, visual storytelling and narrative strength.",
            active: true
        },
        {
            id: "best-lgbtqplus-fiction",
            name: "Best LGBTQ+ Fiction",
            slug: "best-lgbtqplus-fiction",
            type: "fiction",
            group: "Specialized Fiction",
            description: "Stories centring LGBTQ+ characters, lives and experiences.",
            detail: "Best LGBTQ+ Fiction recognises fiction across all genres that foregrounds LGBTQ+ characters and perspectives. Judges look for authenticity, craft and emotional truth.",
            active: true
        },
        {
            id: "best-foreign-language-fiction",
            name: "Best Foreign Language Fiction",
            slug: "best-foreign-language-fiction",
            type: "fiction",
            group: "Specialized Fiction",
            description: "Fiction originally written in a language other than English.",
            detail: "Best Foreign Language Fiction is open to novels published in languages other than English, or in translation. Judges assess storytelling, voice and cultural resonance.",
            active: true
        },
        {
            id: "readers-choice-fiction-award",
            name: "Readers' Choice Fiction Award",
            slug: "readers-choice-fiction-award",
            type: "fiction",
            group: "Specialized Fiction",
            description: "A fiction honor decided by the votes of readers themselves.",
            detail: "The Readers' Choice Fiction Award is determined by reader voting rather than the judging panel. It celebrates the fiction title that most captured readers' hearts in the current cycle.",
            active: true
        },
        {
            id: "best-arts-book",
            name: "Best Arts Book",
            slug: "best-arts-book",
            type: "non-fiction",
            group: "Arts & Culture",
            description: "Books that explore visual art, music, performance and creative culture.",
            detail: "Best Arts Book covers writing about the arts in every form, from criticism to artist monographs. Judges look for insight, accessibility and strong presentation.",
            active: true
        },
        {
            id: "best-photography-book",
            name: "Best Photography Book",
            slug: "best-photography-book",
            type: "non-fiction",
            group: "Arts & Culture",
            description: "Collections and works where photography carries the story.",
            detail: "Best Photography Book recognises photographic books and photo essays. Judges assess the quality of the images, the coherence of the sequence and the strength of the overall production.",
            active: true
        },
        {
            id: "best-crafts-and-hobbies-book",
            name: "Best Crafts & Hobbies Book",
            slug: "best-crafts-and-hobbies-book",
            type: "non-fiction",
            group: "Arts & Culture",
            description: "Practical guides to making, crafting and creative pastimes.",
            detail: "Best Crafts & Hobbies Book covers instructional and inspirational books on crafts, DIY and hobbies. Judges weigh clarity of instruction, usability and presentation.",
            active: true
        },
        {
            id: "best-home-and-design-book",
            name: "Best Home & Design Book",
            slug: "best-home-and-design-book",
            type: "non-fiction",
            group: "Arts & Culture",
            description: "Books on interiors, architecture, gardens and designed living.",
            detail: "Best Home & Design Book recognises writing and visual books about home, interiors and design. Judges look for original ideas, practical value and strong visual presentation.",
            active: true
        },
        {
            id: "best-biography",
            name: "Best Biography",
            slug: "best-biography",
            type: "non-fiction",
            group: "Biography & Personal Stories",
            description: "Carefully researched accounts that illuminate the life, work and legacy of a person.",
            detail: "Biography covers accounts of another person's life, historical or contemporary. Judges weigh the depth of sources, the fairness of the portrait and the ability to render a life as a readable narrative.",
            active: true
        },
        {
            id: "best-memoir",
            name: "Best Memoir",
            slug: "best-memoir",
            type: "non-fiction",
            group: "Biography & Personal Stories",
            description: "Personal stories shaped by lived experience, reflection and an authentic individual voice.",
            detail: "Memoir covers first-person accounts of a focused period or theme in the author's life. Judges look for candour, a clear sense of why the story is being told and the craft to shape experience into narrative.",
            active: true
        },
        {
            id: "best-autobiography",
            name: "Best Autobiography",
            slug: "best-autobiography",
            type: "non-fiction",
            group: "Biography & Personal Stories",
            description: "A full account of the author's own life, told in their own words.",
            detail: "Best Autobiography recognises life stories written by their subjects. Judges assess honesty, structure and the ability to make a whole life compelling on the page.",
            active: true
        },
        {
            id: "best-inspirational-memoir",
            name: "Best Inspirational Memoir",
            slug: "best-inspirational-memoir",
            type: "non-fiction",
            group: "Biography & Personal Stories",
            description: "Personal stories of resilience, faith or transformation that uplift readers.",
            detail: "Best Inspirational Memoir covers memoirs that offer hope and encouragement through lived experience. Judges look for authenticity, emotional honesty and a story that genuinely moves readers.",
            active: true
        },
        {
            id: "best-business-book",
            name: "Best Business Book",
            slug: "best-business-book",
            type: "non-fiction",
            group: "Business & Professional",
            description: "Practical or visionary work about organizations, strategy and the world of business.",
            detail: "Best Business Book covers management, strategy, economics and workplace culture. Judges assess the clarity of the central argument and how usable the book is for its intended reader.",
            active: true
        },
        {
            id: "best-entrepreneurship-book",
            name: "Best Entrepreneurship Book",
            slug: "best-entrepreneurship-book",
            type: "non-fiction",
            group: "Business & Professional",
            description: "Guidance and stories about starting, building and growing ventures.",
            detail: "Best Entrepreneurship Book recognises writing for founders and builders. Judges look for real experience, actionable insight and honest treatment of both success and failure.",
            active: true
        },
        {
            id: "best-leadership-book",
            name: "Best Leadership Book",
            slug: "best-leadership-book",
            type: "non-fiction",
            group: "Business & Professional",
            description: "Ideas and practice for leading people, teams and organizations.",
            detail: "Best Leadership Book covers books on leading, managing and inspiring others. Judges weigh originality, evidence and practical value.",
            active: true
        },
        {
            id: "best-personal-finance-book",
            name: "Best Personal Finance Book",
            slug: "best-personal-finance-book",
            type: "non-fiction",
            group: "Business & Professional",
            description: "Clear guidance on money, saving, investing and financial well-being.",
            detail: "Best Personal Finance Book recognises books that help readers manage their money. Judges assess accuracy, clarity and whether the advice is realistic and responsible.",
            active: true
        },
        {
            id: "best-marketing-book",
            name: "Best Marketing Book",
            slug: "best-marketing-book",
            type: "non-fiction",
            group: "Business & Professional",
            description: "Insight into branding, communication, sales and reaching an audience.",
            detail: "Best Marketing Book covers marketing, branding, sales and communication. Judges look for fresh thinking, practical frameworks and clear writing.",
            active: true
        },
        {
            id: "best-education-book",
            name: "Best Education Book",
            slug: "best-education-book",
            type: "non-fiction",
            group: "Education & Learning",
            description: "Ideas and practical insight that deepen learning, teaching and educational opportunity.",
            detail: "Education covers teaching practice, learning, pedagogy and educational policy. Judges assess the clarity of the ideas and how well the book serves the reader it names.",
            active: true
        },
        {
            id: "best-teaching-resource",
            name: "Best Teaching Resource",
            slug: "best-teaching-resource",
            type: "non-fiction",
            group: "Education & Learning",
            description: "Materials that support educators in the classroom and beyond.",
            detail: "Best Teaching Resource recognises practical books for teachers and trainers. Judges weigh usability, sound pedagogy and quality of presentation.",
            active: true
        },
        {
            id: "best-test-preparation-guide",
            name: "Best Test Preparation Guide",
            slug: "best-test-preparation-guide",
            type: "non-fiction",
            group: "Education & Learning",
            description: "Study guides that prepare learners for examinations and assessments.",
            detail: "Best Test Preparation Guide covers books designed to help students succeed in exams. Judges assess accuracy, structure and effectiveness as a study tool.",
            active: true
        },
        {
            id: "best-reference-book",
            name: "Best Reference Book",
            slug: "best-reference-book",
            type: "non-fiction",
            group: "Education & Learning",
            description: "Authoritative works readers return to for facts, definitions and guidance.",
            detail: "Best Reference Book recognises dictionaries, encyclopedias, handbooks and other reference works. Judges look for accuracy, organisation and ease of use.",
            active: true
        },
        {
            id: "best-foreign-language-learning-book",
            name: "Best Foreign Language Learning Book",
            slug: "best-foreign-language-learning-book",
            type: "non-fiction",
            group: "Education & Learning",
            description: "Books that help readers learn and master another language.",
            detail: "Best Foreign Language Learning Book covers language courses, grammars and learner resources. Judges assess pedagogy, clarity and how well the book supports real progress.",
            active: true
        },
        {
            id: "best-computer-and-technology-book",
            name: "Best Computer & Technology Book",
            slug: "best-computer-and-technology-book",
            type: "non-fiction",
            group: "Science, Technology & Medicine",
            description: "Accessible or expert writing about computing, software and digital life.",
            detail: "Best Computer & Technology Book covers technical guides and books about technology's role in society. Judges look for accuracy, clarity and relevance.",
            active: true
        },
        {
            id: "best-engineering-book",
            name: "Best Engineering Book",
            slug: "best-engineering-book",
            type: "non-fiction",
            group: "Science, Technology & Medicine",
            description: "Books that explain, teach or celebrate engineering and its achievements.",
            detail: "Best Engineering Book recognises writing on engineering disciplines for professionals or general readers. Judges weigh technical soundness and clear explanation.",
            active: true
        },
        {
            id: "best-medical-book",
            name: "Best Medical Book",
            slug: "best-medical-book",
            type: "non-fiction",
            group: "Science, Technology & Medicine",
            description: "Writing on medicine, health care and clinical practice.",
            detail: "Best Medical Book covers books for practitioners and for general readers interested in medicine. Judges assess accuracy, responsibility and clarity.",
            active: true
        },
        {
            id: "best-science-book",
            name: "Best Science Book",
            slug: "best-science-book",
            type: "non-fiction",
            group: "Science, Technology & Medicine",
            description: "Clear and engaging work that makes scientific ideas accessible.",
            detail: "Best Science Book covers popular science and scientific writing for a general audience. Judges look for accuracy, the ability to explain difficult ideas and genuine curiosity on the page.",
            active: true
        },
        {
            id: "best-mathematics-book",
            name: "Best Mathematics Book",
            slug: "best-mathematics-book",
            type: "non-fiction",
            group: "Science, Technology & Medicine",
            description: "Books that illuminate mathematical ideas for learners or curious readers.",
            detail: "Best Mathematics Book recognises writing on mathematics at any level. Judges assess rigour, clarity and the ability to make mathematics engaging.",
            active: true
        },
        {
            id: "best-cookbook",
            name: "Best Cookbook",
            slug: "best-cookbook",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Recipes and culinary writing that inspire readers in the kitchen.",
            detail: "Best Cookbook covers recipe collections and culinary guides. Judges consider the reliability of recipes, originality and quality of presentation.",
            active: true
        },
        {
            id: "best-food-and-wine-book",
            name: "Best Food & Wine Book",
            slug: "best-food-and-wine-book",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Writing that celebrates food, drink and the culture around them.",
            detail: "Best Food & Wine Book recognises narrative and reference works about food and wine beyond the recipe book. Judges look for knowledge, voice and enjoyment.",
            active: true
        },
        {
            id: "best-health-and-fitness-book",
            name: "Best Health & Fitness Book",
            slug: "best-health-and-fitness-book",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Accessible books about physical health, exercise and sustainable everyday care.",
            detail: "Best Health & Fitness Book covers physical health, training and wellness. Judges pay close attention to the accuracy of claims and the clarity of the guidance offered.",
            active: true
        },
        {
            id: "best-diet-and-nutrition-book",
            name: "Best Diet & Nutrition Book",
            slug: "best-diet-and-nutrition-book",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Evidence-informed guidance on eating well and nourishing the body.",
            detail: "Best Diet & Nutrition Book recognises books on nutrition and eating habits. Judges weigh scientific responsibility, practicality and clarity.",
            active: true
        },
        {
            id: "best-parenting-book",
            name: "Best Parenting Book",
            slug: "best-parenting-book",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Support and insight for raising children at every stage.",
            detail: "Best Parenting Book covers guidance for parents and caregivers. Judges look for credible advice, warmth and respect for the reader.",
            active: true
        },
        {
            id: "best-relationship-book",
            name: "Best Relationship Book",
            slug: "best-relationship-book",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Insight into love, friendship, family and human connection.",
            detail: "Best Relationship Book recognises books about building and sustaining relationships. Judges assess honesty, usefulness and the credibility of the guidance.",
            active: true
        },
        {
            id: "best-self-help-book",
            name: "Best Self-Help Book",
            slug: "best-self-help-book",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Insightful guidance that helps readers understand themselves and create meaningful change.",
            detail: "Self-Help covers books on habits, mindset, productivity and personal growth. Judges look for advice that is specific, honestly framed and supported by reasoning rather than assertion.",
            active: true
        },
        {
            id: "best-travel-book",
            name: "Best Travel Book",
            slug: "best-travel-book",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Immersive journeys that reveal places, cultures and the meaning discovered along the way.",
            detail: "Travel covers narrative travel writing, place-based essays and journey accounts. Judges read for a strong sense of place, an observant narrator and insight that goes beyond description.",
            active: true
        },
        {
            id: "best-pet-and-animal-care-book",
            name: "Best Pet & Animal Care Book",
            slug: "best-pet-and-animal-care-book",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Guidance and stories about caring for and living with animals.",
            detail: "Best Pet & Animal Care Book covers books on pet ownership, animal welfare and the human-animal bond. Judges weigh accuracy, practical value and warmth.",
            active: true
        },
        {
            id: "best-sports-and-outdoors-book",
            name: "Best Sports & Outdoors Book",
            slug: "best-sports-and-outdoors-book",
            type: "non-fiction",
            group: "Lifestyle",
            description: "Writing on sport, athletics, adventure and the outdoor life.",
            detail: "Best Sports & Outdoors Book recognises books about sport, outdoor pursuits and adventure. Judges look for expertise, storytelling and enthusiasm.",
            active: true
        },
        {
            id: "best-history-book",
            name: "Best History Book",
            slug: "best-history-book",
            type: "non-fiction",
            group: "History, Politics & Society",
            description: "Research-led work that brings past events, cultures and turning points into clearer focus.",
            detail: "History covers non-fiction accounts of the past for a general readership. Judges assess research, the handling of sources and the ability to make a period intelligible.",
            active: true
        },
        {
            id: "best-politics-book",
            name: "Best Politics Book",
            slug: "best-politics-book",
            type: "non-fiction",
            group: "History, Politics & Society",
            description: "Analysis and argument about government, power and political life.",
            detail: "Best Politics Book covers political analysis, commentary and reportage. Judges weigh the quality of the argument, the evidence and the fairness with which opposing views are handled.",
            active: true
        },
        {
            id: "best-social-sciences-book",
            name: "Best Social Sciences Book",
            slug: "best-social-sciences-book",
            type: "non-fiction",
            group: "History, Politics & Society",
            description: "Work that examines society, culture, psychology and human behaviour.",
            detail: "Best Social Sciences Book recognises books drawing on sociology, psychology, anthropology and related fields. Judges look for rigour, insight and accessibility.",
            active: true
        },
        {
            id: "best-law-book",
            name: "Best Law Book",
            slug: "best-law-book",
            type: "non-fiction",
            group: "History, Politics & Society",
            description: "Writing that explains legal ideas, cases and systems.",
            detail: "Best Law Book covers books on law for professionals or general readers. Judges assess accuracy, clarity and relevance.",
            active: true
        },
        {
            id: "best-current-affairs-book",
            name: "Best Current Affairs Book",
            slug: "best-current-affairs-book",
            type: "non-fiction",
            group: "History, Politics & Society",
            description: "Timely analysis of the social, political and cultural questions shaping public life.",
            detail: "Current Affairs covers the issues shaping the present moment. Judges weigh the argument, the evidence behind it and whether the work will still read well in a few years.",
            active: true
        },
        {
            id: "best-christian-book",
            name: "Best Christian Book",
            slug: "best-christian-book",
            type: "non-fiction",
            group: "Faith & Spirituality",
            description: "Non-fiction rooted in Christian faith, teaching and living.",
            detail: "Best Christian Book recognises Christian non-fiction of every kind, from devotional to theological. Judges look for clarity, sincerity and writing that serves its readers well.",
            active: true
        },
        {
            id: "best-bible-study-resource",
            name: "Best Bible Study Resource",
            slug: "best-bible-study-resource",
            type: "non-fiction",
            group: "Faith & Spirituality",
            description: "Guides and studies that deepen engagement with scripture.",
            detail: "Best Bible Study Resource covers study guides, commentaries and group resources. Judges assess soundness, usability and depth.",
            active: true
        },
        {
            id: "best-religion-book",
            name: "Best Religion Book",
            slug: "best-religion-book",
            type: "non-fiction",
            group: "Faith & Spirituality",
            description: "Thoughtful writing on faith traditions, theology and belief.",
            detail: "Best Religion Book covers books on religious traditions and theology. Judges look for clarity of thought and respect in the handling of belief. The category is open to every faith.",
            active: true
        },
        {
            id: "best-spirituality-book",
            name: "Best Spirituality Book",
            slug: "best-spirituality-book",
            type: "non-fiction",
            group: "Faith & Spirituality",
            description: "Explorations of spiritual practice, meaning and the inner life.",
            detail: "Best Spirituality Book recognises writing on spirituality within or outside organised religion. Judges weigh depth, honesty and accessibility.",
            active: true
        },
        {
            id: "best-calendar",
            name: "Best Calendar",
            slug: "best-calendar",
            type: "non-fiction",
            group: "Specialty Categories",
            description: "Beautifully produced calendars that pair design with purpose.",
            detail: "Best Calendar recognises printed calendars judged on design, imagery and production quality.",
            active: true
        },
        {
            id: "best-coffee-table-book",
            name: "Best Coffee Table Book",
            slug: "best-coffee-table-book",
            type: "non-fiction",
            group: "Specialty Categories",
            description: "Large-format books where imagery and presentation take centre stage.",
            detail: "Best Coffee Table Book covers visually led books designed to be displayed and browsed. Judges assess imagery, design and production values.",
            active: true
        },
        {
            id: "best-illustrated-nonfiction",
            name: "Best Illustrated Nonfiction",
            slug: "best-illustrated-nonfiction",
            type: "non-fiction",
            group: "Specialty Categories",
            description: "Non-fiction where illustration and design carry the content.",
            detail: "Best Illustrated Nonfiction recognises non-fiction books in which visual material is essential. Judges consider the integration of image and text and overall presentation.",
            active: true
        },
        {
            id: "best-research-book",
            name: "Best Research Book",
            slug: "best-research-book",
            type: "non-fiction",
            group: "Specialty Categories",
            description: "Rigorous, original research presented for specialist or general readers.",
            detail: "Best Research Book covers scholarly and research-driven works. Judges weigh originality, methodology and clarity of presentation.",
            active: true
        },
        {
            id: "best-independent-nonfiction-book",
            name: "Best Independent Nonfiction Book",
            slug: "best-independent-nonfiction-book",
            type: "non-fiction",
            group: "Specialty Categories",
            description: "Outstanding non-fiction from independent and self-published authors.",
            detail: "Best Independent Nonfiction Book is open to self-published and independently published non-fiction. Judges assess writing, research and professional presentation.",
            active: true
        },
        {
            id: "readers-choice-nonfiction-award",
            name: "Readers' Choice Nonfiction Award",
            slug: "readers-choice-nonfiction-award",
            type: "non-fiction",
            group: "Specialty Categories",
            description: "A non-fiction honor decided by the votes of readers themselves.",
            detail: "The Readers' Choice Nonfiction Award is determined by reader voting rather than the judging panel. It celebrates the non-fiction title that most resonated with readers in the current cycle.",
            active: true
        }
    ],
    principles: [
        {
            number: "01",
            title: "Enter Where Your Book Belongs",
            description: "Choose the category that best represents the actual purpose, audience and content of your book."
        },
        {
            number: "02",
            title: "Choose with Intention",
            description: "Some books genuinely fit more than one category. Select additional categories only when each one meaningfully represents the work."
        },
        {
            number: "03",
            title: "Don’t Stretch",
            description: "More categories are not automatically better. A precise fit should matter more than entering everywhere."
        }
    ],
    // Temporary frontend pricing configuration. Replace when the final business values are approved.
    entryOptions: [
        { count: "1", label: "Category", price: "$65", saving: "" },
        { count: "2", label: "Categories", price: "$139", saving: "Save $19" },
        { count: "3", label: "Categories", price: "$189", saving: "Save $48" },
        { count: "4", label: "Categories", price: "$229", saving: "Save $87" },
        { count: "5", label: "Categories", price: "$259", saving: "Save $136" }
    ]
};
