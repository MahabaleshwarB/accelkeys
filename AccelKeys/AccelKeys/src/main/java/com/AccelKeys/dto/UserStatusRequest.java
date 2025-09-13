package com.AccelKeys.dto;


public class UserStatusRequest {

    private Long id;
    private Long completedLessons;
    private String wpm;
    private String accuracy;

    public UserStatusRequest() {}

    public UserStatusRequest(Long id, Long completedLessons, String wpm, String accuracy) {
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
