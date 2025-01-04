import { inject, Injectable } from '@angular/core';
import AWS from 'aws-sdk/global';
import S3 from 'aws-sdk/clients/s3';
import * as Minio from 'minio'

@Injectable({
  providedIn: 'root'
})
export class MinioService {
  private s3: S3;



  constructor() {
    // Configura el SDK de AWS para conectarse a MinIO
    this.s3 = new S3({
      accessKeyId: 'YOURACCESSKEY', // Reemplaza con tu access key
      secretAccessKey: 'YOURSECRETKEY', // Reemplaza con tu secret key
      endpoint: 'http://s3.marckeen.com:30075', // Endpoint de MinIO
      s3ForcePathStyle: true, // Necesario para MinIO
      signatureVersion: 'v4' // Usa la versión 4 de firma
    });
    console.log(this.s3)
   }

    /* async minioClient$() {
     const minioClient = new Minio.Client({
      endPoint: 's3.marckeen.com',
      port: 30075,
      useSSL: true,
      accessKey: 'YOURACCESSKEY',
      secretKey: 'YOURSECRETKEY',
     });

     const exists =  await minioClient.bucketExists('minio/marckeen-frontend/');
      console.log(minioClient)
  } */




    getObjectUrl(bucketName: string, imageName: string): string {
    const params = {
      Bucket: bucketName,
      Key: imageName,
      Expires: 60 // La URL expira en 60 segundos
    };
    return this.s3.getSignedUrl('getObject', params);
  }
}
