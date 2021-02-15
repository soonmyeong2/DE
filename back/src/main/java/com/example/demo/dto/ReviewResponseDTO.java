package com.example.demo.dto;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document(collection = "reviews")
@Data
public class ReviewResponseDTO {
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
    private Object repThumbnailAttach;
    private Object repThumbnailTagNameDescription;
    private String channelName;
    private List<CommentResponseDTO> comments;
}
