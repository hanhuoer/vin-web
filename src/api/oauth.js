import request from "@/utils/request";

export function getGithubClientId() {
  return request({
    url: `/api/vin/oauth/get/github/client/id`,
    method: "post"
  });
}
