package com.AccelKeys.service;

import com.AccelKeys.dto.UserStatusRequest;
import com.AccelKeys.entity.User;
import com.AccelKeys.entity.UserStatus;
import com.AccelKeys.repository.UserRepository;
import com.AccelKeys.repository.UserStatusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserStatusService {

    private final UserStatusRepo userStatusRepo;
    private final UserRepository userRepository;


    public UserStatusService(UserStatusRepo userStatusRepo, UserRepository userRepository) {
        this.userStatusRepo = userStatusRepo;
        this.userRepository = userRepository;
    }


    public UserStatusRequest updateUserRecord(UserStatusRequest userStatusRequests) {
        UserStatus saved = null;
        if(userRepository.existsById(userStatusRequests.getId())) {
            UserStatus userStatus = userStatusRepo.findById(userStatusRequests.getId())
                            .orElse(new UserStatus(userStatusRequests.getId(),0L, "0%", "0%"));
            userStatus.setCompletedLessons(userStatusRequests.getCompletedLessons());
            userStatus.setWpm(userStatusRequests.getWpm());
            userStatus.setAccuracy(userStatusRequests.getAccuracy());

            saved =  userStatusRepo.save(userStatus);
        }



        return new UserStatusRequest(saved.getId(), saved.getCompletedLessons(),saved.getWpm(), saved.getAccuracy());
//        return new UserStatusRequest(1L, 2L, "78", "87");
    }
}
