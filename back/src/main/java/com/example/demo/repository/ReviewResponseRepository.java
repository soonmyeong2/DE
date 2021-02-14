package com.example.demo.repository;

import com.example.demo.dto.ReviewDTO;
import com.example.demo.dto.ReviewResponseDTO;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewResponseRepository extends MongoRepository<ReviewResponseDTO,String> {
    List<ReviewResponseDTO> findAllByKeyword(String keyword);


}