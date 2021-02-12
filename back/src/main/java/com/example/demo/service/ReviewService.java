package com.example.demo.service;

import com.example.demo.dto.DefalutNewsDTO;
import com.example.demo.dto.DefalutNewsResponse;
import com.example.demo.dto.ReviewDTO;
import com.example.demo.repository.ReviewRepository;
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

}
