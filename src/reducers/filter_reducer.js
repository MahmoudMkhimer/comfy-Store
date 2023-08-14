import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    let mx_price = Math.max(...action.payload.map((item) => item.price));
    return {
      ...state,
      all_products: [...action.payload],
      filtered_products: [...action.payload],
      filters: { ...state.filters, max_price: mx_price, price: mx_price },
    };
  } else if (action.type === SET_GRIDVIEW) return { ...state, grid_view: true };
  else if (action.type === SET_LISTVIEW) return { ...state, grid_view: false };
  else if (action.type === UPDATE_SORT)
    return { ...state, sort: action.payload };
  else if (action.type === SORT_PRODUCTS) {
    function sortBy(field, sign) {
      return function (a, b) {
        if (a[field] > b[field]) return sign * 1;
        else if (a[field] < b[field]) return sign * -1;
        else return 0;
      };
    }
    let ans = "",
      sign = 1;
    if (state.sort === "price-lowest") {
      ans = "price";
      sign = 1;
    } else if (state.sort === "price-highst") {
      ans = "price";
      sign = -1;
    } else if (state.sort === "name-a") {
      ans = "name";
      sign = 1;
    } else {
      ans = "name";
      sign = -1;
    }
    let res = state.filtered_products.sort(sortBy(ans, sign));
    return { ...state, filtered_products: res };
  } else if (action.type === UPDATE_FILTERS) {
    const { name, value } = action.payload;
    return { ...state, filters: { ...state.filters, [name]: value } };
  } else if (action.type === LOAD_PRODUCTS) {
    return { ...state };
  } else if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state;
    let temp = [...all_products];
    let { price, text, company, category, color, shipping } = state.filters;
    price = +price;

    if (text) {
      temp = temp.filter((product) => {
        return product.name.toLowerCase().startsWith(text);
      });
    }
    if (category !== "all") {
      temp = temp.filter((product) => product.category === category);
    }
    if (company !== "all")
      temp = temp.filter((product) => product.company === company);
    if (color !== "all")
      temp = temp.filter((product) => {
        return product.colors.find((c) => c === color);
      });
    if (shipping) temp = temp.filter((product) => product.shipping === true);
    temp = temp.filter((product) => product.price <= price);
    return { ...state, filtered_products: temp };
  } else if (action.type === CLEAR_FILTERS)
    return {
      ...state,
      filtered_products: state.all_products,

      filters: {
        ...state.filters,
        text: "",

        price: state.filters.max_price,
        category: "all",
        company: "all",
        color: "all",
        shipping: false,
      },
    };
  return state;
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default filter_reducer;
