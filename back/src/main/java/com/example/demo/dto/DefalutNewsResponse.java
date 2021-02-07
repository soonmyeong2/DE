package com.example.demo.dto;

import lombok.Data;

import java.util.List;
@Data
public class DefalutNewsResponse {
    private List<ReviewDTO> reviewList ;
    private int num;
}
