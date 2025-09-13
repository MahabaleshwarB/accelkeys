package com.AccelKeys.controller;


import com.AccelKeys.dto.LessonsRequest;
import com.AccelKeys.service.LessonsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user/lessons")
public class LessonsController {

    @Autowired
    LessonsService lessonsService;

    @GetMapping("/all")
    public List<LessonsRequest> getLessons() {
        return lessonsService.getAllLessons();
    }

    @GetMapping("/{id}")
    public List<LessonsRequest> getLessonById(@PathVariable Long id) {
        return lessonsService.getLessonTextById(id);

    }



}
