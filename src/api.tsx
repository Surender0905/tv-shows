import axios from 'axios';

export const searchShow = async (keyword: string) => {
  const data = await axios
    .get('https://api.tvmaze.com/search/shows?q=' + keyword)
    .then((res) => res.data.map((item: any) => item.show));

  console.log(data);
  return data;
};
