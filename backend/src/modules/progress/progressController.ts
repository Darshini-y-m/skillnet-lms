import { Response } from 'express';
import db from '../../config/db';
import { AuthRequest } from '../../middleware/authMiddleware';

export const getProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { videoId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const [progress]: any = await db.execute(
      'SELECT last_position_seconds, is_completed FROM video_progress WHERE user_id = ? AND video_id = ?',
      [userId, videoId]
    );

    if (progress.length === 0) {
      return res.json({
        last_position_seconds: 0,
        is_completed: false
      });
    }

    res.json({
      last_position_seconds: progress[0].last_position_seconds,
      is_completed: Boolean(progress[0].is_completed)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateProgress = async (req: AuthRequest, res: Response) => {
  try {
    const { videoId } = req.params;
    const userId = req.user?.userId;
    const { last_position_seconds = 0, is_completed = false } = req.body;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const isCompletedBoolean = Boolean(is_completed);

    // Upsert query
    await db.execute(`
      INSERT INTO video_progress (user_id, video_id, last_position_seconds, is_completed, completed_at)
      VALUES (?, ?, ?, ?, CASE WHEN ? = true THEN CURRENT_TIMESTAMP ELSE NULL END)
      ON DUPLICATE KEY UPDATE 
        last_position_seconds = ?,
        completed_at = CASE WHEN is_completed = false AND ? = true THEN CURRENT_TIMESTAMP ELSE completed_at END,
        is_completed = ?
    `, [
      userId, videoId, last_position_seconds, isCompletedBoolean, isCompletedBoolean,
      last_position_seconds, isCompletedBoolean, isCompletedBoolean
    ]);

    res.json({ message: 'Progress updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
