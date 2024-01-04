/* export const getSongs = async (array:string[]) => {
    const songs = await Promise.all(array.map(async name => {
      const newPath = name.replace('.','/src');
      //const newPath = name.replace('songs/','');
      const url = await getSongUrl(newPath);
      const newObject = {
          id:nanoid(),
          url
      }
      return newObject;
    }))
    return songs;
} */

import { PictureType, TagType } from "jsmediatags/types";

//get base64 cover from tags picture arrayBuffer inside metafunc callback
export const getCover = (pictureObj:PictureType) => {
    let base64String = "";
    pictureObj.data.map(e => base64String += String.fromCharCode(e));
    const imageUrl = `data:${pictureObj.format};base64,${window.btoa(base64String)}`;
    return imageUrl;
}

//get tags with jsmediatags
export const getMetadata = (blob:Blob,metaFunc:(tag:TagType)=>void) => {
    const jsmediatags = window.jsmediatags;
    return jsmediatags.read(blob, {
        onSuccess: tag => {metaFunc(tag)},
        onError: error => console.log(error)
    });
}

export const getTagCover = async (url:string,coverTagFunc:(tag:TagType) => void) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Could not get song url");
        }
        const blob = await response.blob();
        getMetadata(blob,coverTagFunc);
    } catch (error) {
        console.log('error fetching song :',error);
    }
}