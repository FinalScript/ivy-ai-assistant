export interface Course {
    code: string;
    name: string;
    description?: string;
    term: string;
    sections: CourseSection[];
}

export interface CourseSection {
    section_id: string;
    instructor: Instructor;
    schedule: ScheduleItem[];
}

export interface Instructor {
    name: string;
    email: string;
    office: {
        location: string;
        hours: OfficeHour[];
    };
}

export interface OfficeHour {
    day: string;
    start_time: string;
    end_time: string;
    location: string;
}

export interface ScheduleItem {
    day: string;
    start_time: string;
    end_time: string;
    location: string;
    type: string;
    is_rescheduled: boolean;
}

export interface RecentUpload {
    fileId: string;
    fileName: string;
    uploadedAt: string;
    size: number;
    url?: string;
    type: string;
}

export interface ProcessingStatus {
    status: 'UPLOADING' | 'PROCESSING' | 'ERROR';
    message?: string;
    progress: number;
} 