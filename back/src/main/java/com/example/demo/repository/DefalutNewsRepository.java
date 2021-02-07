package com.example.demo.repository;

import com.example.demo.dto.DefalutNewsDTO;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DefalutNewsRepository extends MongoRepository<DefalutNewsDTO, String> {
    List<DefalutNewsDTO> findAllByAccount(String account);
}
