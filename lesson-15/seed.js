// seed.js
"use strict";

/**
 * Listing 15.9 (p. 224)
 * 새로운 데이터 생성
 */
// 모듈 가져오기
const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber");

// 데이터베이스 연결 설정
mongoose.connect(
  "mongodb+srv://ut-node:cherry0909!@ut-node.w4u3y6k.mongodb.net/?retryWrites=true&w=majority&appName=ut-node",
  { useNewUrlParser: true}
);

mongoose.connection;

// subscribers 배열 생성 (5개 이상)
var subscribers = [
  {
    name: "Aaron",
    email: "Aaron@aaron.kr",
    phoneNumber: "12345",
  },
  {
    name: "Trump",
    email: "donald@trump.com",
    phoneNumber: "1111111",
  },
  {
    name: "Biden",
    email: "whoami@usa.com",
    phoneNumber: "00000",
  },
  {
    name: "Yoon",
    email: "yoon@suck-yul.com",
    phoneNumber: "9999999",
  },
  {
    name: "Kim",
    email: "kim@jongeun.com",
    phoneNumber: "6666666",
  },
  {
    name: "JongKook",
    email: "gymjk@youtube.com",
    phoneNumber: "222222",
  },
];

// 기존 데이터 제거
Subscriber.deleteMany()
  .exec()
  .then(() => {
    console.log("Subscribers deleted!");
  });

var commands = [];

// 프라미스 생성을 위한 구독자 객체 루프
subscribers.forEach(s => {
  commands.push(
    Subscriber.create({
      name: s.name,
      email: s.email,
      phoneNumber: s.phoneNumber
    })
  );
});

// 프라미스 생성 후 로깅 작업
Promise.all(commands)
  .then((r) => {
    console.log(JSON.stringify(r));
    mongoose.connection.close();
  })
  .catch(e => {
    console.log(`Error: ${e}`);
  });
