package com.example.demo.controller;

import ch.qos.logback.core.CoreConstants;
import com.example.demo.dto.BoardDTO;
import com.example.demo.service.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/board")
public class BoardController {

    @Autowired
    private BoardService boardService;

    @GetMapping
    ResponseEntity<?> getBoardList(){
            List<BoardDTO> boardList = boardService.getBoardList();
            return new ResponseEntity<List>(boardList, HttpStatus.OK);

    }

}

