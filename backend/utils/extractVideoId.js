function extractVideoId(url) {
  const res = url.split("/");
  const temp = res[res.length - 1];
  const temp2 = temp.split("v=");
  const temp3 = temp2[temp2.length - 1];
  const video_id = temp3.split("&")[0];
  const isvalid = /^[a-zA-Z0-9_-]{11}$/.test(video_id);
  if (!isvalid) return null;

  return video_id;
}

module.exports = extractVideoId;
