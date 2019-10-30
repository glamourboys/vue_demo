import {
  get
} from "./helpers";

const getSeller = get('api/seller');
const getGoods = get('api/goods');
const getRatings = get('api/ratings');
// console.log(getSeller)
export {
  getSeller,
  getGoods,
  getRatings
}
