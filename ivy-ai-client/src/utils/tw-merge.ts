import { twMerge as twMergeOriginal } from 'tailwind-merge';

/**
 * Utility function to merge Tailwind CSS classes while handling conflicts
 * @param classes - Array of class strings or class strings separated by commas
 * @returns Merged class string with conflicts resolved
 */
export const twMerge = (...classes: string[]) => {
    return twMergeOriginal(...classes);
};

export default twMerge; 