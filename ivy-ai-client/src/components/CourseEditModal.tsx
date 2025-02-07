import { Course, Section } from '../__generated__/graphql';
import { Clock, Edit3, MapPin, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';

interface CourseEditModalProps {
    course: Course;
    isOpen: boolean;
    onClose: () => void;
    onSave: (updatedCourse: Course) => void;
}

export function CourseEditModal({ course, isOpen, onClose, onSave }: CourseEditModalProps) {
    const [editedCourse, setEditedCourse] = useState<Course>(course);

    const handleSave = () => {
        onSave(editedCourse);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal modal-open">
            <div className="modal-box max-w-3xl w-full">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Edit Course Details</h3>
                    <button className="btn btn-ghost btn-sm btn-circle" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Course Basic Info */}
                <div className="form-control gap-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="label">
                                <span className="label-text">Course Code</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={editedCourse.code}
                                onChange={(e) => setEditedCourse({ ...editedCourse, code: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="label">
                                <span className="label-text">Term</span>
                            </label>
                            <input
                                type="text"
                                className="input input-bordered w-full"
                                value={editedCourse.term || ''}
                                onChange={(e) => setEditedCourse({ ...editedCourse, term: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Course Name</span>
                        </label>
                        <input
                            type="text"
                            className="input input-bordered w-full"
                            value={editedCourse.name || ''}
                            onChange={(e) => setEditedCourse({ ...editedCourse, name: e.target.value })}
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea
                            className="textarea textarea-bordered w-full"
                            value={editedCourse.description || ''}
                            onChange={(e) => setEditedCourse({ ...editedCourse, description: e.target.value })}
                        />
                    </div>
                </div>

                {/* Sections */}
                <div className="mb-6">
                    <div className="flex justify-between items-center mb-3">
                        <h4 className="font-semibold">Course Sections</h4>
                        <button 
                            className="btn btn-ghost btn-sm"
                            onClick={() => {
                                const newSection: Partial<Section> = {
                                    section_id: `${editedCourse.code}-${(editedCourse.sections?.length || 0) + 1}`,
                                    schedule: []
                                };
                                setEditedCourse({
                                    ...editedCourse,
                                    sections: [...(editedCourse.sections || []), newSection as Section]
                                });
                            }}
                        >
                            Add Section
                        </button>
                    </div>
                    <div className="space-y-3">
                        {editedCourse.sections?.map((section, index) => (
                            <div key={section.section_id} className="card bg-base-200">
                                <div className="card-body p-4">
                                    <div className="flex justify-between items-start">
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text">Section ID</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="input input-bordered input-sm"
                                                value={section.section_id || ''}
                                                onChange={(e) => {
                                                    const updatedSections = [...(editedCourse.sections || [])];
                                                    updatedSections[index] = {
                                                        ...section,
                                                        section_id: e.target.value
                                                    };
                                                    setEditedCourse({ ...editedCourse, sections: updatedSections });
                                                }}
                                            />
                                        </div>
                                        <button
                                            className="btn btn-ghost btn-sm text-error"
                                            onClick={() => {
                                                const updatedSections = [...(editedCourse.sections || [])];
                                                updatedSections.splice(index, 1);
                                                setEditedCourse({ ...editedCourse, sections: updatedSections });
                                            }}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Schedule */}
                                    <div className="mt-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <h5 className="text-sm font-medium">Schedule</h5>
                                            <button
                                                className="btn btn-ghost btn-xs"
                                                onClick={() => {
                                                    const updatedSections = [...(editedCourse.sections || [])];
                                                    updatedSections[index] = {
                                                        ...section,
                                                        schedule: [
                                                            ...(section.schedule || []),
                                                            { day: '', start_time: '', end_time: '', location: '', type: '' }
                                                        ]
                                                    };
                                                    setEditedCourse({ ...editedCourse, sections: updatedSections });
                                                }}
                                            >
                                                Add Time
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {section.schedule?.map((time, timeIndex) => (
                                                <div key={timeIndex} className="grid grid-cols-5 gap-2">
                                                    <input
                                                        type="text"
                                                        placeholder="Day"
                                                        className="input input-bordered input-xs"
                                                        value={time.day || ''}
                                                        onChange={(e) => {
                                                            const updatedSections = [...(editedCourse.sections || [])];
                                                            const updatedSchedule = [...(section.schedule || [])];
                                                            updatedSchedule[timeIndex] = {
                                                                ...time,
                                                                day: e.target.value
                                                            };
                                                            updatedSections[index] = {
                                                                ...section,
                                                                schedule: updatedSchedule
                                                            };
                                                            setEditedCourse({ ...editedCourse, sections: updatedSections });
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Start Time"
                                                        className="input input-bordered input-xs"
                                                        value={time.start_time || ''}
                                                        onChange={(e) => {
                                                            const updatedSections = [...(editedCourse.sections || [])];
                                                            const updatedSchedule = [...(section.schedule || [])];
                                                            updatedSchedule[timeIndex] = {
                                                                ...time,
                                                                start_time: e.target.value
                                                            };
                                                            updatedSections[index] = {
                                                                ...section,
                                                                schedule: updatedSchedule
                                                            };
                                                            setEditedCourse({ ...editedCourse, sections: updatedSections });
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="End Time"
                                                        className="input input-bordered input-xs"
                                                        value={time.end_time || ''}
                                                        onChange={(e) => {
                                                            const updatedSections = [...(editedCourse.sections || [])];
                                                            const updatedSchedule = [...(section.schedule || [])];
                                                            updatedSchedule[timeIndex] = {
                                                                ...time,
                                                                end_time: e.target.value
                                                            };
                                                            updatedSections[index] = {
                                                                ...section,
                                                                schedule: updatedSchedule
                                                            };
                                                            setEditedCourse({ ...editedCourse, sections: updatedSections });
                                                        }}
                                                    />
                                                    <input
                                                        type="text"
                                                        placeholder="Location"
                                                        className="input input-bordered input-xs"
                                                        value={time.location || ''}
                                                        onChange={(e) => {
                                                            const updatedSections = [...(editedCourse.sections || [])];
                                                            const updatedSchedule = [...(section.schedule || [])];
                                                            updatedSchedule[timeIndex] = {
                                                                ...time,
                                                                location: e.target.value
                                                            };
                                                            updatedSections[index] = {
                                                                ...section,
                                                                schedule: updatedSchedule
                                                            };
                                                            setEditedCourse({ ...editedCourse, sections: updatedSections });
                                                        }}
                                                    />
                                                    <button
                                                        className="btn btn-ghost btn-xs text-error"
                                                        onClick={() => {
                                                            const updatedSections = [...(editedCourse.sections || [])];
                                                            const updatedSchedule = [...(section.schedule || [])];
                                                            updatedSchedule.splice(timeIndex, 1);
                                                            updatedSections[index] = {
                                                                ...section,
                                                                schedule: updatedSchedule
                                                            };
                                                            setEditedCourse({ ...editedCourse, sections: updatedSections });
                                                        }}
                                                    >
                                                        <X className="w-3 h-3" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>
                    <button className="btn btn-primary" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
} 