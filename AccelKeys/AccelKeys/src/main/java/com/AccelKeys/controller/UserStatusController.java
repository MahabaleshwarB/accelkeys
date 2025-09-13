package com.AccelKeys.controller;

import com.AccelKeys.dto.UserStatusRequest;
import com.AccelKeys.service.UserStatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/api/user/")
public class UserStatusController {

    @Autowired
    UserStatusService userStatusService;


    @PutMapping("/userdata")
    public ResponseEntity<UserStatusRequest> updateUserData(@RequestBody UserStatusRequest userStatusRequest) {
        return new ResponseEntity<UserStatusRequest>(userStatusService.updateUserRecord(userStatusRequest), HttpStatus.OK);
    }

}
