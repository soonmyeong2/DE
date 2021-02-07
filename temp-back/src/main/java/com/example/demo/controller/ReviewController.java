package com.example.demo.controller;

import com.example.demo.dto.DefalutNewsDTO;
import com.example.demo.dto.DefalutNewsResponse;
import com.example.demo.dto.ReviewDTO;
import com.example.demo.service.DefalutNewsService;
import com.example.demo.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.List;

@RestController
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;
    @Autowired
    private DefalutNewsService defalutNewsService;


    @GetMapping("/search/{keyword}/{page}")
    ResponseEntity<?> getSearch(@PathVariable(value = "keyword") String keyword,@PathVariable(value = "page") int page){


        try {

            String a = URLEncoder.encode(keyword,"UTF-8");

            URL  url = new URL("https://crawling-trigger.azurewebsites.net/api/trigger?code=h9ZPwUagB0Ij2EX6rrthX5cBODa4Kt/0lGOYr9/NICNRXQ0NA49COg==&keyword="+a);
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
            System.out.println("getResponseCode():"    + conn.getResponseCode());
            // 응답 메시지 구하기
            System.out.println("getResponseMessage():" + conn.getResponseMessage());

            if (conn.getResponseCode() == 201) {

                System.out.println("getResponseCode():"    + conn.getResponseCode());
                conn.disconnect();
                return  new ResponseEntity<>( "wait",HttpStatus.OK);

            }else{
                conn.disconnect();
            }

        } catch (IOException e) {
            e.printStackTrace();
        }




        List<ReviewDTO> reviewList =  reviewService.getSearch(keyword,page);
        System.out.println(12);

        return new ResponseEntity<List<ReviewDTO>>(reviewList, HttpStatus.OK);
    }
    @GetMapping("/{num}")
    ResponseEntity<?> getReviewList(@PathVariable(value = "num") int num){


        DefalutNewsDTO defalutNewsDTO = defalutNewsService.getDefalut();
        DefalutNewsResponse defalutNewsResponse = reviewService.getDefaultNewsReviewList(defalutNewsDTO, num);

        return new ResponseEntity<DefalutNewsResponse>(defalutNewsResponse, HttpStatus.OK);

    }
}
