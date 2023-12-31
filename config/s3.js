import dotenv from 'dotenv'
import aws from 'aws-sdk'
import crypto from 'crypto'
import { promisify } from "util"
const randomBytes = promisify(crypto.randomBytes)

dotenv.config()

const region = "ap-south-1"
const bucketName = "sub-staging"
const accessKeyId = "AKIAYRZ7OBLRNIGJXZDK"
const secretAccessKey = "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"

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL({ fileName }) {
    const rawBytes = await randomBytes(16)
    const imageName = rawBytes.toString('hex')

    const params = ({
        Bucket: bucketName,
        Key: imageName + fileName,
        Expires: 3600
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}