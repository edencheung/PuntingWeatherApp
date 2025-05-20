import { backgroundConditionImages, backgroundImages, blobBodyImages, blobFaceImages } from "@/constants";

export type BackgroundType = keyof typeof backgroundImages;
export type BackgroundCondition = keyof typeof backgroundConditionImages; 
export type BlobState = keyof typeof blobBodyImages;
export type BlobFace = keyof typeof blobFaceImages;