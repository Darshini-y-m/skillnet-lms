export interface Video {
  title: string;
  url: string;
}

export interface Course {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  price: number;
  instructor: string;
  description: string;
  thumbnail: string;
  category: string;
  hours: number;
  videos: Video[];
}

const placeholderVideos: Video[] = [
  { title: "Intro and Setup", url: "https://www.youtube.com/embed/UB1O30fR-EE" },
  { title: "Core Concepts 1", url: "https://www.youtube.com/embed/pQN-pnXPaVg" },
  { title: "Core Concepts 2", url: "https://www.youtube.com/embed/fNcJuPIZ2WE" },
  { title: "Deep Dive: Part A", url: "https://www.youtube.com/embed/yfoY53QXEnI" },
  { title: "Deep Dive: Part B", url: "https://www.youtube.com/embed/JJSoEo8JSnc" },
  { title: "Advanced Syntax", url: "https://www.youtube.com/embed/jV8B24rSN5o" },
  { title: "Best Practices", url: "https://www.youtube.com/embed/srvUrASNj0s" },
  { title: "Common Mistakes", url: "https://www.youtube.com/embed/zHUpx90NerM" },
  { title: "Project Walkthrough 1", url: "https://www.youtube.com/embed/gYzHS-n2gqU" },
  { title: "Project Walkthrough 2", url: "https://www.youtube.com/embed/1Rs2ND1ryYc" }
];

export const courses: Course[] = [
  {
    id: "course-1",
    title: "HTML & CSS Fundamentals",
    level: "Beginner",
    price: 199,
    instructor: "Elsa Dev",
    description: "Learn HTML & CSS from scratch to build responsive, beautiful layouts.",
    thumbnail: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&h=400&fit=crop",
    category: "Web Dev",
    hours: 10,
    videos: placeholderVideos
  },
  {
    id: "course-2",
    title: "JavaScript Essentials",
    level: "Beginner",
    price: 299,
    instructor: "JS Snow",
    description: "Master variables, loops, DOM manipulation and dynamic programming.",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    category: "Web Dev",
    hours: 15,
    videos: placeholderVideos.map(v => ({ ...v, url: "https://www.youtube.com/embed/W6NZfCO5SIk" }))
  },
  {
    id: "course-3",
    title: "React Web Masterclass",
    level: "Intermediate",
    price: 499,
    instructor: "React Ice",
    description: "Build robust, scalable single page applications using React Hooks.",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&h=400&fit=crop",
    category: "Web Dev",
    hours: 22,
    videos: placeholderVideos.map(v => ({ ...v, url: "https://www.youtube.com/embed/bMknfKXIFA8" }))
  },
  {
    id: "course-4",
    title: "Node.js Backend Deepdive",
    level: "Intermediate",
    price: 599,
    instructor: "Ryan D.",
    description: "Architect complete REST APIs and databases using full-stack JavaScript.",
    thumbnail: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=600&h=400&fit=crop",
    category: "Backend",
    hours: 28,
    videos: placeholderVideos.map(v => ({ ...v, url: "https://www.youtube.com/embed/Oe421EPjeBE" }))
  },
  {
    id: "course-5",
    title: "System Design / Advanced Web",
    level: "Advanced",
    price: 999,
    instructor: "Alex Xu",
    description: "Scale applications to millions of users, load balance, and isolate microservices.",
    thumbnail: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
    category: "Architecture",
    hours: 45,
    videos: placeholderVideos.map(v => ({ ...v, url: "https://www.youtube.com/embed/K0Ta65OqQkY" }))
  },
  // ------------------------------------------------------------------------------------------
  // BEGINNER EXPANSION
  // ------------------------------------------------------------------------------------------
  {
    id: "course-6",
    title: "C Programming Basics",
    level: "Beginner",
    price: 0,
    instructor: "Dennis R.",
    description: "Learn memory management, pointers, and foundational programming in C.",
    thumbnail: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600&h=400&fit=crop",
    category: "Programming",
    hours: 12,
    videos: placeholderVideos
  },
  {
    id: "course-7",
    title: "Java Fundamentals",
    level: "Beginner",
    price: 149,
    instructor: "James G.",
    description: "Object-oriented programming principles using the versatile Java language.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&h=400&fit=crop",
    category: "Programming",
    hours: 18,
    videos: placeholderVideos
  },
  {
    id: "course-8",
    title: "Web Design with Figma",
    level: "Beginner",
    price: 199,
    instructor: "Designer Frost",
    description: "Create stunning UI/UX layouts and interactive prototypes without writing code.",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop",
    category: "Design",
    hours: 8,
    videos: placeholderVideos
  },
  {
    id: "course-9",
    title: "Introduction to Cybersecurity",
    level: "Beginner",
    price: 249,
    instructor: "Alice Cyber",
    description: "Protect systems, networks, and programs from digital attacks and threats.",
    thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
    category: "Security",
    hours: 14,
    videos: placeholderVideos
  },
  {
    id: "course-10",
    title: "Linux Basics",
    level: "Beginner",
    price: 0,
    instructor: "Linus T.",
    description: "Master the command line and confidently navigate any Unix-based environment.",
    thumbnail: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop",
    category: "System",
    hours: 10,
    videos: placeholderVideos
  },
  // ------------------------------------------------------------------------------------------
  // INTERMEDIATE EXPANSION
  // ------------------------------------------------------------------------------------------
  {
    id: "course-11",
    title: "Advanced JavaScript Patterns",
    level: "Intermediate",
    price: 399,
    instructor: "Kyle S.",
    description: "Master closures, prototype delegation, async iteration, and functional programming.",
    thumbnail: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=600&h=400&fit=crop",
    category: "Web Dev",
    hours: 20,
    videos: placeholderVideos
  },
  {
    id: "course-12",
    title: "MongoDB & NoSQL Databases",
    level: "Intermediate",
    price: 349,
    instructor: "DB Admin",
    description: "Schema design, complex aggregations, and scaling document-based databases.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    category: "Database",
    hours: 15,
    videos: placeholderVideos
  },
  {
    id: "course-13",
    title: "Express.js Deep Dive",
    level: "Intermediate",
    price: 399,
    instructor: "Ryan D.",
    description: "Middleware architecture, routing strategies, and RESTful API best practices.",
    thumbnail: "https://images.unsplash.com/photo-1623282033815-40b05d96c903?w=600&h=400&fit=crop",
    category: "Backend",
    hours: 16,
    videos: placeholderVideos
  },
  {
    id: "course-14",
    title: "TypeScript Essentials",
    level: "Intermediate",
    price: 299,
    instructor: "Anders H.",
    description: "Generics, advanced types, and strictly-typed JavaScript development.",
    thumbnail: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop",
    category: "Web Dev",
    hours: 12,
    videos: placeholderVideos
  },
  {
    id: "course-15",
    title: "Mobile App Development (React Native)",
    level: "Intermediate",
    price: 499,
    instructor: "Native Snow",
    description: "Compile to both iOS and Android from a single JavaScript codebase.",
    thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
    category: "Mobile",
    hours: 25,
    videos: placeholderVideos
  },
  // ------------------------------------------------------------------------------------------
  // ADVANCED EXPANSION
  // ------------------------------------------------------------------------------------------
  {
    id: "course-16",
    title: "Machine Learning Fundamentals",
    level: "Advanced",
    price: 999,
    instructor: "Andrew N.",
    description: "Linear regression, neural networks, and deploying predictive models.",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&h=400&fit=crop",
    category: "AI",
    hours: 35,
    videos: placeholderVideos
  },
  {
    id: "course-17",
    title: "DevOps & CI/CD Pipelines",
    level: "Advanced",
    price: 799,
    instructor: "Pipeline Pro",
    description: "Automate testing, containerization, and deployments using modern DevOps toolchains.",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
    category: "DevOps",
    hours: 22,
    videos: placeholderVideos
  },
  {
    id: "course-18",
    title: "Microservices Architecture",
    level: "Advanced",
    price: 899,
    instructor: "Martin F.",
    description: "Decoupling monoliths, event-driven architectures, and distributed systems.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    category: "Architecture",
    hours: 30,
    videos: placeholderVideos
  },
  {
    id: "course-19",
    title: "Cloud Computing with AWS",
    level: "Advanced",
    price: 1199,
    instructor: "Cloud Walker",
    description: "Master EC2, S3, Lambdas, and architecting highly available cloud infrastructures.",
    thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    category: "Cloud",
    hours: 40,
    videos: placeholderVideos
  },
  {
    id: "course-20",
    title: "Kubernetes for Developers",
    level: "Advanced",
    price: 1299,
    instructor: "Kube Master",
    description: "Container orchestration, auto-scaling clusters, and managing complex workloads.",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=400&fit=crop",
    category: "DevOps",
    hours: 32,
    videos: placeholderVideos
  }
];
