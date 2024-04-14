import axios from "axios";

export const request = async(leadhitSiteId) => {
  let res = null
  const headers = {
    "Api-Key": leadhitSiteId+import.meta.env.VITE_API,
    "Leadhit-Site-Id": leadhitSiteId,
  };
  await axios
    .get(import.meta.env.VITE_URL, { headers })
    .then((response) => {
      response.data.message == "ok" ? res = true : res = false 
    })
    .catch((error) => res = false);
  return res
};

export default { request };
