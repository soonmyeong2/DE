package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.ReviewResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.aggregation.SampleOperation;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ReviewResponseRepository reviewResponseRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    Random rand = new Random();

    public List<ReviewResponseDTO> getDefalut(List<String> searchInfo,Long num) {

//        SampleOperation matchStage = Aggregation.sample(9);
//        Aggregation aggregation = Aggregation.newAggregation(matchStage);
//        AggregationResults results = mongoTemplate.aggregate(aggregation, "reviews", ReviewResponseDTO.class);



//        Long reviewCount = mongoTemplate.estimatedCount(ReviewResponseDTO.class);
        List<ReviewResponseDTO> resultList = new ArrayList<>();

        Query query = null;
        int cnt = 3;

        for (int i = 0; i < 9; i++) {

            if(searchInfo.size() > i && rand.nextBoolean()){

                query = new Query();
                query.addCriteria(Criteria.where("keyword").is(searchInfo.get(i)));
                Long reviewCount =  mongoTemplate.count(query,ReviewResponseDTO.class);
                if (reviewCount - i - num >= 0) {
                    resultList.add(mongoTemplate.findOne(query.limit(1).skip(reviewCount- i - num), ReviewResponseDTO.class));
                    continue;
                }

            }

            cnt +=1;


        }
        System.out.println(123);
        for (int i = cnt; i > 0; i--) {
            query = new Query();
            query.addCriteria(Criteria.where("randomId").gt(rand.nextFloat()));
            ReviewResponseDTO reviewResponseDTO = mongoTemplate.findOne(query, ReviewResponseDTO.class);
            if (reviewResponseDTO ==null){
                query = new Query();
                query.addCriteria(Criteria.where("randomId").lte(rand.nextFloat()));
                reviewResponseDTO = mongoTemplate.findOne(query, ReviewResponseDTO.class);
            }

            System.out.println(1234);
            resultList.add(reviewResponseDTO);

        }


        return resultList;
    }

//    public boolean getPossible(String keyword, int page){
//        Query query = new Query();
//        query.addCriteria(Criteria.where("keyword").is(keyword));
//        Long reviewCount =  mongoTemplate.count(query,ReviewResponseDTO.class);
//        System.out.println(reviewCount);
//        if(reviewCount >= (page+1)*180){
//            return true;
//        }
//        return false;
//    }
    public List<ReviewResponseDTO> getSearch(String keyword,int page){
        List<ReviewResponseDTO> reviewResponseDTOList = new ArrayList<>();
        int randomNums[] = new int[9];
        Query query = new Query();
        query.addCriteria(Criteria.where("keyword").is(keyword));
        for (int i = 0; i < 9; i++) {
            randomNums[i] = (int)(Math.random()*180);

            for (int j = 0; j < i; j++) {
                if(randomNums[i] ==randomNums[j]){
                    i--;
                    break;
                }
            }

        }

        for (int i = 0; i < 9; i++) {
            reviewResponseDTOList.add(mongoTemplate.findOne(query.skip(page * 180+randomNums[i]), ReviewResponseDTO.class));
        }

        reviewResponseDTOList = mongoTemplate.find(query.skip(page * 9).limit(9), ReviewResponseDTO.class);
        return  reviewResponseDTOList;
    }
    public List<ReviewResponseDTO> getLike(List<String> likeInfo, int page){
        List<ReviewResponseDTO> reviewResponseDTOList = new ArrayList<>();
        for (int i = page*9; i < likeInfo.size(); i++) {
            reviewResponseDTOList.add(reviewResponseRepository.findById(likeInfo.get(i)).get());
        }

        return reviewResponseDTOList;
    }
    public List<CommentResponseDTO> createComment(String reviewId, CommentDTO comment) {
        ReviewDTO review = reviewRepository.findById(reviewId).get();
        List<CommentDTO> commentList = review.getComments();
        int commentId = 0;
        if (commentList== null || commentList.size()==0 ){
            commentList = new ArrayList<>();
        } else {
            commentId = commentList.get(commentList.size()-1).getId() +1;
        }
        comment.setId(commentId);
        commentList.add(comment);
        review.setComments(commentList);
        reviewRepository.save(review);
        ReviewResponseDTO reviewResponseDTO = reviewResponseRepository.findById(reviewId).get();
        List<CommentResponseDTO> commentResponseDTOListList = reviewResponseDTO.getComments();
        return commentResponseDTOListList;

    }
    public List<CommentResponseDTO> deleteComment(String reviewId, int commentId,String password) {
        ReviewDTO review = reviewRepository.findById(reviewId).get();
        List<CommentDTO> commentList = review.getComments();

        for (int i = 0; i <commentList.size() ; i++) {
            if (commentList.get(i).getId() == commentId){
                System.out.println(commentList.get(i).getPassword());

                System.out.println(password);
                if (commentList.get(i).getPassword().equals(password) ) {

                    System.out.println(1);
                    commentList.remove(i);
                    review.setComments(commentList);
                    reviewRepository.save(review);
                    ReviewResponseDTO reviewResponseDTO = reviewResponseRepository.findById(reviewId).get();
                    List<CommentResponseDTO> commentResponseDTOListList = reviewResponseDTO.getComments();

                    System.out.println(reviewRepository.findById(reviewId).get());
                    System.out.println(commentResponseDTOListList);
                    return commentResponseDTOListList;
                }
                break;
            }
        }


        return null;

    }

}
