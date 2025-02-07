export const ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png'
] as const;

export const isImageFile = (fileName: string): boolean => {
    return /\.(jpg|jpeg|png|gif)$/i.test(fileName);
};

export const isPdfFile = (fileName: string): boolean => {
    return /\.pdf$/i.test(fileName);
};

export const isWordFile = (fileName: string): boolean => {
    return /\.(doc|docx)$/i.test(fileName);
};

export const getMimeType = (fileName: string): string => {
    if (isImageFile(fileName)) {
        if (fileName.toLowerCase().endsWith('.png')) return 'image/png';
        return 'image/jpeg';
    }
    if (isPdfFile(fileName)) return 'application/pdf';
    if (isWordFile(fileName)) {
        if (fileName.toLowerCase().endsWith('.docx')) return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        return 'application/msword';
    }
    return 'application/octet-stream';
};

export const validateFile = (file: File, maxSize: number): string | null => {
    if (!ALLOWED_TYPES.includes(file.type as typeof ALLOWED_TYPES[number])) {
        return 'File type not supported';
    }
    if (file.size > maxSize) {
        return 'File size exceeds limit';
    }
    return null;
}; 