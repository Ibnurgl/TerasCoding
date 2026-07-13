import type { Course } from "@/lib/courseData";

/**
 * Consistent lessonId format used as the Firestore progress document key
 * (via the existing `saveProgress` / `getProgress` functions in lib/firestore.ts).
 * Includes courseId so lessons from different courses never collide.
 */
export function getLessonId(
  courseId: string,
  sectionIdx: number,
  lessonIdx: number,
) {
  return `${courseId}_s${sectionIdx}_l${lessonIdx}`;
}

export interface ContentLessonRef {
  sectionIdx: number;
  lessonIdx: number;
}

/**
 * Flatten only the lessons that actually have content, in curriculum order.
 * Lessons without content ("coming soon") are excluded since they can never
 * be completed or unlocked — they stay in their existing disabled state.
 */
export function flattenContentLessons(course: Course): ContentLessonRef[] {
  const flat: ContentLessonRef[] = [];
  course.curriculum.forEach((section, sectionIdx) => {
    section.lessons.forEach((lesson, lessonIdx) => {
      if (lesson.content) flat.push({ sectionIdx, lessonIdx });
    });
  });
  return flat;
}