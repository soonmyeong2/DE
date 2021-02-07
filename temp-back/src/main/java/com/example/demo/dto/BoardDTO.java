package com.example.demo.dto;

import lombok.Data;

public @Data
class BoardDTO {
    private Long no;
    private String title;
    private String contents;
    private int hit;
    private String regDate;
    private int groupNo;
    private int orderNo;
    private int depth;
    private Long parentNo;
    private Long userNo;
    private String userName;
}
