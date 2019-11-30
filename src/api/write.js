import request from "@/utils/request";

export function confirmIsMaster() {
  return request({
    url: `/api/master/vin/isMaster`,
    method: "post"
  });
}
