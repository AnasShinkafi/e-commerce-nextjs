// export const productRating = data.reviews.reduce((acc: number, item: any) => item.rating + acc, 0) / data.reviews.length;



interface Review {
    rating: number;
  }
  
  interface Data {
    reviews: Review[];
  }
  
  const data: Data = {
    reviews: [
      { rating: 0 },
      { rating: 0 },
    ],
  };
  
  export const productRating = (data.reviews.length > 0)
    ? data.reviews.reduce((acc: number, item: Review) => acc + item.rating, 0) / data.reviews.length
    : 0;
  