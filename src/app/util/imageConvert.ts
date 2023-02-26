export async function ConvertInputEventToImageToBase64(event):Promise<any> {
  let imageBase64:string;
  const file = event.target.files[0];
  let reader = new FileReader();
  await reader.readAsDataURL(file);
  reader.onload = async () =>  {
      imageBase64 = await reader.result as string;
      // console.log(imageBase64);
      return imageBase64;
  };
}
