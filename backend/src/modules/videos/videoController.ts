import { Response } from 'express';
import db from '../../config/db';
import { AuthRequest } from '../../middleware/authMiddleware';

export const getVideoPlayback = async (req: AuthRequest, res: Response) => {
  try {
    const { videoId } = req.params;
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // 1. Get the requested video
    const [videos]: any = await db.execute(`
      SELECT 
        v.id, v.title, v.description, v.youtube_url, v.section_id, v.order_index,
        s.subject_id
      FROM videos v
      JOIN sections s ON v.section_id = s.id
      WHERE v.id = ?
    `, [videoId]);

    if (videos.length === 0) {
      return res.status(404).json({ error: 'Video not found' });
    }

    const video = videos[0];
    const subjectId = video.subject_id;

    // 2. Get all videos for the subject to determine order and lock status
    const [allVideos]: any = await db.execute(`
      SELECT 
        v.id, 
        v.section_id, 
        v.title, 
        v.order_index as video_order,
        s.order_index as section_order,
        COALESCE(vp.is_completed, 0) as is_completed
      FROM videos v
      JOIN sections s ON v.section_id = s.id
      LEFT JOIN video_progress vp ON vp.video_id = v.id AND vp.user_id = ?
      WHERE s.subject_id = ?
      ORDER BY s.order_index ASC, v.order_index ASC
    `, [userId, subjectId]);

    let locked = false;
    let unlockReason = null;
    let prevVideoId = null;
    let nextVideoId = null;
    let targetIndex = -1;

    // Find our video in the ordered list
    for (let i = 0; i < allVideos.length; i++) {
        if (allVideos[i].id === parseInt(videoId as string)) {
            targetIndex = i;
            break;
        }
    }

    if (targetIndex > 0) {
        prevVideoId = allVideos[targetIndex - 1].id;
    }
    
    if (targetIndex < allVideos.length - 1) {
        nextVideoId = allVideos[targetIndex + 1].id;
    }

    // Determine lock status by checking if ANY previous video is incomplete
    for (let i = 0; i < targetIndex; i++) {
        if (!allVideos[i].is_completed) {
            locked = true;
            unlockReason = `Complete previous video: "${allVideos[i].title}" to unlock this.`;
            break; // First incomplete video locks everything after it
        }
    }

    // Prepare response
    const responseData: any = {
      title: video.title,
      description: video.description,
      youtube_url: locked ? null : video.youtube_url, // Hide URL if locked
      section_id: video.section_id,
      subject_id: video.subject_id,
      previous_video_id: prevVideoId,
      next_video_id: nextVideoId,
      locked: locked
    };

    if (locked) {
        responseData.unlock_reason = unlockReason;
    }

    res.json(responseData);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
