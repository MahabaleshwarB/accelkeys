package com.AccelKeys.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "user_data")
public class UserStatus {

    @Id
    @Column(name = "id")
    Long id;

    @Column(name = "completed_lessons")
    Long completedLessons;

    @Column(name = "wpm")
    String wpm;

    @Column(name = "accuracy")
    String accuracy;

    public UserStatus() {}

    public UserStatus(Long id, Long completedLessons, String wpm, String accuracy) {
        this.id = id;
        this.completedLessons = completedLessons;
        this.wpm = wpm;
        this.accuracy = accuracy;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCompletedLessons() {
        return completedLessons;
    }

    public void setCompletedLessons(Long completedLessons) {
        this.completedLessons = completedLessons;
    }

    public String getWpm() {
        return wpm;
    }

    public void setWpm(String wpm) {
        this.wpm = wpm;
    }

    public String getAccuracy() {
        return accuracy;
    }

    public void setAccuracy(String accuracy) {
        this.accuracy = accuracy;
    }

}
