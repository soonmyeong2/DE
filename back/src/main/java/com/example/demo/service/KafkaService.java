package com.example.demo.service;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class KafkaService {
    private static final String TOPIC = "userLog";
    private final KafkaTemplate<String, String> kafkaTemplate;
    ObjectMapper mapper = new ObjectMapper();

    @Autowired
    public KafkaService(KafkaTemplate kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }
    public void sendUserLog(String host,String origin,String referer,String userAgent,String acceptEncoding,String userIp,String event) {
        try{
            HashMap<String, String> log = new HashMap<String, String>();
            log.put("Host", host);
            log.put("Origin", origin);
            log.put("Referer",referer );
            log.put("User-Agent",userAgent );
            log.put("Accept-Encoding",acceptEncoding );
            log.put("User-Ip",userIp);
            log.put("Event", event);
            String jsonLog = mapper.writeValueAsString(log);

            this.kafkaTemplate.send(TOPIC, jsonLog);
        } catch (JsonProcessingException e) {

            e.printStackTrace();


        }

    }
}
