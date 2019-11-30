import request from "@/utils/request";

export function getAbout() {
  return request({
    url: `/api/visitor/vin/about`,
    method: "post"
  });
}
