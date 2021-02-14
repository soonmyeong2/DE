package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommentResponseDTO;
import com.example.demo.dto.DefalutNewsDTO;
import com.example.demo.dto.DefalutNewsResponse;
import com.example.demo.dto.ReviewDTO;
import com.example.demo.service.DefalutNewsService;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private DefalutNewsService defalutNewsService;


    @GetMapping("/search/{keyword}/{page}")
    ResponseEntity<?> getSearch(@PathVariable(value = "keyword") String keyword, @PathVariable(value = "page") int page) {


        try {

            String a = URLEncoder.encode(keyword, "UTF-8");

            URL url = new URL("https://crawler-trigger.azurewebsites.net/api/trigger?code=MNB4m3Hq8I4zQ1D9Z2Eg0BCP2mr9SONJjO6mlxJKk1liYGagjyFgJA==&keyword=" + a);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            conn.setConnectTimeout(3000); // 3초
            // 읽기 타임아웃 설정
            conn.setReadTimeout(3000); // 3초-

            //201 검색할꺼 204 이미된거
            // 요청 방식 구하기
            System.out.println("getRequestMethod():" + conn.getRequestMethod());
            // 응답 콘텐츠 유형 구하기
            System.out.println("getContentType():" + conn.getContentType());
            // 응답 코드 구하기
            System.out.println("getResponseCode():" + conn.getResponseCode());
            // 응답 메시지 구하기
            System.out.println("getResponseMessage():" + conn.getResponseMessage());

            if (conn.getResponseCode() == 201) {

                System.out.println("getResponseCode():" + conn.getResponseCode());
                conn.disconnect();
                return new ResponseEntity<>("wait", HttpStatus.OK);

            } else {
                conn.disconnect();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }


        List<ReviewDTO> reviewList = reviewService.getSearch(keyword, page);
        System.out.println(12);

        return new ResponseEntity<List<ReviewDTO>>(reviewList, HttpStatus.OK);
    }

    @GetMapping("")
    ResponseEntity<?> getReviewList() {


        List<Map> defalutNewsList = defalutNewsService.getDefalut();


        return new ResponseEntity<List<Map>>(defalutNewsList, HttpStatus.OK);

    }

    @PostMapping("/{reviewId}/comment/")
    ResponseEntity<?> createComment(@PathVariable(value = "reviewId") String reviewId, @RequestBody CommentDTO comment) {
        List<CommentResponseDTO> commentList =  reviewService.createComment(reviewId, comment);
        return new ResponseEntity<>(commentList,HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}/comment/{commentId}/{password}")
    ResponseEntity<?> deleteComment(@PathVariable(value = "reviewId") String reviewId,
                                    @PathVariable(value = "commentId") int commentId,
                                    @PathVariable(value = "password") String password
                                    ) {
        List<CommentResponseDTO> commentList =  reviewService.deleteComment(reviewId,commentId,password);
        if (commentList ==null){

            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(commentList,HttpStatus.OK);
    }
}
