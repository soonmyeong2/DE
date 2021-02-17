package com.example.demo.repository;

import com.example.demo.dto.ReviewDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<ReviewDTO,String> {
    List<ReviewDTO> findAllByKeyword( String keyword);


}
