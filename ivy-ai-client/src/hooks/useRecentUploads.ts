import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { RecentUpload } from '../types/timetable';

export const useRecentUploads = (userId: string | null) => {
    const [recentUploads, setRecentUploads] = useState<RecentUpload[]>([]);
    const [loadingUploads, setLoadingUploads] = useState(false);

    useEffect(() => {
        const fetchRecentUploads = async () => {
            if (!userId) return;

            setLoadingUploads(true);
            try {
                const { data: files, error } = await supabase.storage.from('schedules').list(userId, {
                    limit: 5,
                    sortBy: { column: 'created_at', order: 'desc' },
                });

                if (error) throw error;

                if (files) {
                    const uploadsWithUrls = await Promise.all(
                        files.map(async (file) => {
                            const {
                                data: { publicUrl },
                            } = supabase.storage.from('schedules').getPublicUrl(`${userId}/${file.name}`);

                            return {
                                fileId: `${userId}/${file.name}`,
                                fileName: file.name.split('-')[0],
                                uploadedAt: file.created_at || new Date().toISOString(),
                                size: file.metadata?.size || 0,
                                url: publicUrl,
                                type: file.metadata?.mimetype || 'application/octet-stream',
                            };
                        })
                    );
                    setRecentUploads(uploadsWithUrls);
                }
            } catch (error) {
                console.error('Error fetching recent uploads:', error);
            } finally {
                setLoadingUploads(false);
            }
        };

        fetchRecentUploads();
    }, [userId]);

    return {
        recentUploads,
        loadingUploads,
    };
}; 