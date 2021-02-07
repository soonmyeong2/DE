package com.example.demo.repository;

import com.example.demo.dto.DefalutNewsDTO;
import com.example.demo.dto.ReviewDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ReviewRepository extends MongoRepository<ReviewDTO,String> {
    List<ReviewDTO> findAllByKeyword( String keyword);


}
