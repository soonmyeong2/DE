package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommentResponseDTO;
import com.example.demo.dto.ReviewDTO;
import com.example.demo.service.KafkaService;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private KafkaService kafkaService;


    @GetMapping("/search/{keyword}/{page}")
    ResponseEntity<?> getSearch(
            HttpServletRequest request,
            @RequestHeader(value="Host") String host,
            @RequestHeader(value="Origin") String origin,
            @RequestHeader(value="Referer") String referer,
            @RequestHeader(value="User-Agent") String userAgent,
            @RequestHeader(value="Accept-Encoding") String acceptEncoding,
            @RequestHeader(value="Accept") String accept,
            @PathVariable(value = "keyword") String keyword,
            @PathVariable(value = "page") int page) {
        HashMap<String, String> log = new HashMap<String, String>();
        log.put("Host", host);
        log.put("Origin", origin);
        log.put("Referer",referer );
        log.put("User-Agent",userAgent );
        log.put("Accept-Encoding",acceptEncoding );
        log.put("Accept",accept );
        log.put("User-Ip",request.getRemoteAddr() );
        log.put("event", "getSearch/"+keyword+"/" +page);

        kafkaService.sendUserLog(log);
        try {

            String a = URLEncoder.encode(keyword, "UTF-8");

            URL url = new URL("https://crawler-trigger.azurewebsites.net/api/trigger?code=MNB4m3Hq8I4zQ1D9Z2Eg0BCP2mr9SONJjO6mlxJKk1liYGagjyFgJA==&keyword=" + a);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

            conn.setConnectTimeout(3000); // 3초
            // 읽기 타임아웃 설정
            conn.setReadTimeout(3000); // 3초-


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
    ResponseEntity<?> getReviewList(HttpServletRequest request,
                                    @RequestHeader(value="Host") String host,
                                    @RequestHeader(value="Origin") String origin,
                                    @RequestHeader(value="Referer") String referer,
                                    @RequestHeader(value="User-Agent") String userAgent,
                                    @RequestHeader(value="Accept-Encoding") String acceptEncoding,
                                    @RequestHeader(value="Accept") String accept) {

        HashMap<String, String> log = new HashMap<String, String>();
        log.put("Host", host);
        log.put("Origin", origin);
        log.put("Referer",referer );
        log.put("User-Agent",userAgent );
        log.put("Accept-Encoding",acceptEncoding );
        log.put("Accept",accept );
        log.put("User-Ip",request.getRemoteAddr() );
        log.put("event", "getDefalutReviewList");

        kafkaService.sendUserLog(log);
        List<Map> defalutNewsList = reviewService.getDefalut();


        return new ResponseEntity<List<Map>>(defalutNewsList, HttpStatus.OK);

    }

    @PostMapping("/{reviewId}/comment/")
    ResponseEntity<?> createComment(HttpServletRequest request,
                                    @RequestHeader(value="Host") String host,
                                    @RequestHeader(value="Origin") String origin,
                                    @RequestHeader(value="Referer") String referer,
                                    @RequestHeader(value="User-Agent") String userAgent,
                                    @RequestHeader(value="Accept-Encoding") String acceptEncoding,
                                    @RequestHeader(value="Accept") String accept,
                                    @PathVariable(value = "reviewId") String reviewId,
                                    @RequestBody CommentDTO comment) {
        HashMap<String, String> log = new HashMap<String, String>();
        log.put("Host", host);
        log.put("Origin", origin);
        log.put("Referer",referer );
        log.put("User-Agent",userAgent );
        log.put("Accept-Encoding",acceptEncoding );
        log.put("Accept",accept );
        log.put("User-Ip",request.getRemoteAddr() );
        log.put("event", "createComment");

        kafkaService.sendUserLog(log);
        List<CommentResponseDTO> commentList =  reviewService.createComment(reviewId, comment);
        return new ResponseEntity<>(commentList,HttpStatus.OK);
    }

    @DeleteMapping("/{reviewId}/comment/{commentId}/{password}")
    ResponseEntity<?> deleteComment(HttpServletRequest request,
                                    @RequestHeader(value="Host") String host,
                                    @RequestHeader(value="Origin") String origin,
                                    @RequestHeader(value="Referer") String referer,
                                    @RequestHeader(value="User-Agent") String userAgent,
                                    @RequestHeader(value="Accept-Encoding") String acceptEncoding,
                                    @RequestHeader(value="Accept") String accept,@PathVariable(value = "reviewId") String reviewId,
                                    @PathVariable(value = "commentId") int commentId,
                                    @PathVariable(value = "password") String password
                                    ) {
        HashMap<String, String> log = new HashMap<String, String>();
        log.put("Host", host);
        log.put("Origin", origin);
        log.put("Referer",referer );
        log.put("User-Agent",userAgent );
        log.put("Accept-Encoding",acceptEncoding );
        log.put("Accept",accept );
        log.put("User-Ip",request.getRemoteAddr() );
        log.put("event", "deleteComment");

        kafkaService.sendUserLog(log);
        List<CommentResponseDTO> commentList =  reviewService.deleteComment(reviewId,commentId,password);
        if (commentList ==null){

            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(commentList,HttpStatus.OK);
    }
}
