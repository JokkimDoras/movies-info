export type Movie = {
    id: number;
    vote_average: number
    title: string;
    poster_path: string
    author:string
    content:string
  };

export type MovieResponse = {
    page: number
    results:Movie[]
    total_pages: number
    total_results: number
  }

export type MovieCast = {
    cast:{
        cast_id:number
        profile_path:string
        title:string
        name:string
        character:string
    }[]
    crew:{

    }[]
    id:number
}  

  export type MovieDetails = {
    title: string;
    genres: {
      id: number;
      name: string;
    }[];
    overview: string;
    release_date: string;
    poster_path: string;
    vote_average: number;
    id: number;
  };
