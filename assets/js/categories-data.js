"use strict";

window.literaryHonorsCategories = {
    summary: [
        { value: "62", label: "Awards" },
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
            id: "general-fiction",
            name: "General Fiction",
            slug: "general-fiction",
            type: "fiction",
            description: "Original narratives driven by memorable characters, meaningful conflict and a compelling story.",
            detail: "General Fiction covers novels that tell a strong, self-contained story without belonging to a single genre tradition. Judges look for characters who feel real, a conflict that matters, and a plot that earns its ending. Clear prose and confident pacing count for as much as the idea behind the book. Entries here are read as complete reading experiences rather than as examples of a genre.",
            active: true
        },
        {
            id: "literary-fiction",
            name: "Literary Fiction",
            slug: "literary-fiction",
            type: "fiction",
            description: "Character-rich work distinguished by thoughtful themes, language and emotional depth.",
            detail: "Literary Fiction is where language, theme and interiority carry as much weight as plot. These are books that reward close attention: precise sentences, layered characters and questions that stay open after the last page. Judges consider how well form and subject serve each other. Ambition is welcomed, but it is assessed by how fully the writing delivers on it.",
            active: true
        },
        {
            id: "historical-fiction",
            name: "Historical Fiction",
            slug: "historical-fiction",
            type: "fiction",
            description: "Stories rooted in another time, where setting and historical context shape the narrative.",
            detail: "Historical Fiction places invented characters and events inside a real past. The strongest entries wear their research lightly, letting period detail shape behaviour, language and stakes rather than decorate the page. Judges weigh accuracy alongside storytelling, and look for a narrative that could only happen in the time it occupies. Any era qualifies, from the ancient world to the recent past.",
            active: true
        },
        {
            id: "mystery-thriller",
            name: "Mystery & Thriller",
            slug: "mystery-thriller",
            type: "fiction",
            description: "Suspenseful stories built around discovery, danger, investigation or high-stakes tension.",
            detail: "Mystery and Thriller covers crime novels, detective fiction, psychological suspense and high-stakes thrillers. Judges assess how well tension is built and sustained, whether clues and reveals play fair with the reader, and how satisfying the resolution feels. Pacing, atmosphere and a credible antagonist all matter. A strong entry keeps the reader guessing without sacrificing coherence.",
            active: true
        },
        {
            id: "science-fiction",
            name: "Science Fiction",
            slug: "science-fiction",
            type: "fiction",
            description: "Imaginative work exploring speculative science, technology, futures and unfamiliar worlds.",
            detail: "Science Fiction covers speculative work grounded in science, technology or plausible futures. Judges look for an idea explored with rigour and for a world whose rules hold together under pressure. The best entries use their premise to say something about people, not just about machines. Hard SF, space opera, near-future and social science fiction are all welcome.",
            active: true
        },
        {
            id: "fantasy",
            name: "Fantasy",
            slug: "fantasy",
            type: "fiction",
            description: "Inventive worlds shaped by myth, magic, wonder and extraordinary journeys.",
            detail: "Fantasy covers invented worlds, magic systems, myth-rooted storytelling and the fantastical intruding on ordinary life. Judges assess the internal consistency of the world, the cost and limits of its magic, and whether the characters remain compelling within it. Scale is not a virtue in itself; a tightly drawn story can outrank a sprawling one. Epic, urban, historical and literary fantasy all qualify.",
            active: true
        },
        {
            id: "romance",
            name: "Romance",
            slug: "romance",
            type: "fiction",
            description: "Stories in which an emotionally satisfying romantic relationship is central to the journey.",
            detail: "Romance centres a relationship and the emotional journey that shapes it. Judges look for chemistry that is earned through scene and dialogue rather than asserted, obstacles with real weight, and an ending that satisfies the promise the book makes. Voice and pacing are central to how a romance reads. All heat levels, settings and subgenres are eligible.",
            active: true
        },
        {
            id: "young-adult",
            name: "Young Adult",
            slug: "young-adult",
            type: "fiction",
            description: "Engaging stories written for teen readers and centered on discovery, identity and change.",
            detail: "Young Adult is written for readers roughly twelve to eighteen, with protagonists and concerns to match. Judges look for an authentic voice, emotional honesty and a story that respects its audience rather than instructing it. Any genre can sit within Young Adult, from contemporary realism to fantasy and thriller. What matters is that the book speaks directly to the experience of growing up.",
            active: true
        },
        {
            id: "childrens-literature",
            name: "Children’s Literature",
            slug: "childrens-literature",
            type: "fiction",
            description: "Imaginative and meaningful books created to engage, delight and inspire young readers.",
            detail: "Children’s Literature covers picture books, early readers and middle-grade titles. Judges consider age-appropriate language, the balance between text and illustration where both appear, and whether the story holds up to rereading. Warmth, humour and clarity carry real weight in this category. Books that teach without preaching tend to stand out.",
            active: true
        },
        {
            id: "horror",
            name: "Horror",
            slug: "horror",
            type: "fiction",
            description: "Atmospheric storytelling designed to unsettle, frighten or explore the darker unknown.",
            detail: "Horror is judged on its ability to unsettle and sustain dread, not simply to shock. Judges weigh atmosphere, the pacing of revelation, and how well the threat is realised on the page. Restraint is often as effective as explicitness. Supernatural, psychological, folk and quiet horror are all eligible.",
            active: true
        },
        {
            id: "short-stories",
            name: "Short Stories",
            slug: "short-stories",
            type: "fiction",
            description: "Collections or individual works that achieve narrative impact through the short form.",
            detail: "Short Stories covers single-author collections rather than individual pieces. Judges assess the strength of the best stories, the consistency across the collection, and whether the whole adds up to more than its parts. Ordering, range and a recognisable voice all contribute. Linked collections and thematic anthologies by one author are welcome.",
            active: true
        },
        {
            id: "poetry",
            name: "Poetry",
            slug: "poetry",
            type: "fiction",
            description: "Verse collections distinguished by voice, imagery, rhythm and emotional resonance.",
            detail: "Poetry covers single-author collections and book-length poems. Judges read for control of image, line and sound, and for a collection that holds together as a deliberate sequence rather than an assembly of separate pieces. Form is open: free verse, received forms and hybrid work are equally eligible. Originality of voice carries particular weight here.",
            active: true
        },
        {
            id: "memoir-autobiography",
            name: "Memoir & Autobiography",
            slug: "memoir-autobiography",
            type: "non-fiction",
            description: "Personal stories shaped by lived experience, reflection and an authentic individual voice.",
            detail: "Memoir and Autobiography covers first-person accounts of the author’s own life. Judges look for candour, a clear sense of why this story is being told now, and the craft to shape lived experience into narrative. Selection matters as much as recollection; the strongest memoirs know what to leave out. Full-life autobiography and tightly focused memoir are both eligible.",
            active: true
        },
        {
            id: "biography",
            name: "Biography",
            slug: "biography",
            type: "non-fiction",
            description: "Carefully researched accounts that illuminate the life, work and legacy of a person.",
            detail: "Biography covers accounts of another person’s life, whether historical or contemporary. Judges weigh the depth and handling of sources, the fairness of the portrait, and the ability to render a life as a readable narrative. Access to new material is valued, but interpretation matters more than novelty alone. Group and collective biographies also qualify.",
            active: true
        },
        {
            id: "business-entrepreneurship",
            name: "Business & Entrepreneurship",
            slug: "business-entrepreneurship",
            type: "non-fiction",
            description: "Practical or visionary work about leadership, organizations, innovation and building ventures.",
            detail: "Business and Entrepreneurship covers leadership, management, strategy, startups, finance and workplace culture. Judges assess the clarity of the central argument, the quality of the evidence or experience behind it, and how usable the book is for its intended reader. Case studies should illuminate rather than pad. Practical guides and analytical works are equally welcome.",
            active: true
        },
        {
            id: "self-help",
            name: "Self-Help & Personal Development",
            slug: "self-help-personal-development",
            type: "non-fiction",
            description: "Insightful guidance that helps readers understand themselves and create meaningful change.",
            detail: "Self-Help and Personal Development covers books offering guidance on habits, mindset, relationships, productivity and personal growth. Judges look for advice that is specific, honestly framed and supported by reasoning or evidence rather than assertion. Structure matters: a reader should be able to find and apply what they need. Tone and credibility are weighed together.",
            active: true
        },
        {
            id: "history",
            name: "History",
            slug: "history",
            type: "non-fiction",
            description: "Research-led work that brings past events, cultures and turning points into clearer focus.",
            detail: "History covers non-fiction accounts of the past written for a general readership. Judges assess research, the handling of sources and competing interpretations, and the ability to make a period intelligible without flattening it. Narrative history, thematic studies and microhistories are all eligible. Readability and scholarship are considered together, not traded against each other.",
            active: true
        },
        {
            id: "health-wellness",
            name: "Health & Wellness",
            slug: "health-wellness",
            type: "non-fiction",
            description: "Accessible books about physical health, mental well-being and sustainable everyday care.",
            detail: "Health and Wellness covers physical health, mental health, nutrition, fitness and recovery. Judges pay close attention to the accuracy of claims, the care taken with sensitive subjects, and the clarity of the guidance offered. Personal experience is valued when it is clearly distinguished from general advice. Books written for practitioners and for lay readers are both eligible.",
            active: true
        },
        {
            id: "true-crime",
            name: "True Crime",
            slug: "true-crime",
            type: "non-fiction",
            description: "Evidence-based accounts of real cases, investigations and their human consequences.",
            detail: "True Crime covers factual accounts of criminal cases, investigations and their aftermath. Judges weigh the rigour of the research, the treatment of victims and their families, and the restraint shown around sensational detail. A strong entry explains as well as recounts. Single-case narratives and broader investigative works both qualify.",
            active: true
        },
        {
            id: "religion-spirituality",
            name: "Religion & Spirituality",
            slug: "religion-spirituality",
            type: "non-fiction",
            description: "Thoughtful explorations of faith, belief, spiritual practice and the search for meaning.",
            detail: "Religion and Spirituality covers faith traditions, theology, spiritual practice and questions of meaning. Judges look for clarity of thought, respect in the handling of belief, and writing that stays accessible to readers outside the tradition described. Devotional, scholarly and reflective works are all eligible. The category is open to every faith and to writing outside organised religion.",
            active: true
        },
        {
            id: "travel",
            name: "Travel",
            slug: "travel",
            type: "non-fiction",
            description: "Immersive journeys that reveal places, cultures and the meaning discovered along the way.",
            detail: "Travel covers narrative travel writing, place-based essays and journey accounts. Judges read for a strong sense of place, an observant and honest narrator, and insight that goes beyond description. The relationship between traveller and destination matters, including its discomforts. Guidebooks sit outside the category; narrative and reflection are central.",
            active: true
        },
        {
            id: "education",
            name: "Education",
            slug: "education",
            type: "non-fiction",
            description: "Ideas and practical insight that deepen learning, teaching and educational opportunity.",
            detail: "Education covers teaching practice, learning, pedagogy, educational policy and books written for students. Judges assess the clarity of the ideas, their grounding in classroom or research experience, and how well the book serves the reader it names. Practical resources and broader arguments about education are both eligible. Structure and usability carry real weight.",
            active: true
        },
        {
            id: "current-affairs",
            name: "Current Affairs",
            slug: "current-affairs",
            type: "non-fiction",
            description: "Timely analysis of the social, political and cultural questions shaping public life.",
            detail: "Current Affairs covers politics, society, economics and the issues shaping the present moment. Judges weigh the quality of the argument, the evidence behind it and the fairness with which opposing views are handled. Timeliness matters, but so does work that will still read well in a few years. Reportage, analysis and essay collections are all eligible.",
            active: true
        },
        {
            id: "science-nature",
            name: "Science & Nature",
            slug: "science-nature",
            type: "non-fiction",
            description: "Clear and engaging work that makes scientific ideas and the natural world accessible.",
            detail: "Science and Nature covers popular science, the natural world, environment and technology written for a general audience. Judges look for accuracy, the ability to explain difficult ideas without distorting them, and genuine curiosity on the page. Nature writing and field-based accounts sit comfortably here alongside laboratory science. Clarity is valued as highly as expertise.",
            active: true
        },
        {
            id: "distinguished-author-award",
            name: "Distinguished Author Award",
            slug: "distinguished-author-award",
            type: "non-fiction",
            description: "A special recognition for an author whose work, dedication, and publishing journey show meaningful literary achievement.",
            detail: "The Distinguished Author Award recognises an author’s body of work rather than a single title. Judges consider consistency of quality across books, range and development over time, and the author’s contribution to their field or to their readers. Entries should present the work as a whole rather than one standout release. It is the one category judged on a career rather than a book.",
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
