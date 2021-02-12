package com.example.demo.service;

import com.example.demo.dto.DefalutNewsDTO;
import com.example.demo.dto.ReviewDTO;
import com.example.demo.repository.DefalutNewsRepository;
import com.example.demo.repository.ReviewRepository;
import org.bson.types.ObjectId;
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
public class DefalutNewsService {
    @Autowired
    private DefalutNewsRepository defalutNewsRepository;

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Map> getDefalut(){

        SampleOperation matchStage = Aggregation.sample(5);
        Aggregation aggregation = Aggregation.newAggregation(matchStage);
        AggregationResults results = mongoTemplate.aggregate(aggregation, "reviews", Map.class);
        return  results.getMappedResults();


//        DefalutNewsDTO defalutNewsDTO = defalutNewsRepository.findAllByAccount("").get(0);
//        if (defalutNewsDTO.getReviews().size()==0) {
//            List<String> reviewsId = new ArrayList<>();
//            List<ReviewDTO> reviewList =  reviewRepository.findAll();
//            for (ReviewDTO review : reviewList) {
//                reviewsId.add(review.get_id());
//
//            }
//            Collections.shuffle(reviewsId);
//            defalutNewsDTO.setReviews(reviewsId);
//            defalutNewsRepository.save(defalutNewsDTO);
//        }
//        return defalutNewsDTO;

    }

}
