import React from 'react';
import Navbar from '../components/Navbar';
import AIMentor from '../components/AIMentor';
import '../styles/globals.css';

export const metadata = {
  title: 'SkillNet | Where Curiosity Meets Skill',
  description: 'A magical winter-themed learning platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen pt-[72px]">
          {children}
        </main>
        <AIMentor />
      </body>
    </html>
  );
}