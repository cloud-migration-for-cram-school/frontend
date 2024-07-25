export interface BasicInfo {
  dateAndTime: string;
  subjectName: string;
  teacherName: string;
  progressInSchool: string;
  homeworkProgress: string;
  homeworkAccuracy: string;
}

export interface Communication {
  forNextTeacher: string;
  fromDirector: string;
}

export interface TestReview {
  testAccuracy: string;
  classOverallStatus: string;
  rationale: string;
}

export interface LessonDetail {
  material: string;
  chapter: string;
  accuracy: string;
}

export interface LessonDetails {
  lessons: LessonDetail[];
  strengthsAndAreasForImprovement: string;
}

export interface HomeworkTask {
  material: string;
  rangeAndPages: string;
}

export interface HomeworkAssignment {
  day: string;
  tasks: HomeworkTask[];
}

export interface Homework {
  assignments: HomeworkAssignment[];
  advice: string;
  noteForNextSession: string;
}

export interface Test {
  material: string;
  chapter: string;
  rangeAndPages: string;
}

export interface LessonPlan {
  ifTestOK: string;
  ifTestNG: string;
}

export interface SheetData {
  basicInfo: BasicInfo;
  communication: Communication;
  testReview: TestReview;
  lessonDetails: LessonDetails;
  homework: Homework;
  nextTest: Test[];
  studentStatus: string;
  lessonPlan: LessonPlan;
}
