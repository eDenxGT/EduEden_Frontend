import { axiosInstance, axiosMultipartInstance } from "./axiosConfig";
import { toast } from "sonner";


const uploadVideoToCloudinary = async (file, params) => {
   const { public_id_prefix, transformation, folder  } = params
	try {
      const sanitizedName = file.name
			.replace(/[^a-z0-9.\-_]/gi, "")
			.slice(0, 30);
		const public_id = `${public_id_prefix}_${sanitizedName}_${Date.now()}`;
		// const folder = "video_uploads";
		const timestamp = Math.floor(Date.now() / 1000);
		// const transformation = "c_fill,w_720,h_480,f_auto";

		const response = await axiosInstance.post("/api/upload/generate-sign", {
			folder,
			timestamp,
			public_id,
			transformation,
		});

		if (response.status !== 200) {
			toast.error("Something went wrong while generating the signature.");
			return null;
		}

		const { apiKey, cloudName, signature } = response.data;

		const data = new FormData();
		data.append("file", file);
		data.append("folder", folder);
		data.append("signature", signature);
		data.append("api_key", apiKey);
		data.append("public_id", public_id);
		data.append("timestamp", timestamp);
		data.append("transformation", transformation);

		const cloudinaryResponse = await axiosMultipartInstance.post(
			`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
			data
		);

		return cloudinaryResponse.data;
	} catch (error) {
		console.error("Video Upload Error:", error);
		toast.error("Failed to upload video.");
		return null;
	}
};

//* ====== Image Upload ====== *//
const uploadImageToCloudinary = async (file, params) => {
   const { public_id_prefix, transformation, folder  } = params
	try {
		const sanitizedName = file.name
			.replace(/[^a-z0-9.\-_]/gi, "")
			.slice(0, 30);
		const public_id = `${public_id_prefix}_${sanitizedName}_${Date.now()}`;
		// const folder = "image_uploads";
		const timestamp = Math.floor(Date.now() / 1000);
		// const transformation = "c_fill,w_500,h_500,g_face,r_max,f_auto";

		const response = await axiosInstance.post("/api/upload/generate-sign", {
         folder,
			timestamp,
			public_id,
			transformation,
		});

		if (response.status !== 200) {
			toast.error("Something went wrong while generating the signature.");
			return null;
		}

		const { apiKey, cloudName, signature } = response.data;

		const data = new FormData();
		data.append("file", file);
		data.append("folder", folder);
		data.append("signature", signature);
		data.append("api_key", apiKey);
		data.append("public_id", public_id);
		data.append("timestamp", timestamp);
		data.append("transformation", transformation);

		const cloudinaryResponse = await axiosMultipartInstance.post(
			`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
			data
		);

		return cloudinaryResponse.data;
	} catch (error) {
		console.error("Image Upload Error:", error);
		toast.error("Failed to upload image.");
		return null;
	}
};


const uploadPDFToCloudinary = async (file, params) => {
   const { public_id_prefix, folder } = params;
   try {
      const sanitizedName = file.name
         .replace(/[^a-z0-9.\-_]/gi, "")
         .slice(0, 30);
      const public_id = `${public_id_prefix}_${sanitizedName}_${Date.now()}`;
      const timestamp = Math.floor(Date.now() / 1000);

      const response = await axiosInstance.post("/api/upload/generate-sign", {
         folder,
         timestamp,
         public_id,
      });

      if (response.status !== 200) {
         toast.error("Something went wrong while generating the signature.");
         return null;
      }

      const { apiKey, cloudName, signature } = response.data;

      const data = new FormData();
      data.append("file", file);
      data.append("folder", folder);
      data.append("signature", signature);
      data.append("api_key", apiKey);
      data.append("public_id", public_id);
      data.append("timestamp", timestamp);

      const cloudinaryResponse = await axiosMultipartInstance.post(
         `https://api.cloudinary.com/v1_1/${cloudName}/raw/upload`,
         data
      );

      return cloudinaryResponse.data;
   } catch (error) {
      console.error("PDF Upload Error:", error);
      toast.error("Failed to upload PDF.");
      return null;
   }
};

export { uploadVideoToCloudinary, uploadImageToCloudinary, uploadPDFToCloudinary };
