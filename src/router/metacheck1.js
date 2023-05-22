import store from "@/store";

export function metaCheck1() {
    return store.getters["TaskData/isAuthenticated"]

}
