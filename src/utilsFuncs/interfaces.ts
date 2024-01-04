export type IDType = string|number;

export interface songsUrlType {id:string;url:string;}

export interface songType {
    [key:string]:string|number;
    album:string;
    artist:string;
    id:string;
    index:number;
    song:string;
    track:number;
    url:string;
    year:number;
}