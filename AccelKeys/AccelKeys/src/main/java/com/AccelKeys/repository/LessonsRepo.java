package com.AccelKeys.repository;

import com.AccelKeys.entity.Lessons;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LessonsRepo extends JpaRepository<Lessons, Long> {
}
