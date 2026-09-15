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
            active: true
        },
        {
            id: "literary-fiction",
            name: "Literary Fiction",
            slug: "literary-fiction",
            type: "fiction",
            description: "Character-rich work distinguished by thoughtful themes, language and emotional depth.",
            active: true
        },
        {
            id: "historical-fiction",
            name: "Historical Fiction",
            slug: "historical-fiction",
            type: "fiction",
            description: "Stories rooted in another time, where setting and historical context shape the narrative.",
            active: true
        },
        {
            id: "mystery-thriller",
            name: "Mystery & Thriller",
            slug: "mystery-thriller",
            type: "fiction",
            description: "Suspenseful stories built around discovery, danger, investigation or high-stakes tension.",
            active: true
        },
        {
            id: "science-fiction",
            name: "Science Fiction",
            slug: "science-fiction",
            type: "fiction",
            description: "Imaginative work exploring speculative science, technology, futures and unfamiliar worlds.",
            active: true
        },
        {
            id: "fantasy",
            name: "Fantasy",
            slug: "fantasy",
            type: "fiction",
            description: "Inventive worlds shaped by myth, magic, wonder and extraordinary journeys.",
            active: true
        },
        {
            id: "romance",
            name: "Romance",
            slug: "romance",
            type: "fiction",
            description: "Stories in which an emotionally satisfying romantic relationship is central to the journey.",
            active: true
        },
        {
            id: "young-adult",
            name: "Young Adult",
            slug: "young-adult",
            type: "fiction",
            description: "Engaging stories written for teen readers and centered on discovery, identity and change.",
            active: true
        },
        {
            id: "childrens-literature",
            name: "Children’s Literature",
            slug: "childrens-literature",
            type: "fiction",
            description: "Imaginative and meaningful books created to engage, delight and inspire young readers.",
            active: true
        },
        {
            id: "horror",
            name: "Horror",
            slug: "horror",
            type: "fiction",
            description: "Atmospheric storytelling designed to unsettle, frighten or explore the darker unknown.",
            active: true
        },
        {
            id: "short-stories",
            name: "Short Stories",
            slug: "short-stories",
            type: "fiction",
            description: "Collections or individual works that achieve narrative impact through the short form.",
            active: true
        },
        {
            id: "poetry",
            name: "Poetry",
            slug: "poetry",
            type: "fiction",
            description: "Verse collections distinguished by voice, imagery, rhythm and emotional resonance.",
            active: true
        },
        {
            id: "memoir-autobiography",
            name: "Memoir & Autobiography",
            slug: "memoir-autobiography",
            type: "non-fiction",
            description: "Personal stories shaped by lived experience, reflection and an authentic individual voice.",
            active: true
        },
        {
            id: "biography",
            name: "Biography",
            slug: "biography",
            type: "non-fiction",
            description: "Carefully researched accounts that illuminate the life, work and legacy of a person.",
            active: true
        },
        {
            id: "business-entrepreneurship",
            name: "Business & Entrepreneurship",
            slug: "business-entrepreneurship",
            type: "non-fiction",
            description: "Practical or visionary work about leadership, organizations, innovation and building ventures.",
            active: true
        },
        {
            id: "self-help",
            name: "Self-Help & Personal Development",
            slug: "self-help-personal-development",
            type: "non-fiction",
            description: "Insightful guidance that helps readers understand themselves and create meaningful change.",
            active: true
        },
        {
            id: "history",
            name: "History",
            slug: "history",
            type: "non-fiction",
            description: "Research-led work that brings past events, cultures and turning points into clearer focus.",
            active: true
        },
        {
            id: "health-wellness",
            name: "Health & Wellness",
            slug: "health-wellness",
            type: "non-fiction",
            description: "Accessible books about physical health, mental well-being and sustainable everyday care.",
            active: true
        },
        {
            id: "true-crime",
            name: "True Crime",
            slug: "true-crime",
            type: "non-fiction",
            description: "Evidence-based accounts of real cases, investigations and their human consequences.",
            active: true
        },
        {
            id: "religion-spirituality",
            name: "Religion & Spirituality",
            slug: "religion-spirituality",
            type: "non-fiction",
            description: "Thoughtful explorations of faith, belief, spiritual practice and the search for meaning.",
            active: true
        },
        {
            id: "travel",
            name: "Travel",
            slug: "travel",
            type: "non-fiction",
            description: "Immersive journeys that reveal places, cultures and the meaning discovered along the way.",
            active: true
        },
        {
            id: "education",
            name: "Education",
            slug: "education",
            type: "non-fiction",
            description: "Ideas and practical insight that deepen learning, teaching and educational opportunity.",
            active: true
        },
        {
            id: "current-affairs",
            name: "Current Affairs",
            slug: "current-affairs",
            type: "non-fiction",
            description: "Timely analysis of the social, political and cultural questions shaping public life.",
            active: true
        },
        {
            id: "science-nature",
            name: "Science & Nature",
            slug: "science-nature",
            type: "non-fiction",
            description: "Clear and engaging work that makes scientific ideas and the natural world accessible.",
            active: true
        },
        {
            id: "distinguished-author-award",
            name: "Distinguished Author Award",
            slug: "distinguished-author-award",
            type: "non-fiction",
            description: "A special recognition for an author whose work, dedication, and publishing journey show meaningful literary achievement.",
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
