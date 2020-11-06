// 导航菜单数据
import routes from "@/router/routes";

export function filterMenu(arr) {
  return arr
    .filter((item) => {
      return !item.meta.hidden;
    })
    .map((item) => {
      item["title"] = item.meta.title; // 必填(导航菜单使用到，简化routes.js)
      item = Object.assign({}, item);
      if (item.children) {
        item.children = filterMenu(item.children);
      }
      return item;
    });
}

export const menuList = filterMenu(routes[0].children);
