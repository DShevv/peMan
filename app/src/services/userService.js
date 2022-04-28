import api from "../http";

export default class UserService {
  static async fetchUsers() {
    return api.get("/users");
  }

  static async fetchCategories(id) {
    return api.post("/categories", { id });
  }

  static async deleteCategory(id) {
    return api.post("/categories/delete", { id });
  }

  static async createCategory(user, name, image) {
    return api.post("/categories/create", { user, name, image });
  }

  static async fetchPictures() {
    return api.get("/pictures");
  }

  static async createSpendings(
    userId,
    categoryId,
    value,
    currency,
    date,
    isPeriod,
    delta,
    notiDelta
  ) {
    return api.post("/spendings/create", {
      userId,
      categoryId,
      value,
      currency,
      date,
      isPeriod,
      delta,
      notiDelta,
    });
  }
}
