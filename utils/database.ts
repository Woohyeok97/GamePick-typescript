import { MongoClient } from "mongodb"
// MongoDB랑 연결하는 유틸코드
// 웹패이지 접속시 connet()가 매번 실행되지않고 접속시 처음 1회만 실행되게함
// MongoClient.connect()의 결과를 변수 connectDB에 할당후, export함(다른곳에서 사용가능하게)
const url = process.env.NEXT_PUBLIC_MONGODB_URL

if (!url) {
    throw new Error("MONGODB_URL 환경변수 에러");
}

const options : any = { useNewUrlParser : true }
let connectDB : Promise<MongoClient>


if(process.env.NODE_ENV === 'development') {
    if(!global._mongo) {
        global._mongo = new MongoClient(url, options).connect()
    }
    connectDB = global._mongo
} else {
    connectDB = new MongoClient(url, options).connect()
}



export { connectDB }