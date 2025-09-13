package com.AccelKeys.service;

import com.AccelKeys.dto.LessonsRequest;
import com.AccelKeys.entity.Lessons;
import com.AccelKeys.repository.LessonsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LessonsService {

    private final LessonsRepo lessonsRepo;

    public LessonsService(LessonsRepo lessonsRepo) {
        this.lessonsRepo = lessonsRepo;
    }

    public List<LessonsRequest> getAllLessons() {
        return lessonsRepo.findAll()
                .stream()
                .map(lesson ->
                    new LessonsRequest(lesson.getId(), lesson.getLessonName(), lesson.getLessonText())
                )
                .toList();

    }

    public List<LessonsRequest> getLessonTextById(Long id) {

        Lessons lessons = lessonsRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("did not find any lessons with this id"));

        return Collections.singletonList(new LessonsRequest(id, lessons.getLessonName(), lessons.getLessonText()));
    }

}
