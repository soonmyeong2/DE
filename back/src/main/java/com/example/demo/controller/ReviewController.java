package com.example.demo.controller;

import com.example.demo.dto.CommentDTO;
import com.example.demo.dto.CommentResponseDTO;
import com.example.demo.dto.ReviewResponseDTO;
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
            @PathVariable(value = "keyword") String keyword,
            @PathVariable(value = "page") int page) {

        kafkaService.sendUserLog(host,origin,referer,userAgent,acceptEncoding,request.getRemoteAddr(),"getSearch/"+keyword+"/" +page);


        try {

            String a = URLEncoder.encode(keyword, "UTF-8");

            URL url = new URL("https://crawler-trigger.azurewebsites.net/api/trigger?code=MNB4m3Hq8I4zQ1D9Z2Eg0BCP2mr9SONJjO6mlxJKk1liYGagjyFgJA==&keyword=" + a);
            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");

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
        List<ReviewResponseDTO> reviewList = reviewService.getSearch(keyword, page);


        return new ResponseEntity<>(reviewList, HttpStatus.OK);

    }

    @GetMapping("")
    ResponseEntity<?> getReviewList(HttpServletRequest request,

                                    @RequestParam(value = "num") Long num,
                                    @RequestParam(value = "search-info") List<String> searchInfo,
                                    @RequestHeader(value="Host") String host,
                                    @RequestHeader(value="Origin") String origin,
                                    @RequestHeader(value="Referer") String referer,
                                    @RequestHeader(value="User-Agent") String userAgent,
                                    @RequestHeader(value="Accept-Encoding") String acceptEncoding
                                    ) {

        System.out.println(searchInfo);
        kafkaService.sendUserLog(host,origin,referer,userAgent,acceptEncoding,request.getRemoteAddr(),"getDefalutReviewList");
        System.out.println(searchInfo);
        List<ReviewResponseDTO> defalutNewsList = reviewService.getDefalut(searchInfo,num);

        System.out.println(searchInfo);
        return new ResponseEntity<>(defalutNewsList, HttpStatus.OK);

    }

    @GetMapping("/like")
    ResponseEntity<?> getLikeReviewList(HttpServletRequest request,

                                    @RequestParam(value = "page") int page,
                                    @RequestParam(value = "like-info") List<String> likeInfo,
                                    @RequestHeader(value="Host") String host,
                                    @RequestHeader(value="Origin") String origin,
                                    @RequestHeader(value="Referer") String referer,
                                    @RequestHeader(value="User-Agent") String userAgent,
                                    @RequestHeader(value="Accept-Encoding") String acceptEncoding
    ) {


        kafkaService.sendUserLog(host,origin,referer,userAgent,acceptEncoding,request.getRemoteAddr(),"getLikeReviewList");

        List<ReviewResponseDTO> defalutNewsList = reviewService.getLike(likeInfo,page);


        return new ResponseEntity<>(defalutNewsList, HttpStatus.OK);

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

        kafkaService.sendUserLog(host,origin,referer,userAgent,acceptEncoding,request.getRemoteAddr(),"createComment");

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


        kafkaService.sendUserLog(host,origin,referer,userAgent,acceptEncoding,request.getRemoteAddr(),"deleteComment");

        List<CommentResponseDTO> commentList =  reviewService.deleteComment(reviewId,commentId,password);
        if (commentList ==null){

            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(commentList,HttpStatus.OK);
    }
}
