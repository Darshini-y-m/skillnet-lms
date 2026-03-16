import { Request, Response } from 'express';
import db from '../../config/db';
import { AuthRequest } from '../../middleware/authMiddleware';

export const getSubjects = async (req: Request, res: Response) => {
  try {
    const [subjects]: any = await db.execute('SELECT id, title, slug, description, is_published, created_at, updated_at FROM subjects WHERE is_published = true');
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSubjectById = async (req: Request, res: Response) => {
  try {
    const { subjectId } = req.params;
    const [subjects]: any = await db.execute('SELECT id, title, slug, description, is_published, created_at, updated_at FROM subjects WHERE id = ? AND is_published = true', [subjectId]);
    
    if (subjects.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    res.json(subjects[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getSubjectTree = async (req: AuthRequest, res: Response) => {
  try {
    const { subjectId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Get subject basic info
    const [subjects]: any = await db.execute('SELECT id, title FROM subjects WHERE id = ?', [subjectId]);
    if (subjects.length === 0) {
      return res.status(404).json({ error: 'Subject not found' });
    }
    const subject = subjects[0];

    // Get sections
    const [sections]: any = await db.execute('SELECT id, title, order_index FROM sections WHERE subject_id = ? ORDER BY order_index ASC', [subjectId]);

    // Get videos with user progress
    const [videos]: any = await db.execute(`
      SELECT 
        v.id, 
        v.section_id, 
        v.title, 
        v.order_index, 
        COALESCE(vp.is_completed, 0) as is_completed
      FROM videos v
      JOIN sections s ON v.section_id = s.id
      LEFT JOIN video_progress vp ON vp.video_id = v.id AND vp.user_id = ?
      WHERE s.subject_id = ?
      ORDER BY s.order_index ASC, v.order_index ASC
    `, [userId, subjectId]);

    let lockNext = false;
    const videosBySection: Record<number, any[]> = {};
    
    for (const v of videos) {
      const isCompleted = Boolean(v.is_completed);
      
      const videoNode = {
        id: v.id,
        title: v.title,
        order_index: v.order_index,
        is_completed: isCompleted,
        locked: lockNext
      };
      
      // If the current video is NOT completed, all subsequent videos should be locked
      if (!isCompleted) {
        lockNext = true;
      }
      
      if (!videosBySection[v.section_id]) {
        videosBySection[v.section_id] = [];
      }
      videosBySection[v.section_id].push(videoNode);
    }

    const sectionsTree = sections.map((sec: any) => ({
      id: sec.id,
      title: sec.title,
      order_index: sec.order_index,
      videos: videosBySection[sec.id] || []
    }));

    res.json({
      id: subject.id,
      title: subject.title,
      sections: sectionsTree
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
