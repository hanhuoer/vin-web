import request from "@/utils/request";
import axios from "@/utils/httpUtils";

export function getArticleList(data, query) {
  return request({
    url: `/api/article/list?page=${query.page}&limit=${query.limit}`,
    method: "post",
    data
  });
}

export function findAllArticle() {
  return request({
    url: `/api/article/findAll`,
    method: "get"
  });
}



export function getArticleListForSite(current) {
  return request({
    url: `/api/article/listForSite/page/${current}`,
    method: "get"
  });
}

export function findById(id) {
  return request({
    url: `/api/article/${id}`,
    method: "get"
  });
}

export function update(data) {
  return request({
    url: `/api/article`,
    method: "put",
    data
  });
}

export function add(data) {
  return request({
    url: `/api/article`,
    method: "post",
    data
  });
}

export function del(id) {
  return request({
    url: `/api/article/${id}`,
    method: "delete"
  });
}

/*********************************************************************/

export function findPublishedOfNoteListByPage(pageIndex) {
  return request({
    url: `/api/visitor/vin/index`,
    method: "post",
    data: {
      "pageIndex": pageIndex,
      "pageSize": 10
    }
  });
}

export function getPublishedOfNoteByNoteId(noteId) {
  return request({
    url: `/api/vin/note/detail/${noteId}`,
    method: "post"
  });
}

export function findArchives() {
  return request({
    url: `/api/visitor/vin/archive`,
    method: "post"
  });
}
