import axios from 'axios';

export const uploadImage = async (file: File) => {
  const name = encodeURIComponent(file?.name);
  try {
    // presignURL
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_AWS_S3_API}/${name}`);
      
    const formData = new FormData();
    Object.entries({ ...data.fields, file }).forEach(([key, value]) => {
      formData.append(key, value as string);
    });

    // s3 이미지 업로드 / URL반환
    const imageURL = await axios.post(data.url, formData);
    return `${imageURL.config.url}/${name}`

  } catch (err) {
      return null;
  }
};