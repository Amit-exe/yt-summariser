function extractVideoId(url) {
  if (!url || typeof url !== "string") return null;

  // Added -nocookie support into the core domain matching group
  const regex =
    /(?:youtube(?:-nocookie)?\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);

  const video_id = match ? match[1] : null;

  // Validate structural integrity (11 characters long)
  const isvalid = /^[a-zA-Z0-9_-]{11}$/.test(video_id);
  if (!isvalid) return null;

  return video_id;
}

module.exports = extractVideoId;
