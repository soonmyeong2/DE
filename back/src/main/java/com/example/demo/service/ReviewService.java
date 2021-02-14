package com.example.demo.service;

import com.example.demo.dto.*;
import com.example.demo.dto.DefalutNewsResponse;
import com.example.demo.repository.ReviewRepository;
import com.example.demo.repository.ReviewResponseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class ReviewService {
    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private ReviewResponseRepository reviewResponseRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<ReviewDTO> getAll(){
        return  reviewRepository.findAll();
    }

    public List<ReviewDTO> getSearch(String keyword,int page){
        Query query = new Query();
        query.addCriteria(Criteria.where("keyword").is(keyword));
        List<ReviewDTO> li = mongoTemplate.find(query.limit(9).skip(page*9), ReviewDTO.class);
        return  li;
    }
    public DefalutNewsResponse getDefaultNewsReviewList(DefalutNewsDTO defalutNewsDTO,int num){
        List<ReviewDTO> reviewList = new ArrayList<>();
        List<String> reviewsId = defalutNewsDTO.getReviews();
        Random random = new Random();
        for (int i = 0; i < 20; i++) {
            num += random.nextInt(4)+1;
            ReviewDTO reviewDTO = reviewRepository.findById(reviewsId.get(num)).get();
            reviewList.add(reviewDTO);
        }
        DefalutNewsResponse defalutNewsResponse = new DefalutNewsResponse();
        defalutNewsResponse.setReviewList(reviewList);
        defalutNewsResponse.setNum(num);

        return defalutNewsResponse;
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