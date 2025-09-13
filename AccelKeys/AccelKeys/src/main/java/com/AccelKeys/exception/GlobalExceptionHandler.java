package com.AccelKeys.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.Collections;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<?> handleEmailAlreadyExists(EmailAlreadyExistsException ex) {
        return ResponseEntity
                .status(HttpStatus.CONFLICT) // 409
                .body(Collections.singletonMap("error", ex.getMessage()));
    }

    @ExceptionHandler
    public ResponseEntity<?> handleUserNotFound(UserNameNotFoundException ex){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Collections.singletonMap("error",ex.getMessage()));
    }

    // Optional: catch generic errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleOtherExceptions(Exception ex) {
        return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Collections.singletonMap("error", "Something went wrong"));
    }
}
