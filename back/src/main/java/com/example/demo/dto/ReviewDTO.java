package com.example.demo.dto;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.lang.reflect.Array;
import java.util.List;

@Document(collection = "reviews")
@Data
public class ReviewDTO {
    @Id
    private String _id;
    private String keyword;
    private String reviewContentClassType;
    private String reviewContent;
    private String createDate;
    private boolean repurchase;
    private long reviewScore;
    private String writerMemberId;
    private String writerMemberProfileImageUrl;
    private String channelServiceType;
    private String productName;
    private String productOptionContent;
    private String productUrl;
    private List<Object> reviewAttaches;
    private String channelName;
    private List<CommentDTO> comments;


}
