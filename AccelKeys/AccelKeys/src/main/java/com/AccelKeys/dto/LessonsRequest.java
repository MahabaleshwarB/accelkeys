package com.AccelKeys.dto;


public class LessonsRequest {


    private Long lessonId;
    private String lessonName;
    private String lessonText;

    public LessonsRequest(Long lessonId, String lessonName, String lessonText) {
        this.lessonId = lessonId;
        this.lessonName = lessonName;
        this.lessonText = lessonText;
    }

    public Long getLessonId() {
        return lessonId;
    }

    public void setLessonId(Long lessonId) {
        this.lessonId = lessonId;
    }

    public String getLessonName() {
        return lessonName;
    }

    public void setLessonName(String lessonName) {
        this.lessonName = lessonName;
    }

    public String getLessonText() {
        return lessonText;
    }

    public void setLessonText(String lessonText) {
        this.lessonText = lessonText;
    }


}
