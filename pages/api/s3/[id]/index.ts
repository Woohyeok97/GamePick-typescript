import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";

import aws from 'aws-sdk'


export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    const session = await getServerSession(req, res, authOptions)

    if(req.method === 'GET') {
        if(!session) return res.status(401).json('로그인 상태를 확인해주세요.')

        try {
            // aws 사용자 업데이트
            aws.config.update({
                accessKeyId : process.env.AWS_ACCESS_KEY,
                secretAccessKey : process.env.AWS_SECRET_KEY,
                region: 'ap-northeast-2',
                signatureVersion: 'v4', 
            })
            
            const s3 = new aws.S3()
            
            const presignedURL : aws.S3.PresignedPost = await s3.createPresignedPost({
                Bucket: process.env.AWS_S3_BUCKET_NAME,
                Fields: { key : req.query.id },
                Expires: 300, // seconds
                Conditions: [
                  ['content-length-range', 0, 1048576], //파일용량 1MB 까지 제한
                ],
              })

            return res.status(200).json(presignedURL)

        } catch(err) {
            return res.status(500).json(err)
        }
    }
}