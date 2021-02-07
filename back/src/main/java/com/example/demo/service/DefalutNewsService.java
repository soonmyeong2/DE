package com.example.demo.service;

import com.example.demo.dto.DefalutNewsDTO;
import com.example.demo.dto.ReviewDTO;
import com.example.demo.repository.DefalutNewsRepository;
import com.example.demo.repository.ReviewRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class DefalutNewsService {
    @Autowired
    private DefalutNewsRepository defalutNewsRepository;

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public DefalutNewsDTO getDefalut(){

        DefalutNewsDTO defalutNewsDTO = defalutNewsRepository.findAllByAccount("").get(0);
        if (defalutNewsDTO.getReviews().size()==0) {
            List<String> reviewsId = new ArrayList<>();
            List<ReviewDTO> reviewList =  reviewRepository.findAll();
            for (ReviewDTO review : reviewList) {
                reviewsId.add(review.get_id());

            }
            Collections.shuffle(reviewsId);
            defalutNewsDTO.setReviews(reviewsId);
            defalutNewsRepository.save(defalutNewsDTO);
        }
        return defalutNewsDTO;

    }

}
