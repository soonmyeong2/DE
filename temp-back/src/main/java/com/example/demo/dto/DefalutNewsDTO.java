package com.example.demo.dto;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "defalut_news")
@Data
public class DefalutNewsDTO {
    @Id
    private String _id;
    private String account;
    private List<String> reviews;

}
