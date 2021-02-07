package com.example.demo.dao;

import com.example.demo.dto.BoardDTO;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BoardDAO {

    @Autowired
    private SqlSession sqlSession;

    public List<BoardDTO> selectBoardList() {
        List<BoardDTO> boardList = sqlSession.selectList("board.getBoardList");
        return  boardList;

    }
}
