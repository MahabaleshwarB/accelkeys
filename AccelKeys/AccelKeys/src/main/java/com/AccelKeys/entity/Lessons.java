package com.AccelKeys.entity;

import jakarta.persistence.*;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Entity
@Table(name = "lessons")
public class Lessons {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @Column(name = "lesson_name")
    String lessonName;

    @Column(name = "lesson_text")
    String lessonText;

    public Lessons() {}

    public Lessons(Long id, String lessonName, String lessonText) {
        this.id = id;
        this.lessonName = lessonName;
        this.lessonText = lessonText;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
