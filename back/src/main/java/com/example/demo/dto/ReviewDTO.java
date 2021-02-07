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
    private String id;
    private String keyword;
    private String reviewServiceType;
    private String reviewType;
    private String reviewContentClassType;
    private String reviewContent;
    private String createDate;
    private String reviewDisplayStatusType;
    private boolean repurchase;
    private long reviewScore;
    private long helpCount;
    private float reviewRankingScore;
    private String writerMemberId;
    private String writerMemberIdNo;
    private long writerMemberNo;
    private String writerMemberProfileImageUrl;
    private long checkoutMerchantNo;
    private String checkoutMerchantId;
    private long channelId;
    private String channelServiceType;
    private String orderNo;
    private String productOrderNo;
    private String productNo;
    private String productName;
    private String productOptionContent;
    private String largeCategorizeCategoryId;
    private String smallCategorizeCategoryId;
    private String detailCategorizeCategoryId;
    private String productUrl;
    private long originProductNo;
    private String eventTitle;
    private List<Object> reviewAttaches;
    private List<Long> reviewEvaluationValueSeqs;
    private String writerMemberMaskedId;
    private String profileImageSourceType;
    private Object repThumbnailAttach;
    private Object repThumbnailTagNameDescription;
    private String merchantNo;
    private String merchantName;
    private boolean isMyReview;
    private String channelName;


}
