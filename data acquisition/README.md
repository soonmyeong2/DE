# Smartstore Review Crawler

쇼핑 검색 결과에서 스마트스토어에 입점 되어 있는 상품들의 리뷰와 메타데이터들을 수집해주는 프로그램입니다.<br><br>
controller.py의 전역변수로 search 범위를 설정 할 수 있습니다.<br>
keyword와 의 전역변수는 나머지 모듈이 완성 되면, python main.py args로 변경 될 예정입니다.
```
LIMIT = 한 품목 당 수집 할 리뷰의 개수 제한
LIMIT_PAGE = 키워드 검색 결과의 검색 페이지 제한
DELAY_TIME = 빠르게 request요청 시 요청 제한되므로, 딜레이를 줌
```


## Installation 
```
$ git clone https://github.com/soonmyeong2/ReviewEarly.git
$ cd ReviewEarly/data\ acquisition/

  # 가상환경 세팅
$ python -m venv example
$ example/Scripts/activate.bat

  # 의존 라이브러리 설치
$ pip install -r requirements.txt
```

## Running
```
$ python main.py
search : ${검색 keyword 입력}
```

---
#### 수집 되는 정보
'id', 'reviewServiceType', 'reviewType', 'reviewContentClassType', 'reviewContent', 'createDate', 'reviewDisplayStatusType', 'reviewScore', 'reviewRankingScore', 'writerMemberId', 'writerMemberIdNo', 'writerMemberNo', 'writerMemberProfileImageUrl', 'checkoutMerchantNo', 'checkoutMerchantId', 'channelId', 'channelServiceType', 'orderNo', 'productOrderNo', 'productNo', 'productName', 'productOptionContent', 'largeCategorizeCategoryId', 'middleCategorizeCategoryId', 'smallCategorizeCategoryId', 'productUrl', 'originProductNo', 'eventTitle', 'writerMemberMaskedId', 'profileImageSourceType', 'reviewAttaches', 'repThumbnailAttach', 'repThumbnailTagNameDescription', 'merchantNo', 'merchantName', 'isMyReview'
