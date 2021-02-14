package com.example.demo.dto;


import lombok.Data;

@Data
public class CommentDTO {
    private String text;
    private String name;
    private String password;
    private int id;

}