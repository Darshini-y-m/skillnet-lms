export interface Lesson {
  id: number;
  title: string;
  videoId: string;
  duration: string;
}

export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  hours: number;
  category: string;
  thumbnail: string;
  rating?: number;
  students?: number;
  sections: Section[];
  videos?: { id: number; title: string; url: string }[];
}

export const courses: Course[] = [
  // BEGINNER
  {
    id: 1,
    title: "Python Basics",
    description: "Start your programming journey with the most versatile language.",
    instructor: "Dr. Frost",
    price: 0,
    difficulty: "Beginner",
    hours: 8,
    category: "Programming",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
    rating: 4.8,
    students: 120450,
    videos: [
      { id: 101, title: "Intro to Python", url: "https://www.youtube.com/embed/_uQrJ0TkZlc" },
      { id: 102, title: "Functions & Loops", url: "https://www.youtube.com/embed/kqtD5dpn9C8" }
    ],
    sections: [
      {
        id: 10,
        title: "Introduction",
        lessons: [
          { id: 101, title: "Python Basics", videoId: "_uQrJ0TkZlc", duration: "10:15" },
          { id: 102, title: "Functions & Loops", videoId: "kqtD5dpn9C8", duration: "15:30" },
          { id: 103, title: "Python Projects", videoId: "8ext9G7xspg", duration: "20:00" },
        ]
      }
    ]
  },
  {
    id: 2,
    title: "HTML & CSS Fundamentals",
    description: "Build beautiful web pages from scratch using modern techniques.",
    instructor: "Elsa Dev",
    price: 199,
    difficulty: "Beginner",
    hours: 12,
    category: "Web Dev",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    rating: 4.7,
    students: 85000,
    videos: [
      { id: 201, title: "Intro to HTML", url: "https://www.youtube.com/embed/UB1O30fR-EE" },
      { id: 202, title: "CSS Basics", url: "https://www.youtube.com/embed/yfoY53QXEnI" }
    ],
    sections: [
      {
        id: 20,
        title: "Web Foundations",
        lessons: [
          { id: 201, title: "HTML Basics", videoId: "pQN-pnXPaVg", duration: "12:00" },
          { id: 202, title: "CSS Styling", videoId: "1Rs2ND1ryYc", duration: "18:45" },
          { id: 203, title: "Flexbox & Grid", videoId: "fYq5JZgSscQ", duration: "25:10" },
        ]
      }
    ]
  },
  {
    id: 3,
    title: "JavaScript Essentials",
    description: "Learn the language of the web and make your sites interactive.",
    instructor: "JS Snow",
    price: 299,
    difficulty: "Beginner",
    hours: 15,
    category: "Web Dev",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    rating: 4.9,
    students: 110200,
    videos: [
      { id: 301, title: "Variables & Types", url: "https://www.youtube.com/embed/W6NZfCO5SIk" },
      { id: 302, title: "DOM Manipulation", url: "https://www.youtube.com/embed/y17RuWUpz8" }
    ],
    sections: [
      {
        id: 30,
        title: "JS Core",
        lessons: [
          { id: 301, title: "Variables & Types", videoId: "W6NZfCO5SIk", duration: "10:00" },
          { id: 302, title: "DOM Manipulation", videoId: "y17RuWUpz8", duration: "22:15" },
          { id: 303, title: "Async JS", videoId: "8aGhZQkoFbQ", duration: "16:40" },
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Git & GitHub",
    description: "Version control your code and collaborate like a pro.",
    instructor: "Linus T.",
    price: 0,
    difficulty: "Beginner",
    hours: 6,
    category: "Tools",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    rating: 4.6,
    students: 95000,
    sections: [
      {
        id: 40,
        title: "Version Control",
        lessons: [
          { id: 401, title: "Git Basics", videoId: "8JJ101D3knE", duration: "30:00" },
          { id: 402, title: "Branching", videoId: "eZGxki2R4Zg", duration: "15:20" },
          { id: 403, title: "Collaborating via GitHub", videoId: "RGOj5yH7evk", duration: "28:10" },
        ]
      }
    ]
  },

  // INTERMEDIATE
  {
    id: 5,
    title: "React Development",
    description: "Build scalable and performant modern web applications.",
    instructor: "React Ice",
    price: 699,
    difficulty: "Intermediate",
    hours: 22,
    category: "Web Dev",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    rating: 4.9,
    students: 150000,
    videos: [
      { id: 501, title: "React Intro", url: "https://www.youtube.com/embed/bMknfKXIFA8" },
      { id: 502, title: "Components & Props", url: "https://www.youtube.com/embed/SqcY0GlETPk" }
    ],
    sections: [
      {
        id: 50,
        title: "React Concepts",
        lessons: [
          { id: 501, title: "React Introduction", videoId: "bMknfKXIFA8", duration: "18:00" },
          { id: 502, title: "Components and Props", videoId: "SqcY0GlETPk", duration: "24:30" },
          { id: 503, title: "Hooks Explained", videoId: "TNhaISOUy6Q", duration: "31:15" },
        ]
      }
    ]
  },
  {
    id: 6,
    title: "Node.js Backend Development",
    description: "Build robust APIs and server-side logic using JavaScript.",
    instructor: "Ryan D.",
    price: 799,
    difficulty: "Intermediate",
    hours: 26,
    category: "Backend",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    rating: 4.8,
    students: 76000,
    videos: [
      { id: 601, title: "Node Basics", url: "https://www.youtube.com/embed/Oe421EPjeBE" },
      { id: 602, title: "Express Server", url: "https://www.youtube.com/embed/L72fhGm1tfE" }
    ],
    sections: [
      {
        id: 60,
        title: "Server Basics",
        lessons: [
          { id: 601, title: "Event Loop & Streams", videoId: "TlB_eWDSMt4", duration: "20:00" },
          { id: 602, title: "Express.js Basics", videoId: "L72fhGm1tfE", duration: "35:10" },
          { id: 603, title: "Building APIs", videoId: "pKd0Rpw7O48", duration: "40:20" },
        ]
      }
    ]
  },
  {
    id: 7,
    title: "SQL & Database Design",
    description: "Write complex queries and design normalized database schemas.",
    instructor: "Data Frost",
    price: 499,
    difficulty: "Intermediate",
    hours: 18,
    category: "Database",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    rating: 4.7,
    students: 65000,
    videos: [
      { id: 701, title: "Relational DBs", url: "https://www.youtube.com/embed/HXV3zeQKqGY" },
      { id: 702, title: "SQL Joins", url: "https://www.youtube.com/embed/27axs9dO7AE" }
    ],
    sections: [
      {
        id: 70,
        title: "SQL Mastery",
        lessons: [
          { id: 701, title: "Relational DBs", videoId: "HXV3zeQKqGY", duration: "14:15" },
          { id: 702, title: "Joins & Subqueries", videoId: "27axs9dO7AE", duration: "28:50" },
          { id: 703, title: "Database Normalization", videoId: "GFQaEYEc8_8", duration: "25:00" },
        ]
      }
    ]
  },
  {
    id: 8,
    title: "REST API Development",
    description: "Design standard and scalable RESTful APIs.",
    instructor: "Api Walker",
    price: 599,
    difficulty: "Intermediate",
    hours: 16,
    category: "Backend",
    thumbnail: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=600&h=400&fit=crop",
    rating: 4.6,
    students: 54000,
    sections: [
      {
        id: 80,
        title: "API Design",
        lessons: [
          { id: 801, title: "REST Principles", videoId: "-mN3VyJuCjM", duration: "20:00" },
          { id: 802, title: "Authentication", videoId: "mbsmsi7ls10", duration: "30:45" },
          { id: 803, title: "Rate Limiting", videoId: "qKJi2I5_Ums", duration: "18:20" },
        ]
      }
    ]
  },

  // ADVANCED
  {
    id: 9,
    title: "Machine Learning Essentials",
    description: "Learn core algorithms and prediction models.",
    instructor: "Yann L.",
    price: 1499,
    difficulty: "Advanced",
    hours: 42,
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    rating: 4.9,
    students: 210000,
    sections: [
      {
        id: 90,
        title: "ML Core",
        lessons: [
          { id: 901, title: "What is Machine Learning", videoId: "ukzFI9rgwfU", duration: "15:00" },
          { id: 902, title: "Types of Machine Learning", videoId: "GwIo3gDZCVQ", duration: "22:30" },
          { id: 903, title: "Linear Regression Explained", videoId: "nk2CQITm_eo", duration: "28:45" },
        ]
      }
    ]
  },
  {
    id: 10,
    title: "Deep Learning with Neural Networks",
    description: "Dive deep into complex neural network architectures.",
    instructor: "Dr. Hinton",
    price: 1899,
    difficulty: "Advanced",
    hours: 48,
    category: "AI",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
    rating: 4.9,
    students: 95000,
    sections: [
      {
        id: 100,
        title: "Deep Learning Concepts",
        lessons: [
          { id: 1001, title: "Neural Networks Intro", videoId: "aircAruvnKk", duration: "19:30" },
          { id: 1002, title: "Backpropagation", videoId: "Ilg3gGewQ5U", duration: "26:15" },
          { id: 1003, title: "CNNs and Vision", videoId: "YRhxdVk_sIs", duration: "35:00" },
        ]
      }
    ]
  },
  {
    id: 11,
    title: "Cloud Computing with AWS",
    description: "Design highly scalable cloud infrastructure architectures.",
    instructor: "Sky Master",
    price: 1299,
    difficulty: "Advanced",
    hours: 38,
    category: "Cloud",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    rating: 4.8,
    students: 112000,
    sections: [
      {
        id: 110,
        title: "AWS Foundations",
        lessons: [
          { id: 1101, title: "EC2 & S3", videoId: "3XFODda6YXo", duration: "22:15" },
          { id: 1102, title: "VPCs and Networking", videoId: "jZWeJPEwQ6Y", duration: "45:00" },
          { id: 1103, title: "Serverless Concepts", videoId: "Z3sqeE3R5fI", duration: "30:20" },
        ]
      }
    ]
  },
  {
    id: 12,
    title: "DevOps & CI/CD Pipelines",
    description: "Automate your deployments and build reliable systems.",
    instructor: "Penguin Proc",
    price: 1099,
    difficulty: "Advanced",
    hours: 32,
    category: "DevOps",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
    rating: 4.7,
    students: 88000,
    sections: [
      {
        id: 120,
        title: "Automation",
        lessons: [
          { id: 1201, title: "Docker Containerization", videoId: "3c-iBn73dDE", duration: "18:50" },
          { id: 1202, title: "GitHub Actions", videoId: "eB0nUzAI7M8", duration: "25:40" },
          { id: 1203, title: "Kubernetes Basics", videoId: "X48VuDVv0do", duration: "40:15" },
        ]
      }
    ]
  },
  {
    id: 13,
    title: "System Design Masterclass",
    description: "Architect systems for millions of users.",
    instructor: "Alex Xu",
    price: 1999,
    difficulty: "Advanced",
    hours: 50,
    category: "Architecture",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    rating: 4.9,
    students: 154000,
    sections: [
      {
        id: 130,
        title: "System Principles",
        lessons: [
          { id: 1301, title: "Load Balancing", videoId: "K0Ta65OqQkY", duration: "20:00" },
          { id: 1302, title: "Database Sharding", videoId: "5faMjKuBkZc", duration: "28:10" },
          { id: 1303, title: "Microservices", videoId: "CpbKcptj0rw", duration: "35:30" },
        ]
      }
    ]
  },
  {
    id: 14,
    title: "Mobile App Dev with React Native",
    description: "Write once, deploy everywhere for iOS and Android.",
    instructor: "Snow App",
    price: 899,
    difficulty: "Intermediate",
    hours: 28,
    category: "Mobile",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    rating: 4.7,
    students: 63000,
    sections: [
      {
        id: 140,
        title: "Mobile Basics",
        lessons: [
          { id: 1401, title: "React Native Setup", videoId: "0-S5a0eXPoc", duration: "15:20" },
          { id: 1402, title: "Native Components", videoId: "qSRrxpdMpVc", duration: "22:10" },
          { id: 1403, title: "Navigation", videoId: "V_r3n0q62L4", duration: "30:00" },
        ]
      }
    ]
  },
  {
    id: 15,
    title: "Data Visualization with D3",
    description: "Turn complex data objects into beautiful interactive charts.",
    instructor: "Aurora G.",
    price: 799,
    difficulty: "Intermediate",
    hours: 20,
    category: "Data",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    rating: 4.6,
    students: 42000,
    sections: [
      {
        id: 150,
        title: "Charting",
        lessons: [
          { id: 1501, title: "SVGs and D3", videoId: "_8V5o2UHG0E", duration: "12:45" },
          { id: 1502, title: "Bar and Pie Charts", videoId: "NlBt-7PuaLc", duration: "18:30" },
          { id: 1503, title: "Animations", videoId: "8jvoTV54nXw", duration: "24:10" },
        ]
      }
    ]
  },
  {
    id: 16,
    title: "Cybersecurity Fundamentals",
    description: "Protect applications from exploits and vulnerabilities.",
    instructor: "Sub Zero",
    price: 1199,
    difficulty: "Advanced",
    hours: 35,
    category: "Security",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    rating: 4.8,
    students: 76000,
    sections: [
      {
        id: 160,
        title: "Security Core",
        lessons: [
          { id: 1601, title: "Common Exploits", videoId: "inWWhr5jz18", duration: "30:00" },
          { id: 1602, title: "XSS and CSRF", videoId: "L5l9lSnNMxg", duration: "25:15" },
          { id: 1603, title: "Secure Architectures", videoId: "vHn2_xR3R98", duration: "38:40" },
        ]
      }
    ]
  }
];
