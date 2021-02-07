package com.example.demo.service;

import com.example.demo.dao.BoardDAO;
import com.example.demo.dto.BoardDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BoardService {

    @Autowired
    private BoardDAO boardDAO;

    public List<BoardDTO> getBoardList(){

        return boardDAO.selectBoardList();

    }

}
