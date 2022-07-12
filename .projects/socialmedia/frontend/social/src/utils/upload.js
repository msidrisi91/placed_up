export default async function upload(file) {
  const url = process.env.STORAGE_URL;
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "posts_preset");
  formData.append("api_key", "QfmrismQSGbZyteriJ0cIfiy61E");

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    return data.secure_url;
  } catch (err) {
    return "";
  }
}
