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
  }
];
